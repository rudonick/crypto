import { gostEngine } from '../engine/gostEngineSync';
import { getCryptoModule } from '../utils/environment';
import { DataError, NotSupportedError } from '../utils/errors';
import { gostASN1Instance } from './gostASN1';


class InvalidStateError extends Error {
}

class InvalidAccessError extends Error {
}

/*
 * Algorithm normalization
 *
 */ // <editor-fold defaultstate="collapsed">

const rootCrypto = getCryptoModule();

// Normalize algorithm
function normalize(algorithm, method) {
    if (typeof algorithm === 'string' || algorithm instanceof String)
        algorithm = { name: algorithm };
    var name = algorithm.name;
    if (!name)
        throw new SyntaxError('Algorithm name not defined');
    // Extract algorithm modes from name
    var modes = name.split('/'), modes = modes[0].split('-').concat(modes.slice(1));
    // Normalize the name with default modes
    var na = {};
    name = modes[0].replace(/[\.\s]/g, '');
    modes = modes.slice(1);
    if (name.indexOf('28147') >= 0) {
        na = {
            name: 'GOST 28147',
            version: 1989,
            mode: (algorithm.mode || (// ES, MAC, KW
              (method === 'sign' || method === 'verify') ? 'MAC' :
                (method === 'wrapKey' || method === 'unwrapKey') ? 'KW' : 'ES')).toUpperCase(),
            length: algorithm.length || 64
        };
    } else if (name.indexOf('3412') >= 0) {
        na = {
            name: 'GOST R 34.12',
            version: 2015,
            mode: (algorithm.mode || (// ES, MAC, KW
              (method === 'sign' || method === 'verify') ? 'MAC' :
                (method === 'wrapKey' || method === 'unwrapKey') ? 'KW' : 'ES')).toUpperCase(),
            length: algorithm.length || 64 // 128
        };
    } else if (name.indexOf('3411') >= 0) {
        na = {
            name: 'GOST R 34.11',
            version: 2012, // 1994
            mode: (algorithm.mode || (// HASH, KDF, HMAC, PBKDF2, PFXKDF, CPKDF
              (method === 'deriveKey' || method === 'deriveBits') ? 'KDF' :
                (method === 'sign' || method === 'verify') ? 'HMAC' : 'HASH')).toUpperCase(),
            length: algorithm.length || 256 // 512
        };
    } else if (name.indexOf('3410') >= 0) {
        na = {
            name: 'GOST R 34.10',
            version: 2012, // 1994, 2001
            mode: (algorithm.mode || (// SIGN, DH, MASK
              (method === 'deriveKey' || method === 'deriveBits') ? 'DH' : 'SIGN')).toUpperCase(),
            length: algorithm.length || 256 // 512
        };
    } else if (name.indexOf('SHA') >= 0) {
        na = {
            name: 'SHA',
            version: (algorithm.length || 160) === 160 ? 1 : 2, // 1, 2
            mode: (algorithm.mode || (// HASH, KDF, HMAC, PBKDF2, PFXKDF
              (method === 'deriveKey' || method === 'deriveBits') ? 'KDF' :
                (method === 'sign' || method === 'verify') ? 'HMAC' : 'HASH')).toUpperCase(),
            length: algorithm.length || 160
        };
    } else if (name.indexOf('RC2') >= 0) {
        na = {
            name: 'RC2',
            version: 1,
            mode: (algorithm.mode || (// ES, MAC, KW
              (method === 'sign' || method === 'verify') ? 'MAC' :
                (method === 'wrapKey' || method === 'unwrapKey') ? 'KW' : 'ES')).toUpperCase(),
            length: algorithm.length || 32 // 1 - 1024
        };
    } else if (name.indexOf('PBKDF2') >= 0) {
        na = normalize(algorithm.hash, 'digest');
        na.mode = 'PBKDF2';
    } else if (name.indexOf('PFXKDF') >= 0) {
        na = normalize(algorithm.hash, 'digest');
        na.mode = 'PFXKDF';
    } else if (name.indexOf('CPKDF') >= 0) {
        na = normalize(algorithm.hash, 'digest');
        na.mode = 'CPKDF';
    } else if (name.indexOf('HMAC') >= 0) {
        na = normalize(algorithm.hash, 'digest');
        na.mode = 'HMAC';
    } else
        throw new NotSupportedError('Algorithm not supported');

    // Compile modes
    modes.forEach(function (mode) {
        mode = mode.toUpperCase();
        if (/^[0-9]+$/.test(mode)) {
            if ((['8', '16', '32'].indexOf(mode) >= 0) || (na.length === '128' && mode === '64')) { // Shift bits
                if (na.mode === 'ES')
                    na.shiftBits = parseInt(mode);
                else if (na.mode === 'MAC')
                    na.macLength = parseInt(mode);
                else
                    throw new NotSupportedError('Algorithm ' + na.name + ' mode ' + mode + ' not supported');
            } else if (['89', '94', '01', '12', '15', '1989', '1994', '2001', '2012', '2015'].indexOf(mode) >= 0) { // GOST Year
                var version = parseInt(mode);
                version = version < 1900 ? (version < 80 ? 2000 + version : 1900 + version) : version;
                na.version = version;
            } else if (['1'].indexOf(mode) >= 0 && na.name === 'SHA') { // SHA-1
                na.version = 1;
                na.length = 160;
            } else if (['256', '384', '512'].indexOf(mode) >= 0 && na.name === 'SHA') { // SHA-2
                na.version = 2;
                na.length = parseInt(mode);
            } else if (['40', '128'].indexOf(mode) >= 0 && na.name === 'RC2') { // RC2
                na.version = 1;
                na.length = parseInt(mode); // key size
            } else if (['64', '128', '256', '512'].indexOf(mode) >= 0) // block size
                na.length = parseInt(mode);
            else if (['1000', '2000'].indexOf(mode) >= 0) // Iterations
                na.iterations = parseInt(mode);
            // Named Paramsets
        } else if (['E-TEST', 'E-A', 'E-B', 'E-C', 'E-D', 'E-SC', 'E-Z', 'D-TEST', 'D-A', 'D-SC'].indexOf(mode) >= 0) {
            na.sBox = mode;
        } else if (['S-TEST', 'S-A', 'S-B', 'S-C', 'S-D', 'X-A', 'X-B', 'X-C'].indexOf(mode) >= 0) {
            na.namedParam = mode;
        } else if (['S-256-TEST', 'S-256-A', 'S-256-B', 'S-256-C', 'P-256', 'T-512-TEST', 'T-512-A',
            'T-512-B', 'X-256-A', 'X-256-B', 'T-256-TEST', 'T-256-A', 'T-256-B', 'S-256-B', 'T-256-C', 'S-256-C'].indexOf(mode) >= 0) {
            na.namedCurve = mode;
        } else if (['SC', 'CP', 'VN'].indexOf(mode) >= 0) {
            na.procreator = mode;

            // Encription GOST 28147 or GOST R 34.12
        } else if (na.name === 'GOST 28147' || na.name === 'GOST R 34.12' || na.name === 'RC2') {
            if (['ES', 'MAC', 'KW', 'MASK'].indexOf(mode) >= 0) {
                na.mode = mode;
            } else if (['ECB', 'CFB', 'OFB', 'CTR', 'CBC'].indexOf(mode) >= 0) {
                na.mode = 'ES';
                na.block = mode;
            } else if (['CPKW', 'NOKW', 'SCKW'].indexOf(mode) >= 0) {
                na.mode = 'KW';
                na.keyWrapping = mode.replace('KW', '');
            } else if (['ZEROPADDING', 'PKCS5PADDING', 'NOPADDING', 'RANDOMPADDING', 'BITPADDING'].indexOf(mode) >= 0) {
                na.padding = mode.replace('PADDING', '');
            } else if (['NOKM', 'CPKM'].indexOf(mode) >= 0) {
                na.keyMeshing = mode.replace('KM', '');
            } else
                throw new NotSupportedError('Algorithm ' + na.name + ' mode ' + mode + ' not supported');

            // Digesting GOST 34.11
        } else if (na.name === 'GOST R 34.11' || na.name === 'SHA') {
            if (['HASH', 'KDF', 'HMAC', 'PBKDF2', 'PFXKDF', 'CPKDF'].indexOf(mode) >= 0)
                na.mode = mode;
            else
                throw new NotSupportedError('Algorithm ' + na.name + ' mode ' + mode + ' not supported');

            // Signing GOST 34.10
        } else if (na.name === 'GOST R 34.10') {
            var hash = mode.replace(/[\.\s]/g, '');
            if (hash.indexOf('GOST') >= 0 && hash.indexOf('3411') >= 0)
                na.hash = mode;
            else if (['SIGN', 'DH', 'MASK'].indexOf(mode))
                na.mode = mode;
            else
                throw new NotSupportedError('Algorithm ' + na.name + ' mode ' + mode + ' not supported');
        }
    });

    // Procreator
    na.procreator = algorithm.procreator || na.procreator || 'CP';

    // Key size
    switch (na.name) {
        case 'GOST R 34.10':
            na.keySize = na.length / (na.version === 1994 ? 4 : 8);
            break;
        case 'GOST R 34.11':
            na.keySize = 32;
            break;
        case 'GOST 28147':
        case 'GOST R 34.12':
            na.keySize = 32;
            break;
        case 'RC2':
            na.keySize = Math.ceil(na.length / 8);
            break;
        case 'SHA':
            na.keySize = na.length / 8;
            break;
    }

    // Encrypt additional modes
    if (na.mode === 'ES') {
        if (algorithm.block)
            na.block = algorithm.block; // ECB, CFB, OFB, CTR, CBC
        if (na.block)
            na.block = na.block.toUpperCase();
        if (algorithm.padding)
            na.padding = algorithm.padding; // NO, ZERO, PKCS5, RANDOM, BIT
        if (na.padding)
            na.padding = na.padding.toUpperCase();
        if (algorithm.shiftBits)
            na.shiftBits = algorithm.shiftBits; // 8, 16, 32, 64
        if (algorithm.keyMeshing)
            na.keyMeshing = algorithm.keyMeshing; // NO, CP
        if (na.keyMeshing)
            na.keyMeshing = na.keyMeshing.toUpperCase();
        // Default values
        if (method !== 'importKey' && method !== 'generateKey') {
            na.block = na.block || 'ECB';
            na.padding = na.padding || (na.block === 'CBC' || na.block === 'ECB' ? 'ZERO' : 'NO');
            if (na.block === 'CFB' || na.block === 'OFB')
                na.shiftBits = na.shiftBits || na.length;
            na.keyMeshing = na.keyMeshing || 'NO';
        }
    }
    if (na.mode === 'KW') {
        if (algorithm.keyWrapping)
            na.keyWrapping = algorithm.keyWrapping; // NO, CP, SC
        if (na.keyWrapping)
            na.keyWrapping = na.keyWrapping.toUpperCase();
        if (method !== 'importKey' && method !== 'generateKey')
            na.keyWrapping = na.keyWrapping || 'NO';
    }

    // Paramsets
    ['sBox', 'namedParam', 'namedCurve', 'curve', 'param', 'modulusLength'].forEach(function (name) {
        algorithm[name] && (na[name] = algorithm[name]);
    });
    // Default values
    if (method !== 'importKey' && method !== 'generateKey') {
        if (na.name === 'GOST 28147') {
            na.sBox = na.sBox || (na.procreator === 'SC' ? 'E-SC' : 'E-A'); // 'E-A', 'E-B', 'E-C', 'E-D', 'E-SC'
        } else if (na.name === 'GOST R 34.12' && na.length === 64) {
            na.sBox = 'E-Z';
        } else if (na.name === 'GOST R 34.11' && na.version === 1994) {
            na.sBox = na.sBox || (na.procreator === 'SC' ? 'D-SC' : 'D-A'); // 'D-SC'
        } else if (na.name === 'GOST R 34.10' && na.version === 1994) {
            na.namedParam = na.namedParam || (na.mode === 'DH' ? 'X-A' : 'S-A'); // 'S-B', 'S-C', 'S-D', 'X-B', 'X-C'
        } else if (na.name === 'GOST R 34.10' && na.version === 2001) {
            na.namedCurve = na.namedCurve || (na.length === 256 ?
              na.procreator === 'SC' ? 'P-256' : (na.mode === 'DH' ? 'X-256-A' : 'S-256-A') : // 'S-256-B', 'S-256-C', 'X-256-B', 'T-256-A', 'T-256-B', 'T-256-C', 'P-256'
              na.mode === 'T-512-A'); // 'T-512-B', 'T-512-C'
        } else if (na.name === 'GOST R 34.10' && na.version === 2012) {
            na.namedCurve = na.namedCurve || (na.length === 256 ?
              na.procreator === 'SC' ? 'P-256' : (na.mode === 'DH' ? 'X-256-A' : 'S-256-A') : // 'S-256-B', 'S-256-C', 'X-256-B', 'T-256-A', 'T-256-B', 'T-256-C', 'P-256'
              na.mode === 'T-512-A'); // 'T-512-B', 'T-512-C'
        }
    }

    // Vectors
    switch (na.mode) {
        case 'DH':
            algorithm.ukm && (na.ukm = algorithm.ukm);
            algorithm['public'] && (na['public'] = algorithm['public']);
            break;
        case 'SIGN':
        case 'KW':
            algorithm.ukm && (na.ukm = algorithm.ukm);
            break;
        case 'ES':
        case 'MAC':
            algorithm.iv && (na.iv = algorithm.iv);
            break;
        case 'KDF':
            algorithm.label && (na.label = algorithm.label);
            algorithm.contex && (na.context = algorithm.contex);
            break;
        case 'PBKDF2':
            algorithm.salt && (na.salt = algorithm.salt);
            algorithm.iterations && (na.iterations = algorithm.iterations);
            algorithm.diversifier && (na.diversifier = algorithm.diversifier);
            break;
        case 'PFXKDF':
            algorithm.salt && (na.salt = algorithm.salt);
            algorithm.iterations && (na.iterations = algorithm.iterations);
            algorithm.diversifier && (na.diversifier = algorithm.diversifier);
            break;
        case 'CPKDF':
            algorithm.salt && (na.salt = algorithm.salt);
            algorithm.iterations && (na.iterations = algorithm.iterations);
            break;
    }

    // Verification method and modes
    if (method && (
      ((na.mode !== 'ES' && na.mode !== 'SIGN' && na.mode !== 'MAC' &&
        na.mode !== 'HMAC' && na.mode !== 'KW' && na.mode !== 'DH'
        && na.mode !== 'MASK') &&
        (method === 'generateKey')) ||
      ((na.mode !== 'ES') &&
        (method === 'encrypt' || method === 'decrypt')) ||
      ((na.mode !== 'SIGN' && na.mode !== 'MAC' && na.mode !== 'HMAC') &&
        (method === 'sign' || method === 'verify')) ||
      ((na.mode !== 'HASH') &&
        (method === 'digest')) ||
      ((na.mode !== 'KW' && na.mode !== 'MASK') &&
        (method === 'wrapKey' || method === 'unwrapKey')) ||
      ((na.mode !== 'DH' && na.mode !== 'PBKDF2' && na.mode !== 'PFXKDF' &&
        na.mode !== 'CPKDF' && na.mode !== 'KDF') &&
        (method === 'deriveKey' || method === 'deriveBits'))))
        throw new NotSupportedError('Algorithm mode ' + na.mode + ' not valid for method ' + method);

    // Normalize hash algorithm
    algorithm.hash && (na.hash = algorithm.hash);
    if (na.hash) {
        if ((typeof na.hash === 'string' || na.hash instanceof String)
          && na.procreator)
            na.hash = na.hash + '/' + na.procreator;
        na.hash = normalize(na.hash, 'digest');
    }

    // Algorithm object identirifer
    algorithm.id && (na.id = algorithm.id);

    return na;
}

// Check for possibility use native crypto.subtle
function checkNative(algorithm) {
    if (!rootCrypto || !rootCrypto.subtle || !algorithm)
        return false;
    // Prepare name
    var name = (typeof algorithm === 'string' || algorithm instanceof String) ?
      name = algorithm : algorithm.name;
    if (!name)
        return false;
    name = name.toUpperCase();
    // Digest algorithm for key derivation
    if ((name.indexOf('KDF') >= 0 || name.indexOf('HMAC') >= 0) && algorithm.hash)
        return checkNative(algorithm.hash);
    // True if no supported names
    return name.indexOf('GOST') === -1 &&
      name.indexOf('SHA-1') === -1 &&
      name.indexOf('RC2') === -1 &&
      name.indexOf('?DES') === -1;
}

// </editor-fold>

/*
 * Key conversion methods
 *
 */ // <editor-fold defaultstate="collapsed">

// Check key parameter
function checkKey(key, method) {
    if (!key.algorithm)
        throw new SyntaxError('Key algorithm not defined');

    if (!key.algorithm.name)
        throw new SyntaxError('Key algorithm name not defined');

    var name = key.algorithm.name,
      gostCipher = name === 'GOST 28147' || name === 'GOST R 34.12' || name === 'RC2',
      gostDigest = name === 'GOST R 34.11' || name === 'SHA',
      gostSign = name === 'GOST R 34.10';

    if (!gostCipher && !gostSign && !gostDigest)
        throw new NotSupportedError('Key algorithm ' + name + ' is unsupproted');

    if (!key.type)
        throw new SyntaxError('Key type not defined');

    if (((gostCipher || gostDigest) && key.type !== 'secret') ||
      (gostSign && !(key.type === 'public' || key.type === 'private')))
        throw new DataError('Key type ' + key.type + ' is not valid for algorithm ' + name);

    if (!key.usages || !key.usages.indexOf)
        throw new SyntaxError('Key usages not defined');

    for (var i = 0, n = key.usages.length; i < n; i++) {
        var md = key.usages[i];
        if (((md === 'encrypt' || md === 'decrypt') && key.type !== 'secret') ||
          (md === 'sign' && key.type === 'public') ||
          (md === 'verify' && key.type === 'private'))
            throw new InvalidStateError('Key type ' + key.type + ' is not valid for ' + md);
    }

    if (method)
        if (key.usages.indexOf(method) === -1)
            throw new InvalidAccessError('Key usages is not contain method ' + method);

    if (!key.buffer)
        throw new SyntaxError('Key buffer is not defined');

    var size = key.buffer.byteLength * 8, keySize = 8 * key.algorithm.keySize;
    if ((key.type === 'secret' && size !== (keySize || 256) &&
      (key.usages.indexOf('encrypt') >= 0 || key.usages.indexOf('decrypt') >= 0)) ||
      (key.type === 'private' && !(size === 256 || size === 512)) ||
      (key.type === 'public' && !(size === 512 || size === 1024)))
        throw new SyntaxError('Key buffer has wrong size ' + size + ' bit');
}

// Extract key and enrich cipher algorithm
function extractKey(method, algorithm, key) {
    checkKey(key, method);
    if (algorithm) {
        var params;
        switch (algorithm.mode) {
            case 'ES':
                params = ['sBox', 'keyMeshing', 'padding', 'block'];
                break;
            case 'SIGN':
                params = ['namedCurve', 'namedParam', 'sBox', 'curve', 'param', 'modulusLength'];
                break;
            case 'MAC':
                params = ['sBox'];
                break;
            case 'KW':
                params = ['keyWrapping', 'ukm'];
                break;
            case 'DH':
                params = ['namedCurve', 'namedParam', 'sBox', 'ukm', 'curve', 'param', 'modulusLength'];
                break;
            case 'KDF':
                params = ['context', 'label'];
                break;
            case 'PBKDF2':
                params = ['sBox', 'iterations', 'salt'];
                break;
            case 'PFXKDF':
                params = ['sBox', 'iterations', 'salt', 'diversifier'];
                break;
            case 'CPKDF':
                params = ['sBox', 'salt'];
                break;
        }
        if (params)
            params.forEach(function (name) {
                key.algorithm[name] && (algorithm[name] = key.algorithm[name]);
            });
    }
    return key.buffer;
}

// Make key definition
function convertKey(algorithm, extractable, keyUsages, keyData, keyType) {
    var key = {
        type: keyType || (algorithm.name === 'GOST R 34.10' ? 'private' : 'secret'),
        extractable: extractable || 'false',
        algorithm: algorithm,
        usages: keyUsages || [],
        buffer: keyData
    };
    checkKey(key);
    return key;
}

function convertKeyPair(publicAlgorithm, privateAlgorithm, extractable, keyUsages, publicBuffer, privateBuffer) {

    if (!keyUsages || !keyUsages.indexOf)
        throw new SyntaxError('Key usages not defined');

    var publicUsages = keyUsages.filter(function (value) {
        return value !== 'sign';
    });
    var privateUsages = keyUsages.filter(function (value) {
        return value !== 'verify';
    });

    return {
        publicKey: convertKey(publicAlgorithm, extractable, publicUsages, publicBuffer, 'public'),
        privateKey: convertKey(privateAlgorithm, extractable, privateUsages, privateBuffer, 'private')
    };
}

// Swap bytes in buffer
function swapBytes(src) {
    if (src instanceof CryptoOperationData)
        src = new Uint8Array(src);
    var dst = new Uint8Array(src.length);
    for (var i = 0, n = src.length; i < n; i++)
        dst[n - i - 1] = src[i];
    return dst.buffer;
}

// </editor-fold>

// Executor for any method
function execute(algorithm, method, args) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(gostEngine.execute(algorithm, method, args));
        } catch (error) {
            reject(error);
        }
    });
}

// Self resolver
function call(callback) {
    try {
        callback();
    } catch (e) {
    }
}

// </editor-fold>

/*
 * WebCrypto common class references
 *
 */ // <editor-fold defaultstate="collapsed">
/**
 * The Algorithm object is a dictionary object [WebIDL] which is used to
 * specify an algorithm and any additional parameters required to fully
 * specify the desired operation.<br>
 * <pre>
 *  dictionary Algorithm {
     *      DOMString name;
     *  };
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#algorithm-dictionary}
 * @class Algorithm
 * @param {DOMString} name The name of the registered algorithm to use.
 */

/**
 * AlgorithmIdentifier - Algorithm or DOMString name of algorithm<br>
 * <pre>
 *  typedef (Algorithm or DOMString) AlgorithmIdentifier;
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#algorithm-dictionary}
 * @class AlgorithmIdentifier
 */

/**
 * The KeyAlgorithm interface represents information about the contents of a
 * given Key object.
 * <pre>
 *  interface KeyAlgorithm {
     *      readonly attribute DOMString name
     *  };
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-algorithm-interface}
 * @class KeyAlgorithm
 * @param {DOMString} name The name of the algorithm used to generate the Key
 */

/**
 * The type of a key. The recognized key type values are "public", "private"
 * and "secret". Opaque keying material, including that used for symmetric
 * algorithms, is represented by "secret", while keys used as part of asymmetric
 * algorithms composed of public/private keypairs will be either "public" or "private".
 * <pre>
 *  typedef DOMString KeyType;
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-interface}
 * @class KeyType
 */

/**
 * Sequence of operation type that may be performed using a key. The recognized
 * key usage values are "encrypt", "decrypt", "sign", "verify", "deriveKey",
 * "deriveBits", "wrapKey" and "unwrapKey".
 * <pre>
 *  typedef DOMString[] KeyUsages;
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-interface}
 * @class KeyUsages
 */

/**
 * The Key object represents an opaque reference to keying material that is
 * managed by the user agent.<br>
 * This specification provides a uniform interface for many different kinds of
 * keying material managed by the user agent. This may include keys that have
 * been generated by the user agent, derived from other keys by the user agent,
 * imported to the user agent through user actions or using this API,
 * pre-provisioned within software or hardware to which the user agent has
 * access or made available to the user agent in other ways. The term key refers
 * broadly to any keying material including actual keys for cryptographic
 * operations and secret values obtained within key derivation or exchange operations.<br>
 * The Key object is not required to directly interface with the underlying key
 * storage mechanism, and may instead simply be a reference for the user agent
 * to understand how to obtain the keying material when needed, eg. when performing
 * a cryptographic operation.
 * <pre>
 *  interface Key {
     *      readonly attribute KeyType type;
     *      readonly attribute boolean extractable;
     *      readonly attribute KeyAlgorithm algorithm;
     *      readonly attribute KeyUsages usages;
     *  };
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-interface}
 * @class Key
 * @param {KeyType} type The type of a key. The recognized key type values are "public", "private" and "secret".
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application.
 * @param {KeyAlgorithm} algorithm The Algorithm used to generate the key.
 * @param {KeyUsages} usages Key usage array: type of operation that may be performed using a key.
 */

/**
 * The KeyPair interface represents an asymmetric key pair that is comprised of both public and private keys.
 * <pre>
 *  interface KeyPair {
     *      readonly attribute Key publicKey;
     *      readonly attribute Key privateKey;
     *  };
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#keypair}
 * @class KeyPair
 * @param {Key} privateKey Private key
 * @param {Key} publicKey Public key
 */

/**
 * Specifies a serialization format for a key. The recognized key format values are:
 *  <ul>
 *      <li>'raw' - An unformatted sequence of bytes. Intended for secret keys.</li>
 *      <li>'pkcs8' - The DER encoding of the PrivateKeyInfo structure from RFC 5208.</li>
 *      <li>'spki' - The DER encoding of the SubjectPublicKeyInfo structure from RFC 5280.</li>
 *      <li>'jwk' - The key is represented as JSON according to the JSON Web Key format.</li>
 *  </ul>
 *  <pre>
 *  typedef DOMString KeyFormat;
 *  </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-interface}
 *  @class KeyFormat
 */

/**
 * Binary data
 *  <pre>
 *  typedef (ArrayBuffer or ArrayBufferView) CryptoOperationData;
 *  </pre>
 * @class CryptoOperationData
 */
var CryptoOperationData = ArrayBuffer;

/**
 * DER-encoded ArrayBuffer or PEM-encoded DOMString constains ASN.1 object<br>
 * <pre>
 *  typedef (ArrayBuffer or DOMString) FormatedData;
 * </pre>
 * @class FormatedData
 */

// </editor-fold>

/**
 * The SubtleCrypto class provides low-level cryptographic primitives and algorithms.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface}
 *
 * @class SubtleCrypto
 */ // <editor-fold>
export function SubtleCrypto() {
}

/**
 * The encrypt method returns a new Promise object that will encrypt data
 * using the specified algorithm identifier with the supplied Key.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-encrypt}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST 28147-ECB</b> "prostaya zamena" (ECB) mode (default)</li>
 *      <li><b>GOST 28147-CFB</b> "gammirovanie s obratnoj svyaziyu po shifrotekstu" (CFB) mode</li>
 *      <li><b>GOST 28147-OFB</b> "gammirovanie s obratnoj svyaziyu po vyhodu" (OFB) mode</li>
 *      <li><b>GOST 28147-CTR</b> "gammirovanie" (counter) mode</li>
 *      <li><b>GOST 28147-CBC</b> Cipher-Block-Chaining (CBC) mode</li>
 *      <li><b>GOST R 34.12-ECB</b> "prostaya zamena" (ECB) mode (default)</li>
 *      <li><b>GOST R 34.12-CFB</b> "gammirovanie s obratnoj svyaziyu po shifrotekstu" (CFB) mode</li>
 *      <li><b>GOST R 34.12-OFB</b> "gammirovanie s obratnoj svyaziyu po vyhodu" (OFB) mode</li>
 *      <li><b>GOST R 34.12-CTR</b> "gammirovanie" (counter) mode</li>
 *      <li><b>GOST R 34.12-CBC</b> Cipher-Block-Chaining (CBC) mode</li>
 *  </ul>
 *  For more information see {@link GostCipher}
 *
 * @memberOf SubtleCrypto
 * @method encrypt
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} key Key object
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.encrypt = function (algorithm, key, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm))
            return rootCrypto.subtle.encrypt(algorithm, key, data);

        algorithm = normalize(algorithm, 'encrypt');
        return execute(algorithm, 'encrypt',
          [extractKey('encrypt', algorithm, key), data]);
    });
}; // </editor-fold>

/**
 * The decrypt method returns a new Promise object that will decrypt data
 * using the specified algorithm identifier with the supplied Key.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-decrypt}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST 28147-ECB</b> "prostaya zamena" (ECB) mode (default)</li>
 *      <li><b>GOST 28147-CFB</b> "gammirovanie s obratnoj svyaziyu po shifrotekstu" (CFB) mode</li>
 *      <li><b>GOST 28147-OFB</b> "gammirovanie s obratnoj svyaziyu po vyhodu" (OFB) mode</li>
 *      <li><b>GOST 28147-CTR</b> "gammirovanie" (counter) mode</li>
 *      <li><b>GOST 28147-CBC</b> Cipher-Block-Chaining (CBC) mode</li>
 *      <li><b>GOST R 34.12-ECB</b> "prostaya zamena" (ECB) mode (default)</li>
 *      <li><b>GOST R 34.12-CFB</b> "gammirovanie s obratnoj svyaziyu po shifrotekstu" (CFB) mode</li>
 *      <li><b>GOST R 34.12-OFB</b> "gammirovanie s obratnoj svyaziyu po vyhodu" (OFB) mode</li>
 *      <li><b>GOST R 34.12-CTR</b> "gammirovanie" (counter) mode</li>
 *      <li><b>GOST R 34.12-CBC</b> Cipher-Block-Chaining (CBC) mode</li>
 *  </ul>
 *  For additional modes see {@link GostCipher}
 *
 * @memberOf SubtleCrypto
 * @method decrypt
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} key Key object
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.decrypt = function (algorithm, key, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm))
            return rootCrypto.subtle.decrypt(algorithm, key, data);

        algorithm = normalize(algorithm, 'decrypt');
        return execute(algorithm, 'decrypt',
          [extractKey('decrypt', algorithm, key), data]);
    });
}; // </editor-fold>

/**
 * The sign method returns a new Promise object that will sign data using
 * the specified algorithm identifier with the supplied Key.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-sign}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-94</b> GOST Signature</li>
 *      <li><b>GOST R 34.10-94/GOST R 34.11-94</b> GOST Signature with Hash</li>
 *      <li><b>GOST R 34.10</b> ECGOST Signature</li>
 *      <li><b>GOST R 34.10/GOST R 34.11-94</b> ECGOST Signature with Old-Style Hash</li>
 *      <li><b>GOST R 34.10/GOST R 34.11</b> ECGOST Signature with Streebog Hash</li>
 *      <li><b>GOST 28147-MAC</b> MAC base on GOST 28147</li>
 *      <li><b>GOST R 34.12-MAC</b> MAC base on GOST R 43.12</li>
 *      <li><b>GOST R 34.11-HMAC</b> HMAC base on GOST 34.11</li>
 *      <li><b>SHA-HMAC</b> HMAC base on SHA</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}
 *
 * @memberOf SubtleCrypto
 * @method sign
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} key Key object
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.sign = function (algorithm, key, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm))
            return rootCrypto.subtle.sign(algorithm, key, data);

        algorithm = normalize(algorithm, 'sign');
        var value = execute(algorithm, 'sign',
          [extractKey('sign', algorithm, key), data]).then(function (data) {
            if (algorithm.procreator === 'SC' && algorithm.mode === 'SIGN') {
                data = gostASN1Instance.GostSignature.encode(data);
            }
            return data;
        });
        return value;
    });
}; // </editor-fold>

/**
 * The verify method returns a new Promise object that will verify data
 * using the specified algorithm identifier with the supplied Key.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-verify}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-94</b> GOST Signature</li>
 *      <li><b>GOST R 34.10-94/GOST R 34.11-94</b> GOST Signature with Hash</li>
 *      <li><b>GOST R 34.10</b> ECGOST Signature</li>
 *      <li><b>GOST R 34.10/GOST R 34.11-94</b> ECGOST Signature with Old-Style Hash</li>
 *      <li><b>GOST R 34.10/GOST R 34.11</b> ECGOST Signature with Streebog Hash</li>
 *      <li><b>GOST 28147-MAC</b> MAC base on GOST 28147</li>
 *      <li><b>GOST R 34.12-MAC</b> MAC base on GOST R 34.12</li>
 *      <li><b>GOST R 34.11-HMAC</b> HMAC base on GOST 34.11</li>
 *      <li><b>SHA-HMAC</b> HMAC base on SHA</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}
 *
 * @memberOf SubtleCrypto
 * @method verify
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} key Key object
 * @param {CryptoOperationData} signature Signature data
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with boolean value of verification result
 */
SubtleCrypto.prototype.verify = function (algorithm, key, signature, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm))
            return rootCrypto.subtle.verify(algorithm, key, signature, data);

        algorithm = normalize(algorithm, 'verify');
        if (algorithm.procreator === 'SC' && algorithm.mode === 'SIGN') {
            var obj = gostASN1Instance.GostSignature.decode(signature);
            signature = { r: obj.r, s: obj.s };
        }
        return execute(algorithm, 'verify',
          [extractKey('verify', algorithm, key), signature, data]);
    });
}; // </editor-fold>

/**
 * The digest method returns a new Promise object that will digest data
 * using the specified algorithm identifier.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-digest}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.11-94</b> Old-Style GOST Hash</li>
 *      <li><b>GOST R 34.11</b> GOST Streebog Hash</li>
 *      <li><b>SHA</b> SHA Hash</li>
 *  </ul>
 *  For additional modes see {@link GostDigest}
 *
 * @memberOf SubtleCrypto
 * @method digest
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.digest = function (algorithm, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm))
            return rootCrypto.subtle.digest(algorithm, data);

        algorithm = normalize(algorithm, 'digest');
        return execute(algorithm, 'digest', [data]);
    });
}; // </editor-fold>

/**
 * The generateKey method returns a new Promise object that will key(s) using
 * the specified algorithm identifier. Key can be used in according with
 * KeyUsages sequence. The recognized key usage values are "encrypt", "decrypt",
 * "sign", "verify", "deriveKey", "deriveBits", "wrapKey" and "unwrapKey".
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-generateKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10</b> ECGOST Key Pairs</li>
 *      <li><b>GOST 28147</b> Key for encryption GOST 28147 modes</li>
 *      <li><b>GOST 28147-KW</b> Key for wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12</b> Key for encryption GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key for wrapping GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}<br>
 *  Note: Generation key for GOST R 34.10-94 not supported.
 *
 * @memberOf SubtleCrypto
 * @method generateKey
 * @instance
 * @param {AlgorithmIdentifier} algorithm Key algorithm identifier
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application
 * @param {KeyUsages} keyUsages Key usage array: type of operation that may be performed using a key
 * @returns {Promise} Promise that resolves with {@link Key} or {@link KeyPair} in according to key algorithm
 */
SubtleCrypto.prototype.generateKey = function (algorithm, extractable, keyUsages) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm))
            return rootCrypto.subtle.generateKey(algorithm, extractable, keyUsages);

        var privateAlgorithm = algorithm.privateKey,
          publicAlgorithm = algorithm.publicKey;
        algorithm = normalize(algorithm, 'generateKey');
        if (privateAlgorithm)
            privateAlgorithm = normalize(privateAlgorithm, 'generateKey');
        else
            privateAlgorithm = algorithm;
        if (publicAlgorithm)
            publicAlgorithm = normalize(publicAlgorithm, 'generateKey');
        else
            publicAlgorithm = algorithm;
        return execute(algorithm, 'generateKey', []).then(function (data) {
            if (data.publicKey && data.privateKey)
                return convertKeyPair(publicAlgorithm, privateAlgorithm, extractable, keyUsages, data.publicKey, data.privateKey);
            else
                return convertKey(algorithm, extractable, keyUsages, data);
        });
    });
}; // </editor-fold>

/**
 * The deriveKey method returns a new Promise object that will key(s) using
 * the specified algorithm identifier. Key can be used in according with
 * KeyUsage sequence. The recognized key usage values are "encrypt", "decrypt",
 * "sign", "verify", "deriveKey", "deriveBits", "wrapKey" and "unwrapKey".
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-deriveKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-DH</b> ECDH Key Agreement mode</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PBKDF2</b> Password Based Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PFXKDF</b> PFX Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-CPKDF</b> Password Based Key for CryptoPro Derivation Algorithm</li>
 *      <li><b>SHA-PBKDF2</b> Password Based Key for Derivation Algorithm</li>
 *      <li><b>SHA-PFXKDF</b> PFX Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign} and {@link GostDigest}
 *
 * @memberOf SubtleCrypto
 * @method deriveKey
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} baseKey Derivation key object
 * @param {AlgorithmIdentifier} derivedKeyType Derived key algorithm identifier
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application
 * @param {KeyUsages} keyUsages Key usage array: type of operation that may be performed using a key
 * @returns {Promise} Promise that resolves with {@link Key}
 */
SubtleCrypto.prototype.deriveKey = function (algorithm, baseKey,
                                             derivedKeyType, extractable, keyUsages) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm))
            return rootCrypto.subtle.deriveKey(algorithm, baseKey,
              derivedKeyType, extractable, keyUsages);

        algorithm = normalize(algorithm, 'deriveKey');
        derivedKeyType = normalize(derivedKeyType, 'generateKey');
        algorithm.keySize = derivedKeyType.keySize;
        if (algorithm['public']) {
            algorithm['public'].algorithm = normalize(algorithm['public'].algorithm);
            algorithm['public'] = extractKey('deriveKey', algorithm, algorithm['public']);
        }
        return execute(algorithm, 'deriveKey', [extractKey('deriveKey', algorithm, baseKey)]).then(function (data) {
            return convertKey(derivedKeyType, extractable, keyUsages, data);
        });
    });
}; // </editor-fold>

/**
 * The deriveBits method returns length bits on baseKey using the
 * specified algorithm identifier.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-deriveBits}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-DH</b> ECDH Key Agreement mode</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PBKDF2</b> Password Based Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PFXKDF</b> PFX Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-CPKDF</b> Password Based Key for CryptoPro Derivation Algorithm</li>
 *      <li><b>SHA-PBKDF2</b> Password Based Key for Derivation Algorithm</li>
 *      <li><b>SHA-PFXKDF</b> PFX Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign} and {@link GostDigest}
 *
 * @memberOf SubtleCrypto
 * @method deriveBits
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} baseKey Derivation key object
 * @param {number} length Length bits
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.deriveBits = function (algorithm, baseKey, length) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm))
            return rootCrypto.subtle.deriveBits(algorithm, baseKey, length);

        algorithm = normalize(algorithm, 'deriveBits');
        if (algorithm['public'])
            algorithm['public'] = extractKey('deriveBits', algorithm, algorithm['public']);
        return execute(algorithm, 'deriveBits', [extractKey('deriveBits', algorithm, baseKey), length]);
    });
}; // </editor-fold>

/**
 * The importKey method returns a new Promise object that will key(s) using
 * the specified algorithm identifier. Key can be used in according with
 * KeyUsage sequence. The recognized key usage values are "encrypt", "decrypt",
 * "sign", "verify", "deriveKey", "deriveBits", "wrapKey" and "unwrapKey".<br><br>
 * Parameter keyData contains data in defined format.
 * The suppored key format values are:
 *  <ul>
 *      <li>'raw' - An unformatted sequence of bytes. Intended for secret keys.</li>
 *      <li>'pkcs8' - The DER encoding of the PrivateKeyInfo structure from RFC 5208.</li>
 *      <li>'spki' - The DER encoding of the SubjectPublicKeyInfo structure from RFC 5280.</li>
 *  </ul>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-importKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-94</b> GOST Private and Public keys</li>
 *      <li><b>GOST R 34.10</b> ECGOST Private and Public keys</li>
 *      <li><b>GOST 28147</b> Key for encryption GOST 28147 modes</li>
 *      <li><b>GOST 28147-KW</b> Key for key wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12</b> Key for encryption GOST 34.12 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key for key wrapping GOST 34.12 modes</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}<br>
 *
 * @memberOf SubtleCrypto
 * @method importKey
 * @instance
 * @param {KeyFormat} format Key format Format specifies a serialization format for a key
 * @param {CryptoOperationData} keyData
 * @param {AlgorithmIdentifier} algorithm Key algorithm identifier
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application
 * @param {KeyUsages} keyUsages Key usage array: type of operation that may be performed using a key
 * @returns {Promise} Promise that resolves with {@link Key}
 */
SubtleCrypto.prototype.importKey = function (format, keyData, algorithm, extractable, keyUsages) // <editor-fold defaultstate="collapsed">
{
    var type;
    return new Promise(call).then(function () {
        if (checkNative(algorithm))
            return rootCrypto.subtle.importKey(format, keyData, algorithm, extractable, keyUsages);

        if (format === 'raw') {
            algorithm = normalize(algorithm, 'importKey');
            if (keyUsages && keyUsages.indexOf) {
                var name = algorithm.name.toUpperCase().replace(/[\.\s]/g, '');
                if (name.indexOf('3410') >= 0 && keyUsages.indexOf('sign') >= 0)
                    type = 'private';
                else if (name.indexOf('3410') >= 0 && keyUsages.indexOf('verify') >= 0)
                    type = 'public';
            }
            return keyData;
        } else {
            var key;
            if (format === 'pkcs8')
                key = gostASN1Instance.GostPrivateKeyInfo.decode(keyData).object;
            else if (format === 'spki')
                key = gostASN1Instance.GostSubjectPublicKeyInfo.decode(keyData).object;
            else
                throw new NotSupportedError('Key format not supported');

            algorithm = normalize(key.algorithm, 'importKey');
            type = key.type;
            if (extractable !== false)
                extractable = extractable || key.extractable;
            if (keyUsages) {
                for (var i = 0; i < keyUsages.length; i++) {
                    if (key.usages.indexOf(keyUsages[i]) < 0)
                        throw DataError('Key usage not valid for this key');
                }
            } else
                keyUsages = key.usages;
            var data = key.buffer, keySize = algorithm.keySize, dataLen = data.byteLength;
            if (type === 'public' || keySize === dataLen)
                return data;
            else {
                // Remove private key masks
                if (dataLen % keySize > 0)
                    throw new DataError('Invalid key size');
                algorithm.mode = 'MASK';
                algorithm.procreator = 'VN';
                var chain = [];
                for (var i = keySize; i < dataLen; i += keySize) {
                    chain.push((function (mask) {
                        return function (data) {
                            return execute(algorithm, 'unwrapKey', [mask, data]).then(function (data) {
                                var next = chain.pop();
                                if (next)
                                    return next(data);
                                else {
                                    delete algorithm.mode;
                                    return data;
                                }
                            });
                        };
                    })(new Uint8Array(data, i, keySize)));
                }
                return chain.pop()(new Uint8Array(data, 0, keySize));
            }
        }
    }).then(function (data) {
        return convertKey(algorithm, extractable, keyUsages, data, type);
    });
}; // </editor-fold>

/**
 * The exportKey method returns a new Promise object that will key data in
 * defined format. <br><br>
 * The suppored key format values are:
 *  <ul>
 *      <li>'raw' - An unformatted sequence of bytes. Intended for secret keys.</li>
 *      <li>'pkcs8' - The DER encoding of the PrivateKeyInfo structure from RFC 5208.</li>
 *      <li>'spki' - The DER encoding of the SubjectPublicKeyInfo structure from RFC 5280.</li>
 *  </ul>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-exportKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-94</b> GOST Private and Public keys</li>
 *      <li><b>GOST R 34.10</b> ECGOST Private and Public keys</li>
 *      <li><b>GOST 28147</b> Key for encryption GOST 28147 modes</li>
 *      <li><b>GOST 28147-KW</b> Key for key wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12</b> Key for encryption GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key for key wrapping GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PBKDF2</b> Import Password for Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PFXKDF</b> Import PFX Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-CPKDF</b> Import Password Key for CryptoPro Derivation Algorithm</li>
 *      <li><b>SHA-PBKDF2</b> Import Password for Key for Derivation Algorithm</li>
 *      <li><b>SHA-PFXKDF</b> Import PFX Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}<br>
 *
 * @memberOf SubtleCrypto
 * @method exportKey
 * @instance
 * @param {KeyFormat} format Format specifies a serialization format for a key
 * @param {Key} key Key object
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.exportKey = function (format, key) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (key && checkNative(key.algorithm))
            return rootCrypto.subtle.exportKey(format, key);

        if (!key.extractable)
            throw new InvalidAccessError('Key not extractable');

        var raw = extractKey(null, null, key);
        if (format === 'raw')
            return raw;
        else if (format === 'pkcs8' && key.algorithm && key.algorithm.id) {
            if (key.algorithm.procreator === 'VN') {
                // Add masks for ViPNet
                var algorithm = key.algorithm, mask;
                algorithm.mode = 'MASK';
                return execute(algorithm, 'generateKey').then(function (data) {
                    mask = data;
                    return execute(algorithm, 'wrapKey', [mask, key.buffer]);
                }).then(function (data) {
                    delete algorithm.mode;
                    var d = new Uint8Array(data.byteLength + mask.byteLength);
                    d.set(new Uint8Array(data, 0, data.byteLength));
                    d.set(new Uint8Array(mask, 0, mask.byteLength), data.byteLength);
                    var buffer = d.buffer;
                    buffer.enclosed = true;
                    return gostASN1Instance.GostPrivateKeyInfo.encode({
                        algorithm: algorithm,
                        buffer: buffer
                    });
                });
            } else
                return gostASN1Instance.GostPrivateKeyInfo.encode(key);
        } else if (format === 'spki' && key.algorithm && key.algorithm.id)
            return gostASN1Instance.GostSubjectPublicKeyInfo.encode(key);
        else
            throw new NotSupportedError('Key format not supported');
    });
}; // </editor-fold>

/**
 * The wrapKey method returns a new Promise object that will wrapped key(s).
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-wrapKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST 28147-KW</b> Key Wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key Wrapping GOST R 34.12 modes</li>
 *      <li><b>GOST 28147-MASK</b> Key Mask GOST 28147 modes</li>
 *      <li><b>GOST R 34.12-MASK</b> Key Mask GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.10-MASK</b> Key Mask GOST R 34.10 modes</li>
 *  </ul>
 *  For additional modes see {@link GostCipher}<br>
 *
 * @memberOf SubtleCrypto
 * @method wrapKey
 * @instance
 * @param {KeyFormat} format Format specifies a serialization format for a key. Now suppored only 'raw' key format.
 * @param {Key} key Key object
 * @param {Key} wrappingKey Wrapping key object
 * @param {AlgorithmIdentifier} wrapAlgorithm Algorithm identifier
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(wrapAlgorithm))
            return rootCrypto.subtle.wrapKey(format, key, wrappingKey, wrapAlgorithm);

        wrapAlgorithm = normalize(wrapAlgorithm, 'wrapKey');
        var keyData = extractKey(null, null, key);
        if (wrapAlgorithm.procreator === 'SC' && key.type === 'private')
            keyData = swapBytes(keyData);
        return execute(wrapAlgorithm, 'wrapKey',
          [extractKey('wrapKey', wrapAlgorithm, wrappingKey), keyData]).then(function (data) {
            if (format === 'raw')
                return data;
            else
                throw new NotSupportedError('Key format not supported');
        });
    });
}; // </editor-fold>

/**
 * The unwrapKey method returns a new Promise object that will unwrapped key(s).
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-unwrapKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST 28147-KW</b> Key Wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key Wrapping GOST R 34.12 modes</li>
 *      <li><b>GOST 28147-MASK</b> Key Mask GOST 28147 modes</li>
 *      <li><b>GOST R 34.12-MASK</b> Key Mask GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.10-MASK</b> Key Mask GOST R 34.10 modes</li>
 *  </ul>
 *  For additional modes see {@link GostCipher}<br>
 *
 * @memberOf SubtleCrypto
 * @method unwrapKey
 * @instance
 * @param {KeyFormat} format Format specifies a serialization format for a key. Now suppored only 'raw' key format.
 * @param {CryptoOperationData} wrappedKey Wrapped key data
 * @param {Key} unwrappingKey Unwrapping key object
 * @param {AlgorithmIdentifier} unwrapAlgorithm Algorithm identifier
 * @param {AlgorithmIdentifier} unwrappedKeyAlgorithm Key algorithm identifier
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application
 * @param {KeyUsages} keyUsages Key usage array: type of operation that may be performed using a key
 * @returns {Promise} Promise that resolves with {@link Key}
 */
SubtleCrypto.prototype.unwrapKey = function (format, wrappedKey, unwrappingKey,
                                             unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(unwrapAlgorithm))
            return rootCrypto.subtle.unwrapKey(format, wrappedKey, unwrappingKey,
              unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages);

        unwrapAlgorithm = normalize(unwrapAlgorithm, 'unwrapKey');
        unwrappedKeyAlgorithm = normalize(unwrappedKeyAlgorithm, 'importKey');
        if (format !== 'raw')
            throw new NotSupportedError('Key format not supported');

        return execute(unwrapAlgorithm, 'unwrapKey', [extractKey('unwrapKey', unwrapAlgorithm, unwrappingKey), wrappedKey]).then(function (data) {
            var type;
            if (unwrappedKeyAlgorithm && unwrappedKeyAlgorithm.name) {
                var name = unwrappedKeyAlgorithm.name.toUpperCase().replace(/[\.\s]/g, '');
                if (name.indexOf('3410') >= 0 && keyUsages.indexOf('sign') >= 0)
                    type = 'private';
                else if (name.indexOf('3410') >= 0 && keyUsages.indexOf('verify') >= 0)
                    type = 'public';
            }
            if (unwrapAlgorithm.procreator === 'SC' && type === 'private')
                data = swapBytes(data);
            return convertKey(unwrappedKeyAlgorithm, extractable, keyUsages, data, type);
        });
    });
}; // </editor-fold>

export const gostSubtleInstance = new SubtleCrypto();
