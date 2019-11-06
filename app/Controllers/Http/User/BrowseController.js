'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const UserRepository = use('UserRepository')

class BrowseController {
  constructor () {
    this.userRepository = UserRepository
  }
  
  async browse ({ response, transform }) {
    // Process
    let users = await transform.collection(this.userRepository.browse(), 'UserTransformer')

    if (users === undefined || users.length == 0) {
      users = null
    }

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.user.browse')
    const responseData = users
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = BrowseController
