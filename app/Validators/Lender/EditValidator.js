'use strict'

const { formatters } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class EditValidator {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      name: 'required',
      phone_number: 'required',
      email: 'required',
      address: 'required'
    }
  }

  get messages () {
    return {
      'name.required': 'Name is required.',
      'phone_number.required': 'Phone number is required.',
      'email.required': 'Email is required.',
      'address.required': 'Address type is required.'
    }
  }

  async fails (message) {
    throw new ValidationException(message)
  }
}

module.exports = EditValidator
