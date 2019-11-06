'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const ResponseHelper = require('../app/Helpers/ResponseHelper')

class HelperProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.bind('App/Helpers/ResponseHelper', () => {
      return new ResponseHelper()
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

module.exports = HelperProvider
