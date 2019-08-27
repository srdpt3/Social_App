'use strict'

const expect = require('chai').expect

describe('local-scope/create', () => {
  it('always returns a different scope instance', () => {
    /* eslint-disable global-require */
    const scope1 = require('../create')
    const scope2 = require('../create')
    /* eslint-enable global-require */
    const key = {}

    expect(scope1(key)).to.not.equal(scope2(key))
  })
})
