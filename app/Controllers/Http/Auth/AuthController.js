'use strict'

const Logger = use('Logger')
const User = use('App/Models/User');
const Helpers = use('Educado/Helpers')
const UnauthorizedLoginException = use('App/Exceptions/UnauthorizedLoginException')

class AuthController {
  async register({ request, response }) {
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

    // Format response body
    const responseStatus = 200
    const responseCode = 'SUCCESS_USER_REGISTERED'
    const responseData = { user }

    const responseBody = Helpers.formatResponse(response, responseStatus, responseCode, responseData)

    // Log request body
    Logger.info('Register user request', { requestBody })

    // Return response body
    return responseBody
  }

  async login({ request, auth, response }) {
    // Get request body
    const requestBody = request.only(['username', 'password'])

    // Log request body
    Logger.info('Login user request', { requestBody })

    try {
      // Validate user credentials 
      if (await auth.attempt(requestBody.username, requestBody.password)) {
        // Get user from database
        let user = await User.findBy('username', requestBody.username)
        let token = await auth.generate(user)

        const responseStatus = 200
        const responseCode = 'SUCCESS_USER_LOGGED_IN'
        const responseData = { token }
        const responseBody = Helpers.formatResponse(response, responseStatus, responseCode, responseData)

        return responseBody
      }
    } catch (e) {
      throw new UnauthorizedLoginException()
    }
  }
}

module.exports = AuthController
