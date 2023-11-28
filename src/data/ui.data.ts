import { atom } from "recoil";

/** Die anzuzeigende Seite der Liste. Startet bei 1. */
export const pageAtom = atom({
    key: "page",
    default: 1,
});

/** Die in der Liste selektierten Zeilen. */
export const selectedItemsAtom = atom<any[]>({
    key: "selected-items",
    default: [],
});
