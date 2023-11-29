import { isEmpty, isFunction } from "lodash";
import { IButtonProps, IconButton, TooltipHost } from "office-ui-fabric-react";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { selectedItemsAtom } from "../../data/ui.data";
import { warn } from "../../util/log.util";

interface WindowButtonProps extends Omit<IButtonProps, "onClick" | "children" | "text" | "title" | "disabled"> {
    functionName: string /** Der Name der aufzurufenden Funktion. Diese muss im globalen window-Objekt verfügbar sein. */;
    disabledWithoutSelection?: boolean /** Der Button ist disabled, sollten keine Elemente in der Liste ausgewählt worden sein. */;
    tooltipText?: string;
}

/** Rendert einen Button, welcher bei Klick eine im globalen window-Objekt hinterlegte Funktion ausführt. */
export const WindowButton = (props: WindowButtonProps) => {
    const { functionName, disabledWithoutSelection, tooltipText } = props;

    const selectedItems = useRecoilValue(selectedItemsAtom);

    const onClick = React.useCallback(() => {
        const anyWindow = window as any;

        if (!anyWindow[functionName] || !isFunction(anyWindow[functionName])) {
            warn(`Global function "${functionName}" is not yet initialized.`);
            return;
        }

        anyWindow[functionName](selectedItems);
    }, [functionName, selectedItems]);

    const button = (
        <IconButton {...props} disabled={disabledWithoutSelection && isEmpty(selectedItems)} onClick={onClick} />
    );

    if (!tooltipText) {
        return button;
    }

    return <TooltipHost content={tooltipText}>{button}</TooltipHost>;
};
