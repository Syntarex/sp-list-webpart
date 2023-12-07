import { isEmpty, isEqual, xorWith } from "lodash";

// https://stackoverflow.com/questions/37065663/array-of-object-deep-comparison-with-lodash
export const isArrayEqual = (arr1: any[], arr2: any[]) => {
    return isEmpty(xorWith(arr1, arr2, isEqual));
};
