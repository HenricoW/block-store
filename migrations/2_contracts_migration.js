const MockUSD = artifacts.require("MockUSD");

module.exports = async function (deployer, _network, accounts) {
    await deployer.deploy(MockUSD);
    const mUSD = await MockUSD.deployed();

    await mUSD.faucet(web3.utils.toWei("1000"), { from: accounts[0] });
    await mUSD.faucet(web3.utils.toWei("300"), { from: accounts[1] });
};
