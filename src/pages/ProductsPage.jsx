import React from "react";
import { productsTemp } from "../dataTemp";

export const ProductsPage = ({ renderProductList }) => {
    return (
        <section className="all-products">
            <div className="container">
                <h2 className="all-prod-heading">All Products</h2>
                <div className="grid-latest">{renderProductList(productsTemp, 0, 0, 50)}</div>
            </div>
        </section>
    );
};
