const { BaseModule, codec } = require("lisk-sdk");
const {account} = require("./account");

const TransferBalance = require("./transactions/TransferBalance");
const TransferBond = require("./transactions/TransferBond");
const TradeShare = require("./transactions/TradeShare");
const PurchaseBond = require("./transactions/PurchaseBond");
const NewBond = require("./transactions/CreateBond");
const Bond2Nash = require("./transactions/Bond2Nash");
const Initialization = require("./transactions/Initialization");
const ShareNash = require("./transactions/ShareNash");

const { INITIAL, NASH_SUPPLY, LAST_PRICE, SupplySchema,
   PriceSchema, Initschema,SHARE_SUPPLY,ACTIVE_BONDS_LIST, CHAIN_STATE_BONDS,
   registeredBondsSchema, HOLDERS, HoldersSchema} = require("./schemas");


class NashModule extends BaseModule {

  name = "nashStablecoin";
  id = 4021;

  accountSchema = account;

  transactionAssets = [new Initialization(), new TransferBalance(), new TradeShare(), new NewBond(), new PurchaseBond(),
                        new TransferBond(), new Initialization(), new  Bond2Nash(), new ShareNash()];

  actions = {


    GetShareSupply: async () =>  {
      const res = await this._dataAccess.getChainState(SHARE_SUPPLY);
      const count = codec.decode(
          SupplySchema,
          res
      );
      return count;
    },

    GetNashSupply: async () =>  {
      const res = await this._dataAccess.getChainState(NASH_SUPPLY);
      const count = codec.decode(
          SupplySchema,
          res
      );
      return count;
  },

    ActiveBonds: async () => {
      const res = await this._dataAccess.getChainState(ACTIVE_BONDS_LIST);
      const count = codec.decode(
        registeredBondsSchema,
          res
      );
      return count;
  },

    AllBonds: async () => {

      const res = await this._dataAccess.getChainState(CHAIN_STATE_BONDS);
      const count = codec.decode(
        registeredBondsSchema,
          res
      );
      return count;
  },

    GetLastPrice: async () => {

      const res = await this._dataAccess.getChainState(LAST_PRICE);
      const count = codec.decode(
        PriceSchema,
          res
      );
      return count;
  },


  GetHolders: async () => {

    const res = await this._dataAccess.getChainState(HOLDERS);
    const count = codec.decode(
      HoldersSchema,
        res
    );
    return count;
},

  };

  async afterGenesisBlockApply({genesisBlock, stateStore, reducerHandler}) {

    await stateStore.chain.set(
      INITIAL,
      codec.encode(Initschema, "not initialized")
    );
    
  };
}

module.exports = { NashModule };