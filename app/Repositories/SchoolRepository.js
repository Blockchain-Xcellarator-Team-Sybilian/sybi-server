'use strict'

class SchoolRepository {

  constructor (school, encryption) {
    this.school = school
    this.encryption = encryption
  }

  async browse () {
    let schools = await this.school.all()

    return schools
  }

  async read (schoolId) {
    let school = await this.school.findByOrFail('id', schoolId)

    return school
  }

  async edit (schoolId, schoolDetails) {
    let school = await this.school.findByOrFail('id', schoolId)

    school.name = schoolDetails.name
    school.phone_number = schoolDetails.phone_number
    school.email = schoolDetails.email
    school.address = schoolDetails.address
    school.bank_account_number = this.encryption.encrypt(schoolDetails.bank_account_number)

    await school.save()

    return school
  }

  async add (schoolDetails) {
    let school = new this.school

    school.user_id = schoolDetails.user_id
    school.name = schoolDetails.name
    school.phone_number = schoolDetails.phone_number
    school.email = schoolDetails.email
    school.address = schoolDetails.address
    school.bank_account_number = this.encryption.encrypt(schoolDetails.bank_account_number)

    await school.save()

    return school
  }

  async delete (schoolId) {
    let school = await this.school.findByOrFail('id', schoolId)

    await school.delete()
  }
}

module.exports = SchoolRepository
