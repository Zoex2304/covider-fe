// ============================================================================
// FILE: src/stores/modalStore.ts
// ============================================================================
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  modalData: unknown;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  modalData: null,
  openModal: (type, data = null) =>
    set({ isOpen: true, modalType: type, modalData: data }),
  closeModal: () => set({ isOpen: false, modalType: null, modalData: null }),
}));
