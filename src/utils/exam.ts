/**
 * Utility to help to render predefined number of items. Useful to render items from number of total questions
 *
 * @param length Number of items to render
 */
export const arrayFrom = (length: number) =>
  Array.from({ length }, (_, index) => index + 1);

export const getIsAllowedToEnter = (value: string): boolean => {
  const previousIndex = value.length - 1;
  const currentSymbol = value.slice(previousIndex);

  if (currentSymbol === ' ') {
    return false;
  }

  const allowed = ['.'];
  const previousValue = value.slice(0, previousIndex);

  if (!previousValue.includes('-')) {
    allowed.push('-');
  }

  if (!previousValue.includes('/')) {
    allowed.push('/');
  }

  // eslint-disable-next-line no-restricted-globals
  const isNumeric = !isNaN(Number(currentSymbol));
  const isAllowedSymbol = allowed.includes(currentSymbol);

  return isNumeric || isAllowedSymbol;
};
