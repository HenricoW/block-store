import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "../components/ProgressBar";
import { fbFireStore, timestamp } from "../firebase/config";

export const AdminPage = () => {
    // component state
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    // DOM refs
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const priceRef = useRef(null);

    // redux
    const adminState = useSelector((state) => state.adminPanel);

    // firestore
    const dbRef = fbFireStore.collection("products");

    // handle image upload
    const allowedTypes = ["image/png", "image/jpeg"];
    const handleUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setSubmitted(false); // remove "Data capture success" message
        if (uploadedFile && allowedTypes.includes(uploadedFile.type)) {
            setError(null);
            setFile(uploadedFile);
        } else {
            setError("Only PNG or JPG files accepted");
            setFile(null);
        }
    };

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const title = titleRef.current.value;
        const desc = descRef.current.value;
        const price = parseFloat(priceRef.current.value);

        const productData = { title, desc, price, url: adminState.imageUrl, featured: false, createdAt: timestamp() };
        dbRef
            .add(productData)
            .catch((error) => {
                console.error("Error adding document: ", error);
                setError("Error adding document");
                setSubmitted(false);
            })
            .then(async (docRef) => {
                console.log("Document written with ID: ", docRef.id);
                // clear fields
                titleRef.current.value = "";
                descRef.current.value = "";
                priceRef.current.value = "";
                setFile(null);
            });
    };

    let imgUrl = "images/placeholder.svg";

    return (
        <section className="admin-panel">
            <div className="container">
                <h2 className="admin-panel-heading">Admin Panel</h2>
                <div className="editing-card">
                    <div className="img-mngr">
                        <div className="img-box">
                            <img src={adminState.imageUrl ? adminState.imageUrl : imgUrl} alt="uploaded product" />
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
                        {submitted && <div className="upload-success">Data capture success</div>}
                        {file && <ProgressBar file={file} submitted={submitted} />}
                    </div>
                    <form onSubmit={handleSubmit} className="product-form">
                        <h3>Add/Edit Product Info</h3>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" ref={titleRef} />
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows={4} ref={descRef}></textarea>
                        <label htmlFor="price">Price (USD)</label>
                        <input type="number" name="price" id="price" min={0} step={0.01} ref={priceRef} />
                        <button className="submit-btn">Submit</button>
                    </form>
                </div>
                <div className="grid-admin"></div>
            </div>
        </section>
    );
};
