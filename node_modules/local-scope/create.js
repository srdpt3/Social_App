'use strict'

const scope = require('.')

Object.defineProperty(module, 'exports', {
  configurable: true,
  enumerable: true,
  get: () => scope(),
})
