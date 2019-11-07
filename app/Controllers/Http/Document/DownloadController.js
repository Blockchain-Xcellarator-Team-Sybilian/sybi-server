'use strict'

const Helpers = use('Helpers')

class DownloadController {
  async download ({ request, response }) {
    // Set response body
    response.attachment(
      Helpers.tmpPath('uploads/sample.pdf')
    )
  }
}

module.exports = DownloadController
