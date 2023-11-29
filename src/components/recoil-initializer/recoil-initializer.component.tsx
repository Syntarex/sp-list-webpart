import { isEqual } from "lodash";
import * as React from "react";
import { RecoilRoot, useRecoilRefresher_UNSTABLE, useRecoilState } from "recoil";
import { listDataSelector } from "../../data/list.data";
import { webpartPropertiesAtom } from "../../data/webpart.data";
import { ListWebPartProps } from "../../webparts/list/list.webpart";

interface RecoilInitializerProps {
    properties: ListWebPartProps;
    children: React.ReactNode;
}

const RecoilInitializerInner = (props: RecoilInitializerProps) => {
    const { properties, children } = props;

    const [webpartProperties, setWebpartProperties] = useRecoilState(webpartPropertiesAtom);
    const refreshListData = useRecoilRefresher_UNSTABLE(listDataSelector);

    // Setze Webpart Properties in Atom 🚀
    React.useEffect(() => {
        if (!isEqual(properties, webpartProperties)) {
            setWebpartProperties(properties);
        }
    }, [properties, webpartProperties, setWebpartProperties]);

    // Stelle globale Funktion zum Aktualisieren der Liste bereit
    React.useEffect(() => {
        (window as any)["refresh"] = refreshListData;
    }, [refreshListData]);

    return <>{children}</>;
};

export const RecoilInitializer = (props: RecoilInitializerProps) => {
    return (
        <RecoilRoot>
            <RecoilInitializerInner {...props} />
        </RecoilRoot>
    );
};
