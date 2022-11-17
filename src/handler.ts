export enum OptionsError {
    invalidOptionsParam,
    invalidDefaultsParam,
    optionNotRecognized
}

export interface IErrorContext {
    options: any;
    defaults: any;
    key?: string;
}

export type assertType = (options: NamedValues | null | undefined, defaults: NamedValues | string[]) => NamedValues;

export type NamedValues = { [name: string]: any };

export interface IOptionsErrorHandler {
    handle(err: OptionsError, ctx: IErrorContext): NamedValues;
}

export class EmptyErrorHandler implements IOptionsErrorHandler {
    handle(err: OptionsError, ctx: IErrorContext): NamedValues {
        return ctx.options;
    }
}

export class DefaultErrorHandler implements IOptionsErrorHandler {
    handle(err: OptionsError, ctx: IErrorContext): NamedValues {
        switch (err) {
            case OptionsError.invalidOptionsParam:
                throw new TypeError(`Invalid "options" parameter: ${JSON.stringify(ctx.options)}`);
            case OptionsError.invalidDefaultsParam:
                throw new TypeError(`Invalid "defaults" parameter: ${JSON.stringify(ctx.defaults)}`);
            case OptionsError.optionNotRecognized:
                throw new Error(`Option "${ctx.key}" is not recognized.`);
            default:
                break;
        }
        return ctx.options; // this should never happen;
    }
}
