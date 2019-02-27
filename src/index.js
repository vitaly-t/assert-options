(function (window) {
    'use strict';

    function assertOptions(options, def) {
        def = (def && typeof def === 'object') ? def : {};
        const isArray = Array.isArray(def);
        if (options) {
            options = typeof options === 'object' ? options : {};
            for (const a in options) {
                if ((isArray && def.indexOf(a) === -1) || (!isArray && !(a in def))) {
                    throw new TypeError('Option "' + a + '" is not supported.');
                }
            }
        } else {
            options = {};
        }
        if (!isArray) {
            for (const b in def) {
                if (!(b in options)) {
                    options[b] = def[b];
                }
            }
        }
        return options;
    }

    /* istanbul ignore else */
    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        module.exports = assertOptions;
    } else {
        window.assertOptions = assertOptions;
    }
})(this);
