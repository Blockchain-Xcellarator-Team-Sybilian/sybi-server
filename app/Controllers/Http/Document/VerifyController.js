'use strict'

const Config = use('Config')
const Web3 = use('Web3Helper')
const ResponseHelper = use('ResponseHelper')
const DocumentRepository = use('DocumentRepository')

class VerifyController {
  async verify ({ request, response, transform }) {

    // Get request body
    const documentFile = request.file('document', {
      types: ['pdf, images'],
      size: '5mb'
    })

    // Process
    return await Web3.getLatestBlock()

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.document.browse')
    const responseData = documents
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = VerifyController
