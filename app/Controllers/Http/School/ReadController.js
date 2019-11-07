'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const SchoolRepository = use('SchoolRepository')

class ReadController {
  async read ({ response, params, transform }) {
    // Get request body
    const schoolId = params.id

    // Process
    let school = await transform.item(SchoolRepository.read(schoolId), 'SchoolTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.school.read')
    const responseData = { school }
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = ReadController
