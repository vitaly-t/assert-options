'use strict';

const assert = require('../src');

describe('positive', () => {

    it('must ignore empty options', () => {
        expect(assert()).toEqual({});
        expect(assert(0)).toEqual({});
        expect(assert('')).toEqual({});
    });

    it('must return the same object when empty', () => {
        const obj = {};
        expect(assert(obj)).toBe(obj);
    });

    it('must provide default values', () => {
        expect(assert({}, {one: 1})).toEqual({one: 1});
        expect(assert({one: 1}, {one: 111, two: 222})).toEqual({one: 1, two: 222});
    });

});

describe('negative', () => {

    it('must throw on unknown properties', () => {
        expect(() => {
            assert({one: 1});
        }).toThrow('Option "one" is not supported.');

        expect(() => {
            assert({one: 1, two: 2}, ['one']);
        }).toThrow('Option "two" is not supported.');
    });
});
