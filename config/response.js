'use strict'

module.exports = {
  // Response status
  status: {
      success: 200,
      bad_request: 400,
      unauthorized: 401
  },

  // Response codes
  code: {
    success: {
      user: {
        registered: 'SUCCESS_USER_REGISTERED',
        login: 'SUCCESS_USER_LOGGED_IN'
      }
    },
    error: {
      bad_request: 'ERROR_BAD_REQUEST',
      unauthorized: 'ERROR_UNAUTHORIZED'
    }
  }
}