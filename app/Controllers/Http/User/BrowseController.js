'use strict'

const Config = use('Config')
const Helpers = use('Educado/Helpers')
const UserRepository = use('App/Repositories/UserRepository')

class BrowseController {
  
  constructor () {
    this.userRepository = UserRepository
  }
  
  /**
   * Show a list of all users.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async browse ({ response, transform }) {
    let users = await transform.collection(this.userRepository.browse(), 'UserTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.user.browse')
    const responseData = users
    const responseBody = Helpers.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = BrowseController
