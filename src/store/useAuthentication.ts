import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthenticationStore {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  resetAuthToken: () => void;
}

export const useAuthentication = create<AuthenticationStore>()(
  persist(
    (set) => ({
      authToken: null,
      setAuthToken: (token) => set({ authToken: token }),
      resetAuthToken: () => set({ authToken: null }),
    }),
    {
      name: 'dsb-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => useAuthentication.persist.onFinishHydration(onChange);

export function useAuthHydrated() {
  return useSyncExternalStore(
    subscribe, // auf Änderungen hören
    () => useAuthentication.persist.hasHydrated(), // Wert im Browser
    () => false // Wert auf dem Server
  );
}
