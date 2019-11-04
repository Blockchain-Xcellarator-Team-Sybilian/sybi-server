'use strict'

const Logger = use('Logger')
const Config = use('Config')
const User = use('App/Models/User');
const Helpers = use('Educado/Helpers')
const UnauthorizedException = use('App/Exceptions/UnauthorizedException')

class AuthController {
  async register ({ request, response }) {
    // Get request body
    const requestBody = request.only(['username', 'password', 'type'])

    // Log request body
    Logger.info('Register user request', { requestBody })

    // Process
    // Instantiate a new User object
    let user = new User()
    user.username = requestBody.username
    user.password = requestBody.password
    user.type = requestBody.type
    // Save user to database
    await user.save()

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.user.registered')
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
