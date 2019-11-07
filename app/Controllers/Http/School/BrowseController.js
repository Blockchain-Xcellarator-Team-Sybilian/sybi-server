'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const SchoolRepository = use('SchoolRepository')

class BrowseController {
  async browse ({ response, transform }) {
    // Process
    let schools = await transform.collection(SchoolRepository.browse(), 'SchoolTransformer')

    if (schools === undefined || schools.length == 0) {
      schools = null
    }

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.school.browse')
    const responseData = schools
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = BrowseController
