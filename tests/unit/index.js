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
        var statsJson = stats.toJson();
        if (stats.hasErrors()) {
            done(statsJson.errors[0]);
        }

        expect(err).to.be.null();
        expect(stats.hasErrors()).to.be.false();

        expect(statsJson.errors).to.have.length(0);

        var originalSource = fs.readFileSync(cwd + '/index.js', {encoding: 'utf8'});
        expect(originalSource).to.contain('assert');
        expect(originalSource).to.contain('debug');

        var strippedSource = statsJson.modules[0].source;
        if (strippedSource.match(/assert/g)) {
            expect(strippedSource.match(/assert/g)).to.have.length.of.at.most(1);
        } else {
            expect(strippedSource).to.not.contain('assert');
        }
        if (strippedSource.match(/debug/g)) {
            expect(strippedSource.match(/debug/g)).to.have.length.of.at.most(1);
        } else {
            expect(strippedSource).to.not.contain('debug');
        }

        done(err);
    };
};


describe('integration', function () {
    describe('webpack', function () {
        it('should work with loader query params', function (done) {
            webpack(
                createWebpackConfigWithLoader(loaderLibPath + '?strip[]=assert,strip[]=debug'),
                createWebpackTest(done)
            );
        });

        it('should work with loader used as library', function (done) {
            webpack(
                createWebpackConfigWithLoader(loaderLib.loader('assert', 'debug')),
                createWebpackTest(done)
            );
        });
    });
});
