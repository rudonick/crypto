/* 
 * Copyright (c) 2014, Rudolf Nickolaev.
 * All rights reserved.
 *
 * ASN.1 decode viewers
 * 
 */

/*
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['gostCoding', 'gostObject', 'gostSyntax'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('gostCoding'), require('gostObject'), require('gostSyntax'));
    } else {
        root.gostViewer = factory(root.gostCoding, root.gostObject, root.gostSyntax);
    }
}(this, function(gostCoding, gostObject, gostSyntax) {

    var printASN1 = (function() {

        function hex(start, buffer) {
            var s = '', d = new Uint8Array(buffer);
            for (var i = 0; i < d.length; i++) {
                s += (i % 16 === 0 ? (i > 0 ? '</b>' : '') + '\r\n' + start + '<b>' : ' ') +
                        ('00' + d[i].toString(16)).slice(-2);
            }
            return  s ? s + '</b>' : '';
        }

        function childs(block, offset, ident) {
            var s = '', start = '             : ';
            if (block.length > 0) {
                s += ' {\r\n';
                block.forEach(function(child) {
                    s += process(child, offset, ident + ' ');
                    offset += child.header.length + child.content.length;
                });
                s += start + ident + '}';
            } else
                s += ' {}';
            return s;
        }

        function process(block, offset, ident) {
            offset = offset || 0;
            ident = ident || '';
            var start = '             : ',
                    s = ('     ' + offset).slice(-5) +
                    ' ' + ('00' + block.header[0].toString(16)).slice(-2) +
                    ('     ' + block.content.length).slice(-5) + ': ' +
                    ident + block.typeName;
            if (block.tagConstructed)
                s += childs(block, offset + block.header.length, ident);
            else
                switch (block.typeName.toUpperCase()) {
                    case 'OBJECT IDENTIFIER':
                        var id = block.toString(),
                                name = gostObject.names[id];
                        s += ' <b>' + (name ? name : '?') + '</b> (' + id + ')';
                        break;
                    case 'INTEGER':
                    case 'ENUMERATED':
                        if (block instanceof Number) {
                            s += ' <b>' + block.toString() + '</b>';
                        } else
                            s += hex(start + ident + ' ', block.content);
                        break;
                    case 'GENERALIZEDTIME':
                    case 'UTCTIME':
                        s += ' <b>' + block.toString() + '</b>';
                        break;
                    case 'PRINTABLESTRING':
                    case 'IA5STRING':
                    case 'VISIBLESTRING':
                    case 'VIDEOTEXSTRING':
                    case 'NUMERICSTRING':
                    case 'BMPSTRING':
                    case 'UTF8STRING':
                    case 'UNIVERSALSTRING':
                        s += ' <b>&quot;' + block.toString() + '&quot;</b>';
                        break;
                    case 'BOOLEAN':
                        s += ' <b>' + (block ? 'true' : 'false') + '</b>';
                        break;
                    case 'OCTET STRING':
                        try {
                            s += ', encapsulates' + childs([gostCoding.BER.decode(block.content)],
                                    offset + block.header.length, ident);
                        } catch (e) {
                            s += hex(start + ident + ' ', block.content);
                        }
                        break;
                    case 'BIT STRING':
                        s += ', unused ' + block.content[0] + ' bits';
                        if (block instanceof ArrayBuffer) {
                            try {
                                s += ', encapsulates' + childs([gostCoding.BER.decode(block)],
                                        offset + block.header.length, ident);
                            } catch (e) {
                                s += hex(start + ident + ' ', block);
                            }
                        } else
                            s += '\r\n' + start + ident + ' <b>' + block + 'B</b>';
                        break;
                    default:
                        s += hex(start + ident + ' ', block.content);
                }
            return s + '\r\n';
        }

        return function(value) {
            if (typeof value === 'string' || value instanceof String) { // text
                var t = /([A-Fa-f0-9\s]+)/g.exec(value);
                if (t && t[1].length === value.length) // Hex format
                    value = gostCoding.Hex.decode(value);
                else // PEM format
                    value = gostCoding.PEM.decode(value);
            } else { // binary
                try {
                    value = gostCoding.PEM.decode(gostCoding.Chars.encode(value, 'ascii'));
                } catch (e) {
                }
            }
            return process(gostCoding.BER.decode(value));
        };
    })();

    var printSyntax = (function() {

        function process(value, ident) {
            ident = ident || '';
            if (typeof value === 'undefined')
                return '<b>undefined</b>';
            else if (value instanceof Array) {
                var s = '[';
                var r = [], l = 0;
                for (var i = 0, n = value.length; i < n; i++) {
                    r[i] = process(value[i], ident + '    ');
                    l += r[i].replace(/\<[^\>]+\>/g, '').length + 2;
                }
                if (l > 80)
                    return '[\r\n' + ident + '    ' +
                            r.join(',\r\n' + ident + '    ') +
                            '\r\n' + ident + ']';
                else
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
                var d = new Uint8Array(value.buffer || value);
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
                    if (name === 'buffer')
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

        return function(value, type) {
            if (typeof value === 'string' || value instanceof String) { // text
                var t = /([A-Fa-f0-9\s]+)/g.exec(value);
                if (t && t[1].length === value.length) // Hex format
                    value = gostCoding.Hex.decode(value);
                else // PEM format
                    value = gostCoding.PEM.decode(value);
            } else { // binary
                try {
                    value = gostCoding.PEM.decode(gostCoding.Chars.encode(value, 'ascii'));
                } catch (e) {
                }
            }
            if (type) {
                return process(gostSyntax[type].decode(value));
            } else
                return process(gostCoding.BER.decode(value));
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
        open('Syntax ' + (type ? 'gostSyntax.' + type + '.decode(value):' :
                'gostCoding.PEM.decode(value):'), printSyntax(item.textContent, type), item);
    }

    return {
        printASN1: printASN1,
        printSyntax: printSyntax,
        openASN1: openASN1,
        openSyntax: openSyntax
    };

}));
