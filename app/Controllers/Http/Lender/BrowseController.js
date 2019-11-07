'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LenderRepository = use('LenderRepository')

class BrowseController {
  async browse ({ response, transform }) {
    // Process
    let lenders = await transform.collection(LenderRepository.browse(), 'LenderTransformer')

    if (lenders === undefined || lenders.length == 0) {
      lenders = null
    }

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.lender.browse')
    const responseData = lenders
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = BrowseController
