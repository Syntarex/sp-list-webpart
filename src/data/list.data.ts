import { sp } from "@pnp/sp";
import "@pnp/sp/fields";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/webs";
import { isArray, toString } from "lodash";
import { selector } from "recoil";
import { log } from "../util/log.util";
import { webpartPropertiesAtom } from "./webpart.data";

/** Listen-Informationen der konfigurierten Liste. */
export const listInfoSelector = selector({
    key: "list-info",
    get: async ({ get }) => {
        const webpartProperties = get(webpartPropertiesAtom);
        const { listId } = webpartProperties;

        if (!listId) {
            throw new Error("Please provide a valid list of this site collection.");
        }

        const list = sp.web.lists.getById(listId);

        const listInfo = await list.get();

        log(`Info of list "${listId}" fetched.`, listInfo);

        return listInfo;
    },
});

/** Ansichten der konfigurierten Liste. */
export const viewsSelector = selector({
    key: "views",
    get: async ({ get }) => {
        const webpartProperties = get(webpartPropertiesAtom);
        const { listId } = webpartProperties;

        if (!listId) {
            throw new Error("Please provide a valid list of this site collection.");
        }

        const list = sp.web.lists.getById(listId);

        const views = await list.views();

        log(`Views of list "${listId}" fetched.`, views);

        return views;
    },
});

/** Alle Felder einer bestimmten Ansicht. */
export const fieldsSelector = selector({
    key: "fields-by-view-id",
    get: async ({ get }) => {
        const webpartProperties = get(webpartPropertiesAtom);
        const { listId, viewId } = webpartProperties;

        if (!listId) {
            throw new Error("Please provide a valid list of this site collection.");
        }

        if (!viewId) {
            throw new Error("Please provide a valid view of the selected list.");
        }

        const list = sp.web.lists.getById(listId);

        const listFields = await list.fields();
        log(`Fields of list "${listId}" fetched.`, listFields);

        // Typing ist nicht vollständig, deshalb any
        const viewFields: any = await list.getView(viewId).fields();
        log(`Fields of view "${viewId}" fetched.`, viewFields);

        if (!viewFields.Items || !isArray(viewFields.Items)) {
            throw new Error("View doesn't contain valid fields.");
        }

        const fieldNames: string[] = viewFields.Items.map((each: any) => toString(each));

        const fields = listFields.filter((each) => fieldNames.indexOf(each.InternalName) > -1);
        log(`Fields of list "${listId}" got filtered by fields of view "${viewId}".`, fields);

        return fields;
    },
});
