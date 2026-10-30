import { submitBookReview } from "../src/features/books/books.api";
import { afterEach, describe, expect, mock, test } from "bun:test";
import { request } from "../src/shared/http/request";
import { createRequestScope } from "../src/shared/http/requestScope";
import { patchJson } from "../src/shared/http/patchJson";
import { deleteJson } from "../src/shared/http/deleteJson";
import { onSessionExpired } from "../src/shared/http/sessionToken";
import { API_ENDPOINTS } from "../src/shared/config/config.api";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const replaceFetch = (
  implementation: (
    ...args: Parameters<typeof fetch>
  ) => ReturnType<typeof fetch>,
) => {
  const mocked = mock(implementation);
  globalThis.fetch = mocked as unknown as typeof fetch;
  return mocked;
};

describe("HTTP failures and session recovery", () => {
  test("PATCH returns controlled feedback instead of forwarding raw backend text", async () => {
    replaceFetch(async () =>
      Response.json(
        { message: "Datos inválidos", errorCode: "INVALID_DATA" },
        { status: 400 },
      ),
    );
    await expect(
      patchJson("http://local/book", {}, (response) => response.json()),
    ).rejects.toMatchObject({
      status: 400,
      message: "Revisa los datos e inténtalo de nuevo.",
    });
  });
  test("DELETE network failures are actionable structured errors", async () => {
    replaceFetch(async () => {
      throw new TypeError("Failed to fetch");
    });
    await expect(deleteJson("http://local/book")).rejects.toMatchObject({
      status: 0,
      errorCode: "NETWORK_ERROR",
    });
  });
  test("provider downtime uses a recoverable message", async () => {
    replaceFetch(async () =>
      Response.json({ message: "Internal detail" }, { status: 503 }),
    );
    await expect(request("http://local/books")).rejects.toMatchObject({
      status: 503,
      message:
        "El servicio no está disponible temporalmente. Inténtalo de nuevo en unos instantes.",
    });
  });
  test("parallel expired protected requests share one refresh and retry", async () => {
    let refreshed = false;
    const calls = replaceFetch(async (url) => {
      if (String(url) === API_ENDPOINTS.REFRESH) {
        await new Promise((resolve) => setTimeout(resolve, 5));
        refreshed = true;
        return new Response(null, { status: 200 });
      }
      return Response.json({}, { status: refreshed ? 200 : 401 });
    });
    const results = await Promise.all([
      request(API_ENDPOINTS.USER_BOOKS),
      request(API_ENDPOINTS.USER_BOOKS),
    ]);
    expect(results.every((result) => result.ok)).toBe(true);
    expect(
      calls.mock.calls.filter(([url]) => String(url) === API_ENDPOINTS.REFRESH),
    ).toHaveLength(1);
  });
  test("abort remains cancellation and is not converted to a connection failure", async () => {
    const abort = new AbortController();
    abort.abort();
    replaceFetch(async () => {
      throw abort.signal.reason;
    });
    await expect(
      request("http://local/books", { signal: abort.signal }),
    ).rejects.toMatchObject({ name: "AbortError" });
  });
});

test("temporary refresh failures do not sign out the user", async () => {
  let expired = false;
  const unsubscribe = onSessionExpired(() => {
    expired = true;
  });
  replaceFetch(async (url) =>
    Response.json(
      {},
      { status: String(url) === API_ENDPOINTS.REFRESH ? 503 : 401 },
    ),
  );
  try {
    await expect(request(API_ENDPOINTS.USER_BOOKS)).rejects.toMatchObject({
      status: 503,
    });
    expect(expired).toBe(false);
  } finally {
    unsubscribe();
  }
});
test("a rejected refresh expires the local session", async () => {
  let expired = false;
  const unsubscribe = onSessionExpired(() => {
    expired = true;
  });
  replaceFetch(async () => Response.json({}, { status: 401 }));
  try {
    await expect(request(API_ENDPOINTS.USER_BOOKS)).rejects.toMatchObject({
      status: 401,
    });
    expect(expired).toBe(true);
  } finally {
    unsubscribe();
  }
});

describe("query race protection", () => {
  test("a late response cannot replace a newer result even if it ignores abort", async () => {
    const scope = createRequestScope();
    let resolveOld!: (value: string) => void;
    const oldTask = scope.start();
    const oldResult = new Promise<string>((resolve) => {
      resolveOld = resolve;
    });
    let visible = "";
    const applyOld = oldResult.then((value) => {
      if (oldTask.isCurrent()) visible = value;
    });
    const nextTask = scope.start();
    if (nextTask.isCurrent()) visible = "new query";
    resolveOld("stale query");
    await applyOld;
    expect(visible).toBe("new query");
    expect(oldTask.signal.aborted).toBe(true);
  });
  test("unmounts and mutations invalidate pending reads", () => {
    const scope = createRequestScope();
    const task = scope.start();
    scope.cancel();
    expect(task.isCurrent()).toBe(false);
    expect(task.signal.aborted).toBe(true);
  });
});

test("community mutations share protected session recovery", async () => {
  let refreshed = false;
  const calls = replaceFetch(async (url) => {
    if (String(url) === API_ENDPOINTS.REFRESH) {
      refreshed = true;
      return new Response(null, { status: 200 });
    }
    return Response.json({}, { status: refreshed ? 200 : 401 });
  });
  const response = await request(
    `${API_ENDPOINTS.BOOKS}/google/edition/reviews/me`,
    { method: "PUT", body: JSON.stringify({ rating: 5 }) },
  );
  expect(response.status).toBe(200);
  expect(calls).toHaveBeenCalledTimes(3);
});

test("withdrawing a contribution sends DELETE without an empty JSON body", async () => {
  const calls = replaceFetch(async () =>
    Response.json({
      success: true,
      code: "BOOK_REVIEW_DELETED",
      message: "Retirada",
      data: null,
    }),
  );
  expect(
    await submitBookReview(
      `${API_ENDPOINTS.BOOKS}/google/edition/reviews/me`,
      null,
    ),
  ).toBeNull();
  const init = calls.mock.calls[0]?.[1];
  expect(init?.method).toBe("DELETE");
  expect(init?.body).toBeUndefined();
  expect(new Headers(init?.headers).has("Content-Type")).toBe(false);
});

test("Fastify route errors never expose endpoints in user messages", async () => {
  replaceFetch(async () =>
    Response.json(
      {
        message:
          "Route GET:/api/v1/books/google/R2hkAAAACAAJ/community?page=1&limit=10 not found",
        error: "Not Found",
        statusCode: 404,
      },
      { status: 404 },
    ),
  );
  await expect(
    request(`${API_ENDPOINTS.BOOKS}/google/R2hkAAAACAAJ/community`),
  ).rejects.toMatchObject({
    status: 404,
    message: "Este contenido no está disponible en este momento.",
  });
});

test("known error codes use local copy even when server messages contain technical details", async () => {
  replaceFetch(async () =>
    Response.json(
      {
        errorCode: "BOOK_NOT_FOUND",
        message: "Database SELECT failed at /private/source.ts",
      },
      { status: 404 },
    ),
  );
  await expect(
    request(`${API_ENDPOINTS.BOOKS}/google/book`),
  ).rejects.toMatchObject({ message: "No hemos encontrado este libro." });
});

test("unknown errors, non-JSON bodies and inherited property names receive safe defaults", async () => {
  for (const payload of [
    { errorCode: "INTERNAL_DETAILS", message: "/api/v1/private" },
    { errorCode: "toString", message: "GET /api/v1/private" },
    { errorCode: "constructor", message: "SQL details" },
  ]) {
    replaceFetch(async () => Response.json(payload, { status: 400 }));
    await expect(request("https://example.test")).rejects.toMatchObject({
      message: "Revisa los datos e inténtalo de nuevo.",
    });
  }
  replaceFetch(
    async () =>
      new Response("<html>Proxy /private/path</html>", { status: 404 }),
  );
  await expect(request("https://example.test")).rejects.toMatchObject({
    message: "Este contenido no está disponible en este momento.",
  });
});

test("error feedback renders safe copy rather than technical routes", async () => {
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { BookRequestError } =
    await import("../src/features/books/components/BookRequestError");
  const { errorMessage } = await import("../src/shared/http/request");
  replaceFetch(async () =>
    Response.json(
      { message: "Route GET:/api/v1/books/google/private not found" },
      { status: 404 },
    ),
  );
  let failure: unknown;
  try {
    await request(`${API_ENDPOINTS.BOOKS}/google/private`);
  } catch (error) {
    failure = error;
  }
  expect(failure).toBeDefined();
  const html = renderToStaticMarkup(
    createElement(BookRequestError, {
      title: "No se pudo cargar la ficha del libro",
      message: errorMessage(failure),
      retry: async () => {},
    }),
  );
  expect(html).toContain("No se pudo cargar la ficha del libro");
  expect(html).toContain("Este contenido no está disponible en este momento.");
  expect(html).toContain("Reintentar");
  expect(html).not.toContain("/api/");
  expect(html).not.toContain("Route GET");
});
