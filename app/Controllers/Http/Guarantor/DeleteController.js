'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const GuarantorRepository = use('GuarantorRepository')

class DeleteController {
  async delete ({ response, params }) {
    // Get request body
    const guarantorId = params.id

    // Process
    await GuarantorRepository.delete(guarantorId)

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.guarantor.delete')
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode)

    return responseBody
  }
}

module.exports = DeleteController
