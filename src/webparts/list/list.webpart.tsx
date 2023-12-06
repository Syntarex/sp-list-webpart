import { PageContext } from "@microsoft/sp-page-context";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { initializeIcons } from "@uifabric/icons";
import * as dayjs from "dayjs";
import "dayjs/locale/de";
import { MessageBar, MessageBarType, Text } from "office-ui-fabric-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ErrorBoundary } from "../../components/error-boundary/error-boundary.component";
import { Main } from "../../components/main.component";
import { RecoilInitializer } from "../../components/recoil-initializer/recoil-initializer.component";
import { log } from "../../util/log.util";

export interface ListWebPartProps {
    [index: string]: any;
    listId: string | null /** Die Liste, welche vom WebPart angezeigt wird. */;
    viewId: string | null /** Die Ansicht, der konfigurierten Liste, welche vom WebPart angezeigt wird. */;
    pageSize: number /** Wie viele Elemente pro Seite angezeigt werden sollen. */;
}

export default class ListWebPart extends BaseClientSideWebPart<ListWebPartProps> {
    public static pageContext: PageContext;

    public async onInit(): Promise<void> {
        log("Initializing Icons.");
        initializeIcons();

        log("Initializing PageContext.");
        ListWebPart.pageContext = this.context.pageContext;

        log("Initializing PnPJS.");
        sp.setup({ spfxContext: this.context });

        log("Initializing dayJS.");
        dayjs.locale("de");
    }

    public render(): void {
        log("Rerendering webpart");

        // Rendere nichts, wenn WebPart im Edit-Mode
        // Die WebPart-Properties sollten nicht an zwei Stellen (WebPart & PropertyPane) gleichzeitig verwendet werden
        if (document.location.href.indexOf("Mode=Edit") > -1) {
            ReactDOM.render(
                <MessageBar messageBarType={MessageBarType.warning}>
                    <Text>Listen-WebPart kann während der Bearbeitung nicht gerendert werden.</Text>
                </MessageBar>,
                this.domElement,
            );

            return;
        }

        ReactDOM.render(
            <React.Suspense fallback={null}>
                <RecoilInitializer properties={this.properties}>
                    <ErrorBoundary>
                        <Main />
                    </ErrorBoundary>
                </RecoilInitializer>
            </React.Suspense>,
            this.domElement,
        );
    }

    protected onDispose(): void {
        ReactDOM.unmountComponentAtNode(this.domElement);
    }
}
