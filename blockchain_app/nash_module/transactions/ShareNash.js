const { BaseAsset, cryptography } = require("lisk-sdk");
const {UpdateSupply} = require('../nash');
const {UpdateHolders} = require('../share');
const {genesis} = require('../accounts');

class ShareNash extends BaseAsset {

  name = "ShareNash";
  id = 206;

  schema = {
    $id: "lisk/nash/ShareNash",
    type: "object",
    required: ["amount", "recipient"],
    properties: {
        amount: {
        dataType: "uint32",
        fieldNumber: 1,
      },
      recipient: {
        dataType: "bytes",
        fieldNumber: 2,
      },
    },
  };

  async apply({ asset, stateStore, reducerHandler, transaction }) {

    const senderAddress = transaction.senderAddress;
    
    if( senderAddress.toString('hex') != genesis.address ){
        throw new Error("Sender isn't Genesis")
    }

    const holder = await stateStore.account.get(asset.recipient);

    const new_nash = asset.amount * holder.nashStablecoin.share.balance;

    holder.nashStablecoin.nash.balance = (holder.nashStablecoin.nash.balance) + new_nash;
    await stateStore.account.set(asset.recipient, holder);
    
    const b32add = cryptography.getBase32AddressFromAddress(asset.recipient);
    await UpdateHolders(stateStore, b32add, holder.nashStablecoin.share.balance);
    await UpdateSupply(stateStore, new_nash, 1);

  }
}

module.exports = ShareNash;