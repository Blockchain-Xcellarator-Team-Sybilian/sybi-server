'use strict'

module.exports = {
  // Response status
  status: {
      success: 200,
      bad_request: 400,
      unauthorized: 401,
      not_found: 404,
      server_error: 500
  },

  // Response codes
  code: {
    success: {
      auth: {
        register: 'REGISTER',
        login: 'LOG_IN'
      },
      user: {
        browse: 'BROWSE_USERS',
        read: 'READ_USER',
        edit: 'EDIT_USER',
        add: 'ADD_USER',
        delete: 'DELETE_USER'
      }
    },
    error: {
      bad_request: 'BAD_REQUEST',
      unauthorized: 'UNAUTHORIZED',
      record_not_found: 'RECORD_NOT_FOUND',
      server_error: 'INTERNAL_SERVER_ERROR'
    }
  }
}