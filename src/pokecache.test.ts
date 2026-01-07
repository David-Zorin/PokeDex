import { expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test("cache should reap entries after the interval", async () => {
  const interval = 100; // 100ms
  const cache = new Cache(interval);

  cache.add("test-key", { name: "pikachu" });

  // Should exist immediately
  expect(cache.get("test-key")).toBeDefined();

  // Wait for the interval + a small buffer
  await new Promise((resolve) => setTimeout(resolve, interval + 50));

  // Should be deleted by the reaper
  expect(cache.get("test-key")).toBeUndefined();

  cache.stopReapLoop();
});
