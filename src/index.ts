export type NamedValues = { [name: string]: any };

export function assertOptions(options: NamedValues | null | undefined, defaults: NamedValues | string[]): NamedValues {
    if (options !== null && options !== undefined && typeof options !== 'object') {
        throw new TypeError('Invalid "options" parameter: ' + JSON.stringify(options));
    }
    const isArray = Array.isArray(defaults);
    if (!isArray && (!defaults || typeof defaults !== 'object')) {
        throw new TypeError('Invalid "defaults" parameter: ' + JSON.stringify(defaults));
    }
    if (options) {
        for (const a of Object.keys(options)) {
            if ((isArray && defaults.indexOf(a) === -1) || (!isArray && !(a in defaults))) {
                throw new Error('Option "' + a + '" is not recognized.');
            }
        }
    } else {
        options = {};
    }
    if (!isArray) {
        const defs = <NamedValues>defaults;
        for (const d of Object.keys(defs)) {
            if (options[d] === undefined && defs[d] !== undefined) {
                options[d] = defs[d];
            }
        }
    }
    return options;
}
