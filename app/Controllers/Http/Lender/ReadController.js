'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LenderRepository = use('LenderRepository')

class ReadController {
  async read ({ response, params, transform }) {
    // Get request body
    const lenderId = params.id

    // Process
    let lender = await transform.item(LenderRepository.read(lenderId), 'LenderTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.lender.read')
    const responseData = lender
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = ReadController
