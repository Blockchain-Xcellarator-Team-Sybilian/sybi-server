'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnauthorizedLoginException extends LogicalException {
  handle (error, { response }) {
    const responseStatus = 401
    const responseCode = 'ERROR_UNAUTHORIZED'
    const responseData = {
      errors: [{
          title: 'exists',
          detail: 'User does not exist.',
          source: {
            pointer: null
          }
        }
      ]
    }

    response.status(responseStatus).json({
      code: responseCode,
      data: responseData
    })
  }
}

module.exports = UnauthorizedLoginException
