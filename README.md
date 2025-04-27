# Nash Stablecoin

A PoC algorithmic stablecoin created using `lisk-sdk`.

## Description

- The blockchain app contains three types of tokens: Nash, Bond, and Share.
  - Nash: This is the core token of the system, which is expected to be pegged to one US Dollar.
  - Bond: Non-fungible tokens which are resealed when the price is under the pegg to contract the Nash supply. These are only purchasable by Nash tokens, and when the price goes     - upper than the Pegg, these tokens will be changed to Nash automatically. 
  - Share: There is a reserve of ‘LSK’ coins to make the system more sustainable under complex economic conditions. Any user can invest in the reserve in exchange for Share tokens. A part of generated Nash tokens in high prices will be distributed among the shareholders of the reserve.

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

1. The first step is initializing the app using genesis passphrase.
2. You can use default accounts for testing the transactions.
3. Note the frontend app is not auto-refreshed. Once you submit a request, you have to refresh it manually.
4. A block can't contain multiple transactions from the same sender. Make sure your transactions from a single sender are not in the same block.
5. There is a 10s delay between transactions in the pricing process, and it will cause the process to be a little slow.
