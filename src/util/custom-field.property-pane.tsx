import * as React from "react";
import * as ReactDOM from "react-dom";

import { IPropertyPaneCustomFieldProps, IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-webpart-base";
import { RecoilRoot } from "recoil";

export class CustomPropertyPaneField implements IPropertyPaneField<IPropertyPaneCustomFieldProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyPaneCustomFieldProps;
    private elem?: HTMLElement;

    constructor(
        public targetProperty: string,
        private value: any,
        private onPropertyChange: (propertyPath: string, newValue: any) => void,
        private Component: (props: { value: any; onChange: (newValue: any) => void }) => JSX.Element,
    ) {
        this.properties = {
            key: `custom-${targetProperty}`,
            onDispose: this.onDispose.bind(this),
            onRender: this.onRender.bind(this),
        };
    }

    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }

    private onDispose(element: HTMLElement): void {
        ReactDOM.unmountComponentAtNode(element);
    }

    private onRender(elem: HTMLElement): void {
        if (!this.elem) {
            this.elem = elem;
        }

        ReactDOM.render(
            <RecoilRoot>
                <this.Component value={this.value} onChange={this.onChange.bind(this)} />
            </RecoilRoot>,
            this.elem,
        );
    }

    private onChange(newValue: any) {
        this.onPropertyChange(this.targetProperty, newValue);
    }
}
