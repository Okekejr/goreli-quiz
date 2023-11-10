// Function to generate a random uint256 identifier

export const generateUniqueIdentifiers = (texts: string[]) => {
  const maxValue = BigInt(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ); // 2^256 - 1

  const uniqueIdentifiers = texts.map((text) => {
    const randomValue = BigInt(
      Math.floor(Number.MAX_SAFE_INTEGER * Math.random())
    );
    const combinedValue = (randomValue % (maxValue - BigInt(1))) + BigInt(1);

    return BigInt(combinedValue);
  });

  return uniqueIdentifiers;
};

export const generateUniqueIdentifier = () => {
  const maxValue = BigInt(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ); // 2^256 - 1
  const randomValue = BigInt(
    Math.floor(Number.MAX_SAFE_INTEGER * Math.random())
  );
  const combinedValue = (randomValue % (maxValue - BigInt(1))) + BigInt(1);

  return combinedValue.toString();
};
