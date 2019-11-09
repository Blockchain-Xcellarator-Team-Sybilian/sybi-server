'use strict'

class LoanRepository {

  constructor (loan, generator) {
    this.loan = loan
    this.generator = generator
  }

  async browse () {
    let loans = await this.loan.all()

    return loans
  }

  async read (loanId) {
    let loan = await this.loan.findByOrFail('id', loanId)

    return loan
  }

  async apply (loanDetails) {
    let loan = new this.loan

    loan.student_id = loanDetails.student_id
    loan.description = loanDetails.description
    loan.code = await this.generator.code(9)
    loan.status = 'APPLIED'
    loan.amount = loanDetails.amount
    loan.applied_at = new Date().toISOString().slice(0, 10)

    await loan.save()

    return loan
  }

  async approve (loanDetails) {
    let loan = await this.loan.findByOrFail('id', loanDetails.loan_id)

    loan.approved_at = new Date().toISOString().slice(0, 10)
    loan.status = 'APPROVED'

    await loan.save()

    return loan
  }

  async accept (loanDetails) {
    let loan = await this.loan.findByOrFail('id', loanDetails.loan_id)

    loan.lender_id = loanDetails.lender_id
    loan.due_amount = loanDetails.due_amount
    loan.due_at = loanDetails.due_at
    loan.accepted_at = new Date().toISOString().slice(0, 10)
    loan.status = 'ACCEPTED'

    await loan.save()

    return loan
  }

  async confirm (loanDetails) {
    let loan = await this.loan.findByOrFail('id', loanDetails.loan_id)

    loan.confirmed_at = new Date().toISOString().slice(0, 10)
    loan.status = 'CONFIRMED'

    await loan.save()

    return loan
  }

  async release (loanDetails) {
    let loan = await this.loan.findByOrFail('id', loanDetails.loan_id)

    loan.released_at = new Date().toISOString().slice(0, 10)
    loan.status = 'RELEASED'

    await loan.save()

    return loan
  }

  async receive (loanDetails) {
    let loan = await this.loan.findByOrFail('id', loanDetails.loan_id)

    loan.received_at = new Date().toISOString().slice(0, 10)
    loan.status = 'RECEIVED'

    await loan.save()

    return loan
  }

  async pay (loanDetails) {
    let loan = await this.loan.findByOrFail('id', loanDetails.loan_id)

    loan.paid_at = new Date().toISOString().slice(0, 10)
    loan.status = 'PAID'

    await loan.save()

    return loan
  }

  async checkExistingLoanCount (loanDetails) {
    let existingLoanCount = await this.loan.query()
      .where('student_id', loanDetails.student_id)
      .where('paid_at', null)
      .getCount()

    return existingLoanCount
  }
}

module.exports = LoanRepository
