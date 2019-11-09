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

  // static formatDates (field, value) {
  //   if (field === 'applied_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }
  //   if (field === 'approved_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }
  //   if (field === 'accepted_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }
  //   if (field === 'confirmed_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }
  //   if (field === 'released_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }
  //   if (field === 'received_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }
  //   if (field === 'paid_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }
  //   if (field === 'due_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }
  //   if (field === 'cancelled_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }
  //   if (field === 'denied_at') {
  //     return value.format('YYYY-MM-DD HH HH:mm:ss')
  //   }

  //   return super.formatDates(field, value)
  // }
}

module.exports = Loan
