import {
  generateUniqueIdentifier,
  generateUniqueIdentifiers,
} from "@/ui/core/generateUniqueId";

describe("generateUniqueIdentifier", () => {
  it("should generate a string representation of a unique identifier", () => {
    const uniqueIdentifier = generateUniqueIdentifier();
    // Check if the returned value is a string
    expect(typeof uniqueIdentifier).toBe("string");
    // Check if the length of the string is greater than 0
    expect(uniqueIdentifier.length).toBeGreaterThan(0);
  });
});

describe("generateUniqueIdentifiers", () => {
  it("should generate an array of unique identifiers", () => {
    const texts = ["text1", "text2", "text3"];
    const uniqueIdentifiers = generateUniqueIdentifiers(texts);

    // Check if the returned value is an array
    expect(Array.isArray(uniqueIdentifiers)).toBe(true);

    // Check if the length of the array is equal to the length of the input texts
    expect(uniqueIdentifiers.length).toBe(texts.length);

    // Check if each element in the array is of type 'bigint'
    uniqueIdentifiers.forEach((identifier) => {
      expect(typeof identifier).toBe("bigint");
    });

    // Check if the identifiers are unique
    const uniqueSet = new Set(uniqueIdentifiers);
    expect(uniqueSet.size).toBe(uniqueIdentifiers.length);
  });
});
