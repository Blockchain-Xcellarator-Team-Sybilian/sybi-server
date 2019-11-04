'use strict'

const Config = use('Config')
const Helpers = use('Educado/Helpers')
const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnauthorizedException extends LogicalException {
  handle (error, { response }) {
    const responseStatus = Config.get('response.status.unauthorized')
    const responseCode = Config.get('response.code.error.unauthorized')
    const responseData = error.message
    
    Helpers.formatResponse(response, responseStatus, responseCode, responseData)
  }
}

module.exports = UnauthorizedException
