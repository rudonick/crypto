/**
 * Copyright (c) 2015, Rudolf Nickolaev.
 * All rights reserved.
 *
 * GOST 28147-89 Encryption Algorithm
 *
 */

import { GostCoding } from '../src/crypto/gostCoding';
import { GostCipher } from '../src/engine/gostCipher';

const gostCoding = new GostCoding();

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

function perform(id, algorithm, key, input, output) {
    var Hex = gostCoding.Hex;
    if (algorithm.iv)
        (algorithm.iv = Hex.decode(algorithm.iv));

    var cipher = new GostCipher(algorithm);
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

    var cipher = new GostCipher(algorithm);
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

    var cipher = new GostCipher(algorithm);
    var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
    try {
        var out = Hex.encode(cipher.wrapKey(Hex.decode(key), Hex.decode(input)));
        var test = 0 + (output && out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== output.toLowerCase());
        if (!test) {
            var out = Hex.encode(cipher.unwrapKey(Hex.decode(key), Hex.decode(out)));
            test = 0 + (out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== input.toLowerCase());
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
 * @returns {number} of tests
 */
export default function () {
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
    println('GOST 28147-89/GOST R 34.12-2015 TEST', true);

    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', input1, output1);
    tests += perform(++i, { name: 'GOST 28147', block: 'CBC', iv: '1234567890abcdef', sBox: 'D-TEST' },
      '00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF', input2, output2);
    tests += perform(++i, { name: 'GOST 28147', block: 'CTR', iv: '1234567890abcdef', sBox: 'D-TEST' },
      '0011223344556677889900112233445566778899001122334455667788990011', input3, output3);
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', iv: 'aafd12f659cae634', sBox: 'D-TEST' },
      'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5', input4, output4);

    // Tests with parameters, set S-box.
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', input1, output1); // default parameter S-box set to D-TEST
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', iv: '1234567890abcdef', sBox: 'D-TEST' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'b587f7a0814c911d'); //type S-box
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', iv: '1234567890abcdef', sBox: 'E-TEST' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'e8287f53f991d52b');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', shiftBits: 64, iv: '1234567890abcdef', sBox: 'E-A' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'c41009dba22ebe35');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', iv: '1234567890abcdef', sBox: 'E-B', shiftBits: 8 },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '80d8723fcd3aba28');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: 'E-C' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '739f6f95068499b5');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: 'E-D' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '4663f720f4340f57');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: 'D-A' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '5bb0a31d218ed564');
    tests += perform(++i, {
          name: 'GOST 28147',
          block: 'CFB',
          shiftBits: 8,
          iv: '1234567890abcdef',
          sBox: TestSBox
      },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'c3af96ef788667c5');
    tests += perform(++i, { name: 'GOST 28147', block: 'CTR', iv: '1234567890abcdef', sBox: 'E-A' },
      '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', 'bc350e71aa11345709acde', '1bcc2282707c676fb656dc');
    tests += perform(++i, { name: 'GOST 28147', block: 'ECB', sBox: 'E-Z' },
      '8182838485868788898a8b8c8d8e8f80d1d2d3d4d5d6d7d8d9dadbdcdddedfd0',
      '0102030405060708f1f2f3f4f5f6f7f8', 'ce5a5ed7e0577a5fd0cc85ce31635b8b');

    var gkeyBytes5 = "6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49";
    var gkeyBytes6 = "6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49";

    var input5 = "7768617420646f2079612077616e7420666f72206e6f7468696e673f";
    var input6 = "7768617420646f2079612077616e7420666f72206e6f7468696e673f";

    var output5 = "93468a46";
    var output6 = "93468a46";

    // MAC
    println();
    println('MAC sing/verify');
    tests += performMac(++i, { name: 'GOST 28147', mode: 'MAC', sBox: 'E-A' }, gkeyBytes5, input5, output5);
    tests += performMac(++i, { name: 'GOST 28147', mode: 'MAC', sBox: 'E-A' }, gkeyBytes6, input6, output6);

    // Padding
    println();
    println('Padding');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'BIT' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba98765432');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'BIT' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba9876543210');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'PKCS5P' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba98765432');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'PKCS5P' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba9876543210');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'ZERO' },
      '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba9876543210');

    // Key meshing
    println();
    println('Key meshing');
    var input = new Array(10001).join('61'); // hex(a)
    tests += perform(++i, {
          name: 'GOST 28147',
          block: 'CFB',
          keyMeshing: 'CP',
          iv: '1234567890abcdef',
          sBox: 'E-A'
      },
      '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);
    tests += perform(++i, {
          name: 'GOST 28147',
          block: 'CBC',
          keyMeshing: 'CP',
          iv: '1234567890abcdef',
          sBox: 'E-A'
      },
      '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);
    tests += perform(++i, {
          name: 'GOST 28147',
          block: 'CTR',
          keyMeshing: 'CP',
          iv: '1234567890abcdef',
          sBox: 'E-A'
      },
      '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);
    tests += performMac(++i, {
          name: 'GOST 28147',
          mode: 'MAC',
          keyMeshing: 'CP',
          iv: '1234567890abcdef',
          sBox: 'E-A'
      },
      '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);

    println();
    println('Key wrapping');
    var input = new Array(10001).join('61'); // hex(a)
    tests += performWrap(++i, { name: 'GOST 28147', mode: 'KW', ukm: '1234567890abcdef', sBox: 'D-TEST' }, // Initial UKM seed
      'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5',
      '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49',
      'af502015229a831dc82b4d32dc00173f5d43d921e5e09cc09ce947c777414397022a90c7');
    tests += performWrap(++i, { name: 'GOST 28147', mode: 'KW', ukm: '1234567890abcdef', sBox: 'E-A' }, // E-A
      'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5',
      '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49');

    tests += performWrap(++i, { name: 'GOST 28147', sBox: 'D-TEST', ukm: '1234567890abcdef', keyWrapping: 'CP' }, // CryptoPro.
      'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5',
      '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49',
      '16256f060dd3b3d8734a9fcc9ab4c3d04e777dc5c46a2f4c3e411e3597a5bfc32b41e492');

    tests += performWrap(++i, {
          name: 'GOST 28147',
          mode: 'KW',
          keyWrapping: 'CP',
          ukm: '1234567890abcdef',
          sBox: 'E-A'
      }, // CryptoPro E-A
      'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5',
      '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49');

    tests += performWrap(++i, { name: 'GOST 28147', mode: 'KW', keyWrapping: 'SC', sBox: 'E-SC' },
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

    // Tests for new GOST 2015
    println();
    println('GOST R 34.12-2015/64bits');
    var key64 = 'ffeeddccbbaa99887766554433221100f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff';
    var inp64 = '92def06b3c130a59db54c704f8189d204a98fb2e67a8024c8912409b17b57e41';
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015 }, key64, 'fedcba9876543210', '4ee901e5c2d8ca3d');
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015, block: 'ECB' }, key64, inp64,
      '2b073f0494f372a0de70e715d3556e4811d8d9e9eacfbc1e7c68260996c67efb');
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015, block: 'CTR', iv: '12345678' }, key64, inp64,
      '4e98110c97b7b93c3e250d93d6e85d69136d868807b2dbef568eb680ab52a12d');
    tests += perform(++i, {
          name: 'GOST R 34.12',
          version: 2015,
          block: 'CBC',
          iv: '1234567890abcdef234567890abcdef134567890abcdef12'
      },
      key64, inp64, '96d1b05eea683919aff76129abb937b95058b4a1c4bc001920b78b1a7cd7e667');
    tests += perform(++i, {
          name: 'GOST R 34.12',
          version: 2015,
          block: 'CFB',
          iv: '1234567890abcdef234567890abcdef1'
      },
      key64, inp64, 'db37e0e266903c830d46644c1f9a089c24bdd2035315d38bbcc0321421075505');
    tests += perform(++i, {
          name: 'GOST R 34.12',
          version: 2015,
          block: 'OFB',
          iv: '1234567890abcdef234567890abcdef1'
      },
      key64, inp64, 'db37e0e266903c830d46644c1f9a089ca0f83062430e327ec824efb8bd4fdb05');
    tests += performMac(++i, { name: 'GOST R 34.12', version: 2015, mode: 'MAC' },
      key64, inp64, '154e7210');

    println();
    println('GOST R 34.12-2015/128bits');
    var key128 = '8899aabbccddeeff0011223344556677fedcba98765432100123456789abcdef';
    var inp128 = '1122334455667700ffeeddccbbaa998800112233445566778899aabbcceeff0a112233445566778899aabbcceeff0a002233445566778899aabbcceeff0a0011';
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015, length: 128 }, key128,
      '1122334455667700ffeeddccbbaa9988', '7f679d90bebc24305a468d42b9d4edcd');
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015, length: 128 }, key128, inp128,
      '7f679d90bebc24305a468d42b9d4edcdb429912c6e0032f9285452d76718d08bf0ca33549d247ceef3f5a5313bd4b157d0b09ccde830b9eb3a02c4c5aa8ada98');
    tests += perform(++i, {
          name: 'GOST R 34.12',
          version: 2015,
          length: 128,
          block: 'CTR',
          iv: '1234567890abcef0'
      }, key128, inp128,
      'f195d8bec10ed1dbd57b5fa240bda1b885eee733f6a13e5df33ce4b33c45dee4a5eae88be6356ed3d5e877f13564a3a5cb91fab1f20cbab6d1c6d15820bdba73');
    tests += perform(++i, {
          name: 'GOST R 34.12', version: 2015, length: 128, block: 'OFB',
          iv: '1234567890abcef0a1b2c3d4e5f0011223344556677889901213141516171819'
      }, key128, inp128,
      '81800a59b1842b24ff1f795e897abd95ed5b47a7048cfab48fb521369d9326bf66a257ac3ca0b8b1c80fe7fc10288a13203ebbc066138660a0292243f6903150');
    tests += perform(++i, {
          name: 'GOST R 34.12', version: 2015, length: 128, block: 'CBC',
          iv: '1234567890abcef0a1b2c3d4e5f0011223344556677889901213141516171819'
      }, key128, inp128,
      '689972d4a085fa4d90e52e3d6d7dcc272826e661b478eca6af1e8e448d5ea5acfe7babf1e91999e85640e8b0f49d90d0167688065a895c631a2d9a1560b63970');
    tests += perform(++i, {
          name: 'GOST R 34.12', version: 2015, length: 128, block: 'CFB',
          iv: '1234567890abcef0a1b2c3d4e5f0011223344556677889901213141516171819'
      }, key128, inp128,
      '81800a59b1842b24ff1f795e897abd95ed5b47a7048cfab48fb521369d9326bf79f2a8eb5cc68d38842d264e97a238b54ffebecd4e922de6c75bd9dd44fbf4d1');
    tests += performMac(++i, { name: 'GOST R 34.12', version: 2015, length: 128, mode: 'MAC' }, key128, inp128,
      '336f4d296059fbe3');

    println();
    println('RC2');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 63
    }, '0000000000000000', '0000000000000000', 'ebb773f993278eff');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 64
    }, 'ffffffffffffffff', 'ffffffffffffffff', '278b27e42e2f0d49');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 64
    }, '3000000000000000', '1000000000000001', '30649edf9be7d2c2');
    tests += perform(++i, { name: 'RC2', version: 1, length: 64 }, '88', '0000000000000000', '61a8a244adacccf0');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 64
    }, '88bca90e90875a', '0000000000000000', '6ccf4308974c267f');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 64
    }, '88bca90e90875a7f0f79c384627bafb2', '0000000000000000', '1a807d272bbe5db1');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 128
    }, '88bca90e90875a7f0f79c384627bafb2', '0000000000000000', '2269552ab0f85ca6');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 129
    }, '88bca90e90875a7f0f79c384627bafb216f80a6f85920584c42fceb0be255daf1e', '0000000000000000', '5b78d3a43dfff1f1');
    println();

    println('TOTAL ' + (tests ? tests + ' ERRORS' : 'OK'));
    println();

    return tests;
};
