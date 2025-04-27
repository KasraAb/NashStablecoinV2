# Nash Stablecoin

A PoC algorithmic stablecoin created using `lisk-sdk`.

## Description

- The blockchain app contains three types of tokens: Nash, Bond, and Share.
  - Nash: This is the core token of the system, which is expected to be pegged to one US Dollar.
  - Bond: Non-fungible tokens resealed when the price is under the pegg. These are only purchasable by Nash tokens. At prices higher than the pegg, these tokens will automatically be turned into Nash tokens. 
  - Share: There is a reserve of ‘LSK’ coins. Any user can invest in the reserve in exchange for Share tokens. A part of Nash tokens generated at prices higher than the pegg are distributed among the shareholders.

- The current PoC implementation supports:
  - Purchasing unsold Bonds
  - Transfer LSK or Nash tokens
  - Trading Share tokens in exchange for Nash tokens
  - Pricing the Nash and test the reaction of the system to price changes

## Installing Dependencies

```bash
cd blockchain_app && npm i
cd frontend_app && npm i
```

## Starting A Node

```bash
cd blockchain_app; node index.js
```

## Starting The Frontend

```bash
cd frontend_app; npm start
```

### Remarks

1. In the first step, please initialize the app using genesis passphrase.
2. There are several default accounts that can be used for testing transactions.
3. The frontend app is not auto-refreshing. Once a request is submitted, it should be refreshed manually.
4. A block can't contain multiple transactions from the same sender. Make sure your transactions from a single sender are not in the same block.
5. There is a 10s latency between transactions in the pricing process, and it might cause the process to be a slower than expectation.
