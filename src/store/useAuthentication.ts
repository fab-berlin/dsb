import { create } from 'zustand';

interface AuthenticationStore {
  authToken: string | null;
  setAuthToken: (token: string) => void;
  resetAuthToken: () => void;
}

export const useAuthentication = create<AuthenticationStore>((set) => ({
  authToken: null,
  setAuthToken: (token: string | null) => {
    set({ authToken: token });
  },
  resetAuthToken: () => {
    set({ authToken: null });
  },
}));
