module.exports = function (opts) {
    return opts.strip ? {
        ExpressionStatement: stripFnCalls.bind(stripFnCalls, opts.strip)
    } : {};
};

function stripFnCalls (toStrip, node) {
    if (!node.expression.type ||
        node.expression.type !== 'CallExpression' ||
        !node.expression.callee ||
        node.expression.callee.type !== 'Identifier' ||
        toStrip.indexOf(node.expression.callee.name) === -1) {
        return node;
    }

    return [];
}
