# Strip Loader

[![npm version](https://badge.fury.io/js/strip-loader.svg)](http://badge.fury.io/js/strip-loader)
[![Build Status](https://travis-ci.org/yahoo/strip-loader.svg?branch=master)](https://travis-ci.org/yahoo/strip-loader)
[![Dependency Status](https://david-dm.org/yahoo/strip-loader.svg)](https://david-dm.org/yahoo/strip-loader)
[![devDependency Status](https://david-dm.org/yahoo/strip-loader/dev-status.svg)](https://david-dm.org/yahoo/strip-loader#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/yahoo/strip-loader/badge.png?branch=master)](https://coveralls.io/r/yahoo/strip-loader?branch=master)

Simple [Webpack](http://webpack.github.io/) loader to strip custom functions from your code. This can be useful if you want to use debug statements while developing your app but don't want this info exposed in your production code.


## Install

`npm install --save-dev strip-loader`

## Usage

Before

```javascript

// the following variable will be stubbed to a noop function
var debug = require('debug')('MyFile');

var makeFoo = function () {
    // The following line of code will be stripped with our webpack loader
    debug('making Foo');
    // This code would remain
    return 'Foo';
};

```

After

```javascript

var debug = function(){};

var makeFoo = function () {
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
            { test: /\.js$/, loader: "strip-loader?strip[]=debug" }
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
            { test: /\.js$/, loader: "strip-loader?strip[]=debug,strip[]=assert" }
        ]
    }
};
```

### Use as library
In your webpack config:

```javascript
var WebpackStrip = require('strip-loader');

var webpackConfig = {
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

[LICENSE file]: https://github.com/yahoo/strip-loader/blob/master/LICENSE.md
