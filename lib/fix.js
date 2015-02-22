/* jshint ignore:start */
// copied and modified from https://github.com/jshint/fixmyjs/blob/v2.0/lib/index.js
// because they don't allow custom rules to be specified

var fu = require('fu');
var recast = require('recast');
var traverse = require('./traverse');
var SHEBANG = /^(\#\!.*)\n/;

/*istanbul ignore next*/
function getRules(options) {
    return require('./rules').map(function (rule) {
        return rule(options);
    });
}

/*istanbul ignore next*/
function fix(code, config) {
    config = config || {};

    var shebang = SHEBANG.exec(code);
    var pureCode = code.replace(SHEBANG, '');
    var ast;
    try {
        ast = recast.parse(pureCode);
    } catch (e) {
        if (e.message === 'AST contains no nodes at all?') {
            return code;
        }
        throw e;
    }
    var rules = getRules(config);
    var options = { wrapColumn: Infinity };

    var modifiedTree = traverse(ast, function (node, parent) {
        return fu.foldl(function (node, f) {
            return node && f.hasOwnProperty(node.type)
                ? f[node.type](node, parent)
                : node;
        }, rules, node);
    });

    var generatedCode = recast.print(modifiedTree, options).code;

    return shebang === null
        ? generatedCode
        : [shebang[1], generatedCode].join('\n');
}
/* jshint ignore:end */

module.exports = fix;

