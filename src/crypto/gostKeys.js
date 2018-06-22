/**
 * @file Key and Certificate Store methods
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

import { gostSecurityInstance } from "./gostSecurity";
import { gostCodingInstance } from "./gostCoding";
import { gostASN1Instance } from "./gostASN1";
import { gostSubtleInstance } from "./gostSubtle";
import { gostCertInstance } from "./gostCert";
import { gostCMSInstance } from "./gostCMS";

/*
 * Common tools and methods
 */ // <editor-fold defaultstate="collapsed">

var CryptoOperationData = ArrayBuffer;

var coding = gostCodingInstance;
var providers = gostSecurityInstance.providers;
var asn1 = gostASN1Instance;
var subtle = gostSubtleInstance;
var cert = gostCertInstance;
var cms = gostCMSInstance;

// Expand javascript object
function expand() {
    var r = {};
    for (var i = 0, n = arguments.length; i < n; i++) {
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
        descriptor = { value: descriptor };
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


// Get buffer
function buffer(d) {
    if (d instanceof CryptoOperationData)
        return d;
    else if (d && d.buffer && d.buffer instanceof CryptoOperationData)
        return d.byteOffset === 0 && d.byteLength === d.buffer.byteLength ?
          d.buffer : new Uint8Array(new Uint8Array(d, d.byteOffset, d.byteLength)).buffer;
    else
        throw new DataError('CryptoOperationData required');
}

// Today date + n days with time
function now(n) {
    var date = new Date();
    if (n)
        date.setDate(date.getDate() + n);
    return date;
}

// Today date + n days
function today(n) {
    var date = now(n);
    date.setHours(0, 0, 0, 0);
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

// Generate new alias
function generateUUID() {
    var r = new Uint8Array(getSeed(16)), s = '';
    for (var i = 0; i < 16; i++)
        s += ('00' + r[i].toString(16)).slice(-2);
    return s.substr(0, 8) + '-' + s.substr(8, 4) + '-4' + s.substr(13, 3) +
      '-9' + s.substr(17, 3) + '-' + s.substr(20, 12);
}

// Return get32 from buffer
function get32(buffer, offset) {
    var r = new Uint8Array(buffer, offset, 4);
    return (r[3] << 24) | (r[2] << 16) | (r[1] << 8) | r[0];
}

function set32(buffer, offset, int) {
    var r = new Uint8Array(buffer, offset, 4);
    r[3] = int >>> 24;
    r[2] = int >>> 16 & 0xff;
    r[1] = int >>> 8 & 0xff;
    r[0] = int & 0xff;
    return r;
}

// Salt size
function saltSize(algorithm) {
    switch (algorithm.id) {
        case 'pbeWithSHAAnd40BitRC2-CBC':
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
export function GostKeys() {
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
            return engine.encloseContent(keyInfo.encode(), keyPassword, encryptionAlgorithm || options.providerName);
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
                    return subtle.importKey('raw', coding.Chars.decode(keyPassword, 'utf8'),
                      derivation, false, ['deriveKey', 'deriveBits']).then(function (integrityKey) {
                        return subtle.deriveKey(expand(derivation,
                          { salt: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]) }),
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
                    return subtle.importKey('raw', coding.Chars.decode(keyPassword, 'utf8'),
                      derivation, false, ['deriveKey', 'deriveBits']);
                }).then(function (integrityKey) {
                    return subtle.deriveKey(expand(derivation,
                      { salt: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]) }),
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
 * @param {GostKeys.SignalComKeyContainer} container
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
                return subtle.generateKey(expand(privateKey.algorithm, { ukm: privateKey.buffer }),
                  privateKey.extractable, privateKey.usages);
            else
                return { privateKey: privateKey };
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
              { ukm: privateKey.buffer }), true, ['sign', 'verify']);
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
          derivation = { name: 'CPKDF', hash: hash, salt: salt, iterations: password ? 2000 : 2 };

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
        var mac = expand({ name: 'GOST 28147-MAC' }, algorithm.encParams);

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
        var mac = expand({ name: 'GOST 28147-MAC' }, algorithm.encParams),
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
        var mac = expand({ name: 'GOST 28147-MAC' }, algorithm.encParams),
          keyData = mask.byteLength === 64 ?
            new Uint8Array(new Uint8Array(mask, 32, 32)).buffer : mask;
        return subtle.importKey('raw', keyData, mac, false, ['sign']).then(function (macKey) {

            // Verify MAC for maskStatus
            return subtle.sign(mac, macKey, status);
        });
    }

    // Generate mask
    function generateMasks(algorithm) {
        var wrapAlgorithm = expand(algorithm, { mode: 'MASK' }),
          mask, status = getSeed(12);
        wrapAlgorithm.name = wrapAlgorithm.name.replace('-DH', '');
        return subtle.generateKey(wrapAlgorithm, true, ['wrapKey', 'unwrapKey']).then(function (key) {
            return subtle.exportKey('raw', key);
        }).then(function (data) {
            mask = data;
            return computeMaskMAC(algorithm, mask, status);
        }).then(function (hmac) {
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
        return subtle.generateKey(expand(privateKey.algorithm, { ukm: privateKey.buffer }), true, ['sign', 'verify']).then(function (keyPair) {
            return new Uint8Array(new Uint8Array(keyPair.publicKey.buffer, 0, 8)).buffer;
        });
    }

    // Unwrap private key
    function unwrapKey(algorithm, encryptionKey, key, mask, fp) {
        var encryption = { name: 'GOST 28147-ECB', sBox: algorithm.encParams && algorithm.encParams.sBox },
          unwrapAlgorithm = expand(algorithm, { mode: 'MASK' }), privateKey;
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
        var encryption = { name: 'GOST 28147-ECB', sBox: algorithm.encParams && algorithm.encParams.sBox },
          wrapAlgorithm = expand(algorithm, { mode: 'MASK' });
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
         * @param {number} days Validity days. Default 7305 days (20 years)
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
         * @param {number} days Validity days. Default 7305 days (20 years)
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
         * @param {number} days Validity days. Default 7305 days (20 years)
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
            this.name = new asn1.GostKeyContainerName({ containerName: name });
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
 * A class for password-encrypted private keys in ViPNet container entry
 *
 * @class GostKeys.ViPNetContainerEntry
 * @extends GostASN1.ViPNetInfo
 * @param {(FormatedData|GostKeys.ViPNetContainerEntry)} entry
 */
function ViPNetContainerEntry(entry) // <editor-fold defaultstate="collapsed">
{
    asn1.ViPNetInfo.call(this, entry || {
        version: 3,
        keyInfo: {
            keyClass: 1,
            keyType: 43556,
            flags: 1
        },
        defenceKeyInfo: {
            keyClass: 1024,
            keyType: 24622,
            keyUID: getSeed(32),
            flags: -2147483648
        }
    });
} // </editor-fold>

extend(asn1.ViPNetInfo, ViPNetContainerEntry, (function () {

    function getKeyPassword(keyPassword) // <editor-fold defaultstate="collapsed">
    {
        if (keyPassword === undefined)
            keyPassword = '';
        // Generate key data
        var passwordData = coding.Chars.decode(keyPassword, 'win1251'), keyData;
        return subtle.digest('GOST R 34.11-94', passwordData).then(function (data) {
            keyData = data;
            // Generate mask data
            var secodeData = new Uint8Array(passwordData.byteLength + keyData.byteLength);
            secodeData.set(new Uint8Array(passwordData), 0);
            secodeData.set(new Uint8Array(keyData), passwordData.byteLength);
            return subtle.digest('GOST R 34.11-94', secodeData);
        }).then(function (data) {
            // Remove mask
            return subtle.importKey('raw', data, 'GOST 28147', false, ['unwrapKey']);
        }).then(function (unwrappingKey) {
            // Unwrap secret key
            return subtle.unwrapKey('raw', keyData, unwrappingKey,
              'GOST 28147-MASK/VN', 'GOST 28147-89',
              'false', ['encrypt', 'decrypt', 'sign', 'verify']);
        });
    } // </editor-fold>

    return {
        /**
         * Get the private key
         *
         * @memberOf GostKeys.ViPNetContainerEntry
         * @instance
         * @param {string} keyPassword The password of secrect key for decryption
         * @returns {Promise} Promise to return the {@link Key}
         */
        getPrivateKey: function (keyPassword) // <editor-fold defaultstate="collapsed">
        {
            var self = this, keyPart, encryptedKey;
            // Decrypt key
            return new Promise(call).then(function () {
                return !keyPassword || typeof keyPassword === 'string' ?
                  getKeyPassword(keyPassword) : keyPassword;
            }).then(function (key) {
                keyPassword = key;
                // Verify password
                keyPart = self.keyPart;
                encryptedKey = new Uint8Array(keyPart, 0, keyPart.byteLength - 4 - 8);
                var macKey = new Uint8Array(keyPart, encryptedKey.byteLength, 4),
                  encodedKeyInfo = self.keyInfo.encode(),
                  data = new Uint8Array(encryptedKey.byteLength + encodedKeyInfo.byteLength);
                data.set(new Uint8Array(encryptedKey), 0);
                data.set(new Uint8Array(encodedKeyInfo), encryptedKey.byteLength);
                return subtle.verify({ name: 'GOST 28147-89-MAC' }, keyPassword, macKey, data);
            }).then(function (result) {
                if (!result)
                    throw new Error('Invalid key password');
                var iv = new Uint8Array(keyPart, keyPart.byteLength - 8, 8);
                // Decrypt key data
                return subtle.decrypt({ name: 'GOST 28147-89-CFB', iv: iv }, keyPassword, encryptedKey);
            }).then(function (keyData) {
                var l2 = keyData.byteLength / 2;
                if (self.keyInfo.keyClass & 0x3 === 0) {
                    // Secret key. Remove mask and import
                    return subtle.importKey('raw', new Int32Array(keyData, l2, l2), 'GOST 28147', false,
                      ['unwrapKey']).then(function (unwrappingKey) {
                        // Unwrap secret key
                        return subtle.unwrapKey('raw', new Int32Array(keyData, 0, l2), unwrappingKey,
                          'GOST 28147-MASK/VN', 'GOST 28147-89',
                          'false', ['encrypt', 'decrypt', 'sign', 'verify']);
                    });
                } else {
                    // Private key
                    var algorithm = self.keyInfo.algorithm ||
                      (self.certificate && self.certificate.subjectPublicKeyInfo.algorithm);
                    if (!algorithm)
                        throw new Error('Algorithm is not specified');
                    var unwrapAlgorithm = expand(algorithm, { mode: 'MASK', procreator: 'VN' });
                    unwrapAlgorithm.name = unwrapAlgorithm.name.replace('-DH', '');
                    var wrapped = new Uint8Array(keyData, 0, l2),
                      mask = new Uint8Array(keyData, l2, l2);
                    // Import mask key
                    return subtle.importKey('raw', mask, unwrapAlgorithm, 'false', ['sign', 'unwrapKey']).then(function (unwrappingKey) {
                        // Unwrap private key
                        return subtle.unwrapKey('raw', wrapped, unwrappingKey, unwrapAlgorithm, algorithm, 'true', ['sign', 'deriveBits', 'deriveKey']);
                    }).then(function (privateKey) {
                        // Generate key pair
                        if (self.publicKey)
                            return subtle.generateKey(expand(privateKey.algorithm, { ukm: privateKey.buffer }),
                              privateKey.extractable, privateKey.usages);
                        else
                            return { privateKey: privateKey };
                    }).then(function (keyPair) {
                        // Compare public key
                        if (self.publicKey && !equalBuffers(keyPair.publicKey.buffer, self.publicKey))
                            throw new Error('Check public key failed');
                        return keyPair.privateKey;
                    });
                }
            });
        }, // </editor-fold>
        /**
         * Set the private key
         *
         * @memberOf GostKeys.ViPNetContainerEntry
         * @instance
         * @param {Key} privateKey The private key
         * @param {string} keyPassword The secret key encryption
         * @param {number} days Validity days. Default 7305 days (20 years)
         * @returns {Promise} Promise to return the self object after set the key
         */
        setPrivateKey: function (privateKey, keyPassword, days) // <editor-fold defaultstate="collapsed">
        {
            var self = this, wrapAlgorithm, wrappingKey, keyData, keyPart;
            // Decrypt key
            return new Promise(call).then(function () {
                return !keyPassword || typeof keyPassword === 'string' ?
                  getKeyPassword(keyPassword) : keyPassword;
            }).then(function (key) {
                keyPassword = key;
                var algorithm = privateKey.algorithm;
                self.keyInfo.algorithm = algorithm;
                self.keyInfo.serialNumber = getSeed(16);
                self.keyInfo.keyUID = getSeed(8);
                self.keyInfo.validity = {
                    notBefore: today(),
                    notAfter: today(days || options.days)
                };
                if (privateKey.type === 'private') {
                    // Generate mask
                    wrapAlgorithm = expand(algorithm, { mode: 'MASK', procreator: 'VN' });
                    wrapAlgorithm.name = wrapAlgorithm.name.replace('-DH', '');
                    self.keyInfo.keyClass = 1;
                    self.keyInfo.keyType = 43556;
                    // Generate public key
                    return subtle.generateKey(expand(algorithm, { ukm: privateKey.buffer }), true,
                      ['sign', 'verify']).then(function (keyPair) {
                        self.publicKey = keyPair.publicKey.buffer;
                        // Check certificate
                        if (self.certificate) {
                            var spki = self.certificate.subjectPublicKeyInfo;
                            return subtle.importKey('spki', spki.encode(), spki.algorithm, true, ['verify']);
                        }
                    }).then(function (publicKey) {
                        if (publicKey && !equalBuffers(publicKey.buffer, self.publicKey))
                            delete self.certificate; // Remove not valid certificate
                    });
                } else if (privateKey.type === 'secret') {
                    wrapAlgorithm = 'GOST 28147/MASK/VN';
                    delete self.certificate;
                    delete self.publicKey;
                    self.keyInfo.keyClass = 64;
                    self.keyInfo.keyType = 24622;
                } else
                    throw new Error('Invalid key type');
            }).then(function () {
                // Generate mask
                return subtle.generateKey(wrapAlgorithm, true, ['wrapKey', 'unwrapKey']);
            }).then(function (key) {
                wrappingKey = key;
                // Wrap private key with mask
                return subtle.wrapKey('raw', privateKey, wrappingKey, wrapAlgorithm);
            }).then(function (data) {
                keyData = new Uint8Array(data.byteLength * 2);
                keyData.set(new Uint8Array(data));
                return subtle.exportKey('raw', wrappingKey);
            }).then(function (data) {
                keyData.set(new Uint8Array(data), data.byteLength);
                keyPart = new Uint8Array(keyData.byteLength + 12);
                // Encrypt key
                var encyption = { name: 'GOST 28147-CFB', iv: getSeed(8) };
                keyPart.set(new Uint8Array(encyption.iv), keyPart.byteLength - 8);
                return subtle.encrypt(encyption, keyPassword, keyData);
            }).then(function (encryptedKey) {
                keyPart.set(new Uint8Array(encryptedKey));
                // Calculate MAC
                var encodedKeyInfo = self.keyInfo.encode(),
                  data = new Uint8Array(encryptedKey.byteLength + encodedKeyInfo.byteLength);
                data.set(new Uint8Array(encryptedKey), 0);
                data.set(new Uint8Array(encodedKeyInfo), encryptedKey.byteLength);
                return subtle.sign({ name: 'GOST 28147-89-MAC' }, keyPassword, data);
            }).then(function (macKey) {
                keyPart.set(new Uint8Array(macKey), keyPart.byteLength - 12);
                self.keyPart = keyPart.buffer;
                return self;
            });
        }, // </editor-fold>
        /**
         * Encode container entry
         *
         * @memberOf GostKeys.ViPNetContainerEntry
         * @instance
         * @param {string} format The encoded data format
         * @returns {CryptoOperationData}
         */
        encode: function (format) // <editor-fold defaultstate="collapsed">
        {
            var header = asn1.ViPNetInfo.method('encode').call(this),
              result = new Uint8Array(8 + header.byteLength + this.keyPart.byteLength);
            set32(result.buffer, 0, 4 + header.byteLength + this.keyPart.byteLength);
            result.set(new Uint8Array(header), 4);
            set32(result.buffer, 4 + header.byteLength, this.keyPart.byteLength);
            result.set(new Uint8Array(this.keyPart), 8 + header.byteLength);
            if (format === 'PEM')
                return coding.Base64.encode(result.buffer);
            return result.buffer;
        } // </editor-fold>
    };
})(), {
    /**
     * Decode container entry
     *
     * @memberOf GostKeys.ViPNetContainerEntry
     * @param {FormatedData} entry
     * @returns {GostKeys.ViPNetContainer}
     */
    decode: function (entry) // <editor-fold defaultstate="collapsed">
    {
        if (typeof entry === 'string')
            entry = coding.Base64.decode(entry);
        entry = buffer(entry);
        // Entry size
        var entrySize = get32(entry, 0);
        if (entry.byteLength !== entrySize + 4)
            throw new Error('Invalid container entry size');
        // Decode header info
        var source = coding.BER.decode(new Uint8Array(entry, 4, entrySize));
        var result = asn1.ViPNetInfo.decode.call(this, source);
        // Decode key info
        var headerSize = source.header.byteLength + source.content.byteLength,
          keyPartSize = get32(entry, 4 + headerSize);
        if (entry.byteLength !== headerSize + keyPartSize + 8)
            throw new Error('Invalid container key part size');
        result.keyPart = new Uint8Array(new Uint8Array(entry, headerSize + 8, keyPartSize)).buffer;
        // Key Info buffer - can be used in case error of format encoding
        // var keyInfoSource = source.object[1];
        // result.encodedKeyInfo = new Uint8Array(new Uint8Array(keyInfoSource.header.buffer,
        //    keyInfoSource.header.byteOffset, keyInfoSource.header.byteLength + keyInfoSource.content.byteLength)).buffer;
        return result;
    } // </editor-fold>
});

/**
 * A class for password-encrypted private keys in CryptoPro container
 *
 * @memberOf GostKeys
 * @type GostKeys.SignalComPrivateKeyInfo
 */
GostKeys.prototype.ViPNetContainerEntry = ViPNetContainerEntry;

/**
 * A class for password-encrypted private keys in ViPNet container
 *
 * @class GostKeys.ViPNetContainer
 * @param {(FormatedData|GostKeys.ViPNetContainer)} container
 */
function ViPNetContainer(container) // <editor-fold defaultstate="collapsed">
{
    if (container && (container instanceof CryptoOperationData ||
      container.buffer instanceof CryptoOperationData ||
      typeof container === 'string'))
        this.decode(container);
    else {
        container = container || {};
        this.fileType = container.fileType || 'ITCS';
        this.fileVersion = container.fileVersion || 0x10;
        if (container.applicationHeader)
            this.applicationHeader = container.applicationHeader;
        this.entries = container.entries || [];
    }
} // </editor-fold>


extend(Object, ViPNetContainer, {
    /**
     * Get the certificate from the container
     *
     * @memberOf GostKeys.ViPNetContainer
     * @instance
     * @param {number} index Index of the entriy. Default 0
     * @returns {Promise} Promise to return {@link GostCert.X509}
     */
    getCertificate: function (index) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            var entry = self.entries[index || 0];
            if (!entry)
                throw new Error('Entry not defined');
            if (entry.certificate)
                return new cert.X509(entry.certificate);
        });
    }, // </editor-fold>
    /**
     * Get the private key info
     *
     * @memberOf GostKeys.ViPNetContainer
     * @instance
     * @param {string} keyPassword The password for decryption
     * @param {number} index Index of the entriy. Default 0
     * @returns {Promise} Promise to return {@link GostKeys.PKCS8}
     */
    getKey: function (keyPassword, index) // <editor-fold defaultstate="collapsed">
    {
        return this.getPrivateKey(keyPassword, index).then(function (privateKey) {
            return new PKCS8().setPrivateKey(privateKey);
        });
    }, // </editor-fold>
    /**
     * Get the private key
     *
     * @memberOf GostKeys.ViPNetContainer
     * @instance
     * @param {string} keyPassword The password of secrect key for decryption
     * @param {number} index Index of the entriy. Default 0
     * @returns {Promise} Promise to return the {@link Key}
     */
    getPrivateKey: function (keyPassword, index) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            var entry = self.entries[index || 0];
            if (!entry)
                throw new Error('Entry not defined');
            return entry.getPrivateKey(keyPassword);
        });
    }, // </editor-fold>
    /**
     * Set the certificate to the container
     *
     * @memberOf GostKeys.ViPNetContainer
     * @instance
     * @param {(FormatedData|GostCert.X509)} certificate The certificate
     * @param {number} index Index of the entriy. Default 0
     * @returns {Promise} Promise to return self object after set certificate
     */
    setCertificate: function (certificate, index) // <editor-fold defaultstate="collapsed">
    {
        var self = this, entry, certificate;
        return new Promise(call).then(function () {
            entry = self.entries[index || 0] ||
              (self.entries[index || 0] = new ViPNetContainerEntry());
            certificate = new cert.X509(certificate);
            if (entry.publicKey)
                return certificate.getPublicKey();
        }).then(function (publicKey) {
            if (publicKey && !equalBuffers(entry.publicKey, publicKey.buffer))
                throw new Error('Invalid certificate for private key');
            entry.certificate = certificate;
            return self;
        });
    }, // </editor-fold>
    /**
     * Set the key to the container
     *
     * @memberOf GostKeys.ViPNetContainer
     * @instance
     * @param {(FormatedData|GostKeys.PKCS8)} keyInfo The key
     * @param {string} keyPassword The password for decryption
     * @param {number} index Index of the entriy. Default 0
     * @param {number} days Validity days. Default 7305 days (20 years)
     * @returns {Promise} Promise to return self object after set the key
     */
    setKey: function (keyInfo, keyPassword, index, days) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new PKCS8(keyInfo).getPrivateKey().then(function (privateKey) {
            return self.setPrivateKey(privateKey, keyPassword, index, days);
        });
    }, // </editor-fold>
    /**
     * Set the private key
     *
     * @memberOf GostKeys.ViPNetContainerEntry
     * @instance
     * @param {Key} privateKey The private key
     * @param {string} keyPassword The secret key encryption
     * @param {number} index Index of the entriy. Default 0
     * @param {number} days Validity days. Default 7305 days (20 years)
     * @returns {Promise} Promise to return the self object after set the key
     */
    setPrivateKey: function (privateKey, keyPassword, index, days) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            var entry = self.entries[index || 0] ||
              (self.entries[index || 0] = new ViPNetContainerEntry());
            return entry.setPrivateKey(privateKey, keyPassword, days);
        }).then(function () {
            return self;
        });
    }, // </editor-fold>
    /**
     * Change key password
     *
     * @memberOf GostKeys.ViPNetContainerEntry
     * @instance
     * @param {string} oldKeyPassword Old key password
     * @param {string} newKeyPassword New key password
     * @returns {Promise} Promise to return self object after change password
     */
    changePassword: function (oldKeyPassword, newKeyPassword) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            return self.getPrivateKey(oldKeyPassword).then(function (privateKey) {
                return self.setPrivateKey(privateKey, newKeyPassword);
            });
        });
    }, // </editor-fold>
    /**
     * Generate private key, certificate and return certification request
     *
     * @memberOf GostKeys.ViPNetContainerEntry
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
     * Encode objet to container
     *
     * @memberOf GostKeys.ViPNetContainer
     * @instance
     * @param {string} format The encoded data format
     * @returns {CryptoOperationData}
     */
    encode: function (format) // <editor-fold defaultstate="collapsed">
    {
        // Encode entries
        var entries = [], entriesSize = 0;
        this.entries.forEach(function (entry) {
            var encoded = entry.encode();
            entriesSize += encoded.byteLength;
            entries.push(encoded);
        });
        var headerSize = this.applicationHeader ? this.applicationHeader.byteLength : 0,
          result = new Uint8Array(12 + headerSize + entriesSize);
        result.set(new Uint8Array(coding.Chars.decode(this.fileType, 'ascii')));
        set32(result.buffer, 4, this.fileVersion);
        set32(result.buffer, 8, headerSize);
        if (headerSize > 0)
            result.set(new Uint8Array(this.applicationHeader), 12);
        var offset = 12 + headerSize;
        entries.forEach(function (entry) {
            result.set(new Uint8Array(entry), offset);
            offset += entry.byteLength;
        });
        if (format === 'PEM')
            return coding.Base64.encode(result.buffer);
        return result.buffer;
    }, // </editor-fold>
    /**
     * Decode container to the object
     *
     * @memberOf GostKeys.ViPNetContainer
     * @instance
     * @param {FormatedData} container
     * @returns {GostKeys.ViPNetContainer}
     */
    decode: function (container) // <editor-fold defaultstate="collapsed">
    {
        container = this.constructor.decode(container);
        this.fileType = container.fileType;
        this.fileVersion = container.fileVersion;
        if (container.applicationHeader)
            this.applicationHeader = container.applicationHeader;
        this.entries = container.entries;
    } // </editor-fold>
}, {
    /**
     * Encode object
     *
     * @memberOf GostKeys.ViPNetContainer
     * @instance
     * @param {GostKeys.ViPNetContainer} object
     * @param {string} format The encoded data format
     * @returns {CryptoOperationData}
     */
    encode: function (object, format) // <editor-fold defaultstate="collapsed">
    {
        return new this(object).encode(format);
    }, // </editor-fold>
    /**
     * Decode container
     *
     * @memberOf GostKeys.ViPNetContainer
     * @instance
     * @param {FormatedData} container
     * @returns {GostKeys.ViPNetContainer}
     */
    decode: function (container) // <editor-fold defaultstate="collapsed">
    {
        if (typeof container === 'string')
            container = coding.Base64.decode(container);
        container = buffer(container);
        // File type
        var fileType = coding.Chars.encode(new Uint8Array(container, 0, 4), 'ascii');
        if (fileType !== 'ITCS' && fileType !== 'PKEY' && fileType !== '_CCK' && fileType !== '_LCK')
            throw new Error('Unsupported ViPNet container type');
        // File version
        var fileVersion = get32(container, 4),
          i = fileVersion >>> 16, j = fileVersion & 0xffff;
        if ((i !== 0 && i !== 1) || j > 0xff)
            throw new Error('Unsupported ViPNet container version');
        // File header
        var headerSize = get32(container, 8), applicationHeader;
        if (headerSize > 0)
            applicationHeader = buffer(new Uint8Array(container, 12, headerSize));
        // Read entries
        var offset = 12 + headerSize, entries = [];
        while (offset < container.byteLength) {
            // Entry size
            var entrySize = get32(container, offset);
            // Decode entry
            entries.push(ViPNetContainerEntry.decode(
              new Uint8Array(container, offset, entrySize + 4)));
            offset = offset + entrySize + 4;
        }
        return new ViPNetContainer({
            fileType: fileType,
            fileVersion: fileVersion,
            applicationHeader: applicationHeader,
            entries: entries
        });
    } // </editor-fold>
});

/**
 * A class for password-encrypted private keys in CryptoPro container
 *
 * @memberOf GostKeys
 * @type GostKeys.SignalComPrivateKeyInfo
 */
GostKeys.prototype.ViPNetContainer = ViPNetContainer;

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
        version: 3,
        authSafe: {
            contentType: 'data'
        }
    });
} // </editor-fold>

extend(asn1.PFX, PKCS12, (function () {

    // <editor-fold defaultstate="collapsed">
    function calcHMAC(derivation, password, content) {
        var hmac = { name: 'HMAC', hash: derivation.hash };
        // Import password for key generation
        return subtle.importKey('raw', passwordData(derivation, password),
          derivation, false, ['deriveKey']).then(function (passwordKey) {
            // Generate key from password.
            return subtle.deriveKey(derivation, passwordKey, hmac, false, ['sign']);
        }).then(function (integrityKey) {
            // Sign MAC
            return subtle.sign(hmac, integrityKey, content);
        });
    }

    function verifyHMAC(derivation, password, digest, content) {
        return calcHMAC(derivation, password, content).then(function (test) {
            if (!equalBuffers(digest, test))
                throw new Error('Invalid password, MAC is not verified');
        });
    }

    // </editor-fold>
    return {
        /**
         * Sign the enclosed content with given digest algorithm
         *
         * @memberOf GostKeys.PKCS12
         * @instance
         * @param {string} password The password
         * @param {(AlgorithmIdentifier|string)} digestAlgorithm Digest algorithm or provider name
         * @returns {Promise} Promise to return self object after enclose content
         */
        sign: function (password, digestAlgorithm) // <editor-fold defaultstate="collapsed">
        {
            var self = this;
            return new Promise(call).then(function () {
                // Calculate mac for password integrity
                if (password) {
                    // Define digeset algorithm
                    var hash, derivation, digestProvider;
                    if (digestAlgorithm)
                        digestProvider = providers[digestAlgorithm];
                    else
                        digestAlgorithm = providers[options.providerName].digest;
                    if (digestProvider) {
                        hash = digestProvider.digest;
                        derivation = digestProvider.derivation;
                    } else {
                        hash = digestAlgorithm;
                        derivation = { name: 'PFXKDF', hash: hash, iterations: 2000 };
                    }
                    // Add salt
                    derivation = expand(derivation, { salt: getSeed(saltSize(hash)), diversifier: 3 });
                    // Sign HMAC
                    var content = self.authSafe.content;
                    return calcHMAC(derivation, password, content).then(function (digest) {
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
                } else
                    return self;
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
            var self = this, authSafe = self.authSafe, derivation;
            return new Promise(call).then(function () {
                // Indirectly verification
                if (authSafe.contentType === 'data') {
                    // Check MAC
                    if (self.macData) {
                        if (!password)
                            throw new Error('Password must be defined for the MAC verification');
                        derivation = {
                            name: 'PFXKDF',
                            hash: self.macData.mac.digestAlgorithm,
                            salt: self.macData.macSalt,
                            iterations: self.macData.iterations,
                            diversifier: 3
                        };
                        var content = self.authSafe.content, digest = self.macData.mac.digest;
                        // Verify HMAC with PFXKDF (PKCS#12)
                        return verifyHMAC(derivation, password, digest, content)['catch'](function () {
                            // Verify HMAC with PBKDF2 (TC 26, PKCS#5)
                            derivation.name = 'PBKDF2';
                            return verifyHMAC(derivation, password, digest, content);
                        });
                    } // No check with MAC
                } else
                    throw new Error('Unsupported format');
            }).then(function () {
                return self;
            });
        } // </editor-fold>
    };
})());

/**
 * An implementation of PKCS #12 password encryption/integrity modes.
 *
 * @memberOf GostKeys
 * @type GostKeys.PKCS12
 */
GostKeys.prototype.PKCS12 = PKCS12;

/**
 * This type of entry holds a cryptographic PrivateKey, which is optionally stored
 * in a protected format to prevent unauthorized access. It is also accompanied by
 * a certificate chain for the corresponding public key.
 *
 * @class GostKeys.KeyEntry
 * @property {(GostKeys.PKCS8|GostKeys.PKCS8Encrypted)} key The Private Key
 * @property {GostCert.X509[]} certs The X.509 Certificates chain
 * @property {GostCert.CRL[]} crls The X.509 CRLs for certificate chain
 */

/**
 * This class represents a storage facility for cryptographic keys and certificates.
 *
 * @class GostKeys.KeyStore
 * @param {Object} entries Object contains aliased {@link KeyEntry} objects
 */
function KeyStore(entries) // <editor-fold defaultstate="collapsed">
{
    this.entries = {};
    if (entries)
        for (var name in entries)
            this.setEntry(name, entries[name]);
} // </editor-fold>

extend(Object, KeyStore, {
    /**
     * Lists all the alias names of this keystore.
     *
     * @memberOf GostKeys.KeyStore
     * @instance
     * @returns {string[]}
     */
    aliases: function () // <editor-fold defaultstate="collapsed">
    {
        var result = [];
        for (var name in this.entries)
            result.push(name);
        return result;
    }, // </editor-fold>
    /**
     * Checks if the given alias exists in this keystore.
     *
     * @memberOf GostKeys.KeyStore
     * @instance
     * @param {string} alias The alias name
     * @returns {boolean} True if the alias exists, false otherwise
     */
    containsAlias: function (alias) // <editor-fold defaultstate="collapsed">
    {
        return !!this.entries[alias];
    }, // </editor-fold>
    /**
     * Deletes the entry identified by the given alias from this keystore.
     *
     * @memberOf GostKeys.KeyStore
     * @instance
     * @param {string} alias The alias name
     */
    deleteEntry: function (alias) // <editor-fold defaultstate="collapsed">
    {
        delete this.entries[alias];
    }, // </editor-fold>
    /**
     * Saves a keystore Entry under the specified alias.
     *
     * @memberOf GostKeys.KeyStore
     * @instance
     * @param {string} alias The alias name
     * @param {GostKeys.KeyEntry} entry The entry
     */
    setEntry: function (alias, entry)  // <editor-fold defaultstate="collapsed">
    {
        var r = {};
        // Keys
        if (entry.key) {
            try {
                r.key = new PKCS8(entry.key, true); // Private key
            } catch (e) {
                try {
                    r.key = new PKCS8Encrypted(entry.key, true); // Encrypted private key
                } catch (e1) {
                    if (entry.key instanceof CryptoOperationData)
                        r.key = entry.key; // Secret key
                    else
                        throw new Error('Unknown Key format');
                }
            }
        }
        // Certs
        if (entry.certs) {
            var certs = entry.certs instanceof Array ? entry.certs : [entry.certs];
            for (var i = 0; i < certs.length; i++) {
                try {
                    certs[i] = new cert.X509(certs[i]);
                } catch (e) {
                }
            }
            r.certs = certs;
        }
        // CRLs
        if (entry.crls) {
            var crls = entry.crls instanceof Array ? entry.crls : [entry.crls];
            for (var i = 0; i < crls.length; i++) {
                try {
                    crls[i] = new cert.CRL(crls[i]);
                } catch (e) {
                }
            }
            r.crls = crls;
        }
        this.entries[alias] = r;
    }, // </editor-fold>
    /**
     * Gets a keystore Entry for the specified alias
     *
     * @memberOf GostKeys.KeyStore
     * @instance
     * @param {string} alias The alias name
     * @returns {GostKeys.KeyEntry} The entry
     */
    getEntry: function (alias) // <editor-fold defaultstate="collapsed">
    {
        return this.entries[alias];
    }, // </editor-fold>
    /**
     * Loads this KeyStore from the given input stream.<br><br>
     * A password may be given to unlock the keystore (e.g. the keystore resides on a hardware token device),
     * or to check the integrity of the keystore data. If a password is not given for integrity checking,
     * then integrity checking is not performed.
     *
     * @memberOf GostKeys.KeyStore
     * @instance
     * @param {(FormatedData|GostKeys.PKSC12)} store The input stream from which the keystore is loaded
     * @param {string} password The password used to check the integrity of the keystore, the password used to unlock the keystore
     * @returns {Promise} Promise to return self object after store loaded
     */
    load: function (store, password) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Verify store file
            store = new PKCS12(store);
            return store.verify(password);
        }).then(function () {
            if (store.authSafe.contentType !== 'data')
                throw new Error('Unsupported PFX format');
            var authSafe = asn1.AuthenticatedSafe.decode(store.authSafe.content).object,
              promises = [];
            // Decrypt encrypted content
            authSafe.forEach(function (info) {
                if (info.contentType === 'data')
                    promises.push(new cms.DataContentInfo(info));
                else if (info.contentType === 'encryptedData')
                    promises.push(new cms.EncryptedDataContentInfo(info).getEnclosed(password));
                else
                    throw new Error('Unsupported PFX format');
            });
            return Promise.all(promises);
        }).then(function (contents) {
            // Read bags
            var entries = {};
            contents.forEach(function (info) {
                var bags = asn1.SafeContents.decode(info.content).object;
                bags.forEach(function (bag) {
                    var keyId = coding.Hex.encode((bag.bagAttributes && bag.bagAttributes.localKeyId)
                      || getSeed(4), true), entry = entries[keyId] || (entries[keyId] = {});
                    switch (bag.bagId) {
                        case 'keyBag':
                            entry.key = new PKCS8(bag.bagValue);
                            break;
                        case 'pkcs8ShroudedKeyBag':
                            entry.key = new PKCS8Encrypted(bag.bagValue);
                            break;
                        case 'secretBag':
                            if (bag.bagValue.secretTypeId === 'secret')
                                entry.key = bag.bagValue.secretValue;
                            break;
                        case 'certBag':
                            var certs = entry.certs || (entry.certs = []);
                            if (bag.bagValue.certId === 'x509Certificate')
                                certs.push(new cert.X509(bag.bagValue.certValue));
                            break;
                        case 'crlBag':
                            var crls = entry.crls || (entry.crls = []);
                            if (bag.bagValue.crlId === 'x509CRL')
                                crls.push(new cert.CRL(bag.bagValue.crlValue));
                            break;
                    }
                    if (bag.bagAttributes && bag.bagAttributes.friendlyName)
                        entry.friendlyName = bag.bagAttributes.friendlyName;
                });
            });
            // Decrypt keys
            var promises = [];
            for (var name in entries)
                promises.push((function (entry) {
                    // Try to decrypt private key
                    if (entry.key instanceof PKCS8Encrypted)
                        return entry.key.getKey(password).then(function (key) {
                            // Return entry with decrypted key
                            entry.key = key;
                            return entry;
                        })['catch'](function () {
                            // Return entry with encrypted key
                            return entry;
                        });
                    else
                        return entry;
                })(entries[name]));
            return Promise.all(promises);
        }).then(function (entries) {
            // Set alias names
            entries.forEach(function (entry) {
                var friendlyName = entry.friendlyName;
                if (friendlyName) {
                    delete entry.friendlyName;
                    self.entries[friendlyName] = entry;
                } else
                    self.entries[generateUUID()] = entry;
            });
            return self;
        });
    }, // </editor-fold>
    /**
     * Stores this keystore to the given output stream, and protects its integrity with the given password.
     *
     * @memberOf GostKeys.KeyStore
     * @instance
     * @param {string} password The password to generate the keystore integrity check
     * @param {string} digestAlgortihm The digest algorithm or provider name for integrity check
     * @param {string} encryptionAlgortihm The encryption algorithm or provider name for encrypt certificates
     * @returns {Promise} Promise to return {@link GostKeyst.PKCS12}
     */
    store: function (password, digestAlgortihm, encryptionAlgortihm) // <editor-fold defaultstate="collapsed">
    {
        var self = this, keys = [], contents = [], authSafe = [];
        return new Promise(call).then(function () {
            // Define encryption algorithm
            if (encryptionAlgortihm)
                encryptionAlgortihm = providers[encryptionAlgortihm] ?
                  providers[encryptionAlgortihm].pbes : encryptionAlgortihm;
            else if (digestAlgortihm)
                encryptionAlgortihm = providers[digestAlgortihm] ?
                  providers[digestAlgortihm].pbes : providers[options.providerName].pbes;
            else
                encryptionAlgortihm = providers[options.providerName].pbes;
            // Prepare keys and certs
            var index = 1;
            for (var name in self.entries) {
                var keyId = new Uint32Array([index]), entry = self.entries[name];
                if (entry.key) {
                    (function (key, attributes) {
                        if (key instanceof CryptoOperationData)
                            contents.push({
                                bagId: 'secretBag',
                                bagValue: {
                                    secretTypeId: 'secret',
                                    secretValue: key,
                                    bagAttributes: attributes
                                }
                            });
                        else if (key instanceof PKCS8) {
                            if (encryptionAlgortihm && password)
                                keys.push(new PKCS8Encrypted().setKey(key, password, encryptionAlgortihm).then(function (encryptedKey) {
                                    return {
                                        bagId: 'pkcs8ShroudedKeyBag',
                                        bagValue: encryptedKey,
                                        bagAttributes: attributes
                                    };
                                }));
                            else
                                keys.push({
                                    bagId: 'keyBag',
                                    bagValue: key,
                                    bagAttributes: attributes
                                });
                        } else if (key instanceof PKCS8Encrypted)
                            keys.push({
                                bagId: 'pkcs8ShroudedKeyBag',
                                bagValue: key,
                                bagAttributes: attributes
                            });
                    })(entry.key, {
                        localKeyId: keyId,
                        friendlyName: name
                    });
                }
                if (entry.certs) {
                    entry.certs.forEach(function (certificate) {
                        var attributes = { localKeyId: keyId };
                        if (certificate instanceof cert.X509)
                            contents.push({
                                bagId: 'certBag',
                                bagValue: {
                                    certId: 'x509Certificate',
                                    certValue: certificate
                                },
                                bagAttributes: attributes
                            });
                    });
                }
                if (entry.crls) {
                    entry.crls.forEach(function (crl) {
                        var attributes = { localKeyId: keyId };
                        if (crl instanceof cert.CRL)
                            contents.push({
                                bagId: 'crlBag',
                                bagValue: {
                                    crlId: 'x509CRL',
                                    crlValue: crl
                                },
                                bagAttributes: attributes
                            });
                    });
                }
            }
            // Encrypt keys
            if (keys.length > 0)
                return Promise.all(keys);
        }).then(function (bags) {
            if (bags) {
                var keyContents = asn1.SafeContents.encode(bags);
                authSafe.push(new cms.DataContentInfo({
                    contentType: 'data',
                    content: keyContents
                }));
            }

            // Encrypt certificates and crls
            if (contents.length > 0) {
                contents = asn1.SafeContents.encode(contents);
                if (encryptionAlgortihm && password)
                    return new cms.EncryptedDataContentInfo().encloseContent(
                      contents, password, encryptionAlgortihm);
                else
                    return new cms.DataContentInfo().encloseContent(contents);
            }
        }).then(function (contents) {
            authSafe.push(contents);
            // Set enclosed data
            authSafe = new asn1.AuthenticatedSafe(authSafe);
            var store = new PKCS12();
            store.authSafe = {
                contentType: 'data',
                content: authSafe.encode()
            };
            // Return new PKCS12 with enclosed authenificated content
            return store.sign(password, digestAlgortihm);
        });
    } // </editor-fold>
});

/**
 * This class represents a storage facility for cryptographic keys and certificates.
 *
 * @memberOf GostKeys
 * @type GostKeys.KeyStore
 */
GostKeys.prototype.KeyStore = KeyStore;

export const gostKeysInstance = new GostKeys();
