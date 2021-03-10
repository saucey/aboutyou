export const formatNumber = (input: number): string => {
  return input.toString().replace(/./g, (digit, i, priceAsString) => {
    return i && digit !== '.' && (priceAsString.length - i) % 3 === 0 ? '.' + digit : digit === '.' ? ',' : digit;
  });
};
