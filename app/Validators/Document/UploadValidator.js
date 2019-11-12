'use strict'

const { formatters } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')

class UploadValidator {
  get validateAll () {
    return true
  }

  get formatter () {
    return formatters.JsonApi
  }

  get rules () {
    return {
      loan_id: 'required',
      document: 'required',
      comment: 'required'
    }
  }

  get messages () {
    return {
      'loan_id.required': 'Loan is required.',
      'document.required': 'Document is required.',
      'comment.required': 'Comment is required.'
    }
  }

  async fails (message) {
    throw new ValidationException(message)
  }
}

module.exports = UploadValidator
