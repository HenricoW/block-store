import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { ProgressBar } from "../components/ProgressBar";

export const AdminPage = ({ accounts, owner, web3, productsEndpoint }) => {
    // component state
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    // DOM refs
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const priceRef = useRef(null);

    const history = useHistory();

    useEffect(() => {
        if (!accounts || !owner || accounts[0].toLowerCase() !== owner.toLowerCase()) {
            history.push("/");
            return;
        }
    }, [accounts]);

    // redux
    const adminState = useSelector((state) => state.adminPanel); // set in useStorage custom hook, as called in ProgressBar component

    // handle image upload
    const allowedTypes = ["image/png", "image/jpeg"];
    const handleUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setSubmitted(false); // removes "Data capture success" message
        if (uploadedFile && allowedTypes.includes(uploadedFile.type)) {
            setError(null);
            setFile(uploadedFile);
        } else {
            setError("Only PNG or JPG files accepted");
            setFile(null);
        }
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please upload a file");
            return;
        }
        setSubmitted(true);
        const title = titleRef.current.value;
        const desc = descRef.current.value;
        const price = parseFloat(priceRef.current.value);

        const message = "This is a public (announcement) message";
        let signature;
        try {
            signature = await web3.eth.personal.sign(message, accounts[0]);
            console.log(signature);
        } catch (err) {
            console.log(err);
        }

        const productData = {
            title,
            desc,
            price,
            imageUrl: adminState.imageUrl,
            message,
            signedMssg: signature,
        };

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        };

        fetch(productsEndpoint, fetchOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    let imgUrl = "images/placeholder.svg";

    return (
        <section className="admin-panel">
            <div className="container">
                <h2 className="admin-panel-heading">Admin Panel - Add a Product</h2>
                <div className="editing-card">
                    <div className="img-mngr">
                        <h3>Product Image</h3>
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
                        <input
                            type="text"
                            name="title"
                            id="title"
                            ref={titleRef}
                            pattern="[a-zA-Z0-9\- ]+"
                            required="required"
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            ref={descRef}
                            required="required"
                        ></textarea>
                        <label htmlFor="price">Price (USD) [0.00 - 9999.99]</label>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            ref={priceRef}
                            pattern="\d{1,4}\.\d{2}"
                            required="required"
                        />
                        <button className="submit-btn">Submit</button>
                    </form>
                </div>
                <div className="grid-admin"></div>
            </div>
        </section>
    );
};
