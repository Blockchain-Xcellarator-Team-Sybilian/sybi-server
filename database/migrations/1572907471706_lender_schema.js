'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LenderSchema extends Schema {
  up () {
    this.create('lenders', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 80).notNullable()
      table.integer('phone_number').notNullable()
      table.string('email', 80).notNullable()
      table.string('address', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('lenders')
  }
}

module.exports = LenderSchema
