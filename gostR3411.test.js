/* 
 * Copyright (c) 2014, Rudolf Nickolaev.
 * All rights reserved.
 *
 * Tests for GOST R 34.11-2012 hash function with 512/256 bits digest. 
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
        define(['gostCoding', 'gostR3411'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('gostCoding'), require('gostR3411'));
    } else {
        if (typeof importScripts !== 'undefined') {
            if (!root.onmessage)
                root.onmessage = function(event) {
                    postMessage((root[event.data.object] || root)[event.data.method].apply(event.data.object || root, event.data.args));
                };
            importScripts('gostCoding.js', 'gostR3411.js');
        }
        root.GostR3411_test = factory(root.gostCoding, root.GostR3411);
    }
}(this, function(gostCoding, GostR3411) {

    var root = this;

    /* ========== Tests ========== */

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

    function perform(cipher, id, array, digest, method, param) {
        var start, finish, out, r, test;

        start = (new Date).getTime();
        r = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
        try {
            method = method || 'digest';
            out = gostCoding.Hex.encode(cipher[method](array, param));
            finish = (new Date).getTime();
            out = out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase();
            test = 0 + (out !== digest.toLowerCase());
            if (test)
                r += 'FAILED: Expected ' + digest + " got " + out;
            else
                r += 'PASSED ' + (finish - start) / 1000 + ' sec';
        } catch (e) {
            r += 'FAILED - Throw error: ' + e.message;
        }

        println(r);
        return test;
    }

    return function(performance) {

        gostCoding = gostCoding || root.gostCoding;
        GostR3411 = GostR3411 || root.GostR3411;

        // GOST R 34.11-94 tests
        var tests = 0, i = 0;
        println('GOST R 34.11-94 TEST', true);

        var cipher = new GostR3411({name: 'GOST R 34.11', version: 1994});

        tests += perform(cipher, ++i,
                gostCoding.Chars.decode(''),
                '981e5f3ca30c841487830f84fb433e13ac1101569b9c13584ac483234cd656c0');
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('This is message, length=32 bytes'),
                '2cefc2f7b7bdc514e18ea57fa74ff357e7fa17d652c75f69cb1be7893ede48eb');
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('Suppose the original message has length = 50 bytes'),
                'c3730c5cbccacf915ac292676f21e8bd4ef75331d9405e5f1a61dc3130a65011');
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'),
                '73b70a39497de53a6e08c67b6d4db853540f03e9389299d9b0156ef7e85d0f61');
        println();

        cipher = new GostR3411({name: 'GOST R 34.11', version: 1994, sBox: 'D-TEST'});

        tests += perform(cipher, ++i,
                gostCoding.Chars.decode(''),
                'ce85b99cc46752fffee35cab9a7b0278abb4c2d2055cff685af4912c49490f8d');
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('This is message, length=32 bytes'),
                'b1c466d37519b82e8319819ff32595e047a28cb6f83eff1c6916a815a637fffa');
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('Suppose the original message has length = 50 bytes'),
                '471aba57a60a770d3a76130635c1fbea4ef14de51f78b4ae57dd893b62f55208');
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'),
                '95c1af627c356496d80274330b2cff6a10c67b5f597087202f94d06d2338cf8e');
        println();

        println('PBKDF2 tests');
        cipher = new GostR3411({name: 'GOST R 34.11', version: 1994, mode: 'PBKDF2', salt: gostCoding.Chars.decode('salt'), iterations: 1});
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('password'),
                '7314e7c04fb2e662c543674253f68bd0b73445d07f241bed872882da21662d58', 'deriveKey');
        cipher = new GostR3411({name: 'GOST R 34.11', version: 1994, mode: 'PBKDF2', salt: gostCoding.Chars.decode('salt'), iterations: 2});
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('password'),
                '990dfa2bd965639ba48b07b792775df79f2db34fef25f274378872fed7ed1bb3', 'deriveKey');
        cipher = new GostR3411({name: 'GOST R 34.11', version: 1994, mode: 'PBKDF2', salt: gostCoding.Chars.decode('salt'), iterations: 1000});
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('password'),
                '2b6e0a5cc2103274dd3353fb86e4983c6451f8025a51cd9ddfd33361c6cb572b', 'deriveKey');
        println();

        if (performance) {

            println('PBKDF2 4096 iterations tests');
            cipher = new GostR3411({name: 'GOST R 34.11', version: 1994, mode: 'PBKDF2', salt: gostCoding.Chars.decode('salt'), iterations: 4096});
            tests += perform(cipher, ++i,
                    gostCoding.Chars.decode('password'),
                    '1f1829a94bdff5be10d0aeb36af498e7a97467f3b31116a5a7c1afff9deadafe', 'deriveKey');

            cipher = new GostR3411({name: 'GOST R 34.11', version: 1994, mode: 'PBKDF2', salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'), iterations: 4096});
            tests += perform(cipher, ++i,
                    gostCoding.Chars.decode('passwordPASSWORDpassword'),
                    '788358c69cb2dbe251a7bb17d5f4241f265a792a35becde8d56f326b49c85047b7638acb4764b1fd', 'deriveBits', 320);

            cipher = new GostR3411({name: 'GOST R 34.11', version: 1994, mode: 'PBKDF2', salt: gostCoding.Chars.decode('sa\0lt'), iterations: 4096});
            tests += perform(cipher, ++i,
                    gostCoding.Chars.decode('pass\0word'),
                    '43e06c5590b08c0225242373127edf9c8e9c3291', 'deriveBits', 160);

            println();


            cipher = new GostR3411({name: 'GOST R 34.11', version: 1994});
            println('Million "a" TEST');
            var million_a = new Array(1000001).join('a');
            tests += perform(cipher, ++i,
                    gostCoding.Chars.decode(million_a),
                    '8693287aa62f9478f7cb312ec0866b6c4e4a0f11160441e8f4ffcd2715dd554f');
            println();
        }
        println('TOTAL ' + (tests ? tests + ' ERRORS' : 'OK'));
        println();

        // GOST R 34.11-2012 tests
        var tests2 = 0;
        i = 0;
        println('GOST R 34.11-2012 TEST', true);

        cipher = new GostR3411();
        tests2 += perform(cipher, ++i,
                gostCoding.Chars.decode('012345678901234567890123456789012345678901234567890123456789012'),
                '9d151eefd8590b89daa6ba6cb74af9275dd051026bb149a452fd84e5e57b5500');
        tests2 += perform(cipher, ++i,
                gostCoding.Chars.decode('Се ветри, Стрибожи внуци, веютъ с моря стрелами на храбрыя плъкы Игоревы'),
                '9dd2fe4e90409e5da87f53976d7405b0c0cac628fc669a741d50063c557e8f50');
        tests2 += perform(cipher, ++i, new Uint8Array(0),
                '3f539a213e97c802cc229d474c6aa32a825a360b2a933a949fd925208d9ce1bb');
        tests2 += perform(cipher, ++i, new Uint8Array([
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
                'df1fda9ce83191390537358031db2ecaa6aa54cd0eda241dc107105e13636b95');
        println();

        cipher = new GostR3411({name: 'GOST R 34.11', mode: 'PBKDF2', salt: gostCoding.Chars.decode('salt'), iterations: 1000});
        tests += perform(cipher, ++i,
                gostCoding.Chars.decode('password'),
                'c5f66589be62e183038e5dee22ea3d7a32afb314abd9970dc8f66858d1a924f4', 'deriveKey');
        println();
        
        cipher = new GostR3411({name: 'GOST R 34.11', length: 512});

        tests2 += perform(cipher, ++i, gostCoding.Chars.decode('012345678901234567890123456789012345678901234567890123456789012'),
                '1b54d01a4af5b9d5cc3d86d68d285462b19abc2475222f35c085122be4ba1ffa00ad30f8767b3a82384c6574f024c311e2a481332b08ef7f41797891c1646f48');
        tests2 += perform(cipher, ++i, gostCoding.Chars.decode('Се ветри, Стрибожи внуци, веютъ с моря стрелами на храбрыя плъкы Игоревы'),
                '1e88e62226bfca6f9994f1f2d51569e0daf8475a3b0fe61a5300eee46d961376035fe83549ada2b8620fcd7c496ce5b33f0cb9dddc2b6460143b03dabac9fb28');
        tests2 += perform(cipher, ++i, new Uint8Array(0),
                '8e945da209aa869f0455928529bcae4679e9873ab707b55315f56ceb98bef0a7362f715528356ee83cda5f2aac4c6ad2ba3a715c1bcd81cb8e9f90bf4c1c1a8a');
        tests2 += perform(cipher, ++i, new Uint8Array([
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
                'b0fd29ac1b0df441769ff3fdb8dc564df67721d6ac06fb28ceffb7bbaa7948c6c014ac999235b58cb26fb60fb112a145d7b4ade9ae566bf2611402c552d20db7');
        println();

        if (performance) {

            println('PBKDF2 4096 iterations tests');
            cipher = new GostR3411({name: 'GOST R 34.11', mode: 'PBKDF2', salt: gostCoding.Chars.decode('salt'), iterations: 4096});
            tests += perform(cipher, ++i,
                    gostCoding.Chars.decode('password'),
                    'd744dc35ddfe10c7679af205ceb6492fb3680f861db598ee8110b30e3a0f3cb4', 'deriveKey');

            cipher = new GostR3411({name: 'GOST R 34.11', mode: 'PBKDF2', salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'), iterations: 4096});
            tests += perform(cipher, ++i,
                    gostCoding.Chars.decode('passwordPASSWORDpassword'),
                    '8452d34400e6404864f12206a2ac3f932fe7fe55026b1dd8f21a645cf340cbf0cca377e603024e82', 'deriveBits', 320);

            cipher = new GostR3411({name: 'GOST R 34.11', mode: 'PBKDF2', salt: gostCoding.Chars.decode('sa\0lt'), iterations: 4096});
            tests += perform(cipher, ++i,
                    gostCoding.Chars.decode('pass\0word'),
                    '5023f9b3cc41e5aa491ea3e9eb65b6c01ffbeb63', 'deriveBits', 160);

            println();

            cipher = new GostR3411();
            println('Million "a" TEST');
            var million_a = gostCoding.Chars.decode(new Array(1000001).join('a'));
            tests += perform(cipher, ++i, million_a,
                    '841af1a0b2f92a800fb1b7e4aabc8e48763153c448a0fc57c90ba830e130f152');
            cipher = new GostR3411({name: 'GOST R 34.11', length: '512'});
            tests += perform(cipher, ++i, million_a,
                    'd396a40b126b1f324465bfa7aa159859ab33fac02dcdd4515ad231206396a266d0102367e4c544ef47d2294064e1a25342d0cd25ae3d904b45abb1425ae41095');
            println();
        }

        println('TOTAL ' + (tests2 ? tests2 + ' ERRORS' : 'OK'));
        println();

        return tests + tests2;
    };
}));
