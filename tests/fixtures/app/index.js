var makeFoo = function (bar, baz) {
    // The following 2 lines of code will be stripped with our webpack loader
    assert(1!==2, '1 must not equal 2');
    debug('1 must not equal 2');
    // This code would remain
    return new Foo(bar, baz);
};
