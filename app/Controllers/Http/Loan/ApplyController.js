'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LoanRepository = use('LoanRepository')
const LoanLimitException = use('App/Exceptions/LoanLimitException')

class ApplyController {
  async apply ({ request, response, transform }) {
    // Get request body
    const loanDetails = request.only(['student_id', 'description', 'amount'])
    
    // Count existing unpaid loans
    let existingLoan = await LoanRepository.checkExistingLoan(loanDetails)

    if (existingLoan >= Config.get('loan.limit_count')) {
      throw new LoanLimitException
    }
    
    // Process
    let loan = await transform.item(LoanRepository.apply(loanDetails), 'LoanTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.apply')
    const responseData = loan
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = ApplyController
