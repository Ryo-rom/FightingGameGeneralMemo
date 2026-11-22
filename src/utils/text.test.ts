import { shortenText } from "./text";

describe("shotenText", () => {
  it("Return short text as they are", () => {
    expect(shortenText("Taro")).toBe("Taro");
  });
  it("Truncate string longer than 14 half-width characters with tail", () => {
    expect(shortenText("ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toBe("ABCDEFGHIJKLMN...");
  });
});
