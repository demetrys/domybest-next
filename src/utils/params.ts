import { DefaultDataParams } from 'types/global';

export const removeEmptyParams = (
  params: DefaultDataParams
): Partial<DefaultDataParams> =>
  Object.fromEntries(
    Object.entries(params).filter((tuple) => Boolean(tuple[1]))
  );
