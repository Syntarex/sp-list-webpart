import { DetailsList, DetailsListLayoutMode, SelectionMode } from "office-ui-fabric-react";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { listDataSelector } from "../../data/list.data";
import { useColumns } from "../../hooks/use-columns.hook";

interface ListProps {
    className?: string;
    pageSize?: number /** Wie viele Elemente sollen pro Seite dargestellt werden? */;
    selectionMode?: SelectionMode;
}

/** Zeigt eine Liste aller Daten an. */
export const List = (props: ListProps) => {
    const { className, pageSize = 50, selectionMode = SelectionMode.none } = props;

    const columns = useColumns();
    const rows = useRecoilValue(listDataSelector);

    return (
        <DetailsList
            className={className}
            items={rows}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={selectionMode}
        />
    );
};
