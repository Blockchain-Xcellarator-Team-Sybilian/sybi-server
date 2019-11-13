'use strict'

const Web3 = require('web3');

const USER = "a0uqzhpgw8";
const PASS = "Z1qlFUiPvlEEfdBdceBcU6cSdr8zmLRu-DDzPUsDMjw";
const RPC_ENDPOINT = "a0sz4ipsfq-a0bsro7d5j-rpc.au0-aws.kaleido.io";

const nodeUrl = "https://" + USER + ":" + PASS + "@" + RPC_ENDPOINT;
const provider = new Web3.providers.HttpProvider(nodeUrl);
const web3 = new Web3(provider);

class Web3Helper {
  async getLatestBlock () {
    await web3.eth.getBlock("latest").then((latestBlock) => {
      console.log(latestBlock);
      return latestBlock
  });
  }
}
  
module.exports = Web3Helper
