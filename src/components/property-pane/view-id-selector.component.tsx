import { Stack, Text, TextField } from "office-ui-fabric-react";
import * as React from "react";

interface ViewIdSelectorProps {
    onChange: (newValue: string) => void;
    value: string;
}

export const ViewIdSelector = (props: ViewIdSelectorProps) => {
    const { value, onChange } = props;

    // Der Text in der Textbox
    const [text, setText] = React.useState("");

    // Passe Text in der Textbox an, sollte sich der Wert von außen ändern
    React.useEffect(() => setText(value), [value]);

    const onBlur = React.useCallback(() => onChange(text), [text, onChange]);

    return (
        <Stack tokens={{ childrenGap: 5 }}>
            <TextField
                label={"Ansicht-ID*"}
                value={text}
                maxLength={36}
                onChange={(ev, newValue) => setText(newValue ?? "")}
                onBlur={onBlur}
            />
            <Text variant={"small"}>
                Die UUID der anzuzeigenden Ansicht. Eine Ansicht ist nötig, da über diese die anzuzeigenden Spalten
                bezogen werden.
            </Text>
        </Stack>
    );
};
