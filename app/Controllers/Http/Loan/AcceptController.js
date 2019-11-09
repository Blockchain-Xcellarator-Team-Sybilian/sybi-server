'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LoanRepository = use('LoanRepository')

class AcceptController {
  async accept ({ request, response, transform }) {
    // Get request body
    const loanDetails = request.only(['loan_id', 'lender_id', 'due_amount', 'due_at'])
    
    // Process
    let loan = await transform.item(LoanRepository.accept(loanDetails), 'LoanTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.accept')
    const responseData = loan
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = AcceptController
