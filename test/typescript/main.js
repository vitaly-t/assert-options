"use strict";
exports.__esModule = true;
var src_1 = require("../../src");
var empty1 = src_1.assertOptions({}, []);
var empty2 = src_1.assertOptions({}, {});
var simple = src_1.assertOptions({ one: 1 }, ['one']);
var withObj = src_1.assertOptions({ one: 1 }, { one: 111 });
withObj.bla = 123;
