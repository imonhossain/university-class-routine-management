/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppContext } from 'context/appContext';
import LocalStorageKey from 'enums/LocalStorageKey';
import { localStorageGetItem } from 'services/LocalStorageService';

export const useGetToken = (): string => {
  const user = localStorageGetItem(LocalStorageKey.AUTH) || '{}';
  const context = useAppContext() as any;
  const token = context?.token || (user ? JSON.parse(user)?.token : null);
  return token;
};
