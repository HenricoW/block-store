import React from "react";
import { useDispatch } from "react-redux";
import useStorage from "../hooks/useStorage";
import { setImageUrl } from "../redux/actions/adminPanelActions";

export const ProgressBar = ({ file }) => {
    // get upload details from firebase
    const { progress, url } = useStorage(file, "images");

    // redux
    const dispatch = useDispatch();
    // have to add slight delay so this component and it parent are not
    // updated at the same time, triggering each other
    url && setTimeout(() => dispatch(setImageUrl(url)), 50);

    return (
        <>
            {!url && <div className="upload-progress" style={{ width: `${progress}%` }}></div>}
            {url && <div className="upload-success">Upload successful</div>}
        </>
    );
};
