'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const GuarantorRepository = use('GuarantorRepository')

class ReadController {
  async read ({ response, params, transform }) {
    // Get request body
    const guarantorId = params.id

    // Process
    let guarantor = await transform.item(GuarantorRepository.read(guarantorId), 'GuarantorTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.guarantor.read')
    const responseData = guarantor
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = ReadController
