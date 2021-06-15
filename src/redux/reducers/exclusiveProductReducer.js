import { exclusiveProductActions } from "../actions/actionConstants";

const initState = {};

const exclusiveProductReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case exclusiveProductActions.SET_EXCLUSIVE_PRODUCT:
            return payload;

        case exclusiveProductActions.CLEAR_EXCLUSIVE_PRODUCT:
            return {};

        default:
            return state;
    }
};

export { exclusiveProductReducer };
