export const setStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = (key: string) =>
  typeof window !== 'undefined' && key !== 'undefined'
    ? JSON.parse(localStorage.getItem(key) as string)
    : '';

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};
