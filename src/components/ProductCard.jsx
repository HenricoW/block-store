import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = (props) => {
    const { id, title, price, imageUrl, hiddenSm, hiddenMd, hidden } = props;

    return (
        <div
            className={`product-card ${hiddenSm ? "hidden-sm" : ""} ${hiddenMd ? "hidden-md" : ""} ${
                hidden ? "hidden" : ""
            }`}
        >
            <Link to={`/products/${id}`}>
                <img src={`${imageUrl}`} alt="featured product" />
                <div className="card-text">
                    <h4>{title}</h4>
                    <div className="rating"></div>
                    <p>$ {price}</p>
                </div>
            </Link>
        </div>
    );
};
