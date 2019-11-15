'use strict'

class KaleidoHelper {
  constructor (config) {
    this.config = config
	}
	
  async getDocument (checksum) {
    const USER = this.config.get('web3.rpc_user')
    const PASS = this.config.get('web3.rpc_pass')
    const RPC_ENDPOINT = this.config.get('web3.rpc_endpoint')
    const nodeUrl = 'https://' + USER + ':' + PASS + '@' + RPC_ENDPOINT
    const provider = new Web3.providers.HttpProvider(nodeUrl)
    const web3 = new Web3(provider)
    
    const DocumentContract = new web3.eth.Contract(contractAbi, contractAddress, {from: accountAddress})
    const document = await DocumentContract.methods.getDocument(checksum).call()

    return document
  }

  async setDocument (checksum, name, comment) {}
}
  
module.exports = KaleidoHelper
