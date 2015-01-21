# Webpack Strip

[![npm version](https://badge.fury.io/js/webpack-strip.svg)](http://badge.fury.io/js/webpack-strip)
[![Build Status](https://travis-ci.org/yahoo/webpack-strip.svg?branch=master)](https://travis-ci.org/yahoo/webpack-strip)
[![Dependency Status](https://david-dm.org/yahoo/webpack-strip.svg)](https://david-dm.org/yahoo/webpack-strip)
[![devDependency Status](https://david-dm.org/yahoo/webpack-strip/dev-status.svg)](https://david-dm.org/yahoo/webpack-strip#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/yahoo/webpack-strip/badge.png?branch=master)](https://coveralls.io/r/yahoo/webpack-strip?branch=master)

Simple [Webpack](http://webpack.github.io/) loader to strip custom functions from your code. This can be useful if you want to use debug statements while developing your app but don't want this info exposed in your production code.


## Install

`npm install --save-dev webpack-strip`

## Usage

In your client js source files:

```javascript

var debug = require('debug')('MyFile');

var makeFoo = function () {
    // The following two lines of code will be stripped with our webpack loader
    debug('makeFoo called');
    debug('makeFoo args', arguments);
    // This code would remain
    return 'Foo';
};

```

### Single function
In your webpack config:

```javascript
{
    module: {
        loaders: [
            { test: /\.js$/, loader: "webpack-strip?strip[]=debug" }
        ]
    }
};
```

### Multiple functions
In your webpack config:

```javascript
{
    module: {
        loaders: [
            { test: /\.js$/, loader: "webpack-strip?strip[]=debug,strip[]=console.log" }
        ]
    }
};
```

### Use as library
In your webpack config:

```javascript
var WebpackStrip = require('webpack-strip')
{
    module: {
        loaders: [
            { test: /\.js$/, loader: WebpackStrip.loader('debug', 'console.log') }
        ]
    }
};
```

## License

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/webpack-strip/blob/master/LICENSE.md
