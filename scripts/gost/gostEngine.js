/**
 * @file GOST 34.10-2012 signature function with 1024/512 bits digest
 * @version 0.99
 * @copyright 2014, Rudolf Nickolaev. All rights reserved.
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

    /*
     * Module imports and exports
     * 
     */ // <editor-fold defaultstate="collapsed">
    if (typeof define === 'function' && define.amd) {
        define(['gostRandom', 'gost28147', 'gostR3411', 'gostR3410'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('gostRandom'), require('gost28147'), require('gostR3411'), require('gostR3410'));
    } else {
        if (typeof importScripts !== 'undefined') {
            if (!(root.gostRandom && root.Gost28147 && root.GostR3411 && root.GostR3410))
                importScripts('gostRandom.js', 'gost28147.js', 'gostR3411.js', 'gostR3410.js');
        }
        root.gostEngine = factory(root.gostRandom, root.Gost28147, root.GostR3411, root.GostR3410);
    }
    // </editor-fold>

}(this, function(gostRandom, Gost28147, GostR3411, GostR3410) {

    /*
     * Engine definition base on normalized algorithm identifier
     * 
     */ // <editor-fold defaultstate="collapsed">

    var root = this;

    // Define engine
    function defineEngine(method, algorithm) {
        if (!algorithm)
            throw new (root.SyntaxError || Error)('Algorithm not defined');

        if (!algorithm.name)
            throw new (root.SyntaxError || Error)('Algorithm name not defined');

        var name = algorithm.name, mode = algorithm.mode;
        if (name === 'GOST 28147' && (method === 'generateKey' ||
                (mode === 'MAC' && (method === 'sign' || method === 'verify')) ||
                (mode === 'KW' && (method === 'wrapKey' || method === 'unwrapKey')) ||
                ((!mode || mode === 'ES') && (method === 'encrypt' || method === 'decrypt')))) {
            return 'Gost28147';

        } else if (name === 'GOST R 34.11' && (method === 'digest' ||
                (mode === 'HMAC' && (method === 'sign' || method === 'verify' || method === 'generateKey')) ||
                (mode === 'PBKDF2' && (method === 'deriveKey' || method === 'deriveBits' || method === 'generateKey')))) {
            return 'GostR3411';

        } else if (name === 'GOST R 34.10' && (method === 'generateKey' ||
                ((!mode || mode === 'SIGN') && (method === 'sign' || method === 'verify')) ||
                (mode === 'DH' || (method === 'deriveKey' || method === 'deriveBits')))) {

            return 'GostR3410';
        } else
            throw new (root.NotSupportedError || Error)('Algorithm ' + name + '-' + mode + ' is not valid for ' + method);
    } // </editor-fold>

    /**
     * Object implements dedicated Web Workers and provide a simple way to create 
     * and run GOST cryptographic algorithms in background thread. 
     * 
     * Object provide interface to GOST low-level cryptogric classes:
     *  <ul>
     *      <li>Gost28147 - implementation of GOST 28147 Encryption algorithms. Reference {@link http://tools.ietf.org/html/rfc5830}</li>
     *      <li>GostR3411 - implementation of GOST R 34.11 Hash Function algorithms. References {@link http://tools.ietf.org/html/rfc5831} and {@link http://tools.ietf.org/html/rfc6986}</li>
     *      <li>GostR3410 - implementation of GOST R 34.10 Digital Signature algorithms. References {@link http://tools.ietf.org/html/rfc5832} and {@link http://tools.ietf.org/html/rfc7091}</li>
     *  </ul>
     * @namespace gostEngine
     */
    var gostEngine = {
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
        execute: function(algorithm, method, args) // <editor-fold defaultstate="collapsed">
        {
            // Define engine for GOST algorithms
            var engine = defineEngine(method, algorithm);
            // Create cipher 
            var cipher = this['get' + engine](algorithm);
            // Execute method
            return cipher[method].apply(cipher, args);
        }, // </editor-fold>
        /**
         * gostEngine.getGost28147(algorithm) returns GOST 28147 cipher instance<br><br>
         * 
         * GOST 28147-89 Encryption Algorithm<br><br> 
         * When keys and initialization vectors are converted to/from byte arrays, 
         * little-endian byte order is assumed.<br><br>
         * 
         * Normalized algorithm identifier common parameters:
         * 
         *  <ul>
         *      <li><b>name</b> Algorithm name 'GOST 28147'</li>
         *      <li><b>version</b> Algorithm version, number
         *          <ul>
         *              <li><b>1989</b> Current version of standard</li>
         *              <li><b>2014</b> New planned version of standard. Now not supported</li>
         *          </ul>
         *      </li>
         *      <li><b>length</b> Key length, number. Block length = key length / 4
         *          <ul>
         *              <li><b>256</b> 256 bits digest (default)</li>
         *              <li><b>512</b> 512 bits digest. Now not supported</li>
         *          </ul>
         *      </li>
         *      <li><b>mode</b> Algorithm mode, string
         *          <ul>
         *              <li><b>ES</b> Encryption mode (default)</li>
         *              <li><b>MAC</b> "imitovstavka" (MAC) mode</li>
         *              <li><b>KW</b> Key wrapping mode</li>
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
         *              <li><b>padding</b> Padding mode, string. Default NO for CFB and CNT modes, or ZERO for others</li>
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
         *  </ul>
         *      
         * Supported paramters values:
         *      
         *  <ul>
         *      <li>Block modes (parameter 'block')
         *          <ul>
         *              <li><b>ECB</b> "prostaya zamena" (ECB) mode (default)</li>
         *              <li><b>CFB</b> "gammirovanie s obratnoj svyaziyu" (64-bit CFB) mode</li>
         *              <li><b>CNT</b> "gammirovanie" (counter) mode</li>
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
         *              <li><b>NO</b> No padding only for CFB and CNT modes</li>
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
         * @returns {Gost28147} Instance of Gost28147
         */
        getGost28147: function(algorithm) // <editor-fold defaultstate="collapsed">
        {
            return new (Gost28147 || (Gost28147 = root.Gost28147))(algorithm);
        }, // </editor-fold>
        /**
         * gostEngine.getGostR3411(algorithm) returns GOST R 34.11 cipher instance<br><br>
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
         *  </ul>
         * 
         * @memberOf gostEngine
         * @param {AlgorithmIndentifier} algorithm Algorithm identifier
         * @returns {GostR3411} Instance of GostR3411
         */
        getGostR3411: function(algorithm) // <editor-fold defaultstate="collapsed">
        {
            return new (GostR3411 || (GostR3411 = root.GostR3411))(algorithm);
        }, // </editor-fold>
        /**
         * gostEngine.getGostR3410(algorithm) returns GOST R 34.10 cipher instance<br><br>
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
         *          </ul>
         *      </li>
         *      <li><b>sBox</b> Paramset sBox for GOST 34.11-94. Used only if version = 1994 or 2001</li>
         *  </ul>
         *  
         * Supported algorithms, modes and parameters:
         * 
         *  <ul>
         *      <li>Sign/Verify mode (SIGN)</li>
         *      <li>DeriveKey/DeriveBits mode (DH)
         *          <ul>
         *              <li>{@link CryptoOperationData} <b>ukm</b> User key material. Default - random generated value</li>
         *              <li>{@link CryptoOperationData} <b>public</b> The peer's EC public key data</li>
         *          </ul>
         *      </li>
         *      <li>GenerateKey mode (SIGN and DH) version = 1994
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
         *      <li>GenerateKey mode (SIGN and DH) version = 2001 or 2012
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
         * @returns {GostR3410} Instance of GostR3410
         */
        getGostR3410: function(algorithm) // <editor-fold defaultstate="collapsed">
        {
            return new (GostR3410 || (GostR3410 = root.GostR3410))(algorithm);
        } // </editor-fold>
    };

    /*
     * Worker method execution
     * 
     */ // <editor-fold defaultstate="collapsed">

    // Worker for gostCripto method execution
    if (root.importScripts) {

        /**
         * Method called when {@link SubtleCrypto} calls its own postMessage() 
         * method with data parameter: algorithm, method and arg.<br>
         * Call method execute and postMessage() results to onmessage event handler 
         * in the main process.<br>
         * If error occured onerror event handler executed in main process.
         * 
         * @memberOf gostEngine
         * @name onmessage
         * @param {MessageEvent} event Message event with data {algorithm, method, args}
         */
        root.onmessage = function(event) {
            try {
                postMessage({
                    id: event.data.id,
                    result: gostEngine.execute(event.data.algorithm,
                            event.data.method, event.data.args)});
            } catch (e) {
                postMessage({
                    id: event.data.id,
                    error: e.message
                });
            }
        };
    } else {

        // Load dependens
        var baseUrl = '', nameSuffix = '';
        // Try to define from DOM model
        if (typeof document !== 'undefined') {
            (function() {
                var regs = /^(.*)gostCrypto(.*)\.js$/i;
                var list = document.querySelectorAll('script');
                for (var i = 0, n = list.length; i < n; i++) {
                    var value = list[i].getAttribute('src');
                    var test = regs.exec(value);
                    if (test) {
                        baseUrl = test[1];
                        nameSuffix = test[2];
                    }
                }
            })();
        }

        // Local importScripts procedure for include dependens
        var importScripts = function() {
            for (var i = 0, n = arguments.length; i < n; i++) {
                var name = arguments[i].split('.'),
                        src = baseUrl + name[0] + nameSuffix + '.' + name[1];
                var el = document.querySelector('script[src="' + src + '"]');
                if (!el) {
                    el = document.createElement('script');
                    el.setAttribute('src', src);
                    document.head.appendChild(el);
                }
            }
        };

        // Import engines
        if (!gostRandom)
            importScripts('gostRandom.js');
        if (!Gost28147)
            importScripts('gost28147.js');
        if (!GostR3411)
            importScripts('gostR3411.js');
        if (!GostR3410)
            importScripts('gostR3410.js');
    } // </editor-fold>

    return gostEngine;

}));

