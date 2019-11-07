'use strict'

class GuarantorRepository {

  constructor (guarantor) {
    this.guarantor = guarantor
  }

  async browse () {
    let guarantors = await this.guarantor.all()

    return guarantors
  }

  async read (guarantorId) {
    let guarantor = await this.guarantor.findByOrFail('id', guarantorId)

    return guarantor
  }

  async edit (guarantorId, guarantorDetails) {
    let guarantor = await this.guarantor.findByOrFail('id', guarantorId)

    guarantor.name = guarantorDetails.name
    guarantor.phone_number = guarantorDetails.phone_number
    guarantor.email = guarantorDetails.email
    guarantor.source_of_income = guarantorDetails.source_of_income
    guarantor.source_of_income_description = guarantorDetails.source_of_income_description
    guarantor.date_of_birth = guarantorDetails.date_of_birth
    guarantor.place_of_birth = guarantorDetails.place_of_birth
    guarantor.present_address = guarantorDetails.present_address
    guarantor.permanent_address = guarantorDetails.permanent_address

    await guarantor.save()

    return guarantor
  }

  async add (guarantorDetails) {
    let guarantor = new this.guarantor

    guarantor.student_id = guarantorDetails.student_id
    guarantor.name = guarantorDetails.name
    guarantor.phone_number = guarantorDetails.phone_number
    guarantor.email = guarantorDetails.email
    guarantor.source_of_income = guarantorDetails.source_of_income
    guarantor.source_of_income_description = guarantorDetails.source_of_income_description
    guarantor.date_of_birth = guarantorDetails.date_of_birth
    guarantor.place_of_birth = guarantorDetails.place_of_birth
    guarantor.present_address = guarantorDetails.present_address
    guarantor.permanent_address = guarantorDetails.permanent_address

    await guarantor.save()

    return guarantor
  }

  async delete (guarantorId) {
    let guarantor = await this.guarantor.findByOrFail('id', guarantorId)

    await guarantor.delete()
  }
}

module.exports = GuarantorRepository
