import { combineReducers } from "redux";
import { productsReducer } from "./productsReducers";
import { reviewsReducer } from "./reviewsReducer";
import { exclusiveProductReducer } from "./exclusiveProductReducer";

const reducers = combineReducers({
    allProducts: productsReducer,
    allReviews: reviewsReducer,
    exclusiveProd: exclusiveProductReducer,
});

export default reducers;
