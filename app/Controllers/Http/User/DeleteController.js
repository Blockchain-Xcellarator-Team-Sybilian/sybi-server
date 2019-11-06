'use strict'

const Config = use('Config')
const Helpers = use('Educado/Helpers')
const UserRepository = use('App/Repositories/UserRepository')

class DeleteController {
  constructor () {
    this.userRepository = UserRepository
  }

  async delete ({ response, params }) {
    // Get request body
    const userId = params.id
    
    // Process
    await this.userRepository.delete(userId)

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.user.delete')
    const responseBody = Helpers.formatResponse(response, responseStatus, responseCode)

    return responseBody
  }
}

module.exports = DeleteController
