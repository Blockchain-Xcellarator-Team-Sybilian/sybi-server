'use strict'

class LenderRepository {

  constructor (lender) {
    this.lender = lender
  }

  async browse () {
    let lenders = await this.lender.all()

    return lenders
  }

  async read (lenderId) {
    let lender = await this.lender.findByOrFail('id', lenderId)

    return lender
  }

  async edit (lenderId, lenderDetails) {
    let lender = await this.lender.findByOrFail('id', lenderId)

    lender.name = lenderDetails.name
    lender.phone_number = lenderDetails.phone_number
    lender.email = lenderDetails.email
    lender.address = lenderDetails.address
    lender.bank_account_number = lenderDetails.bank_account_number

    await lender.save()

    return lender
  }

  async add (lenderDetails) {
    let lender = new this.lender

    lender.user_id = lenderDetails.user_id
    lender.name = lenderDetails.name
    lender.phone_number = lenderDetails.phone_number
    lender.email = lenderDetails.email
    lender.address = lenderDetails.address
    school.bank_account_number = schoolDetails.bank_account_number

    await lender.save()

    return lender
  }

  async delete (lenderId) {
    let lender = await this.lender.findByOrFail('id', lenderId)

    await lender.delete()
  }
}

module.exports = LenderRepository
