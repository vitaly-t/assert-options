/*
* Options parser
*
*
* */

const def = {
    /* all properties, with default values */
};

function assertOptions(options, def) {
    /*
    * - Assert any option that's not recognized.
    * - Set all default option values.
    * */
    if (options) {
        for (const a in options) {
        }
    } else {
        options = {};
    }

    createOuterError('CustomError', 'my error message');
    //throw new TypeError('Invalid option!');
}

function createOuterError(err, msg) {
    const e = new Error();
    e.stack = e.stack.split('\n').slice(3).filter(line => line.match(/\(.*(\\+|\/+).*\)/)).join('\n');
    e.message = msg;
    throw e;
}

function testApp() {
    assertOptions();
}

testApp();
