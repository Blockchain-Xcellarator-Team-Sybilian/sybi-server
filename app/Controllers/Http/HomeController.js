'use strict'

const Config = use('Config')
const ServerErrorException = use('App/Exceptions/ServerErrorException')

class HomeController {
  async index () {
    try {
      return {
        name: Config.get('app.name'),
        version: Config.get('app.version')
      }
    } catch (exception) {
      throw new ServerErrorException
    }
  }
}

module.exports = HomeController
