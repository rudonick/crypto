/**
 * @file Implements the Cryptographic Message Syntax as specified in RFC-2630.
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

import { gostSubtleInstance } from './gostSubtle';
import { gostASN1Instance } from './gostASN1';
import { gostCodingInstance } from './gostCoding';
import { gostCertInstance } from './gostCert';
import { gostSecurityInstance } from './gostSecurity';

/*
 * Common algorithms
 */ // <editor-fold defaultstate="collapsed">

var CryptoOperationData = ArrayBuffer;

var providers = gostSecurityInstance.providers;
var coding = gostCodingInstance;
var asn1 = gostASN1Instance;
var subtle = gostSubtleInstance;
var cert = gostCertInstance;

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

// Self resolver
function call(callback) {
    try {
        callback();
    } catch (e) {
    }
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

// Add unique value to array
function addUnique(array, item, comparator) {
    var found = false;
    for (var i = 0, n = array.length; i < n; i++)
        if (comparator(array[i], item)) {
            found = true;
            break;
        }
    if (!found)
        array.push(item);
}

// Set content data
function setContentData(object, data) {
    var content = object.content;
    switch (object.contentType) {
        case 'data':
            object.content = data.content;
            break;
        case 'digestedData':
        case 'signedData':
        case 'authData':
            content.encapContentInfo = {
                eContentType: data.contentType,
                eContent: data.content
            };
            break;
        case 'envelopedData':
        case 'encryptedData':
            content.encryptedContentInfo = {
                contentType: data.contentType,
                encryptedContent: data.content
            };
            break;
    }
}

// Get content data
function getContentData(object) {
    var content = object.content;
    switch (object.contentType) {
        case 'data':
            return {
                contentType: object.contentType,
                content: object.content
            };
        case 'digestedData':
        case 'signedData':
        case 'authData':
            var encap = content.encapContentInfo;
            return {
                contentType: encap.eContentType,
                content: encap.eContent
            };
        case 'envelopedData':
        case 'encryptedData':
            var enc = content.encryptedContentInfo;
            return {
                contentType: enc.contentType,
                content: enc.encryptedContent
            };
    }
}

// Check content info type
function checkContentInfo(contentInfo) {
    var content, contentType;
    if (contentInfo) {
        if (typeof contentInfo === 'string')
            try {
                contentInfo = coding.PEM.decode(contentInfo);
            } catch (e1) {
                contentInfo = coding.Chars.decode(contentInfo);
            }
        if (contentInfo instanceof CryptoOperationData)
            try {
                contentInfo = asn1.ContentInfo.decode(contentInfo);
            } catch (e) {
                contentInfo = { contentType: 'data', content: contentInfo };
            }
        contentType = contentInfo.contentType;
        if (!contentType)
            throw new Error('Invalid content object');
        content = contentInfo.content;
        if (!(content instanceof CryptoOperationData))
            content = content.encode();
        return { contentType: contentType, content: content };
    } else
        contentInfo = { contentType: 'data' };
    return contentInfo;
}

function createContentInfo(contentInfo) {
    try {
        // Some provider has mistake to envelop ContentInfo enstead
        // content field of ContentInfo
        contentInfo = new asn1.ContentInfo(contentInfo.content, true);
    } catch (e) {
    }
    // Create situable content info object
    switch (contentInfo.contentType) {
        case 'data':
            return new DataContentInfo(contentInfo);
        case 'digestedData':
            return new DigestedDataContentInfo(contentInfo);
        case 'signedData':
            return new SignedDataContentInfo(contentInfo);
        case 'encryptedData':
            return new EncryptedDataContentInfo(contentInfo);
        case 'envelopedData':
            return new EnvelopedDataContentInfo(contentInfo);
        default:
            return new asn1.ContentInfo(contentInfo);
    }
}
;

function matchCert(id, cert) {
    return (id instanceof CryptoOperationData ? cert.extensions &&
      equalBuffers(id, cert.extensions.subjectKeyIdentifier) :
      equalNames(cert.issuer, id.issuer) &&
      equalNumbers(cert.serialNumber, id.serialNumber));
}

// Get random values
function getSeed(length) {
    var seed = new Uint8Array(length);
    gostCrypto.getRandomValues(seed);
    return seed.buffer;
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
    if (password instanceof CryptoOperationData)
        return password;
    if (typeof password !== 'string')
        throw new Error('The password must be string or raw data type');
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

// Define provider for encription algorithm
function encryptionProvider(algorithm) {
    var id = algorithm.id;
    for (var name in providers) {
        var provider = providers[name];
        if (provider.encryption.id === id)
            return provider;
    }
}

// </editor-fold>

/**
 * Provides facilities for handling certificates, CRLs, etc.
 * @class GostCMS
 */
export function GostCMS() {
}

/**
 * Message templates
 * <ul>
 *      <li>providerName - provider name for key generation, default 'CP-01'</li>
 *      <li>autoAddCert - automatic add signer certificate to signature, default false</li>
 *      <li>useKeyIdentifier - true to add Signer as the SignerIdentifier (v3), otherwise, as the IssuerAndSerialNumber (v1) (default false).</li>
 * </ul>
 *
 * @memberOf GostCMS
 * @instance
 */
var options = {// <editor-fold defaultstate="collapsed">
    providerName: 'CP-01',
    autoAddCert: false,
    useKeyIdentifier: false // </editor-fold>
};

GostCMS.prototype.options = options;

/**
 * The base class for all CMS objects.<br><br>
 *
 * A CMS object consists of a content type, and content.<br><br>
 *
 * @class GostCMS.DataContentInfo
 * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo The content object.
 * @param {string} defaultSet The default object initialization set.
 * @extends GostASN1.ContentInfo
 */
function DataContentInfo(contentInfo, defaultSet) // <editor-fold defaultstate="collapsed">
{
    asn1.ContentInfo.call(this, contentInfo || defaultSet || { contentType: 'data' });
    if (defaultSet && this.contentType !== (defaultSet.contentType || 'data'))
        throw new Error('Invalid content type');
} // </editor-fold>

extend(asn1.ContentInfo, DataContentInfo, {
    /**
     * Indicates if this is a detached CMS object.
     *
     * @memberOf GostCMS.DataContentInfo
     * @instance
     * @returns {boolean} true if detached; false otherwise.
     */
    isDetached: {// <editor-fold defaultstate="collapsed">
        value: false,
        enumerable: true,
        writable: true // </editor-fold>
    },
    /**
     * Indicates if an external (detached) signature must be created.
     *
     * @memberOf GostCMS.DataContentInfo
     * @instance
     * @param {boolean} createDetached True if detached; false otherwise.
     */
    writeDetached: function (createDetached) // <editor-fold defaultstate="collapsed">
    {
        // Define external signature mode
        this.isDetached = createDetached;
    }, // </editor-fold>
    /**
     * Encode the message to binary format 'DER' or 'PEM'
     *
     * @memberOf GostCMS.DataContentInfo
     * @instance
     * @param {string} format
     * @returns {FormatedData}
     */ // <editor-fold defaultstate="collapsed">
    encode: function (format) // <editor-fold defaultstate="collapsed">
    {
        if (this.isDetached) {
            var data = getContentData(this);
            setContentData(this, { contentType: data.contentType });
            var result = asn1.ContentInfo.method('encode').call(this, format);
            setContentData(this, data);
            return result;
        } else
            return asn1.ContentInfo.method('encode').call(this, format);
    }, // </editor-fold>
    /**
     * Enclose content to document.
     *
     * @memberOf GostCMS.DataContentInfo
     * @instance
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo
     * @returns {Promise} Promise to return self object after enclose content
     */
    encloseContent: function (contentInfo) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            self.setEnclosed(contentInfo);
            return self;
        });
    }, // </editor-fold>
    /**
     * Sets the content of attached document.<br><br>
     *
     * This is necessary only in detached mode.
     *
     * @memberOf GostCMS.DataContentInfo
     * @instance
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo - The encapsulated CMS Object.
     */
    setEnclosed: function (contentInfo) // <editor-fold defaultstate="collapsed">
    {
        setContentData(this, checkContentInfo(contentInfo));
    }, // </editor-fold>
    /**
     * Returns the document which attached. If the content is not attached, the CMS object
     * which is returned will be degenerate.
     *
     * @memberOf GostCMS.DataContentInfo
     * @instance
     * @returns {GostASN1.ContentInfo} The encapsulated CMS Object.
     */
    getEnclosed: function () // <editor-fold defaultstate="collapsed">
    {
        return createContentInfo(getContentData(this));
    } // </editor-fold>
});

/**
 * This class encapsulates a CMS object of content type binary data.
 *
 * @memberOf GostCMS
 * @type GostCMS.DigestedDataContentInfo
 */
GostCMS.prototype.DataContentInfo = DataContentInfo;

/**
 * This class encapsulates a CMS object of content type digested-data.
 *
 * @class GostCMS.DigestedDataContentInfo
 * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo - The content that is to be signed.
 * @extends GostCMS.DataContentInfo
 * @extends GostASN1.DigestedData
 */
function DigestedDataContentInfo(contentInfo) // <editor-fold defaultstate="collapsed">
{
    DataContentInfo.call(this, contentInfo, {
        contentType: 'digestedData',
        version: 0,
        digestAlgorithm: providers[options.providerName].digest,
        encapContentInfo: {
            eContentType: 'data'
        },
        digest: new CryptoOperationData(0)
    });
}  // </editor-fold>

extend(DataContentInfo, DigestedDataContentInfo, {
    /**
     * Enclose the content and calculate the message digest with given digest algorithm
     *
     * @memberOf GostCMS.DigestedDataContentInfo
     * @instance
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo Content data to be enclosed.
     * @param {(AlgorithmIdentifier|string)} digestAlgorithm Digest algorithm or provider name
     * @returns {Promise}
     */
    encloseContent: function (contentInfo, digestAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Set enclosed data
            self.setEnclosed(contentInfo);

            // Define digest algorithm
            if (digestAlgorithm) {
                var digestProvider = providers[digestAlgorithm];
                self.digestAlgorithm = (digestProvider && digestProvider.digest) || digestAlgorithm;
            }

            // Calculate digest
            return subtle.digest(self.digestAlgorithm, self.encapContentInfo.eContent);
        }).then(function (digest) {

            // Set digest attribute
            self.digest = digest;
        });
    }, // </editor-fold>
    /**
     * Verify the Message Digest. <br><br>
     *
     * @memberOf GostCMS.DigestedDataContentInfo
     * @instance
     * @param contentInfo Detached content (optional)
     * @returns {Promise} Promise to return enclosed object {@link GostASN1.ContentInfo} if digest verified
     */
    verify: function (contentInfo) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Append attached
            if (contentInfo)
                self.setEnclosed(contentInfo);

            // Check data
            var dataToVerify = self.encapContentInfo &&
              self.encapContentInfo.eContent;
            if (!dataToVerify)
                throw new Error('Detached content is not found');

            // Calculate digest
            return subtle.digest(self.digestAlgorithm, self.encapContentInfo.eContent);
        }).then(function (digest) {
            if (!equalBuffers(digest, self.digest))
                throw Error('Message digest is not verified');
            // Return content
            return createContentInfo({
                contentType: self.encapContentInfo.eContentType,
                content: self.encapContentInfo.eContent
            });
        });
    } // </editor-fold>
});

/**
 * This class encapsulates a CMS object of content type digested-data.
 *
 * @memberOf GostCMS
 * @type GostCMS.DigestedDataContentInfo
 */
GostCMS.prototype.DigestedDataContentInfo = DigestedDataContentInfo;

/**
 * This class encapsulates a CMS object of content type signed-data.
 *
 * Use encloseContent or setEnclosed methods to add a enclosed content before add signatures
 *
 * @class GostCMS.SignedDataContentInfo
 * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo - The signed content.
 * @extends GostCMS.DataContentInfo
 * @extends GostASN1.SignedData
 */
function SignedDataContentInfo(contentInfo) // <editor-fold defaultstate="collapsed">
{
    DataContentInfo.call(this, contentInfo, {
        contentType: 'signedData',
        version: 1,
        digestAlgorithms: [],
        encapContentInfo: {
            eContentType: 'data'
        },
        signerInfos: []
    });
}  // </editor-fold>

extend(DataContentInfo, SignedDataContentInfo, {
    /**
     * Add a Signer using the the IssuerAndSerialNumber as the SignerIdentifier i.e a Version1 CMSSignerInfo
     * or SubjectPublicKeyIdentifier as the SignerIdentifier i.e a Version3 CMSSignerInfo.
     *
     * @memberOf GostCMS.SignedDataContentInfo
     * @instance
     * @param {GostASN1.PrivateKeyInfo} signerKey Private Key of the signer.
     * @param {GostCert.X509} signerCert Signer certificate or certificate chain
     * @param {GostASN1.SignedAttributes} signedAttrs The set of signed attributes. Default undefined. If true or {} standard attributes will be appended: contentType and messageDigest
     * @param {GostASN1.UnsignedAttributes} unsignedAttrs  The set of unsigned attributes. Default undefined.
     * @returns {Promise} Promise to return self object after add signature
     */
    addSignature: function (signerKey, signerCert, signedAttrs, unsignedAttrs) // <editor-fold defaultstate="collapsed">
    {
        var self = this, signerInfo, dataToSign, signerCertChain;
        return new Promise(call).then(function () {
            // Check attribures
            if (!signerKey || !signerCert)
                throw new Error('Signer key or certificate is not defined');
            // Cert chain
            if (signerCert instanceof Array) {
                signerCertChain = signerCert;
                signerCert = signerCertChain[0];
            } else
                signerCertChain = [signerCert];
            // Signature algorithm provider
            var provider = signerCert.getProvider() ||
              providers[options.providerName];
            var useKeyIdentifier = options.useKeyIdentifier && signerCert.extensions &&
              signerCert.extensions.subjectKeyIdentifier;
            // Get enclosed data
            dataToSign = self.encapContentInfo.eContent;
            // Prepare signer info structure
            signerInfo = {
                version: useKeyIdentifier ? 2 : 0,
                sid: useKeyIdentifier ? signerCert.extensions.subjectKeyIdentifier : {
                    issuer: signerCert.issuer,
                    serialNumber: signerCert.serialNumber
                },
                digestAlgorithm: provider.digest,
                signatureAlgorithm: signerCert.subjectPublicKeyInfo.algorithm
            };
            // Set an unsigned attributes
            if (unsignedAttrs)
                signerInfo.unsignedAttrs = unsignedAttrs;
            // For a signed attributes calculate digest
            if (signedAttrs) {
                if (typeof signedAttrs !== 'object')
                    signedAttrs = {};
                return subtle.digest(signerInfo.digestAlgorithm, dataToSign);
            }
        }).then(function (digest) {
            if (digest) {
                // Add standard signed attributes
                signedAttrs.contentType = self.encapContentInfo.eContentType,
                  signedAttrs.messageDigest = digest,
                  signedAttrs.signingTime = new Date();
                signerInfo.signedAttrs = signedAttrs,
                  // Now data to sign = attributes
                  dataToSign = asn1.SignedAttributes.encode(signerInfo.signedAttrs);
            }

            // Import the private key
            return subtle.importKey('pkcs8', asn1.PrivateKeyInfo.encode(signerKey),
              signerKey.privateKeyAlgorithm, false, ['sign']);
        }).then(function (key) {

            // Sign data
            var algorithm = expand(signerInfo.signatureAlgorithm, { hash: signerInfo.digestAlgorithm });
            return subtle.sign(algorithm, key, dataToSign);
        }).then(function (signatureValue) {
            signerInfo.signatureValue = signatureValue;

            // Add digest algorithm
            addUnique(self.digestAlgorithms, signerInfo.digestAlgorithm, function (algorithm1, algorithm2) {
                return algorithm1.id === algorithm2.id;
            });

            // Add signer certificate
            if (options.autoAddCert) {
                if (!self.certificates)
                    self.certificates = [];
                for (var i = 0, n = signerCertChain.length; i < n; i++) {
                    addUnique(self.certificates, signerCertChain[i], function (cert1, cert2) {
                        return equalNames(cert1.issuer, cert2.issuer) &&
                          equalNumbers(cert1.serialNumber, cert2.serialNumber);
                    });
                }
            }

            // Add signer info
            self.signerInfos.push(signerInfo);
        });
    }, // </editor-fold>
    /**
     * Indicates if this object has any signers i.e. checks for the absence of any SignerInfo structures.
     * CMS (RFC-2630) defines a degenerate object as one which has no signers.
     *
     * @memberOf GostCMS.SignedDataContentInfo
     * @instance
     * @returns {boolean} True if this object has no signers; false otherwise.
     */
    isDegenerate: {// <editor-fold defaultstate="collapsed">
        get: function () {
            return !(this.signerInfos && this.signerInfos.length > 0);
        } // </editor-fold>
    },
    /**
     * Returns normally if this CMS signed data object contains at least one valid signature,
     * according to the given trust policy; otherwise throws an Error.<br><br>
     *
     * In order to be considered valid, there must be at least one signature on this CMS
     * message which is validated by one of the certificates included with it; furthermore,
     * the validating certificate must itself be valid according to the given certificate
     * trust policy. This latter validation process may involve examining the other certificates
     * or CRLs included with this object, if called for by the trust policy.<br><br>
     *
     * If a signature is encountered for which a certification path can be found, but is
     * invalid, an Error will be created, but will not be thrown until
     * all other signatures have been checked. If another signature is found which is valid,
     * then the method simply returns and no exception at all is thrown.
     *
     * @memberOf GostCMS.SignedDataContentInfo
     * @instance
     * @param {GostCert.CertificateTrustPolicy} trustPolicy The trust prolicy for verification
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo The content that was signed (optional)
     * @returns {Promise} Promise to return enclosed object {@link GostASN1.ContentInfo} if signature verified
     */
    verify: function (trustPolicy, contentInfo) // <editor-fold defaultstate="collapsed">
    {
        var self = this, result;
        return new Promise(call).then(function () {
            // Append attached
            if (contentInfo)
                self.setEnclosed(contentInfo);
            if (!self.signerInfos || self.signerInfos.length === 0)
                throw new Error('No signatures found');
            // Validate certificate of signers
            return Promise.all(self.signerInfos.map(function (signerInfo, i) {
                var sid = signerInfo.sid, selector = sid instanceof CryptoOperationData ? {
                    subjectKeyIdentifier: sid
                } : {
                    issuer: sid.issuer,
                    serialNumber: sid.serialNumber
                };
                // Signing date
                var date;
                if (signerInfo.signedAttrs && signerInfo.signedAttrs.signingTime)
                    date = signerInfo.signedAttrs.signingTime;
                // Use certificate trust policy validation
                return trustPolicy.getValidCertificate(selector,
                  self.certificates, self.crls, date).catch(function () {
                    return; // Ignore error
                });
            }));

        }).then(function (certs) {
            // Get encapsulated data
            var verifiers = [];
            // Verify signatures for each signers
            certs.forEach(function (signerCert) {
                if (signerCert)
                    verifiers.push(self.verifySignature(signerCert).then(function (data) {
                        result = data; // Enough one valid signature
                    }, function () {
                        return; // Ignore error
                    }));
            });
            if (verifiers.length === 0)
                throw new Error('Valid verification path not found');
            return Promise.all(verifiers);
        }).then(function () {
            if (!result)
                throw Error('Verification path found but no valid signature');
            // Return content
            return result;
        });
    }, // </editor-fold>
    /**
     * Returns successfully if this CMS signed data object contains a signature which is
     * validated by the given certificate and data; otherwise throws an Error.<br><br>
     *
     * This method verifies the specified signature directly and ignores any certificates
     * or CRLs which may be contained in this CMS object. A more complex verification process,
     * which does make use of attached certificates and CRLs, is provided by the verify method.
     *
     * @memberOf GostCMS.SignedDataContentInfo
     * @instance
     * @param {GostCert.X509} signerCert The signer certificate
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo The content that was signed (optional)
     * @returns {Promise} Promise to return enclosed object {@link GostASN1.ContentInfo} if signature verified
     */
    verifySignature: function (signerCert, contentInfo) // <editor-fold defaultstate="collapsed">
    {
        var self = this, signerInfo, dataToVerify, dataDigest;
        return new Promise(call).then(function () {
            // Append attached
            if (contentInfo)
                self.setEnclosed(contentInfo);
            dataToVerify = self.encapContentInfo && self.encapContentInfo.eContent;
            if (!dataToVerify)
                throw new Error('Detached content is not found');
            // Find signer
            for (var i = 0; i < self.signerInfos.length; i++) {
                var sid = self.signerInfos[i].sid;
                if (matchCert(sid, signerCert)) {
                    signerInfo = self.signerInfos[i];
                    break;
                }
            }
            if (!signerInfo)
                throw new Error('Signature not found for the certificate');
            // Choice data for verification
            if (signerInfo.signedAttrs) {
                dataDigest = signerInfo.signedAttrs.messageDigest;
                if (!dataDigest)
                    throw new Error('Message digest must present in signed attributes');

                // To exclude implicit [0] need to reassemble signed attributes (auto on CTX object)
                dataToVerify = signerInfo.signedAttrs.encode();
            }
            if (!dataToVerify)
                throw new Error('Data for verification not found');
            // Verify signature
            var algorithm = expand(signerInfo.signatureAlgorithm, { hash: signerInfo.digestAlgorithm });
            return signerCert.verifySignature(dataToVerify, signerInfo.signatureValue, algorithm);
        }).then(function (result) {
            if (!result)
                throw new Error('Signature not verified');
            // Verify digest
            if (signerInfo.signedAttrs)
                return subtle.digest(signerInfo.digestAlgorithm, self.encapContentInfo.eContent);
        }).then(function (digest) {
            if (digest && !equalBuffers(digest, dataDigest))
                throw new Error('Message digest not verified');
            // Return content
            return createContentInfo({
                contentType: self.encapContentInfo.eContentType,
                content: self.encapContentInfo.eContent
            });
        });
    }  // </editor-fold>
});

/**
 * This class encapsulates a CMS object of content type signed-data.
 *
 * @memberOf GostCMS
 * @type GostCMS.SignedDataContentInfo
 */
GostCMS.prototype.SignedDataContentInfo = SignedDataContentInfo;

/**
 * This class encapsulates a CMS object of content type encrypted-data.
 *
 * @class GostCMS.EncryptedDataContentInfo
 * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo The encrypted data content.
 * @extends GostCMS.DataContentInfo
 * @extends GostASN1.EncryptedData
 */
function EncryptedDataContentInfo(contentInfo) // <editor-fold defaultstate="collapsed">
{
    DataContentInfo.call(this, contentInfo, {
        contentType: 'encryptedData',
        version: 0,
        encryptedContentInfo: {
            contentType: 'data',
            contentEncryptionAlgorithm: providers[options.providerName].encryption
        }
    });
}  // </editor-fold>

extend(DataContentInfo, EncryptedDataContentInfo, {
    /**
     * Encrypt the content with given encryption algorithm, secret key or password
     *
     * @memberOf GostCMS.EncryptedDataContentInfo
     * @instance
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo The content data to be enclosed.
     * @param {Key|string} contentEncryptionKey content The encryption key or password for derive key
     * @param {(AlgorithmIdentifier|string)} encryptionAlgorithm The encryption algorithm or provider name
     * @returns {Promise} Promise to return self object after encrypt content
     */
    encloseContent: function (contentInfo, contentEncryptionKey, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this, encryption, derivation;
        return new Promise(call).then(function () {
            // Check content info
            contentInfo = checkContentInfo(contentInfo);
            if (!contentInfo.content)
                throw new Error('Content for encryption must be specified');

            // Define encryption algorithm
            var type = typeof contentEncryptionKey === 'string' ? 'pbes' : 'encryption';
            if (encryptionAlgorithm) {
                var provider = providers[encryptionAlgorithm];
                encryptionAlgorithm = (provider && provider[type]) || encryptionAlgorithm;
            } else
                encryptionAlgorithm = providers[options.providerName][type];
            // Prepare content encryption key
            if (encryptionAlgorithm.derivation) {
                // Encrypt with password
                derivation = expand(encryptionAlgorithm.derivation);
                encryption = expand(encryptionAlgorithm.encryption);
                derivation.salt = getSeed(saltSize(encryptionAlgorithm));
                // Import password for key generation
                var integrityKey;
                return subtle.importKey('raw', passwordData(derivation, contentEncryptionKey),
                  derivation, false, ['deriveKey', 'deriveBits']).then(function (key) {
                    integrityKey = key;
                    // Derive IV
                    if (derivation.name.indexOf('PFXKDF') >= 0) {
                        derivation.diversifier = 2;
                        return subtle.deriveBits(derivation, integrityKey, 64);
                    }
                }).then(function (iv) {
                    if (iv)
                        encryption.iv = iv;
                    // Generate key from password
                    derivation.diversifier = 1;
                    return subtle.deriveKey(derivation, integrityKey, encryption, false, ['encrypt']);
                }).then(function (encryptionKey) {
                    // Content encryption with key
                    return encryptionKey;
                });
            } else {
                // Base encryption
                encryption = expand(encryptionAlgorithm);
                if (contentEncryptionKey instanceof CryptoOperationData) {
                    // Import key
                    return subtle.importKey('raw', contentEncryptionKey, encryption, false, ['encrypt']);
                } else if (contentEncryptionKey.type === 'secret') {
                    return contentEncryptionKey;
                } else
                    throw new Error('Content encryption key must be raw data or secret key type');
            }
        }).then(function (encryptionKey) {
            // Initial vector
            if (!encryption.iv)
                encryption.iv = getSeed(8);

            return subtle.encrypt(encryption, encryptionKey, contentInfo.content);
        }).then(function (encryptedContent) {
            if (encryptionAlgorithm.derivation) {
                delete derivation.diversifier;
                encryptionAlgorithm = expand(encryptionAlgorithm, {
                    derivation: derivation,
                    encryption: encryption
                });
            } else
                encryptionAlgorithm = encryption;
            // Set enclosed data
            self.encryptedContentInfo = {
                contentType: contentInfo.contentType,
                contentEncryptionAlgorithm: encryptionAlgorithm,
                encryptedContent: encryptedContent
            };
            return self;
        });
    }, // </editor-fold>
    /**
     * Returns the decrypted content.
     *
     * @memberOf GostCMS.EncryptedDataContentInfo
     * @instance
     * @param {Key|string} decryptionKey The decryption key or password for derive key
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo The detached content (optional).
     * @returns {Promise} Promise to return enclosed object {@ling GostASN1.ContentInfo} after decrypt content
     */
    getEnclosed: function (decryptionKey, contentInfo) // <editor-fold defaultstate="collapsed">
    {
        var self = this, encryption, derivation, encryptedContent;
        return new Promise(call).then(function () {
            // Append attached
            if (contentInfo)
                self.setEnclosed(contentInfo);
            encryptedContent = self.encryptedContentInfo.encryptedContent;
            if (!encryptedContent)
                throw new Error('Encrypted content must be specified');

            encryption = expand(self.encryptedContentInfo.contentEncryptionAlgorithm);
            if (encryption.derivation) {
                // Decrypt with password
                derivation = expand(encryption.derivation);
                encryption = expand(encryption.encryption);
                // Derive encryption key from password
                var integrityKey;
                return subtle.importKey('raw', passwordData(derivation, decryptionKey),
                  derivation, false, ['deriveKey', 'deriveBits']).then(function (key) {
                    integrityKey = key;
                    // Derive iv for PFX
                    if (derivation.name.indexOf('PFXKDF') >= 0) {
                        derivation.diversifier = 2;
                        return subtle.deriveBits(derivation, integrityKey, 64);
                    }
                }).then(function (iv) {
                    if (iv)
                        encryption.iv = iv;
                    // Generate key from password
                    derivation.diversifier = 1;
                    return subtle.deriveKey(derivation, integrityKey, encryption, false, ['decrypt']);
                });
            } else {
                // Base encryption. Password should be secret key
                if (decryptionKey instanceof CryptoOperationData) {
                    // Import key
                    return subtle.importKey('raw', decryptionKey, encryption, false, ['decrypt']);
                } else if (decryptionKey.type === 'secret') {
                    return decryptionKey;
                } else
                    throw new Error('Decryption key must be raw data or secret key type');
            }
        }).then(function (encryptionKey) {
            // Decrypt key with encryption key
            return subtle.decrypt(encryption, encryptionKey, encryptedContent);
        }).then(function (decryptedContent) {
            // Create content info object
            return createContentInfo({
                contentType: self.encryptedContentInfo.contentType,
                content: decryptedContent
            });
        });
    } // </editor-fold>
});

/**
 * This class encapsulates a CMS object of content type encrypted-data.
 *
 * @memberOf GostCMS
 * @type GostCMS.EncryptedDataContentInfo
 */
GostCMS.prototype.EncryptedDataContentInfo = EncryptedDataContentInfo;

/**
 * This class encapsulates a CMS object of content type enveloped-data.
 *
 * @class GostCMS.EnvelopedDataContentInfo
 * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo The encrypted data content.
 * @extends GostCMS.DataContentInfo
 * @extends GostASN1.EnvelopedData
 */
function EnvelopedDataContentInfo(contentInfo) // <editor-fold defaultstate="collapsed">
{
    DataContentInfo.call(this, contentInfo, {
        contentType: 'envelopedData',
        version: 0,
        recipientInfos: [],
        encryptedContentInfo: {
            contentType: 'data',
            contentEncryptionAlgorithm: providers[options.providerName].encryption
        }
    });
}  // </editor-fold>

extend(DataContentInfo, EnvelopedDataContentInfo, {
    /**
     * Generate content encryption key with given encryption algorithm and encrypt the content
     *
     * @memberOf GostCMS.EnvelopedDataContentInfo
     * @instance
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo The content data to be enclosed.
     * @param {(AlgorithmIdentifier|string)} encryptionAlgorithm The encryption algorithm or provider name
     * @returns {Promise} Promise to return self object after encrypt content
     */
    encloseContent: function (contentInfo, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Check content info
            contentInfo = checkContentInfo(contentInfo);
            if (!contentInfo.content)
                throw new Error('Content for encryption must be specified');
            // Define encryption algorithm
            if (encryptionAlgorithm) {
                var provider = providers[encryptionAlgorithm];
                encryptionAlgorithm = (provider && provider.encryption) || encryptionAlgorithm;
            } else
                encryptionAlgorithm = providers[options.providerName].encryption;
            // Generate key for encryption content
            return subtle.generateKey(encryptionAlgorithm, true, ['encrypt']);
        }).then(function (encryptionKey) {
            // Encrypt content
            self.contentEncryptionKey = encryptionKey;
            // Initial vector
            if (!encryptionAlgorithm.iv)
                encryptionAlgorithm.iv = getSeed(8);
            return subtle.encrypt(encryptionAlgorithm, encryptionKey, contentInfo.content);
        }).then(function (encryptedContent) {
            self.encryptedContentInfo = {
                contentType: contentInfo.contentType,
                contentEncryptionAlgorithm: encryptionAlgorithm,
                encryptedContent: encryptedContent
            };
            return self;
        });
    }, // </editor-fold>
    /**
     * Add a recipient. <br><br>
     *
     * Uses the Recipient Information with IssuerAndSerialNumber as the Recipient Identifier.
     * Note: If senderCert specified uses the Key Agreement algorithm overwise Key Transport algorithm.
     *
     * @memberOf GostCMS.EnvelopedDataContentInfo
     * @instance
     * @param {GostCert.X509} recipientCert The certificate of recepient
     * @param {(AlgorithmIdentifier|string)} keyEncryptionAlgorithm Key encryption algorithm or provider name
     * @param {GostASN1.PrivateKeyInfo} senderKey The private key of sender for key agreement protocol
     * @param {GostCert.X509} senderCert The certificate of sender for key agreement protocol
     * @returns {Promise} Promise to return self object after add recipient
     */
    addRecipient: function (recipientCert, keyEncryptionAlgorithm, senderKey, senderCert) // <editor-fold defaultstate="collapsed">
    {
        var self = this, privateKey, encryptionProvider, derivation, wrapping;
        return new Promise(call).then(function () {
            // Check for recepient cert
            recipientCert = new cert.X509(recipientCert);
            if (keyEncryptionAlgorithm && typeof keyEncryptionAlgorithm !== 'string' &&
              !keyEncryptionAlgorithm.algorithm) {
                // Sender parameters
                senderCert = senderKey;
                senderKey = keyEncryptionAlgorithm;
                keyEncryptionAlgorithm = undefined;
            }
            if (keyEncryptionAlgorithm) {
                encryptionProvider = providers[keyEncryptionAlgorithm];
            } else
                encryptionProvider = recipientCert.getProvider();

            // Check for content encryption key
            if (!self.contentEncryptionKey)
                throw new Error('The content encryption key is not assigned');

            if (senderCert) {
                // Sender certificate for agreement protocol
                var senderCertChain;
                if (senderCert instanceof Array) {
                    senderCertChain = senderCert;
                    senderCert = senderCertChain[0];
                } else
                    senderCertChain = [senderCert];

                // Add sender certificate
                if (options.autoAddCert) {
                    if (!self.originatorInfo)
                        self.originatorInfo = { certs: [] };
                    else if (!self.originatorInfo.certs)
                        self.originatorInfo.certs = [];
                    for (var i = 0, n = senderCertChain.length; i < n; i++) {
                        addUnique(self.originatorInfo.certs, senderCertChain[i], function (cert1, cert2) {
                            return equalNames(cert1.issuer, cert2.issuer) &&
                              equalNumbers(cert1.serialNumber, cert2.serialNumber);
                        });
                    }
                }
                // Key Agreement
                if (encryptionProvider)
                    keyEncryptionAlgorithm = expand(encryptionProvider.agreement);
                else
                    encryptionProvider = recipientCert.getProvider();
                // Certificates must have similar curve parameters
                if (recipientCert.subjectPublicKeyInfo.algorithm.namedCurve !==
                  senderCert.subjectPublicKeyInfo.algorithm.namedCurve)
                    throw new Error('The sender and the recipient have different public key algorithms');
                // Get private sender key
                return subtle.importKey('pkcs8', senderKey.encode(), senderKey.privateKeyAlgorithm,
                  false, ['deriveKey']);
            } else {
                // Key Transport
                if (encryptionProvider)
                    keyEncryptionAlgorithm = expand(recipientCert.subjectPublicKeyInfo.algorithm);
                else
                    encryptionProvider = recipientCert.getProvider();
                // Generate key pair
                return subtle.generateKey(keyEncryptionAlgorithm, true, ['deriveKey']).then(function (keyPair) {
                    keyEncryptionAlgorithm['public'] = keyPair.publicKey;
                    return keyPair.privateKey;
                });
            }
        }).then(function (key) {
            privateKey = key;
            // Get public key from recipient certificate
            return subtle.importKey('spki', recipientCert.subjectPublicKeyInfo.encode(),
              recipientCert.subjectPublicKeyInfo.algorithm, false, ['deriveKey', 'deriveBits']);
        }).then(function (publicKey) {
            // Derivate key encryption key
            keyEncryptionAlgorithm.ukm = getSeed(8);
            derivation = expand(encryptionProvider.agreement,
              { sBox: keyEncryptionAlgorithm.sBox, ukm: keyEncryptionAlgorithm.ukm, 'public': publicKey });
            wrapping = expand(keyEncryptionAlgorithm.wrapping || encryptionProvider.wrapping,
              { ukm: keyEncryptionAlgorithm.ukm });
            return subtle.deriveKey(derivation, privateKey, wrapping, true, ['wrapKey']);
        }).then(function (wrappingKey) {
            // Wrap content encryption key
            keyEncryptionAlgorithm.wrapping = wrapping;
            return subtle.wrapKey('raw', self.contentEncryptionKey, wrappingKey, wrapping);
        }).then(function (wrappedKey) {
            // Create recipient info
            var recipientInfo;
            var useKeyIdentifier = options.useKeyIdentifier && recipientCert.extensions &&
              recipientCert.extensions.subjectKeyIdentifier,
              rid = useKeyIdentifier ? recipientCert.extensions.subjectKeyIdentifier : {
                  issuer: recipientCert.issuer,
                  serialNumber: recipientCert.serialNumber
              };
            if (senderCert) {
                var spki = senderCert.subjectPublicKeyInfo;
                recipientInfo = {// KeyAgreeRecipientInfo
                    version: 3, // always set to 3
                    originator: {
                        algorithm: spki.algorithm,
                        publicKey: spki.subjectPublicKey
                    },
                    ukm: keyEncryptionAlgorithm.ukm,
                    keyEncryptionAlgorithm: keyEncryptionAlgorithm,
                    recipientEncryptedKeys: [{// use only one recipient in domain
                        rid: rid,
                        encryptedKey: asn1.GostEncryptedKey(keyEncryptionAlgorithm).encode(wrappedKey)
                    }]
                };
            } else {
                recipientInfo = {
                    version: 0, // always set to 0 or 2
                    rid: rid,
                    keyEncryptionAlgorithm: keyEncryptionAlgorithm,
                    encryptedKey: asn1.GostEncryptedKey(keyEncryptionAlgorithm).encode({
                        algorithm: keyEncryptionAlgorithm,
                        sessionEncryptedKey: wrappedKey
                    })
                };
            }
            self.recipientInfos.push(recipientInfo);
            return self;
        });
    }, // </editor-fold>
    /**
     * Returns the decrypted content.
     *
     * @memberOf GostCMS.EnvelopedDataContentInfo
     * @instance
     * @param {GostASN1.PrivateKeyInfo} recipientKey The decryption key or password for derive key
     * @param {GostCert.X509} recipientCert  The decryption key or password for derive key
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo The detached content (optional).
     * @param {GostCert.X509} originatorCert The originator certificate (optional).
     * @returns {Promise} Promise to return enclosed object {@ling GostASN1.ContentInfo} after decrypt content
     */
    getEnclosed: function (recipientKey, recipientCert, contentInfo, originatorCert) // <editor-fold defaultstate="collapsed">
    {
        var self = this, wrappedKey, encryptedContent, derivation, wrapping, encryption;
        return new Promise(call).then(function () {
            var encryptionProvider = recipientCert.getProvider();
            // Append attached
            if (contentInfo)
                self.setEnclosed(contentInfo);
            encryptedContent = self.encryptedContentInfo.encryptedContent;
            if (!encryptedContent)
                throw new Error('Encrypted content must be specified');

            encryption = self.encryptedContentInfo.contentEncryptionAlgorithm;

            // Find receiver
            for (var i = 0; i < self.recipientInfos.length; i++) {
                var recipientInfo = self.recipientInfos[i],
                  algorithm = expand(recipientInfo.keyEncryptionAlgorithm);
                if (recipientInfo.rid) {
                    if (matchCert(recipientInfo.rid, recipientCert)) {
                        // Algorithm and wrapped key
                        var transportKey = asn1.GostEncryptedKey(algorithm).decode(recipientInfo.encryptedKey).object;
                        wrappedKey = transportKey.sessionEncryptedKey;
                        algorithm = expand(algorithm, transportKey.algorithm);
                        derivation = expand(encryptionProvider.agreement, {
                            ukm: algorithm.ukm,
                            sBox: algorithm.sBox
                        });
                        wrapping = expand(encryptionProvider.wrapping, algorithm.wrapping, { ukm: algorithm.ukm });
                        return algorithm['public'];
                    }
                } else {
                    var keys = recipientInfo.recipientEncryptedKeys;
                    if (keys) {
                        for (var j = 0; j < keys.length; j++) {
                            if (matchCert(keys[j].rid, recipientCert)) {
                                // Algorithm and wrapped key
                                algorithm = expand(encryptionProvider.agreement, algorithm, { ukm: recipientInfo.ukm });
                                wrappedKey = asn1.GostEncryptedKey(algorithm).decode(keys[j].encryptedKey).object;
                                derivation = algorithm;
                                wrapping = expand(algorithm.wrapping || encryptionProvider.wrapping, { ukm: recipientInfo.ukm });
                                // Check originator
                                var originator = recipientInfo.originator;
                                if (originator.algorithm) {
                                    var spki = new asn1.SubjectPublicKeyInfo({
                                        algorithm: originator.algorithm,
                                        subjectPublicKey: originator.publicKey
                                    });
                                    return subtle.importKey('spki', spki.encode(), spki.algorithm, false, ['deriveKey', 'deriveBits']);
                                } else if (originatorCert && matchCert(originator, originatorCert))
                                    return importKey('pkcs', originatorCert.subjectPublicKeyInfo.encode(),
                                      originatorCert.subjectPublicKeyInfo.algorithm, false, ['deriveKey', 'deriveBits']);
                                else
                                    throw Error('Originator certificate not specified or not valid');
                            }
                        }
                    }
                }
            }
            throw new Error('Recipient not found or format not supported');
        }).then(function (publicKey) {
            derivation['public'] = publicKey;
            // Import private key
            return subtle.importKey('pkcs8', recipientKey.encode(), recipientKey.privateKeyAlgorithm,
              false, ['deriveKey', 'deriveBits']);
        }).then(function (privateKey) {
            // Derive key
            return subtle.deriveKey(derivation, privateKey, wrapping, true, ['unwrapKey']);
        }).then(function (unwrappingKey) {
            // Unwrap key
            return subtle.unwrapKey('raw', wrappedKey, unwrappingKey,
              wrapping, encryption, false, ['decrypt']);
        }).then(function (encryptionKey) {
            // Decrypt content
            return subtle.decrypt(encryption, encryptionKey, encryptedContent);
        }).then(function (decryptedContent) {
            return createContentInfo({
                contentType: self.encryptedContentInfo.contentType,
                content: decryptedContent
            });
        });
    } // </editor-fold>
});

/**
 * This class encapsulates a CMS object of content type enveloped-data.
 *
 * @memberOf GostCMS
 * @type GostCMS.EnvelopedDataContentInfo
 */
GostCMS.prototype.EnvelopedDataContentInfo = EnvelopedDataContentInfo;

export const gostCMSInstance = new GostCMS();
