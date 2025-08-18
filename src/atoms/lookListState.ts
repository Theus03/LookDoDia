import { atom } from "recoil";
import type { Look } from "../types/Look";

export const lookListState = atom<Look[]>({
    key: "lookListState",
    default: []
})