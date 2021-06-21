const MUSD = artifacts.require("MockUSD");
const Stoken = artifacts.require("ShopToken");
const W3Shop = artifacts.require("Web3Shop");

const { expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

contract("Shop tests", async (accounts) => {
    const [admin, user1, user2, _] = accounts;

    let musd, stoken, w3shop;
    beforeEach(async () => {
        musd = await MUSD.new();
        w3shop = await W3Shop.new(musd.address);
        stoken = await Stoken.new(w3shop.address);
        await w3shop.updateShopToken(stoken.address);
    });

    // MockUSD contract
    it("should mint payment token", async () => {
        await musd.faucet(web3.utils.toWei("100"), { from: user1 });
        let balU1 = await musd.balanceOf(user1);
        balU1 = web3.utils.fromWei(balU1);

        assert(balU1 === "100");
    });

    // ShopToken contract
    //  1. should mint deployer the owner portion
    //  2. should change the shop address

    it("should mint deployer the owner portion", async () => {
        let maxSupply = await stoken.maxSupply();
        let ownerFraction = await stoken.ownerFraction();
        maxSupply = web3.utils.fromWei(maxSupply);
        ownerFraction = ownerFraction;

        let ownerBal = await stoken.balanceOf(admin);
        ownerBal = web3.utils.fromWei(ownerBal);
        // console.log("The owner's balance of the Shop token: ", ownerBal);

        // expected values
        const expectedVal = (ownerFraction * maxSupply) / 100;

        assert(parseInt(ownerBal) === expectedVal);
    });

    // it("should change the shop address", async () => {
    //     const shopAddress = await stoken.getShopAddress();
    //     const shopAddress2 = await w3shop.address;

    //     await stoken.updateShopAddress(user2);
    //     const shopAddress3 = await stoken.getShopAddress();

    //     assert(shopAddress === shopAddress2);
    //     assert(shopAddress3 === user2);
    // });

    // Shop main contract
    //  1. should get the purchase value & mint the shop token
    //  2. should NOT exceed the shop token mint limit
    //  3. should refund a client the payment token
    //  4. should refund a client and burn client's shop tokens
    //  5. should NOT refund a client (exceeds total spend)
    //  6. should NOT refund or burn client tokens (insufficient shop tokens)

    // it("should get the purchase value & mint the shop token", async () => {
    //     await musd.faucet(web3.utils.toWei("1000"), { from: user1 });
    //     let balBefore = await musd.balanceOf(w3shop.address);
    //     balBefore = web3.utils.fromWei(balBefore);

    //     const purchaseVal = 200;

    //     let rewardRatio = await w3shop.rewardRatio();
    //     rewardRatio = parseInt(rewardRatio);

    //     // condduct purchase
    //     await musd.approve(w3shop.address, web3.utils.toWei(purchaseVal.toString()), { from: user1 });
    //     await w3shop.purchase(web3.utils.toWei(purchaseVal.toString()), { from: user1 });

    //     // get shop balance in payment token, user balance in reward token
    //     let balAfter = await musd.balanceOf(w3shop.address);
    //     balAfter = web3.utils.fromWei(balAfter);
    //     let balSToken = await stoken.balanceOf(user1);
    //     balSToken = web3.utils.fromWei(balSToken);

    //     // expected values
    //     const eBalStkn = purchaseVal / rewardRatio;

    //     assert(balBefore === "0");
    //     assert(balAfter === purchaseVal.toString());
    //     assert(balSToken === eBalStkn.toString());
    // });

    it("should NOT exceed the shop token mint limit", async () => {
        await musd.faucet(web3.utils.toWei("70100000"), { from: user1 });

        const purchaseVal = 69900000;

        // conduct purchase
        await musd.approve(w3shop.address, web3.utils.toWei(purchaseVal.toString()), { from: user1 });
        await w3shop.purchase(web3.utils.toWei(purchaseVal.toString()), { from: user1 });

        // get # of reward tokens minted
        let sTknIssued = await stoken.totalSupply();
        sTknIssued = web3.utils.fromWei(sTknIssued);

        const purchase2Val = 150000;

        // conduct purchase
        await musd.approve(w3shop.address, web3.utils.toWei(purchase2Val.toString()), { from: user1 });
        const { txHash } = await w3shop.purchase(web3.utils.toWei(purchase2Val.toString()), { from: user1 });

        expectEvent.inTransaction(txHash, contract, "ShopTokenSupply", {
            message: "Near or at max Shop token supply",
        });
    });
});
