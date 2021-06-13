// SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Web3Shop {

    IERC20 public paymentToken;
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed.");
        _;
    }

    event paymentMade(address indexed customer, uint amount);

    constructor (address tokenAddr) {
        admin = msg.sender;
        paymentToken = IERC20(tokenAddr);
    }

    function purchase(uint amount, address customer) external {
        paymentToken.transferFrom(customer, address(this), amount);

        emit paymentMade(customer, amount);
    }
}