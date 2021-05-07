const NASH_SUPPLY = "nash:nashSupply";
const LAST_PRICE = "nash:lastPrice";
const INITIAL= "nash:initial";


const SHARE_SUPPLY = "nash:shareSupply";
const HOLDERS = "nash:HOLDERS";


const CHAIN_STATE_BONDS = "nash:allBonds";
const ACTIVE_BONDS_LIST = "nash:activeBonds";
const BOND_COUNTER = "nash:bondCounter";


const SupplySchema = {
    $id: "lisk/nash/supply",
    type: "object",
    required: ["supply"],
    properties: {
        supply: {
            dataType: "uint32",
            fieldNumber: 1,
        },
    },
};

const PriceSchema = {
    $id: "lisk/nash/price",
    type: "object",
    required: ["price"],
    properties: {
        price: {
            dataType: "uint32",
            fieldNumber: 1,
        },
    },
};

const Initschema = {
    $id: "lisk/nash/bond2nash",
    type: "object",
    required: ["init"],
    properties: {
        init: {
        dataType: "string",
        fieldNumber: 1,
      },
    },
  };


const HoldersSchema = {
    $id: "lisk/nash/holdlist",
    type: "object",
    required: ["list"],
    properties: {
        list: {
          type: "array",
            fieldNumber: 1,
            items:{
              dataType: "string"
            }
        },
    },
};

const registeredBondsSchema = {
    $id: "lisk/nft/registeredBonds",
    type: "object",
    required: ["bonds"],
    properties: {
        bonds: {
        type: "array",
        fieldNumber: 1,
        items: {
          type: "object",
          required: ["id", "price", "ownerAddress", "status"],
          properties: {
            id: {
              dataType: "uint32",
              fieldNumber: 1,
            },
            price: {
              dataType: "uint32",
              fieldNumber: 2,
            },
            ownerAddress: {
              dataType: "bytes",
              fieldNumber: 3,
            },
            status: {
              dataType: "string",
              fieldNumber: 4,
            },
          },
        },
      },
    },
  };

 const Bondschema = {
        $id: "lisk/nft/Bond",
        type: "object",
        required: ["id", "price", "ownerAddress", "status"],
        properties: {
            id: {
            dataType: "uint32",
            fieldNumber: 1,
            },
            price: {
            dataType: "uint32",
            fieldNumber: 2,
            },
            ownerAddress: {
            dataType: "bytes",
            fieldNumber: 3,
            },
            status: {
            dataType: "string",
            fieldNumber: 4,
            },
        },
 }


module.exports = {
    Bondschema,
    registeredBondsSchema,
    CHAIN_STATE_BONDS,
    ACTIVE_BONDS_LIST,
    NASH_SUPPLY,
    LAST_PRICE,
    SupplySchema,
    PriceSchema,
    INITIAL,
    Initschema,
    SHARE_SUPPLY,
    HoldersSchema,
    BOND_COUNTER,
    HOLDERS
}