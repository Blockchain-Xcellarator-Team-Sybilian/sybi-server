'use strict'

const { test, trait } = use('Test/Suite')('Home')

trait('Test/ApiClient')

test('get application name and version', async ({ client }) => {
  const response = await client.get('/').end()

  response.assertStatus(200)
})
