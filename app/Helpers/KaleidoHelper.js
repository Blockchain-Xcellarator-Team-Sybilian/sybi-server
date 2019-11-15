'use strict'

const Axios = require('axios')

class KaleidoHelper {
  constructor (config) {
    this.config = config
	}
	
  async getDocument (checksum) {
    const credential = this.config.get('kaleido.credential')
    const key = this.config.get('kaleido.key')
    const contractAddress = this.config.get('kaleido.contracts.document.address')
    const baseUrl = this.config.get('kaleido.url')
    const contractUrl = this.config.get('kaleido.contracts.document.url') + '/' + contractAddress + '/getDocument'
    const requestUrl = baseUrl + contractUrl
    const config = {
      method: 'get',
      url: requestUrl,
      params: {
        '_checksum': checksum,
        'kld-gasprice': 0
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

  async setDocument (checksum, name, comment) {}
}
  
module.exports = KaleidoHelper
