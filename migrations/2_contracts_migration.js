const MockUSD = artifacts.require("MockUSD");
const W3Shop = artifacts.require("Web3Shop");
const SToken = artifacts.require("ShopToken");
const NFTcontr = artifacts.require("W3StoreProduct");

module.exports = async function (deployer, _network, accounts) {
    const [admin, cust1, cust2, _] = accounts;

    const NFTapiEndpoint = "https://totally-legit-url.com/nft/";

    await deployer.deploy(MockUSD, { from: admin });
    const mUSD = await MockUSD.deployed();

    await deployer.deploy(W3Shop, mUSD.address, NFTapiEndpoint, { from: admin });
    const w3shop = await W3Shop.deployed();

    await deployer.deploy(SToken, w3shop.address, { from: admin });
    const stkn = await SToken.deployed();

    await deployer.deploy(NFTcontr, "A", "B", "C", { from: admin }); // to have available in Truffle CLI

    await w3shop.updateShopToken(stkn.address, { from: admin });

    await mUSD.faucet(web3.utils.toWei("1000"), { from: cust1 });
    await mUSD.faucet(web3.utils.toWei("300"), { from: cust2 });
    await mUSD.faucet(web3.utils.toWei("100"), { from: admin });
};
