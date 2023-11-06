import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Main } from "../../components/main/main.component";

export interface IListWebPartProps {
    listName: string /** Die Liste, welche vom WebPart angezeigt wird. */;
}

export default class ListWebPart extends BaseClientSideWebPart<IListWebPartProps> {
    public render(): void {
        console.log("Listen-Name", this.properties.listName);

        ReactDOM.render(<Main />, this.domElement);
    }

    protected onDispose(): void {
        ReactDOM.unmountComponentAtNode(this.domElement);
    }
}
