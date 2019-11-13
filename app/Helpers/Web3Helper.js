'use strict'

const Web3 = require('web3');

class Web3Helper {
  constructor (config) {
    this.config = config
  }

  async getLatestBlock () {
    const USER = this.config.get('web3.rpc_user');
    const PASS = this.config.get('web3.rpc_pass');
    const RPC_ENDPOINT = this.config.get('web3.rpc_endpoint');

    const nodeUrl = "https://" + USER + ":" + PASS + "@" + RPC_ENDPOINT;
    const provider = new Web3.providers.HttpProvider(nodeUrl);
    const web3 = new Web3(provider);

    return web3.eth.getBlock("latest")
  }
}
  
module.exports = Web3Helper
