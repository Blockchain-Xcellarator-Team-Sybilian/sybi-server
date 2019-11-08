'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const StudentRepository = use('StudentRepository')

class ReadController {
  async read ({ response, params, transform }) {
    // Get request body
    const studentId = params.id

    // Process
    let student = await transform.item(StudentRepository.read(studentId), 'StudentTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.student.read')
    const responseData = student
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = ReadController
