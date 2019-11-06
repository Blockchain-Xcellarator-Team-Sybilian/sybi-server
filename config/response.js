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
      auth: {
        register: 'SUCCESS_USER_REGISTER',
        login: 'SUCCESS_USER_LOG_IN'
      },
      user: {
        browse: 'SUCCESS_USER_BROWSE',
        read: 'SUCCESS_USER_READ',
        edit: 'SUCCESS_USER_EDIT',
        add: 'SUCCESS_USER_ADD',
        delete: 'SUCCESS_USER_DELETE'
      }
    },
    error: {
      bad_request: 'ERROR_BAD_REQUEST',
      unauthorized: 'ERROR_UNAUTHORIZED'
    }
  }
}