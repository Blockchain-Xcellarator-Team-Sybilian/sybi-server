'use strict'

const Web3 = require('web3');
const contractAbi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_checksum",
				"type": "string"
			}
		],
		"name": "getDocument",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_checksum",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_comment",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_timestamp",
				"type": "string"
			}
		],
		"name": "setDocument",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contractAddress = '0x7d002860947346b290a010d7ad162ca125a705df'
const accountAddress = '0x940e24f6e07d5603aebd1f37fabcbf0f84dc9280'

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
    
    const DocumentContract = new web3.eth.Contract(contractAbi, contractAddress, {from: accountAddress})
    const document = await DocumentContract.methods.getDocument(checksum).call()

    return document
  }

  async setDocument (checksum, name, comment) {
    const timestamp = Date.now().toString()
    const USER = this.config.get('web3.rpc_user')
    const PASS = this.config.get('web3.rpc_pass')
    const RPC_ENDPOINT = this.config.get('web3.rpc_endpoint')
    const nodeUrl = 'https://' + USER + ':' + PASS + '@' + RPC_ENDPOINT
    const provider = new Web3.providers.HttpProvider(nodeUrl)
    const web3 = new Web3(provider)

    const DocumentContract = new web3.eth.Contract(contractAbi, contractAddress, {from: accountAddress, gasPrice: '0'})
    const document = await DocumentContract.methods.setDocument(checksum, name, comment, timestamp).send()

    return document
  }
}
  
module.exports = Web3Helper
