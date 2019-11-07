'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const StudentRepository = use('StudentRepository')

class DeleteController {
  async delete ({ response, params }) {
    // Get request body
    const studentId = params.id

    // Process
    await StudentRepository.delete(studentId)

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.student.delete')
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode)

    return responseBody
  }
}

module.exports = DeleteController
