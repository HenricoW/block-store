import React from "react";
import { useSelector } from "react-redux";

export const ProductsPage = ({ renderProductList }) => {
    const products = useSelector((state) => state.allProducts.products);

    return (
        <section className="all-products">
            <div className="container">
                <h2 className="all-prod-heading">All Products</h2>
                <div className="grid-latest">{renderProductList(products, 20, 30, 50)}</div>
            </div>
        </section>
    );
};
