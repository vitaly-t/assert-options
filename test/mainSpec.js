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
        expect(assert({}, ['one'])).toEqual({});
    });

});

describe('negative', () => {

    it('must throw correct error types', () => {
        let err;
        try {
            assert();
        } catch (e) {
            err = e;
        }
        expect(err.constructor.name).toBe('TypeError');

        try {
            assert(123);
        } catch (e) {
            err = e;
        }
        expect(err.constructor.name).toBe('TypeError');

        try {
            assert({one: 1}, []);
        } catch (e) {
            err = e;
        }
        expect(err.constructor.name).toBe('Error');
    });

    it('must throw on invalid options', () => {
        expect(() => assert(0)).toThrow('Invalid "options" parameter: 0');
        expect(() => assert(123)).toThrow('Invalid "options" parameter: 123');
        expect(() => assert('')).toThrow('Invalid "options" parameter: ""');
        expect(() => assert('1')).toThrow('Invalid "options" parameter: "1"');
    });

    it('must throw on invalid defaults', () => {
        expect(() => assert()).toThrow('Invalid "defaults" parameter: undefined');
        expect(() => assert(null)).toThrow('Invalid "defaults" parameter: undefined');
        expect(() => assert({})).toThrow('Invalid "defaults" parameter: undefined');
        expect(() => assert({}, 0)).toThrow('Invalid "defaults" parameter: 0');
        expect(() => assert({}, 123)).toThrow('Invalid "defaults" parameter: 123');
        expect(() => assert({}, '')).toThrow('Invalid "defaults" parameter: ""');
        expect(() => assert({}, '1')).toThrow('Invalid "defaults" parameter: "1"');
    });

    it('must throw on unknown properties', () => {
        expect(() => assert({one: 1}, [])).toThrow('Option "one" is not supported.');
        expect(() => assert({one: 1}, {})).toThrow('Option "one" is not supported.');
        expect(() => assert({one: 1, two: 2}, ['one'])).toThrow('Option "two" is not supported.');
    });
});
