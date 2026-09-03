import { describe, expect, it } from "vitest";
import { createMessageThreadSchema } from "./messagingSchemas";

describe("message compose validation", () => {
  it("accepts a valid recipient, title, and message", () => {
    expect(
      createMessageThreadSchema.safeParse({
        receiverId: 12,
        title: "Welcome",
        message: "Hello there",
      }).success,
    ).toBe(true);
  });

  it("rejects missing recipients and short titles", () => {
    expect(
      createMessageThreadSchema.safeParse({
        receiverId: 0,
        title: "Hi",
        message: "Hello",
      }).success,
    ).toBe(false);
  });
});
