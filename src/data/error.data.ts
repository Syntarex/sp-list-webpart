import { isEmpty, last } from "lodash";
import { atom } from "recoil";
import { error } from "../util/log.util";

export const errorsAtom = atom<Error[]>({
    key: "errors",
    default: [],
    effects: [
        ({ onSet }) => {
            onSet((errors) => {
                if (isEmpty(errors)) {
                    return;
                }

                error("An error occured.", last(errors));
            });
        },
    ],
});
