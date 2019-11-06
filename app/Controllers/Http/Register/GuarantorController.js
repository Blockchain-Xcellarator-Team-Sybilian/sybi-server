'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const ServerErrorException = use('App/Exceptions/ServerErrorException')

class GuarantorController {
  async guarantor ({ request, response }) {
    // Get request body

    try {
      // Process
    } catch (exception) {
      throw new ServerErrorException
    }

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.register.guarantor')
    const responseData = null
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = GuarantorController
