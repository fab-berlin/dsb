import { create } from 'zustand';

type NavigationStore = {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentRoute: '/',
  setCurrentRoute: (route) => set({ currentRoute: route }),
}));
