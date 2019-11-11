'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const ResponseHelper = require('../app/Helpers/ResponseHelper')
const GeneratorHelper = require('../app/Helpers/GeneratorHelper')
const DocumentHelper = require('../app/Helpers/DocumentHelper')

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
    }),
    this.app.bind('App/Helpers/GeneratorHelper', () => {
      return new GeneratorHelper()
    }),
    this.app.bind('App/Helpers/DocumentHelper', () => {
      return new DocumentHelper(use('GeneratorHelper'))
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
