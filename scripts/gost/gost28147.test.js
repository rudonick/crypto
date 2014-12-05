/* 
 * Copyright (c) 2014, Rudolf Nickolaev.
 * All rights reserved.
 *
 * GOST 28147-89 Encryption Algorithm
 * 
 */

/*
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this 
 *    list of conditions and the following disclaimer.
 *    
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *    
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
        define(['gostCoding', 'gost28147'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('gostCoding'), require('gost28147'));
    } else {
        if (typeof importScripts !== 'undefined') {
            if (!root.onmessage)
                root.onmessage = function(event) {
                    postMessage((root[event.data.object] || root)[event.data.method].apply(event.data.object || root, event.data.args));
                };
            importScripts('gostCoding.js', 'gost28147.js');
        }
        root.Gost28147_test = factory(root.gostCoding, root.Gost28147);
    }

}(this, function(gostCoding, Gost28147) {

    var root = this;

    function println(s, h) {
        if (typeof importScripts !== 'undefined') {
            var tag = h ? 'h3' : 'div';
            postMessage({log: '<' + tag + '>' + (s || '&nbsp') + '</' + tag + '>'});
        } else {
            if (typeof document !== 'undefined') {
                var el = document.createElement(h ? 'h3' : 'div');
                el.innerHTML = s || '&nbsp';
                (document.getElementById('output') || document.body).appendChild(el);
            }
            if (typeof console !== 'undefined')
                console.log((s || '') + (h ? '' : '\n'));
        }
    }

    function perform(id, algorithm, key, input, output) {
        var Hex = gostCoding.Hex;
        if (algorithm.iv)
            (algorithm.iv = Hex.decode(algorithm.iv));

        var cipher = new Gost28147(algorithm);
        var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
        try {
            var out = Hex.encode(cipher.encrypt(Hex.decode(key), Hex.decode(input)));
            var test = 0 + (output && out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== output.toLowerCase());
            if (!test) {
                var out = Hex.encode(cipher.decrypt(Hex.decode(key), Hex.decode(out)));
                test = 0 + (out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== input.toLowerCase());
                if (!test)
                    result += 'PASSED';
                else
                    result += 'FAILED - Decrypt expected ' + input + " got " + out;
            } else
                result += 'FAILED - Encrypt expected ' + output + " got " + out;
        } catch (e) {
            result += 'FAILED - Throw error: ' + e.message;
        }
        println(result);
        return test;
    }

    function performMac(id, algorithm, key, input, output) {
        var Hex = gostCoding.Hex;
        if (algorithm.iv)
            (algorithm.iv = Hex.decode(algorithm.iv));

        var cipher = new Gost28147(algorithm);
        var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
        try {
            var out = Hex.encode(cipher.sign(Hex.decode(key), Hex.decode(input)));
            var test = 0 + (output && out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== output.toLowerCase());
            if (!test) {
                var res = cipher.verify(Hex.decode(key), Hex.decode(out), Hex.decode(input));
                test = 0 + (!res);
                if (!test)
                    result += 'PASSED';
                else
                    result += 'FAILED - Verify return (false)';
            } else
                result += 'FAILED - Sign expected ' + output + " got " + out;
        } catch (e) {
            result += 'FAILED - Throw error: ' + e.message;
        }
        println(result);
        return test;
    }

    function performWrap(id, algorithm, key, input, output) {
        var Hex = gostCoding.Hex;
        if (algorithm.ukm)
            (algorithm.ukm = Hex.decode(algorithm.ukm));

        var cipher = new Gost28147(algorithm);
        var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
        try {
            var out = Hex.encode(cipher.wrapKey(Hex.decode(key), Hex.decode(input)));
//            out = output; // temporary debug
            var test = 0 + (output && out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== output.toLowerCase());
            if (!test) {
                var out = Hex.encode(cipher.unwrapKey(Hex.decode(key), Hex.decode(out)));
                test = 0 + (out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== input.toLowerCase());
//                var cipher2 = new Gost28147({name: 'GOST 28147-ECB', sBox: 'E-SC'});
//                var out = Hex.encode(cipher.decrypt(Hex.decode(out), Hex.decode('34BF9806FD77DF19F2BD0E3085FF53C1E18C3B58A0CD82BDA7466D9CC259FA23')));
//                println('pk=' + out);
                if (!test)
                    result += 'PASSED';
                else
                    result += 'FAILED - Unwrap key expected ' + input + " got " + out;
            } else
                result += 'FAILED - Wrap key expected ' + output + " got " + out;
        } catch (e) {
            result += 'FAILED - Throw error: ' + e.message;
        }
        println(result);
        return test;
    }

    /**
     * Test cases
     * 
     * @returns {unresolved}
     */
    return function() {

        gostCoding = gostCoding || root.gostCoding;
        Gost28147 = Gost28147 || root.Gost28147;

        var input1 = "0000000000000000";
        var output1 = "1b0bbc32cebcab42";
        var input2 = "bc350e71aac5f5c2";
        var output2 = "d35ab653493b49f5";
        var input3 = "bc350e71aa11345709acde";
        var output3 = "8824c124c4fd14301fb1e8";
        var input4 = "000102030405060708090a0b0c0d0e0fff0102030405060708090a0b0c0d0e0f";
        var output4 = "29b7083e0a6d955ca0ec5b04fdb4ea41949f1dd2efdf17baffc1780b031f3934";

        var TestSBox = new Uint8Array([
            0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF,
            0xF, 0xE, 0xD, 0xC, 0xB, 0xA, 0x9, 0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1, 0x0,
            0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF,
            0xF, 0xE, 0xD, 0xC, 0xB, 0xA, 0x9, 0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1, 0x0,
            0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF,
            0xF, 0xE, 0xD, 0xC, 0xB, 0xA, 0x9, 0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1, 0x0,
            0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF,
            0xF, 0xE, 0xD, 0xC, 0xB, 0xA, 0x9, 0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1, 0x0
        ]);


        // Basic chiper mode tests
        var tests = 0, i = 0;
        println('GOST 28147-89 TEST', true);

        tests += perform(++i, {name: 'GOST 28147', sBox: 'D-TEST'},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', input1, output1);
        tests += perform(++i, {name: 'GOST 28147', block:'CBC', iv: '1234567890abcdef', sBox: 'D-TEST'},
        '00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF', input2, output2);
        tests += perform(++i, {name: 'GOST 28147', block: 'CNT', iv: '1234567890abcdef', sBox: 'D-TEST'},
        '0011223344556677889900112233445566778899001122334455667788990011', input3, output3);
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB', iv: 'aafd12f659cae634', sBox: 'D-TEST'},
        'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5', input4, output4);

        // Tests with parameters, set S-box.
        tests += perform(++i, {name: 'GOST 28147', sBox: 'D-TEST'},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', input1, output1); // default parameter S-box set to D-TEST
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB',  iv: '1234567890abcdef', sBox: 'D-TEST'},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'b587f7a0814c911d'); //type S-box
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB', iv: '1234567890abcdef', sBox: 'E-TEST'},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'e8287f53f991d52b');
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB', shiftBits: 64,  iv: '1234567890abcdef', sBox: 'E-A'},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'c41009dba22ebe35');
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB', iv: '1234567890abcdef', sBox: 'E-B', shiftBits: 8},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '80d8723fcd3aba28');
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: 'E-C'},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '739f6f95068499b5');
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: 'E-D'},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '4663f720f4340f57');
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: 'D-A'},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '5bb0a31d218ed564');
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: TestSBox},
        '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'c3af96ef788667c5');
        tests += perform(++i, {name: 'GOST 28147', block: 'CNT', iv: '1234567890abcdef', sBox: 'E-A'},
        '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', 'bc350e71aa11345709acde', '1bcc2282707c676fb656dc');

        var gkeyBytes5 = "6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49";
        var gkeyBytes6 = "6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49";

        var input5 = "7768617420646f2079612077616e7420666f72206e6f7468696e673f";
        var input6 = "7768617420646f2079612077616e7420666f72206e6f7468696e673f";

        var output5 = "93468a46";
        var output6 = "93468a46";

        println();
        println('MAC sing/verify');
        tests += performMac(++i, {name: 'GOST 28147', mode: 'MAC', sBox: 'E-A'}, gkeyBytes5, input5, output5);
        tests += performMac(++i, {name: 'GOST 28147', mode: 'MAC', sBox: 'E-A'}, gkeyBytes6, input6, output6);

        // Key meshing
        println();
        println('Key meshing');
        var input = new Array(10001).join('61'); // hex(a)
        tests += perform(++i, {name: 'GOST 28147', block: 'CFB', keyMeshing: 'CP', iv: '1234567890abcdef', sBox: 'E-A'},
        '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);
        tests += perform(++i, {name: 'GOST 28147', block: 'CBC', keyMeshing: 'CP', iv: '1234567890abcdef', sBox: 'E-A'},
        '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);
        tests += perform(++i, {name: 'GOST 28147', block: 'CNT', keyMeshing: 'CP', iv: '1234567890abcdef', sBox: 'E-A'},
        '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);
        tests += performMac(++i, {name: 'GOST 28147', mode: 'MAC', keyMeshing: 'CP', iv: '1234567890abcdef', sBox: 'E-A'},
        '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);

        println();
        println('Key wrapping');
        var input = new Array(10001).join('61'); // hex(a)
        tests += performWrap(++i, {name: 'GOST 28147', mode: 'KW', ukm: '1234567890abcdef', sBox: 'D-TEST'}, // Initial UKM seed
        'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5',
                '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49',
                '1234567890abcdefaf502015229a831dc82b4d32dc00173f5d43d921e5e09cc09ce947c777414397022a90c7');
        tests += performWrap(++i, {name: 'GOST 28147', mode: 'KW', sBox: 'E-A'}, // Wrapping with random seed
        'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5',
                '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49');
        tests += performWrap(++i, {name: 'GOST 28147', sBox: 'D-TEST', ukm: '1234567890abcdef', keyWrapping: 'CP'}, // CryptoPro. Initial UKM seed
        'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5',
                '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49',
                '1234567890abcdefc5883ce7bb8ea082ab1d9046a0fc43519c5f170b39c54729ecc855562c26a69d022a90c7');
        tests += performWrap(++i, {name: 'GOST 28147', mode: 'KW', keyWrapping: 'CP', sBox: 'E-A'}, // Wrapping with random seed
        'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5',
                '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49');

        tests += performWrap(++i, {name: 'GOST 28147', mode: 'KW', keyWrapping: 'SC', sBox: 'E-SC'},
        '2208cd6bc96a' +
                '009f05175f635bee6cc09c78260b9b7eee1e070d346462e6881bbf572f436df5' +
                '716b1212a9fba3d022db4aed0a18530ae6c62d9bdd206479805ce652c17bc9cc' +
                '07dcdce25cba19276285f6c54dfa940ab55473bde2d8338eaaedc59cdd808619' +
                'f75296db91e016b588c0650686ff6929258a76d5ca7ba91b7fa87f41b2deb535' +
                'a66b489a5485ac68971e00658836ce358dcda04b358621ebf08ce062b671d84a' +
                '30706495ee2ed7d0f0a6a3e171a9daba04b582c3b7113905053a5b9254c7e08b' +
                'ea27cb66e19699db55444f1e1f1b5a3b7db7cbcc04728e225e67ab8099dc82b1' + // mk.db3
                '5d6f4f794c0f584718252fb2d9ffffe6d2adc4c86616466fe032ed28790e6af6', // masks.db3
                '5a7145b0ee4c080e0fcf689e5222c25876ac9d2b25a68fb3357eea8f849d6272',
                '7c34bf4e03d0bc120768164f355cf6180b32851e2ad6fc22b386bbea17fa1d5f1789eb95'); // kek.opq

        println();

        println('TOTAL ' + (tests ? tests + ' ERRORS' : 'OK'));
        println();
        
        return tests;
    };

}));

