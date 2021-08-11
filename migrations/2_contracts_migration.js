const MockUSD = artifacts.require("MockUSD");
const W3Shop = artifacts.require("Web3Shop");
const SToken = artifacts.require("ShopToken");
const NFTcontr = artifacts.require("W3StoreProduct");

rinkebyUSDC = "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b";

module.exports = async function (deployer, network, accounts) {
    const [admin, cust1, cust2, _] = accounts;

    const NFTapiEndpoint = process.env.REACT_APP_FB_API_URL + "/nft/";

    let shopCurrencyAddr;
    switch (network) {
        case "development": {
            await deployer.deploy(MockUSD, { from: admin });
            const mUSD = await MockUSD.deployed();

            await mUSD.faucet(web3.utils.toWei("1000"), { from: cust1 });
            await mUSD.faucet(web3.utils.toWei("300"), { from: cust2 });
            await mUSD.faucet(web3.utils.toWei("100"), { from: admin });

            shopCurrencyAddr = mUSD.address;
        }
        case "rinkeby":
            shopCurrencyAddr = rinkebyUSDC;
    }

    // deploy the main Shop contract, specifying the shop currency & the NFT api endpoint
    // NFT contract is deployed by the Shop contract
    await deployer.deploy(W3Shop, shopCurrencyAddr, NFTapiEndpoint, { from: admin });
    const w3shop = await W3Shop.deployed();

    // deploy the shop reward token, specifying the Shop contract address
    await deployer.deploy(SToken, w3shop.address, { from: admin });
    const stkn = await SToken.deployed();
    await w3shop.updateShopToken(stkn.address, { from: admin });
};
