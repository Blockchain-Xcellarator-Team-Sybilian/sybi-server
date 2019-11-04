'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoanSchema extends Schema {
  up () {
    this.create('loans', (table) => {
      table.increments()
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.integer('school_id').unsigned().references('id').inTable('schools')
      table.integer('lender_id').unsigned().references('id').inTable('lenders')
      table.string('code', 80).notNullable()
      table.string('status', 80).notNullable()
      table.integer('amount').notNullable()
      table.datetime('requested_at').notNullable()
      table.datetime('released_at').notNullable()
      table.datetime('paid_at').notNullable()
      table.string('hash', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('loans')
  }
}

module.exports = LoanSchema
