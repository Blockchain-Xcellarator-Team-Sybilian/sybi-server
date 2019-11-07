'use strict'

const Helpers = use('Helpers')

class UploadController {
  async upload ({ request, response }) {
    // Get request body
    const document = request.file('document', {
      types: ['image', 'pdf'],
      size: '5mb'
    })
    
    // Process
    await document.move(Helpers.tmpPath('uploads'), {
      overwrite: true
    })

    // Set response body
    return 'File moved'
  }
}

module.exports = UploadController
