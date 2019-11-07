'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const StudentRepository = use('StudentRepository')

class AddController {
  async add ({ request, response, transform }) {
    // Get request body
    const studentDetails = request.only(['user_id', 'school_id', 'name', 'phone_number', 'email',
      'bank_account_number', 'source_of_funds', 'source_of_funds_description', 'student_number',
      'date_of_birth', 'place_of_birth', 'present_address', 'permanent_address'])
    
    // Process
    let student = await transform.include('school,guarantor').item(StudentRepository.add(studentDetails), 'StudentTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.student.add')
    const responseData = student
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = AddController
