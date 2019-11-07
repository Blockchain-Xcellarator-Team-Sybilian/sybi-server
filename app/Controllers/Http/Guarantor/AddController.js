'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const GuarantorRepository = use('GuarantorRepository')

class AddController {
  async add ({ request, response, transform }) {
    // Get request body
    const guarantorDetails = request.only(['student_id', 'name', 'phone_number', 'email',
      'bank_account_number', 'source_of_income', 'source_of_income_description', 'date_of_birth',
      'place_of_birth', 'present_address', 'permanent_address'])
    
    // Process
    let guarantor = await transform.item(GuarantorRepository.add(guarantorDetails), 'GuarantorTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.guarantor.add')
    const responseData = guarantor
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = AddController
