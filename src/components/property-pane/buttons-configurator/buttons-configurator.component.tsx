import { clone, pullAt } from "lodash";
import { IconButton, Stack, Text } from "office-ui-fabric-react";
import * as React from "react";
import { isArrayEqual } from "../../../util/array.util";
import { WindowButtonProps } from "../../window-button/window-button.component";
import { ButtonsConfiguratorItem } from "./buttons-configurator-item.component";

interface ButtonsConfiguratorProps {
    onChange: (newValue: WindowButtonProps[]) => void;
    value: WindowButtonProps[];
}

export const ButtonsConfigurator = (props: ButtonsConfiguratorProps) => {
    const { value, onChange } = props;

    // Eine Arbeitskopie der Buttons
    const [buttons, setButtons] = React.useState<WindowButtonProps[]>([]);

    // Passe Arbeitskopie der Buttons an, sollte sich der Wert von außen ändern
    React.useEffect(() => setButtons(value), [value]);

    // Aktualisiere Webpart Properties, sollte sich Arbeitskopie ändern
    React.useEffect(() => {
        // Nichts hat sich verändert
        if (isArrayEqual(buttons, value)) {
            return;
        }

        onChange(buttons);
    }, [buttons, value, onChange]);

    const updateButton = React.useCallback(
        (index: number, newValue: WindowButtonProps) => {
            // Button der verändert werden soll, existiert gar nicht
            if (buttons[index]) {
                const newButtons = clone(buttons);
                newButtons[index] = newValue;
                setButtons(newButtons);
            }
        },
        [buttons],
    );

    const deleteButton = React.useCallback(
        (index: number) => {
            if (buttons[index]) {
                const newButtons = clone(buttons);
                pullAt(newButtons, index);
                setButtons(newButtons);
            }
        },
        [buttons],
    );

    const createButton = React.useCallback(() => {
        const newButtons = clone(buttons);
        newButtons.push({
            functionName: "buttonclick",
            disabledWithoutSelection: false,
            iconName: "Edit",
            labelText: "Button",
            tooltipText: "Tooltip",
        });
        setButtons(newButtons);
    }, [buttons]);

    return (
        <Stack tokens={{ childrenGap: 10 }}>
            <Stack horizontal horizontalAlign={"space-between"} verticalAlign={"center"}>
                <Text variant={"large"}>Buttons</Text>
                <IconButton iconProps={{ iconName: "Add" }} onClick={createButton} />
            </Stack>

            {buttons.map((each, index) => (
                <ButtonsConfiguratorItem
                    value={each}
                    onChange={(newValue) => updateButton(index, newValue)}
                    onDelete={() => deleteButton(index)}
                />
            ))}
        </Stack>
    );
};
