const { BaseAsset } = require("lisk-sdk");


class TransferBalance extends BaseAsset {

  name = "TransferNash";
  id = 200;

  schema = {
    $id: "lisk/nash/TransferNash",
    type: "object",
    required: ["amount", "recipient"],
    properties: {
        amount: {
        dataType: "uint64",
        fieldNumber: 1,
      },
      recipient: {
        dataType: "bytes",
        fieldNumber: 2,
      },
      type: {
        dataType: "string",
        fieldNumber: 3,
      },
    },
  };

  async apply({ asset, stateStore, reducerHandler, transaction }) {
    
    if(asset.type == 'nash'){

    const value = Number(asset.amount);
    const reciever = await stateStore.account.get(asset.recipient);
    const sender = await stateStore.account.get(transaction.senderAddress)

   
    if ( sender.nashStablecoin.nash.balance < value) {
      throw new Error("not enough balance");
    }

    sender.nashStablecoin.nash.balance = sender.nashStablecoin.nash.balance  - value;
    await stateStore.account.set(transaction.senderAddress, sender);

    reciever.nashStablecoin.nash.balance = reciever.nashStablecoin.nash.balance + value;
    await stateStore.account.set(asset.recipient, reciever);
    
  }

  if(asset.type == 'lsk'){

    const SenderBalance = await reducerHandler.invoke('token:getBalance', {
      address: transaction.senderAddress,
     });

     if ( asset.amount > SenderBalance) {
      throw new Error("not enough balance");
    }

    await reducerHandler.invoke("token:credit", {
      address: asset.recipient,
      amount: asset.amount,
    })

    await reducerHandler.invoke("token:debit", {
      address: transaction.senderAddress,
      amount: asset.amount,
    });
    
  }
}

}

module.exports = TransferBalance;