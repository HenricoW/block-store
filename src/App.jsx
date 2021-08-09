import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// 3rd party
import { getWeb3, getContracts } from "./utils/utils";

// components & pages
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { ProductCard } from "./components/ProductCard";

import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { Page404 } from "./pages/Page404";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AdminPage } from "./pages/AdminPage";

// redux
import { reviews } from "./dataTemp"; // migrate to db in full
import { useDispatch } from "react-redux";
import { setProducts } from "./redux/actions/productsActions";
import { setReviews } from "./redux/actions/reviewsActions";
import { selectFeatured } from "./redux/actions/currentProductActions";

function App() {
    const [web3, setWeb3] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [contracts, setContracts] = useState({ storeContr: undefined, mUSDcontr: undefined });
    const [accounts, setAccounts] = useState(undefined);
    const [admin, setAdmin] = useState("");

    const web3connect = async () => {
        let _web3, _provider;
        try {
            [_web3, _provider] = await getWeb3();
            setWeb3(_web3);
            setProvider(_provider);
        } catch (err) {
            console.log(err.message);
            if (err.message === "Modal closed by user") return;
        }

        const [mUSDcontr, storeContr] = await getContracts(_web3);
        setContracts({ storeContr, mUSDcontr });
        const userAccounts = await _web3.eth.getAccounts();
        setAccounts(userAccounts);
        const adminAddr = await storeContr.methods.owner().call();
        setAdmin(adminAddr);
    };

    if (provider) provider.on("accountsChanged", (accs) => setAccounts(accs));

    useEffect(() => {
        if (accounts) {
            console.log("Saving current account in Session.");
            sessionStorage.setItem("connectedAcc", accounts[0]);
        }
    }, [accounts]);

    // redux
    const dispatch = useDispatch();

    const productsEndpoint = "https://us-central1-store-w3-api.cloudfunctions.net/api2/products";
    const nftEndpoint = "https://us-central1-store-w3-api.cloudfunctions.net/api2/nft";
    // const nftEndpoint = "http://localhost:5000/store-w3-api/us-central1/api2/nft/";

    useEffect(() => {
        fetch(productsEndpoint)
            .then((resp) => resp.json())
            .then((data) => {
                dispatch(setProducts(data));
                dispatch(setReviews(reviews));
                dispatch(selectFeatured());
            })
            .catch((err) => console.log(err));
    }, []);

    // use for featured and latest, condition data from store before passing to this fn
    const renderProductList = (products, limitSmall, limitMedium, limit) => {
        return products.map((prod, idx) => (
            <ProductCard
                key={prod.id}
                id={prod.id}
                title={prod.title}
                price={prod.price}
                imageUrl={prod.imageUrl}
                hiddenSm={idx >= limitSmall && idx < limitMedium}
                hiddenMd={idx >= limitMedium && idx < limit}
                hidden={idx >= limit}
            />
        ));
    };

    const handleMMError = (err) => {
        if (err.message.includes("User denied transaction")) {
            alert("You rejected the transaction"); // change to modal
        }
        console.log(err.message);
    };

    const onBuy = async (qty, product) => {
        if (web3 === undefined || contracts.mUSDcontr === undefined || contracts.storeContr === undefined) {
            web3connect();
            return;
        }

        if (!product.id) {
            const err = new Error("Selected item ID not set");
            console.log(err);
            return;
        }

        const amount = web3.utils.toWei((qty * product.price).toString());
        const currAcc = accounts[0];

        try {
            await contracts.mUSDcontr.methods
                .approve(contracts.storeContr.options.address, amount)
                .send({ from: currAcc })
                .catch((err) => {
                    handleMMError(err);
                    throw new Error("Approval failed");
                });
        } catch (err) {
            console.log(err);
            return;
        }

        const nftData = {
            title: product.title,
            desc: product.desc,
            imageUrl: product.imageUrl,
            itemID: product.id,
        };

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };

        let tokenID;
        await contracts.storeContr.methods
            .purchase(amount, product.id)
            .send({ from: currAcc })
            .then((receipt) => {
                tokenID = receipt.events.nftMinted.returnValues.nftID;
                return fetch(nftEndpoint, {
                    ...fetchOptions,
                    body: JSON.stringify({ ...nftData, tokenID }),
                });
            })
            .then((resp) => resp.json())
            .then(() => console.log("NFT data successfully written"))
            .catch((err) => {
                handleMMError(err);
            });
    };

    return (
        <BrowserRouter>
            <Navigation web3connect={web3connect} accounts={accounts} owner={admin} />
            <Switch>
                <Route path="/" exact>
                    <HomePage renderProductList={renderProductList} />
                </Route>
                <Route path="/products" exact>
                    <ProductsPage renderProductList={renderProductList} />
                </Route>
                <Route path="/products/:product_id" exact>
                    <ProductDetailPage onBuy={onBuy} />
                </Route>
                <Route path="/admin" exact>
                    <AdminPage accounts={accounts} owner={admin} web3={web3} />
                </Route>
                <Route component={Page404} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
