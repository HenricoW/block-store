// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/utils/Counters.sol";

contract W3StoreProduct is ERC721, Ownable {
    using Counters for Counters.Counter;

    string public baseUri;
    Counters.Counter public serialId;

    mapping(uint => string) public itemIds; // serialID => itemID: map nft ID to Store item

    // struct HashAndSig {
    //     bytes32 hash;
    //     bytes32 v;
    //     bytes32 r;
    //     bytes32 s;
    // }

    // mapping(uint => HashAndSig) public verificationData; // (tokenId => hash & signature)

    constructor (string memory name, string memory symbol, string memory baseURI_) 
    ERC721(name, symbol) {
        baseUri = baseURI_;

        // start serial numbers from 100
        for(uint i = 0; i < 99; i++){
            serialId.increment();
        }
    }

    function mintToken(address client, string memory itemID) external onlyOwner() returns(uint nftId) {
        serialId.increment();
        uint tokenId = serialId.current();
        
        itemIds[tokenId] = itemID;
        _safeMint(client, tokenId);

        return tokenId;
    }

    // allow for future api/db migration
    // NB: Must include trailing '/'
    function setBaseURI(string memory uri) external onlyOwner() {
        baseUri = uri;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }
}