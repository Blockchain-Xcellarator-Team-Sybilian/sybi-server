'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UserRepository = use('UserRepository')
const ServerErrorException = use('App/Exceptions/ServerErrorException')

class RegisterController {
  async register ({ request, response }) {
    // Get request body
    const requestBody = request.only(['username', 'password', 'type'])

    try {
      // Process
      let user = await UserRepository.add(requestBody)

      // Set response body
      const responseStatus = Config.get('response.status.success')
      const responseCode = Config.get('response.code.success.auth.register')
      const responseData = { user }
      const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

      return responseBody
    } catch (exception) {
      throw new ServerErrorException
    }
  }
}

module.exports = RegisterController
