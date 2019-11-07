'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const LenderRepository = use('LenderRepository')

class AddController {
  async add ({ request, response, transform }) {
    // Get request body
    const lenderDetails = request.only(['user_id', 'name', 'phone_number', 'email', 'bank_account_number', 'address'])
    
    // Process
    let lender = await transform.item(LenderRepository.add(lenderDetails), 'LenderTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.lender.add')
    const responseData = lender
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = AddController
