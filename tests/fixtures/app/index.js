console.log( 'a console.log on the first line should get stripped' );
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var makeFoo = function ( bar, baz ) {
    // The following 2 lines of code will be stripped with our webpack loader
    console.log( 'some debug info' );
    debug( 'better debug info' );
    console.log( 'some' + "debug " + info + '(even closing parenthesis);' );
    // This code would remain
    return new Foo( bar, baz );
};
console.log( 'a console.log on the last line without a semicolon should get stripped' )
