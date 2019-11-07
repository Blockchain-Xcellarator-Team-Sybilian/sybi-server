'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('school_id').unsigned().references('id').inTable('schools')
      table.string('name', 80).notNullable()
      table.integer('student_number').notNullable()
      table.integer('phone_number').notNullable()
      table.string('email', 80).notNullable()
      table.integer('bank_account_number').notNullable()
      table.string('source_of_funds').notNullable()
      table.string('source_of_funds_description', 80).notNullable()
      table.datetime('date_of_birth').notNullable()
      table.string('place_of_birth', 80).notNullable()
      table.string('present_address', 80).notNullable()
      table.string('permanent_address', 80).notNullable()
      table.string('hash', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema
