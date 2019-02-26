# assert-options

Safe and simple one-line `options` handling:

* throw detailed error on any unknown option
* set default values for all missing options  

## Rationale

* Passing in invalid or misspelled option names is one of the most common errors.
* Specifying defaults is the most common operation for methods that take options.  

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
    
    // now can safely access options.first, etc.
}
```

Alternative syntax, when you do not need defaults:

```js
function functionWithOptions(options) {
    options = assert(options, ['first', 'second', 'third']);
}
```
