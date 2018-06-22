/**
 * @file Provides facilities for handling certificates, CRLs, etc.
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

import { gostCrypto } from './gostCrypto';
import { gostSecurityInstance } from './gostSecurity';
import { gostCodingInstance } from './gostCoding';
import { gostASN1Instance } from './gostASN1';
import { gostSubtleInstance } from './gostSubtle';

/*
 * Common algorithms
 *
 */ // <editor-fold defaultstate="collapsed">
var CryptoOperationData = ArrayBuffer;

// Coding
var coding = gostCodingInstance;

// Providers
var providers = gostSecurityInstance.providers;

// ASN.1 syntax
var asn1 = gostASN1Instance;

// Crypto subtle
var subtle = gostSubtleInstance;

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

// Extend javascript class
function extend(Class) {
    var F = function () {
    };
    F.prototype = Class.prototype;
    var r = new F, args = [r];
    for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
    return expand.apply(this, args);
}

// Today date + n days
function today(n) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    if (n)
        date.setDate(date.getDate() + n);
    return date;
}

// Self resolver
function call(callback) {
    try {
        callback();
    } catch (e) {
    }
}

// Serial number
function genSerialNumber() {
    var seed = new Uint8Array(4);
    gostCrypto.getRandomValues(seed);
    seed[0] = seed[0] & 0x7f;
    return coding.Int16.encode(seed);
}

// True if equal numbers
var equalNumbers = (function () {
    // Convert number to bigendian hex string
    var hex = function (s) {
        var t = typeof s;
        return t === 'undefined' || s === '' ? '0' :
          t === 'number' || s instanceof Number ? s.toString(16).toLowerCase() :
            s.replace('0x', '').toLowerCase();
    };
    // Zero left padding
    var lpad = function (s, size) {
        return (new Array(size + 1).join('0') + s).slice(-size);
    };
    return function (s1, s2) {
        s1 = hex(s1);
        s2 = hex(s2);
        var len = Math.max(s1.length, s2.length);
        return lpad(s1, len) === lpad(s2, len);
    };
})();

// Check equal names
function equalNames(name1, name2) {
    for (var key in name1)
        if (name1[key] !== name2[key])
            return false;
    for (var key in name2)
        if (name1[key] !== name2[key])
            return false;
    return true;
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

// Match certificate
function matchCertificate(cert, selector) {
    var skid = cert.extensions && cert.extensions.subjectKeyIdentifier;
    return (cert && selector &&
      (!selector.issuer || equalNames(cert.issuer, selector.issuer)) &&
      (!selector.serialNumber || equalNumbers(cert.serialNumber, selector.serialNumber)) &&
      (!selector.subjectKeyIdentifier || equalBuffers(skid, selector.subjectKeyIdentifier)) &&
      (!selector.subject || equalNames(cert.subject, selector.subject)) &&
      (!selector.date || (cert.notBefore.getTime() <= selector.date.getTime() &&
        cert.notAfter.getTime() > selector.date.getTime())));
}

// Create authority certificate selector
function authoritySelector(cert, extensions, date) {
    var selector = { subject: cert.issuer, date: date },
      akid = extensions && extensions.authorityKeyIdentifier;
    if (akid) {
        selector.subjectKeyIdentifier = akid.keyIdentifier;
        if (akid.authorityCertIssuer && akid.authorityCertIssuer[0] &&
          akid.authorityCertSerialNumber) {
            selector.issuer = akid.authorityCertIssuer[0];
            selector.serialNumber = akid.authorityCertSerialNumber;
        }
    }
    return selector;
}

// Find certificates
function selectCertificates(certs, selector) {
    var result = [];
    for (var i = 0, n = certs.length; i < n; i++)
        if (matchCertificate(certs[i], selector))
            result.push(certs[i]);
    return result;
}

// Match CRL
function matchCRL(crl, selector) {
    return ((!selector.issuer || equalNames(crl.issuer, selector.issuer)) &&
      (!selector.date || (crl.thisUpdate.getTime() < selector.date.getTime())));
}

// Find certificates
function selectCRLs(crls, selector) {
    var result = [];
    for (var i = 0, n = crls.length; i < n; i++)
        if (matchCRL(crls[i], selector))
            result.push(crls[i]);
    return result;
}

// Define provider for key algorithm
function keyProvider(algorithm) {
    var id = algorithm.id;
    for (var name in providers) {
        var provider = providers[name];
        if (provider.publicKey.id === id)
            return provider;
    }
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

// </editor-fold>

/**
 * Provides facilities for handling certificates, CRLs, etc.
 *
 * @class GostCert
 */
export function GostCert() {
}

/**
 * Certificate templates
 * <ul>
 *      <li>providerName - provider name for key generation, default 'CP-01'</li>
 *      <li>subject - template of subject name {countryName: 'RU', commonName: 'Anonymous'}</li>
 *      <li>caKeyUsage - default key usages for a CA certificates
 *          ['digitalSignature', 'nonRepudiation', 'keyEncipherment',
 *          'dataEncipherment', 'keyAgreement', 'keyCertSign', 'cRLSign']</li>
 *      <li>caExtKeyUsage - default extended key usages for a CA certificates
 *          ['serverAuth', 'clientAuth', 'codeSigning', 'emailProtection', 'ipsecEndSystem',
 *          'ipsecTunnel', 'ipsecUser', 'timeStamping', 'OCSPSigning']</li>
 *      <li>userKeyUsage - default key usages for a user certificate
 *          ['digitalSignature', 'nonRepudiation', 'keyEncipherment', 'dataEncipherment', 'keyAgreement'],
 *      <li>userExtKeyUsage - default extended key usages for user certificate
 *          ['clientAuth', 'emailProtection']</li>
 *      <li>days - validity of the certificate in days, default 7305</li>
 * </ul>
 *
 * @memberOf GostCert
 * @instance
 */
var options = {// <editor-fold defaultstate="collapsed">
    providerName: 'CP-01',
    subject: { countryName: 'RU', commonName: 'Anonymous' },
    caKeyUsage: ['digitalSignature', 'nonRepudiation', 'keyEncipherment',
        'dataEncipherment', 'keyAgreement', 'keyCertSign', 'cRLSign'],
    caExtKeyUsage: ['serverAuth', 'clientAuth', 'codeSigning', 'emailProtection', 'ipsecEndSystem',
        'ipsecTunnel', 'ipsecUser', 'timeStamping', 'OCSPSigning'],
    userKeyUsage: ['digitalSignature', 'nonRepudiation', 'keyEncipherment', 'dataEncipherment', 'keyAgreement'],
    userExtKeyUsage: ['clientAuth', 'emailProtection'],
    days: 7305 // </editor-fold>
};

GostCert.prototype.options = options;

/**
 * This class encapsulates X.509 Version 3 certificates.<br><br>
 *
 * Constructs an X.509 certificate from the given DER encoding or ASN.1 Certificate object.
 *
 * @class GostCert.X509
 * @extends GostASN1.Certificate
 * @param {(FormatedData|GostASN1.Certificate)} cert The certificate
 */
var X509 = function (cert) // <editor-fold defaultstate="collapsed">
{
    try {
        // Try to use decode X.509 certificate
        asn1.Certificate.call(this, cert, true);
    } catch (e) {
        try {
            // Try to decode certification request
            cert = new asn1.CertificationRequest(cert, true);
        } catch (e) {
        }
        // Create new certificate structure
        cert = cert || {};
        asn1.Certificate.call(this, {
            version: 2,
            serialNumber: cert.serialNumber || genSerialNumber(),
            signature: cert.signature || { id: 'noSignature' },
            issuer: cert.subject || options.subject,
            notBefore: cert.notBefore || today(),
            notAfter: cert.notAfter ||
            today(cert.days || options.days),
            subject: cert.subject || options.subject,
            subjectPublicKeyInfo: cert.subjectPublicKeyInfo || {
                algorithm: { id: 'noSignature' },
                subjectPublicKey: new CryptoOperationData(0)
            },
            extensions: (cert.attributes && (cert.attributes.extensionRequest ||
              cert.attributes.msCertExtensions)) || cert.extensions,
            signatureAlgorithm: { id: 'noSignature' },
            signatureValue: new CryptoOperationData(0)
        });
    }
}; // </editor-fold>

extend(asn1.Certificate, X509, {
    /**
     * Generate the contents of this certificate and sign it.<br><br>
     *
     * If issuerCertificate is not defined self signed certificate generated
     *
     * @memberOf GostCert.X509
     * @instance
     * @param {GostASN1.PrivateKeyInfo} issuerPrivateKey The issuer's private key
     * @param {GostCert.X509} issuerCertificate The issuer's certificate or undefined for self-signed certificate
     * @returns {Promise} Promise to return self object after sign the certificate
     */
    sign: function (issuerPrivateKey, issuerCertificate) // <editor-fold defaultstate="collapsed">
    {

        var self = this, spki = self.subjectPublicKeyInfo;
        return new Promise(call).then(function () {

            // Need generated key
            if (!spki || !spki.algorithm || spki.algorithm === 'noSignature')
                throw new Error('Key pair was not generated for the certificate');
            // Check issuer private key
            if (!issuerPrivateKey)
                throw new Error('The private key of the issuer is not defined');

            // Certificate can be self signed
            issuerCertificate = issuerCertificate || self;

            // Calculate subject key indentifier
            return subtle.digest('SHA-1', spki.subjectPublicKey);
        }).then(function (digest) {

            // Signature algorithm
            var provider = issuerCertificate.getProvider() || providers[options.providerName];
            if (!self.signature || self.signature.id === 'noSignature')
                self.signature = provider.signature;
            self.signatureAlgorithm = self.signature;

            // Set issuer
            self.issuer = issuerCertificate.subject;
            // Set default extensions
            if (!self.extensions)
                self.extensions = {};
            var exts = self.extensions, ae = issuerCertificate.extensions;
            if (self === issuerCertificate) { // Self-signed CA certificate
                // Set key usage
                exts.keyUsage = exts.keyUsage || options.caKeyUsage;
                exts.extKeyUsage = exts.extKeyUsage || options.caExtKeyUsage;
                // Set basic constraints
                exts.basicConstraints = exts.basicConstraints || { cA: true };
            } else {
                // Check key usage and validity
                if (!issuerCertificate.checkUsage('keyCertSign', self.notBefore))
                    throw new Error('The issuer\'s certificate is not valid for signing a certificate');

                // Set key usage
                exts.keyUsage = exts.keyUsage || options.userKeyUsage;
                exts.extKeyUsage = exts.extKeyUsage || options.userExtKeyUsage;
                // Set basic constraints
                exts.basicConstraints = exts.basicConstraints || {
                    cA: exts.keyUsage.indexOf('keyCertSign') >= 0
                };
                // Check path length constraint
                if (exts.basicConstraints.cA) {
                    var pathLen = ae && ae.basicConstraints && ae.pathLenConstraint;
                    if (pathLen !== undefined) {
                        if (pathLen > 0)
                            exts.basicConstraints.pathLenConstraint = pathLen - 1;
                        else
                            throw new Error('Path length constraint exceeded');
                    }
                }
            }
            // Subject key identifier 160 bit from public key hash
            exts.subjectKeyIdentifier = digest;
            // Authority key identifier
            if (ae && ae.subjectKeyIdentifier)
                exts.authorityKeyIdentifier = {
                    keyIdentifier: ae.subjectKeyIdentifier,
                    authorityCertIssuer: [issuerCertificate.issuer],
                    authorityCertSerialNumber: issuerCertificate.serialNumber
                };

            // Import the private key
            return subtle.importKey('pkcs8', issuerPrivateKey.encode(), issuerPrivateKey.privateKeyAlgorithm, false, ['sign']);
        }).then(function (key) {

            // Sign certificate
            return subtle.sign(self.signatureAlgorithm, key, self.tbsCertificate.encode());
        }).then(function (signatureValue) {
            // Siganture value
            self.signatureValue = signatureValue;

            return self;
        });
    }, // </editor-fold>
    /**
     * Generate key pair for certificate
     *
     * @memberOf GostCert.X509
     * @instance
     * @param {(AlgorithmIdentifier|string)} keyAlgorithm The key algorithm or name of provider
     * @returns {Promise} Promise to return {@link GostASN1.PrivateKeyInfo} after self-signed certificate generation
     */
    generate: function (keyAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this, privateKey, provider;
        if (keyAlgorithm)
            provider = providers[keyAlgorithm];
        else
            provider = this.getProvider() || providers[options.providerName];
        if (provider)
            keyAlgorithm = expand(provider.publicKey, { privateKey: provider.privateKey });

        return new Promise(call).then(function () {

            // Generate key pair
            return subtle.generateKey(keyAlgorithm, 'true', ['sign', 'verify']);
        }).then(function (keyPair) {
            privateKey = keyPair.privateKey;

            // Export public key
            return subtle.exportKey('spki', keyPair.publicKey);
        }).then(function (spki) {
            self.subjectPublicKeyInfo = new asn1.SubjectPublicKeyInfo(spki);

            return subtle.exportKey('pkcs8', privateKey);
        }).then(function (pkcs8) {

            return new asn1.PrivateKeyInfo(pkcs8);
        });
    }, // </editor-fold>
    /**
     * Gets the public key.
     *
     * @memberOf GostCert.X509
     * @instance
     * @returns {Promise} Promise to return {@link Key}
     */
    getPublicKey: function () // <editor-fold defaultstate="collapsed">
    {
        var spki = this.subjectPublicKeyInfo,
          keyUsages = (spki.algorithm.id === 'rsaEncryption') ? ['verify'] :
            ['verify', 'deriveKey', 'deriveBits'];
        return subtle.importKey('spki', spki.encode(), spki.algorithm, 'false', keyUsages);
    }, // </editor-fold>
    /**
     * Get appropriate crypto provider for public key
     *
     * @memberOf GostCert.X509
     * @instance
     * @returns Object Set of crypto provider algorithms
     */
    getProvider: function () // <editor-fold defaultstate="collapsed">
    {
        return keyProvider(this.subjectPublicKeyInfo.algorithm);
    }, // </editor-fold>
    /**
     * Verifies this certificate.<br><br>
     *
     * More precisely:<br><br>
     * <ul>
     *      <li>Verifies that the current VM date/time is within the validity period of the certificate.</li>
     *      <li>If an unrecognized critical extension is present, the certificate is rejected.</li>
     *      <li>If the issuer certificate has been set, verifies that the signing certificate is a
     *          CA certificate, and that the signature is correct. The signing certificate is considered
     *          to be a CA certificate unless one of the following two conditions hold: The signing
     *          certificate contains a basicConstraints extension, and the CA flag is false; or the
     *          signing certificate contains a keyUsage extension, the keyUsage extension is marked
     *          critical, and the keyCertSign bit is false.</li>
     *      <li>If the issuer CRL has been set, verifies that the certificate has not been revoked.</li>
     * </ul>
     *
     * @memberOf GostCert.X509
     * @instance
     * @param {GostCert.X509} issuerCertificate The issuer X.509 certificate
     * @param {GostCert.CRL} issuerCRL The issuer CRL
     * @param {Date} date Validation date. Default current date
     * @returns {Promise} Promise to return self object if the certificate is valid
     */
    verify: function (issuerCertificate, issuerCRL, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this, exts = self.extensions;
        return new Promise(call).then(function () {
            // Current date
            date = date || today();
            if (self.notBefore.getTime() > date.getTime() ||
              self.notAfter.getTime() <= date.getTime())
                throw new Error('The certificate has not yet started or expired');
            // A unrecognized critical extensions
            for (var name in exts) {
                var value = exts[name];
                if (value.critical &&
                  ['authorityKeyIdentifier', 'subjectKeyIdentifier', 'keyUsage', 'certificatePolicies',
                      'policyMappings', 'basicConstraints', 'nameConstraints', 'policyConstraints',
                      'extKeyUsage'].indexOf(name) < 0)
                    throw new Error('The critical extension \'' + name + '\' is unrecognized');
            }
            // The certificate can be self-signed
            var selector = authoritySelector(self, exts, self.notBefore);
            if (!issuerCertificate && matchCertificate(self, selector))
                issuerCertificate = self;
            // Check issuer
            if (issuerCertificate) {
                if (!matchCertificate(issuerCertificate, selector) ||
                  !issuerCertificate.checkUsage('keyCertSign', self.notBefore))
                    throw new Error('The issuer\'s certificate is not valid');
                // Check certificate signature
                return issuerCertificate.verifySignature(self.tbsCertificate.encode(),
                  self.signatureValue, self.signatureAlgorithm);
            }
            return true;
        }).then(function (result) {
            if (!result)
                throw new Error('The certificate has invalid signature');
            // Check CRL
            if (issuerCRL) {
                if (!matchCRL(issuerCRL, { issuer: self.issuer, date: date }))
                    throw new Error('The issuer\'s CRL is not valid');
                if (issuerCRL.isRevoked(self.serialNumber))
                    throw new Error('The certificate is revoked');
            }
            return self;
        });
    }, // </editor-fold>
    /**
     * Verify a signature made with this certificate's public key.
     *
     * @memberOf GostCert.X509
     * @instance
     * @param {CryptoOperationData} data The signed document.
     * @param {CryptoOperationData} signature The signature
     * @param {AlgorithmIdentifier} algorithm The algorithm ID used for the signature.
     * @returns {Promise} Promise to return true if the signature is verified, and false otherwise
     */
    verifySignature: function (data, signature, algorithm) // <editor-fold defaultstate="collapsed">
    {
        return this.getPublicKey().then(function (publicKey) {
            return subtle.verify(algorithm, publicKey, signature, data);
        });
    }, // </editor-fold>
    /**
     * Check key usage and date validation
     *
     * @memberOf GostCert.X509
     * @instance
     * @param {DOMString} operation The operation
     * @param {Date} date Operation date. Default current date
     * @returns {boolean}
     */
    checkUsage: function (operation, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this, exts = self.extensions;
        date = date || today();
        return (self.notBefore.getTime() <= date.getTime() && self.notAfter.getTime() > date.getTime()) &&
          (!exts || !((['keyCertSign', 'cRLSign'].indexOf(operation) > 0 && exts.basicConstraints && !exts.basicConstraints.cA) ||
            ((exts.keyUsage && exts.keyUsage.indexOf(operation) < 0) && (exts.extKeyUsage && exts.extKeyUsage.indexOf(operation) < 0))));
    } // </editor-fold>
});

/**
 * This class encapsulates X.509 Version 3 certificates.
 *
 * @memberOf GostCert
 * @type GostCert.X509
 */
GostCert.prototype.X509 = X509;

/**
 * This class encapsulates a X.509 certificate revocation list (CRL) of RevokedCertificate objects.<br><br>
 *
 * Note: the methods and constructors that input a CRL do not automatically verify it.
 * You need to explicitly call the verify method.
 *
 * @class GostCert.CRL
 * @extends GostASN1.CertificateList
 * @param {(FormatedData|GostASN1.CertificateList)} crl
 */
var CRL = function (crl) // <editor-fold defaultstate="collapsed">
{
    // Call super
    CRL.super.call(this, crl);
    // Initialize defaults
    if (!this.version)
        this.version = 1;
    if (!this.revokedCertificates)
        this.revokedCertificates = [];
    if (!this.thisUpdate)
        this.thisUpdate = today();
}; // </editor-fold>

extend(asn1.CertificateList, CRL, {
    /**
     * Signs this CRL. The issuer's private key has to be set. The default random number generator is used, if needed.<br><br>
     *
     * Note: Making any modifications to the contents of the CRL after signing invalidates the signature.
     * The sign method must be invoked again after any modifications for a valid signature to be computed.
     *
     * @memberOf GostCert.CRL
     * @instance
     * @param {GostASN1.PrivateKeyInfo} issuerPrivateKey the issuer's private signing key
     * @param {GostCert.X509} issuerCertificate the issuer's certificate
     * @returns {Promise} Promise to return self object after sign the CRL
     */
    sign: function (issuerPrivateKey, issuerCertificate) // <editor-fold defaultstate="collapsed">
    {

        var self = this;
        return new Promise(call).then(function () {
            // Check issuer private key
            if (!issuerPrivateKey)
                throw new Error('The issuer\'s private key is not defined');
            // Check issuer certificate
            if (!issuerCertificate)
                throw new Error('The issuer\'s certificate is not defined');
            // Check issuer name
            if (!self.issuer)
                self.issuer = issuerCertificate.issuer;
            else if (!equalNames(self.issuer, issuerCertificate.issuer))
                throw new Error('The CRL prototype and authority certificate have different issuers');
            // Check key usage and validity
            if (!issuerCertificate.checkUsage('cRLSign', self.thisUpdate))
                throw new Error('The issuer\'s certificate is not valid for signing a CRL');

            // Signature algorithm
            var provider = issuerCertificate.getProvider() || providers[options.providerName];
            if (!self.signature)
                self.signature = provider.signature;
            self.signatureAlgorithm = self.signature;

            // Set issuer
            self.issuer = issuerCertificate.subject;
            // Set default extensions
            if (!self.crlExtensions)
                self.crlExtensions = {};
            var exts = self.crlExtensions,
              ae = issuerCertificate.extensions;
            if (ae && ae.subjectKeyIdentifier)
                exts.authorityKeyIdentifier = {
                    keyIdentifier: ae.subjectKeyIdentifier,
                    authorityCertIssuer: [issuerCertificate.issuer],
                    authorityCertSerialNumber: issuerCertificate.serialNumber
                };
            exts.cRLNumber = exts.cRLNumber || 0;

            // Import the private key
            return subtle.importKey('pkcs8', issuerPrivateKey.encode(),
              issuerPrivateKey.privateKeyAlgorithm, false, ['sign']);
        }).then(function (key) {

            // Sign CRL
            return subtle.sign(self.signatureAlgorithm, key, self.tbsCertList.encode());
        }).then(function (signatureValue) {

            // Siganture value
            self.signatureValue = signatureValue;
            return self;
        });
    }, // </editor-fold>
    /**
     * Verify the CRL. Checks the date and signature if issuer's certifiate has been defined.
     *
     * @memberOf GostCert.CRL
     * @instance
     * @param {GostCert.X509} issuerCertificate the issuer's certificate
     * @param {Date} date Validation date. Default current date
     * @returns {Promise} Promise to return self object if the certificate is valid
     */
    verify: function (issuerCertificate, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this, exts = self.crlExtensions;
        return new Promise(call).then(function () {
            // Current date
            date = date || today();
            if (!self.thisUpdate.getTime() > date.getTime())
                throw new Error('The CRL has not yet started');
            // Check issuer
            if (issuerCertificate) {
                if (!matchCertificate(issuerCertificate, authoritySelector(self, exts, self.thisUpdate)) ||
                  !issuerCertificate.checkUsage('cRLSign', self.thisUpdate))
                    throw new Error('The issuer\'s certificate is not valid');
                if (!self.signatureValue || !self.signatureAlgorithm)
                    throw new Error('The has no signature');
                // Check CRL signature
                return issuerCertificate.verifySignature(self.tbsCertList.encode(),
                  self.signatureValue, self.signatureAlgorithm);
            }
        }).then(function (result) {
            if (!result)
                throw new Error('The CRL has invalid signature');
            return self;
        });
    }, // </editor-fold>
    /**
     * Checks whether this certificate serial number is on the list.
     *
     * @memberOf GostCert.CRL
     * @instance
     * @param {Number} serialNumber the issuer's certificate
     * @param {Date} date Validation date. Default current date
     * @returns {boolean} True if the certificate is valid, and false otherwise
     */
    isRevoked: function (serialNumber, date) // <editor-fold defaultstate="collapsed">
    {
        var rc = this.revokedCertificates;
        date = date || today();
        for (var i = 0; i < rc.length; i++) {
            // Check date and serial number
            if (date.getTime() >= rc[i].revocationDate.getTime() &&
              equalNumbers(rc[i].userCertificate, serialNumber))
                return true;
        }
        return false;
    } // </editor-fold>
});

/**
 * This class encapsulates a X.509 certificate revocation list (CRL) of RevokedCertificate objects.
 *
 * @memberOf GostCert
 * @type GostCert.CRL
 */
GostCert.prototype.CRL = CRL;

/**
 * A class that encapsulates a DER-encoded PKCS #10 certificate request. The request contains
 * the subject's name and public key, and it is signed with the subject's private key.
 * The public key contained in the request is used to verify the signature.
 * The signature on the request is verified automatically when the request is read.
 * Note that the subject's private key is used only to produce a signature when the request is output,
 * and is not actually stored with the request.
 *
 * @class GostCert.Request
 * @extends GostASN1.CertificationRequest
 * @param {(FormatedData|GostASN1.CertificationRequest)} req
 */
function Request(req) // <editor-fold defaultstate="collapsed">
{
    try {
        // Try to use encode
        asn1.CertificationRequest.call(this, req, true);
    } catch (e) {
        // Create new certificate structure
        req = req || {};
        asn1.CertificationRequest.call(this, {
            version: 0,
            subject: req.subject || options.subject,
            subjectPublicKeyInfo: req.subjectPublicKeyInfo || {
                algorithm: { id: 'noSignature' },
                subjectPublicKey: new CryptoOperationData(0)
            },
            attributes: req.attributes || {
                extensionRequest: {
                    keyUsage: options.userKeyUsage,
                    extKeyUsage: options.userExtKeyUsage
                }
            },
            signatureAlgorithm: { id: 'noSignature' },
            signatureValue: new CryptoOperationData(0)
        });
    }
} // </editor-fold>

extend(asn1.CertificationRequest, Request, {
    /**
     * Generate key pair and sign request
     *
     * @memberOf GostCert.Request
     * @instance
     * @param {(AlgorithmIdentifier|string)} keyAlgorithm The name of provider or algorithm
     * @returns {Promise} Promise to return {@link GostASN1.PrivateKeyInfo} after request generation
     */
    generate: function (keyAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this, privateKey, provider;
        if (keyAlgorithm)
            provider = providers[keyAlgorithm];
        else
            provider = this.getProvider() || providers[options.providerName];
        if (provider)
            keyAlgorithm = expand(provider.publicKey, { privateKey: provider.privateKey });

        return new Promise(call).then(function () {

            // Generate key pair
            return subtle.generateKey(keyAlgorithm, 'true', ['sign', 'verify']);
        }).then(function (keyPair) {
            privateKey = keyPair.privateKey;

            // Export public key
            return subtle.exportKey('spki', keyPair.publicKey);
        }).then(function (spki) {
            self.subjectPublicKeyInfo = new asn1.SubjectPublicKeyInfo(spki);

            return subtle.exportKey('pkcs8', privateKey);
        }).then(function (pkcs8) {
            privateKey = new asn1.PrivateKeyInfo(pkcs8);

            // Sign request
            return self.sign(privateKey);
        }).then(function () {

            return privateKey;
        });
    }, // </editor-fold>
    /**
     * Get appropriate crypto provider for public key
     *
     * @memberOf GostCert.Request
     * @instance
     * @returns Object Set of crypto provider algorithms
     */
    getProvider: function () // <editor-fold defaultstate="collapsed">
    {
        return keyProvider(this.subjectPublicKeyInfo.algorithm);
    }, // </editor-fold>
    /**
     * Generate the contents of this request and sign it.<br><br>
     *
     * @memberOf GostCert.Request
     * @instance
     * @param {GostASN1.PrivateKeyInfo} privateKey The subject's private key
     * @returns Promise to return self object after sign the request
     */
    sign: function (privateKey) // <editor-fold defaultstate="collapsed">
    {

        var self = this, spki = self.subjectPublicKeyInfo;
        return new Promise(call).then(function () {

            // Need generated key
            if (!spki || !spki.algorithm || spki.algorithm === 'noSignature')
                throw new Error('Key pair was not generated for the certificate');
            // Check issuer private key
            if (!privateKey)
                throw new Error('The private key is not defined');

            // Signature algorithm
            var provider = keyProvider(spki.algorithm) || providers[options.providerName];
            self.signatureAlgorithm = provider.signature;

            // Import the private key
            return subtle.importKey('pkcs8', privateKey.encode(),
              privateKey.privateKeyAlgorithm, false, ['sign']);
        }).then(function (key) {

            // Sign the certification request
            return subtle.sign(self.signatureAlgorithm, key, self.requestInfo.encode());
        }).then(function (signatureValue) {

            // Siganture value
            self.signatureValue = signatureValue;
            return self;
        });
    }, // </editor-fold>
    /**
     * Verify the Certification Request. Checks the signature on the public key in the request.
     *
     * @memberOf GostCert.Request
     * @instance
     * @returns {Promise} Promise to return self object  if the certificate is valid
     */
    verify: function () // <editor-fold defaultstate="collapsed">
    {
        var self = this, spki = self.subjectPublicKeyInfo;
        return new Promise(call).then(function () {

            // Import key
            return subtle.importKey('spki', spki.encode(), spki.algorithm, 'false', ['verify']);
        }).then(function (publicKey) {

            // Verify signature
            return subtle.verify(self.signatureAlgorithm, publicKey, self.signatureValue,
              self.requestInfo.encode());
        }).then(function (result) {
            if (!result)
                throw new Error('The certification request has invalid signature');
            return self;
        });
    } // </editor-fold>
});

/**
 * A class that encapsulates a DER-encoded PKCS #10 certificate request.
 *
 * @memberOf GostCert
 * @type GostCert.Request
 */
GostCert.prototype.Request = Request;

/**
 * A class for retrieving Certificates and CRLs from a repository.<br><br>
 *
 * Once the CertStore has been created, it can be used to retrieve Certificates
 * and CRLs by calling its getCertificates and getCRLs methods. Unlike a KeyStore,
 * which provides access to a cache of private keys and trusted certificates,
 * a CertStore is designed to provide access to a potentially vast repository
 * of untrusted certificates and CRLs.
 *
 * @class GostCert.CertStore
 * @param {GostCert.X509[]} certificates Certificates
 * @param {GostCert.CRL[]} crls CLRs
 */
function CertStore(certificates, crls) // <editor-fold defaultstate="collapsed">
{
    this.certificates = certificates || [];
    this.crls = crls || [];
} // </editor-fold>

extend(Object, CertStore, {
    /**
     * Returns a Array of Certificates that match the specified selector.
     *
     * @memberOf GostCert.CertStore
     * @instance
     * @param {GostCert.CertSelector} selector Certificate filter selector
     * @returns {GostCert.X509[]} Selected certificates
     */
    getCertificates: function (selector) // <editor-fold defaultstate="collapsed">
    {
        return selectCertificates(this.certificates, selector);
    }, // </editor-fold>
    /**
     * Returns a Collection of CRLs that match the specified selector.
     *
     * @memberOf GostCert.CertStore
     * @instance
     * @param {GostCert.CertSelector} selector CRL filter selector
     * @returns {GostCert.CRL[]} selected CRLs
     */
    getCRLs: function (selector) // <editor-fold defaultstate="collapsed">
    {
        return selectCRLs(this.certificates, selector);
    }, // </editor-fold>
    /**
     * Loads this CertStore from the given PKCS#7 formated input stream.
     *
     * @memberOf GostCert.CertStore
     * @instance
     * @param {(FormatedData|GostASN1.ContentInfo)} store The input stream from which the certstore is loaded
     * @returns {GostCert.CertStore} Self object after store loaded
     */
    load: function (store) // <editor-fold defaultstate="collapsed">
    {
        var info = new asn1.ContentInfo(store),
          certs = info.certificates, crls = info.crls;
        for (var i = 0; i < certs.length; i++)
            this.certificates.push(new X509(certs[i]));
        for (var i = 0; i < crls.length; i++)
            this.crls.push(new CRL(crls[i]));
        return this;
    }, // </editor-fold>
    /**
     * Stores this CertStore to the given output stream in PKCS#7 format.
     *
     * @memberOf GostCert.CertStore
     * @instance
     * @returns {GostASN1.ContentInfo} PKCS#7 content info with certificates and crls from CertStore
     */
    store: function () // <editor-fold defaultstate="collapsed">
    {
        return new asn1.ContentInfo({
            contentType: 'signedData',
            version: 0,
            digestAlgorithms: [],
            encapContentInfo: { contentType: 'data' },
            certificates: this.certs,
            crls: this.crls,
            signerInfos: []
        });
    } // </editor-fold>
});

/**
 * A class for retrieving Certificates and CRLs from a repository.
 *
 * @memberOf GostCert
 * @type GostCert.Request
 */
GostCert.prototype.CertStore = CertStore;

/**
 * A class for building and validating certification paths (also known as certificate chains).
 *
 * @class GostCert.CertPath
 * @param {GostCert.CertStore} certStore
 */
function CertPath(certStore) // <editor-fold defaultstate="collapsed">
{
    this.certStore = certStore;
} // </editor-fold>

extend(Object, CertPath, {
    /**
     * Attempts to build a certification path using the specified algorithm parameter set.
     *
     * @memberOf GostCert.CertPath
     * @instance
     * @param {GostCert.X509} certificate Starting path certificate
     * @param {Date} date Validation date. Default today
     * @returns {Promise} Promise to return array of {@link GostCert.X509} with certification path
     */
    build: function (certificate, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Build certification path
            var current = new X509(certificate), certPath = [], success = false, verifiers = [];
            while (current) {
                var foundCRLs = [], founds = [];
                certPath.push(current);
                if (!success) {
                    // Select issuer CRL
                    foundCRLs = self.certStore.getCRLs({ issuer: current.issuer, date: date });
                    // Create issuer's selection criteria
                    var selector = authoritySelector(current, current.extensions,
                      current.notBefore);
                    // Self-signed certificate?
                    if (!matchCertificate(current, selector))
                    // Select issuer form trusted CA root list
                        founds = self.certStore.getCertificates(selector);
                    else
                        success = true;
                }
                // Add verification tasks
                var next = founds.length > 0 && new X509(founds[0]),
                  crl = foundCRLs.length > 0 && new CRL(foundCRLs[0]);
                // Verify CRLs
                if (crl)
                    verifiers.push(crl.verify(next, date));

                // Verify the certificate
                verifiers.push(current.verify(next, crl, date));
                current = next;
            }
            if (!success)
                throw new Error('Root certificate is not found');
            // Verify all certificates in path
            return Promise.all(verifiers).then(function (results) {
                for (var i = 0; i < results; i++)
                    if (!results[i])
                        throw new Error('Certification path is not validated');
                return certPath;
            });
        });
    } // </editor-fold>
});

/**
 * A class for building and validating certification paths (also known as certificate chains).
 *
 * @memberOf GostCert
 * @type GostCert.CertPath
 */
GostCert.prototype.CertPath = CertPath;

/**
 * A generic interface for implementing a particular certificate verification
 * scheme, such as constructing and verifying
 * certificate chains.
 *
 * @class GostCert.CertificateTrustPolicy
 */
function CertificateTrustPolicy() {
}

extend(Object, CertificateTrustPolicy, {
    /**
     * Returns a certificate, known to be valid (according to criteria dependent
     * on the verification scheme), which has the given selector, certificate and
     * CRL lists to implement a particular certificate verification  scheme,
     * such a forming valid certificate chains.<br>
     * Second and third argument to this method may be undefined, and such a case
     * must be treated exactly the same as if the particular argument was an empty array.
     *
     * @memberOf GostCert.CertificateTrustPolicy
     * @instance
     * @param {GostCert.CertificateSelector} selector Certificate selector
     * @param {GostCert.X509[]} certificates Certificates
     * @param {GostCert.CRL[]} crls CLRs
     * @returns {Promise} Promise to return valid {@link GostCert.X509}
     */
    getValidCertificate: function (selector, certificates, crls) {
    }
});

/**
 * A generic interface for implementing a particular certificate verification
 *
 * @memberOf GostCert
 * @type GostCert.CertificateTrustPolicy
 */
GostCert.prototype.CertificateTrustPolicy = CertificateTrustPolicy;

/**
 * A certificate trust policy based on a set of trusted root CAs.<br><br>
 *
 * In this policy, a certificate will be trusted if and only if it is part of a
 * valid certificate chain which terminates in one of the trusted root CAs. <br><br>
 *
 * This policy has two options for certificate chain verification:
 * <ul>
 *      <li>requireCRL - If true, then for every certificate in a chain
 *          (unless it is one of the trusted root CA certificates) a valid CRL
 *          must be provided to determine its revocation status. The default is false.</li>
 *      <li>requireCAFlag - If true, then every intermediate CA certificate (excluding
 *          the root CA or the end entity certificate) must contain a Basic Constraints
 *          extension, with the CA flag set. The default for this option is true.</li>
 * </ul>
 *
 * @class GostCert.TrustedCAPolicy
 * @extends GostCert.CertificateTrustPolicy
 * @param {GostCert.X509[]} trustedCACerts
 * @param {boolean} requireCRL
 * @param {boolean} requireCA
 */
function TrustedCAPolicy(trustedCACerts, requireCRL, requireCA) // <editor-fold defaultstate="collapsed">
{
    this.trustedCACerts = trustedCACerts || [];
    this.requireCRL = requireCRL || false;
    this.requireCA = requireCA || true;
} // </editor-fold>

extend(CertificateTrustPolicy, TrustedCAPolicy, {
    /**
     * Returns a certificate, known to be valid (according to criteria dependent
     * on the verification scheme), which has the given selector, certificate and
     * CRL lists to implement a particular certificate verification  scheme,
     * such a forming valid certificate chains.<br>
     * Second and third argument to this method may be undefined, and such a case
     * must be treated exactly the same as if the particular argument was an empty array.
     *
     * @memberOf GostCert.TrustedCAPolicy
     * @instance
     * @param {GostCert.CertificateSelector} selector Certificate selector
     * @param {GostASN1.Certificate[]} certificates Certificates
     * @param {GostASN1.CertificateList[]} crls CLRs
     * @param {Date} date Validation date. Default today
     * @returns {Promise} Promise to return valid {@link GostCert.X509}
     */
    getValidCertificate: function (selector, certificates, crls, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this, certPath;
        return new Promise(call).then(function () {
            certificates = certificates || [];
            crls = crls || [];
            // Get certificates from the trusted list
            var certs = selectCertificates(self.trustedCACerts, selector);
            if (certs.length > 0)
                return new X509(certs[0]);
            // Get certificates from the list
            certs = selectCertificates(certificates, selector);
            if (certs.length === 0)
                return;
            // Build certification path
            var current = new X509(certs[0]), success = false, verifiers = [];
            certPath = [];
            while (current) {
                var foundCRLs = [], founds = [];
                certPath.push(current);
                if (!success) {
                    // Select issuer CRL
                    foundCRLs = selectCRLs(crls, { issuer: current.issuer, date: date });
                    if (foundCRLs.length === 0 && self.requireCRL)
                        return; // The issuer\'s CRL is not found
                    // Create issuer's selection criteria
                    selector = authoritySelector(current, current.extensions,
                      current.notBefore);
                    // Select issuer form trusted CA root list
                    founds = selectCertificates(self.trustedCACerts, selector);
                    if (founds.length === 0) {
                        // Non-trusted self-signed certificate?
                        if (!matchCertificate(current, selector)) {
                            // Select issuer from certificate list
                            founds = selectCertificates(certificates, selector);
                            if (founds.length > 0) {
                                // Check basic contrains and CA flag
                                var exts = founds[0].extensions;
                                if (self.requireCA) {
                                    if (!exts || !exts.basicConstraints || !exts.basicConstraints.cA)
                                        return; // The issuer\'s certificate is not valid
                                    // Check path length limit
                                    if (exts.basicConstraints.pathLenConstraint !== undefined &&
                                      exts.basicConstraints.pathLenConstraint < certPath.length - 1)
                                        return; // The issuer\'s certificate path length constraint exceeded
                                }
                            } else
                                return; // Certification path is not built
                        }
                    } else
                        success = true;
                }
                // Add verification tasks
                var next = founds.length > 0 && new X509(founds[0]),
                  crl = foundCRLs.length > 0 && new CRL(foundCRLs[0]);
                // Verify CRLs
                if (crl)
                    verifiers.push(crl.verify(next, date));

                // Verify the certificate
                verifiers.push(current.verify(next, crl, date));
                current = next;
            }
            if (!success)
                throw new Error('Trusted root certificate is not found');
            // Verify all certificates in path
            return Promise.all(verifiers).then(function (results) {
                for (var i = 0; i < results; i++)
                    if (!results[i])
                        throw new Error('Certification path is not validated');
                return certPath[0];
            });
        });
    } // </editor-fold>
});

/**
 * A certificate trust policy based on a set of trusted root CAs.
 *
 * @memberOf GostCert
 * @type GostCert.TrustedCAPolicy
 */
GostCert.prototype.TrustedCAPolicy = TrustedCAPolicy;

export const gostCertInstance = new GostCert();
