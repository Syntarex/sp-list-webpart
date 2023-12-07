import { Spinner, Stack } from "office-ui-fabric-react";
import * as React from "react";

interface LoadingProps {
    children: React.ReactNode;
}

export const Loading = (props: LoadingProps) => {
    return (
        <React.Suspense
            fallback={
                <Stack horizontalAlign={"center"} verticalAlign={"center"}>
                    <Spinner />
                </Stack>
            }
        >
            {props.children}
        </React.Suspense>
    );
};
