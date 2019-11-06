'use strict'

const { formatters } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class RefreshTokenValidator {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      refresh_token: 'required'
    }
  }

  get messages () {
    return {
      'refresh_token.required': 'Refresh token is required.'
    }
  }

  async fails (message) {
    throw new ValidationException(message)
  }
}

module.exports = RefreshTokenValidator
