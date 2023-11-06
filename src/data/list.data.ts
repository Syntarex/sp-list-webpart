import { sp } from "@pnp/sp";
import "@pnp/sp/fields";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import { selector } from "recoil";
import { log } from "../util/log.util";
import { webpartPropertiesAtom } from "./webpart.data";

export const listInfoSelector = selector({
    key: "list-info",
    get: async ({ get }) => {
        const webpartProperties = get(webpartPropertiesAtom);
        const list = sp.web.lists.getByTitle(webpartProperties.listName);
        const listInfo = await list.get();

        log(`Info of list "${webpartProperties.listName}" fetched`, listInfo);

        return listInfo;
    },
});

export const listFieldsSelector = selector({
    key: "list-fields",
    get: async ({ get }) => {
        const webpartProperties = get(webpartPropertiesAtom);
        const list = sp.web.lists.getByTitle(webpartProperties.listName);
        const listFields = await list.fields.get();

        log(`Fields of list "${webpartProperties.listName}" fetched`, listFields);

        return listFields;
    },
});
