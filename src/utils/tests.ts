import { SelectOptions } from 'types/global';

export const getSelectOptions = <T extends object>(
  data: T[],
  mappingObj: Record<'value' | 'label', keyof T>
): SelectOptions[] =>
  data.map((item) => ({
    value: item[mappingObj.value],
    label: item[mappingObj.label]
  }));
