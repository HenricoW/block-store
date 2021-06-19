import { adminPanelActions } from "./actionConstants";

const setImageUrl = (url) => ({
    type: adminPanelActions.SET_IMAGE_URL,
    payload: url,
});

export { setImageUrl };
