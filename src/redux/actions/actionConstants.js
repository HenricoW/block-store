const productActionTypes = {
    SET_PRODUCTS: "SET_PRODUCTS",
    ADD_PRODUCT: "ADD_PRODUCT",
    REMOVE_PRODUCT: "REMOVE_PRODUCT",
    UPDATE_PRODUCT: "UPDATE_PRODUCT",
};

const currentProductActions = {
    SELECT_PRODUCT: "SELECT_PRODUCT",
    DESELECT_PRODUCT: "DESELECT_PRODUCT",
};

const reviewsActions = {
    SET_REVIEWS: "SET_REVIEWS",
    ADD_REVIEW: "ADD_REVIEW",
};

const exclusiveProductActions = {
    SET_EXCLUSIVE_PRODUCT: "SET_EXCLUSIVE_PRODUCT",
    CLEAR_EXCLUSIVE_PRODUCT: "CLEAR_EXCLUSIVE_PRODUCT",
};

export { productActionTypes, currentProductActions, reviewsActions, exclusiveProductActions };
