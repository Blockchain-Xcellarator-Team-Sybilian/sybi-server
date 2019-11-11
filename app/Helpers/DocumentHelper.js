'use strict'

const PDF = use('PDF')
const fs = require('fs');
const Helpers = use('Helpers')

class DocumentHelper {
  constructor (generator) {
    this.generator = generator
  }

  async generatePDF (loanCode) {
    const documentName = await this.generator.code(6) + '.pdf'
    const documentDirectory = Helpers.tmpPath('loans/') + loanCode + '/PDF/'
    
    const content = [
      { text: 'test' }
    ]
    const stream = await fs.createWriteStream(documentDirectory + documentName)

    await PDF.create(content, stream)
  }
}
  
module.exports = DocumentHelper
