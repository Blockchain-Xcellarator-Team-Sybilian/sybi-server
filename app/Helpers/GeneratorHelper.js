'use strict'

const crypto = use('crypto')
const sha256 = require('sha256-file')

class GeneratorHelper {
  async code (length) {
    let string = ''
    let len = string.length

    if (len < length) {
      let size = length - len
      let bytes = await crypto.randomBytes(size)
      let buffer = new Buffer(bytes)

      string += buffer
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .substr(0, size)
    }

    return string
  }

  async sha256 (path) {
    return sha256(path)
  }
}
  
module.exports = GeneratorHelper
