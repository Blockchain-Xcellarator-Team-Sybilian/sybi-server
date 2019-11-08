'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LoanRepository = use('LoanRepository')

class VerifyController {
  async verify ({ request, response, transform }) {
    const loanDetails = request.only(['loan_id'])

    // Process
    let loan = await transform.item(LoanRepository.verify(loanDetails), 'LoanTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.apply')
    const responseData = loan
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = VerifyController
