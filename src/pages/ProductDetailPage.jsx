import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../redux/actions/currentProductActions";

export const ProductDetailPage = ({ onBuy }) => {
    const { product_id } = useParams();

    const products = useSelector((state) => state.allProducts.products);

    const dispatch = useDispatch();
    dispatch(selectProduct(product_id));
    const product = useSelector((state) => state.allProducts.currentItem);

    const history = useHistory();
    const qty = useRef(null);

    useEffect(() => {
        if (products.length < 1) history.push("/products");
        else qty.current.value = 1;
        window.scroll(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onBuy(qty.current.value * product.price);
    };

    return product ? (
        <section className="product-detail">
            <div className="container">
                <div className="detail-grid">
                    <div className="product-image">
                        <img src={`${product.url}`} alt={product.title} />
                    </div>
                    <div className="product-text">
                        <h2>{product.title}</h2>
                        <h3>$ {product.price}</h3>
                        <p>{product.desc}</p>
                        <form onSubmit={handleSubmit}>
                            <input type="number" name="qty" id="qty" ref={qty} min={1} max={10} />
                            <button>Buy Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <div>Loading...</div>
    );
};
