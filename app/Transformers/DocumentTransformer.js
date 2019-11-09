'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * DocumentTransformer class
 *
 * @class DocumentTransformer
 * @constructor
 */
class DocumentTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      loan_id: model.loan_id,
      name: model.name,      
      comment: model.comment,
      created_at: model.created_at,
      updated_at: model.updated_at
    }
  }
}

module.exports = DocumentTransformer
