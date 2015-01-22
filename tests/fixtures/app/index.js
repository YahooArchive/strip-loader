/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// The following line of code will be stripped with our webpack loader
var debug = require('debug')('Foo');

var makeFoo = function (bar, baz) {
    // The following 2 lines of code will be stripped with our webpack loader
    console.log('some debug info');
    debug('better debug info');
    // This code would remain
    return new Foo(bar, baz);
};
