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

class ReceiveController {
  async receive ({ request, response, transform }) {
    const loanDetails = request.only(['loan_id'])

    // Process
    let loan = await transform.item(LoanRepository.receive(loanDetails), 'LoanTransformer')

    // Generate document path
    const documentDirectory = Helpers.tmpPath('loans/') + loan.code + '/PDF/'
    const documentName = await GeneratorHelper.code(6) + '.pdf'
    const documentPath = documentDirectory + documentName
    await Drive.put(documentPath)

    // Generate document content
    const documentContent = {
      lender_name: loan.lender.name,
      school_name: loan.student.school.name,
      amount: loan.amount
    }
    await DocumentHelper.generateNoticeOfReceipt(documentPath, documentContent)

    // Generate document checksum
    const documentChecksum = await GeneratorHelper.sha256(documentPath)

    // Generate document details
    const documentDetails = {
      loan_id: loan.id,
      name: documentName,
      type: 'PDF',
      comment: 'Notice of receipt',
      path: documentPath,
      checksum: documentChecksum
    }

    // Save document details
    await DocumentRepository.add(documentDetails)

    // Add document to blockchain
    await KaleidoHelper.setDocument(documentDetails.checksum, documentDetails.name, documentDetails.comment)

    // Set response body
    const responseStatus = Config.get('response.status.success')
    const responseCode = Config.get('response.code.success.loan.receive')
    const responseData = loan
    const responseBody = ResponseHelper.formatResponse(response, responseStatus, responseCode, responseData)

    return responseBody
  }
}

module.exports = ReceiveController
