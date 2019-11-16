'use strict'

const Config = use('Config')
const Helpers = use('Helpers')
const KaleidoHelper = use('KaleidoHelper')
const ResponseHelper = use('ResponseHelper')
const GeneratorHelper = use('GeneratorHelper')
var match

class VerifyController {
  async verify ({ request, response }) {
    // Get request body
    const documentFile = request.file('document', {
      types: ['pdf'],
      size: '5mb'
    })

    // Move document to folder
    const documentDirectory = Helpers.tmpPath('verify/')
    const documentName = await GeneratorHelper.code(18) + '.pdf'
    const documentPath = documentDirectory + documentName
    
    await documentFile.move(documentDirectory, {
      name: documentName,
      overwrite: true
    })

    // Upload to IPFS and get checksum
    const ipfsDocument = await KaleidoHelper.uploadToIPFS(documentPath)

    // Process
    const blockchainChecksum = await KaleidoHelper.getDocument(ipfsDocument.Hash)

    if (ipfsDocument.Hash == blockchainChecksum) {
      match = true
    } else if (blockchainChecksum == 'Document does not exists.') {
      match = false
    }

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.document.verify')
    const responseData = match
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = VerifyController
