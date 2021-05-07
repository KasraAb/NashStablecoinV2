const { codec} = require("lisk-sdk");
const {NASH_SUPPLY, SupplySchema, LAST_PRICE, PriceSchema} = require("./schemas");


const UpdateSupply = async (stateStore,value,flag) => {

  const buffer = await stateStore.chain.get(NASH_SUPPLY);

  const data = codec.decode(SupplySchema,buffer);

  data.supply = (flag == 1)? (data.supply  + value) : (data.supply  - value);

  await stateStore.chain.set(
    NASH_SUPPLY,
    codec.encode(SupplySchema, data)
    );

};


const LastPrice = async (stateStore) => {

    const buffer = await stateStore.chain.get(LAST_PRICE);

    if (!buffer){
      return 1;
    }
    
    const data = codec.decode(
      PriceSchema,
      buffer
    );
  
    return data.price;
  
  };

  const SetLastPrice = async (stateStore, price) => {

    await stateStore.chain.set(
      LAST_PRICE,
      codec.encode(SupplySchema, price)
      );
  
  };

  const GetNashSupply = async (stateStore) => {

    const buffer = await stateStore.chain.get(NASH_SUPPLY);
    
    if(! buffer){
      return 0;
    }
    const data = codec.decode(
      SupplySchema,
      buffer
    );
  
    return data.supply;
  
  };

module.exports = {
  UpdateSupply,
  LastPrice,
  GetNashSupply,
  SetLastPrice
};