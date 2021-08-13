import Web3Modal from "web3modal";
import Web3 from "web3";
import Authereum from "authereum";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";

import MockUSD from "../contracts/MockUSD.json";
import Web3Shop from "../contracts/Web3Shop.json";
import IERC20 from "../contracts/IERC20.json";

const USDC_rinkeby = "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b";

const providerOptions = {
    authereum: {
        package: Authereum,
    },
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: process.env.REACT_APP_INFURA_ID,
        },
    },
    torus: {
        package: Torus,
    },
};

const getWeb3 = async () => {
    const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
    let provider;
    try {
        provider = await web3Modal.connect();
    } catch (err) {
        throw new Error(err);
    }
    const web3 = new Web3(provider);

    return [web3, provider];
};

const getContracts = async (web3) => {
    const networkId = await web3.eth.net.getId();

    const w3ShopAddr = Web3Shop.networks[networkId.toString()].address;
    const storeContr = new web3.eth.Contract(Web3Shop.abi, w3ShopAddr);

    let USDcontr;
    switch (networkId) {
        case 5777: // ganache
            const mUSDaddr = MockUSD.networks[networkId.toString()].address;
            USDcontr = new web3.eth.Contract(MockUSD.abi, mUSDaddr);
            break;
        case 4: // rinkeby
            USDcontr = new web3.eth.Contract(IERC20.abi, USDC_rinkeby);
            break;
        default:
            USDcontr = null;
    }

    return [USDcontr, storeContr];
};

export { getWeb3, getContracts };
