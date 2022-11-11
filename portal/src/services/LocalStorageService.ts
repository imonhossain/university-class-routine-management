/* eslint-disable import/prefer-default-export  */
export const localStorageSetItem = (key: string, value: any): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageGetItem = (key: string): any => {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const localStorageRemoveItem = (key: string): void => {
  window.localStorage.removeItem(key);
};
export const localStorageRemoveAll = (): void => {
  window.localStorage.clear();
};
