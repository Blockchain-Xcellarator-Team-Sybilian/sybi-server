'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const { LogicalException } = require('@adonisjs/generic-exceptions')

class ServerErrorException extends LogicalException {
  handle (error, { response }) {
    const responseStatus = Config.get('response.status.server_error')
    const responseCode = Config.get('response.code.error.server_error')
    const responseData = error.message

    ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)
  }
}

module.exports = ServerErrorException
