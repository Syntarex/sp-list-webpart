import { Stack } from "office-ui-fabric-react";
import * as React from "react";
import { Header } from "./header/header.component";
import { List } from "./list/list.component";
import { Pager } from "./pager/pager.component";

export const Main = () => {
    return (
        <Stack tokens={{ childrenGap: 10 }}>
            <Header />
            <List />
            <Pager />
        </Stack>
    );
};
