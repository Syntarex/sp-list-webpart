import { PageContext } from "@microsoft/sp-page-context";
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { initializeIcons } from "@uifabric/icons";
import * as dayjs from "dayjs";
import "dayjs/locale/de";
import { clone, update } from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ErrorBoundary } from "../../components/error-boundary/error-boundary.component";
import { Main } from "../../components/main.component";
import { PageSizeTextfield } from "../../components/property-pane/page-size-textfield.component";
import { RecoilInitializer } from "../../components/recoil-initializer/recoil-initializer.component";
import { CustomPropertyPaneField } from "../../util/custom-field.property-pane";
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
        log("Rendering webpart.");

        // Klone Properties, damit diese durch die Übergabe nicht gesperrt werden
        // SPFx verhält sich hier komisch. Klone ich nicht, kann das PropertyPane kein Update mehr ausführen
        const properties = clone(this.properties);

        ReactDOM.render(
            <React.Suspense fallback={null}>
                <RecoilInitializer properties={properties}>
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

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    groups: [
                        {
                            groupFields: [
                                new CustomPropertyPaneField(
                                    "pageSize",
                                    this.properties.pageSize,
                                    this.onPropertyChange.bind(this),
                                    PageSizeTextfield,
                                ),
                            ],
                        },
                    ],
                },
            ],
        };
    }

    private onPropertyChange(propertyPath: string, newValue: any) {
        update(this.properties, propertyPath, () => newValue);
        this.render();
    }
}
