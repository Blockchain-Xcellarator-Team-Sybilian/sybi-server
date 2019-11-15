'use strict'

const fs =  require('fs')
const Axios = require('axios')
const AxiosFile = require('axios-file');

class KaleidoHelper {
  constructor (config) {
    this.config = config
	}
	
  async getDocument (checksum) {
    const credential = this.config.get('kaleido.credential')
    const key = this.config.get('kaleido.key')
    const gasPrice = this.config.get('kaleido.contracts.document.gas_price')
    const contractAddress = this.config.get('kaleido.contracts.document.address')
    const baseUrl = this.config.get('kaleido.url')
    const contractUrl = this.config.get('kaleido.contracts.document.url') + '/' + contractAddress + '/getDocument'
    const requestUrl = baseUrl + contractUrl
    const config = {
      method: 'get',
      url: requestUrl,
      params: {
        '_checksum': checksum,
        'kld-gasprice': gasPrice
      },
      auth: {
        username: credential,
        password: key
      }
    }

    return await Axios(config)
    .then(function (success) {
      return success.data['output']
    })
    .catch(function (error) {
      return error.response.data.error
    })
  }

  async setDocument (checksum, name, comment) {
    const credential = this.config.get('kaleido.credential')
    const key = this.config.get('kaleido.key')
    const gasPrice = this.config.get('kaleido.contracts.document.gas_price')
    const observerAddress = this.config.get('kaleido.accounts.observer.address')
    const contractAddress = this.config.get('kaleido.contracts.document.address')
    const baseUrl = this.config.get('kaleido.url')
    const contractUrl = this.config.get('kaleido.contracts.document.url') + '/' + contractAddress + '/setDocument'
    const requestUrl = baseUrl + contractUrl

    const config = {
      method: 'post',
      url: requestUrl,
      params: {
        'kld-from': observerAddress,
        'kld-gasprice': gasPrice
      },
      auth: {
        username: credential,
        password: key
      },
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        '_checksum': checksum,
        '_comment': name,
        '_name': comment,
        '_timestamp': Date.now().toString()
      }
    }

    return await Axios(config)
    .then(function (success) {
      return success.data
    })
    .catch(function (error) {
      return error.response.data
    })
  }

  async uploadToIPFS (documentPath) {  
    const credential = this.config.get('kaleido.credential')
    const key = this.config.get('kaleido.key')
    const requestUrl = 'https://' + credential +':' + key + '@a0ubjimmuh-a0jo9scvj3-ipfs.au0-aws.kaleido.io/api/v0/add'

    const config = {
      method: 'put',
      url: requestUrl,
      headers: {
        'cache-control': 'no-cache'
      },
      data: {
        path: fs.createReadStream(documentPath)
      }
    }

    return await AxiosFile(config)
    .then(function (success) {
      return success.data
    })
    .catch(function (error) {
      return error.response.data
    })
  }
}
  
module.exports = KaleidoHelper
