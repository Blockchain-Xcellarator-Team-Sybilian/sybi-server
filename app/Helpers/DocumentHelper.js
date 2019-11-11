'use strict'

const fs = require('fs');
const Helpers = use('Helpers')
const PDFDocument = require('pdfkit')

class DocumentHelper {
  constructor (generator) {
    this.generator = generator
  }

  async generatePDF (loanCode, content) {
    const document = new PDFDocument;
    const documentName = await this.generator.code(6) + '.pdf'
    const documentDirectory = Helpers.tmpPath('loans/') + loanCode + '/PDF/'
    
    document.pipe(fs.createWriteStream(documentDirectory + documentName))
    document.fontSize(8)
    document.text(content, {
      width: 410,
      align: 'left'
    })
    document.end()
  }
}
  
module.exports = DocumentHelper
