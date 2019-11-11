'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const DocumentRepository = use('DocumentRepository')

class BrowseController {
  async browse ({ response, transform }) {
    // Process
    let documents = await transform.collection(DocumentRepository.browse(), 'DocumentTransformer')

    if (documents === undefined || documents.length == 0) {
      documents = null
    }

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.document.browse')
    const responseData = documents
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = BrowseController
