import { atom } from "recoil";
import type { Folder } from "../types/Folder";

export const folderListState = atom<Folder[]>({
    key: "folderListState",
    default: []
})
