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

  async verify (loanDetails) {
    let loan = await this.loan.findByOrFail('id', loanDetails.loan_id)

    loan.verified_at = new Date().toISOString().slice(0, 10)
    loan.status = 'VERIFIED'

    await loan.save()

    return loan
  }

  async approve (loanDetails) {
    let loan = await this.loan.findByOrFail('id', loanDetails.loan_id)

    loan.due_amount = loanDetails.due_amount
    loan.due_at = loanDetails.due_at
    loan.approved_at = new Date().toISOString().slice(0, 10)
    loan.status = 'APPROVED'

    await loan.save()

    return loan
  }

  async checkExistingLoan (loanDetails) {
    let existingLoan = await this.loan.query()
      .where('student_id', loanDetails.student_id)
      .where('paid_at', null)
      .getCount()

    return existingLoan
  }
}

module.exports = LoanRepository
