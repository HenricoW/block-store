import { productActionTypes, currentProductActions } from "../actions/actionConstants";

const initState = {
    products: [],
    currentItem: {},
};

let nuProducts;
const productsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case productActionTypes.SET_PRODUCTS:
            return { ...state, products: payload };

        case productActionTypes.ADD_PRODUCT:
            return { ...state, products: [...state.products, payload] };

        case productActionTypes.REMOVE_PRODUCT:
            if (state.products.length === 0) return state;
            nuProducts = state.products.filter((item) => item.id !== payload);
            return { ...state, products: nuProducts };

        case productActionTypes.UPDATE_PRODUCT:
            if (state.products.length === 0) return state;
            nuProducts = state.products.map((item) => {
                return item.id === payload.id ? { id: item.id, ...payload.product } : item; // payload.product should not contain an id field
            });
            return { ...state, products: nuProducts };

        // current product
        case currentProductActions.SELECT_PRODUCT:
            const item = state.products.filter((item) => item.id === payload);
            return { ...state, currentItem: item[0] };

        case currentProductActions.DESELECT_PRODUCT:
            return { ...state, currentItem: {} };

        default:
            return state;
    }
};

export { productsReducer };
