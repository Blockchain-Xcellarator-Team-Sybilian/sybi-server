'use strict'

// Create global helper functions here

class Helpers {
  async formatResponse (response, responseStatus, responseCode, responseData) {
    return await response.status(responseStatus).json({
      code: responseCode,
      data: responseData
    })
  }
}
  
module.exports = Helpers
