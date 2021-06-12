import "./App.css";

// 3rd party
import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";

import MockUSD from "./contracts/MockUSD.json";

// components & pages
import { BrandsList } from "./components/BrandsList";
import { ButtonCTA } from "./components/ButtonCTA";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { ProductCard } from "./components/ProductCard";
import { TestimonialCard } from "./components/TestimonialCard";
import { productsTemp, reviews } from "./dataTemp";
import { useEffect, useState } from "react";

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
const mUSDaddr = "0x07FEA0C6A2575a979c7BCA7147aB0aB95f62C876";

const account2 = "0x31BE7847554B0513929DfBEE908F0F6c722498Aa";

const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });

let provider, currentAcc;
function App() {
    const [web3, setWeb3] = useState(undefined);
    const [mUSDcontr, setMusdContr] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);

    const web3connect = async () => {
        provider = await web3Modal.connect();
        console.log("cached provider: ", web3Modal.cachedProvider);
        const WEB3 = new Web3(provider);
        const MUSDCONTR = new WEB3.eth.Contract(MockUSD.abi, mUSDaddr);
        const ACCs = await WEB3.eth.getAccounts();

        setWeb3(WEB3);
        setMusdContr(MUSDCONTR);
        setAccounts(ACCs);
        currentAcc = ACCs[0];

        console.log("all accounts: ", ACCs);
        console.log("current account: ", currentAcc);
    };

    // useEffect(() => {
    //     const init = async () => {
    //         await web3connect();
    //     };

    //     init();
    // }, []);

    const onBuy = async (price) => {
        if (web3 === undefined || accounts === undefined) {
            web3connect();
            return;
        }

        const amount = web3.utils.toWei(price.toString());

        // await mUSDcontr.methods
        //     .approve(account2, amount)
        //     .send({ from: currentAcc })
        //     .catch((err) => {
        //         if (err.message.includes("User denied transaction")) alert("You rejected the transaction");
        //         console.log(err);
        //     });

        // await mUSDcontr.methods.transferFrom(currentAcc, account2, amount).send({ from: account2 });
        await mUSDcontr.methods
            .transfer(account2, amount)
            .send({ from: currentAcc })
            .catch((err) => {
                if (err.message.includes("User denied transaction")) alert("You rejected the transaction");
                console.log(err);
            });
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
                        <ButtonCTA to={"/product/1234"} isHero={false} fn={() => onBuy(32.95)}>
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
