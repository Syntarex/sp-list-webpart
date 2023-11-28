import { toUpper } from "lodash";
import { Persona, PersonaSize } from "office-ui-fabric-react";
import * as React from "react";
import ListWebPart from "../../webparts/list/list.webpart";

interface UserOrGroupProps {
    className?: string;
    value: {
        Title: string;
        EMail: string;
    };
}

/** Rendert einen Benutzer oder eine Gruppe. */
export const UserOrGroup = (props: UserOrGroupProps) => {
    const { className, value } = props;

    const imageInitials = React.useMemo(() => toUpper(value.Title.substring(0, 2)), [value]);
    const imageUrl = React.useMemo(
        () => `${ListWebPart.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?UserName=${value.EMail}&size=L`,
        [value],
    );

    return (
        <Persona
            className={className}
            imageUrl={imageUrl}
            imageInitials={imageInitials}
            text={value.Title}
            size={PersonaSize.size24}
        />
    );
};
