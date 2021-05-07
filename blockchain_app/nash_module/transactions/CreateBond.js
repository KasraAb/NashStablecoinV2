const { BaseAsset } = require("lisk-sdk");
const {getAllBonds, setAllBonds, CreateBond} = require("../bond");
const {genesis} = require('../accounts');
const {SetLastPrice } = require("../nash");


class NewBond extends BaseAsset {
 
  name = "CreateBond";
  id = 205;

  schema = {
    $id: "lisk/nft/CreateBond",
    type: "object",
    required: ["price", "nonce"],
    properties: {
        price: {
        dataType: "uint32",
        fieldNumber: 1,
      },
      nonce: {
        dataType: "uint32",
        fieldNumber: 2,
      },
    },
  };

  validate({asset}) {

    if (asset.price <= 0) {
      throw new Error("Invalid Price");
    } 
  };


  async apply({ asset, stateStore, reducerHandler, transaction }) {

    const senderAddress = transaction.senderAddress;

    if( senderAddress.toString('hex') != genesis.address){
        throw new Error("Sender is not Genesis");
    }

    const NewBond = await CreateBond(stateStore,senderAddress,asset.price,transaction.nonce);

    const allBonds = await getAllBonds(stateStore);
    allBonds.push(NewBond);
    await setAllBonds(stateStore, allBonds);

    await SetLastPrice(stateStore, asset.price/10);



  }
}

module.exports = NewBond;