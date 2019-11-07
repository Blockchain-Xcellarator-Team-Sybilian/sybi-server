'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SchoolSchema extends Schema {
  up () {
    this.create('schools', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 80).notNullable()
      table.integer('phone_number').notNullable()
      table.string('email', 80).notNullable()
      table.integer('bank_account_number', 60).notNullable()
      table.string('address', 80).notNullable()
      table.string('hash', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('schools')
  }
}

module.exports = SchoolSchema
