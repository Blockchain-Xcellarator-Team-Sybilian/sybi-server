'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UserRepository = use('UserRepository')
const UnauthorizedCredentialException = use('App/Exceptions/UnauthorizedCredentialException')

class RequestController {
  async request ({ request, auth, response }) {
    // Get request body
    const requestBody = request.only(['username', 'password'])

    try {
      if (await auth.attempt(requestBody.username, requestBody.password)) {
        // Process
        let user = await UserRepository.readByUsername(requestBody.username)
        let token = await auth.withRefreshToken().generate(user)

        // Set response body
        const responseStatus = Config.get('response.status.success')
        const responseCode = Config.get('response.code.success.token.request')
        const responseData = { token }
        const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

        return responseBody
      }
    } catch (exception) {
      throw new UnauthorizedCredentialException
    }
  }
}

module.exports = RequestController
