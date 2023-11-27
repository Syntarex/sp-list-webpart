import { Text } from "office-ui-fabric-react";
import * as React from "react";
import { classNames } from "../../util/styles.util";
import styles from "./chip.module.scss";

interface ChipProps {
    className?: string;
    value: string;
}

/** Rendert ein Element als Chip. */
export const Chip = (props: ChipProps) => {
    const { className, value } = props;

    return (
        <div className={classNames(styles.chip, className)}>
            <Text>{value}</Text>
        </div>
    );
};
