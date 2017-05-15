># This Project Is Deprecated

>There have been a lot of long standing issues that haven't been addressed and we haven't had the time to dedicate to this library. If I were to restart this project today, it would probably be a codemod script using Facebook's [jscodeshift](https://github.com/facebook/jscodeshift). The regex based approach in this loader only works for very basic use cases.

>The most common use case is when trying to strip `console.log` from your code. You can actually do this without using this loader at all. You can use uglifyjs's `drop_console` option. Here is what that would look like in a webpack plugin:
```
new webpack.optimize.UglifyJsPlugin({
    compress: {
        drop_console: true
    }
})
```



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
            { test: /\.js$/, loader: "strip-loader?strip[]=debug,strip[]=console.log" }
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

### Replace unused module

So far we've removed the calls to the debug function, but your app still requires the `debug` module in the final bundle. Use the [`NormalModuleReplacementPlugin`](http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin) to replace it with an empty function:

```javascript
// webpack config
{
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/debug/, process.cwd() + '/emptyDebug.js'),
    ]
}

// emptyDebug.js
module.exports = function() { return new Function(); };
```



## License

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/strip-loader/blob/master/LICENSE.md
