import { create } from "zustand";
type state = {
  isOpen: boolean;
  Open: () => void;
};
export const useCartState = create<state>((set) => ({
  isOpen: false,
  Open: () => set((state) => ({ isOpen: !state.isOpen })),
}));
