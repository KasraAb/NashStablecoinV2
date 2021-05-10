const { BaseAsset } = require("lisk-sdk");
const {getAllBonds, setAllBonds, AddtoBondList} = require("../bond");
const {UpdateSupply} = require('../nash');

class PurchaseBond extends BaseAsset {

  name = "PurchaseBond";
  id = 203;

  schema = {
    $id: "lisk/nash/PurchaseBond",
    type: "object",
    required: ["bondId"],
    properties: {
      bondId: {
        dataType: "uint32",
        fieldNumber: 1,
      },
    },
  };


  async apply({ asset, stateStore, reducerHandler, transaction }) {

    const Bonds = await getAllBonds(stateStore);
    const BondIndex = Bonds.findIndex( (t) => t.id == asset.bondId);
    
 
    if (BondIndex < 0) {
      throw new Error("Token id not found");
    }

    const Bond = Bonds[BondIndex];

    if (Bond.status == "sold" || Bond.status == "expired") {
      throw new Error("This Bond have been sold");
    }

    const purchaserAddress = transaction.senderAddress;
    const purchaserAccount = await stateStore.account.get(purchaserAddress);

    if (Bond.price > purchaserAccount.nashStablecoin.nash.balance) {
      throw new Error("Balance is not enough");
    }

    
    purchaserAccount.nashStablecoin.bonds.list.push(Bond.id);
    purchaserAccount.nashStablecoin.nash.balance = purchaserAccount.nashStablecoin.nash.balance - Bond.price;
    await stateStore.account.set(purchaserAddress, purchaserAccount);

    Bond.ownerAddress = purchaserAddress;
    Bond.status = "sold";
    Bonds[BondIndex] = Bond;
    
    await setAllBonds(stateStore, Bonds);

    await AddtoBondList(stateStore, Bond);

    await UpdateSupply(stateStore, Bond.price, -1)
  }
}

module.exports = PurchaseBond;