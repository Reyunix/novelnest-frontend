import { expect, test } from "bun:test";
import { getReturnTo } from "../src/features/auth/returnTo";
import { LoginFormSchema } from "../src/features/auth/schemas/login.form.schemas";

test("login preserves a complete local search destination", () => {
  const destination = "/buscar?query=Dune&filterState=author&page=2";
  expect(getReturnTo(destination)).toBe(destination);
});
test("login cannot redirect to another origin through returnTo", () => {
  for (const value of [
    null,
    "https://example.com",
    "//example.com",
    "/\\example.com",
    "/\t/example.com",
    "javascript:alert(1)",
  ])
    expect(getReturnTo(value)).toBe("/mis-libros");
});
test("login requires a usable identifier and a password", () => {
  expect(
    LoginFormSchema.safeParse({ userName: "   ", userPassword: "test" })
      .success,
  ).toBe(false);
  expect(
    LoginFormSchema.safeParse({ userName: "reader", userPassword: "" }).success,
  ).toBe(false);
  expect(
    LoginFormSchema.parse({ userName: " reader ", userPassword: "test" })
      .userName,
  ).toBe("reader");
});
