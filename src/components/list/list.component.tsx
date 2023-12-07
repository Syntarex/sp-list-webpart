import { DetailsList, DetailsListLayoutMode, Selection } from "office-ui-fabric-react";
import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listDataSelector } from "../../data/list.data";
import { selectedItemsAtom } from "../../data/ui.data";
import { webpartPropertiesAtom } from "../../data/webpart.data";
import { useColumns } from "../../hooks/use-columns.hook";

interface ListProps {
    className?: string;
}

/** Zeigt eine Liste aller Daten an. */
export const List = (props: ListProps) => {
    const { className } = props;

    const rows = useRecoilValue(listDataSelector);
    const setSelectedItems = useSetRecoilState(selectedItemsAtom);

    const webpartProperties = useRecoilValue(webpartPropertiesAtom);
    const { selectionMode } = webpartProperties;

    const columns = useColumns();

    const selection = React.useMemo(
        () =>
            new Selection({
                selectionMode,
                onSelectionChanged: () => {
                    setSelectedItems(selection.getSelection());
                },
            }),
        [selectionMode],
    );

    return (
        <DetailsList
            className={className}
            items={rows}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
            selection={selection}
            selectionMode={selectionMode}
        />
    );
};
