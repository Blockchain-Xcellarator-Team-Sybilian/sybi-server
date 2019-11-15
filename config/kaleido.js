'use strict'

const Env = use('Env')

module.exports = {
  credential: Env.get('KALEIDO_CREDENTIAL'),
  key: Env.get('KALEIDO_KEY'),
  url: Env.get('KALEIDO_URL'),
  contracts: {
    document: {
      url: '/gateways/document',
      address: '0x7d002860947346b290a010d7ad162ca125a705df',
      gas_price: '0'
    }
  },
}