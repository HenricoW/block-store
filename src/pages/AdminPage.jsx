import React from "react";
import { useState } from "react";
import { ProgressBar } from "../components/ProgressBar";

export const AdminPage = () => {
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);

    const allowedTypes = ["image/png", "image/jpeg"];

    const handleUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile && allowedTypes.includes(uploadedFile.type)) {
            setError(null);
            setFile(uploadedFile);
        } else {
            setError("Only PNG or JPG files accepted");
            setFile(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className="admin-panel">
            <div className="container">
                <h2 className="admin-panel-heading">Admin Panel</h2>
                <div className="editing-card">
                    <div className="img-mngr">
                        <div className="img-box">
                            <img src="images/product-12.jpg" alt="uploaded product" />
                        </div>
                        <label htmlFor="file-input">Add an image</label>
                        <input
                            type="file"
                            className="file-input"
                            onChange={handleUpload}
                            name="file-input"
                            id="file-input"
                        />
                        {error && <div className="error">{error}</div>}
                        {file && <ProgressBar file={file} />}
                    </div>
                    <form onSubmit={handleSubmit} className="product-form">
                        <h3>Add/Edit Product Info</h3>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" />
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows={4}></textarea>
                        <label htmlFor="price">Price (USD)</label>
                        <input type="number" name="price" id="price" min={0} step={0.01} />
                        <button className="submit-btn">Submit</button>
                    </form>
                </div>
                <div className="grid-admin"></div>
            </div>
        </section>
    );
};
