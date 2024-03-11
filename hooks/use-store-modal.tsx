import { create } from "zustand";

interface StoreModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useStoreModal = create<StoreModal>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
