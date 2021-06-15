import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../redux/actions/currentProductActions";

export const ProductDetailPage = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    const { product_id } = useParams();

    // redux
    const dispatch = useDispatch();
    dispatch(selectProduct(Number(product_id)));
    const product = useSelector((state) => state.allProducts.currentItem);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className="product-detail">
            <div className="container">
                <div className="detail-grid">
                    <div className="product-image">
                        <img src={`/images/${product.image}`} alt={product.title} />
                        {/* <p>{product.description}</p> */}
                    </div>
                    <div className="product-text">
                        <h2>{product.title}</h2>
                        <h3>$ {product.price}</h3>
                        <p>{product.description}</p>
                        <form onSubmit={handleSubmit}>
                            <input type="number" name="qty" id="qty" min={1} max={10} />
                            <button>Buy Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
