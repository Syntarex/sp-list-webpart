import { max, min, toNumber, toString } from "lodash";
import { Stack, Text, TextField } from "office-ui-fabric-react";
import * as React from "react";

interface PageSizeTextfieldProps {
    onChange: (newValue: number) => void;
    value: number;
}

export const PageSizeTextfield = (props: PageSizeTextfieldProps) => {
    const { value, onChange } = props;

    // Der Text in der Textbox
    const [text, setText] = React.useState("");

    // Passe Text in der Textbox an, sollte sich der Wert von außen ändern
    React.useEffect(() => setText(toString(value)), [value]);

    const onBlur = React.useCallback(() => {
        // Zahl mindestens 1, höchstens 5000
        // 50, wenn keine Zahl eingegeben wurde
        // Listenabfragen können höchstens 5000 Elemente groß sein
        const num = min([max([1, toNumber(text ?? 50)]), 5000]) ?? 50;

        setText(toString(num));
        onChange(num);
    }, [text, onChange]);

    return (
        <Stack tokens={{ childrenGap: 5 }}>
            <TextField
                label={"Seitengröße*"}
                value={text}
                maxLength={4}
                onChange={(ev, newValue) => setText(newValue ?? "")}
                onBlur={onBlur}
            />
            <Text variant={"small"}>Wie viele Elemente sollen pro Seite angezeigt werden.</Text>
        </Stack>
    );
};
