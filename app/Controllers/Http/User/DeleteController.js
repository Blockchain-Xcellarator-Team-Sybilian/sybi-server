'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UserRepository = use('UserRepository')

class DeleteController {
  async delete ({ response, params }) {
    // Get request body
    const userId = params.id

    // Process
    await UserRepository.delete(userId)

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.user.delete')
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode)

    return responseBody
  }
}

module.exports = DeleteController
