import "./App.css";

// 3rd party
import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";

// components & pages
import { BrandsList } from "./components/BrandsList";
import { ButtonCTA } from "./components/ButtonCTA";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { ProductCard } from "./components/ProductCard";
import { TestimonialCard } from "./components/TestimonialCard";
import { productsTemp, reviews } from "./dataTemp";

// use for featured and latest, condition data from store before passing to this fn
const renderProductList = (products, limitSmall, limitMedium, limit) => {
    return products.map((prod, idx) => (
        <ProductCard
            key={prod.id}
            title={prod.title}
            price={prod.price}
            image={prod.image}
            hiddenSm={idx >= limitSmall && idx < limitMedium}
            hiddenMd={idx >= limitMedium && idx < limit}
            hidden={idx >= limit}
        />
    ));
};

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

const providerOptions = {
    authereum: {
        package: Authereum,
    },
};

const web3Modal = new Web3Modal({ providerOptions });

function App() {
    let provider;
    const web3connect = async () => {
        provider = await web3Modal.connect();
    };

    return (
        <>
            <Navigation web3connect={web3connect} />
            <section className="hero-section">
                <div className="container">
                    <div className="left-col">
                        <h1>Work out with new style</h1>
                        <p>Presenting a new way to shop with Web 3.0</p>
                        <ButtonCTA to={"/products"} isHero={true}>
                            Experience it now!
                        </ButtonCTA>
                    </div>
                    <img src="/images/image1.png" alt="hero" />
                </div>
            </section>
            <section className="featured-products">
                <div className="container">
                    <h2>Featured Products</h2>
                    <div className="grid-featured">{renderProductList(productsTemp, 2, 2, 3)}</div>
                </div>
            </section>
            <section className="exclusive-product">
                <div className="container">
                    <img src="/images/exclusive.png" alt="exclusive product" />
                    <div className="right-col">
                        <h3>Exclusively available on the Web3 Store</h3>
                        <h1>Smart Band 9000</h1>
                        <p>
                            The Smart Band 9000 can... wait for it... TELL THE TIME! Get this bleeding edge piece of
                            technology now. Be the envy of your friends
                        </p>
                        <ButtonCTA to={"/product/1234"} isHero={false}>
                            Buy now
                        </ButtonCTA>
                    </div>
                </div>
            </section>
            <section className="latest-products">
                <div className="container">
                    <h2>Latest Products</h2>
                    <div className="grid-latest">{renderProductList(productsTemp, 2, 4, 6)}</div>
                </div>
            </section>
            <section className="testimonials">
                <div className="container">
                    <div className="grid-testimonial">{renderTestimonials(reviews)}</div>
                </div>
            </section>
            <BrandsList />
            <Footer />
        </>
    );
}

export default App;
