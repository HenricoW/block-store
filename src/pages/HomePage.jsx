import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrandsList } from "../components/BrandsList";
import { ButtonCTA } from "../components/ButtonCTA";
import { TestimonialCard } from "../components/TestimonialCard";
import { selectFeatured } from "../redux/actions/currentProductActions";

const renderTestimonials = (reviews) => {
    return reviews.map((review, idx) => (
        <TestimonialCard
            key={review.id}
            text={review.text}
            image={review.image}
            name={review.name}
            hiddenSm={idx >= 2}
        />
    ));
};

export const HomePage = ({ renderProductList }) => {
    // redux
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts.products);
    const reviews = useSelector((state) => state.allReviews);

    useEffect(() => {
        dispatch(selectFeatured());
    }, []);

    const exclusiveProd = useSelector((state) => state.allProducts.currentItem);

    return (
        <>
            <section className="hero-section">
                <div className="container">
                    <div className="left-col">
                        <h1>Work out with new style</h1>
                        <p>Presenting a new way to shop with Web 3.0</p>
                        <ButtonCTA to={"/products"} isHero={true} fn={() => {}}>
                            Experience it now!
                        </ButtonCTA>
                    </div>
                    <img src="/images/image1.png" alt="hero" />
                </div>
            </section>
            <section className="featured-products">
                <div className="container">
                    <h2>Featured Products</h2>
                    <div className="grid-featured">{renderProductList(products, 2, 3, 4)}</div>
                </div>
            </section>
            {exclusiveProd ? (
                <section className="exclusive-product">
                    <div className="container">
                        <img src="/images/exclusive.png" alt="exclusive product" />
                        <div className="right-col">
                            <h3>Exclusively available on the Web3 Store</h3>
                            <h1>{exclusiveProd.title}</h1>
                            <p>{exclusiveProd.desc}</p>
                            <ButtonCTA to={`/products/${exclusiveProd.id}`} isHero={false} fn={() => {}}>
                                Buy now
                            </ButtonCTA>
                        </div>
                    </div>
                </section>
            ) : null}
            <section className="latest-products">
                <div className="container">
                    <h2>Latest Products</h2>
                    <div className="grid-latest">{renderProductList(products, 2, 4, 6)}</div>
                </div>
            </section>
            <section className="testimonials">
                <div className="container">
                    <div className="grid-testimonial">{renderTestimonials(reviews)}</div>
                </div>
            </section>
            <BrandsList />
        </>
    );
};
