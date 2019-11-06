'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const { LogicalException } = require('@adonisjs/generic-exceptions')

class RecordNotFoundException extends LogicalException {
  handle (error, { response }) {
    const responseStatus = Config.get('response.status.not_found')
    const responseCode = Config.get('response.code.error.record_not_found')
    const responseData = error.message
    
    ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)
  }
}

module.exports = RecordNotFoundException
