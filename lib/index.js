/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

"use strict";

var loaderUtils = require('loader-utils');
var fix = require('./fix');

function StripFnLoader(source) {
    this.cacheable();

    var query = loaderUtils.parseQuery(this.query);

    if (!query || !query.strip) {
        throw new Error('strip-loader: no functions provided for stripping');
        return;
    }

    return fix(source, {strip: query.strip});
}

module.exports = StripFnLoader;

module.exports.loader = function () {
    return __filename + '?' + [].slice.call(arguments, 0).map(function (fn) {
        return 'strip[]=' + fn;
    }).join(',');
};
