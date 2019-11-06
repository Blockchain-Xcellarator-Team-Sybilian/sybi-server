'use strict'

const Config = use('Config')
const Helpers = use('Educado/Helpers')
const { LogicalException } = require('@adonisjs/generic-exceptions')

class UserNotFoundException extends LogicalException {
  handle (error, { response }) {
    const responseStatus = Config.get('response.status.not_found')
    const responseCode = Config.get('response.code.error.user_not_found')
    const responseData = error.message
    
    Helpers.formatResponse(response, responseStatus, responseCode, responseData)
  }
}

module.exports = UserNotFoundException
