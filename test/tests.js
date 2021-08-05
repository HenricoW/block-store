const MUSD = artifacts.require("MockUSD");
const Stoken = artifacts.require("ShopToken");
const W3Shop = artifacts.require("Web3Shop");
const NFTcontr = artifacts.require("W3StoreProduct");

const { expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

contract("Shop tests", async (accounts) => {
    const [admin, user1, user2, _] = accounts;
    const baseEndpoint = "https://totally-legit-url.com/nft/";

    let musd, stoken, w3shop, nftContr;
    beforeEach(async () => {
        musd = await MUSD.new();
        w3shop = await W3Shop.new(musd.address, baseEndpoint);
        stoken = await Stoken.new(w3shop.address);
        await w3shop.updateShopToken(stoken.address);
        const nftAddr = await w3shop.storeNFTaddress();
        nftContr = await NFTcontr.at(nftAddr);
    });

    // MockUSD contract - PASSES
    // it("should mint payment token", async () => {
    //     await musd.faucet(web3.utils.toWei("100"), { from: user1 });
    //     let balU1 = await musd.balanceOf(user1);
    //     balU1 = web3.utils.fromWei(balU1);

    //     assert(balU1 === "100");
    // });

    // ShopToken contract
    //  1. should mint deployer the owner portion
    //  2. should change the shop address
    //  3. should NOT change the shop address
    //  4. fn(reward) tested in "Shop main contract" tests section
    //  5. fn(burn) tested in "Shop main contract" tests section

    // PASSES
    it("should mint deployer the owner portion", async () => {
        let maxSupply = await stoken.maxSupply();
        let ownerFraction = await stoken.ownerFraction();
        maxSupply = web3.utils.fromWei(maxSupply);
        // ownerFraction = ownerFraction;

        let ownerBal = await stoken.balanceOf(admin);
        ownerBal = web3.utils.fromWei(ownerBal);
        // console.log("The owner's balance of the Shop token: ", ownerBal);

        // expected values
        const expectedVal = (ownerFraction * maxSupply) / 100;

        assert(parseInt(ownerBal) === expectedVal);
    });

    // PASSES
    it("should change the shop address", async () => {
        const shopAddress = await stoken.getShopAddress();
        const shopAddress2 = await w3shop.address;

        await stoken.updateShopAddress(user2); // any address just to test
        const shopAddress3 = await stoken.getShopAddress();

        assert(shopAddress === shopAddress2);
        assert(shopAddress3 === user2);
    });

    // PASSES
    it("should NOT change the shop address", async () => {
        await expectRevert(stoken.updateShopAddress(user2, { from: user1 }), "ShopToken: Unauthorized access"); // test-helpers fail
        // await expectRevert.unspecified(stoken.updateShopAddress(user2, { from: user1 })); // any address just to test
    });

    // NFT contract tests:
    // 1. should deploy the NFT contract
    // 2. should change the base URL
    // 3. should mint a token
    // 4. should NOT change the base URL: via NFT contract
    // 5. should NOT change the base URL: via Shop contract
    // 6. should NOT mint a token: via NFT contract (via Shop contract tested under "Shop main contract" -> purchase tests)

    // PASSES
    it("should deploy the NFT contract", async () => {
        const nftAddr = await w3shop.storeNFTaddress();
        const nftAddr2 = nftContr.address;

        const baseUrl = await nftContr.baseUri();

        assert(nftAddr === nftAddr2);
        assert(baseUrl === baseEndpoint);
    });

    // PASSES
    it("should change the base URL", async () => {
        const baseUrl1 = await nftContr.baseUri();
        newBaseUrl = "http://www.google.com/nft/";
        await w3shop.setNFTbaseUri(newBaseUrl);

        const baseUrl2 = await nftContr.baseUri();
        assert(baseUrl2 === newBaseUrl);
    });

    // PASSES
    it("should mint a token", async () => {
        await musd.faucet(web3.utils.toWei("100"));

        const total = web3.utils.toWei("50");
        const amount1 = web3.utils.toWei("20");
        const amount2 = web3.utils.toWei("20");
        await musd.approve(w3shop.address, total);

        const item_id = "IB5YUS1m7B5JCALlNtAN";
        const { receipt } = await w3shop.purchase(amount1, item_id);

        expectEvent(receipt, "paymentMade", { customer: admin, amount: amount1 });
        expectEvent(receipt, "nftMinted", { customer: admin, itemID: item_id });

        const event = receipt.logs.filter((log) => log.event === "nftMinted")[0];
        const tokenID = +event.args.nftID.toString();

        // check if itemID & tokenID are associated in state variable
        const dbID = await nftContr.itemIds(tokenID);
        assert(dbID === item_id);
    });

    // PASSES
    it("should NOT change the base URL: via NFT contract", async () => {
        // Using nft contract directly (Meant to be done via Shop main contracat, which will succeed)
        await expectRevert(nftContr.setBaseURI("http://blah-blah.com/"), "Ownable: caller is not the owner");
    });

    // PASSES
    it("should NOT change the base URL: via Shop contract", async () => {
        await expectRevert(
            w3shop.setNFTbaseUri("http://blah-blah.com/", { from: user1 }),
            "Ownable: caller is not the owner"
        );
    });

    // PASSES
    it("should NOT mint a token: via NFT contract", async () => {
        const item_id = "IB5YUS1m7B5JCALlNtAN";
        // Using nft contract directly (Meant to be done via Shop main contract, which will succeed)
        await expectRevert(nftContr.mintToken(user1, item_id, { from: user1 }), "Ownable: caller is not the owner");
    });

    // Shop main contract
    //  1. should get the purchase value, mint the shop token & mint an NFT
    //  2. should refund a client the payment token
    //  3. should refund a client and burn client's shop tokens
    //  4. should NOT refund a client (exceeds total spend)
    //  5. should NOT refund or burn client tokens (insufficient shop tokens)
    //  6. should NOT exceed the shop token mint limit

    // PASSES
    it("should get the purchase value, mint the shop token & mint an NFT", async () => {
        await musd.faucet(web3.utils.toWei("1000"), { from: user1 });
        let balBefore = await musd.balanceOf(w3shop.address);
        balBefore = web3.utils.fromWei(balBefore);
        let nftBalBefore = await nftContr.balanceOf(user1);

        const purchValN = 200;
        const purchaseVal = web3.utils.toWei(purchValN.toString());
        const item_id = "IB5YUS1m7B5JCALlNtAN";

        let rewardRatio = await w3shop.rewardRatio();
        rewardRatio = parseInt(rewardRatio);

        // conduct purchase
        await musd.approve(w3shop.address, purchaseVal, { from: user1 });
        await w3shop.purchase(purchaseVal, item_id, { from: user1 });

        // get shop balance in payment token, user balance in reward token
        let balAfter = await musd.balanceOf(w3shop.address);
        balAfter = web3.utils.fromWei(balAfter);
        let balSToken = await stoken.balanceOf(user1);
        balSToken = web3.utils.fromWei(balSToken);
        let nftBalAfter = await nftContr.balanceOf(user1);

        // expected values
        const eBalStkn = purchValN / rewardRatio;

        assert(nftBalBefore.toString() === "0");
        assert(nftBalAfter.toString() === "1");
        assert(balBefore === "0");
        assert(balAfter === purchValN.toString());
        assert(balSToken === eBalStkn.toString());
    });

    // PASSES
    it("should refund a client the payment token", async () => {
        await musd.faucet(web3.utils.toWei("1000"), { from: user1 });
        let bal1 = await musd.balanceOf(w3shop.address);
        bal1 = web3.utils.fromWei(bal1);

        const purchValN = 200;
        const purchaseVal = web3.utils.toWei(purchValN.toString());
        const item_id = "IB5YUS1m7B5JCALlNtAN";

        let rewardRatio = await w3shop.rewardRatio();
        rewardRatio = parseInt(rewardRatio);

        // conduct purchase
        await musd.approve(w3shop.address, purchaseVal, { from: user1 });
        await w3shop.purchase(purchaseVal, item_id, { from: user1 });

        // get shop balance in payment token, user balance in reward token
        let bal2 = await musd.balanceOf(w3shop.address);
        bal2 = web3.utils.fromWei(bal2);
        let balS1 = await stoken.balanceOf(user1);
        balS1 = web3.utils.fromWei(balS1);

        // conduct refund
        await w3shop.refund(user1, purchaseVal, false, { from: admin });

        let bal3 = await musd.balanceOf(w3shop.address);
        bal3 = web3.utils.fromWei(bal3);
        let balS2 = await stoken.balanceOf(user1);
        balS2 = web3.utils.fromWei(balS2);

        assert(bal1 === "0");
        assert(bal2 === "200");
        assert(balS1 === "2"); // shop token awarded
        assert(bal3 === "0");
        assert(balS2 === "2"); // shop token remains
    });

    // PASSES
    it("should refund a client and burn client's shop tokens", async () => {
        await musd.faucet(web3.utils.toWei("1000"), { from: user1 });
        let bal1 = await musd.balanceOf(w3shop.address);
        bal1 = web3.utils.fromWei(bal1);

        const purchValN = 200;
        const purchaseVal = web3.utils.toWei(purchValN.toString());
        const item_id = "IB5YUS1m7B5JCALlNtAN";

        const refundValN = purchValN / 2;
        const refundVal = web3.utils.toWei(refundValN.toString());

        let rewardRatio = await w3shop.rewardRatio();
        rewardRatio = parseInt(rewardRatio);

        // conduct purchase
        await musd.approve(w3shop.address, purchaseVal, { from: user1 });
        await w3shop.purchase(purchaseVal, item_id, { from: user1 });

        // get shop balance in payment token, user balance in reward token
        let bal2 = await musd.balanceOf(w3shop.address);
        bal2 = web3.utils.fromWei(bal2);
        let balS1 = await stoken.balanceOf(user1);
        balS1 = web3.utils.fromWei(balS1);

        // conduct refund
        await w3shop.refund(user1, refundVal, true, { from: admin });

        let bal3 = await musd.balanceOf(w3shop.address);
        bal3 = web3.utils.fromWei(bal3);
        let balS2 = await stoken.balanceOf(user1);
        balS2 = web3.utils.fromWei(balS2);

        assert(bal1 === "0");
        assert(bal2 === "200");
        assert(balS1 === "2"); // shop token awarded
        assert(bal3 === "100");
        assert(balS2 === "1"); // shop token reduced
    });

    // PASSES
    it("should NOT refund a client (exceeds total spend)", async () => {
        await musd.faucet(web3.utils.toWei("1000"), { from: user1 });
        let bal1 = await musd.balanceOf(w3shop.address);
        bal1 = web3.utils.fromWei(bal1);

        const purchValN = 200;
        const purchaseVal = web3.utils.toWei(purchValN.toString());
        const item_id = "IB5YUS1m7B5JCALlNtAN";

        const refundValN = 300;
        const refundVal = web3.utils.toWei(refundValN.toString());

        let rewardRatio = await w3shop.rewardRatio();
        rewardRatio = parseInt(rewardRatio);

        // conduct purchase
        await musd.approve(w3shop.address, purchaseVal, { from: user1 });
        await w3shop.purchase(purchaseVal, item_id, { from: user1 });

        // get shop balance in payment token, user balance in reward token
        let bal2 = await musd.balanceOf(w3shop.address);
        bal2 = web3.utils.fromWei(bal2);
        let balS1 = await stoken.balanceOf(user1);
        balS1 = web3.utils.fromWei(balS1);

        // conduct refund
        await expectRevert(
            w3shop.refund(user1, refundVal, true, { from: admin }),
            "Web3Shop#refund: Refund request > cumulative spend"
        );
    });

    // PASSES: Causes errors in testing if not placed at the end. Will need to investigate this.
    it("should NOT exceed the shop token mint limit", async () => {
        await musd.faucet(web3.utils.toWei("70100000"), { from: user1 });

        const purchaseVal = 69900000;
        const item_id = "IB5YUS1m7B5JCALlNtAN";

        // conduct purchase
        await musd.approve(w3shop.address, web3.utils.toWei(purchaseVal.toString()), { from: user1 });
        await w3shop.purchase(web3.utils.toWei(purchaseVal.toString()), item_id, { from: user1 });

        // get # of reward tokens minted
        let sTknIssued = await stoken.totalSupply();
        sTknIssued = web3.utils.fromWei(sTknIssued);

        const purchase2Val = 150000;

        // conduct purchase
        await musd.approve(w3shop.address, web3.utils.toWei(purchase2Val.toString()), { from: user1 });
        const { txHash } = await w3shop.purchase(web3.utils.toWei(purchase2Val.toString()), item_id, { from: user1 });

        expectEvent.inTransaction(txHash, contract, "ShopTokenSupply", {
            message: "Near or at max Shop token supply",
        });
    });
});
