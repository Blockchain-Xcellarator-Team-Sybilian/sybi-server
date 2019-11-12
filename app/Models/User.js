'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', 'UserHook.hashPassword')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  school () {
    return this.hasOne('App/Models/School')
  }

  lender () {
    return this.hasOne('App/Models/Lender')
  }

  student () {
    return this.hasOne('App/Models/Student')
  }
  
  static get hidden () {
    return ['password']
  }
}

module.exports = User
