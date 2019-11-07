'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuarantorSchema extends Schema {
  up () {
    this.create('guarantors', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.string('name', 80).notNullable()
      table.integer('phone_number').notNullable()
      table.string('email', 80).notNullable()
      table.integer('bank_account_number').notNullable()
      table.string('source_of_income').notNullable()
      table.string('source_of_income_description', 80).nullable()
      table.datetime('date_of_birth').notNullable()
      table.string('place_of_birth', 80).notNullable()
      table.string('present_address', 80).notNullable()
      table.string('permanent_address', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('guarantors')
  }
}

module.exports = GuarantorSchema
