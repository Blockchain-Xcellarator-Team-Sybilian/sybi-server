'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnauthorizedCredentialException extends LogicalException {
  handle (error, { response }) {
    const responseStatus = Config.get('response.status.unauthorized')
    const responseCode = Config.get('response.code.error.unauthorized')
    const responseData = error.message
    
    ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)
  }
}

module.exports = UnauthorizedCredentialException
