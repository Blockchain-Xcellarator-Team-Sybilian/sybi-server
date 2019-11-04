'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoanTransactionSchema extends Schema {
  up () {
    this.create('loan_transactions', (table) => {
      table.increments()
      table.integer('loan_id').unsigned().references('id').inTable('loans')
      table.string('loan_hash', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('loan_transactions')
  }
}

module.exports = LoanTransactionSchema
