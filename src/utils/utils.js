import Web3Modal from "web3modal";
import Web3 from "web3";
import Authereum from "authereum";

import MockUSD from "../contracts/MockUSD.json";
import Web3Shop from "../contracts/Web3Shop.json";

const providerOptions = {
    authereum: {
        package: Authereum,
    },
};

const getWeb3 = async () => {
    const web3Modal = new Web3Modal({ cacheProvider: false, providerOptions });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    return [web3, provider];
};

const getContracts = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const mUSDaddr = MockUSD.networks[networkId.toString()].address;
    const w3ShopAddr = Web3Shop.networks[networkId.toString()].address;

    const mUSDcontr = new web3.eth.Contract(MockUSD.abi, mUSDaddr);
    const storeContr = new web3.eth.Contract(Web3Shop.abi, w3ShopAddr);

    return [mUSDcontr, storeContr];
};

export { getWeb3, getContracts };
