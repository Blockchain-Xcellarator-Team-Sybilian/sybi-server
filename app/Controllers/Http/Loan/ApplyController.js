'use strict'

const Drive = use('Drive')
const Config = use('Config')
const Helpers = use('Helpers')
const LoanRepository = use('LoanRepository')
const ResponseHelper = use('ResponseHelper')
const DocumentHelper = use('DocumentHelper')
const GeneratorHelper = use('GeneratorHelper')
const DocumentRepository = use('DocumentRepository')
const LoanLimitException = use('App/Exceptions/LoanLimitException')
const DocumentExistsException = use('App/Exceptions/DocumentExistsException')

class ApplyController {
  async apply ({ request, response, transform }) {
    // Get request body
    const loanDetails = request.only(['student_id', 'description', 'amount'])
    
    // Count existing unpaid loans
    let existingLoanCount = await LoanRepository.checkExistingLoanCount(loanDetails)

    if (existingLoanCount >= Config.get('loan.limit_count')) {
      throw new LoanLimitException
    }

    // Process
    let loan = await transform.item(LoanRepository.apply(loanDetails), 'LoanTransformer')

    // Generate document path
    const documentDirectory = Helpers.tmpPath('loans/') + loan.code + '/PDF/'
    const documentName = await GeneratorHelper.code(6) + '.pdf'
    const documentPath = documentDirectory + documentName
    await Drive.put(documentPath)

    // Generate document content
    const documentContent = {
      name: loan.student.name,
      phone: loan.student.phone_number,
      email: loan.student.email,
      amount: loan.amount
    }
    await DocumentHelper.generateLoanApplicationForm(documentPath, documentContent)

    // Generate document checksum
    const documentChecksum = await GeneratorHelper.sha256(documentPath)

    // Check if document already exists
    const existingDocumentCount = await DocumentRepository.checkExistingDocumentCount(documentChecksum)
    
    if (existingDocumentCount > 0) {
      throw new DocumentExistsException
    }

    // Update document details
    const documentDetails = {
      loan_id: loan.id,
      name: documentName,
      type: 'PDF',
      comment: 'Loan Application Form',
      path: documentPath,
      checksum: documentChecksum
    }

    // Save document details
    await DocumentRepository.add(documentDetails)

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.apply')
    const responseData = loan
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = ApplyController
