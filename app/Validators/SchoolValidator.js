'use strict'

const { formatters } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class SchoolValidator {
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
      bank_account_number: 'required',
      address: 'required'
    }
  }

  get messages () {
    return {
      'name.unique': 'Name is required.',
      'phone_number.required': 'Phone number is required',
      'email.required': 'Email is required',
      'bank_account_number.required': 'Bank account number is required',
      'address.required': 'Address type is required'
    }
  }

  async fails (message) {
    throw new ValidationException(message)
  }
}

module.exports = SchoolValidator
