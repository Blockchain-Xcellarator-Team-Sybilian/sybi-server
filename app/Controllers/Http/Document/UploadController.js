'use strict'

const Helpers = use('Helpers')
const GeneratorHelper = use('GeneratorHelper')

class UploadController {
  async upload ({ request, response }) {
    // Get request body
    const documentDetails = request.only(['loan_id', 'name', 'comment'])
    const documentName = await GeneratorHelper.code(18)
    const document = request.file('document', {
      types: ['pdf'],
      size: '5mb'
    })    

    // Move document to loans/LOAN_CODE folder
    // Hash document
    // Check if hash already exists
    // Save document details

    await document.move(Helpers.tmpPath('loans'), {
      name: documentName + '.pdf',
      overwrite: true
    })

    const checksum = await GeneratorHelper.sha256(Helpers.tmpPath('loans/' + documentName  + '.pdf'))

    return checksum
  }
}

module.exports = UploadController
