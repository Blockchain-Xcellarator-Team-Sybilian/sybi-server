'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const { LogicalException } = require('@adonisjs/generic-exceptions')

class BadRequestException extends LogicalException {
  handle (error, { response }) {
    const responseStatus = Config.get('response.status.bad_request')
    const responseCode = Config.get('response.code.error.bad_request')
    const responseData = error.message

    ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)
  }
}

module.exports = BadRequestException
