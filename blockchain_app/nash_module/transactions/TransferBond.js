const { BaseAsset } = require("lisk-sdk");
const { getAllBonds, setAllBonds } = require("../bond");



class TransferBond extends BaseAsset {

  name = "TransferBond";
  id = 201;

  
  schema = {
    $id: "lisk/nash/TransferBond",
    type: "object",
    required: ["bondId", "recipient"],
    properties: {
      bondId: {
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

    const Bonds = await getAllBonds(stateStore);
    const BondIndex = Bonds.findIndex((t) => t.id == asset.bondId);

 
    if (BondIndex < 0) {
      throw new Error("Token id not found");
    }

    const Bond = Bonds[BondIndex];
    const OwnerAddress = Bond.ownerAddress;
    const senderAddress = transaction.senderAddress;


    if (!OwnerAddress.equals(senderAddress)) {
      throw new Error("Bond can only be transferred by the owner of the NFT.");
    }

    const Owner = await stateStore.account.get(senderAddress);
    const ownerBondIndex = Owner.nashStablecoin.bonds.list.findIndex( (a) => a == Bond.id);
    Owner.nashStablecoin.bonds.list.splice(ownerBondIndex, 1);
    await stateStore.account.set(OwnerAddress, Owner);


    const recipientAddress = asset.recipient;
    const recipient = await stateStore.account.get(recipientAddress);
    recipient.nashStablecoin.bonds.list.push(Bond.id);
    await stateStore.account.set(recipientAddress, recipient);

    Bond.ownerAddress = recipientAddress;
    Bonds[BondIndex] = Bond;
    await setAllBonds(stateStore, Bonds);
  }
}

module.exports = TransferBond;