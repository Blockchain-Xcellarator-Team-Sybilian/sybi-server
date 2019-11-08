'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LoanRepository = use('LoanRepository')

class ApplyController {
  async add ({ request, response, transform }) {
    // Get request body
    const loanDetails = request.only(['student_id', 'lender_id', 'code', 'status', 'amount',
      'due_date', 'requested_at', 'verified_at', 'approved_at', 'released_at', 'paid_at'])
    
    // Process
    let loan = await transform.item(LoanRepository.add(loanDetails), 'LoanTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.add')
    const responseData = loan
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = AddController
