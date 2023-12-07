import { ceil } from "lodash";
import { IconButton, Stack, Text } from "office-ui-fabric-react";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { listInfoSelector } from "../../data/list.data";
import { pageAtom } from "../../data/ui.data";
import { webpartPropertiesAtom } from "../../data/webpart.data";
import styles from "./pager.module.scss";

interface PagerProps {
    className?: string;
}

export const Pager = (props: PagerProps) => {
    const { className } = props;

    const webpartProperties = useRecoilValue(webpartPropertiesAtom);
    const [page, setPage] = useRecoilState(pageAtom);

    const listInfo = useRecoilValue(listInfoSelector);
    const pageCount = React.useMemo(
        () => ceil(listInfo.ItemCount / webpartProperties.pageSize),
        [webpartProperties, listInfo],
    );

    const onBackClicked = React.useCallback(() => {
        // Benutzer befindet sich auf der ersten Seite
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    }, [page, setPage]);

    const onForwardClicked = React.useCallback(() => {
        // Benutzer befindet sich auf der letzten Seite
        if (page === pageCount) {
            return;
        }

        setPage(page + 1);
    }, [page, pageCount, setPage]);

    // Pager muss nicht angezeigt werden, da wir nur eine Seite haben
    if (pageCount <= 1) {
        return null;
    }

    return (
        <Stack horizontal horizontalAlign={"center"} verticalAlign={"center"} tokens={{ childrenGap: 20 }}>
            <IconButton disabled={page === 1} iconProps={{ iconName: "ChromeBack" }} onClick={onBackClicked} />

            <Text className={styles.page}>{page}</Text>

            <IconButton
                disabled={page === pageCount}
                iconProps={{ iconName: "ChromeBackMirrored" }}
                onClick={onForwardClicked}
            />
        </Stack>
    );
};
