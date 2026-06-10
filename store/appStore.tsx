import {create} from 'zustand';

interface AppStore {
  isReady: boolean;
  setIsReady: (isReady: boolean) => void;
}
export const useAppStore = create<AppStore>((set) => ({
  isReady: false,
  setIsReady: (isReady: boolean) => set({isReady}),
}));