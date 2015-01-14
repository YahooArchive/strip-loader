Webpack Strip
=============

Simple [Webpack](http://webpack.github.io/) loader to strip custom functions from your code. This can be useful if you want to use debug statements while developing your app but don't want this info exposed in your production code.

##Usage:

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
