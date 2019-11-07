'use strict'

class ResponseHelper {
  async formatResponse (response, responseStatus, responseCode, responseData = null) {
    return await response.status(responseStatus).json({
      code: responseCode,
      data: responseData
    })
  }
}
  
module.exports = ResponseHelper
