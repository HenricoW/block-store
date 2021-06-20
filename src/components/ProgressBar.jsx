import React from "react";
import useStorage from "../hooks/useStorage";

export const ProgressBar = ({ file }) => {
    // get upload details from firebase
    const { progress, url } = useStorage(file, "images");

    return (
        <>
            {!url ? <div className="upload-success">Uploading...</div> : ""}
            {!url && <div className="upload-progress" style={{ width: `${progress}%` }}></div>}
            {url && <div className="upload-success">Upload successful</div>}
        </>
    );
};
