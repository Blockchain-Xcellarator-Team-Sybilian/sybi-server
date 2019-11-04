'use strict'

const Logger = use('Logger')
const Config = use('Config')
const Helpers = use('Educado/Helpers')
const UserRepository = use('App/Repositories/UserRepository')
const UnauthorizedException = use('App/Exceptions/UnauthorizedException')

class AuthController {

  constructor () {
    this.userRepository = UserRepository
  }

  async register ({ request, response, transform }) {
    // Get request body
    const requestBody = request.only(['username', 'password', 'type'])

    // Log request body
    Logger.info('Register user request', { requestBody })

    // Process
    let user = await transform.item(this.userRepository.create(requestBody), 'UserTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.user.register')
    const responseData = { user }
    const responseBody = Helpers.formatResponse(response, responseStatus, responseCode, responseData)

    // Log response body
    Logger.info('Register user response', { responseBody })

    return responseBody
  }

  async login ({ request, auth, response }) {
    // Get request body
    const requestBody = request.only(['username', 'password'])

    // Log request body
    Logger.info('Login user request', { requestBody })

    try {
      if (await auth.attempt(requestBody.username, requestBody.password)) {
        // Process
        let user = await this.userRepository.read(requestBody)
        let token = await auth.generate(user)

        // Set response body
        const responseStatus = Config.get('response.status.success')
        const responseCode = Config.get('response.code.success.user.login')
        const responseData = { token }
        const responseBody = Helpers.formatResponse(response, responseStatus, responseCode, responseData)

        // Log response body
        Logger.info('Login user response', { responseBody })

        return responseBody
      }
    } catch (exception) {
      throw new UnauthorizedException()
    }
  }
}

module.exports = AuthController
