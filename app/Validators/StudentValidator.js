'use strict'

const { formatters } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class StudentValidator {
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
      bank_account_number: 'required|unique:students',
      source_of_funds: 'required',
      student_number: 'required',
      date_of_birth: 'required',
      place_of_birth: 'required',
      present_address: 'required',
      permanent_address: 'required'
    }
  }

  get messages () {
    return {
      'name.required': 'Name is required.',
      'phone_number.required': 'Phone number is required.',
      'email.required': 'Email is required.',
      'bank_account_number.required': 'Bank account number is required.',
      'bank_account_number.unique': 'Bank account number already taken.',
      'source_of_funds.required': 'Source of funds is required.',
      'student_number.required': 'Student number is required.',
      'date_of_birth.required': 'Date of birth is required.',
      'place_of_birth.required': 'Place of birth is required.',
      'present_address.required': 'Present address is required.',
      'permanent_address.required': 'Permanent address is required'
    }
  }

  async fails (message) {
    throw new ValidationException(message)
  }
}

module.exports = StudentValidator
