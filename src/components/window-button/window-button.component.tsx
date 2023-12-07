import { isEmpty, isFunction } from "lodash";
import { CommandBarButton, IButtonProps, TooltipHost } from "office-ui-fabric-react";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { selectedItemsAtom } from "../../data/ui.data";
import { warn } from "../../util/log.util";
import styles from "./window-button.module.scss";

export interface WindowButtonProps {
    functionName: string /** Der Name der aufzurufenden Funktion. Diese muss im globalen window-Objekt verfügbar sein. */;
    disabledWithoutSelection?: boolean /** Der Button ist disabled, sollten keine Elemente in der Liste ausgewählt worden sein. */;
    tooltipText?: string;
    iconName?: string;
    labelText?: string;
}

/** Rendert einen Button, welcher bei Klick eine im globalen window-Objekt hinterlegte Funktion ausführt. */
export const WindowButton = (
    props: WindowButtonProps & Omit<IButtonProps, "onClick" | "text" | "title" | "disabled" | "iconProps" | "children">,
) => {
    const { functionName, disabledWithoutSelection, tooltipText, iconName, labelText } = props;

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
        <CommandBarButton
            {...props}
            className={styles.windowButton}
            disabled={disabledWithoutSelection && isEmpty(selectedItems)}
            onClick={onClick}
            iconProps={iconName ? { iconName } : undefined}
        >
            {labelText}
        </CommandBarButton>
    );

    if (!functionName) {
        return null;
    }

    if (!tooltipText) {
        return button;
    }

    return <TooltipHost content={tooltipText}>{button}</TooltipHost>;
};
