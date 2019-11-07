'use strict'

class StudentRepository {

  constructor (student) {
    this.student = student
  }

  async browse () {
    let students = await this.student.all()

    return students
  }

  async read (studentId) {
    let student = await this.student.findByOrFail('id', studentId)

    return student
  }

  async edit (studentId, studentDetails) {
    let student = await this.student.findByOrFail('id', studentId)

    student.name = studentDetails.name
    student.phone_number = studentDetails.phone_number
    student.email = studentDetails.email
    student.source_of_funds = studentDetails.source_of_funds
    student.source_of_funds_description = studentDetails.source_of_funds_description
    student.student_number = studentDetails.student_number
    student.date_of_birth = studentDetails.date_of_birth
    student.place_of_birth = studentDetails.place_of_birth
    student.present_address = studentDetails.present_address
    student.permanent_address = studentDetails.permanent_address

    await student.save()

    return student
  }

  async add (studentDetails) {
    let student = new this.student

    student.user_id = studentDetails.user_id
    student.school_id = studentDetails.school_id
    student.name = studentDetails.name
    student.phone_number = studentDetails.phone_number
    student.email = studentDetails.email
    student.source_of_funds = studentDetails.source_of_funds
    student.source_of_funds_description = studentDetails.source_of_funds_description
    student.student_number = studentDetails.student_number
    student.date_of_birth = studentDetails.date_of_birth
    student.place_of_birth = studentDetails.place_of_birth
    student.present_address = studentDetails.present_address
    student.permanent_address = studentDetails.permanent_address

    await student.save()

    return student
  }

  async delete (studentId) {
    let student = await this.student.findByOrFail('id', studentId)

    await student.delete()
  }
}

module.exports = StudentRepository
