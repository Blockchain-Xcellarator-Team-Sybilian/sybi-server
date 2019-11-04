'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      username: model.username,
      type: model.type,
      created_at: model.created_at,
      updated_at: model.updated_at
    }
  }
}

module.exports = UserTransformer
