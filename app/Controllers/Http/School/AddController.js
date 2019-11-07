'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const SchoolRepository = use('SchoolRepository')

class AddController {
  async add ({ request, response, transform }) {
    // Get request body
    const schoolDetails = request.only(['user_id', 'name', 'phone_number', 'email', 'bank_account_number', 'address'])
    
    // Process
    let school = await transform.item(SchoolRepository.add(schoolDetails), 'SchoolTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.school.add')
    const responseData = school
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = AddController
