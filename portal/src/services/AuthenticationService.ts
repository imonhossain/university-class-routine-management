import { useAppContext } from 'context/appContext';
import LocalStorageKey from 'enums/LocalStorageKey';
import { localStorageGetItem } from 'services/LocalStorageService';

export const getToken = (): string => {
  const user = localStorageGetItem(LocalStorageKey.AUTH) || '{}';
  const { token }: any = useAppContext() || user ? user : null || null;
  return token;
};
