'use strict'

const Config = use('Config')
const Helpers = use('Educado/Helpers')
const UserRepository = use('App/Repositories/UserRepository')
const UnauthorizedException = use('App/Exceptions/UnauthorizedException')

class LoginController {

  constructor () {
    this.userRepository = UserRepository
  }
  
  async login ({ request, auth, response }) {
    // Get request body
    const requestBody = request.only(['username', 'password'])

    try {
      if (await auth.attempt(requestBody.username, requestBody.password)) {
        // Process
        let user = await this.userRepository.read(requestBody)
        let token = await auth.generate(user)

        // Set response body
        const responseStatus = Config.get('response.status.success')
        const responseCode = Config.get('response.code.success.auth.login')
        const responseData = { token }
        const responseBody = Helpers.formatResponse(response, responseStatus, responseCode, responseData)

        return responseBody
      }
    } catch (exception) {
      throw new UnauthorizedException()
    }
  }
}

module.exports = LoginController
