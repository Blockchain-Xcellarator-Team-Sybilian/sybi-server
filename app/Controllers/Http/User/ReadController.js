'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UserRepository = use('UserRepository')
const RecordNotFoundException = use('App/Exceptions/RecordNotFoundException')

class ReadController {
  async read ({ response, params, transform }) {
    // Get request body
    const userId = params.id

    try {
      // Process
      let user = await transform.item(UserRepository.read(userId), 'UserTransformer')

      // Set response body
      const responseStatus = Config.get('response.status.success')
      const responseCode = Config.get('response.code.success.user.read')
      const responseData = { user }
      const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

      return responseBody
    } catch (exception) {
      throw new RecordNotFoundException
    }
  }
}

module.exports = ReadController
