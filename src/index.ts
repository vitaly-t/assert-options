import {assertType, DefaultErrorHandler, IOptionsErrorHandler, NamedValues, OptionsError} from './handler';

export function configAssert(errHandler: IOptionsErrorHandler): assertType {

    return function (options: NamedValues | null | undefined, defaults: NamedValues | string[]): NamedValues {
        if (options !== null && options !== undefined && typeof options !== 'object') {
            return errHandler.handle(OptionsError.invalidOptionsParam, {options, defaults});
        }
        const isArray = Array.isArray(defaults);
        if (!isArray && (!defaults || typeof defaults !== 'object')) {
            return errHandler.handle(OptionsError.invalidDefaultsParam, {options, defaults});
        }
        if (options) {
            for (const key of Object.keys(options)) {
                if ((isArray && defaults.indexOf(key) === -1) || (!isArray && !(key in defaults))) {
                    return errHandler.handle(OptionsError.optionNotRecognized, {options, defaults, key});
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
    };
}

export const assertOptions: assertType = configAssert(new DefaultErrorHandler());
