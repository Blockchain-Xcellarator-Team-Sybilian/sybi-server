'use strict'

const { ioc } = require('@adonisjs/fold')

class UserRepository {

  constructor (user) {
    this.user = user
  }

  async browse () {
    let users = await this.user.all()

    return users
  }

  async read (requestBody) {
    let user = await this.user.findBy('username', requestBody.username)

    return user
  }

  async edit (requestBody) {
  }

  async add (requestBody) {
    let user = new this.user

    user.username = requestBody.username
    user.password = requestBody.password
    user.type = requestBody.type

    await user.save()

    return user
  }

  async delete (requestBody) {
  }
}

ioc.bind ('App/Repositories/UserRepository', function (app) {
  return new UserRepository(app.use('App/Models/User'))
})

module.exports = ioc.use('App/Repositories/UserRepository')
