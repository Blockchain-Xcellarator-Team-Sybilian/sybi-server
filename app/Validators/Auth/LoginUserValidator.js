'use strict'

const { formatters } = use('Validator')
const BadRequestException = use('App/Exceptions/BadRequestException')

class LoginUserValidator {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      username: 'required',
      password: 'required',
    }
  }

  get messages () {
    return {
      'username.required': 'Username is required.',
      'password.required': 'Password is required'
    }
  }

  async fails (message) {
    throw new BadRequestException(message)
  }
}

module.exports = LoginUserValidator
