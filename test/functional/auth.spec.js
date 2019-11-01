'use strict'

const { test, trait } = use('Test/Suite')('Auth')

trait('Test/ApiClient')

test('should be able to register user', async ({ client }) => {
  const response = await client
    .post('/auth/register')
    .send({
      username: 'username',
      password: 'password'
    })
    .end()

  response.assertStatus(200)
})
