'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Loan extends Model {
  student () {
    return this.belongsTo('App/Models/Student')
  }
  
  lender () {
    return this.belongsTo('App/Models/Lender')
  }

  documents () {
    return this.hasMany('App/Models/Document')
  }
}

module.exports = Loan
