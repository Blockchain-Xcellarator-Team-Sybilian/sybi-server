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
      .text(`Loan ${documentContent.loan_code} has been posted by ${documentContent.lender_name} to ${documentContent.school_name} for ${documentContent.student_name}. Please proceed to your school's registrar to procure a copy of your receipt. Thanks for being an Educado!`)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }
}
  
module.exports = DocumentHelper
