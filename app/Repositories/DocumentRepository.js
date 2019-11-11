'use strict'

class DocumentRepository {

  constructor (document) {
    this.document = document
  }

  async browse () {
    let documents = await this.document.all()

    return documents
  }

  async read (documentId) {
    let document = await this.loan.findByOrFail('id', documentId)

    return document
  }

  async add (documentDetails) {
    let document = new this.document

    document.loan_id = documentDetails.loan_id
    document.name = documentDetails.name
    document.type = documentDetails.type
    document.comment = documentDetails.comment
    document.path = documentDetails.path
    document.checksum = documentDetails.checksum

    await document.save()

    return document
  }

  async checkExistingDocumentCount (documentChecksum) {
    let existingDocumentCount = await this.document.query()
      .where('checksum', documentChecksum)
      .getCount()

    return existingDocumentCount
  }
}

module.exports = DocumentRepository
