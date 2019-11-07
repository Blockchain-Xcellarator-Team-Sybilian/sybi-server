'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  static get defaultInclude () {
    return [
      'school',
      'lender',
      'student'
    ]
  }

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

  includeSchool (model) {
    return this.item(model.getRelated('school'), 'SchoolTransformer')
  }

  includeLender (model) {
    return this.item(model.getRelated('lender'), 'LenderTransformer')
  }

  includeStudent (model) {
    return this.item(model.getRelated('student'), 'StudentTransformer')
  }
}

module.exports = UserTransformer
