// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import './ShopToken.sol';

contract Web3Shop is ReentrancyGuard {

    IERC20 public paymentToken;
    ShopToken public shopToken;
    uint public rewardRatio = 100;            // payment tokens to spend for 1 reward token
    address public admin;

    mapping(address => uint) public accruedSpend;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Web3Shop: Only admin allowed.");
        _;
    }

    event paymentMade(address indexed customer, uint amount);

    constructor (address tokenAddr) {
        admin = msg.sender;
        paymentToken = IERC20(tokenAddr);
    }

    function updateShopToken(address shopTknAddress) external onlyAdmin() {
        shopToken = ShopToken(shopTknAddress);
    }

    function purchase(uint amount) external nonReentrant() {         // add reentrancy guard
        bool success = paymentToken.transferFrom(msg.sender, address(this), amount);
        if(success){
            emit paymentMade(msg.sender, amount);
            accruedSpend[msg.sender] += amount;

            // product release

            // send reward token
            if(address(shopToken) != address(0)) shopToken.reward(msg.sender, (amount / rewardRatio));
        }
    }

    function refund(address recipient, uint amount, bool mustBurn) external onlyAdmin() nonReentrant() {    // add reentrancy guard
        require(accruedSpend[recipient] >= amount, "Web3Shop#refund: Refund request > cumulative spend");
        if( (address(shopToken) != address(0)) && mustBurn ) shopToken.burn(recipient, amount / rewardRatio);

        // verify product return

        bool success = paymentToken.transfer(recipient, amount);
        require(success, "Web3Shop#refund: Refund transfer failed");
    }
}