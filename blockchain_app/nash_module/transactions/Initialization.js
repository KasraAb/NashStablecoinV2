const { BaseAsset} = require("lisk-sdk");
const {genesis} = require('../accounts');
const {codec} = require("lisk-sdk");
const {INITIAL, NASH_SUPPLY, SupplySchema, Initschema} = require("../schemas");



class Initialization extends BaseAsset {

  name = "Initialization";
  id = 204;

  schema = {
    $id: 'lisk/hello/asset',
    type: 'object',
    required: ["data"],
    properties: {
        data: {
            dataType: 'string',
            fieldNumber: 1,
        },
    }
    };

  async apply({ asset, stateStore, reducerHandler, transaction }) {

    const senderAddress = transaction.senderAddress;
    
    if( senderAddress.toString('hex') != genesis.address ){
        throw new Error("Sender isn't Genesis")
    }

    const Buffer = await stateStore.chain.get(INITIAL);
  
    const init = codec.decode(
      Initschema,
        Buffer
    );

    if( init.init == "initialized"){
        throw new Error("app had been initialized")
    }

    const Genesis = await stateStore.account.get(senderAddress);

    Genesis.nashStablecoin.nash.balance = 1000;
    await stateStore.account.set(senderAddress, Genesis);

    await stateStore.chain.set(
      NASH_SUPPLY,
      codec.encode(SupplySchema, {supply: 1000})
    );

    init.init = "initialized";
    
    await stateStore.chain.set(
        INITIAL,
      codec.encode(Initschema, init)
    );
    
  }
}

module.exports = Initialization;