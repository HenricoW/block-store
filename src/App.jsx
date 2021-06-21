import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// 3rd party
import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";

import MockUSD from "./contracts/MockUSD.json";
import Web3Shop from "./contracts/Web3Shop.json";

// components & pages
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { ProductCard } from "./components/ProductCard";

import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { Page404 } from "./pages/Page404";
import { ProductDetailPage } from "./pages/ProductDetailPage";

// redux
import { productsTemp, reviews, exclusiveProd } from "./dataTemp";

import { useDispatch } from "react-redux";
import { setProducts } from "./redux/actions/productsActions";
import { setReviews } from "./redux/actions/reviewsActions";
import { setExclusiveProduct } from "./redux/actions/exclusiveProductActions";
import { AdminPage } from "./pages/AdminPage";

const providerOptions = {
    authereum: {
        package: Authereum,
    },
};
const mUSDaddr = "0x07FEA0C6A2575a979c7BCA7147aB0aB95f62C876";
const w3ShopAddr = "0xcD5A36bF9A26233887623318D0403F023476695d";

const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });

let provider, currentAcc;
function App() {
    // web3
    const [web3, setWeb3] = useState(undefined);
    const [mUSDcontr, setMusdContr] = useState(undefined);
    const [w3ShopContr, setW3ShopContr] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);

    const web3connect = async () => {
        provider = await web3Modal.connect();
        const WEB3 = new Web3(provider);
        const MUSDCONTR = new WEB3.eth.Contract(MockUSD.abi, mUSDaddr);
        const W3SCONTR = new WEB3.eth.Contract(Web3Shop.abi, w3ShopAddr);
        const ACCs = await WEB3.eth.getAccounts();

        setWeb3(WEB3);
        setMusdContr(MUSDCONTR);
        setW3ShopContr(W3SCONTR);
        setAccounts(ACCs);
        currentAcc = ACCs[0];

        console.log("all accounts: ", ACCs);
        console.log("current account: ", currentAcc);
    };

    // redux
    const dispatch = useDispatch();
    dispatch(setProducts(productsTemp));
    dispatch(setReviews(reviews));
    dispatch(setExclusiveProduct(exclusiveProd));

    // use for featured and latest, condition data from store before passing to this fn
    const renderProductList = (products, limitSmall, limitMedium, limit) => {
        return products.map((prod, idx) => (
            <ProductCard
                key={prod.id}
                id={prod.id}
                title={prod.title}
                price={prod.price}
                image={prod.image}
                hiddenSm={idx >= limitSmall && idx < limitMedium}
                hiddenMd={idx >= limitMedium && idx < limit}
                hidden={idx >= limit}
            />
        ));
    };

    const handleMMError = (err) => {
        if (err.message.includes("User denied transaction")) {
            // notify user with modal
            alert("You rejected the transaction"); // change to modal
        }
        console.log(err.message);
    };

    const onBuy = async (price) => {
        if (web3 === undefined || mUSDcontr === undefined || w3ShopContr === undefined) {
            web3connect();
            return;
        }

        const amount = web3.utils.toWei(price.toString());
        const currAcc = accounts[0];

        await mUSDcontr.methods
            .approve(w3ShopContr.options.address, amount)
            .send({ from: currAcc })
            .catch((err) => {
                handleMMError(err);
            });

        await w3ShopContr.methods
            .purchase(amount)
            .send({ from: currAcc })
            .catch((err) => {
                handleMMError(err);
            });
    };

    return (
        <BrowserRouter>
            <Navigation web3connect={web3connect} />
            <Switch>
                <Route path="/" exact>
                    <HomePage onBuy={onBuy} renderProductList={renderProductList} />
                </Route>
                <Route path="/products" exact>
                    <ProductsPage renderProductList={renderProductList} />
                </Route>
                <Route path="/products/:product_id" exact>
                    <ProductDetailPage onBuy={onBuy} />
                </Route>
                <Route path="/admin" exact component={AdminPage} />
                <Route component={Page404} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
