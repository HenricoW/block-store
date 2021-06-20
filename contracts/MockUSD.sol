// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MockUSD is ERC20 {
    constructor () ERC20("mUSD", "Mock USD") {}

    function faucet(uint amount) external {
        _mint(msg.sender, amount);
    }
}