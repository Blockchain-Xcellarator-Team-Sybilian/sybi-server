'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LoanRepository = use('LoanRepository')

class ReadController {
  async read ({ response, params, transform }) {
    // Get request body
    const loanId = params.id

    // Process
    let loan = await transform.item(LoanRepository.read(loanId), 'LoanTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.read')
    const responseData = loan
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = ReadController
