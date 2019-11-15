'use strict'

const Config = use('Config')
const Helpers = use('Helpers')
const KaleidoHelper = use('KaleidoHelper')
const ResponseHelper = use('ResponseHelper')
const LoanRepository = use('LoanRepository')
const GeneratorHelper = use('GeneratorHelper')
const DocumentRepository = use('DocumentRepository')
const DocumentExistsException = use('App/Exceptions/DocumentExistsException')

class UploadController {
  async upload ({ request, response, transform }) {
    // Get request body
    const documentDetails = request.only(['loan_id', 'comment'])
    const documentFile = request.file('png', {
      types: ['image'],
      size: '5mb'
    })

    // Read loan details
    let loan = await transform.item(LoanRepository.read(documentDetails.loan_id), 'LoanTransformer')
    const loanCode = loan.code
    const documentDirectory = Helpers.tmpPath('loans/') + loanCode + '/PNG/'
    const documentName = await GeneratorHelper.code(6) + '.png'
    const documentPath = documentDirectory + documentName

    // Move document to folder
    await documentFile.move(documentDirectory, {
      name: documentName,
      overwrite: true
    })

    // Upload to IPFS and get checksum
    const ipfsDocument = await KaleidoHelper.uploadToIPFS(documentPath)

    // Update document details
    documentDetails.name = documentName
    documentDetails.type = 'PNG'
    documentDetails.path = documentPath
    documentDetails.checksum = ipfsDocument.Hash

    // Check if document already exists
    const existingDocumentCount = await DocumentRepository.checkExistingDocumentCount(documentDetails.checksum)
    
    if (existingDocumentCount > 0) {
      throw new DocumentExistsException
    }

    // Save document details
    let document = await transform.item(DocumentRepository.add(documentDetails), 'DocumentTransformer')

    // Add document to blockchain
    await KaleidoHelper.setDocument(documentDetails.checksum, documentDetails.name, documentDetails.comment)

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.document.add')
    const responseData = document
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = UploadController
