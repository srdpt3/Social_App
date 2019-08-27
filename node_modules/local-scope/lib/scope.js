/**
 * local-scope
 *
 * @author     Robert Rossmann <rr.rossmann@me.com>
 * @copyright  2015 Robert Rossmann
 * @license    http://choosealicense.com/licenses/bsd-3-clause  BSD-3-Clause License
 */

'use strict'


/**
 * Local scope generator
 *
 * Use this function to generate a private scope manager function.
 *
 * Without this, anyone who would require the same version of this module would gain access to your
 * private data if they also have access to your objects' instances.
 *
 * @function  localscope
 * @return    {Function}       A function which can be used to manage scopes
 */
module.exports = function localscope() {
  const map = new WeakMap()

  // Allow binding or .call-ing this function on an object so that the key will be passed via `this`
  // This allows using the new function bind syntax - obj::local() 😎
  return function scope(key) {
    return manager(map, key || this)
  }
}

/**
 * Local scope manager
 *
 * Use this function to assign private properties related to your objects / class instances.
 *
 * @param   {WeakMap} map     The WeakMap to which the private scope objects should be saved.
 *                            You should not provide this parameter - it is bound automatically for
 *                            you. Just use the key below.
 * @param   {Object}  key     The key with which to associate this scope
 * @return  {Object}          Object which can be used to assign properties to
 */
function manager(map, key) {
  if (!(key instanceof Object)) {
    throw new TypeError('Key must be an object')
  }

  let contents = map.get(key)

  if (!contents) {
    map.set(key, contents = {})
  }

  return contents
}
