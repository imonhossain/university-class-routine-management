import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import UserResponse from 'interfaces/auth/UserResponse';

interface UserState {
  token: string;
  user: UserResponse | null;
  signIn: (payload: { token: string; user: UserResponse }) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: '',
      user: null,
      signIn: (payload) =>
        set({
          token: payload.token,
          user: payload.user,
        }),
      signOut: () => {
        set({ token: '', user: null });
      },
    }),
    {
      name: 'auth',
    }
  )
);
