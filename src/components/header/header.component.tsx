import { Stack, Text } from "office-ui-fabric-react";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { listInfoSelector } from "../../data/list.data";
import { WindowButton } from "../window-button/window-button.component";
import styles from "./header.module.scss";

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;

    const listInfo = useRecoilValue(listInfoSelector);

    return (
        <Stack wrap horizontal className={className} verticalAlign={"center"} tokens={{ childrenGap: 10 }}>
            <Stack.Item>
                <WindowButton
                    disabledWithoutSelection
                    tooltipText={"Teste mich"}
                    functionName={"testing"}
                    iconProps={{ iconName: "Edit" }}
                />
            </Stack.Item>

            <Stack.Item>
                <Text className={styles.headline}>{listInfo.Title}</Text>
            </Stack.Item>
        </Stack>
    );
};
