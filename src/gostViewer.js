/*
 * Copyright (c) 2014, Rudolf Nickolaev.
 * All rights reserved.
 *
 * ASN.1 decode viewers
 *
 */

import { gostCrypto } from './crypto/gostCrypto';

var coding = gostCrypto.coding, names = gostCrypto.security.names, asn1 = gostCrypto.asn1;

var printASN1 = (function () {

    var BERtypes = {
        0x00: 'EOC',
        0x01: 'BOOLEAN',
        0x02: 'INTEGER',
        0x03: 'BIT STRING',
        0x04: 'OCTET STRING',
        0x05: 'NULL',
        0x06: 'OBJECT IDENTIFIER',
        0x07: 'ObjectDescriptor',
        0x08: 'EXTERNAL',
        0x09: 'REAL',
        0x0A: 'ENUMERATED',
        0x0B: 'EMBEDDED PDV',
        0x0C: 'UTF8String',
        0x10: 'SEQUENCE',
        0x11: 'SET',
        0x12: 'NumericString',
        0x13: 'PrintableString', // ASCII subset
        0x14: 'TeletexString', // aka T61String
        0x15: 'VideotexString',
        0x16: 'IA5String', // ASCII
        0x17: 'UTCTime',
        0x18: 'GeneralizedTime',
        0x19: 'GraphicString',
        0x1A: 'VisibleString', // ASCII subset
        0x1B: 'GeneralString',
        0x1C: 'UniversalString',
        0x1E: 'BMPString'
    };

    function hex(start, buffer) {
        var s = '', d = new Uint8Array(buffer);
        for (var i = 0; i < d.length; i++) {
            s += (i % 16 === 0 ? (i > 0 ? '</b>' : '') + '\r\n' + start + '<b>' : ' ') +
              ('00' + d[i].toString(16)).slice(-2);
        }
        return s ? s + '</b>' : '';
    }

    function childs(block, offset, ident) {
        var s = '', start = '             : ';
        if (block.object.length > 0) {
            s += ' {\r\n';
            block.object.forEach(function (child) {
                s += process(child, offset, ident + ' ');
                offset += child.header.length + child.content.length;
            });
            s += start + ident + '}';
        } else
            s += ' {}';
        return s;
    }

    function process(block, offset, ident) {
        if (block.tagClass > 2)
            throw new Error('Private and Application tags is not supported')
        offset = offset || 0;
        ident = ident || '';
        // type name
        var typeName = block.tagClass === 1 ? 'Application_' + block.tagNumber :
          block.tagClass === 2 ? '[' + block.tagNumber.toString() + ']' : // Context
            block.tagClass === 3 ? 'Private_' + block.tagNumber :
              BERtypes[block.tagNumber] || "Universal_" + block.tagNumber.toString();

        var start = '             : ',
          s = ('     ' + offset).slice(-5) +
            ' ' + ('00' + block.header[0].toString(16)).slice(-2) +
            ('     ' + block.content.length).slice(-5) + ': ' +
            ident + typeName;
        if (block.tagConstructed)
            s += childs(block, offset + block.header.length, ident);
        else
            switch (typeName.toUpperCase()) {
                case 'OBJECT IDENTIFIER':
                    var id = block.object,
                      name = names[id];
                    s += ' <b>' + (name ? name : '?') + '</b> (' + id + ')';
                    break;
                case 'INTEGER':
                case 'ENUMERATED':
                    if (typeof block.object === 'number') {
                        s += ' <b>' + block.object + '</b>';
                    } else
                        s += hex(start + ident + ' ', block.content);
                    break;
                case 'GENERALIZEDTIME':
                case 'UTCTIME':
                    s += ' <b>' + block.object + '</b>';
                    break;
                case 'PRINTABLESTRING':
                case 'IA5STRING':
                case 'VISIBLESTRING':
                case 'VIDEOTEXSTRING':
                case 'NUMERICSTRING':
                case 'BMPSTRING':
                case 'UTF8STRING':
                case 'UNIVERSALSTRING':
                    s += ' <b>&quot;' + block.object + '&quot;</b>';
                    break;
                case 'BOOLEAN':
                    s += ' <b>' + (block.object ? 'true' : 'false') + '</b>';
                    break;
                case 'OCTET STRING':
                    try {
                        s += ', encapsulates' + childs({ object: [coding.BER.decode(block.content)] },
                          offset + block.header.length, ident);
                    } catch (e) {
                        s += hex(start + ident + ' ', block.content);
                    }
                    break;
                case 'BIT STRING':
                    s += ', unused ' + block.content[0] + ' bits';
                    if (block.object instanceof ArrayBuffer) {
                        try {
                            s += ', encapsulates' + childs({ object: [coding.BER.decode(block.object)] },
                              offset + block.header.length, ident);
                        } catch (e) {
                            s += hex(start + ident + ' ', block.object);
                        }
                    } else
                        s += '\r\n' + start + ident + ' <b>' + block.object + 'B</b>';
                    break;
                default:
                    try {
                        s += ', encapsulates' + childs({ object: [coding.BER.decode(block.content)] },
                          offset + block.header.length, ident);
                    } catch (e) {
                        s += hex(start + ident + ' ', block.content);
                    }
            }
        return s + '\r\n';
    }

    return function (value) {
        if (typeof value === 'string' || value instanceof String) { // text
            var t = /([A-Fa-f0-9\s]+)/g.exec(value);
            if (t && t[1].length === value.length) // Hex format
                value = coding.Hex.decode(value);
            else // PEM format
                value = coding.PEM.decode(value);
        } else { // binary
            try {
                value = coding.PEM.decode(coding.Chars.encode(value, 'ascii'));
            } catch (e) {
            }
        }
        return process(coding.BER.decode(value));
    };
})();

var printSyntax = (function () {

    function process(value, ident) {
        ident = ident || '';
        if (typeof value === 'undefined')
            return '<b>undefined</b>';
        else if (value instanceof Array) {
            var r = [], l = 0;
            for (var i = 0, n = value.length; i < n; i++) {
                r[i] = process(value[i], ident + '    ');
                l += r[i].replace(/\<[^\>]+\>/g, '').length + 2;
            }
            if (l > 80) {
                var s = '[', m = 0;
                for (var i = 0, n = r.length; i < n; i++) {
                    s += (i > 0 ? ', ' : '') +
                      (m === 0 && l > 80 ? '\r\n' + ident + '    ' : ' ') + r[i];
                    m += r[i].replace(/\<[^\>]+\>/g, '').length + 2;
                    if (m > 80)
                        m = 0;
                }
                s += l > 80 ? '\r\n' + ident + ']' : ' ]';
                return s;
            } else
                return '[ ' + r.join(', ') + ' ]';
        } else if (typeof value === 'string' || value instanceof String) {
            if (value.toString() === '') // null
                return '<b>null</b>';
            else
                return '<b>"' + value.replace(/([\"])/g, '\\$1') + '"</b>';
        } else if (typeof value === 'number' || value instanceof Number) {
            return '<b>' + value + '</b>';
        } else if (value instanceof Date) {
            return '<b>' + JSON.stringify(value) + '</b>';
        } else if (typeof value === 'boolean' || value instanceof Boolean) {
            return '<b>' + value + '</b>';
        } else if (value instanceof ArrayBuffer || value instanceof Uint8Array) {
            var d = new Uint8Array(value);
            var s = '';
            for (var i = 0, n = d.length; i < n; i++) {
                s += (i > 0 && i % 16 === 0 ? '\r\n' + ident + '    ' : ' ') +
                  '<b>0x' + ('00' + d[i].toString(16)).slice(-2) + '</b>' +
                  (i < n - 1 ? ',' : '');
            }
            if (d.length > 16)
                return '[\r\n' + ident + '   ' + s + '\r\n' + ident + ']';
            else
                return '[' + s + ' ]';
        } else if (typeof value === 'object') {
            var first = true;
            var s = '{';
            for (var name in value) {
                if (typeof value[name] === 'function' || value[name] === undefined)
                    continue;
                var norm = /^[a-zA-Z\_][a-zA-Z0-9\_]*$/.test(name);
                if (first)
                    first = false;
                else
                    s += ',';
                s += '\r\n' + ident + '    ' +
                  (norm ? '' : '"') + name + (norm ? '' : '"') + ': ' +
                  process(value[name], ident + '    ');
            }
            s += (first ? '' : '\r\n' + ident) + '}';
            return s;
        }
        return 'unrecognized';
    }

    return function (value, type) {
        if (typeof value === 'string' || value instanceof String) { // text
            var t = /([A-Fa-f0-9\s]+)/g.exec(value);
            if (t && t[1].length === value.length) // Hex format
                value = coding.Hex.decode(value);
            else // PEM format
                value = coding.PEM.decode(value);
        } else { // binary
            try {
                value = coding.PEM.decode(coding.Chars.encode(value, 'ascii'));
            } catch (e) {
            }
        }
        if (type) {
            return process(asn1[type].decode(value));
        } else
            return process(coding.BER.decode(value));
    };

})();

function open(header, content, item) {
    var el = document.getElementById('print');
    if (el)
        el.parentNode.removeChild(el);
    el = document.createElement('div');
    el.id = 'print';
    el.innerHTML =
      '<span class="label">' + header + '</span>' +
      '<pre class="encoded">' + content + '</pre>' +
      '<button onclick="(function(x){x.parentNode.removeChild(x);})(document.getElementById(\'print\'))">Close View</button>';
    var next = item.nextElementSibling;
    while (next.nodeName.toLowerCase() === 'button')
        next = next.nextElementSibling;
    next.parentNode.insertBefore(el, next);
}

function openASN1(item) {
    open('ASN.1 Data', printASN1(item.textContent), item);
}

function openSyntax(item, type) {
    open('Syntax ' + (type ? 'gostCrypto.asn1.' + type + '.decode(value):' :
      'gostCrypto.coding.PEM.decode(value):'), printSyntax(item.textContent, type), item);
}

export const gostViewer = {
    printASN1,
    printSyntax,
    openASN1,
    openSyntax
};


