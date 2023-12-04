import * as React from "react";
import { useRecoilState } from "recoil";
import { errorsAtom } from "../../data/error.data";

interface ErrorBoundaryInnerProps {
    onError: (error: Error) => void;
    children: React.ReactNode;
}

/**
 * Ein React-ErrorBoundary.
 * Leider als Klassen-Komponente, da React hierfür noch keine Hooks bereitstellt.
 * https://legacy.reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
 * */
class ErrorBoundaryInner extends React.Component<ErrorBoundaryInnerProps> {
    componentDidCatch(error: Error) {
        this.props.onError(error);
    }

    render() {
        return <>{this.props.children}</>;
    }
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

/** Fängt alle Fehler, welche im React-Lifecycle der children droppen auf und schreibt sie in ein Recoil-Atom. */
export const ErrorBoundary = (props: ErrorBoundaryProps) => {
    const { children } = props;

    const [errors, setErrors] = useRecoilState(errorsAtom);

    const onError = React.useCallback(
        (error: Error) => {
            setErrors([...errors, error]);
        },
        [errors, setErrors],
    );

    return <ErrorBoundaryInner onError={onError}>{children}</ErrorBoundaryInner>;
};
