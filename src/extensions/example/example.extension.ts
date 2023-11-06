import { BaseApplicationCustomizer } from "@microsoft/sp-application-base";

export default class ExampleApplicationCustomizer extends BaseApplicationCustomizer<unknown> {
    public async onInit(): Promise<void> {
        console.log("EXTENSION CODE HERE");
    }
}
