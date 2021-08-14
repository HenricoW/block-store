// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './ShopToken.sol';
import "./W3StoreProduct.sol";

contract Web3Shop is ReentrancyGuard, Ownable {

    IERC20 public paymentToken;
    ShopToken public shopToken;
    address public storeNFTaddress;
    uint public rewardRatio = 100;            // payment tokens to spend for 1 reward token

    mapping(address => uint) public accruedSpend;

    event paymentMade(address indexed customer, uint amount);
    event nftMinted(address indexed customer, uint nftID, string itemID);

    constructor (address _paymentToken, string memory nftEndpoint) {
        paymentToken = IERC20(_paymentToken);

        W3StoreProduct nftContract = new W3StoreProduct("Web3 Store Product", "W3SP", nftEndpoint);
        storeNFTaddress = address(nftContract);
    }

    function updateShopToken(address shopTknAddress) external onlyOwner() {
        shopToken = ShopToken(shopTknAddress);
    }

    function purchase(uint amount, string memory itemID) external nonReentrant() returns(uint tokenId) {         // add reentrancy guard
        bool success = paymentToken.transferFrom(msg.sender, address(this), amount);
        if(success){
            emit paymentMade(msg.sender, amount);
            accruedSpend[msg.sender] += amount;

            // product release
            uint nftID = W3StoreProduct(storeNFTaddress).mintToken(msg.sender, itemID);
            emit nftMinted(msg.sender, nftID, itemID);

            // send reward token
            if(address(shopToken) != address(0)) shopToken.reward(msg.sender, (1000 gwei * amount / rewardRatio)); // account for 6 decimal stables

            return nftID;
        } else {
            return 0;
        }
    }

    function refund(address recipient, uint amount, bool mustBurn) external onlyOwner() nonReentrant() {    // add reentrancy guard
        require(accruedSpend[recipient] >= amount, "Web3Shop#refund: Refund request > cumulative spend");
        if( (address(shopToken) != address(0)) && mustBurn ) shopToken.burn(recipient, 1000 gwei * amount / rewardRatio);

        // verify product return

        bool success = paymentToken.transfer(recipient, amount);
        require(success, "Web3Shop#refund: Refund transfer failed");
    }

    // NFT functions
    function setNFTbaseUri(string memory uri) external onlyOwner() {
        W3StoreProduct(storeNFTaddress).setBaseURI(uri);
    }
}