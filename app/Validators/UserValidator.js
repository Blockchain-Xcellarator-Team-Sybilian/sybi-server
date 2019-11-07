'use strict'

const { formatters } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class UserValidator {
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
    throw new ValidationException(message)
  }
}

module.exports = UserValidator
