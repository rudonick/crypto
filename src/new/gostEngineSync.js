/**
 * @file GOST 34.10-2012 signature function with 1024/512 bits digest
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

import { GostCipher } from './gostCipher';
import { GostDigest } from './gostDigest';
import { GostSign } from './gostSign';
import { NotSupportedError } from '../utils/errors';

/*
 * Engine definition base on normalized algorithm identifier
 *
 */ // <editor-fold defaultstate="collapsed">

// Define engine
function defineEngine(method, algorithm) {
    if (!algorithm)
        throw new (SyntaxError || Error)('Algorithm not defined');

    if (!algorithm.name)
        throw new (SyntaxError || Error)('Algorithm name not defined');

    var name = algorithm.name, mode = algorithm.mode;
    if ((name === 'GOST 28147' || name === 'GOST R 34.12' || name === 'RC2') && (method === 'generateKey' ||
      (mode === 'MAC' && (method === 'sign' || method === 'verify')) ||
      ((mode === 'KW' || mode === 'MASK') && (method === 'wrapKey' || method === 'unwrapKey')) ||
      ((!mode || mode === 'ES') && (method === 'encrypt' || method === 'decrypt')))) {
        return 'GostCipher';

    } else if ((name === 'GOST R 34.11' || name === 'SHA') && (method === 'digest' ||
      (mode === 'HMAC' && (method === 'sign' || method === 'verify' || method === 'generateKey')) ||
      ((mode === 'KDF' || mode === 'PBKDF2' || mode === 'PFXKDF' || mode === 'CPKDF') &&
        (method === 'deriveKey' || method === 'deriveBits' || method === 'generateKey')))) {
        return 'GostDigest';

    } else if (name === 'GOST R 34.10' && (method === 'generateKey' ||
      ((!mode || mode === 'SIGN') && (method === 'sign' || method === 'verify')) ||
      (mode === 'MASK' && (method === 'wrapKey' || method === 'unwrapKey')) ||
      (mode === 'DH' && (method === 'deriveKey' || method === 'deriveBits')))) {
        return 'GostSign';
    } else
        throw new NotSupportedError('Algorithm ' + name + '-' + mode + ' is not valid for ' + method);
} // </editor-fold>

/**
 * Object enables usage GOST cryptographic algorithms in the main JS thread.
 *
 * Object provide interface to GOST low-level cryptogric classes:
 *  <ul>
 *      <li>GostCipher - implementation of GOST 28147, GOST R 34.12, GOST R 34.13 Encryption algorithms. Reference {@link http://tools.ietf.org/html/rfc5830}</li>
 *      <li>GostDigest - implementation of GOST R 34.11 Hash Function algorithms. References {@link http://tools.ietf.org/html/rfc5831} and {@link http://tools.ietf.org/html/rfc6986}</li>
 *      <li>GostSign - implementation of GOST R 34.10 Digital Signature algorithms. References {@link http://tools.ietf.org/html/rfc5832} and {@link http://tools.ietf.org/html/rfc7091}</li>
 *  </ul>
 * @namespace gostEngine
 */
const gostEngine = {
    /**
     * gostEngine.execute(algorithm, method, args) Entry point to execution
     * all low-level GOST cryptographic methods
     *
     *  <ul>
     *      <li>Determine the appropriate engine for a given execution method</li>
     *      <li>Create cipher object for determineted engine</li>
     *      <li>Execute method of cipher with given args</li>
     *  </ul>
     *
     * @memberOf gostEngine
     * @param {AlgorithmIndentifier} algorithm Algorithm identifier
     * @param {string} method Crypto method for execution
     * @param {Array} args Method arguments (keys, data, additional parameters)
     * @returns {(CryptoOperationData|Key|KeyPair|boolean)} Result of method execution
     */
    execute: function (algorithm, method, args) {
        // Define engine for GOST algorithms
        var engine = defineEngine(method, algorithm);
        // Create cipher
        var cipher = this['get' + engine](algorithm);
        // Execute method
        return cipher[method].apply(cipher, args);
    },
    /**
     * gostEngine.getGostCipher(algorithm) returns GOST 28147 / GOST R 34.12 cipher instance<br><br>
     *
     * GOST 28147-89 / GOST R 34.12-15 Encryption Algorithm<br><br>
     * When keys and initialization vectors are converted to/from byte arrays,
     * little-endian byte order is assumed.<br><br>
     *
     * Normalized algorithm identifier common parameters:
     *
     *  <ul>
     *      <li><b>name</b> Algorithm name 'GOST 28147' or 'GOST R 34.12'</li>
     *      <li><b>version</b> Algorithm version, number
     *          <ul>
     *              <li><b>1989</b> Current version of standard</li>
     *              <li><b>2015</b> New draft version of standard</li>
     *          </ul>
     *      </li>
     *      <li><b>length</b> Block length
     *          <ul>
     *              <li><b>64</b> 64 bits length (default)</li>
     *              <li><b>128</b> 128 bits length (only for version 2015)</li>
     *          </ul>
     *      </li>
     *      <li><b>mode</b> Algorithm mode, string
     *          <ul>
     *              <li><b>ES</b> Encryption mode (default)</li>
     *              <li><b>MAC</b> "imitovstavka" (MAC) mode</li>
     *              <li><b>KW</b> Key wrapping mode</li>
     *              <li><b>MASK</b> Key mask mode</li>
     *          </ul>
     *      </li>
     *      <li><b>sBox</b> Paramset sBox for GOST 28147-89, string. Used only if version = 1989</li>
     *  </ul>
     *
     * Supported algorithms, modes and parameters:
     *
     *  <ul>
     *      <li>Encript/Decrypt mode (ES)
     *          <ul>
     *              <li><b>block</b> Block mode, string. Default ECB</li>
     *              <li><b>keyMeshing</b> Key meshing mode, string. Default NO</li>
     *              <li><b>padding</b> Padding mode, string. Default NO for CFB and CTR modes, or ZERO for others</li>
     *              <li><b>iv</b> {@link CryptoOperationData} Initial vector with length of block. Default - zero block</li>
     *          </ul>
     *      </li>
     *      <li>Sign/Verify mode (MAC)
     *          <ul>
     *              <li><b>macLength</b> Length of mac in bits (default - 32 bits)</li>
     *              <li><b>iv</b> {@link CryptoOperationData} Initial vector with length of block. Default - zero block</li>
     *          </ul>
     *      </li>
     *      <li>Wrap/Unwrap key mode (KW)
     *          <ul>
     *              <li><b>keyWrapping</b> Mode of keywrapping, string. Default NO - standard GOST key wrapping</li>
     *              <li><b>ukm</b> {@link CryptoOperationData} User key material. Default - random generated value</li>
     *          </ul>
     *      </li>
     *      <li>Wrap/Unwrap key mode (MASK)</li>
     *  </ul>
     *
     * Supported paramters values:
     *
     *  <ul>
     *      <li>Block modes (parameter 'block')
     *          <ul>
     *              <li><b>ECB</b> "prostaya zamena" (ECB) mode (default)</li>
     *              <li><b>CFB</b> "gammirovanie s obratnoj svyaziyu" (64-bit CFB) mode</li>
     *              <li><b>CTR</b> "gammirovanie" (counter) mode</li>
     *              <li><b>CBC</b> Cipher-Block-Chaining (CBC) mode</li>
     *          </ul>
     *      </li>
     *      <li>Key meshing modes (parameter 'keyMeshing')
     *          <ul>
     *              <li><b>NO</b> No key wrapping (default)</li>
     *              <li><b>CP</b> CryptoPor Key key meshing</li>
     *          </ul>
     *      </li>
     *      <li>Padding modes (parameter 'padding')
     *          <ul>
     *              <li><b>NO</b> No padding only for CFB and CTR modes</li>
     *              <li><b>PKCS5</b> PKCS#5 padding mode</li>
     *              <li><b>ZERO</b> Zero bits padding mode</li>
     *              <li><b>RANDOM</b> Random bits padding mode</li>
     *          </ul>
     *      </li>
     *      <li>Wrapping key modes (parameter 'keyWrapping')
     *          <ul>
     *              <li><b>NO</b> Ref. rfc4357 6.1 GOST 28147-89 Key wrapping</li>
     *              <li><b>CP</b> CryptoPro Key wrapping mode</li>
     *              <li><b>SC</b> SignalCom Key wrapping mode</li>
     *          </ul>
     *      </li>
     *  </ul>
     *
     * @memberOf gostEngine
     * @param {AlgorithmIndentifier} algorithm Algorithm identifier
     * @returns {GostCipher} Instance of GostCipher
     */
    getGostCipher: function (algorithm) {
        return new GostCipher(algorithm);
    },
    /**
     * gostEngine.getGostDigest(algorithm) returns GOST R 34.11 cipher instance<br><br>
     *
     * Normalized algorithm identifier common parameters:
     *
     *  <ul>
     *      <li><b>name</b> Algorithm name 'GOST R 34.11'</li>
     *      <li><b>version</b> Algorithm version
     *          <ul>
     *              <li><b>1994</b> old-style 256 bits digest based on GOST 28147-89</li>
     *              <li><b>2012</b> 256 ro 512 bits digest algorithm "Streebog" GOST R 34.11-2012 (default)</li>
     *          </ul>
     *      </li>
     *      <li><b>length</b> Digest length
     *          <ul>
     *              <li><b>256</b> 256 bits digest</li>
     *              <li><b>512</b> 512 bits digest, valid only for algorithm "Streebog"</li>
     *          </ul>
     *      </li>
     *      <li><b>mode</b> Algorithm mode
     *          <ul>
     *              <li><b>HASH</b> simple digest mode (default)</li>
     *              <li><b>HMAC</b> HMAC algorithm based on GOST R 34.11</li>
     *              <li><b>KDF</b> Derive bits for KEK deversification</li>
     *              <li><b>PBKDF2</b> Password based key dirivation algorithms PBKDF2 (based on HMAC)</li>
     *              <li><b>PFXKDF</b> PFX key dirivation algorithms PFXKDF</li>
     *              <li><b>CPKDF</b> CryptoPro Password based key dirivation algorithms</li>
     *          </ul>
     *      </li>
     *      <li><b>sBox</b> Paramset sBox for GOST 28147-89. Used only if version = 1994</li>
     *  </ul>
     *
     * Supported algorithms, modes and parameters:
     *
     *  <ul>
     *      <li>Digest HASH mode (default)</li>
     *      <li>Sign/Verify HMAC modes parameters depends on version and length
     *          <ul>
     *              <li><b>version: 1994</b> HMAC parameters (B = 32, L = 32)</li>
     *              <li><b>version: 2012, length: 256</b> HMAC parameters (B = 64, L = 32)</li>
     *              <li><b>version: 2012, length: 512</b> HMAC parameters  (B = 64, L = 64)</li>
     *          </ul>
     *      </li>
     *      <li>DeriveBits/DeriveKey KDF mode
     *          <ul>
     *              <li><b>context</b> {@link CryptoOperationData} Context of the key derivation</li>
     *              <li><b>label</b> {@link CryptoOperationData} Label that identifies the purpose for the derived keying material</li>
     *          </ul>
     *      </li>
     *      <li>DeriveBits/DeriveKey PBKDF2 mode
     *          <ul>
     *              <li><b>salt</b> {@link CryptoOperationData} Random salt as input for HMAC algorithm</li>
     *              <li><b>iterations</b> Iteration count. GOST recomended value 1000 (default) or 2000</li>
     *          </ul>
     *      </li>
     *      <li>DeriveBits/DeriveKey PFXKDF mode
     *          <ul>
     *              <li><b>salt</b> {@link CryptoOperationData} Random salt as input for HMAC algorithm</li>
     *              <li><b>iterations</b> Iteration count. GOST recomended value 1000 (default) or 2000</li>
     *              <li><b>diversifier</b> Deversifier, ID=1 - key material for performing encryption or decryption,
     *              ID=2 - IV (Initial Value) for encryption or decryption, ID=3 - integrity key for MACing</li>
     *          </ul>
     *      </li>
     *      <li>DeriveBits/DeriveKey CPKDF mode
     *          <ul>
     *              <li><b>salt</b> {@link CryptoOperationData} Random salt as input for HMAC algorithm</li>
     *              <li><b>iterations</b> Iteration count. GOST recomended value 1000 (default) or 2000</li>
     *          </ul>
     *      </li>
     *  </ul>
     *
     * @memberOf gostEngine
     * @param {AlgorithmIndentifier} algorithm Algorithm identifier
     * @returns {GostDigest} Instance of GostDigest
     */
    getGostDigest: function (algorithm) {
        return new GostDigest(algorithm);
    },
    /**
     * gostEngine.getGostSign(algorithm) returns GOST R 34.10 cipher instance<br><br>
     *
     * Normalized algorithm identifier common parameters:
     *
     *  <ul>
     *      <li><b>name</b> Algorithm name 'GOST R 34.10'</li>
     *      <li><b>version</b> Algorithm version
     *          <ul>
     *              <li><b>1994</b> - Old-style GOST R 34.10-94 ExpMod algorithm with GOST R 34.11-94 hash</li>
     *              <li><b>2001</b> - GOST R 34.10-2001 Eliptic curve algorithm with old GOST R 34.11-94 hash</li>
     *              <li><b>2012</b> - GOST R 34.10-2012 Eliptic curve algorithm with GOST R 34.11-12 hash, default mode</li>
     *          </ul>
     *      </li>
     *      <li><b>length</b> Length of hash and signature. Key length == hash length for EC algorithms and 2 * hash length for ExpMod algorithm
     *          <ul>
     *              <li><b>GOST R 34.10-256</b> - 256 bits digest, default mode</li>
     *              <li><b>GOST R 34.10-512</b> - 512 bits digest only for GOST R 34.11-2012 hash</li>
     *          </ul>
     *      </li>
     *      <li><b>mode</b> Algorithm mode
     *          <ul>
     *              <li><b>SIGN</b> Digital signature mode (default)</li>
     *              <li><b>DH</b> Diffie-Hellman key generation and key agreement mode</li>
     *              <li><b>MASK</b> Key mask mode</li>
     *          </ul>
     *      </li>
     *      <li><b>sBox</b> Paramset sBox for GOST 34.11-94. Used only if version = 1994 or 2001</li>
     *  </ul>
     *
     * Supported algorithms, modes and parameters:
     *
     *  <ul>
     *      <li>Sign/Verify mode (SIGN)</li>
     *      <li>Wrap/Unwrap mode (MASK)</li>
     *      <li>DeriveKey/DeriveBits mode (DH)
     *          <ul>
     *              <li>{@link CryptoOperationData} <b>ukm</b> User key material. Default - random generated value</li>
     *              <li>{@link CryptoOperationData} <b>public</b> The peer's EC public key data</li>
     *          </ul>
     *      </li>
     *      <li>GenerateKey mode (SIGN and DH and MASK) version = 1994
     *          <ul>
     *              <li><b>namedParam</b> Paramset for key generation algorithm. If specified no additianal parameters required</li>
     *          </ul>
     *          Additional parameters, if namedParam not specified
     *          <ul>
     *              <li><b>modulusLength</b> Bit length of p (512 or 1024 bits). Default = 1024</li>
     *              <li><b>p</b> {@link CryptoOperationData} Modulus, prime number, 2^(t-1)<p<2^t</li>
     *              <li><b>q</b> {@link CryptoOperationData} Order of cyclic group, prime number, 2^254<q<2^256, q is a factor of p-1</li>
     *              <li><b>a</b> {@link CryptoOperationData} Generator, integer, 1<a<p-1, at that aq (mod p) = 1</li>
     *          </ul>
     *      </li>
     *      <li>GenerateKey mode (SIGN and DH and MASK) version = 2001 or 2012
     *          <ul>
     *              <li><b>namedCurve</b> Paramset for key generation algorithm. If specified no additianal parameters required</li>
     *          </ul>
     *          Additional EC parameters, if namedCurve not specified
     *          <ul>
     *              <li><b>p</b> {@link CryptoOperationData} Prime number - elliptic curve modulus</li>
     *              <li><b>a</b> {@link CryptoOperationData} Coefficients a of the elliptic curve E</li>
     *              <li><b>b</b> {@link CryptoOperationData} Coefficients b of the elliptic curve E</li>
     *              <li><b>q</b> {@link CryptoOperationData} Prime number - order of cyclic group</li>
     *              <li><b>x</b> {@link CryptoOperationData} Base point p x-coordinate</li>
     *              <li><b>y</b> {@link CryptoOperationData} Base point p y-coordinate</li>
     *          </ul>
     *      </li>
     *  </ul>
     *
     * @memberOf gostEngine
     * @param {AlgorithmIndentifier} algorithm Algorithm identifier
     * @returns {GostSign} Instance of GostSign
     */
    getGostSign: function (algorithm) {
        return new GostSign(algorithm);
    }
};

export { gostEngine };
