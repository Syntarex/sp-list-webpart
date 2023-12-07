import { SelectionMode } from "office-ui-fabric-react";
import { atom } from "recoil";
import { log } from "../util/log.util";
import { ListWebPartProps } from "../webparts/list/list.webpart";

export const webpartPropertiesAtom = atom<ListWebPartProps>({
    key: "webpart-properties",
    default: {
        listId: "",
        viewId: "",
        pageSize: 50,
        buttons: [],
        selectionMode: SelectionMode.none,
    },
    effects: [
        ({ onSet }) => {
            onSet((newProperties) => {
                log("Webpart properties were set.", newProperties);
            });
        },
    ],
});
