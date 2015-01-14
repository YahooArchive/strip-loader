/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

"use strict";

var loaderUtils = require('loader-utils');

function StripFnLoader(source) {
    var query = loaderUtils.parseQuery(this.query);

    if (!query || !query.strip) return;

    var toStrip = query.strip.join('|');

    var regexPattern = new RegExp('\\n[ \\t]*(' + toStrip + ')\\([^\\);]+\\)[ \\t]*[;\\n]', 'g');

    var transformed = source.replace(regexPattern, '\n');

    this.callback(null, transformed);
}
module.exports = StripFnLoader;

module.exports.loader = function () {
    return __filename + '?' + [].slice.call(arguments, 0).map(function (fn) {
        return 'strip[]=' + fn;
    }).join(',');
};
