import { ActionButton, Checkbox, Stack, Text, TextField } from "office-ui-fabric-react";
import * as React from "react";
import { classNames } from "../../../util/styles.util";
import { WindowButton, WindowButtonProps } from "../../window-button/window-button.component";
import styles from "./buttons-configurator-item.module.scss";
interface ButtonsConfiguratorItemProps {
    className?: string;
    value: WindowButtonProps;
    onChange: (value: WindowButtonProps) => void;
    onDelete: () => void;
}

export const ButtonsConfiguratorItem = (props: ButtonsConfiguratorItemProps) => {
    const { className, value, onChange, onDelete } = props;

    return (
        <Stack className={classNames(styles.item, className)} tokens={{ childrenGap: 20 }}>
            <Stack tokens={{ childrenGap: 5 }}>
                <Text>Vorschau</Text>
                <div>
                    {value.functionName ? (
                        <WindowButton {...value} disabledWithoutSelection={false} />
                    ) : (
                        <Text>Keine Vorschau verfügbar, da Funktionsname nicht gesetzt wurde.</Text>
                    )}
                </div>
            </Stack>

            <Stack tokens={{ childrenGap: 5 }}>
                <TextField
                    label={"Beschriftung"}
                    value={value.labelText}
                    maxLength={100}
                    onChange={(ev, newValue) => onChange({ ...value, labelText: newValue ?? "" })}
                />
                <Text variant={"small"}>Die Beschriftung des Buttons.</Text>
            </Stack>

            <Stack tokens={{ childrenGap: 5 }}>
                <TextField
                    label={"Tooltip"}
                    value={value.tooltipText}
                    maxLength={1000}
                    onChange={(ev, newValue) => onChange({ ...value, tooltipText: newValue ?? "" })}
                />
                <Text variant={"small"}>
                    Der Tooltip-Text, welcher beim Hover über den Button angezeigt werden kann.
                </Text>
            </Stack>

            <Stack tokens={{ childrenGap: 5 }}>
                <TextField
                    label={"Icon"}
                    value={value.iconName}
                    maxLength={50}
                    onChange={(ev, newValue) => onChange({ ...value, iconName: newValue ?? "" })}
                />
                <Text variant={"small"}>Ein Icon, welches vor dem Button-Text angezeigt wird.</Text>
                <Text variant={"small"}>
                    <a
                        href={
                            "https://developer.microsoft.com/en-us/fluentui?fabricVer=6#/styles/web/icons#available-icons"
                        }
                        target={"_blank"}
                    >
                        Verfügbare Icons anzeigen
                    </a>
                </Text>
            </Stack>

            <Stack tokens={{ childrenGap: 5 }}>
                <TextField
                    label={"Funktionsname"}
                    value={value.functionName}
                    onChange={(ev, newValue) => onChange({ ...value, functionName: newValue ?? "" })}
                />
                <Text variant={"small"}>
                    Setze deiner JavaScript-Funktion. Beim Klick auf den Button wird{" "}
                    <u>window["{value.functionName}"]</u> ausgeführt.
                </Text>
                <Text variant={"small"}>
                    <strong>
                        Achtung: Funktionsname muss ausgefüllt sein, ansonsten wird der Button nicht angezeigt.
                    </strong>
                </Text>
            </Stack>

            <Stack tokens={{ childrenGap: 5 }}>
                <Text>Deaktiviert, wenn kein Listenelement ausgewählt?</Text>

                <Checkbox
                    checked={value.disabledWithoutSelection}
                    onChange={(ev, checked) => onChange({ ...value, disabledWithoutSelection: checked ?? false })}
                    label={
                        value.disabledWithoutSelection
                            ? "Button ist deaktiviert, wenn kein Listenelement ausgewählt"
                            : "Button ist nie deaktiviert"
                    }
                />
            </Stack>

            <ActionButton iconProps={{ iconName: "Delete" }} onClick={onDelete}>
                Button löschen
            </ActionButton>
        </Stack>
    );
};
