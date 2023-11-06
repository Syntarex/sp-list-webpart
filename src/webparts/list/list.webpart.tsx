import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Main } from "../../components/main/main.component";
import { RecoilInitializer } from "../../components/recoil-initializer/recoil-initializer.component";
import { log } from "../../util/log.util";

export interface ListWebPartProps {
    listName: string /** Die Liste, welche vom WebPart angezeigt wird. */;
}

export default class ListWebPart extends BaseClientSideWebPart<ListWebPartProps> {
    public render(): void {
        log("Rerendering webpart");

        ReactDOM.render(
            <RecoilInitializer properties={this.properties}>
                <Main />
            </RecoilInitializer>,
            this.domElement,
        );
    }

    protected onDispose(): void {
        ReactDOM.unmountComponentAtNode(this.domElement);
    }
}
