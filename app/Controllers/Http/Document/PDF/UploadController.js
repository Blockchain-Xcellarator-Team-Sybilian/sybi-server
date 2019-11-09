'use strict'

const Helpers = use('Helpers')
const LoanRepository = use('LoanRepository')
const GeneratorHelper = use('GeneratorHelper')
const DocumentRepository = use('DocumentRepository')
const DocumentExistsException = use('App/Exceptions/DocumentExistsException')

class UploadController {
  async upload ({ request, response, transform }) {
    // Get request body
    const documentDetails = request.only(['loan_id', 'comment'])
    const documentName = await GeneratorHelper.code(18) + '.pdf'
    const document = request.file('document', {
      types: ['pdf'],
      size: '5mb'
    })

    let loan = await transform.item(LoanRepository.read(documentDetails.loan_id), 'LoanTransformer')
    const loanCode = loan.code
    const loanDirectory = Helpers.tmpPath('loans/') + loanCode + '/PDF/'

    // Move document to dedicated loans folder
    await document.move(loanDirectory, {
      name: documentName,
      overwrite: true
    })

    // Hash document
    const documentChecksum = await GeneratorHelper.sha256(loanDirectory + documentName)

    // Check document already exists
    const existingDocumentCount = await DocumentRepository.checkExistingDocumentCount(documentChecksum)
    
    if (existingDocumentCount > 0) {
      throw new DocumentExistsException
    }

    return existingDocumentCount

    // Save document details

    return documentChecksum
  }
}

module.exports = UploadController
