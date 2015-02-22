module.exports = function (opts) {
    return opts.strip ? {
        VariableDeclarator: stripFnDecl.bind(stripFnDecl, opts.strip)
    } : {};
};

var recast = require('recast');
var b = recast.types.builders;

var emptyFnNode = b.functionExpression(
    null,
    [],
    {
        type: 'BlockStatement',
        body: []
    });

function stripFnDecl (toStrip, node) {
    if (node.id.type !== 'Identifier' ||
        toStrip.indexOf(node.id.name) === -1) {
        return node;
    }

    node.init = emptyFnNode;

    return node;
}
