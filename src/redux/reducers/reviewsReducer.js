import { reviewsActions } from "../actions/actionConstants";

const initState = [];

const reviewsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case reviewsActions.SET_REVIEWS:
            return payload;

        case reviewsActions.ADD_REVIEW:
            return [...state, payload];

        default:
            return state;
    }
};

export { reviewsReducer };
