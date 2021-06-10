import React from "react";
import { brands } from "../dataTemp";

const renderBrands = (list) =>
    list.map((brand) => <img key={brand.id} src={`/images/${brand.src}`} alt="brand logo" />);

export const BrandsList = () => {
    return (
        <section className="brands">
            <div className="container">
                <div className="grid-brands">{renderBrands(brands)}</div>
            </div>
        </section>
    );
};
