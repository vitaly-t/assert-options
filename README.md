# assert-options

Safe and simple `options` handling, with one line of code:

* throw detailed error on any unknown option
* set default values for all missing options  

[![Build Status](https://travis-ci.org/vitaly-t/assert-options.svg?branch=master)](https://travis-ci.org/vitaly-t/assert-options)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/assert-options/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/assert-options?branch=master)

## Rationale

* Passing in invalid or misspelled option names is one of the most common errors.
* Assigning defaults is the most common operation for methods that take options.  

This module automates proper options parsing and setting defaults where needed.

## Installation

```
$ npm install assert-options
```

## Usage

```js
const assertOptions = require('assert-options');

const defaults = {
    first: 123,
    second: null,
    third: undefined
};

function functionWithOptions(options) {
    options = assertOptions(options, defaults);
    
    // in most cases you will use defaults inline, like this:
    // options = assertOptions(options, {first: 123, second: null, third: undefined});
    
    // options is a safe object here, with all missing defaults set.
}
```

And when default values are not needed, you can use an array of strings:

```js
function functionWithOptions(options) {
    options = assertOptions(options, ['first', 'second', 'third']);
    
    // the result is exactly the same as using this:
    // options = assertOptions(options, {first: undefined, second: undefined, third: undefined});
    
    // options is a safe object here, without defaults.
}
```

Including `src/index.js` in a browser, makes function `assertOptions` available globally.

## API

* When `options` is `null`/`undefined`, new `{}` is returned, applying `defaults` as specified.

* When `options` contains an unknown property, [TypeError] is thrown: `Option "name" is not supported.`

* When a property in `options` is missing or `undefined`, its value is set from the `defaults`,
provided it is available and not `undefined`.

* When `options` is not `null`/`undefined`, it must be of type `object`, or else [TypeError] is thrown:
`Invalid "options" parameter: value`.

* Parameter `defaults` is required, as a non-`null` object or an array of strings, or else [TypeError]
is thrown: `Invalid "defaults" parameter: value`.

[TypeError]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
