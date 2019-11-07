'use strict'

/*
|--------------------------------------------------------------------------
| StudentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class StudentSeeder {
  async run () {
    await Factory.model('App/Models/Student').create({ user_id: 1, school_id: 1 })
  }
}

module.exports = StudentSeeder
