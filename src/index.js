/*
function createOuterError(err, msg) {
    const e = new Error();
    e.stack = e.stack.split('\n').slice(3).filter(line => line.match(/\(.*(\\+|\/+).*\)/)).join('\n');
    e.message = msg;
    throw e;
}
*/

module.exports = (options, def) => {
    throw new Error('Not implemented yet!');

    def = def || {};
    if (options) {
        for (const a in options) {
        }
    } else {
        options = {};
    }
    // set defaults here:
    for (const a in def) {

    }
};
