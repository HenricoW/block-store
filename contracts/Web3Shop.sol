// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './ShopToken.sol';

contract Web3Shop {

    IERC20 public paymentToken;
    ShopToken public shopToken;
    uint public rewardRatio = 100;            // payment tokens to spend for 1 reward token
    address public admin;

    mapping(address => uint) public accruedSpend;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed.");
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

    function purchase(uint amount, address customer) external {         // add reentrancy guard
        paymentToken.transferFrom(customer, address(this), amount);
        emit paymentMade(customer, amount);
        accruedSpend[msg.sender] += amount;

        // product release

        // send reward token
        if(address(shopToken) != address(0)) shopToken.reward(customer, (amount / rewardRatio));
    }

    function refund(address recipient, uint amount, bool mustBurn) external onlyAdmin() {    // add reentrancy guard
        require(accruedSpend[recipient] >= amount, "Refund: Refund request > cumulative spend");
        if( (address(shopToken) != address(0)) && mustBurn ) shopToken.burn(recipient, amount);

        // verify product return

        paymentToken.transfer(recipient, amount / rewardRatio);
    }
}