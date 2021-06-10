import React from "react";

export const ProductCard = (props) => {
    const { title, price, image, hiddenSm } = props;

    return (
        <div className={`product-card ${hiddenSm && "hidden-sm"}`}>
            <img src={`/images/${image}`} alt="featured product" />
            <div className="card-text">
                <h4>{title}</h4>
                <div className="rating"></div>
                <p>$ {price}</p>
            </div>
        </div>
    );
};
