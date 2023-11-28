import { isFunction } from "lodash";
import { IButtonProps, PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";

interface WindowButtonProps extends Omit<IButtonProps, "onClick"> {
    functionName: string /** Der Name der aufzurufenden Funktion. Diese muss im globalen window-Objekt verfügbar sein. */;
    disabledWithoutSelection?: boolean /** Der Button ist disabled, sollten keine Elemente in der Liste ausgewählt worden sein. */;
}

/** Rendert einen Button, welcher bei Klick eine im globalen window-Objekt hinterlegte Funktion ausführt. */
export const WindowButton = (props: WindowButtonProps) => {
    const { functionName } = props;

    const onClick = React.useCallback(() => {
        const anyWindow = window as any;

        if (anyWindow[functionName] && isFunction(anyWindow[functionName])) {
            anyWindow[functionName]();
        }
    }, [functionName]);

    return <PrimaryButton {...props} onClick={onClick} />;
};