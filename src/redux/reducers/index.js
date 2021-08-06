import { combineReducers } from "redux";
import { productsReducer } from "./productsReducers";
import { reviewsReducer } from "./reviewsReducer";
import { adminReducer } from "./adminReducer";

const reducers = combineReducers({
    allProducts: productsReducer,
    allReviews: reviewsReducer,
    adminPanel: adminReducer,
});

export default reducers;
