/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var assert = require('chai').assert;
var debug = require('debug')('Foo');
var makeFoo = function (bar, baz) {
    // The following 3 lines of code will be stripped with our webpack loader
    assert(bar, true);
    debug('better debug info');
    debug('This is fancy debug: ' + (baz) + '.');
    // This code would remain
    return new Foo(bar, baz);
};
