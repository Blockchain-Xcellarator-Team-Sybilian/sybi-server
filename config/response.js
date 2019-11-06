'use strict'

module.exports = {
  // Response status
  status: {
      success: 200,
      bad_request: 400,
      unauthorized: 401,
      not_found: 404
  },

  // Response codes
  code: {
    success: {
      auth: {
        register: 'SUCCESS_REGISTER_USER',
        login: 'SUCCESS_LOG_IN_USER'
      },
      user: {
        browse: 'SUCCESS_BROWSE_USERS',
        read: 'SUCCESS_READ_USER',
        edit: 'SUCCESS_EDIT_USER',
        add: 'SUCCESS_ADD_USER',
        delete: 'SUCCESS_DELETE_USER'
      }
    },
    error: {
      bad_request: 'ERROR_BAD_REQUEST',
      unauthorized: 'ERROR_UNAUTHORIZED',
      user_not_found: 'ERROR_USER_NOT_FOUND'
    }
  }
}