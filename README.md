# assert-options

Safe and simple `options` handling, with one line of code:

* throw detailed error on any unknown option
* set default values for all missing options  

[![Build Status](https://travis-ci.org/vitaly-t/assert-options.svg?branch=master)](https://travis-ci.org/vitaly-t/assert-options)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/assert-options/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/assert-options?branch=master)

## Rationale

* Passing in invalid or misspelled option names is one of the most common errors.
* Assigning defaults is the most common operation for methods that take options.  

## Installation

```
$ npm install assert-options
```

## Usage

```js
const assert = require('assert-options');

const defaults = {
    first: 123,
    second: null,
    third: undefined
};

function functionWithOptions(options) {
    options = assert(options, defaults);
    
    // in most cases you will use defaults inline, like this:
    // options = assert(options, {first: 123, second: null, third: undefined});
    
    // options is a safe object here, with all missing defaults set.
}
```

And when default values are not needed, you can use an array of strings:

```js
function functionWithOptions(options) {
    options = assert(options, ['first', 'second', 'third']);
    
    // the result is exactly the same, as using this:
    // options = assert(options, {first: undefined, second: undefined, third: undefined});
    
    // options is a safe object here, without defaults.
}
```

In web browsers, global function `assertOptions` is available.

## API

* When `options` is `null`/`undefined`, it is assumed to be not used, returning a new `{}` on output,
with defaults set as specified.

* When `options` contains an unknown property, [TypeError] is thrown: `Option "name" is not supported.`

* When a property in `options` is missing or `undefined`, its value is set from the `defaults`,
but only when the latter is not `undefined`.

* When `options` is not `null`/`undefined`, it is expected to be of type `object`, or else [TypeError]
is thrown: `Invalid "options" parameter: value`.

* Parameter `defaults` must always be passed in, either as a non-null object or an array of strings,
or else [TypeError] is thrown: `Invalid "defaults" parameter: value`.

[TypeError]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
