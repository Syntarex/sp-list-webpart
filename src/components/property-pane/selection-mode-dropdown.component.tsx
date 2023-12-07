import { Dropdown, SelectionMode, Stack, Text } from "office-ui-fabric-react";
import * as React from "react";

interface SelectionModeDropdownProps {
    onChange: (newValue: SelectionMode) => void;
    value: SelectionMode;
}

export const SelectionModeDropdown = (props: SelectionModeDropdownProps) => {
    const { value, onChange } = props;

    const [selectionMode, setSelectionMode] = React.useState(SelectionMode.none);
    React.useEffect(() => setSelectionMode(value), [value]);

    const onSelect = React.useCallback(
        (newValue: SelectionMode) => {
            setSelectionMode(newValue);
            onChange(newValue);
        },
        [onChange],
    );

    return (
        <Stack tokens={{ childrenGap: 5 }}>
            <Dropdown
                label={"Auswahl-Modus"}
                selectedKey={selectionMode}
                onChange={(ev, option) => onSelect((option?.key as SelectionMode | undefined) ?? SelectionMode.none)}
                options={[
                    {
                        key: SelectionMode.none,
                        text: "Keine Auswahl",
                    },
                    {
                        key: SelectionMode.single,
                        text: "Einzelauswahl",
                    },
                    {
                        key: SelectionMode.multiple,
                        text: "Mehrfachauswahl",
                    },
                ]}
            />
            <Text variant={"small"}>Wie kann der Benutzer Listenelemente auswählen?</Text>
        </Stack>
    );
};
