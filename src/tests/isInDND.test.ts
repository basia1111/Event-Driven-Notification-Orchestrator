import { isInDND } from "../utils/isInDND";

describe("isInDND - DND window without midnight crossing (14:00 - 19:00)", () => {
  test("returns true when event is inside window (15:00)", () => {
    expect(isInDND("2025-07-28T15:00:00Z", "14:00", "19:00")).toBe(true);
  });

  test("returns false when event is before window (12:00)", () => {
    expect(isInDND("2025-07-28T12:00:00Z", "14:00", "19:00")).toBe(false);
  });

  test('returns false when event is after window (20:00)" ', () => {
    expect(isInDND("2025-07-28T20:00:00Z", "14:00", "19:00")).toBe(false);
  });

  test("returns true when event is exactly at start (14:00)", () => {
    expect(isInDND("2025-07-28T14:00:00Z", "14:00", "19:00")).toBe(true);
  });

  test("returns false when event is exactly at end (19:00)", () => {
    expect(isInDND("2025-07-28T19:00:00Z", "14:00", "19:00")).toBe(false);
  });
});

describe("isInDND - DND window crossing midnight (22:00 - 07:00)", () => {
  test("returns true when event is inside window (02:00)", () => {
    expect(isInDND("2025-07-28T02:00:00Z", "22:00", "07:00")).toBe(true);
  });

  test("returns false when event is outside window (18:00)", () => {
    expect(isInDND("2025-07-28T18:00:00Z", "22:00", "07:00")).toBe(false);
  });

  test("returns false when event is outside window (08:00)", () => {
    expect(isInDND("2025-07-28T08:00:00Z", "22:00", "07:00")).toBe(false);
  });

  test("returns true when event is exactly at start (22:00)", () => {
    expect(isInDND("2025-07-28T22:00:00Z", "22:00", "07:00")).toBe(true);
  });

  test("returns false when event is exactly at end (07:00)", () => {
    expect(isInDND("2025-07-28T07:00:00Z", "22:00", "07:00")).toBe(false);
  });
});
