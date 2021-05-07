const { apiClient, cryptography } = require('@liskhq/lisk-client');
const RPC_ENDPOINT = 'ws://localhost:8888/ws';

let clientCache;

const getClient = async () => {
    if (!clientCache) {
        clientCache = await apiClient.createWSClient(RPC_ENDPOINT);
    }
    return clientCache;
};

const fetchNodeInfo = async () => {
  return fetch("http://localhost:4000/api/node/info")
    .then((res) => res.json())
    .then((res) => res.data);
};

const fetchNashSupply = async () => {
  const client = await getClient();
  return client.invoke('nashStablecoin:GetNashSupply');
};

const fetchShareSupply= async () => {
  const client = await getClient();
  return client.invoke('nashStablecoin:GetShareSupply');
};

const fetchActiveBonds= async () => {
  const client = await getClient();
  return client.invoke('nashStablecoin:ActiveBonds');
};

const fetchBonds = async () => {
  const client = await getClient();
  return client.invoke('nashStablecoin:AllBonds');
};

const fetchHolders = async () => {
  const client = await getClient();
  return client.invoke('nashStablecoin:GetHolders');
};

const sendTransactions = async (tx) => {
  return fetch("http://localhost:4000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tx),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

const fetchAccountInfo = async (address) => {
  return fetch(`http://localhost:4000/api/accounts/${address}`)
  .then((res) => res.json())
  .then((res) => res.data);
};

module.exports = {
  fetchAccountInfo,
  sendTransactions,
  fetchActiveBonds,
  fetchShareSupply,
  fetchNashSupply,
  fetchNodeInfo,
  getClient,
  fetchBonds,
  fetchHolders
}
