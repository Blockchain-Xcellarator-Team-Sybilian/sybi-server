'use strict'

const Logger = use('Logger')
const User = use('App/Models/User');
const UnauthorizedLoginException = use('App/Exceptions/UnauthorizedLoginException')

class AuthController {

    async register({ request, response }) {
        // Log request
        Logger.info('Register user request', { request })

        // Get request body
        const requestBody = request.only(['username', 'password', 'type'])

        // Instantiate a new User object
        let user = new User()
        user.username = requestBody.username
        user.password = requestBody.password
        user.type = requestBody.type

        // Save user to database
        await user.save()

        const responseStatus = 200
        const responseCode = 'SUCCESS_USER_REGISTERED'
        const responseData = { user }

        return response.status(responseStatus).json({
          code: responseCode,
          data: responseData
        })
    }

    async login({ request, auth, response }) {
        // Log request
        Logger.info('Login user request', { request })

        // Get request body
        const requestBody = request.only(['username', 'password'])

        try {
          // Validate user credentials 
          if (await auth.attempt(requestBody.username, requestBody.password)) {
            // Get user from database
            let user = await User.findBy('username', requestBody.username)
            let token = await auth.generate(user)

            const responseStatus = 200
            const responseCode = 'SUCCESS_USER_LOGGED_IN'
            const responseData = { token }

            return response.status(responseStatus).json({
              code: responseCode,
              data: responseData
            })
          }
        } catch (e) {
          throw new UnauthorizedLoginException()
        }
    }

}

module.exports = AuthController
