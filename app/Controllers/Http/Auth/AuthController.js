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

    // Set response body
    const responseBody = Helpers.formatResponse(
      response, // Response object
      Config.get('response.status.success'), // Response status
      Config.get('response.code.success.user.registered'), // Response code
      transform.item(this.userRepository.create(requestBody), 'UserTransformer') // Response data
    )

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
      // Validate user credentials 
      if (await auth.attempt(requestBody.username, requestBody.password)) {
        // Process
        // Get user from database
        let user = await User.findBy('username', requestBody.username)
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
