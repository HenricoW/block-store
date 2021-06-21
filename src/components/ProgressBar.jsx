import React from "react";
import useStorage from "../hooks/useStorage";

export const ProgressBar = ({ file, submitted }) => {
    // get upload details from firebase
    const { progress, url } = useStorage(file, "images");

    return (
        <>
            {/* while image is uploading */}
            {!url ? <div className="upload-success">Uploading...</div> : ""}
            {!url && <div className="upload-progress" style={{ width: `${progress}%` }}></div>}
            {/* after image has uploaded but form has not been submitted */}
            {url && !submitted && <div className="upload-success">Upload successful</div>}
        </>
    );
};
