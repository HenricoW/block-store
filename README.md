[![Truffle tests](https://github.com/HenricoW/block-store/actions/workflows/truffle-tests.yml/badge.svg?branch=main)](https://github.com/HenricoW/block-store/actions/workflows/truffle-tests.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/978e4a04-1d9f-4da9-9888-45fa6b078393/deploy-status)](https://app.netlify.com/sites/peaceful-perlman-32dbbf/deploys)

# Web3 Shop dApp

Web store for purchasing items with USDC on and EVM compatible chain (curretnly only deployed to Rinkeby).

- Users browse the site, connect their wallet and purchase an item with the supported token
- In return an NFT (ERC721) is minted to the user's wallet, representing the item
- This NFT could then be used in conjuction with the actual product to verify authenticity or unlock new customer experiences
- Users can then their store based NFTs on OpenSea
- A store reward token (ERC20) can also be issued per purchase, acting as a store loyalty token
