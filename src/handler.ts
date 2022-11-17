/**
 * Protocol for handling options-related issues.
 */
import {IOptionsErrorContext, NamedValues, OptionsError} from './types';

export interface IOptionsErrorHandler {
    /**
     * This method is normally expected to throw an error, based on "err"
     */
    handle(err: OptionsError, ctx: IOptionsErrorContext): NamedValues;
}

/**
 * Default handler for options-related issues.
 */
export class DefaultErrorHandler implements IOptionsErrorHandler {
    handle(err: OptionsError, ctx: IOptionsErrorContext): NamedValues {
        switch (err) {
            case OptionsError.invalidOptionsParam:
                throw new TypeError(`Invalid "options" parameter: ${JSON.stringify(ctx.options)}`);
            case OptionsError.invalidDefaultsParam:
                throw new TypeError(`Invalid "defaults" parameter: ${JSON.stringify(ctx.defaults)}`);
            case OptionsError.optionNotRecognized:
                throw new Error(`Option "${ctx.key}" is not recognized.`);
            // istanbul ignore next:
            default:
                return ctx.options; // this will never happen
        }
    }
}
