const {codec} = require("lisk-sdk");
const {SHARE_SUPPLY, HOLDERS, SupplySchema, HoldersSchema} = require("./schemas");


const UpdateSupply = async (stateStore,value,flag) => {

  const buffer = await stateStore.chain.get(SHARE_SUPPLY);
  let data = {supply: 0};

  if(buffer){
  data = codec.decode(
    SupplySchema,buffer);
  }


  data.supply = (flag==1)? data.supply  + value : data.supply  - value;

  await stateStore.chain.set(
    SHARE_SUPPLY,
    codec.encode(SupplySchema, data)
    );

};


const GetShareSupply = async (stateStore) => {

    const buffer = await stateStore.chain.get(SHARE_SUPPLY);

    if(! buffer){
      return 0;
    }
    const data = codec.decode(
        SupplySchema,
        buffer
    );

        return data.supply;

        };


const GetHolders = async (stateStore) => {

  const buffer = await stateStore.chain.get(HOLDERS);
  
  if (! buffer){
    return [];
  }

  const data = codec.decode(
    HoldersSchema,
      buffer
  );
  
      return data.list;
  
};

const UpdateHolders = async (stateStore, add, amount) => {

  const buffer = await stateStore.chain.get(HOLDERS);

  let data = {list:[]};

  if(buffer){
    data = codec.decode(
      HoldersSchema,
      buffer
      );
  }

  const index = data.list.findIndex((a) => a == add );

  if(index < 0 && amount > 0){
    data.list.push(add);
  }
  if(index >= 0 && amount == 0 ){
    data.list.splice(index,1);
  }
  
  await stateStore.chain.set(
    HOLDERS,
    codec.encode(HoldersSchema, data)
    );


  };


          
module.exports = {
  UpdateSupply,
  GetHolders,
  GetShareSupply,
  UpdateHolders
};