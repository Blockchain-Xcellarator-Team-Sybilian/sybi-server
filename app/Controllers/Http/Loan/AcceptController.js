'use strict'

const Drive = use('Drive')
const Config = use('Config')
const Helpers = use('Helpers')
const KaleidoHelper = use('KaleidoHelper')
const LoanRepository = use('LoanRepository')
const ResponseHelper = use('ResponseHelper')
const DocumentHelper = use('DocumentHelper')
const GeneratorHelper = use('GeneratorHelper')
const DocumentRepository = use('DocumentRepository')

class AcceptController {
  async accept ({ request, response, transform }) {
    const loanDetails = request.only(['loan_id'])

    // Process
    let loan = await transform.item(LoanRepository.accept(loanDetails), 'LoanTransformer')

    // Generate document path
    const documentDirectory = Helpers.tmpPath('loans/') + loan.code + '/PDF/'
    const documentName = await GeneratorHelper.code(6) + '.pdf'
    const documentPath = documentDirectory + documentName
    await Drive.put(documentPath)

    // Generate document content
    const documentContent = {
      loan_code: loan.code,
      student_name: loan.student.name,
      lender_name: loan.lender.name,
      amount: loan.amount,
      due_amount: loan.due_amount,
      interest: loan.interest,
      due_date: loan.due_at
    }
    await DocumentHelper.generatePromissoryNote(documentPath, documentContent)

    // Generate document checksum
    const documentChecksum = await GeneratorHelper.sha256(documentPath)

    // Generate document details
    const documentDetails = {
      loan_id: loan.id,
      name: documentName,
      type: 'PDF',
      comment: 'Promissory note',
      path: documentPath,
      checksum: documentChecksum
    }

    // Save document details
    await DocumentRepository.add(documentDetails)

    // Add document to blockchain
    await KaleidoHelper.setDocument(documentDetails.checksum, documentDetails.name, documentDetails.comment)

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.accept')
    const responseData = loan
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = AcceptController
