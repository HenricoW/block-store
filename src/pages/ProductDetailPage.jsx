import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../redux/actions/currentProductActions";

const nftEndpoint = process.env.REACT_APP_FB_API_URL + "/nft";

export const ProductDetailPage = ({ web3, contracts, accounts, web3connect }) => {
  const { product_id } = useParams();

  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const history = useHistory();
  const qty = useRef(null);

  useEffect(() => {
    if (products.length < 1) history.push("/products");
    else qty.current.value = 1;
    dispatch(selectProduct(product_id));
    window.scroll(0, 0);
  }, [products.length, product_id, dispatch, history]);

  const product = useSelector((state) => state.allProducts.currentItem);

  const handleMMError = (err) => {
    if (err.message.includes("User denied transaction")) {
      alert("You rejected the transaction"); // change to modal
    }
    console.log(err.message);
  };

  // depends on: web3, contracts, accounts, nftEndpoint, handleMMError
  const onBuy = async (qty, product) => {
    if (web3 === undefined || contracts.USDcontr === undefined || contracts.storeContr === undefined) {
      web3connect();
      return;
    }

    if (!product.id) {
      const err = new Error("Selected item ID not set");
      console.log(err);
      return;
    }

    const amount = web3.utils.toWei((qty * product.price).toString(), "mwei");
    console.log(amount.toString());
    const currAcc = accounts[0];

    // set the approval
    try {
      await contracts.USDcontr.methods.approve(contracts.storeContr.options.address, amount).send({ from: currAcc });
    } catch (err) {
      console.log(new Error("Approval failed"));
      handleMMError(err);
      return;
    }

    const nftData = {
      name: product.title,
      description: product.desc,
      image: product.imageUrl,
      itemID: product.id,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // cunduct the purchase
    let tokenID;
    contracts.storeContr.methods
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
      .then((data) => {
        console.log(data);
        console.log("NFT data successfully written");
      })
      .catch((err) => {
        console.log(new Error("Transaction failed"));
        handleMMError(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuy(qty.current.value, product);
  };

  return product ? (
    <section className="product-detail">
      <div className="container">
        <div className="detail-grid">
          <div className="product-image">
            <img src={`${product.imageUrl}`} alt={product.title} />
          </div>
          <div className="product-text">
            <div className="instructions">
              <p>
                <b>If you are on Rinkeby:</b>
              </p>
              <p>
                Go{" "}
                <a href="https://app.compound.finance/" target="blank">
                  Compound Finance
                </a>{" "}
                and mint testnet USDC.
              </p>
              <p>
                Go to the USD Coin supply line - Go to the 'WITHDRAW' part of the pop-up - At the bottom, find the
                'FAUCET' link - Click it to mint 100 USDC - come back and enjoy the site.
              </p>
            </div>
            <h2>{product.title}</h2>
            <h3>$ {product.price}</h3>
            <p>{product.desc}</p>
            <form onSubmit={handleSubmit}>
              <input type="number" name="qty" id="qty" ref={qty} min={1} max={10} />
              <button>Buy Now</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );
};
