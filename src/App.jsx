import "./App.css";
import { useState } from "react";

// 3rd party
import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";

import MockUSD from "./contracts/MockUSD.json";
import Web3Shop from "./contracts/Web3Shop.json";

// components & pages
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page404 } from "./pages/Page404";

const providerOptions = {
    authereum: {
        package: Authereum,
    },
};
const mUSDaddr = "0x07FEA0C6A2575a979c7BCA7147aB0aB95f62C876";
const w3Shop = "0xcD5A36bF9A26233887623318D0403F023476695d";
const account2 = "0x31BE7847554B0513929DfBEE908F0F6c722498Aa";

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
        const W3SCONTR = new WEB3.eth.Contract(Web3Shop.abi, w3Shop);
        const ACCs = await WEB3.eth.getAccounts();

        setWeb3(WEB3);
        setMusdContr(MUSDCONTR);
        setW3ShopContr(W3SCONTR);
        setAccounts(ACCs);
        currentAcc = ACCs[0];

        console.log("all accounts: ", ACCs);
        console.log("current account: ", currentAcc);
    };

    return (
        <BrowserRouter>
            <Navigation web3connect={web3connect} />
            <Switch>
                <Route path="/" exact>
                    <HomePage
                        web3connect={web3connect}
                        web3={web3}
                        mUSDcontr={mUSDcontr}
                        w3ShopContr={w3ShopContr}
                        accounts={accounts}
                    />
                </Route>
                {/* <Route path="/products/" exact component={ProductsPage} />
                <Route path="/products/:productId" exact />
                <Route path="/cart" exact /> */}
                <Route component={Page404} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
