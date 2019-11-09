'use strict'

const Config = use('Config')
const Helpers = use('Helpers')
const ResponseHelper = use('ResponseHelper')
const LoanRepository = use('LoanRepository')
const GeneratorHelper = use('GeneratorHelper')
const DocumentRepository = use('DocumentRepository')
const DocumentExistsException = use('App/Exceptions/DocumentExistsException')

class UploadController {
  async upload ({ request, response, transform }) {
    // Get request body
    const documentDetails = request.only(['loan_id', 'comment'])
    const documentFile = request.file('document', {
      types: ['pdf'],
      size: '5mb'
    })

    // Read loan details
    let loan = await transform.item(LoanRepository.read(documentDetails.loan_id), 'LoanTransformer')
    const loanCode = loan.code
    const documentDirectory = Helpers.tmpPath('loans/') + loanCode + '/PDF/'
    const documentName = await GeneratorHelper.code(6) + '.pdf'

    // Move document to folder
    await documentFile.move(documentDirectory, {
      name: documentName,
      overwrite: true
    })

    // Generate document checksum
    const documentChecksum = await GeneratorHelper.sha256(documentDirectory + documentName)

    // Update document details
    documentDetails.name = documentName
    documentDetails.path = documentDirectory
    documentDetails.checksum = documentChecksum

    // Check if document already exists
    const existingDocumentCount = await DocumentRepository.checkExistingDocumentCount(documentChecksum)
    
    if (existingDocumentCount > 0) {
      throw new DocumentExistsException
    }

    // Save document details
    let document = await transform.item(DocumentRepository.add(documentDetails), 'DocumentTransformer')

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.document.add')
    const responseData = document
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = UploadController
