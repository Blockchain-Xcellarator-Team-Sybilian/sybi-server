'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LoanRepository = use('LoanRepository')

class EndorseController {
  async endorse ({ request, response, transform }) {
    const loanDetails = request.only(['loan_id'])

    // Process
    let loan = await transform.item(LoanRepository.endorse(loanDetails), 'LoanTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.endorse')
    const responseData = loan
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = EndorseController
