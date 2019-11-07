'use strict'

/*
|--------------------------------------------------------------------------
| LenderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class LenderSeeder {
  async run () {
    await Factory.model('App/Models/Lender').create({ user_id: 3 })
  }
}

module.exports = LenderSeeder
