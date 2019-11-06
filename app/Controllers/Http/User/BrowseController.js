'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UserRepository = use('UserRepository')
const ServerErrorException = use('App/Exceptions/ServerErrorException')

class BrowseController {
  async browse ({ response, transform }) {
    try {
      // Process
      let users = await transform.collection(UserRepository.browse(), 'UserTransformer')

      if (users === undefined || users.length == 0) {
        users = null
      }

      // Set response body
      const responseStatus = Config.get('response.status.success')
      const responseCode = Config.get('response.code.success.user.browse')
      const responseData = users
      const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

      return responseBody
    } catch (exception) {
      throw new ServerErrorException
    }
  }
}

module.exports = BrowseController
