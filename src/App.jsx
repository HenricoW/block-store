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
import { useDispatch } from "react-redux";
import { setProducts } from "./redux/actions/productsActions";
import { setReviews } from "./redux/actions/reviewsActions";
import { selectFeatured } from "./redux/actions/currentProductActions";

// API endpoints
const productsEndpoint = process.env.REACT_APP_FB_API_URL + "/products";
const reviewEndpoint = process.env.REACT_APP_FB_API_URL + "/reviews";

function App() {
    const [web3, setWeb3] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [contracts, setContracts] = useState({ storeContr: undefined, mUSDcontr: undefined });
    const [accounts, setAccounts] = useState(undefined);
    const [admin, setAdmin] = useState("");

    // redux
    const dispatch = useDispatch();

    // connect to wallet, get & set web3, provider and contract instances in state (from getWeb3 import)
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

    // change state (rerender) on account change
    if (provider) provider.on("accountsChanged", (accs) => setAccounts(accs));

    // get products and review data from API
    useEffect(() => {
        fetch(productsEndpoint)
            .then((resp) => resp.json())
            .then((data) => {
                dispatch(setProducts(data));
                dispatch(selectFeatured());
            })
            .catch((err) => console.log(err));

        fetch(reviewEndpoint)
            .then((resp) => resp.json())
            .then((data) => dispatch(setReviews(data)))
            .catch((err) => console.log(err));
    }, [dispatch]);

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
                    <ProductDetailPage
                        web3={web3}
                        contracts={contracts}
                        accounts={accounts}
                        web3connect={web3connect}
                    />
                </Route>
                <Route path="/admin" exact>
                    <AdminPage accounts={accounts} owner={admin} web3={web3} productsEndpoint={productsEndpoint} />
                </Route>
                <Route component={Page404} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
