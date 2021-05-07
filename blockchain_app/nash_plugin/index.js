const { BasePlugin, codec} = require('lisk-sdk');
const pJSON = require('../package.json');
const express = require('express');
const cors = require('cors');
const { getDBInstance, getAllTransactions, saveTransactions } = require("./db");



class NashAPIPlugin extends BasePlugin {

    
    static get alias() {
        return "NashAPI";
      }

      static get info() {
        return {
          author: pJSON.author,
          version: pJSON.version,
          name: pJSON.name,
        };
    }

    get defaults() {
        return {};
      }
    
    get events() {
    return [];
    }

    get actions() {
    return {};
    }

    
    
  async load(channel) {

    this._app = express();
    this._channel = channel;
    this._db = await getDBInstance();
    this._nodeInfo = await this._channel.invoke("app:getNodeInfo");


    this._app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT"] }));
    this._app.use(express.json());


    this._app.get("/api/transactions", async (_req, res) => {
      const transactions = await getAllTransactions(this._db, this.schemas);

        const data = transactions.map(trx => {
          const module = this._nodeInfo.registeredModules.find(m => m.id === trx.moduleID);
          const asset = module.transactionAssets.find(a => a.id === trx.assetID);
          return {
            ...trx,
            ...trx.asset,
            moduleName: module.name,
            assetName: asset.name,
          }
        })
        res.json({ data });
      });

      this._subscribeToChannel();

      this._server = this._app.listen(8080, "0.0.0.0");
    }

    _subscribeToChannel() {
      // listen to application events and enrich blockchain data for UI/third party application
      this._channel.subscribe('app:block:new', async (data) => {
        const { block } = data;
        const { payload } = codec.decode(
          this.schemas.block,
          Buffer.from(block, 'hex'),
        );
        if (payload.length > 0) {
          await saveTransactions(this._db, payload);
          const decodedBlock = this.codec.decodeBlock(block);        }
      });
  }
  async unload() {
    // close http server
    await new Promise((resolve, reject) => {
      this._server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
    // close database connection
    await this._db.close();
  }
}

module.exports = { NashAPIPlugin };