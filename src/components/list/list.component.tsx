import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from "office-ui-fabric-react";
import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listDataSelector } from "../../data/list.data";
import { selectedItemsAtom } from "../../data/ui.data";
import { useColumns } from "../../hooks/use-columns.hook";

interface ListProps {
    className?: string;
    selectionMode?: SelectionMode;
}

/** Zeigt eine Liste aller Daten an. */
export const List = (props: ListProps) => {
    const { className, selectionMode = SelectionMode.multiple } = props;

    const rows = useRecoilValue(listDataSelector);
    const setSelectedItems = useSetRecoilState(selectedItemsAtom);

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
