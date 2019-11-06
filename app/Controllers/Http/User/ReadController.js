'use strict'

const Config = use('Config')
const Helpers = use('Educado/Helpers')
const UserRepository = use('App/Repositories/UserRepository')

class ReadController {

  constructor () {
    this.userRepository = UserRepository
  }

  async read ({ response, params, transform }) {
    // Get request body
    const userId = params.id
    
    // Process
    let user = await transform.item(this.userRepository.read(userId), 'UserTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.user.read')
    const responseData = { user }
    const responseBody = Helpers.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = ReadController
