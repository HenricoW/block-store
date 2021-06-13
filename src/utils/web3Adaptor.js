import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import MockUSD from "../../build/contracts/MockUSD.json";

const providerOptions = {
    authereum: {
        package: Authereum,
    },
};
const mUSDaddr = "0x34EC7d546b3E1D06e84baA790510453fF373c380";
const w3Shop = "0x04099c3b0AEaCB89d91dfF27BEbC6D6a4D7F70C6";

const web3Modal = new Web3Modal({ providerOptions });

let provider, web3;
const web3connect = async () => {
    provider = await web3Modal.connect();
    web3 = new Web3(provider);
};

const mUSDcontr = new web3.eth.Contract(MockUSD, mUSDaddr);

export { web3, mUSDcontr };
