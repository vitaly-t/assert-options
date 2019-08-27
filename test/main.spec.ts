import {expect} from './header';
import {assertOptions as assert} from '../src';

describe('positive', () => {

    it('must return the same object when empty', () => {
        const obj = {};
        expect(assert(obj, [])).to.eq(obj);
        expect(assert(obj, {})).to.eq(obj);
    });

    it('must provide normal default values', () => {
        expect(assert({}, {one: 1})).to.eql({one: 1});
        expect(assert(null, {one: 1})).to.eql({one: 1});
        expect(assert({one: 1}, {one: 111, two: 222})).to.eql({one: 1, two: 222});
    });

    it('must set defaults for undefined option values', () => {
        expect(assert({one: undefined, two: undefined}, {one: 111, two: 222})).to.eql({one: 111, two: 222});
    });

    it('must not set undefined as default values', () => {
        expect(assert({one: 1}, {one: 111, two: undefined})).to.eql({one: 1});
    });

    it('must not set defaults for arrays', () => {
        expect(assert(null, [])).to.eql({});
        expect(assert(null, ['one'])).to.eql({});
        expect(assert({}, ['one'])).to.eql({});
    });

});

describe('negative', () => {

    it('must throw correct error types', () => {
        let err;
        try {
            assert(undefined, <string[]><unknown>null);
        } catch (e) {
            err = e;
        }
        expect(err.constructor.name).to.eq('TypeError');

        try {
            assert(<undefined><unknown>123, <string[]><unknown>null);
        } catch (e) {
            err = e;
        }
        expect(err.constructor.name).to.eq('TypeError');

        try {
            assert({one: 1}, []);
        } catch (e) {
            err = e;
        }
        expect(err.constructor.name).to.eq('Error');
    });

    it('must throw on invalid options', () => {
        expect(() => assert(<null><unknown>0, [])).to.throw('Invalid "options" parameter: 0');
        expect(() => assert(<null><unknown>123, [])).to.throw('Invalid "options" parameter: 123');
        expect(() => assert(<null><unknown>'', [])).to.throw('Invalid "options" parameter: ""');
        expect(() => assert(<null><unknown>'1', [])).to.throw('Invalid "options" parameter: "1"');
    });

    it('must throw on invalid defaults', () => {
        expect(() => assert(null, <string[]><unknown>undefined)).to.throw('Invalid "defaults" parameter: undefined');
        expect(() => assert({}, <string[]><unknown>undefined)).to.throw('Invalid "defaults" parameter: undefined');
        expect(() => assert({}, <string[]><unknown>0)).to.throw('Invalid "defaults" parameter: 0');
        expect(() => assert({}, <string[]><unknown>123)).to.throw('Invalid "defaults" parameter: 123');
        expect(() => assert({}, <string[]><unknown>'')).to.throw('Invalid "defaults" parameter: ""');
        expect(() => assert({}, <string[]><unknown>'1')).to.throw('Invalid "defaults" parameter: "1"');
    });

    it('must throw on unknown properties', () => {
        expect(() => assert({one: 1}, [])).to.throw('Option "one" is not recognized.');
        expect(() => assert({one: 1}, {})).to.throw('Option "one" is not recognized.');
        expect(() => assert({one: 1, two: 2}, ['one'])).to.throw('Option "two" is not recognized.');
    });
});
