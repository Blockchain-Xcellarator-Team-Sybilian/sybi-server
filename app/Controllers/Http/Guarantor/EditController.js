'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const GuarantorRepository = use('GuarantorRepository')

class EditController {
  async edit ({ request, response, params, transform }) {
    // Get request body
    const guarantorId = params.id
    const guarantorDetails = request.only(['name', 'phone_number', 'email',
      'bank_account_number', 'source_of_income', 'source_of_income_description', 'date_of_birth',
      'place_of_birth', 'present_address', 'permanent_address'])

    // Process
    let guarantor = await transform.item(GuarantorRepository.edit(guarantorId, guarantorDetails), 'GuarantorTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.guarantor.edit')
    const responseData = guarantor
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = EditController
