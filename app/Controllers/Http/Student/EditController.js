'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const StudentRepository = use('StudentRepository')

class EditController {
  async edit ({ request, response, params, transform }) {
    // Get request body
    const studentId = params.id
    const studentDetails = request.only(['name', 'phone_number', 'email',
      'source_of_funds', 'source_of_funds_description', 'student_number',
      'date_of_birth', 'place_of_birth', 'present_address', 'permanent_address'])

    // Process
    let student = await transform.include('school,guarantor').item(StudentRepository.edit(studentId, studentDetails), 'StudentTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.student.edit')
    const responseData = student
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = EditController
