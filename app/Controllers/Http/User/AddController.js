'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UserRepository = use('App/Repositories/UserRepository')

class AddController {
  constructor () {
    this.userRepository = UserRepository
  }

  async add ({ request, response, transform }) {
    // Get request body
    const userDetails = request.only(['username', 'password', 'type'])
    
    // Process
    let user = await transform.item(this.userRepository.add(userDetails), 'UserTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.user.add')
    const responseData = { user }
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = AddController
