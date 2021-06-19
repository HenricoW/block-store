import { combineReducers } from "redux";
import { productsReducer } from "./productsReducers";
import { reviewsReducer } from "./reviewsReducer";
import { exclusiveProductReducer } from "./exclusiveProductReducer";
import { adminReducer } from "./adminReducer";

const reducers = combineReducers({
    allProducts: productsReducer,
    allReviews: reviewsReducer,
    exclusiveProd: exclusiveProductReducer,
    adminPanel: adminReducer,
});

export default reducers;
