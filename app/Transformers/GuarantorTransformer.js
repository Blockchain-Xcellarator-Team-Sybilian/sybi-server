'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * GuarantorTransformer class
 *
 * @class GuarantorTransformer
 * @constructor
 */
class GuarantorTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      student_id: model.student_id,
      name: model.name,
      phone_number: model.phone_number,
      email: model.email,
      bank_account_number: model.bank_account_number,
      source_of_income: model.source_of_income,
      source_of_income_description: model.source_of_income_description,
      date_of_birth: model.date_of_birth,
      place_of_birth: model.place_of_birth,
      present_address: model.present_address,
      permanent_address: model.permanent_address,
      created_at: model.created_at,
      updated_at: model.updated_at
    }
  }
}

module.exports = GuarantorTransformer
