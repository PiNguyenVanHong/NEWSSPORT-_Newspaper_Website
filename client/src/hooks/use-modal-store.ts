import { create } from "zustand";

export type ModalType = "login-form" | "update-status-article" | "update-top-heading-article" | "resend-mail" | "add-social-link" | "remove-social-link" | "" ;

interface ModalData{
    apiUrl?: string;
    query?: Record<string, any>;
    redirectAction?: () => void;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));