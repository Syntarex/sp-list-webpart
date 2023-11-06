import { atom } from "recoil";
import { log } from "../util/log.util";
import { ListWebPartProps } from "../webparts/list/list.webpart";

export const webpartPropertiesAtom = atom<ListWebPartProps>({
    key: "webpart-properties",
    default: {
        listName: "",
    },
    effects: [
        ({ onSet }) => {
            onSet((properties) => {
                log("Webpart properties changed", properties);
            });
        },
    ],
});
