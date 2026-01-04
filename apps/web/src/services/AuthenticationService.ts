import { useUserStore } from 'stores';

export const useGetToken = (): string => {
  const token = useUserStore((state) => state.token);
  return token;
};
