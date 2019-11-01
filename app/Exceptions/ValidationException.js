'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ValidationException extends LogicalException {
  handle (error, { response }) {
    const responseStatus = 400
    const responseCode = 'ERROR_BAD_REQUEST'
    const responseData = error.message

    response.status(responseStatus).json({
      code: responseCode,
      data: responseData
    })
  }
}

module.exports = ValidationException
