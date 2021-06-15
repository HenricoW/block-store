import { exclusiveProductActions } from "./actionConstants";

const setExclusiveProduct = (product) => ({
    type: exclusiveProductActions.SET_EXCLUSIVE_PRODUCT,
    payload: product,
});

const clearExclusiveProduct = () => ({
    type: exclusiveProductActions.CLEAR_EXCLUSIVE_PRODUCT,
    payload: null,
});

export { setExclusiveProduct, clearExclusiveProduct };
