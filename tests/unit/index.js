/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/*global describe,it */
'use strict';

var webpack = require("webpack");
var expect = require('chai').expect;
var loaderLib = require('../../lib/index.js');
var loaderLibPath = require.resolve('../../lib/index.js');
var fs = require('fs');

var cwd = __dirname + '/../fixtures/app';

var createWebpackConfigWithLoader = function (loaderOpt) {
    return {
        context: cwd,
        entry: './index.js',
        output: {
            path: cwd,
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                { test: /\.js$/, loader: loaderOpt }
            ]
        }
    };
};

var createWebpackTest = function (done) {
    return function(err, stats) {

        expect(err).to.be.null();
        expect(stats.hasErrors()).to.be.false();

        var statsJson = stats.toJson();
        expect(statsJson.errors).to.have.length(0);

        var originalSource = fs.readFileSync(cwd + '/index.js', {encoding: 'utf8'});
        expect(originalSource).to.contain('console.log');
        expect(originalSource).to.contain('debug');

        var strippedSource = statsJson.modules[0].source;
        expect(strippedSource).to.not.contain('console.log');
        expect(strippedSource).to.not.contain('debug');

        done(err);
    };
};


describe('integration', function () {
    describe('webpack', function () {
        it('should work with loader query params', function (done) {
            webpack(
                createWebpackConfigWithLoader(loaderLibPath + '?strip[]=console.log,strip[]=debug'),
                createWebpackTest(done)
            );
        });

        it('should work with loader used as library', function (done) {
            webpack(
                createWebpackConfigWithLoader(loaderLib.loader('console.log', 'debug')),
                createWebpackTest(done)
            );
        });
    });
});
