import { PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";

// "Properties"
interface HelloWorldProps {
    counterStartValue: number;
    buttonText: string | undefined;
}

export const HelloWorld = (props: HelloWorldProps) => {
    // Ein State
    const [counter, setCounter] = React.useState(props.counterStartValue);

    // Funktion zum Hochzählen
    const countUp = () => {
        setCounter(counter + 1);
    };

    // JSX
    return (
        <div>
            <p>Counter: {counter}</p>
            <PrimaryButton onClick={countUp}>{props.buttonText}</PrimaryButton>
        </div>
    );
};
