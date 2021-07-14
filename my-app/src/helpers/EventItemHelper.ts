export const makeCapitalFirstLetter = (value: string): string => {
  const firstPart = value.slice(0, 1).toUpperCase();
  const secondPart = value.slice(1);

  return `${firstPart}${secondPart}`;
};
