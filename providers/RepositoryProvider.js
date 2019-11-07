'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const UserRepository = require('../app/Repositories/UserRepository')
const SchoolRepository = require('../app/Repositories/SchoolRepository')

class RepositoryProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.bind('App/Repositories/UserRepository', () => {
      return new UserRepository(use('App/Models/User'))
    }),
    this.app.bind('App/Repositories/SchoolRepository', () => {
      return new SchoolRepository(use('App/Models/School'), use('Hash'))
    })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    //
  }
}

module.exports = RepositoryProvider
