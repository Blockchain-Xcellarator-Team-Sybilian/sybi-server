'use strict'

const fs = require('fs');
const Helpers = use('Helpers')
const PDFDocument = require('pdfkit')

class DocumentHelper {
  constructor (generator) {
    this.generator = generator
  }

  async generateLoanApplicationForm (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 });
    
    document
      .text(`LOAN APPLICATION FORM`)
      .moveDown()
      .text(`Name: ${documentContent.name}`)
      .text(`Phone: ${documentContent.phone}`)
      .text(`Email: ${documentContent.email}`)
      .text(`Amount: ${documentContent.amount}`)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfApproval (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 });
    
    document
      .text(`NOTICE OF APPROVAL`)
      .moveDown()
      .text(`Loan ${documentContent.loan_code} has been approved by ${documentContent.lender_name} to ${documentContent.school_name} for ${documentContent.student_name}.`)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generatePromissoryNote (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 });
    
    document
      .text(`PROMISSORY NOTE`)
      .moveDown()
      .text(`Loan: ${documentContent.loan_code}`)
      .text(`Student: ${documentContent.student_name}`)
      .text(`Lender: ${documentContent.lender_name}`)
      .text(`Principal Amount: ${documentContent.amount}`)
      .text(`Due Amount: ${documentContent.due_amount}`)
      .text(`Interest: ${documentContent.interest}`)
      .text(`Due Date: ${documentContent.due_date}`)
      .moveDown()
      .text(`For value received, I hereby certify that the information above and all information I provided during the application for this loan request is certified true, complete, and correct.`)
      .text(`I acknowledge that the amount mentioned above will be due and payable at the above date. In the event of default in payment, I acknowledge that the whole amount will become due and payable without notice and demandable immediately.`)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfRelease (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 });
    
    document
      .text(`NOTICE OF RELEASE`)
      .moveDown()
      .text(`An amount of ${documentContent.amount} has been released by ${documentContent.lender_name} to ${documentContent.school_name}.`)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfReceipt (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 });
    
    document
      .text(`NOTICE OF RECEIPT`)
      .moveDown()
      .text(`An amount of ${documentContent.amount} has been received by ${documentContent.school_name} from ${documentContent.lender_name}.`)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfPayment (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 });
    
    document
      .text(`NOTICE OF PAYMENT`)
      .moveDown()
      .text(`An amount of ${documentContent.amount} has been paid by ${documentContent.student_name} to ${documentContent.lender_name} for loan ${documentContent.code}.`)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfCancellation (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 });
    
    document
      .text(`NOTICE OF CANCELLATION`)
      .moveDown()
      .text(`Loan ${documentContent.code} has been cancelled.`)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfDenial (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 });
    
    document
      .text(`NOTICE OF DENIAL`)
      .moveDown()
      .text(`Loan ${documentContent.code} has been denied.`)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }
}
  
module.exports = DocumentHelper
