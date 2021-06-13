const MockUSD = artifacts.require("MockUSD");
const W3Shop = artifacts.require("Web3Shop");

module.exports = async function (deployer, _network, accounts) {
    const [admin, cust1, cust2, _] = accounts;

    await deployer.deploy(MockUSD, { from: admin });
    const mUSD = await MockUSD.deployed();

    await deployer.deploy(W3Shop, mUSD.address, { from: admin });
    const w3shop = await W3Shop.deployed();

    await mUSD.faucet(web3.utils.toWei("1000"), { from: cust1 });
    await mUSD.faucet(web3.utils.toWei("300"), { from: cust2 });
};
