'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UserRepository = use('UserRepository')
const RecordNotFoundException = use('App/Exceptions/RecordNotFoundException')

class EditController {
  async edit ({ request, response, params, transform }) {
    // Get request body
    const userId = params.id
    const userDetails = request.only(['username', 'password', 'type'])

    try {
      // Process
      let user = await transform.item(UserRepository.edit(userId, userDetails), 'UserTransformer')

      // Set response body
      const responseStatus = Config.get('response.status.success')
      const responseCode = Config.get('response.code.success.user.edit')
      const responseData = { user }
      const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

      return responseBody
    } catch (exception) {
      throw new RecordNotFoundException
    }
  }
}

module.exports = EditController
