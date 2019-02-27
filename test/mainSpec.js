'use strict';

const assert = require('../src');

describe('positive', () => {

    it('must return the same object when empty', () => {
        const obj = {};
        expect(assert(obj, [])).toBe(obj);
        expect(assert(obj, {})).toBe(obj);
    });

    it('must provide normal default values', () => {
        expect(assert({}, {one: 1})).toEqual({one: 1});
        expect(assert(null, {one: 1})).toEqual({one: 1});
        expect(assert({one: 1}, {one: 111, two: 222})).toEqual({one: 1, two: 222});
    });

    it('must set defaults for undefined option values', () => {
        expect(assert({one: undefined, two: undefined}, {one: 111, two: 222})).toEqual({one: 111, two: 222});
    });

    it('must not set undefined as default values', () => {
        expect(assert({one: 1}, {one: 111, two: undefined})).toEqual({one: 1});
    });

    it('must not set defaults for arrays', () => {
        expect(assert(null, [])).toEqual({});
        expect(assert(null, ['one'])).toEqual({});
    });

});

describe('negative', () => {

    const invalidOptions = 'Invalid "options" parameter.';
    const invalidDefaults = 'Invalid "defaults" parameter.';

    it('must throw on invalid options', () => {
        expect(() => {
            assert(0);
        }).toThrow(invalidOptions);
        expect(() => {
            assert(123);
        }).toThrow(invalidOptions);
        expect(() => {
            assert('');
        }).toThrow(invalidOptions);
        expect(() => {
            assert('1');
        }).toThrow(invalidOptions);
    });

    it('must throw on invalid defaults', () => {
        expect(() => {
            assert();
        }).toThrow(invalidDefaults);
        expect(() => {
            assert(null);
        }).toThrow(invalidDefaults);
        expect(() => {
            assert({});
        }).toThrow(invalidDefaults);
        expect(() => {
            assert({}, 0);
        }).toThrow(invalidDefaults);
        expect(() => {
            assert({}, 123);
        }).toThrow(invalidDefaults);
        expect(() => {
            assert({}, '');
        }).toThrow(invalidDefaults);
        expect(() => {
            assert({}, '1');
        }).toThrow(invalidDefaults);
    });

    it('must throw on unknown properties', () => {
        expect(() => {
            assert({one: 1}, []);
        }).toThrow('Option "one" is not supported.');

        expect(() => {
            assert({one: 1}, {});
        }).toThrow('Option "one" is not supported.');

        expect(() => {
            assert({one: 1, two: 2}, ['one']);
        }).toThrow('Option "two" is not supported.');
    });
});
