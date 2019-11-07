'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UnauthorizedCredentialException = use('App/Exceptions/UnauthorizedCredentialException')

class RefreshController {
  async refresh ({ request, auth, response }) {
    // Get request body
    const refreshToken = request.input('refresh_token')

    try {
      // Process
      let token = await auth.generateForRefreshToken(refreshToken)

      // Set response body
      const responseStatus = Config.get('response.status.success')
      const responseCode = Config.get('response.code.success.token.refresh')
      const responseData = { token }
      const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

      return responseBody
    } catch (exception) {
      throw new UnauthorizedCredentialException
    }
  }
}

module.exports = RefreshController
