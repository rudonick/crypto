/**
 * Copyright (c) 2014, Rudolf Nickolaev.
 * All rights reserved.
 *
 * Tests for GOST 34.12 signature.
 *
 */

import { GostCoding } from '../src/crypto/gostCoding';
import { GostSign } from '../src/engine/gostSign';

const gostCoding = new GostCoding();

/* ========== Tests ========== */

function println(s, h) {
    if (typeof importScripts !== 'undefined') {
        var tag = h ? 'h3' : 'span';
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

function perform(id, algorithm, message, privateKey, publicKey, output) {
    var Hex = gostCoding.Hex;
    if (algorithm.ukm)
        (algorithm.ukm = Hex.decode(algorithm.ukm, true));
    else
        output = false;

    var cipher = new GostSign(algorithm);
    var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
    var data = typeof message === 'string' ? Hex.decode(message, true) : message;

    if (!privateKey) {
        var keyPair = cipher.generateKey();
        privateKey = keyPair.privateKey;
        publicKey = keyPair.publicKey;
        output = false;
    } else {
        privateKey = Hex.decode(privateKey, true);
        publicKey = Hex.decode(publicKey, true);
    }

    try {
        var start, signed, verified;
        start = (new Date).getTime();
        var out = Hex.encode(cipher.sign(privateKey, data), true);
        var test = 0 + (output && out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== output.toLowerCase());
        if (!test) {
            signed = (new Date).getTime();
            test = 0 + (!cipher.verify(publicKey, Hex.decode(out, true), data));
            verified = (new Date).getTime();
            if (!test)
                result += 'PASSED Sign ' + (signed - start) / 1000 + ' sec, Verify ' + (verified - signed) / 1000 + ' sec';
            else
                result += 'FAILED - Verify return (false)';
        } else
            result += 'FAILED - Sign expected ' + output.toLowerCase() + " got " + out.toLowerCase();
    } catch (e) {
        result += 'FAILED - Throw error: ' + e.message;
    }

    println(result);
    return test;
}

function performDerive(id, algorithm) {
    var ukm = algorithm.ukm;
    delete algorithm.ukm;
    var cipher = new GostSign(algorithm);
    var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
    var keyPair1 = cipher.generateKey(),
      keyPair2 = cipher.generateKey(),
      privateKey1 = keyPair1.privateKey,
      publicKey1 = keyPair1.publicKey,
      privateKey2 = keyPair2.privateKey,
      publicKey2 = keyPair2.publicKey;

    try {
        if (ukm)
            (algorithm.ukm = gostCoding.Hex.decode(ukm));

        var start = (new Date).getTime();
        algorithm.public = publicKey2;
        cipher = new GostSign(algorithm);
        var kek1 = gostCoding.Hex.encode(cipher.deriveKey(privateKey1));
        var finish = (new Date).getTime();

        algorithm.public = publicKey1;
        cipher = new GostSign(algorithm);
        var kek2 = gostCoding.Hex.encode(cipher.deriveKey(privateKey2));

        var test = 0 + (kek1 !== kek2);
        if (!test)
            result += 'PASSED DeriveKey ' + (finish - start) / 1000 + ' sec';
        else
            result += 'PASSED DeriveKey - one side got ' + kek1 + ' but other side got ' + kek2;
    } catch (e) {
        result += 'FAILED - Throw error: ' + e.message;
    }
    println(result);
    return test;
}

export default function () {
    // GOST R 34.10 tests
    var tests = 0, i = 0;
    println('GOST R 34.10-94 TEST', true);

    tests += perform(++i, {
          name: 'GOST R 34.10',
          version: 1994,
          namedParam: 'S-TEST',
          ukm: '90F3A564439242F5186EBB224C8E223811B7105C64E4F5390807E6362DF4C72A',
      }, '3534454132454236443134453437313943363345374143423445413631454230',
      '3036314538303830343630454235324435324234314132373832433138443046',
      'ee1902a40692d273edc1b5adc55f91128e35f9d165fa9901caf00d27018ba6df324519c11a6e272526589cd6e6a2eddaafe1c3081259be9fcee667a2701f4352',
      '3F0DD5D4400D47C08E4CE505FF7434B6DBF729592E37C74856DAB85115A609553E5F895E276D81D2D52C0763270A458157B784C57ABDBD807BC44FD43A32AC06');

    println();
    println('TOTAL ' + (tests ? tests + ' ERRORS' : 'OK'));
    println();

    var tests2 = 0;
    i = 0;
    println('GOST R 34.10-2012 TEST', true);

    tests2 += perform(++i, {
          name: 'GOST R 34.10',
          namedCurve: 'S-256-TEST',
          ukm: '77105C9B20BCD3122823C8CF6FCC7B956DE33814E95B7FE64FED924594DCEAB3',
      }, '2DFBC1B372D89A1188C09C52E0EEC61FCE52032AB1022E8E67ECE6672B043EE5',
      '7A929ADE789BB9BE10ED359DD39A72C11B60961F49397EEE1D19CE9891EC3B28',
      '26F1B489D6701DD185C8413A977B3CBBAF64D1C593D26627DFFB101A87FF77DA7F2B49E270DB6D90D8595BEC458B50C58585BA1D4E9B788F6689DBD8E56FD80B',
      '01456C64BA4642A1653C235A98A60249BCD6D3F746B631DF928014F6C5BF9C4041AA28D2F1AB148280CD9ED56FEDA41974053554A42767B83AD043FD39DC0493');

    tests2 += perform(++i, {
          name: 'GOST R 34.10',
          namedCurve: 'T-512-TEST',
          ukm: '359E7F4B1410FEACC570456C6801496946312120B39D019D455986E364F365886748ED7A44B3E794434006011842286212273A6D14CF70EA3AF71BB1AE679F1',
      }, '3754F3CFACC9E0615C4F4A7C4D8DAB531B09B6F9C170C533A71D147035B0C5917184EE536593F4414339976C647C5D5A407ADEDB1D560C4FC6777D2972075B8C',
      'BA6048AADAE241BA40936D47756D7C93091A0E8514669700EE7508E508B102072E8123B2200A0563322DAD2827E2714A2636B7BFD18AADFC62967821FA18DD4',
      '37C7C90CD40B0F5621DC3AC1B751CFA0E2634FA0503B3D52639F5D7FB72AFD61EA199441D943FFE7F0C70A2759A3CDB84C114E1F9339FDF27F35ECA93677BEEC115DC5BC96760C7B48598D8AB9E740D4C4A85A65BE33C1815B5C320C854621DD5A515856D13314AF69BC5B924C8B4DDFF75C45415C1D9DD9DD33612CD530EFE1',
      '1081B394696FFE8E6585E7A9362D26B6325F56778AADBC081C0BFBE933D52FF5823CE288E8C4F362526080DF7F70CE406A6EEB1F56919CB92A9853BDE73E5B4A2F86FA60A081091A23DD795E1E3C689EE512A3C82EE0DCC2643C78EEA8FCACD35492558486B20F1C9EC197C90699850260C93BCBCD9C5C3317E19344E173AE36');

    // Free random generator
    tests2 += perform(++i, {
          name: 'GOST R 34.10',
          namedCurve: 'S-256-TEST',
      }, '2DFBC1B372D89A1188C09C52E0EEC61FCE52032AB1022E8E67ECE6672B043EE5',
      '7A929ADE789BB9BE10ED359DD39A72C11B60961F49397EEE1D19CE9891EC3B28',
      '26F1B489D6701DD185C8413A977B3CBBAF64D1C593D26627DFFB101A87FF77DA7F2B49E270DB6D90D8595BEC458B50C58585BA1D4E9B788F6689DBD8E56FD80B');

    // Free key & random generator
    tests2 += perform(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'S-256-TEST',
    }, '2DFBC1B372D89A1188C09C52E0EEC61FCE52032AB1022E8E67ECE6672B043EE5');

    // GostDigest-94-with-Gost-3410-2001
    tests2 += perform(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'S-256-TEST',
        hash: {
            name: 'GOST R 34.11',
            version: 1994
        }
    }, gostCoding.Chars.decode('Suppose the original message has length = 50 bytes'));

    // GostDigest-2012-with-Gost-3410-2012
    tests2 += perform(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'T-512-TEST',
        hash: {
            name: 'GOST R 34.11'
        }
    }, gostCoding.Chars.decode('Се ветри, Стрибожи внуци, веютъ с моря стрелами на храбрыя плъкы Игоревы'));

    // Derive key
    println();
    println('Key exchange scenario');
    performDerive(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'S-256-TEST',
        mode: 'DH',
        ukm: '77105C9B20BCD312'
    });
    performDerive(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'X-256-A',
        mode: 'DH',
        ukm: '77105C9B20BCD312',
        hash: {
            name: 'GOST R 34.11'
        }
    });
    performDerive(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'X-256-A',
        mode: 'DH',
        ukm: '77105C9B20BCD312',
        hash: {
            name: 'GOST R 34.11',
            version: 1994
        }
    });

    println();

    println('TOTAL ' + (tests2 ? tests2 + ' ERRORS' : 'OK'));
    println();

    return tests + tests2;
};


var pk = '34BF9806FD77DF19F2BD0E3085FF53C1E18C3B58A0CD82BDA7466D9CC259FA23';
var maskdb = '5d6f4f794c0f584718252fb2d9ffffe6d2adc4c86616466fe032ed28790e6af6';
var mkdb = '\
2208cd6bc96a009f05175f635bee6cc09c78260b9b7eee1e070d346462e6881b\
bf572f436df5716b1212a9fba3d022db4aed0a18530ae6c62d9bdd206479805c\
e652c17bc9cc07dcdce25cba19276285f6c54dfa940ab55473bde2d8338eaaed\
c59cdd808619f75296db91e016b588c0650686ff6929258a76d5ca7ba91b7fa8\
7f41b2deb535a66b489a5485ac68971e00658836ce358dcda04b358621ebf08c\
e062b671d84a30706495ee2ed7d0f0a6a3e171a9daba04b582c3b7113905053a\
5b9254c7e08bea27cb66e19699db55444f1e1f1b5a3b7db7cbcc04728e225e67\
ab8099dc82b1';
var kek = '7c34bf4e03d0bc120768164f355cf6180b32851e2ad6fc22b386bbea17fa1d5f1789eb95';

//var sign0 = 'EE92016C722C08F2FED0310E7D1C8D4EFD7224F52E53C3499E8A5392A2F41D04575BE6077F8E4008B3C3CCEC2EAC3BEC0AA0AA2AF6EFCB1D3906F2426D0394C2';
//var pubkey =  '51cd2d8d96c67e0cf1ee74319cf89043c5f30ba34b68c8fc2284b5ef9e574eea0783c50ea37a2d3f2e222c038980ab0a182fe38945911e9513dfa6b1e87df63a';

var sign0 = '575BE6077F8E4008B3C3CCEC2EAC3BEC0AA0AA2AF6EFCB1D3906F2426D0394C2EE92016C722C08F2FED0310E7D1C8D4EFD7224F52E53C3499E8A5392A2F41D04';
var pubkey = '0783c50ea37a2d3f2e222c038980ab0a182fe38945911e9513dfa6b1e87df63a51cd2d8d96c67e0cf1ee74319cf89043c5f30ba34b68c8fc2284b5ef9e574eea';

