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

class GuarantorSeeder {
  async run () {
    await Factory.model('App/Models/Guarantor').create({ student_id: 1 })
  }
}

module.exports = GuarantorSeeder
