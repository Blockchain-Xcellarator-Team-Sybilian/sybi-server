'use strict'

class SchoolRepository {

  constructor (school, hash) {
    this.school = school
    this.hash = hash
  }

  async browse () {
    // let users = await this.user.all()

    // return users
  }

  async read (userId) {
    // let user = await this.user.findByOrFail('id', userId)

    // return user
  }

  async edit (userId, userDetails) {
    // let user = await this.user.findByOrFail('id', userId)

    // user.username = userDetails.username
    // user.password = userDetails.password
    // user.type = userDetails.type

    // await user.save()

    // return user
  }

  async add (schoolDetails) {
    let school = new this.school

    school.user_id = schoolDetails.user_id
    school.name = schoolDetails.name
    school.phone_number = schoolDetails.phone_number
    school.email = schoolDetails.email
    school.bank_account_number = schoolDetails.bank_account_number
    school.address = schoolDetails.address

    await school.save()

    return school
  }

  async delete (userId) {
    // let user = await this.user.findByOrFail('id', userId)

    // await user.delete()
  }
}

module.exports = SchoolRepository
