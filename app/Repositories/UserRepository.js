'use strict'

class UserRepository {

  constructor (user) {
    this.user = user
  }

  async browse () {
    let users = await this.user.all()

    return users
  }

  async read (userId) {
    let user = await this.user.findByOrFail('id', userId)

    return user
  }

  async readByUsername (username) {
    let user = await this.user.findByOrFail('username', username)

    return user
  }

  async edit (userId, userDetails) {
    let user = await this.user.findByOrFail('id', userId)

    user.username = userDetails.username
    user.password = userDetails.password
    user.type = userDetails.type

    await user.save()

    return user
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
    let user = await this.user.findByOrFail('id', userId)

    await user.delete()
  }
}

module.exports = UserRepository
