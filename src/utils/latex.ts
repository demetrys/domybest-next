export const getLatexString = (value: string) => {
  const hasMinus = value.startsWith('-');

  if (hasMinus) {
    const afterMinusValue = value.slice(1);

    const slashIndex = afterMinusValue.indexOf('/');

    if (slashIndex !== -1) {
      const beforeSlash = afterMinusValue.slice(0, slashIndex);
      const afterSlash = afterMinusValue.slice(slashIndex + 1);

      return `$$ -\\frac{${beforeSlash}}{${afterSlash}} $$`;
    }

    return value;
  }

  const slashIndex = value.indexOf('/');

  if (slashIndex !== -1) {
    const beforeSlash = value.slice(0, slashIndex);
    const afterSlash = value.slice(slashIndex + 1);

    return `$$ \\frac{${beforeSlash}}{${afterSlash}} $$`;
  }

  return value;
};
