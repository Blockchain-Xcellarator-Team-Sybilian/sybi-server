'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const SchoolRepository = use('SchoolRepository')

class DeleteController {
  async delete ({ response, params }) {
    // Get request body
    const schoolId = params.id

    // Process
    await SchoolRepository.delete(schoolId)

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.school.delete')
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode)

    return responseBody
  }
}

module.exports = DeleteController
