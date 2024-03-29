/**
 * All errors that can occur inside an assert function.
 */
export enum OptionsError {
    invalidOptionsParam,
    invalidDefaultsParam,
    optionNotRecognized
}

/**
 * Error-related context available for options-related issues.
 */
export interface IOptionsErrorContext {
    options: any;
    defaults: any;
    key?: string;
}

/**
 * Standard syntax for named values.
 */
export type NamedValues = { [name: string]: any };

/**
 * Assert function signature.
 */
export type AssertFunc = (options: NamedValues | null | undefined, defaults: NamedValues | string[]) => NamedValues;
