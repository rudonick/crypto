const path = require('path');
const _root = path.resolve(__dirname, '..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function getCliArgValue (argName) {
    const argIndex = process.argv.indexOf(argName)
    if (argIndex >= 0) {
        return process.argv[argIndex + 1]
    } else {
        return null
    }
}

module.exports = {
    root,
    getCliArgValue
}
