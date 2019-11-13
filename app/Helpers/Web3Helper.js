'use strict'

const Web3 = require('web3');
const contractAbi = [{"constant":true,"inputs":[{"name":"_checksum","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_checksum","type":"string"},{"name":"_name","type":"string"},{"name":"_comment","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const contractAddress = '0x2ee39b2c3428545852d633026891a72c676d7423'

class Web3Helper {
  constructor (config) {
    this.config = config
  }

  async getLatestBlock () {
    const USER = this.config.get('web3.rpc_user')
    const PASS = this.config.get('web3.rpc_pass')
    const RPC_ENDPOINT = this.config.get('web3.rpc_endpoint')
    const nodeUrl = 'https://' + USER + ':' + PASS + '@' + RPC_ENDPOINT
    const provider = new Web3.providers.HttpProvider(nodeUrl)
    const web3 = new Web3(provider)

    return web3.eth.getBlock('latest')
  }

  async getDocument (checksum) {
    const USER = this.config.get('web3.rpc_user')
    const PASS = this.config.get('web3.rpc_pass')
    const RPC_ENDPOINT = this.config.get('web3.rpc_endpoint')
    const nodeUrl = 'https://' + USER + ':' + PASS + '@' + RPC_ENDPOINT
    const provider = new Web3.providers.HttpProvider(nodeUrl)
    const web3 = new Web3(provider)
    
    const DocumentContract = new web3.eth.Contract(contractAbi, contractAddress)
    const document = await DocumentContract.methods.get(checksum).call()

    return document
  }
}
  
module.exports = Web3Helper
