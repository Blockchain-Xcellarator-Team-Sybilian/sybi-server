'use strict'

const { formatters } = use('Validator')
const BadRequestException = use('App/Exceptions/BadRequestException')

class EditUserValidator {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      username: 'required|unique:users',
      password: 'required',
      type: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'Username is required.',
      'username.unique': 'Username already taken.',
      'password.required': 'Password is required',
      'type.required': 'User type is required'  
    }
  }

  async fails (message) {
    throw new BadRequestException(message)
  }
}

module.exports = EditUserValidator
