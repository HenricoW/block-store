import React from "react";
import { useSelector } from "react-redux";
import { BrandsList } from "../components/BrandsList";
import { ButtonCTA } from "../components/ButtonCTA";
import { TestimonialCard } from "../components/TestimonialCard";

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

export const HomePage = ({ onBuy, renderProductList }) => {
    // redux
    const products = useSelector((state) => state.allProducts.products);
    const reviews = useSelector((state) => state.allReviews);
    const exclusiveProd = useSelector((state) => state.exclusiveProd);

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
            <section className="exclusive-product">
                <div className="container">
                    <img src="/images/exclusive.png" alt="exclusive product" />
                    <div className="right-col">
                        <h3>Exclusively available on the Web3 Store</h3>
                        <h1>{exclusiveProd.title}</h1>
                        <p>{exclusiveProd.desription}</p>
                        <ButtonCTA to={"/"} isHero={false} fn={() => onBuy(exclusiveProd.price)}>
                            Buy now
                        </ButtonCTA>
                    </div>
                </div>
            </section>
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
