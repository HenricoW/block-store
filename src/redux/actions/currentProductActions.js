import { currentProductActions } from "./actionConstants";

const selectProduct = (id) => ({
    type: currentProductActions.SELECT_PRODUCT,
    payload: id,
});

const deselectProduct = () => ({
    type: currentProductActions.DESELECT_PRODUCT,
    payload: null,
});

const selectFeatured = () => ({
    type: currentProductActions.SELECT_FEATURED,
    payload: null,
});

export { selectProduct, deselectProduct, selectFeatured };
