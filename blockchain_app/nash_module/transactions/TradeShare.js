const { BaseAsset, cryptography} = require("lisk-sdk");
const {UpdateSupply, UpdateHolders} = require('../share');

class TradeShare extends BaseAsset {

  name = "TradeShare";
  id = 0;

  schema = {
    $id: "lisk/nash/TradeShare",
    type: "object",
    required: ["amount", "type", "genesis"],
    properties: {
        amount: {
        dataType: "uint64",
        fieldNumber: 1,
      },
      type: {
        dataType: "string",
        fieldNumber: 2,
      },
      genesis: {
        dataType: "bytes",
        fieldNumber: 3,
      },
    },
  };

  async apply({ asset, stateStore, reducerHandler, transaction }) {

    const amount = Number(asset.amount);
    const senderAddress = transaction.senderAddress;
    const sender = await stateStore.account.get(senderAddress);
    const b32add = cryptography.getBase32AddressFromAddress(senderAddress);

    if(asset.type == "sell"){
    

    if (sender.nashStablecoin.share.balance < amount){
        throw new Error("Not enough balance");
    }

    sender.nashStablecoin.share.balance = sender.nashStablecoin.share.balance - amount;
    await stateStore.account.set(senderAddress, sender);

    await reducerHandler.invoke("token:debit", {
      address: asset.genesis,
      amount: BigInt(amount*(10**9)),
    })

    
    await reducerHandler.invoke("token:credit", {
      address: senderAddress,
      amount: BigInt(amount*(10**9)),
    });

  await UpdateSupply(stateStore, amount, -1); 
  await UpdateHolders(stateStore, b32add, sender.nashStablecoin.share.balance);



  }

  if(asset.type == "buy"){

    const SenderBalance = await reducerHandler.invoke('token:getBalance', {
      address: transaction.senderAddress,
     });

     if ( amount*10 > SenderBalance) {
      throw new Error("not enough balance");
      }

    sender.nashStablecoin.share.balance = sender.nashStablecoin.share.balance  + amount;
    await stateStore.account.set(senderAddress, sender);

    await reducerHandler.invoke("token:debit", {
      address: senderAddress,
      amount: BigInt(amount*(10**9)),
    });

    await reducerHandler.invoke("token:credit", {
      address: asset.genesis,
      amount: BigInt(amount*(10**9)),
    })

    await UpdateSupply(stateStore, amount,1);
    await UpdateHolders(stateStore, b32add, sender.nashStablecoin.share.balance);

  }

  }
}

module.exports = TradeShare;
