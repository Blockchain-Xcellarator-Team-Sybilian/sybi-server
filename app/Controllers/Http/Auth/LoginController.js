'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UserRepository = use('UserRepository')
const UnauthorizedException = use('App/Exceptions/UnauthorizedException')

class LoginController {
  async login ({ request, auth, response }) {
    // Get request body
    const requestBody = request.only(['username', 'password'])

    try {
      if (await auth.attempt(requestBody.username, requestBody.password)) {
        // Process
        let user = await UserRepository.read(requestBody)
        let token = await auth.generate(user)

        // Set response body
        const responseStatus = Config.get('response.status.success')
        const responseCode = Config.get('response.code.success.auth.login')
        const responseData = { token }
        const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

        return responseBody
      }
    } catch (exception) {
      throw new UnauthorizedException()
    }
  }
}

module.exports = LoginController
