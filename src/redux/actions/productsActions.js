import { productActionTypes } from "./actionConstants";

const setProducts = (products) => ({
    type: productActionTypes.SET_PRODUCTS,
    payload: products,
});

const addProduct = (product) => ({
    type: productActionTypes.ADD_PRODUCT,
    payload: product,
});

const removeProduct = (id) => ({
    type: productActionTypes.REMOVE_PRODUCT,
    payload: id,
});

const updateProduct = (id, product) => ({
    type: productActionTypes.UPDATE_PRODUCT,
    payload: { id, product },
});

export { setProducts, addProduct, removeProduct, updateProduct };
