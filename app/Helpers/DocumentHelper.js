'use strict'

const fs = require('fs')
const PDFDocument = require('pdfkit')

class DocumentHelper {
  async generateLoanApplicationForm (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 })
    
    generateHeader(document)
    document
      .fontSize(15)
      .text(`LOAN APPLICATION FORM`)
      .moveDown()
      .fontSize(13)
      .text(`Name: ${documentContent.name}`, 50, null, { align: `left` })
      .text(`Phone: ${documentContent.phone}`, 50, null, { align: `left` })
      .text(`Email: ${documentContent.email}`, 50, null, { align: `left` })
      .text(`Amount: ${documentContent.amount}`, 50, null, { align: `left` })
    generateWatermark(document)
    generateFooter(document)


    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfApproval (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 })
    
    generateHeader(document)
    document
      .fontSize(15)
      .text(`NOTICE OF APPROVAL`)
      .moveDown()
      .fontSize(13)
      .moveDown()
      .moveDown()
      .text(`Loan ${documentContent.loan_code} has been approved by ${documentContent.lender_name} to ${documentContent.school_name} for ${documentContent.student_name}.`, 50, null, { align: `left` })
    generateWatermark(document)
    generateFooter(document)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generatePromissoryNote (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 })
    
    generateHeader(document)
    document
      .fontSize(15)
      .text(`PROMISSORY NOTE`)
      .moveDown()
      .fontSize(13)
      .text(`Loan: ${documentContent.loan_code}`, 50, null, { align: `left` })
      .text(`Student: ${documentContent.student_name}`, 50, null, { align: `left` })
      .text(`Lender: ${documentContent.lender_name}`)
      .text(`Principal Amount: ${documentContent.amount}`, 50, null, { align: `left` })
      .text(`Due Amount: ${documentContent.due_amount}`, 50, null, { align: `left` })
      .text(`Interest: ${documentContent.interest}`, 50, null, { align: `left` })
      .text(`Due Date: ${documentContent.due_date}`, 50, null, { align: `left` })
      .moveDown()
      .text(`For value received, I hereby certify that the information above and all information I provided during the application for this loan request is certified true, complete, and correct.`)
      .moveDown()
      .text(`I acknowledge that the amount mentioned above will be due and payable at the above date. In the event of default in payment, I acknowledge that the whole amount will become due and payable without notice and demandable immediately.`)
    generateWatermark(document)
    generateFooter(document)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfRelease (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 })
    
    generateHeader(document)
    document
      .fontSize(15)
      .text(`NOTICE OF RELEASE`)
      .moveDown()
      .fontSize(13)
      .text(`An amount of ${documentContent.amount} has been released by ${documentContent.lender_name} to ${documentContent.school_name}.`, 50, null, { align: `left` })
    generateWatermark(document)
    generateFooter(document)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfReceipt (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 })
    
    generateHeader(document)
    document
      .fontSize(15)
      .text(`NOTICE OF RECEIPT`)
      .moveDown()
      .fontSize(13)
      .text(`An amount of ${documentContent.amount} has been received by ${documentContent.school_name} from ${documentContent.lender_name}.`, 50, null, { align: `left` })
    generateWatermark(document)
    generateFooter(document)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfPayment (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 })
    
    generateHeader(document)
    document
      .fontSize(15)
      .text(`NOTICE OF PAYMENT`)
      .moveDown()
      .fontSize(13)
      .text(`An amount of ${documentContent.amount} has been paid by ${documentContent.student_name} to ${documentContent.lender_name} for loan ${documentContent.code}.`, 50, null, { align: `left` })
    generateWatermark(document)
    generateFooter(document)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfCancellation (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 })
    
    generateHeader(document)
    document
      .fontSize(15)
      .text(`NOTICE OF CANCELLATION`)
      .moveDown()
      .fontSize(13)
      .text(`Loan ${documentContent.code} has been cancelled.`, 50, null, { align: `left` })
    generateWatermark(document)
    generateFooter(document)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }

  async generateNoticeOfDenial (documentPath, documentContent) {
    let document = new PDFDocument({ size: 'A4', margin: 50 })
    
    generateHeader(document)
    document
      .fontSize(15)
      .text(`NOTICE OF DENIAL`)
      .moveDown()
      .fontSize(13)
      .text(`Loan ${documentContent.code} has been denied.`, 50, null, { align: `left` })
    generateWatermark(document)
    generateFooter(document)

    document.end()
    document.pipe(fs.createWriteStream(documentPath))
  }
}

function generateHeader(document) {
  document
    // .image(`image/logo.png`, 50, 45, { width: 50 })
    .fillColor(`#444444`)
    .fontSize(20)
    .text(`Educado`, 50, 45)
    .fontSize(10)
    .text(`0030 Dagohoy Street`, 200, 45, { align: `right` })
    .text(`Bacoor, Cavite`, 200, 60, { align: `right` })
    .moveDown()
}

function generateFooter(document) {
  document
    .fontSize(10)
    .text(
      "This document is digitally signed and protected using blockchain and IPFS. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    )
}

function generateWatermark(document) {
  document
    .image('logo.png', 130, 250, {
      fit: [350, 350],
      align: 'center',
      valign: 'center'
    })
}

  
module.exports = DocumentHelper
