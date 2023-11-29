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
                    <Stack.Item>
                        <Spinner />
                    </Stack.Item>
                </Stack>
            }
        >
            {props.children}
        </React.Suspense>
    );
};
