'use strict'

const Helpers = use('Helpers')

class DownloadController {
  async download ({ response, params }) {
    // Get request body
    const loanCode = params.loanCode
    const documentName = params.documentName

    // Process
    const documentDirectory = Helpers.tmpPath('loans/') + loanCode + '/PDF/' + documentName

    return response.attachment(
      documentDirectory,
      documentName
    )
  }
}

module.exports = DownloadController
