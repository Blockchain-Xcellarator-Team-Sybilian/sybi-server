'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')

class LenderController {
  async lender ({ request, response }) {
    // Get request body

    // Process

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.register.lender')
    const responseData = null
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = LenderController
