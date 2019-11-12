'use strict'

const { formatters } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class ApplyValidator {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      student_id: 'required',
      description: 'required',
      amount: 'required'
    }
  }

  get messages () {
    return {
      'student_id.required': 'Student is required.',
      'description.required': 'Description is required.',
      'amount.required': 'Amount is required.'
    }
  }

  async fails (message) {
    throw new ValidationException(message)
  }
}

module.exports = ApplyValidator
