'use strict'

const Logger = use('Logger')
const User = use('App/Models/User');

class AuthController {

    async register({request, auth, response}) {
      
        Logger.info('TEST')
        return null

        // Get user credentials
        const username = request.input("username")
        const password = request.input("password")

        // Instantiate a new User object
        let user = new User()
        user.username = username
        user.password = password

        // Save user to database
        user = await user.save()

        Logger.info({ user })

        // Generate token
        let token = await auth.generate(user)

        // Assign token to user
        Object.assign(user, token)

        return response.json({ user, token })
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

            // Assign token to user
            Object.assign(user, token)

            return response.json({"user":user, "token": token})
          }
        }

        catch (e) {
          return response.json({message: 'User not registered.'})
        }
    }

}

module.exports = AuthController
