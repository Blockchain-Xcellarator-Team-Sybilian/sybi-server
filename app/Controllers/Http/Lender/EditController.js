'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LenderRepository = use('LenderRepository')

class EditController {
  async edit ({ request, response, params, transform }) {
    // Get request body
    const lenderId = params.id
    const lenderDetails = request.only(['name', 'phone_number', 'email', 'bank_account_number', 'address'])

    // Process
    let lender = await transform.item(LenderRepository.edit(lenderId, lenderDetails), 'LenderTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.lender.edit')
    const responseData = lender
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = EditController
