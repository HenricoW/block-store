const productActionTypes = {
    SET_PRODUCTS: "SET_PRODUCTS",
    ADD_PRODUCT: "ADD_PRODUCT",
    REMOVE_PRODUCT: "REMOVE_PRODUCT",
    UPDATE_PRODUCT: "UPDATE_PRODUCT",
};

const currentProductActions = {
    SELECT_PRODUCT: "SELECT_PRODUCT",
    DESELECT_PRODUCT: "DESELECT_PRODUCT",
    SELECT_FEATURED: "SELECT_FEATURED",
};

const reviewsActions = {
    SET_REVIEWS: "SET_REVIEWS",
    ADD_REVIEW: "ADD_REVIEW",
};

const adminPanelActions = {
    SET_IMAGE_URL: "SET_IMAGE_URL",
};

export { productActionTypes, currentProductActions, reviewsActions, adminPanelActions };
