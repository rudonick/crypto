/**
 * Copyright (c) 2014, Rudolf Nickolaev.
 * All rights reserved.
 *
 * Tests for GOST R 34.11-2012 hash function with 512/256 bits digest.
 *
 */

import { GostCoding } from '../src/crypto/gostCoding';
import { GostDigest } from '../src/engine/gostDigest';

const gostCoding = new GostCoding();

/* ========== Tests ========== */

function println(s, h) {
    if (typeof importScripts !== 'undefined') {
        var tag = h ? 'h3' : 'div';
        if (typeof postMessage !== 'undefined') {
            postMessage({ log: '<' + tag + '>' + (s || '&nbsp') + '</' + tag + '>' });
        } else {
            console.log(s, h);
        }

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

export default function (performance) {
    // GOST R 34.11-94 tests
    var tests = 0, i = 0;
    println('GOST R 34.11-94 TEST', true);

    var cipher = new GostDigest({ name: 'GOST R 34.11', version: 1994 });

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

    cipher = new GostDigest({ name: 'GOST R 34.11', version: 1994, sBox: 'D-TEST' });

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
    cipher = new GostDigest({
        name: 'GOST R 34.11',
        version: 1994,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1
    });
    tests += perform(cipher, ++i,
      gostCoding.Chars.decode('password'),
      '7314e7c04fb2e662c543674253f68bd0b73445d07f241bed872882da21662d58', 'deriveKey');
    cipher = new GostDigest({
        name: 'GOST R 34.11',
        version: 1994,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 2
    });
    tests += perform(cipher, ++i,
      gostCoding.Chars.decode('password'),
      '990dfa2bd965639ba48b07b792775df79f2db34fef25f274378872fed7ed1bb3', 'deriveKey');
    cipher = new GostDigest({
        name: 'GOST R 34.11',
        version: 1994,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1000
    });
    tests += perform(cipher, ++i,
      gostCoding.Chars.decode('password'),
      '2b6e0a5cc2103274dd3353fb86e4983c6451f8025a51cd9ddfd33361c6cb572b', 'deriveKey');
    println();

    if (performance) {

        println('PBKDF2 4096 iterations tests');
        cipher = new GostDigest({
            name: 'GOST R 34.11',
            version: 1994,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('salt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i,
          gostCoding.Chars.decode('password'),
          '1f1829a94bdff5be10d0aeb36af498e7a97467f3b31116a5a7c1afff9deadafe', 'deriveKey');

        cipher = new GostDigest({
            name: 'GOST R 34.11',
            version: 1994,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i,
          gostCoding.Chars.decode('passwordPASSWORDpassword'),
          '788358c69cb2dbe251a7bb17d5f4241f265a792a35becde8d56f326b49c85047b7638acb4764b1fd', 'deriveBits', 320);

        cipher = new GostDigest({
            name: 'GOST R 34.11',
            version: 1994,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('sa\0lt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i,
          gostCoding.Chars.decode('pass\0word'),
          '43e06c5590b08c0225242373127edf9c8e9c3291', 'deriveBits', 160);

        println();


        cipher = new GostDigest({ name: 'GOST R 34.11', version: 1994 });
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

    cipher = new GostDigest();
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

    cipher = new GostDigest({
        name: 'GOST R 34.11', version: 2012, mode: 'KDF', context: gostCoding.Hex.decode('af21434145656378'),
        label: gostCoding.Hex.decode('26bdb878')
    });
    tests += perform(cipher, ++i,
      gostCoding.Hex.decode('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'),
      'a1aa5f7de402d7b3d323f2991c8d4534013137010a83754fd0af6d7cd4922ed9', 'deriveKey');
    cipher = new GostDigest({
        name: 'GOST R 34.11', version: 2012, mode: 'KDF', context: gostCoding.Hex.decode('af21434145656378'),
        label: gostCoding.Hex.decode('26bdb878')
    });
    tests += perform(cipher, ++i,
      gostCoding.Hex.decode('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'),
      '22b6837845c6bef65ea71672b265831086d3c76aebe6dae91cad51d83f79d16b074c9330599d7f8d712fca54392f4ddde93751206b3584c8f43f9e6dc51531f9', 'deriveBits', 512);
    println();

    println('HMAC/PBKDF2 tests');
    cipher = new GostDigest({ name: 'GOST R 34.11', mode: 'HMAC' });
    tests += perform(cipher, ++i, gostCoding.Hex.decode('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'),
      'a1aa5f7de402d7b3d323f2991c8d4534013137010a83754fd0af6d7cd4922ed9', 'sign', gostCoding.Hex.decode('0126bdb87800af214341456563780100'));
    cipher = new GostDigest({ name: 'GOST R 34.11', length: 512, mode: 'HMAC' });
    tests += perform(cipher, ++i, gostCoding.Hex.decode('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'),
      'a59bab22ecae19c65fbde6e5f4e9f5d8549d31f037f9df9b905500e171923a773d5f1530f2ed7e964cb2eedc29e9ad2f3afe93b2814f79f5000ffc0366c251e6',
      'sign', gostCoding.Hex.decode('0126bdb87800af214341456563780100'));
    cipher = new GostDigest({
        name: 'GOST R 34.11',
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1000
    });
    tests += perform(cipher, ++i, gostCoding.Chars.decode('password'),
      'c5f66589be62e183038e5dee22ea3d7a32afb314abd9970dc8f66858d1a924f4', 'deriveKey');
    cipher = new GostDigest({
        name: 'GOST R 34.11',
        length: 512,
        procreator: 'VN',
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1
    });
    tests += perform(cipher, ++i, gostCoding.Chars.decode('password'),
      'bcd19a1c423a63e72e47ef0f56566c726745d96ac1a1c127b2edadb45fb45b307aca15999e91f640f4818f68af716e30fd543c52026bbb295d100eb471339f46', 'deriveBits', 512);
    cipher = new GostDigest({
        name: 'GOST R 34.11',
        length: 512,
        procreator: 'VN',
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 2
    });
    tests += perform(cipher, ++i, gostCoding.Chars.decode('password'),
      '088fec3b0f1ffaf0615eb267de92907fd4e0bb89d2f5ef9d4111a80e3cbf231af07ba3ce96065395f8f1a7505f9781f97e99a26b8314907dbf3510bc3ca2000c', 'deriveBits', 512);
    println();

    cipher = new GostDigest({ name: 'GOST R 34.11', length: 512 });

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
        cipher = new GostDigest({
            name: 'GOST R 34.11',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('salt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i,
          gostCoding.Chars.decode('password'),
          'd744dc35ddfe10c7679af205ceb6492fb3680f861db598ee8110b30e3a0f3cb4', 'deriveKey');

        cipher = new GostDigest({
            name: 'GOST R 34.11',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i,
          gostCoding.Chars.decode('passwordPASSWORDpassword'),
          '8452d34400e6404864f12206a2ac3f932fe7fe55026b1dd8f21a645cf340cbf0cca377e603024e82', 'deriveBits', 320);

        cipher = new GostDigest({
            name: 'GOST R 34.11',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('sa\0lt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i,
          gostCoding.Chars.decode('pass\0word'),
          '5023f9b3cc41e5aa491ea3e9eb65b6c01ffbeb63', 'deriveBits', 160);

        cipher = new GostDigest({
            name: 'GOST R 34.11',
            length: 512,
            procreator: 'VN',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('salt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('password'),
          '596f63971eae970a4eac9c18bff42ec52b936c1ccac6d17caa308afe12d4ff31943180ce02e42956524e991392c4bddeb7077edc1d2abf52eaf72b9e32a8c605', 'deriveBits', 512);

        cipher = new GostDigest({
            name: 'GOST R 34.11',
            length: 512,
            procreator: 'VN',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('passwordPASSWORDpassword'),
          'e457ee6126f07c09be004ba512adc90c611c2b3fa11141c21196dae5a48a50d83ccf163233f014fb6ade71695bf37159e9062443b75dac911fa7a181d24c4ed2a910499d72aba93284c78dbc1acba2789bd8ef50b5052f33ec6e2491f4f74eda05723864', 'deriveBits', 800);

        cipher = new GostDigest({
            name: 'GOST R 34.11',
            length: 512,
            procreator: 'VN',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('sa\0lt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('pass\0word'),
          'eed92e8d76e18d6a632f2da65c9b2859af555c3335ea30095989dea14d9d093114668e329deb034cc1565c3d731de0b5ca11acbdf85ab9eaab15295df05b9805', 'deriveBits', 512);

        println();

        cipher = new GostDigest();
        println('Million "a" TEST');
        var million_a = gostCoding.Chars.decode(new Array(1000001).join('a'));
        tests += perform(cipher, ++i, million_a,
          '841af1a0b2f92a800fb1b7e4aabc8e48763153c448a0fc57c90ba830e130f152');
        cipher = new GostDigest({ name: 'GOST R 34.11', length: '512' });
        tests += perform(cipher, ++i, million_a,
          'd396a40b126b1f324465bfa7aa159859ab33fac02dcdd4515ad231206396a266d0102367e4c544ef47d2294064e1a25342d0cd25ae3d904b45abb1425ae41095');
        println();
    }

    println('TOTAL ' + (tests2 ? tests2 + ' ERRORS' : 'OK'));
    println();

    // SHA-1 tests
    var tests3 = 0;
    i = 0;
    println('SHA-1 TEST', true);

    var cipher = new GostDigest({ name: 'SHA', version: 1 });
    tests3 += perform(cipher, ++i,
      gostCoding.Chars.decode('abc'),
      'a9993e364706816aba3e25717850C26c9cd0d89d');
    tests3 += perform(cipher, ++i,
      gostCoding.Chars.decode('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'),
      '84983e441c3bd26ebaae4aa1f95129e5e54670f1');

    tests3 += perform(cipher, ++i,
      gostCoding.Chars.decode(new Array(11).join('0123456701234567012345670123456701234567012345670123456701234567')),
      'dea356a2cddd90c7a7ecedc5ebb563934f460452');

    println();

    println('PBKDF2 tests');
    cipher = new GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1
    });
    tests3 += perform(cipher, ++i,
      gostCoding.Chars.decode('password'),
      '0c60c80f961f0e71f3a9b524af6012062fe037a6', 'deriveKey');
    cipher = new GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 2
    });
    tests3 += perform(cipher, ++i,
      gostCoding.Chars.decode('password'),
      'ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957', 'deriveKey');
    cipher = new GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PFXKDF',
        salt: gostCoding.Hex.decode('0A58CF64530D823F'),
        iterations: 1
    });
    tests3 += perform(cipher, ++i,
      gostCoding.Hex.decode('0073006D006500670000'),
      '8aaae6297b6cb04642ab5b077851284eb7128f1a2a7fbca3', 'deriveBits', 192);
    cipher = new GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PFXKDF',
        salt: gostCoding.Hex.decode('0A58CF64530D823F'),
        iterations: 1,
        diversifier: 2
    });
    tests3 += perform(cipher, ++i,
      gostCoding.Hex.decode('0073006D006500670000'),
      '79993dfe048d3b76', 'deriveBits', 64);
    cipher = new GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PFXKDF',
        salt: gostCoding.Hex.decode('3D83C0E4546AC140'),
        iterations: 1,
        diversifier: 3
    });
    tests3 += perform(cipher, ++i,
      gostCoding.Hex.decode('0073006D006500670000'),
      '8D967D88F6CAA9D714800AB3D48051D63F73A312', 'deriveBits', 160);
    cipher = new GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PFXKDF',
        salt: gostCoding.Hex.decode('05DEC959ACFF72F7'),
        iterations: 1000,
        diversifier: 1
    });
    tests3 += perform(cipher, ++i,
      gostCoding.Hex.decode('007100750065006500670000'),
      'ED2034E36328830FF09DF1E1A07DD357185DAC0D4F9EB3D4', 'deriveBits', 192);
    println();

    if (performance) {
        println('PBKDF2 4096 iterations tests');
        cipher = new GostDigest({
            name: 'SHA',
            version: 1,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('salt'),
            iterations: 4096
        });
        tests3 += perform(cipher, ++i,
          gostCoding.Chars.decode('password'),
          '4b007901b765489abead49d926f721d065a429c1', 'deriveKey');
        cipher = new GostDigest({
            name: 'SHA',
            version: 1,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'),
            iterations: 4096
        });
        tests3 += perform(cipher, ++i,
          gostCoding.Chars.decode('passwordPASSWORDpassword'),
          '3d2eec4fe41c849b80c8d83662c0e44a8b291a964cf2f07038', 'deriveBits', 200);
        cipher = new GostDigest({
            name: 'SHA',
            version: 1,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('sa\0lt'),
            iterations: 4096
        });
        tests3 += perform(cipher, ++i,
          gostCoding.Chars.decode('pass\0word'),
          '56fa6aa75548099dcc37d7f03425e0c3', 'deriveBits', 128);
        println();

        println('Million "a" TEST');
        var million_a = new Array(1000001).join('a');
        tests3 += perform(cipher, ++i,
          gostCoding.Chars.decode(million_a),
          '34aa973cd4c4daa4f61eeb2bdbad27316534016f');
        println();
    }

    println('TOTAL ' + (tests3 ? tests3 + ' ERRORS' : 'OK'));
    println();

    return tests + tests2;
};
