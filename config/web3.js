'use strict'

const Env = use('Env')

module.exports = {
  rpc_user: Env.get('RPC_USER'),
  rpc_pass: Env.get('RPC_PASS'),
  rpc_endpoint: Env.get('RPC_ENDPOINT')
}