import { atom } from "recoil";

/** Die anzuzeigende Seite der Liste. Startet bei 1. */
export const pageAtom = atom({
    key: "page",
    default: 1,
});
