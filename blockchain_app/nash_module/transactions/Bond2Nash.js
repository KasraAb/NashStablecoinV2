const { BaseAsset} = require("lisk-sdk");
const {getAllBonds, setAllBonds, EmitFromBondList} = require("../bond");
const {UpdateSupply,LastPrice} = require('../nash');
const {genesis} = require('../accounts');

class Bond2Nash extends BaseAsset {

  name = "Bond2Nash";
  id = 207;

  schema = {
    $id: "lisk/nash/Bond2Nash",
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

    const senderAddress = transaction.senderAddress;
    
    if( senderAddress.toString('hex') != genesis.address){
        throw new Error("Sender isn't Genesis")
    }

    const Bonds = await getAllBonds(stateStore);
    const BondIndex = Bonds.findIndex( (t) => t.id == asset.bondId);

 
    if (BondIndex < 0) {
      throw new Error("Token id not found");
    }

    const Bond = Bonds[BondIndex];
    const OwnerAddress = Bond.ownerAddress;

    if (Bond.status != "sold" ) {
        throw new Error("Invalid Bond");
    }
    
    const Owner = await stateStore.account.get(OwnerAddress);
    const price = await LastPrice(stateStore);

    Owner.nashStablecoin.nash.balance = Owner.nashStablecoin.nash.balance + (10*price);
    const ownerBondIndex = Owner.nashStablecoin.bonds.list.findIndex( (a) => a == Bond.id);
    Owner.nashStablecoin.bonds.list.splice(ownerBondIndex, 1);
    await stateStore.account.set(OwnerAddress, Owner);


    Bond.status = "expired";
    Bonds[BondIndex] = Bond;
    await setAllBonds(stateStore, Bonds);


    await EmitFromBondList(stateStore, Bond.id);

    await UpdateSupply(stateStore,10*price,1);    

  }
}

module.exports = Bond2Nash;