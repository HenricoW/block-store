// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './Web3Shop.sol';

contract ShopToken is ERC20 {

    uint public maxSupply = 1000000 ether;
    uint public ownerFraction = 30; // percentage of token supply allocated to owner account

    // accessors
    address public owner;
    Web3Shop public shopContr;

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized access");
        _;
    }

    modifier onlyShop() {
        require(msg.sender == address(shopContr), "Unauthorized access");
        _;
    }

    constructor (address shopAddr) ERC20("STKN", "Shop Token") {
        owner = msg.sender;
        shopContr = Web3Shop(shopAddr);
        _mint(msg.sender, ownerFraction * maxSupply / 100);
    }

    function updateShopAddress(address shopAddress) external onlyOwner() {
        shopContr = Web3Shop(shopAddress);
    }

    function reward(address receiver, uint amount) external onlyShop() {
        require(totalSupply() <= maxSupply, "Mint: Max Shop token supply has been reached");
        _mint(receiver, amount);
    }

    function burn(address customer, uint amount) external onlyShop() {
        require(balanceOf(customer) >= amount, "Burn: Burn amount exceeds customer balance");
        _burn(customer, amount);
    }
}