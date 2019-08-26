import {assertOptions, NamedValues} from '../../src';

const empty1: NamedValues = assertOptions({}, []);
const empty2: NamedValues = assertOptions({}, {});

const simple: NamedValues = assertOptions({one: 1}, ['one']);

const withObj: NamedValues = assertOptions({one: 1}, {one: 111});

withObj.bla = 123;
