'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * LenderTransformer class
 *
 * @class LenderTransformer
 * @constructor
 */
class LenderTransformer extends BumblebeeTransformer {
  static get defaultInclude () {
    return [
      'user'
    ]
  }

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      user_id: model.user_id,
      name: model.name,
      phone_number: model.phone_number,
      email: model.email,
      bank_account_number: model.bank_account_number,
      address: model.address,
      created_at: model.created_at,
      updated_at: model.updated_at
    }
  }

  includeUser (model) {
    return this.item(model.getRelated('user'), 'UserTransformer')
  }
}

module.exports = LenderTransformer
