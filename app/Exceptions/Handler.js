'use strict'

const Config = use('Config')
const ResponseHelper = use('ResponseHelper')
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error.name == 'HttpException') {
      const responseStatus = Config.get('response.status.not_found')
      const responseCode = Config.get('response.code.error.route_not_found')
      return ResponseHelper.formatResponse(response, responseStatus, responseCode)
    } else if (error.name == 'InvalidJwtToken') {
      const responseStatus = Config.get('response.status.unauthorized')
      const responseCode = Config.get('response.code.error.unauthorized')
      return ResponseHelper.formatResponse(response, responseStatus, responseCode)
    }  else if (error.name == 'BadRequestError') {
      const responseStatus = Config.get('response.status.bad_request')
      const responseCode = Config.get('response.code.error.bad_request')
      return ResponseHelper.formatResponse(response, responseStatus, responseCode)
    } else if (error.name == 'ModelNotFoundException') {
      const responseStatus = Config.get('response.status.not_found')
      const responseCode = Config.get('response.code.error.record_not_found')
      return ResponseHelper.formatResponse(response, responseStatus, responseCode)
    }

    return

    // response.status(error.status).send(error.name)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
