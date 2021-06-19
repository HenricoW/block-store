import { adminPanelActions } from "../actions/actionConstants";

const initState = {
    imageUrl: "",
};

const adminReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case adminPanelActions.SET_IMAGE_URL:
            return { ...state, imageUrl: payload };

        default:
            return state;
    }
};

export { adminReducer };
