import { compact } from "lodash";

export const classNames = (...classNames: (string | undefined)[]): string => {
    return compact(classNames).join(", ");
};
