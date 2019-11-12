'use strict'

const { formatters } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class DenyValidator {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      loan_id: 'required'
    }
  }

  get messages () {
    return {
      'loan_id.required': 'Loan is required.'
    }
  }

  async fails (message) {
    throw new ValidationException(message)
  }
}

module.exports = DenyValidator
