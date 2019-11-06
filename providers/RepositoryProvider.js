'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const UserRepository = require('../App/Repositories/UserRepository')

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
