'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const GuarantorRepository = use('GuarantorRepository')

class BrowseController {
  async browse ({ response, transform }) {
    // Process
    let guarantors = await transform.collection(GuarantorRepository.browse(), 'GuarantorTransformer')

    if (guarantors === undefined || guarantors.length == 0) {
      guarantors = null
    }

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.guarantor.browse')
    const responseData = guarantors
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = BrowseController
