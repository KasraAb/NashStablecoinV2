const {codec} = require("lisk-sdk");
const  {registeredBondsSchema, CHAIN_STATE_BONDS, ACTIVE_BONDS_LIST, SupplySchema, BOND_COUNTER} = require("./schemas");

const getAllBonds = async (stateStore) => {

    const registeredBonds = await stateStore.chain.get(CHAIN_STATE_BONDS);

    if (!registeredBonds) {
      return [];
    }
  
    const Bonds = codec.decode(
      registeredBondsSchema,
      registeredBonds
    );
  
    return Bonds.bonds;
  };


  const setAllBonds = async (stateStore, list) => {

    const registeredBonds = {
        bonds: list,
    };
  
    await stateStore.chain.set(
        CHAIN_STATE_BONDS,
      codec.encode(registeredBondsSchema, registeredBonds)
    );
  };

  const AddtoBondList = async (stateStore, NewBond) => {

    let BondsList = {bonds: []};

    const ActiveBonds = await stateStore.chain.get(
        ACTIVE_BONDS_LIST
    );

    if (ActiveBonds) {

        BondsList = codec.decode(
        registeredBondsSchema,
        ActiveBonds
      );
    }
  
    BondsList.bonds.push(NewBond);
    
    await stateStore.chain.set(
      ACTIVE_BONDS_LIST,
      codec.encode(registeredBondsSchema, BondsList)
    );

  };

  const CreateBond = async (stateStore, ownerAddress, price, nonce) => {

    const buffer = await stateStore.chain.get(
      BOND_COUNTER
  );
  let counter = 0;

  if (!buffer) {
     counter = {supply: 0};
  }
  else{
    counter = codec.decode(SupplySchema, buffer);
  }

    const status = 'not sold';
    const id = counter.supply;
    counter.supply ++;

    await stateStore.chain.set(
      BOND_COUNTER,
    codec.encode(SupplySchema, counter)
  );

    return {
      id,
      ownerAddress,
      status,
      price,
    };
  };

  const EmitFromBondList = async (stateStore, id) => {

    const ActiveBonds = await stateStore.chain.get(
        ACTIVE_BONDS_LIST
    );
    const BondsList = codec.decode(
      registeredBondsSchema,
      ActiveBonds
    );

    BondsList.bonds = BondsList.bonds.filter( item => item.id != id );
    
    await stateStore.chain.set(
      ACTIVE_BONDS_LIST,
      codec.encode(registeredBondsSchema, BondsList)
     );

  };


module.exports = {
  getAllBonds,
  setAllBonds,
  AddtoBondList,
  CreateBond,
  EmitFromBondList
};