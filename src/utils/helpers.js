// Expand javascript object
export function expand() {
    var r = {};
    for (var i = 0, n = arguments.length; i < n; i++) {
        var item = arguments[i];
        if (typeof item === 'object')
            for (var name in item)
                r[name] = item[name];
    }
    return r;
}
