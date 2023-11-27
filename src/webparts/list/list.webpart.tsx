import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from "../../components/main.component";
import { RecoilInitializer } from "../../components/recoil-initializer/recoil-initializer.component";
import { log } from "../../util/log.util";

export interface ListWebPartProps {
    listId: string | null /** Die Liste, welche vom WebPart angezeigt wird. */;
    viewId: string | null /** Die Ansicht, der konfigurierten Liste, welche vom WebPart angezeigt wird. */;
    pageSize: number /** Wie viele Elemente pro Seite angezeigt werden sollen. */;
}

export default class ListWebPart extends BaseClientSideWebPart<ListWebPartProps> {
    public async onInit(): Promise<void> {
        log("Initializing PnPJS");

        sp.setup({ spfxContext: this.context });
    }

    public render(): void {
        log("Rerendering webpart");

        ReactDOM.render(
            <React.Suspense fallback={null}>
                <RecoilInitializer properties={this.properties}>
                    <Main />
                </RecoilInitializer>
            </React.Suspense>,
            this.domElement,
        );
    }

    protected onDispose(): void {
        ReactDOM.unmountComponentAtNode(this.domElement);
    }
}
