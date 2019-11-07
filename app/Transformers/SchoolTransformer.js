'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * SchoolTransformer class
 *
 * @class SchoolTransformer
 * @constructor
 */
class SchoolTransformer extends BumblebeeTransformer {
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
      address: model.address,
      created_at: model.created_at,
      updated_at: model.updated_at
    }
  }
}

module.exports = SchoolTransformer
