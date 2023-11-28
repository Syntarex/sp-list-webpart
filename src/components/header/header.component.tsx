import { Stack } from "office-ui-fabric-react";
import * as React from "react";
import { WindowButton } from "../window-button/window-button.component";

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;

    return (
        <Stack wrap horizontal className={className} verticalAlign={"center"} tokens={{ childrenGap: 10 }}>
            <Stack.Item>
                <WindowButton functionName={"testing"} iconProps={{ iconName: "Edit" }}>
                    Teste mich
                </WindowButton>
            </Stack.Item>
        </Stack>
    );
};
