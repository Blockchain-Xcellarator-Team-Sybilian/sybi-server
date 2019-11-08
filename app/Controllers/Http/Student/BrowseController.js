'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const StudentRepository = use('StudentRepository')

class BrowseController {
  async browse ({ response, transform }) {
    // Process
    let students = await transform.collection(StudentRepository.browse(), 'StudentTransformer')

    if (students === undefined || students.length == 0) {
      students = null
    }

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.student.browse')
    const responseData = students
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = BrowseController
