'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    username: data.username,
    password: data.password
  }
})

Factory.blueprint('App/Models/Student', async (faker, i, data) => {
  return {
    user_id: data.user_id,
    school_id: data.school_id,
    name: faker.name(),
    phone_number: faker.phone(),
    email: faker.email(),
    source_of_funds: faker.word(),
    source_of_funds_description: faker.sentence(),
    student_number: faker.natural({ min: 111111111, max: 999999999 }),
    date_of_birth: faker.date({string: true}),
    place_of_birth: faker.address(),
    present_address: faker.address(),
    permanent_address: faker.address()
  }
})

Factory.blueprint('App/Models/Guarantor', async (faker, i, data) => {
  return {
    student_id: data.student_id,
    name: faker.name(),
    phone_number: faker.phone(),
    email: faker.email(),
    source_of_income: faker.word(),
    source_of_income_description: faker.sentence(),
    date_of_birth: faker.date({string: true}),
    place_of_birth: faker.address(),
    present_address: faker.address(),
    permanent_address: faker.address()
  }
})

Factory.blueprint('App/Models/School', async (faker, i, data) => {
  return {
    user_id: data.user_id,
    name: faker.name(),
    phone_number: faker.phone(),
    email: faker.email(),
    address: faker.address()
  }
})

Factory.blueprint('App/Models/Lender', async (faker, i, data) => {
  return {
    user_id: data.user_id,
    name: faker.name(),
    phone_number: faker.phone(),
    email: faker.email(),
    address: faker.address()
  }
})
