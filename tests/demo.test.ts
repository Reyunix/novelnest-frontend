import { expect, test } from "bun:test";
import {
  createDemoStore,
  DEMO_STORAGE_KEY,
  DemoStateSchema,
} from "../src/features/demo/demoStore";
import { demoCatalog } from "../src/features/demo/fixtures";

const memoryStorage = () => {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
};
test("demo persists library operations and private review changes across visits, without a user identity", () => {
  const storage = memoryStorage();
  const store = createDemoStore(storage);
  expect(demoCatalog).toHaveLength(8);
  expect(store.getSnapshot().state.books).toHaveLength(3);
  store.enter();
  store.save(demoCatalog[3]!);
  const book = store.getSnapshot().state.books[0]!;
  expect(book).not.toHaveProperty("userId");
  store.changeStatus(book.id, "completed");
  const own = store.saveReview("demo:orbita", {
    rating: 5,
    text: " Mi reseña ",
  });
  expect(own?.text).toBe("Mi reseña");
  const reopened = createDemoStore(storage);
  expect(reopened.getSnapshot().state.active).toBe(true);
  expect(reopened.getSnapshot().state.books[0]?.status).toBe("completed");
  expect(reopened.getSnapshot().state.reviews["demo:orbita"]?.rating).toBe(5);
  reopened.leave();
  expect(reopened.getSnapshot().state.books).toHaveLength(4);
  reopened.enter();
  reopened.remove(book.id);
  expect(reopened.getSnapshot().state.books).toHaveLength(3);
  reopened.saveReview("demo:orbita", null);
  expect(reopened.getSnapshot().state.reviews["demo:orbita"]).toBeUndefined();
  reopened.reset();
  expect(reopened.getSnapshot().state.active).toBe(true);
  expect(reopened.getSnapshot().state.books).toHaveLength(3);
  expect(reopened.getSnapshot().state.reviews).toEqual({});
});
test("corrupt or outdated local storage recovers examples and unavailable storage uses memory", () => {
  for (const value of [
    "not JSON",
    JSON.stringify({ version: 0 }),
    JSON.stringify({ version: 1, books: [] }),
  ]) {
    const storage = memoryStorage();
    storage.setItem(DEMO_STORAGE_KEY, value);
    const store = createDemoStore(storage);
    expect(store.getSnapshot().state.books).toHaveLength(3);
    expect(
      DemoStateSchema.safeParse(JSON.parse(storage.getItem(DEMO_STORAGE_KEY)!))
        .success,
    ).toBe(true);
  }
  const store = createDemoStore({
    getItem() {
      throw new Error("denied");
    },
    setItem() {
      throw new Error("denied");
    },
  });
  expect(store.getSnapshot().persistent).toBe(false);
  store.enter();
  store.save(demoCatalog[4]!);
  expect(store.getSnapshot().state.books).toHaveLength(4);
});
test("demo snapshots support locally reopening real books; duplicate saves are idempotent", () => {
  const store = createDemoStore(memoryStorage());
  const real = {
    ...demoCatalog[0]!,
    provider: "google",
    providerBookId: "real",
  };
  store.remember(real);
  store.save(real);
  store.save(real);
  expect(store.getSnapshot().state.snapshots["google:real"]).toEqual(real);
  expect(
    store
      .getSnapshot()
      .state.books.filter((book) => book.provider === "google"),
  ).toHaveLength(1);
});
