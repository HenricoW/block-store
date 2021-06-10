import "./App.css";
import { BrandsList } from "./components/BrandsList";
import { ButtonCTA } from "./components/ButtonCTA";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { ProductCard } from "./components/ProductCard";
import { TestimonialCard } from "./components/TestimonialCard";
import { productsTemp, reviews } from "./dataTemp";

// use for featured and latest, condition data from store before passing to this fn
const renderProductList = (products) => {
    return products.map((prod, idx) => (
        <ProductCard key={prod.id} title={prod.title} price={prod.price} image={prod.image} hiddenSm={idx >= 2} />
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

function App() {
    return (
        <>
            <Navigation />
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
                    <div className="grid-featured">{renderProductList(productsTemp)}</div>
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
                    <div className="grid-latest">{renderProductList(productsTemp)}</div>
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
