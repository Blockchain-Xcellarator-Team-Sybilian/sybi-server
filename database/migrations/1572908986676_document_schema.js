'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentSchema extends Schema {
  up () {
    this.create('documents', (table) => {
      table.increments()
      table.integer('loan_id').unsigned().references('id').inTable('loans')
      table.string('name', 80).notNullable()
      table.string('comment', 80).nullable()
      table.string('path', 80).notNullable()
      table.string('checksum', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('documents')
  }
}

module.exports = DocumentSchema
