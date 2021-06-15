import { reviewsActions } from "./actionConstants";

const setReviews = (reviews) => ({
    type: reviewsActions.SET_REVIEWS,
    payload: reviews,
});

const addReview = (review) => ({
    type: reviewsActions.ADD_REVIEW,
    payload: review,
});

export { setReviews, addReview };
