import { isEqual } from "lodash";
import * as React from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { webpartPropertiesAtom } from "../../data/webpart.data";
import { ListWebPartProps } from "../../webparts/list/list.webpart";

interface RecoilInitializerProps {
    properties: ListWebPartProps;
    children: React.ReactNode;
}

const RecoilInitializerInner = (props: RecoilInitializerProps) => {
    const { properties, children } = props;

    const [webpartProperties, setWebpartProperties] = useRecoilState(webpartPropertiesAtom);

    // Setze Webpart Properties in Atom 🚀
    React.useEffect(() => {
        if (!isEqual(properties, webpartProperties)) {
            setWebpartProperties(properties);
        }
    }, [properties, webpartProperties, setWebpartProperties]);

    return <>{children}</>;
};

export const RecoilInitializer = (props: RecoilInitializerProps) => {
    return (
        <RecoilRoot>
            <RecoilInitializerInner {...props} />
        </RecoilRoot>
    );
};
