'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const SchoolRepository = use('SchoolRepository')

class EditController {
  async edit ({ request, response, params, transform }) {
    // Get request body
    const schoolId = params.id
    const schoolDetails = request.only(['name', 'phone_number', 'email', 'address', 'bank_account_number'])

    // Process
    let school = await transform.item(SchoolRepository.edit(schoolId, schoolDetails), 'SchoolTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.school.edit')
    const responseData = school
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = EditController
