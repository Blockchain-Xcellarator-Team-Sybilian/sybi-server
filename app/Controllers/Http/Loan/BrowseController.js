'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LoanRepository = use('LoanRepository')

class BrowseController {
  async browse ({ response, transform }) {
    // Process
    let loans = await transform.collection(LoanRepository.browse(), 'LoanTransformer')

    if (loans === undefined || loans.length == 0) {
      loans = null
    }

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.browse')
    const responseData = loans
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = BrowseController
