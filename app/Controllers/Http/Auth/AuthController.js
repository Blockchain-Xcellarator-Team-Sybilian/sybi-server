'use strict'

const Logger = use('Logger')
const User = use('App/Models/User');
const Token = use('App/Models/Token');

class AuthController {

    async register({request, auth, response}) {
        // Get user credentials
        const username = request.input("username")
        const password = request.input("password")
        const type = request.input("type")

        // Instantiate a new User object
        let user = new User()
        user.username = username
        user.password = password
        user.type = type

        // Save user to database
        await user.save()

        // Log request
        Logger.info('Register user request', {user})

        return response.json({user})
    }

    async login({request, auth, response}) {
        // Get user credentials
        const username = request.input("username")
        const password = request.input("password")

        try {
          if (await auth.attempt(username, password)) {
            // Get user from database
            let user = await User.findBy('username', username)
            let token = await auth.generate(user)

            // Log request
            Logger.info('Login user request', {token})

            return response.json({token})
          }
        }

        catch (e) {
          // Log error
          Logger.info('Login user request', {e})

          return response.json({message: 'User not registered.'})
        }
    }

}

module.exports = AuthController
