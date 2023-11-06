import * as React from "react";
import { HelloWorld } from "../hello-world/hello-world.component";

export const Main = () => {
    return <HelloWorld counterStartValue={1} buttonText={"zähl hoch yo"} />;
};
