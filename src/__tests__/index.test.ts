import { plural } from "../utils/strings";

it("Plural", () => {
  expect(plural(0, "dogs", "dog", "none")).toBe("none");
  expect(plural(1, "dogs", "dog")).toBe("dog");
  expect(plural(2, "dogs", "dog")).toBe("dogs");
});
