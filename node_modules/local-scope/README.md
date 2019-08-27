# local-scope

[![NPM Version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
![Runs on Node][node-badge]
![Built with GNU Make][make-badge]
![Uses ECMAScript 2015][es-badge]

**This adapter uses ECMAScript 2015 (ES 6) syntax**: you must run at least Node.js v4 in order to use this adapter.

## About

This module allows for easy implementation of trully private object / class instance properties. It uses ES 2015's WeakMap to achieve true privacy without causing memory leaks.

## Usage

You start by generating a private scope manager. This ensures that no other module, even when using the same cached version of this module, can get access to your private data.

```js
const local = require('local-scope')() // <-- Notice the function call!
```

Alternatively, to make full use of ES2015 module syntax, you can create a new scope this way:

```js
// This will create your very own scope manager
import scope from 'local-scope/create'
```

Now you can use that `local` function to set and retrieve private data from your own functions!

```js
class Person {

  constructor (publicName, secretName) {
    // This is public
    this.publicName = publicName
    // This is private - it's not even saved to this instance!
    local(this).secretName = secretName
  }

  hasSecretName (name) {
    // Notice how you can retrieve the same private value
    // for this instance
    return local(this).secretName === name
  }
}

// And when used...
const bruce = new Person('Bruce Wayne', 'Batman')
    , clark = new Person('Clark Kent', 'Superman')

bruce.hasSecretName('Batman') // true!
clark.hasSecretName('Batman') // false!
```

**Important:** To access the private properties of an object, you need to have two things:

- A reference to the object
- A reference to the function to which you saved the private data

The scope manager always returns an object, so you can save whatever you need there, it just has to be saved into an object's property (you can name it whatever you like).

## License

This software is licensed under the **BSD-3-Clause License**. See the [LICENSE](LICENSE) file for more information.


[npm-badge]: https://img.shields.io/npm/v/local-scope.svg?style=flat-square
[npm-url]: https://npmjs.org/package/local-scope
[coveralls-badge]: https://img.shields.io/coveralls/Dreamscapes/local-scope.svg?style=flat-square
[travis-badge]: https://img.shields.io/travis/Dreamscapes/local-scope.svg?style=flat-square
[travis-url]: https://travis-ci.org/Dreamscapes/local-scope
[node-badge]: https://img.shields.io/node/v/local-scope.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/Dreamscapes/local-scope
[make-badge]: https://img.shields.io/badge/built%20with-GNU%20Make-brightgreen.svg?style=flat-square
[es-badge]: https://img.shields.io/badge/ECMA-2015-f0db4f.svg?style=flat-square
