# Nash Stablecoin

This is a PoC algorithmic stablecoin created using `Version 5` of `lisk-sdk`.

## Description

- The blockchain app contains three kinds of tokens: Nash, Bond, Share.
  - Nash: The core token of the system, which is pegged directly to the US Dollar.
  - Bond: Non-fungible tokens which are resealed when the price is under the Pegg to contract the Nash supply. They are only purchasable by Nash tokens, and when the price goes     - upper than the Pegg, these tokens will be changed to Nash automatically. 
  - Share: There is a reserve of ‘LSK’ coins that can help us make the system more sustainable under complex economic conditions. Users can invest in the reserve in exchange for Share tokens. A part of generated Nash tokens in high prices are distributed among Shareholders. The reserve will be managed using a DAO, which is not implemented yet.

- Current PoC version supports for:
  - Transfer LSK or Nash tokens
  - Trading Share tokens
  - Purchase unsold Bonds
  - Pricing the Nash and test the reaction of the system to price changes

## Install dependencies

```bash
cd blockchain_app && npm i
cd frontend_app && npm i
```

## Start node

```bash
cd blockchain_app; node index.js
```

## Start frontend

```bash
cd frontend_app; npm start
```

### Test transactions

1. First step is initializing the app using genesis passphrase.
1. You can use default accounts to testing the transactions.
3. Note the frontend app is not auto-refreshed. Once you submit a request, you have to refresh it manually.
4. A block can't contain multiple transactions from the same sender. Make sure your transactions from a single sender are not in the same block.
5. There is a 10s delay between transactions in the pricing process, and it will cause the process to be a little slow.

## Resources
* Project introduction: https://lisk.io/blog/apps/building-nash-stablecoin-project 
* Previous version source code that is compatiable with `Version 3` of `lisk-sdk`: https://github.com/rastakms/nash-stablecoin.
* Runnig Demo: http://168.119.130.209:3000/
