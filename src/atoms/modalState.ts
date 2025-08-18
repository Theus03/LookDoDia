import { atom } from "recoil";
import type { Modal } from "../types/Modal";

export const modalState = atom<Modal>({
    key: "modalState"
})