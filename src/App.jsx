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

    return (
        <BrowserRouter>
            <Navigation web3connect={web3connect} />
            <Switch>
                <Route path="/" exact>
                    <HomePage
                        web3={web3}
                        mUSDcontr={mUSDcontr}
                        w3ShopContr={w3ShopContr}
                        accounts={accounts}
                        web3connect={web3connect}
                        renderProductList={renderProductList}
                    />
                </Route>
                <Route path="/products" exact>
                    <ProductsPage renderProductList={renderProductList} />
                </Route>
                <Route path="/products/:product_id" exact component={ProductDetailPage} />
                <Route component={Page404} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
