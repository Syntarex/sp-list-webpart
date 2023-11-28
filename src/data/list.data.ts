import { sp } from "@pnp/sp";
import "@pnp/sp/fields";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/webs";
import { isArray, toString } from "lodash";
import { selector } from "recoil";
import { log } from "../util/log.util";
import { pageAtom } from "./ui.data";
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

/** Die anzuzeigenden Daten  */
export const listDataSelector = selector({
    key: "list-data",
    get: async ({ get }) => {
        const webpartProperties = get(webpartPropertiesAtom);
        const { pageSize, listId } = webpartProperties;

        const page = get(pageAtom);
        const fields = get(fieldsSelector);

        if (!listId) {
            throw new Error("Please provide a valid list of this site collection.");
        }

        const list = sp.web.lists.getById(listId);

        // Wie viele Einträge geskippt werden müssen, weil sie auf vorherigen Seiten liegen
        const skip = (page - 1) * pageSize;

        // Welche Felder abgefragt werden
        const select = fields
            .filter((each) => (each as any)["odata.type"])
            .map((each) => {
                const type = (each as any)["odata.type"];

                switch (type) {
                    case "SP.FieldUser":
                        return `${each.InternalName}/Title,${each.InternalName}/EMail`;
                    case "SP.FieldLookup":
                        const field = (each as any).LookupField ?? "Title";
                        return `${each.InternalName}/${field}`;
                }

                return each.InternalName;
            });

        // Welche Felder expanded werden müssen
        const expand = fields
            .filter((each) => {
                const type = (each as any)["odata.type"];

                switch (type) {
                    case "SP.FieldUser":
                    case "SP.FieldLookup":
                        return true;
                }

                return false;
            })
            .map((each) => each.InternalName);

        // Direkte Antwort der Liste
        const listData = await list.items
            .skip(skip)
            .top(pageSize)
            .select(...select)
            .expand(...expand)
            .get();

        log(`Page ${page} of items of list (${listData.length}) "${listId}" fetched.`, listData);

        return listData;
    },
});
