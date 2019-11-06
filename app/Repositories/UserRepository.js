'use strict'

const { ioc } = require('@adonisjs/fold')
const UserNotFoundException = use('App/Exceptions/UserNotFoundException')

class UserRepository {

  constructor (user) {
    this.user = user
  }

  async browse () {
    let users = await this.user.all()

    return users
  }

  async read (userId) {
    let user = await this.user.findBy('id', userId)

    if (user == null) {
      throw new UserNotFoundException()
    }

    return user
  }

  async edit (userDetails) {
  }

  async add (userDetails) {
    let user = new this.user

    user.username = userDetails.username
    user.password = userDetails.password
    user.type = userDetails.type

    await user.save()

    return user
  }

  async delete (userId) {
  }
}

ioc.bind ('App/Repositories/UserRepository', function (app) {
  return new UserRepository(app.use('App/Models/User'))
})

module.exports = ioc.use('App/Repositories/UserRepository')
