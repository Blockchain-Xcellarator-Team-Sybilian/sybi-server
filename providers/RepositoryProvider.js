'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const UserRepository = require('../app/Repositories/UserRepository')
const SchoolRepository = require('../app/Repositories/SchoolRepository')
const LenderRepository = require('../app/Repositories/LenderRepository')
const StudentRepository = require('../app/Repositories/StudentRepository')
const GuarantorRepository = require('../app/Repositories/GuarantorRepository')

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
      return new SchoolRepository(use('App/Models/School'))
    }),
    this.app.bind('App/Repositories/LenderRepository', () => {
      return new LenderRepository(use('App/Models/Lender'))
    }),
    this.app.bind('App/Repositories/StudentRepository', () => {
      return new StudentRepository(use('App/Models/Student'))
    }),
    this.app.bind('App/Repositories/GuarantorRepository', () => {
      return new GuarantorRepository(use('App/Models/Guarantor'))
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
