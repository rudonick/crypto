/** 
 * @file Key and Certificate Store methods
 * @version 1.70
 * @copyright 2014-2015, Rudolf Nickolaev. All rights reserved.
 */

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

(function (root, factory) {

    /*
     * Module imports and exports
     * 
     */ // <editor-fold defaultstate="collapsed">
    if (typeof define === 'function' && define.amd) {
        define(['gostCrypto', 'gostASN1', 'gostCert', 'gostCMS'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('gostCrypto'), require('gostASN1'), require('gostCert'), require('gostCMS'));
    } else {
        root.GostKeys = factory(root.gostCrypto, root.GostASN1, root.GostCert, root.GostCMS);
    }
    // </editor-fold>

}(this, function (gostCrypto) {

    /*
     * Common tools and methods
     */ // <editor-fold defaultstate="collapsed">

    var root = this;
    var Promise = root.Promise;
    var Object = root.Object;
    var CryptoOperationData = root.ArrayBuffer;
    var Date = root.Date;

    var subtle = gostCrypto.subtle;
    var asn1 = gostCrypto.asn1;
    var coding = gostCrypto.coding;
    var providers = gostCrypto.security.providers;
    var cert = gostCrypto.cert;
    var cms = gostCrypto.cms;

    // Expand javascript object
    function expand(r) {
        for (var i = 1, n = arguments.length; i < n; i++) {
            var item = arguments[i];
            if (typeof item === 'object')
                for (var name in item)
                    if (item.hasOwnProperty(name))
                        r[name] = item[name];
        }
        return r;
    }

    function defineProperty(object, name, descriptor, enumerable) {
        if (typeof descriptor !== 'object')
            descriptor = {value: descriptor};
        if (enumerable !== undefined)
            descriptor.enumerable = enumerable;
        Object.defineProperty(object, name, descriptor);
    }

    function defineProperties(object, properties, enumerable) {
        for (var name in properties)
            defineProperty(object, name, properties[name], enumerable);
    }

    // Extend javascript class
    function extend(Super, Class, propertiesObject, propertiesClass) {
        // If constructor not defined
        if (typeof Class !== 'function') {
            propertiesClass = propertiesObject;
            propertiesObject = Class;
            Class = function () {
                Super.apply(this, arguments);
            };
        }
        // Create prototype properties
        Class.prototype = Object.create(Super.prototype, {
            constructor: {
                value: Class
            },
            superclass: {
                value: Super.prototype
            }
        });
        if (propertiesObject)
            defineProperties(Class.prototype, propertiesObject, true);
        // Inherites super class properties
        if (Super !== Object)
            for (var name in Super)
                Class[name] = Super[name];
        Class.super = Super;
        if (propertiesClass)
            defineProperties(Class, propertiesClass, true);
        return Class;
    }

    // Get random values
    function getSeed(length) {
        var seed = new Uint8Array(length);
        gostCrypto.getRandomValues(seed);
        return seed.buffer;
    }

    // Self resolver
    function call(callback) {
        try {
            callback();
        } catch (e) {
        }
    }

    // Today date + n days
    function now(n) {
        var date = new Date();
        // date.setHours(0, 0, 0, 0);
        if (n)
            date.setDate(date.getDate() + n);
        return date;
    }

    // Check the buffers to equal
    function equalBuffers(r1, r2) {
        var s1 = new Uint8Array(r1),
                s2 = new Uint8Array(r2);
        if (s1.length !== s2.length)
            return false;
        for (var i = 0, n = s1.length; i < n; i++)
            if (s1[i] !== s2[i])
                return false;
        return true;
    }

    // Salt size
    function saltSize(algorithm) {
        switch (algorithm.id) {
            case 'pbewithSHAAnd40BitRC2-CBC':
            case 'pbeWithSHAAnd128BitRC2-CBC':
                return 8;
            case 'pbeUnknownGost':
                return 16;
            case 'sha1':
                return 20;
            default:
                return 32;
        }
    }

    // Password to bytes
    function passwordData(derivation, password) {
        if (!password)
            return new CryptoOperationData(0);
        if (derivation.name.indexOf('CPKDF') >= 0) {
            // CryptoPro store password
            var r = [];
            for (var i = 0; i < password.length; i++) {
                var c = password.charCodeAt(i);
                r.push(c & 0xff);
                r.push(c >>> 8 & 0xff);
                r.push(0);
                r.push(0);
            }
            return new Uint8Array(r).buffer;
        } else if (derivation.name.indexOf('PFXKDF') >= 0)
            // PKCS#12 unicode password
            return coding.Chars.decode(password + '\0', 'unicode');
        else
            // PKCS#5 password mode
            return coding.Chars.decode(password, 'utf8');
    }

    // </editor-fold>

    /**
     * Key and Certificate Store methods
     * 
     * @class GostKeys
     */
    function GostKeys() {
    }

    /**
     * Key templates
     * <ul>
     *      <li>providerName - provider name for key encryption, default 'CP-01'</li>
     *      <li>days - validity of the key in days, default 7305</li>
     * </ul>
     * 
     * @memberOf GostKeys
     * @instance
     */
    var options = {// <editor-fold defaultstate="collapsed">
        providerName: 'CP-01',
        days: 7305 // </editor-fold>
    };

    GostKeys.prototype.options = options;

    /**
     * A class for private keys in PKCS #8 format
     * 
     * @class GostKeys.PKCS8
     * @extends GostASN1.PrivateKeyInfo
     * @param {(FormatedData|GostASN1.PrivateKeyInfo)} keyInfo
     */
    function PKCS8(keyInfo) {
        asn1.PrivateKeyInfo.call(this, keyInfo);
    }

    extend(asn1.PrivateKeyInfo, PKCS8, {
        /**
         * Get the private key
         * 
         * @memberOf GostKeys.PKCS8
         * @instance
         * @returns {Promise} Promise to return the {@link Key}
         */
        getPrivateKey: function () // <editor-fold defaultstate="collapsed">
        {
            var keyUsages = (this.privateKeyAlgorithm.id === 'rsaEncryption') ? ['sign'] :
                    ['sign', 'deriveKey', 'deriveBits'];
            return subtle.importKey('pkcs8', this.encode(), this.privateKeyAlgorithm, 'true', keyUsages);
        }, // </editor-fold>
        /**
         * Set the private key
         * 
         * @memberOf GostKeys.PKCS8
         * @instance
         * @param {Key} privateKey The Private Key
         * @returns {Promise} Promise to return the self object after set the key
         */
        setPrivateKey: function (privateKey) // <editor-fold defaultstate="collapsed">
        {
            var self = this;
            return subtle.exportKey('pkcs8', privateKey).then(function (keyInfo) {
                asn1.PrivateKeyInfo.call(self, keyInfo);
                return self;
            });
        }, // </editor-fold> 
        /**
         * Generate private key and return certification request
         * 
         * @memberOf GostKeys.PKCS8
         * @instance
         * @param {(FormatedData|GostASN1.CertificationRequest)} req The request templates
         * @param {(AlgorithmIdentifier|string)} keyAlgorithm The name of provider or algorithm identifier
         * @returns {Promise} Promise to return the {@link GostCert.Request} after key generation
         */
        generate: function (req, keyAlgorithm) // <editor-fold defaultstate="collapsed">
        {
            var self = this;
            return new Promise(call).then(function () {
                if (!(req instanceof cert.Request))
                    req = new cert.Request(req);
                // Generate request
                return req.generate(keyAlgorithm);
            }).then(function (key) {
                asn1.PrivateKeyInfo.call(self, key);
                ;
                return req;
            });
        } // </editor-fold> 
    });

    /**
     * A class for private keys in PKCS #8 format
     * 
     * @memberOf GostKeys
     * @type GostKeys.PKCS8
     */
    GostKeys.prototype.PKCS8 = PKCS8;

    /**
     * A class for PKCS #5 and PKCS #12 password-encrypted private keys in PKCS #8 format
     * 
     * @class GostKeys.PKCS8Encrypted
     * @extends GostASN1.EncryptedPrivateKeyInfo
     * @param {(FormatedData|GostASN1.EncryptedPrivateKeyInfo)} encryptedKey
     */
    function PKCS8Encrypted(encryptedKey) {
        asn1.EncryptedPrivateKeyInfo.call(this, encryptedKey);
    }

    extend(asn1.EncryptedPrivateKeyInfo, PKCS8Encrypted, {
        /**
         * Get the private key info
         * 
         * @memberOf GostKeys.PKCS8Encrypted
         * @instance
         * @param {(Key|CryptoOperationData|string)} keyPassword The secret key or password for decryption 
         * @returns {Promise} Promise to return decrypted {@link GostKeys.PKCS8}
         */
        getKey: function (keyPassword) // <editor-fold defaultstate="collapsed">
        {
            var self = this, engine;
            return new Promise(call).then(function () {
                engine = new cms.EncryptedDataContentInfo({
                    contentType: 'encryptedData',
                    version: 0,
                    encryptedContentInfo: {
                        contentType: 'data',
                        contentEncryptionAlgorithm: self.encryptionAlgorithm,
                        encryptedContent: self.encryptedData
                    }
                });
                return engine.getEnclosed(keyPassword);
            }).then(function (contentInfo) {
                // Create key object
                return PKCS8.decode(contentInfo.content);
            });
        }, // </editor-fold>
        /**
         * Get the private key
         * 
         * @memberOf GostKeys.PKCS8Encrypted
         * @instance
         * @param {(Key|CryptoOperationData|string)} keyPassword The secret key or password for decryption 
         * @returns {Promise} Promise to return decrypted {@link Key}
         */
        getPrivateKey: function (keyPassword) // <editor-fold defaultstate="collapsed">
        {
            return this.getKey(keyPassword).then(function (keyInfo) {
                return keyInfo.getPrivateKey();
            });
        }, // </editor-fold>
        /**
         * Sets and encrypt the private key info
         * 
         * @memberOf GostKeys.PKCS8Encrypted
         * @instance
         * @param {(FormatedData|GostKeys.PKCS8)} keyInfo The private key info 
         * @param {(Key|CryptoOperationData|string)} keyPassword The secret key or password for encryption
         * @param {(AlgorithmIdentifier|string)} encryptionAlgorithm The encryption algorithm or provider name
         * @returns {Promise} Promise to return self object after set key 
         */
        setKey: function (keyInfo, keyPassword, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
        {
            var self = this, engine;
            return new Promise(call).then(function () {
                keyInfo = new PKCS8(keyInfo);
                engine = new cms.EncryptedDataContentInfo();
                return engine.encloseContent(keyPassword, keyInfo.encode(), encryptionAlgorithm || options.providerName);
            }).then(function () {
                self.encryptionAlgorithm = engine.encryptedContentInfo.contentEncryptionAlgorithm;
                self.encryptedData = engine.encryptedContentInfo.encryptedContent;
                return self;
            });
        }, // </editor-fold>
        /**
         * Set the private key
         * 
         * @memberOf GostKeys.PKCS8Encrypted
         * @instance
         * @param {Key} privateKey The private key
         * @param {(Key|CryptoOperationData|string)} keyPassword The secret key or password for decryption 
         * @param {(AlgorithmIdentifier|string)} encryptionAlgorithm The encryption algorithm or provider name
         * @returns {Promise} Promise to return self object after set key 
         */
        setPrivateKey: function (privateKey, keyPassword, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
        {
            var self = this;
            return new PKCS8().setPrivateKey(privateKey).then(function (keyInfo) {
                return self.setKey(keyInfo, keyPassword, encryptionAlgorithm);
            });
        }, // </editor-fold>
        /**
         * Generate private key and return certification request
         * 
         * @memberOf GostKeys.PKCS8Encrypted
         * @instance
         * @param {(FormatedData|GostASN1.CertificationRequest)} req The request templates
         * @param {(Key|CryptoOperationData|string)} keyPassword The secret key or password for decryption 
         * @param {(AlgorithmIdentifier|string)} keyAlgorithm The name of provider or algorithm
         * @param {(AlgorithmIdentifier|string)} encryptionAlgorithm The encryption algorithm or provider name
         * @returns {Promise} Promise to return {@link GostCert.Request}
         */
        generate: function (req, keyPassword, keyAlgorithm, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
        {
            var self = this;
            return new Promise(call).then(function () {
                if (!(req instanceof cert.Request))
                    req = new cert.Request(req);
                // Generate request
                return req.generate(keyAlgorithm);
            }).then(function (key) {
                return self.setKey(key, keyPassword, encryptionAlgorithm);
            }).then(function () {
                return req;
            });
        }  // </editor-fold>  
    });

    /**
     * A class for PKCS #5 and PKCS #12 password-encrypted private keys in PKCS #8 format
     * 
     * @memberOf GostKeys
     * @type GostKeys.PKCS8Encrypted
     */
    GostKeys.prototype.PKCS8Encrypted = PKCS8Encrypted;

    /**
     * A class for password-encrypted private keys in SignalCom container<br><br>
     * 
     * The container file list:
     * <ul>
     *      <li>mk.db3 - master key data</li>
     *      <li>masks.db3 - encrypted or decrypted masks</li>
     *      <li>kek.opq - wrapped key encryption key</li>
     *      <li>rand.opq - wrapped random data</li>
     * </ul>
     * 
     * @class GostKeys.SignalComKeyContainer
     * @param {SignalComKeyContainer} container 
     */
    function SignalComKeyContainer(container) // <editor-fold defaultstate="collapsed"> 
    {
        if (container) {
            var self = this;
            ['mk.db3', 'masks.db3', 'kek.opq', 'rand.opq'].forEach(function (name) {
                self[name] = container[name];
            });
        }
    } // </editor-fold>

    extend(Object, SignalComKeyContainer, {
        /**
         * Get password-based encryption key
         * 
         * @memberOf GostKeys.SignalComKeyContainer
         * @instance
         * @param {string} keyPassword 
         * @returns {Promise} Promise to return {@link Key}
         */
        getEncryptionKey: function (keyPassword) // <editor-fold defaultstate="collapsed"> 
        {
            var self = this, wrapping = providers['SC-01'].wrapping,
                    encryption = providers['SC-01'].encryption,
                    derivation = providers['SC-01'].derivation,
                    masks = self['masks.db3'], mk = self['mk.db3'], kek = self['kek.opq'];
            // Decrypt key
            return new Promise(call).then(function () {
                if ((!masks || !mk || !kek))
                    throw new Error('Not enougth key container files');
                // Check for encrypted key
                if (masks.byteLength > 32) {
                    if (keyPassword) {
                        // Extract password based encryption mask
                        return subtle.importKey('raw', coding.Chars.decode(keyPassword),
                                derivation, false, ['deriveKey', 'deriveBits']).then(function (integrityKey) {
                            return subtle.deriveKey(expand(derivation,
                                    {salt: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])}),
                            integrityKey, encryption, false, ['decrypt']);
                        }).then(function (encryptionKey) {
                            var encrypted = new cms.EncryptedDataContentInfo(masks);
                            return encrypted.getEnclosed(encryptionKey);
                        }).then(function (digested) {
                            return digested.verify();
                        }).then(function (data) {
                            return data.content;
                        });
                    } else
                        throw new Error('Key password is required');
                } else if (keyPassword)
                    throw new Error('Key password is not required');
                return masks;
            }).then(function (decrypedMasks) {
                // Combine masks
                masks = decrypedMasks;
                var mkm = new Uint8Array(mk.byteLength + masks.byteLength);
                mkm.set(new Uint8Array(mk), 0);
                mkm.set(new Uint8Array(masks), mk.byteLength);
                // Import master key
                return subtle.importKey('raw', mkm.buffer, wrapping, false, ['unwrapKey']);
            }).then(function (unwrappingKey) {
                // Unwrap kek
                return subtle.unwrapKey('raw', kek, unwrappingKey, wrapping, encryption,
                        false, ['wrapKey', 'unwrapKey']);
            });
        }, // </editor-fold>
        /**
         * Generate encryption key and container files
         * 
         * @memberOf GostKeys.SignalComKeyContainer
         * @instance
         * @param {string} keyPassword
         * @returns {Promise} Promise to return {@link Key}
         */
        generateContainer: function (keyPassword) // <editor-fold defaultstate="collapsed"> 
        {
            var self = this, wrapping = providers['SC-01'].wrapping,
                    encryption = providers['SC-01'].encryption,
                    derivation = providers['SC-01'].derivation,
                    digest = providers['SC-01'].digest,
                    encryptionKey, wrappingKey;
            return new Promise(call).then(function () {
                // Generate wrapping key
                return subtle.generateKey(wrapping, true, ['wrapKey']);
            }).then(function (key) {
                wrappingKey = key;
                // Split masks
                var len = wrappingKey.buffer.byteLength;
                self['mk.db3'] = new Uint8Array(new Uint8Array(wrappingKey.buffer, 0, len - 32)).buffer;
                var masks = new Uint8Array(new Uint8Array(wrappingKey.buffer, len - 32, 32)).buffer;
                if (keyPassword) {
                    // Encrypt masks
                    var encrypted = new cms.EncryptedDataContentInfo(),
                            digested = new cms.DigestedDataContentInfo();
                    // Digest data
                    return digested.encloseContent(masks, digest).then(function () {
                        digested = {// Double wrapping - SignalCom mistake
                            contentType: 'digestedData',
                            content: digested.encode()
                        };
                        return subtle.importKey('raw', coding.Chars.decode(keyPassword),
                                derivation, false, ['deriveKey', 'deriveBits']);
                    }).then(function (integrityKey) {
                        return subtle.deriveKey(expand(derivation,
                                {salt: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])}),
                        integrityKey, encryption, false, ['encrypt']);
                    }).then(function (encryptionKey) {
                        // Encrypt data with password
                        return encrypted.encloseContent(digested, encryptionKey, encryption);
                    }).then(function () {
                        return encrypted.encode();
                    });
                }
                return masks;
            }).then(function (masks) {
                self['masks.db3'] = masks;
                // Generate encryption key
                return subtle.generateKey(encryption, false, ['wrapKey', 'unwrapKey']);
            }).then(function (key) {
                encryptionKey = key;
                // Wrap encryption key
                return subtle.wrapKey('raw', key, wrappingKey, wrapping);
            }).then(function (data) {
                self['kek.opq'] = data;
                // Generate random seed
                return subtle.generateKey(encryption, false, ['wrapKey', 'unwrapKey']);
            }).then(function (key) {
                // Wrap random seed
                return subtle.wrapKey('raw', key, wrappingKey, wrapping);
            }).then(function (data) {
                self['rand.opq'] = data;
                return encryptionKey;
            });
        } // </editor-fold>
    });

    /**
     * A class for password-encrypted private keys in SignalCom container
     * 
     * @memberOf GostKeys
     * @type GostKeys.SignalComKeyContainer
     */
    GostKeys.prototype.SignalComKeyContainer = SignalComKeyContainer;

    /**
     * A class for password-encrypted SignalCom private keys
     * 
     * @class GostKeys.SignalComPrivateKeyInfo
     * @extends GostASN1.GostWrappedPrivateKey
     * @extends GostKeys.SignalComKeyContainer
     * @param {GostASN1.PrivateKeyInfo} keyInfo 
     * @param {SignalComKeyContainer} container 
     */
    function SignalComPrivateKeyInfo(keyInfo, container) // <editor-fold defaultstate="collapsed"> 
    {
        asn1.GostWrappedPrivateKey.call(this, keyInfo);
        SignalComKeyContainer.call(this, container);
    } // </editor-fold>

    extend(asn1.GostWrappedPrivateKey, SignalComPrivateKeyInfo, {
        /**
         * Get the private key info
         * 
         * @memberOf GostKeys.SignalComPrivateKeyInfo
         * @param {string} keyPassword The password for decryption 
         * @returns {Promise} Promise to return {@link GostKeys.PKCS8}
         */
        getKey: function (keyPassword) // <editor-fold defaultstate="collapsed">
        {
            return this.getPrivateKey(keyPassword).then(function (privateKey) {
                return new PKCS8().setPrivateKey(privateKey);
            });
        }, // </editor-fold>
        /**
         * Get the private key
         * 
         * @memberOf GostKeys.SignalComPrivateKeyInfo
         * @instance
         * @param {string} keyPassword The password for decryption 
         * @returns {Promise} Promise to return the {@link Key}
         */
        getPrivateKey: function (keyPassword) // <editor-fold defaultstate="collapsed">
        {
            var self = this, wrapping = providers['SC-01'].wrapping,
                    publicKeyData;
            // Decrypt key
            return new Promise(call).then(function () {
                // Get password key
                return self.getEncryptionKey(keyPassword, true);
            }).then(function (encryptionKey) {
                // Unwrap private key
                return subtle.unwrapKey('raw', self.privateKeyWrapped, encryptionKey, wrapping,
                        self.privateKeyAlgorithm, true, ['sign', 'deriveKey', 'deriveBits']);
            }).then(function (privateKey) {
                publicKeyData = self.attributes && self.attributes['id-sc-gostR3410-2001-publicKey'];
                // Generate key pair
                if (publicKeyData)
                    return subtle.generateKey(expand(privateKey.algorithm, {ukm: privateKey.buffer}),
                            privateKey.extractable, privateKey.usages);
                else
                    return {privateKey: privateKey};
            }).then(function (keyPair) {
                // Compare public key
                if (publicKeyData && !equalBuffers(keyPair.publicKey.buffer, publicKeyData))
                    throw new Error('Check public key failed');
                return keyPair.privateKey;
            });
        }, // </editor-fold>
        /**
         * Sets and encrypt the private key info
         * 
         * @memberOf GostKeys.SignalComPrivateKeyInfo
         * @instance
         * @param {(FormatedData|GostKeys.PKCS8)} keyInfo The private key info 
         * @param {string} keyPassword The password for encryption
         * @returns {Promise} Promise to return self object after set the key
         */
        setKey: function (keyInfo, keyPassword) // <editor-fold defaultstate="collapsed">
        {
            var self = this;
            return new PKCS8(keyInfo).getPrivateKey().then(function (privateKey) {
                return self.setPrivateKey(privateKey, keyPassword);
            });
        }, // </editor-fold>
        /**
         * Set the private key
         * 
         * @memberOf GostKeys.SignalComPrivateKeyInfo
         * @instance
         * @param {Key} privateKey The private key
         * @param {string} keyPassword The secret key encryption 
         * @returns {Promise} Promise to return self object after set the key
         */
        setPrivateKey: function (privateKey, keyPassword) // <editor-fold defaultstate="collapsed">
        {
            var self = this, wrapping = providers['SC-01'].wrapping, wrappedData;
            return new Promise(call).then(function () {
                // Get or generate encryption key
                return self.getEncryptionKey(keyPassword)['catch'](function () {
                    return self.generateContainer(keyPassword);
                });
            }).then(function (encryptionKey) {
                // Encrypt key buffer
                return subtle.wrapKey('raw', privateKey, encryptionKey, wrapping);
            }).then(function (data) {
                wrappedData = data;
                // Generate public key
                return subtle.generateKey(expand(privateKey.algorithm,
                        {ukm: privateKey.buffer}), true, ['sign', 'verify']);
            }).then(function (keyPair) {
                self.object = {
                    version: 0,
                    privateKeyAlgorithm: privateKey.algorithm,
                    privateKeyWrapped: wrappedData,
                    attributes: {
                        'id-sc-gostR3410-2001-publicKey': keyPair.publicKey.buffer
                    }
                };
                return self;
            });
        }, // </editor-fold>
        /**
         * Change key password
         * 
         * @memberOf GostKeys.SignalComPrivateKeyInfo
         * @instance
         * @param {string} oldKeyPassword Old key password
         * @param {string} newKeyPassword New key password
         * @returns {Promise} Promise to return self object after change password
         */
        changePassword: function (oldKeyPassword, newKeyPassword) // <editor-fold defaultstate="collapsed">
        {
            var self = this;
            return self.getPrivateKey(oldKeyPassword).then(function (privateKey) {
                return self.setPrivateKey(privateKey, newKeyPassword);
            });
        }, // </editor-fold>
        /**
         * Generate private key, certificate and return certification request
         * 
         * @memberOf GostKeys.SignalComPrivateKeyInfo
         * @instance
         * @param {(FormatedData|GostASN1.CertificationRequest)} req The request templates
         * @param {(Key|CryptoOperationData|string)} keyPassword The secret key or password for decryption 
         * @param {(AlgorithmIdentifier|string)} keyAlgorithm The name of provider or algorithm
         * @returns {Promise} Promise to return {@link GostCert.Request}
         */
        generate: function (req, keyPassword, keyAlgorithm) // <editor-fold defaultstate="collapsed">
        {
            var self = this, keyInfo;
            return new Promise(call).then(function () {
                if (!(req instanceof cert.Request))
                    req = new cert.Request(req);
                // Generate request
                return req.generate(keyAlgorithm);
            }).then(function (key) {
                keyInfo = key;
                return self.setKey(keyInfo, keyPassword);
            }).then(function () {
                return req;
            });
        } // </editor-fold>
    });
    defineProperties(SignalComPrivateKeyInfo.prototype, SignalComKeyContainer.prototype);

    /**
     * A class for password-encrypted SignalCom private keys
     * 
     * @memberOf GostKeys
     * @type GostKeys.SignalComPrivateKeyInfo
     */
    GostKeys.prototype.SignalComPrivateKeyInfo = SignalComPrivateKeyInfo;

    /**
     * A class for password-encrypted private keys in CryptoPro container
     * 
     * The container file list:
     * <ul>
     *      <li>header - container header @link GostASN1.GostKeyContainer</li>
     *      <li>name - container name @link GostASN1.GostKeyContainerName</li>
     *      <li>primary - private keys data @link GostASN1.GostPrivateKeys</li>
     *      <li>masks - private key masks @link GostASN1.GostPrivateMasks</li>
     *      <li>primary2 - reserve of private keys data @link GostASN1.GostPrivateKeys</li>
     *      <li>masks2 - reserve of private key masks @link GostASN1.GostPrivateMasks</li>
     * </ul>
     * 
     * @class GostKeys.CryptoProKeyContainer
     * @param {Object} container 
     */
    function CryptoProKeyContainer(container) // <editor-fold defaultstate="collapsed"> 
    {
        if (container) {
            this.header = asn1.GostKeyContainer.decode(container.header);
            this.name = asn1.GostKeyContainerName.decode(container.name);
            this.primary = asn1.GostPrivateKeys.decode(container.primary);
            this.masks = asn1.GostPrivateMasks.decode(container.masks);
            if (container.primary2 && container.masks2) {
                this.primary2 = asn1.GostPrivateKeys.decode(container.primary2);
                this.masks2 = asn1.GostPrivateMasks.decode(container.masks2);
            }
        }
    } // </editor-fold>

    extend(Object, CryptoProKeyContainer, (function () {

        // <editor-fold defaultstate="collapsed"> 
        // True if 512 bit
        function isKeySize512(algorithm) {
            return algorithm.name.indexOf('-512') >= 0 || algorithm.length === 512;
        }

        // Test version 2012
        function isVersion2012(algorithm) {
            return !((algorithm.name.indexOf('-94') >= 0 || algorithm.name.indexOf('-2001') >= 0 ||
                    algorithm.version === 1994 || algorithm.version === 2001));
        }

        // Derive password key
        function derivePasswordKey(algorithm, password, salt) {
            var hash = isVersion2012(algorithm) ? 'GOST R 34.11-256' : 'GOST R 34.11-94/' + (algorithm.sBox || 'D-A'),
                    derivation = {name: 'CPKDF', hash: hash, salt: salt, iterations: password ? 2000 : 2};

            // Import password
            return subtle.importKey('raw', passwordData(derivation, password),
                    derivation, false, ['deriveKey', 'deriveBits']).then(function (baseKey) {

                // Derive key
                return subtle.deriveKey(derivation, baseKey, 'GOST 28147',
                        false, ['sign', 'verify', 'encrypt', 'decrypt']);
            });
        }

        // Compute password MAC 
        function computePasswordMAC(algorithm, password, salt) {
            var mac = expand({name: 'GOST 28147-MAC'}, algorithm.encParams);

            // Derive password
            return derivePasswordKey(algorithm, password, salt).then(function (macKey) {

                // Mac for 16 zero bytes
                return subtle.sign(mac, macKey,
                        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
            });
        }

        //        var lastBuffer;
        // Compute container MAC
        function computeContainerMAC(algorithm, content) {
            var mac = expand({name: 'GOST 28147-MAC'}, algorithm.encParams),
                    keyData = new Uint8Array([// 32 zero bytes
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            return subtle.importKey('raw', keyData, mac, false, ['sign']).then(function (macKey) {
                //                var buffer = new Uint8Array(content.encode());
                //                console.log(coding.Hex.encode(buffer));
                //                if (lastBuffer && lastBuffer.length === buffer.length) {
                //                    for (var i = 0; i < buffer.length; i++)
                //                        if (lastBuffer[i] !== buffer[i])
                //                            console.log('diff at ' + i);
                //                } else
                //                    console.log('diff length');
                //                lastBuffer = buffer;
                // Mac for content
                return subtle.sign(mac, macKey, content.encode());
            });
        }

        // Compute mask MAC
        function computeMaskMAC(algorithm, mask, status) {
            // Import mask as key for MAC
            var mac = expand({name: 'GOST 28147-MAC'}, algorithm.encParams),
                    keyData = mask.byteLength === 64 ?
                    new Uint8Array(new Uint8Array(mask, 32, 32)).buffer : mask;
            return subtle.importKey('raw', keyData, mac, false, ['sign']).then(function (macKey) {

                // Verify MAC for maskStatus
                return subtle.sign(mac, macKey, status);
            });
        }

        // Generate mask
        function generateMasks(algorithm) {
            var mask = getSeed(isKeySize512(algorithm) ? 64 : 32),
                    status = getSeed(12);
            return computeMaskMAC(algorithm, mask, status).then(function (hmac) {
                return new asn1.GostPrivateMasks({
                    mask: mask,
                    randomStatus: status,
                    hmacRandom: hmac
                });
            });
        }

        // Compute FP
        function computeFP(privateKey) {
            // Generate key pair with predefined ukm for check public key
            return subtle.generateKey(expand(privateKey.algorithm, {ukm: privateKey.buffer}), true, ['sign', 'verify']).then(function (keyPair) {
                return new Uint8Array(new Uint8Array(keyPair.publicKey.buffer, 0, 8)).buffer;
            });
        }

        // Unwrap private key
        function unwrapKey(algorithm, encryptionKey, key, mask, fp) {
            var encryption = {name: 'GOST 28147-ECB', sBox: algorithm.encParams && algorithm.encParams.sBox},
            unwrapAlgorithm = expand(algorithm, {mode: 'KW'}), privateKey;
            unwrapAlgorithm.name = unwrapAlgorithm.name.replace('-DH', '');
            var wrappedKey;

            // Encrypt ukm data for private key
            return subtle.decrypt(encryption, encryptionKey, key).then(function (data) {
                wrappedKey = data;
                // Import mask key
                return subtle.importKey('raw', mask, unwrapAlgorithm, 'false', ['sign', 'unwrapKey']);
            }).then(function (unwrappingKey) {

                // Unwrap private key
                return subtle.unwrapKey('raw', wrappedKey, unwrappingKey,
                        unwrapAlgorithm, algorithm, 'true', ['sign']);
            }).then(function (key) {
                privateKey = key;
                return computeFP(privateKey);
            }).then(function (computedFP) {
                // Check public key buffer
                if (!equalBuffers(computedFP, fp))
                    throw new Error('Incorrect fp');

                return privateKey;
            });

        }

        // Wrap private key
        function wrapKey(algorithm, encryptionKey, privateKey, mask) {
            var encryption = {name: 'GOST 28147-ECB', sBox: algorithm.encParams && algorithm.encParams.sBox},
            wrapAlgorithm = expand(algorithm, {mode: 'KW'});
            wrapAlgorithm.name = wrapAlgorithm.name.replace('-DH', '');

            // Import mask key
            return subtle.importKey('raw', mask, wrapAlgorithm, false,
                    ['sign', 'wrapKey']).then(function (wrappingKey) {
                // Wrap private key
                return subtle.wrapKey('raw', privateKey, wrappingKey, wrapAlgorithm);
            }).then(function (wrappedKey) {
                // Encrypt key
                return subtle.encrypt(encryption, encryptionKey, wrappedKey);
            });
        }

        // Decrypt private key
        function decryptKey(content, primary, masks, keyPassword, secondary) {
            var algorithm = content.primaryPrivateKeyParameters.privateKeyAlgorithm;
            return new Promise(call).then(function () {
                // Check format
                if (primary.hmacKey)
                    throw new Error('Old key format');

                if (masks.randomStatus.byteLength < 12)
                    throw new Error("Invalid random status length");

                // Import mask as key for MAC
                return computeMaskMAC(algorithm, masks.mask, masks.randomStatus);
            }).then(function (hmac) {
                if (!equalBuffers(hmac, masks.hmacRandom))
                    throw new Error("Imita for mask is invalid");

                // Derive key
                return derivePasswordKey(algorithm, keyPassword, new Uint8Array(masks.randomStatus, 0, 12));
            }).then(function (encryptionKey) {
                // Unwrap keys
                return secondary && primary.secondaryKey ?
                        unwrapKey(content.secondaryPrivateKeyParameters.privateKeyAlgorithm,
                                encryptionKey, primary.secondaryKey, masks.mask, content.secondaryFP) :
                        unwrapKey(algorithm, encryptionKey, primary.primaryKey, masks.mask, content.primaryFP);
            });
        }

        // Encrypt private key
        function encryptKey(algorithm, primary, masks, keyPassword, secondary, privateKey) {
            // Derive key
            return derivePasswordKey(algorithm, keyPassword, new Uint8Array(masks.randomStatus, 0, 12)).then(function (encryptionKey) {
                // Wrap keys
                return wrapKey(algorithm, encryptionKey, privateKey, masks.mask);
            }).then(function (encryptedKey) {
                if (!primary)
                    primary = new asn1.GostPrivateKeys();
                if (secondary) {
                    primary.secondaryKey = encryptedKey;
                } else {
                    primary.primaryKey = encryptedKey;
                }
                return primary;
            });
        }

        // </editor-fold>

        return {
            /**
             * Get the private key info
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {string} keyPassword The password for decryption 
             * @param {boolean} secondary True if required secondary key
             * @returns {Promise} Promise to return {@link GostKeys.PKCS8}
             */
            getKey: function (keyPassword, secondary) // <editor-fold defaultstate="collapsed">
            {
                return this.getPrivateKey(keyPassword, secondary).then(function (privateKey) {
                    return new PKCS8().setPrivateKey(privateKey);
                });
            }, // </editor-fold>
            /**
             * Get the private key
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {string} keyPassword Rhe password for decryption 
             * @param {boolean} secondary True if required secondary key
             * @returns {Promise} Promise to return the {@link Key}
             */
            getPrivateKey: function (keyPassword, secondary) // <editor-fold defaultstate="collapsed">
            {
                var self = this, content = self.header.keyContainerContent;
                // Decrypt key
                return decryptKey(content, self.primary, self.masks, keyPassword, secondary)['catch'](function (e) {
                    if (self.primary2 && self.masks2)
                        return decryptKey(content, self.primary2, self.masks2, keyPassword, secondary);
                    else
                        throw e;
                });
            }, // </editor-fold>
            /**
             * Get the certificate from the key container
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {boolean} secondary True for set secondary certificate
             * @returns {Promise} Promise to return {@link GostCert.X509}
             */
            getCertificate: function (secondary) // <editor-fold defaultstate="collapsed">
            {
                var self = this, content = self.header.keyContainerContent;
                return new Promise(call).then(function () {
                    if (secondary)
                        return new cert.X509(content.secondaryCertificate);
                    else
                        return new cert.X509(content.primaryCertificate);
                });
            }, // </editor-fold>
            /**
             * Get the container name
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @returns {string} Container name
             */
            getContainerName: function () // <editor-fold defaultstate="collapsed">
            {
                return this.name.containerName;
            }, // </editor-fold>
            /**
             * Sets and encrypt the private key info
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {(FormatedData|GostKeys.PKCS8)} keyInfo The private key info 
             * @param {string} keyPassword The assword for encryption
             * @param {boolean} secondary True for set secondary key
             * @param {integer} days Validity days. Default 7305 days (20 years)
             * @returns {Promise} Promise to return self object after set key
             */
            setKey: function (keyInfo, keyPassword, secondary, days) // <editor-fold defaultstate="collapsed">
            {
                var self = this;
                return new PKCS8(keyInfo).getPrivateKey().then(function (privateKey) {
                    return self.setPrivateKey(privateKey, keyPassword, secondary, days);
                });
            }, // </editor-fold>
            /**
             * Set the private key
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {Key} privateKey The private key
             * @param {string} keyPassword The secret key encryption 
             * @param {boolean} secondary True for set secondary key
             * @param {integer} days Validity days. Default 7305 days (20 years)
             * @returns {Promise} Promise to return self object after set key
             */
            setPrivateKey: function (privateKey, keyPassword, secondary, days) // <editor-fold defaultstate="collapsed">
            {
                var self = this, content, algorithm;
                return new Promise(call).then(function () {
                    self.header = self.header || new asn1.GostKeyContainer({
                        keyContainerContent: {
                            containerAlgoritmIdentifier: {
                                algorithm: 'id-CryptoPro-GostPrivateKeys-V2-Full'
                            },
                            attributes: ['kccaReservePrimary', 'kccaPrimaryKeyAbsent'],
                            extensions: {
                                keyValidity: {
                                    notAfter: now(days || options.days)
                                }
                            }
                        }
                    });
                    content = self.header.keyContainerContent;
                    // Set private key                    
                    var keyParameters = secondary ? content.secondaryPrivateKeyParameters :
                            content.primaryPrivateKeyParameters;
                    if (!keyParameters) {
                        algorithm = expand(privateKey.algorithm, {
                            sBox: "D-A",
                            encParams: {
                                block: "CFB",
                                sBox: "E-A",
                                keyMeshing: "CP"
                            }
                        });
                        keyParameters = {
                            attributes: ["pkaExportable", "pkaExchange", "pkaDhAllowed"],
                            privateKeyAlgorithm: algorithm
                        };
                        if (secondary) {
                            if (!content.primaryPrivateKeyParameters)
                                throw new Error('Primary key must be defined first');
                            content.secondaryPrivateKeyParameters = keyParameters;
                        } else {
                            content.primaryPrivateKeyParameters = keyParameters;
                            var absent = content.attributes.indexOf('kccaPrimaryKeyAbsent');
                            if (absent >= 0)
                                content.attributes.splice(absent, 1);
                        }
                    } else
                        algorithm = keyParameters.privateKeyAlgorithm;
                    // Generate masks
                    var promises = [];
                    [0, 1].forEach(function (i) {
                        var name = 'masks' + (i > 0 ? '2' : '');
                        if (!self[name])
                            promises.push(generateMasks(algorithm).then(function (masks) {
                                self[name] = masks;
                            }));
                    });
                    return Promise.all(promises);
                }).then(function () {
                    // Encrypt key
                    var promises = [];
                    [0, 1].forEach(function (i) {
                        var name = 'primary' + (i > 0 ? '2' : ''),
                                maskname = 'masks' + (i > 0 ? '2' : '');
                        promises.push(encryptKey(algorithm, self[name], self[maskname], keyPassword, secondary, privateKey).then(function (primary) {
                            self[name] = primary;
                        }));
                    });
                    return Promise.all(promises);
                }).then(function () {
                    // Compute FP for a private key
                    return computeFP(privateKey).then(function (FP) {
                        if (secondary)
                            content.secondaryFP = FP;
                        else
                            content.primaryFP = FP;
                    });
                }).then(function () {
                    // Compute password MAC
                    var softPassword = content.attributes.indexOf('kccaSoftPassword');
                    if (keyPassword) {
                        if (softPassword < 0)
                            content.attributes.push('kccaSoftPassword');
                        return computePasswordMAC(algorithm, keyPassword, content.primaryFP);
                    } else {
                        if (softPassword >= 0)
                            content.attributes.splice(softPassword, 1);
                    }
                }).then(function (hmac) {
                    if (hmac)
                        content.hmacPassword = hmac;
                    // Calculate container MAC
                    return computeContainerMAC(algorithm, content);
                }).then(function (hmac) {
                    self.header.hmacKeyContainerContent = hmac;
                    return self;
                });
            }, // </editor-fold>
            /**
             * Set the certificate to the key container
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {(FormatedData|GostCert.X509)} certificate The certificate
             * @param {boolean} secondary True for set secondary certificate
             * @param {integer} days Validity days. Default 7305 days (20 years)
             * @returns {Promise} Promise to return self object after set certificate
             */
            setCertificate: function (certificate, secondary, days) // <editor-fold defaultstate="collapsed">
            {
                var self = this, content, algorithm;
                return new Promise(call).then(function () {
                    self.header = self.header || new asn1.GostKeyContainer({
                        keyContainerContent: {
                            containerAlgoritmIdentifier: {
                                algorithm: 'id-CryptoPro-GostPrivateKeys-V2-Full'
                            },
                            attributes: ['kccaReservePrimary', 'kccaPrimaryKeyAbsent'],
                            extensions: {
                                keyValidity: {
                                    notAfter: now(days || options.days)
                                }
                            }
                        }
                    });
                    content = self.header.keyContainerContent;
                    certificate = new cert.X509(certificate);
                    algorithm = (content.primaryPrivateKeyParameters &&
                            content.primaryPrivateKeyParameters.privateKeyAlgorithm) ||
                            expand(certificate.subjectPublicKeyInfo.algorithm, {
                                sBox: "D-A",
                                encParams: {
                                    block: "CFB",
                                    sBox: "E-A",
                                    keyMeshing: "CP"
                                }
                            });
                    return certificate.getPublicKey();
                }).then(function (publicKey) {
                    if (secondary) {
                        if (content.secondaryFP && !equalBuffers(content.secondaryFP,
                                new Uint8Array(publicKey.buffer, 0, content.secondaryFP.byteLength)))
                            throw new Error('The public key of the certificate does not match the private key');
                        content.secondaryCertificate = certificate;
                    } else {
                        if (content.primaryFP && !equalBuffers(content.primaryFP,
                                new Uint8Array(publicKey.buffer, 0, content.primaryFP.byteLength)))
                            throw new Error('The public key of the certificate does not match the private key');
                        content.primaryCertificate = certificate;
                    }
                    // Calculate container MAC
                    return computeContainerMAC(algorithm, content);
                }).then(function (hmac) {
                    self.header.hmacKeyContainerContent = hmac;
                    return self;
                });
            }, // </editor-fold>
            /**
             * Set the container name
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {string} name Container name
             */
            setContainerName: function (name) // <editor-fold defaultstate="collapsed">
            {
                this.name = new asn1.GostKeyContainerName({containerName: name});
            }, // </editor-fold>
            /**
             * Verify key container with password
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {string} keyPassword the secret key or password for decryption 
             * @returns {Promise} Promise to return self object after verify
             */
            verify: function (keyPassword) // <editor-fold defaultstate="collapsed">
            {
                var self = this, content, algorithm;
                return new Promise(call).then(function () {
                    content = self.header.keyContainerContent;
                    algorithm = content.primaryPrivateKeyParameters.privateKeyAlgorithm;
                    // Verify container MAC
                    return computeContainerMAC(algorithm, content);
                }).then(function (hmac) {
                    if (!equalBuffers(hmac, self.header.hmacKeyContainerContent))
                        throw new Error("Container is not valid.");
                    // Verify key password MAC
                    var needPassword = content.attributes.indexOf('kccaSoftPassword') >= 0;
                    if (!keyPassword && needPassword)
                        throw new Error("Password is required");
                    if (keyPassword && !needPassword)
                        throw new Error("Password is not reqiured.");
                    if (keyPassword)
                        // Derive password
                        return computePasswordMAC(algorithm, keyPassword, content.primaryFP).then(function (hmac) {
                            if (!equalBuffers(hmac, content.hmacPassword))
                                throw new Error("Password is not valid.");
                            return self;
                        });
                    return self;
                });
            }, // </editor-fold>
            /**
             * Change key password
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {string} oldKeyPassword Old key password
             * @param {string} newKeyPassword New key password
             * @returns {Promise} Promise to return self object after change password
             */
            changePassword: function (oldKeyPassword, newKeyPassword) // <editor-fold defaultstate="collapsed">
            {
                var self = this, content;
                return new Promise(call).then(function () {
                    content = self.header.keyContainerContent;
                    if (!content.primaryPrivateKeyParameters)
                        throw new Error('Private key not yet defined');
                    return self.getPrivateKey(oldKeyPassword).then(function (privateKey) {
                        return self.setPrivateKey(privateKey, newKeyPassword);
                    });
                }).then(function () {
                    if (content.secondaryPrivateKeyParameters)
                        return self.getPrivateKey(oldKeyPassword, true).then(function (privateKey) {
                            return self.setPrivateKey(privateKey, newKeyPassword, true);
                        });
                    return self;
                });
            }, // </editor-fold>
            /**
             * Generate private key, certificate and return certification request
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {(FormatedData|GostASN1.CertificationRequest)} req The request templates
             * @param {(Key|CryptoOperationData|string)} keyPassword The secret key or password for decryption 
             * @param {(AlgorithmIdentifier|string)} keyAlgorithm The name of provider or algorithm
             * @returns {Promise} Promise to return {@link GostCert.Request}
             */
            generate: function (req, keyPassword, keyAlgorithm) // <editor-fold defaultstate="collapsed">
            {
                var self = this, certificate, keyInfo;
                return new Promise(call).then(function () {
                    if (!(req instanceof cert.Request))
                        req = new cert.Request(req);
                    // Generate request
                    return req.generate(keyAlgorithm);
                }).then(function (key) {
                    keyInfo = key;
                    return self.setKey(keyInfo, keyPassword);
                }).then(function () {
                    // Create the new certificate
                    certificate = new cert.X509(req);
                    return certificate.sign(keyInfo);
                }).then(function () {
                    return self.setCertificate(certificate);
                }).then(function () {
                    return req;
                });
            }, // </editor-fold>
            /**
             * Encode key container
             * 
             * @memberOf GostKeys.CryptoProKeyContainer
             * @instance
             * @param {string} format Encode format 'DER', 'CER', 'PEM'
             * @returns {Object} container Object contains encoded files
             */
            encode: function (format) // <editor-fold defaultstate="collapsed">
            {
                return {
                    header: this.header.encode(format),
                    name: this.name.encode(format),
                    masks: this.masks.encode(format),
                    primary: this.primary.encode(format),
                    masks2: this.masks2.encode(format),
                    primary2: this.primary2.encode(format)
                };
            } // </editor-fold>
        };
    })());

    /**
     * A class for password-encrypted private keys in CryptoPro container
     * 
     * @memberOf GostKeys
     * @type GostKeys.SignalComPrivateKeyInfo
     */
    GostKeys.prototype.CryptoProKeyContainer = CryptoProKeyContainer;

    /**
     * An implementation of PKCS #12 password encryption/integrity modes. Both input and output are implemented.<br><br>
     * 
     * A PFX object may contain multiple authenticated safes (represented as GostASN1.SafeContents objects). 
     * Each authenticated safe may have its own encryption method, and contains a number of bags 
     * (represented as instances of GostASN1.SafeBag). <br>
     * Note: the methods and constructors that input a PFX object do not automatically check the validity of the MAC. 
     * You need to explicitly call verify() to make this check.
     * 
     * @class GostKeys.PKCS12
     * @extends GostASN1.PFX
     * @param {(FormatedData|GostASN1.PFX)} store
     */
    function PKCS12(store) // <editor-fold defaultstate="collapsed"> 
    {
        asn1.PFX.call(this, store || {
            vesion: 3,
            authSafe: {
                contentType: 'data'
            }
        });
    } // </editor-fold>

    extend(asn1.PFX, PKCS12, {
        /**
         * Enclose the aicontent and calculate the mac with given digest algorithm
         * 
         * @memberOf GostKeys.PKCS12
         * @instance
         * @param {(FormatedData|GostASN1.AuthenticatedSafe)} authSafe Content data to be enclosed.
         * @param {type} password The password 
         * @param {(AlgorithmIdentifier|string)} digestAlgorithm Digest algorithm or provider name
         * @returns {Promise} Promise to return self object after enclose content
         */
        encloseContent: function (authSafe, password, digestAlgorithm) // <editor-fold defaultstate="collapsed"> 
        {
            var self = this;
            return new Promise(call).then(function () {
                // Set enclosed data
                authSafe = new asn1.AuthenticatedSafe(authSafe);
                self.authSafe = {
                    contentType: 'data',
                    content: authSafe.encode()
                };
                // Calculate mac for password integrity
                if (password !== undefined) {
                    // Define digeset algorithm
                    var hash, hmac, derivation, digestProvider;
                    if (digestAlgorithm)
                        digestProvider = providers[digestAlgorithm];
                    else
                        digestProvider = providers[options.providerName];
                    if (digestProvider) {
                        hash = digestProvider.digest;
                        derivation = digestProvider.derivation;
                        hmac = digestProvider.hmac;
                    } else {
                        hash = digestAlgorithm;
                        derivation = {
                            name: hash.name.indexOf('SHA') >= 0 ? 'PFXKDF' : 'PBKDF2',
                            hash: hash,
                            iterations: 2000,
                            diversifier: 3};
                        hmac = {name: 'HMAC', hash: hash};
                    }
                    // Add salt
                    derivation = expand(derivation, {salt: getSeed(saltSize(hash))});
                    // Import password for key generation 
                    return subtle.importKey('raw', passwordData(derivation, password),
                            derivation, false, ['deriveKey']).then(function (passwordKey) {

                        // Generate key from password. 
                        return subtle.deriveKey(derivation, passwordKey, hmac, false, ['verify']);
                    }).then(function (integrityKey) {

                        // Sign MAC 
                        return subtle.sign(hmac, integrityKey, self.autoSafe.content);
                    }).then(function (digest) {
                        self.macData = {
                            mac: {
                                digestAlgorithm: hash,
                                digest: digest
                            },
                            macSalt: derivation.salt,
                            iterations: derivation.iterations
                        };
                        return self;
                    });
                }
            });
        }, // </editor-fold>
        /**
         * Verifies the MAC.
         * 
         * @memberOf GostKeys.PKCS12
         * @instance
         * @param password The password for mac verification
         * @returns {Promise} Promise to return self object after verification
         */
        verify: function (password) // <editor-fold defaultstate="collapsed">  
        {
            var self = this, authSafe = self.authSafe;
            return new Promise(call).then(function () {
                // Indirectly verification
                if (authSafe.contentType === 'data') {
                    // Check MAC 
                    if (self.macData) {
                        if (typeof password !== 'string')
                            throw new Error('Password must be defined for the MAC verification');
                        var hash = self.macData.mac.digestAlgorithm, derivation = {
                            name: hash.name.indexOf('SHA') >= 0 ? 'PFXKDF' : 'PBKDF2',
                            hash: hash,
                            salt: self.macData.macSalt,
                            iterations: self.macData.iterations,
                            diversifier: 3},
                        hmac = {
                            name: 'HMAC',
                            hash: hash};
                        // Import password for key generation 
                        return subtle.importKey('raw', passwordData(derivation, password),
                                derivation, false, ['deriveKey']).then(function (passwordKey) {

                            // Generate key from password. 
                            return subtle.deriveKey(derivation, passwordKey, hmac, false, ['verify']);
                        }).then(function (integrityKey) {

                            // Verify MAC 
                            return subtle.verify(hmac, integrityKey, self.macData.mac.digest, authSafe.content);
                        }).then(function (verified) {
                            if (!verified)
                                throw new Error('MAC is not verified');
                            return self;
                        });
                    } // No check with MAC
                } else
                    throw new Error('Unsupported format');
            });
        } // </editor-fold>
    });

    /**
     * An implementation of PKCS #12 password encryption/integrity modes. 
     * 
     * @memberOf GostKeys
     * @type GostKeys.PKCS12
     */
    GostKeys.prototype.PKCS12 = PKCS12;

    /**
     * Implements the Cryptographic Message Syntax as specified in RFC-2630.
     * 
     * @memberOf gostCrypto
     * @type GostKeys
     */
    gostCrypto.keys = new GostKeys();

    return GostKeys;
}));

