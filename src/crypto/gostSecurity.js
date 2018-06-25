/**
 * @file GOST and common ASN.1 Object and Algorithm Identifiers
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

// <editor-fold defaultstate="collapsed">
// Expand javascript object
function expand() {
    var r = {};
    for (var i = 0, n = arguments.length; i < n; i++) {
        var item = arguments[i];
        if (typeof item === 'object')
            for (var name in item)
                r[name] = item[name];
    }
    return r;
}

// </editor-fold>

/**
 * Freandly names for ASN.1 Object Identifiers
 *
 * @field names
 * @memberOf GostSecurity
 */ // <editor-fold defaultstate="collapsed">
var names = {
    // CryptoPro algoritms
    '1.2.643.2.2': 'CryptoPro',
    '1.2.643.2.2.3': 'id-GostR3411-94-with-GostR3410-2001',
    '1.2.643.2.2.4': 'id-GostR3411-94-with-GostR3410-94',
    '1.2.643.2.2.9': 'id-GostR3411-94',
    '1.2.643.2.2.10': 'id-HMACGostR3411-94',
    '1.2.643.2.2.13.0': 'id-Gost28147-89-None-KeyWrap',
    '1.2.643.2.2.13.1': 'id-Gost28147-89-CryptoPro-KeyWrap',
    '1.2.643.2.2.14.0': 'id-Gost28147-89-None-KeyMeshing',
    '1.2.643.2.2.14.1': 'id-Gost28147-89-CryptoPro-KeyMeshing',
    '1.2.643.2.2.19': 'id-GostR3410-2001',
    '1.2.643.2.2.20': 'id-GostR3410-94',
    '1.2.643.2.2.20.1': 'id-GostR3410-94-a',
    '1.2.643.2.2.20.2': 'id-GostR3410-94-aBis',
    '1.2.643.2.2.20.3': 'id-GostR3410-94-b',
    '1.2.643.2.2.20.4': 'id-GostR3410-94-bBis',
    '1.2.643.2.2.21': 'id-Gost28147-89',
    '1.2.643.2.2.22': 'id-Gost28147-89-MAC',
    '1.2.643.2.2.30.0': 'id-GostR3411-94-TestParamSet',
    '1.2.643.2.2.30.1': 'id-GostR3411-94-CryptoProParamSet',
    '1.2.643.2.2.30.2': 'id-GostR3411-94-CryptoPro-B-ParamSet',
    '1.2.643.2.2.30.3': 'id-GostR3411-94-CryptoPro-C-ParamSet',
    '1.2.643.2.2.30.4': 'id-GostR3411-94-CryptoPro-D-ParamSet',
    '1.2.643.2.2.31.0': 'id-Gost28147-89-TestParamSet',
    '1.2.643.2.2.31.1': 'id-Gost28147-89-CryptoPro-A-ParamSet',
    '1.2.643.2.2.31.2': 'id-Gost28147-89-CryptoPro-B-ParamSet',
    '1.2.643.2.2.31.3': 'id-Gost28147-89-CryptoPro-C-ParamSet',
    '1.2.643.2.2.31.4': 'id-Gost28147-89-CryptoPro-D-ParamSet',
    '1.2.643.2.2.31.5': 'id-Gost28147-89-CryptoPro-Oscar-1-1-ParamSet',
    '1.2.643.2.2.31.6': 'id-Gost28147-89-CryptoPro-Oscar-1-0-ParamSet',
    '1.2.643.2.2.31.7': 'id-Gost28147-89-CryptoPro-RIC-1-ParamSet ',
    '1.2.643.2.2.31.12': 'id-Gost28147-89-CryptoPro-tc26-1',
    '1.2.643.2.2.31.13': 'id-Gost28147-89-CryptoPro-tc26-2',
    '1.2.643.2.2.31.14': 'id-Gost28147-89-CryptoPro-tc26-3',
    '1.2.643.2.2.31.15': 'id-Gost28147-89-CryptoPro-tc26-4',
    '1.2.643.2.2.31.16': 'id-Gost28147-89-CryptoPro-tc26-5',
    '1.2.643.2.2.31.17': 'id-Gost28147-89-CryptoPro-tc26-6',
    '1.2.643.2.2.32.0': 'id-GostR3410-94-TestParamSet',
    '1.2.643.2.2.32.2': 'id-GostR3410-94-CryptoPro-A-ParamSet',
    '1.2.643.2.2.32.3': 'id-GostR3410-94-CryptoPro-B-ParamSet',
    '1.2.643.2.2.32.4': 'id-GostR3410-94-CryptoPro-C-ParamSet',
    '1.2.643.2.2.32.5': 'id-GostR3410-94-CryptoPro-D-ParamSet',
    '1.2.643.2.2.33.1': 'id-GostR3410-94-CryptoPro-XchA-ParamSet',
    '1.2.643.2.2.33.2': 'id-GostR3410-94-CryptoPro-XchB-ParamSet',
    '1.2.643.2.2.33.3': 'id-GostR3410-94-CryptoPro-XchC-ParamSet',
    // Certificate center attributes
    '1.2.643.2.2.34.2': 'temporaryAccessToRC',
    '1.2.643.2.2.34.3': 'internetContentSignature',
    '1.2.643.2.2.34.4': 'adminRC',
    '1.2.643.2.2.34.5': 'operatorRC',
    '1.2.643.2.2.34.6': 'userRC',
    '1.2.643.2.2.34.7': 'clientRC',
    '1.2.643.2.2.34.8': 'serverRC',
    '1.2.643.2.2.34.9': 'sysAdminRC',
    '1.2.643.2.2.34.10': 'arcAdminRC',
    '1.2.643.2.2.34.11': 'authorityPersonRC',
    '1.2.643.2.2.34.12': 'clientCC',
    '1.2.643.2.2.34.13': 'sysAdminCC',
    '1.2.643.2.2.34.14': 'arcAdminCC',
    '1.2.643.2.2.34.15': 'accessIPSecCA',
    '1.2.643.2.2.34.16': 'auditAdminHSM',
    '1.2.643.2.2.34.21': 'adminHSM',
    '1.2.643.2.2.34.22': 'serverAdminHSH',
    '1.2.643.2.2.34.24': 'winlogonCA',
    '1.2.643.2.2.34.25': 'timestampServiceUser',
    '1.2.643.2.2.34.26': 'statusServiceUser',
    '1.2.643.2.2.34.27': 'arcAdminHSM',
    '1.2.643.2.2.34.28': 'auditorHSM',
    // CryptoPro algoritms
    '1.2.643.2.2.35.0': 'id-GostR3410-2001-CryptoPro-TestParamSet',
    '1.2.643.2.2.35.1': 'id-GostR3410-2001-CryptoPro-A-ParamSet',
    '1.2.643.2.2.35.2': 'id-GostR3410-2001-CryptoPro-B-ParamSet',
    '1.2.643.2.2.35.3': 'id-GostR3410-2001-CryptoPro-C-ParamSet',
    '1.2.643.2.2.36.0': 'id-GostR3410-2001-CryptoPro-XchA-ParamSet',
    '1.2.643.2.2.36.1': 'id-GostR3410-2001-CryptoPro-XchB-ParamSet',
    "1.2.643.2.2.37.1": 'id-CryptoPro-GostPrivateKeys-V1',
    "1.2.643.2.2.37.2": 'id-CryptoPro-GostPrivateKeys-V2',
    "1.2.643.2.2.37.2.1": 'id-CryptoPro-GostPrivateKeys-V2-Full',
    "1.2.643.2.2.37.2.2": 'id-CryptoPro-GostPrivateKeys-V2-PartOf',
    '1.2.643.2.2.37.3.1': 'intermediateCertificates',
    '1.2.643.2.2.37.3.2': 'trustedCertificatesSignature',
    '1.2.643.2.2.37.3.3': 'trustedCertificatesExchange',
    '1.2.643.2.2.37.3.10': 'keyValidity',
    '1.2.643.2.2.38.1': 'personalBaseProlicy',
    '1.2.643.2.2.38.2': 'networkBasePolicy',
    '1.2.643.2.2.47.1': 'id-CryptoPro-ocsp-treats-exp-key-or-exp-cert-rev',
    '1.2.643.2.2.47.2': 'id-CryptoPro-ocsp-crl-locator',
    '1.2.643.2.2.47.3': 'id-CryptoPro-ocsp-instant-revocation-indicator',
    '1.2.643.2.2.47.4': 'id-CryptoPro-ocsp-revocation-announcement-reference',
    '1.2.643.2.2.47.5': 'id-CryptoPro-ocsp-historical-request',
    '1.2.643.2.2.49.2': 'limitedLicense',
    '1.2.643.2.2.96': 'id-GostR3410-2001-CryptoPro-ESDH',
    '1.2.643.2.2.97': 'id-GostR3410-94-CryptoPro-ESDH',
    '1.2.643.2.2.98': 'id-GostR3410-2001DH',
    '1.2.643.2.2.99': 'id-GostR3410-94DH',
    // signature attributes
    '1.2.643.2.45.1.1.1': 'signatureComment',
    '1.2.643.2.45.1.1.2': 'resourceName',
    '1.2.643.2.45.1.1.3': 'signatureUsage',
    // params
    '1.2.643.3.131.1.1': 'INN',
    '1.2.643.3.141.1.1': 'RNS FSS',
    '1.2.643.3.141.1.2': 'KP FSS',
    // tc26
    '1.2.643.7.1': 'tc26',
    '1.2.643.7.1.1.1.1': 'id-tc26-gost3410-12-256',
    '1.2.643.7.1.1.1.2': 'id-tc26-gost3410-12-512',
    '1.2.643.7.1.1.2.1': 'id-tc26-gost3411-94',
    '1.2.643.7.1.1.2.2': 'id-tc26-gost3411-12-256',
    '1.2.643.7.1.1.2.3': 'id-tc26-gost3411-12-512',
    '1.2.643.7.1.1.3.1': 'id-tc26-signwithdigest-gost3410-12-94',
    '1.2.643.7.1.1.3.2': 'id-tc26-signwithdigest-gost3410-12-256',
    '1.2.643.7.1.1.3.3': 'id-tc26-signwithdigest-gost3410-12-512',
    '1.2.643.7.1.1.4.1': 'id-tc26-hmac-gost-3411-12-256',
    '1.2.643.7.1.1.4.2': 'id-tc26-hmac-gost-3411-12-512',
    '1.2.643.7.1.1.6.1': 'id-tc26-agreement-gost-3410-12-256',
    '1.2.643.7.1.1.6.2': 'id-tc26-agreement-gost-3410-12-512',
    '1.2.643.7.1.2.1.1.0': 'id-tc26-gost-3410-12-256-paramSetTest',
    '1.2.643.7.1.2.1.1.1': 'id-tc26-gost-3410-12-256-paramSetA',
    '1.2.643.7.1.2.1.1.2': 'id-tc26-gost-3410-12-256-paramSetB',
    '1.2.643.7.1.2.1.2.0': 'id-tc26-gost-3410-12-512-paramSetTest',
    '1.2.643.7.1.2.1.2.1': 'id-tc26-gost-3410-12-512-paramSetA',
    '1.2.643.7.1.2.1.2.2': 'id-tc26-gost-3410-12-512-paramSetB',
    '1.2.643.7.1.2.1.2.3': 'id-tc26-gost-3410-12-512-paramSetC',
    '1.2.643.7.1.2.1.2.4': 'id-tc26-gost-3410-12-512-paramSetD',
    '1.2.643.7.1.2.5.1.1': 'id-tc26-gost-28147-param-Z',
    // GOST Parameters
    '1.2.643.100.1': 'OGRN',
    '1.2.643.100.2.1': 'SMEV-person',
    '1.2.643.100.2.2': 'SMEV-government',
    '1.2.643.100.3': 'SNILS',
    '1.2.643.100.4': 'KPP',
    '1.2.643.100.5': 'OGRNIP',
    '1.2.643.100.6': 'internal-government',
    '1.2.643.100.111': 'subjectSignTool',
    '1.2.643.100.112': 'issuerSignTool',
    '1.2.643.100.113.1': 'signToolClassKC1',
    '1.2.643.100.113.2': 'signToolClassKC2',
    '1.2.643.100.113.3': 'signToolClassKC3',
    '1.2.643.100.113.4': 'signToolClassKB1',
    '1.2.643.100.113.5': 'signToolClassKB2',
    '1.2.643.100.113.6': 'signToolClassKA1',
    '1.2.643.100.114.1': 'issuerToolClassKC1',
    '1.2.643.100.114.2': 'issuerToolClassKC2',
    '1.2.643.100.114.3': 'issuerToolClassKC3',
    '1.2.643.100.114.4': 'issuerToolClassKB2',
    '1.2.643.100.114.5': 'issuerToolClassKB1',
    '1.2.643.100.114.6': 'issuerToolClassKA1',
    // Common algorithms
    '1.2.840.10040.4': 'x9cm',
    '1.2.840.10040.4.1': 'dsa',
    '1.2.840.10040.4.3': 'dsa-with-SHA1',
    '1.2.840.10045': 'ansi-x962',
    '1.2.840.10045.1': 'id-fieldType',
    '1.2.840.10045.1.1': 'id-prime-Field',
    '1.2.840.10045.1.2': 'id-characteristic-two-field',
    '1.2.840.10045.2.1': 'ecPublicKey',
    '1.2.840.10045.3.0': 'characteristicTwo',
    '1.2.840.10045.3.1.1': 'secp192r1',
    '1.2.840.10045.3.1.2': 'prime192v2',
    '1.2.840.10045.3.1.3': 'prime192v3',
    '1.2.840.10045.3.1.4': 'prime239v1',
    '1.2.840.10045.3.1.5': 'prime239v2',
    '1.2.840.10045.3.1.6': 'prime239v3',
    '1.2.840.10045.3.1.7': 'secp256r1',
    '1.2.840.10045.4': 'ecdsa',
    '1.2.840.10045.4.1': 'ecdsa-with-SHA1',
    '1.2.840.10045.4.2': 'ecdsa-with-Recommended',
    '1.2.840.10045.4.4': 'ecdsa-with-SHA2',
    '1.2.840.10045.4.4.1': 'ecdsa-with-SHA224',
    '1.2.840.10045.4.4.2': 'ecdsa-with-SHA256',
    '1.2.840.10045.4.4.3': 'ecdsa-with-SHA384',
    '1.2.840.10045.4.4.4': 'ecdsa-with-SHA512',
    '1.2.840.113533.7.66.13': 'PasswordBasedMac',
    '1.3.6.1.4.1.22554.1.1.2.1.2': 'pbeWithSHAAndAES128-CBC',
    '1.3.6.1.4.1.22554.1.1.2.1.22': 'pbeWithSHAAndAES192-CBC',
    '1.3.6.1.4.1.22554.1.1.2.1.42': 'pbeWithSHAAndAES256-CBC',
    '1.3.6.1.4.1.22554.1.2.1.2.1.2': 'pbeWithSHA256AndAES128-CBC',
    '1.3.6.1.4.1.22554.1.2.1.2.1.22': 'pbeWithSHA256AndAES192-CBC',
    '1.3.6.1.4.1.22554.1.2.1.2.1.42': 'pbeWithSHA256AndAES256-CBC',
    //  Diffie-Hellman Key Exchange Keys
    '1.2.840.113549': 'rsa',
    '1.2.840.113549.1.1.1': 'rsaEncryption',
    '1.2.840.113549.1.1.2': 'md2withRSAEncryption',
    '1.2.840.113549.1.1.3': 'md4withRSAEncryption',
    '1.2.840.113549.1.1.4': 'md5withRSAEncryption',
    '1.2.840.113549.1.1.5': 'sha1withRSAEncryption',
    '1.2.840.113549.1.1.7': 'rsaes-oaep',
    '1.2.840.113549.1.1.8': 'mgf1',
    '1.2.840.113549.1.1.9': 'pSpecified',
    '1.2.840.113549.1.1.10': 'rsassa-pss',
    '1.2.840.113549.1.1.11': 'sha256withRSAEncryption',
    '1.2.840.113549.1.1.12': 'sha384withRSAEncryption',
    '1.2.840.113549.1.1.13': 'sha512withRSAEncryption',
    '1.2.840.113549.1.2.7': 'hmacWithSHA1',
    '1.2.840.113549.1.2.8': 'hmacWithSHA224',
    '1.2.840.113549.1.2.9': 'hmacWithSHA256',
    '1.2.840.113549.1.2.10': 'hmacWithSHA384',
    '1.2.840.113549.1.2.11': 'hmacWithSHA512',
    '1.2.840.113549.1.3.1': 'dhKeyAgreement',
    // pkcs#7 content types
    '1.2.840.113549.1.5.12': 'PBKDF2',
    '1.2.840.113549.1.5.13': 'PBES2',
    '1.2.840.113549.1.5.14': 'PBMAC1',
    '1.2.840.113549.1.7.1': 'data',
    '1.2.840.113549.1.7.2': 'signedData',
    '1.2.840.113549.1.7.3': 'envelopedData',
    '1.2.840.113549.1.7.4': 'signedAndEnvelopedData',
    '1.2.840.113549.1.7.5': 'digestedData',
    '1.2.840.113549.1.7.6': 'encryptedData',
    '1.2.840.113549.1.9.1': 'emailAddress',
    '1.2.840.113549.1.9.2': 'unstructuredName',
    '1.2.840.113549.1.9.3': 'contentType',
    '1.2.840.113549.1.9.4': 'messageDigest',
    '1.2.840.113549.1.9.5': 'signingTime',
    '1.2.840.113549.1.9.6': 'countersignature',
    '1.2.840.113549.1.9.7': 'challengePassword',
    '1.2.840.113549.1.9.8': 'unstructuredAddress',
    '1.2.840.113549.1.9.9': 'extendedCertificateAttributes',
    '1.2.840.113549.1.9.10': 'issuerAndSerialNumber',
    '1.2.840.113549.1.9.11': 'passwordCheck',
    '1.2.840.113549.1.9.12': 'publicKey',
    '1.2.840.113549.1.9.13': 'signingDescription',
    '1.2.840.113549.1.9.14': 'extensionRequest',
    '1.2.840.113549.1.9.15': 'sMimeCapabilities',
    '1.2.840.113549.1.9.16': 'sMimeObjectIdentifierRegistry',
    '1.2.840.113549.1.9.16.1.2': 'authData',
    '1.2.840.113549.1.9.16.1.4 ': 'timestampToken',
    '1.2.840.113549.1.9.16.1.17 ': 'firmwareLoadReceipt',
    '1.2.840.113549.1.9.16.1.21': 'encKeyWithID',
    '1.2.840.113549.1.9.16.1.23': 'authEnvelopedData',
    '1.2.840.113549.1.9.16.2': 'sMimeAttributes',
    '1.2.840.113549.1.9.16.2.1': 'receiptRequest',
    '1.2.840.113549.1.9.16.2.12': 'signingCertificate',
    '1.2.840.113549.1.9.16.2.14': 'timeStampToken',
    '1.2.840.113549.1.9.16.2.2': 'securityLabel',
    '1.2.840.113549.1.9.16.2.3': 'mlExpansionHistory',
    '1.2.840.113549.1.9.16.2.34': 'unsignedData',
    '1.2.840.113549.1.9.16.2.47': 'signingCertificateV2',
    '1.2.840.113549.1.9.16.3.5': 'ESDH',
    // pkcs#9 oids
    '1.2.840.113549.1.9.20': 'friendlyName',
    '1.2.840.113549.1.9.21': 'localKeyId',
    '1.2.840.113549.1.9.22': 'certTypes',
    '1.2.840.113549.1.9.22.1': 'x509Certificate',
    '1.2.840.113549.1.9.22.2': 'sdsiCertificate',
    '1.2.840.113549.1.9.23': 'crlTypes',
    '1.2.840.113549.1.9.23.1': 'x509CRL',
    '1.2.840.113549.1.9.24': 'secretTypes',
    '1.2.840.113549.1.9.24.1': 'secret',
    '1.2.840.113549.1.9.25.1': 'pkcs15Token',
    '1.2.840.113549.1.9.25.2': 'encryptedPrivateKeyInfo',
    '1.2.840.113549.1.9.25.3': 'randomNonce',
    '1.2.840.113549.1.9.25.4': 'sequenceNumber',
    '1.2.840.113549.1.9.25.5': 'pkcs7PDU',
    '1.2.840.113549.1.9.26.1': 'pkcs9String',
    '1.2.840.113549.1.9.26.2': 'signingTimeString',
    '1.2.840.113549.1.9.27.1': 'caseIgnoreMatch',
    '1.2.840.113549.1.9.27.2': 'signingTimeMatch',
    // password-based-encryption for pkcs#12
    '1.2.840.113549.1.12.0.1': 'pkcs-12',
    '1.2.840.113549.1.12.1': 'pbe',
    '1.2.840.113549.1.12.1.1': 'pbeWithSHAAnd128BitRC4',
    '1.2.840.113549.1.12.1.2': 'pbeWithSHAAnd40BitRC4',
    '1.2.840.113549.1.12.1.3': 'pbeWithSHAAnd3-KeyTripleDES-CBC',
    '1.2.840.113549.1.12.1.4': 'pbeWithSHAAnd2-KeyTripleDES-CBC',
    '1.2.840.113549.1.12.1.5': 'pbeWithSHAAnd128BitRC2-CBC',
    '1.2.840.113549.1.12.1.6': 'pbeWithSHAAnd40BitRC2-CBC',
    '1.2.840.113549.1.12.1.80': 'pbeUnknownGost',
    '1.2.840.113549.1.12.2.1': 'pkcs8-key-shrouding',
    '1.2.840.113549.1.12.3.1': 'keyBagId',
    '1.2.840.113549.1.12.3.2': 'certAndCRLBagId',
    '1.2.840.113549.1.12.3.3': 'secretBagId',
    '1.2.840.113549.1.12.3.4': 'safeContentsId',
    '1.2.840.113549.1.12.3.5': 'pkcs-8ShroudedKeyBagId',
    '1.2.840.113549.1.12.4.1': 'x509CertCRLBagId',
    '1.2.840.113549.1.12.4.2': 'pkcs-12-SDSICertBag',
    // pkcs#12 safe bags
    '1.2.840.113549.1.12.10.1.1': 'keyBag',
    '1.2.840.113549.1.12.10.1.2': 'pkcs8ShroudedKeyBag',
    '1.2.840.113549.1.12.10.1.3': 'certBag',
    '1.2.840.113549.1.12.10.1.4': 'crlBag',
    '1.2.840.113549.1.12.10.1.5': 'secretBag',
    '1.2.840.113549.1.12.10.1.6': 'safeContentsBag',
    // hash algorithm
    '1.2.840.113549.2.5': 'md-5',
    // symmetric key algorithm oids
    '1.2.840.113549.3.7': 'des-EDE3-CBC',
    // additional algorithms
    '1.3.132.0.34': 'secp384r1',
    '1.3.132.0.35': 'secp521r1',
    '1.3.132.112': 'ecDH',
    '1.3.14.3.2.26': 'sha1',
    '1.3.6.1.4.1.311.2.1.14': 'msCertExtensions',
    '1.3.6.1.4.1.311.17.1': 'keyProviderNameAttr',
    '1.3.6.1.4.1.311.17.2': 'localMachineKeyset',
    '1.3.6.1.4.1.311.17.3.20': 'certKeyIdentifierPropId',
    // SignalCom algorithms
    '1.3.6.1.4.1.5849': 'SignalCom',
    '1.3.6.1.4.1.5849.1.1.1': 'id-sc-gost28147-ecb',
    '1.3.6.1.4.1.5849.1.1.2': 'id-sc-gost28147-gamma',
    '1.3.6.1.4.1.5849.1.1.3': 'id-sc-gost28147-gfb',
    '1.3.6.1.4.1.5849.1.1.4': 'id-sc-gost28147-mac',
    '1.3.6.1.4.1.5849.1.1.5': 'id-sc-gostR3410-94',
    '1.3.6.1.4.1.5849.1.1.6.1.1.1': 'id-sc-gostR3410-94-default',
    '1.3.6.1.4.1.5849.1.1.6.1.1.2': 'id-sc-gostR3410-94-test',
    '1.3.6.1.4.1.5849.1.2.1': 'id-sc-gostR3411-94',
    '1.3.6.1.4.1.5849.1.3.1': 'id-sc-gostR3411-94-with-gostR3410-94',
    '1.3.6.1.4.1.5849.1.3.2': 'id-sc-gostR3411-94-with-gostR3410-2001',
    '1.3.6.1.4.1.5849.1.4.1': 'id-sc-cmsGostWrap',
    '1.3.6.1.4.1.5849.1.4.2': 'id-sc-cmsGost28147Wrap',
    '1.3.6.1.4.1.5849.1.5.1': 'id-sc-pbeWithGost3411AndGost28147',
    '1.3.6.1.4.1.5849.1.5.2': 'id-sc-pbeWithGost3411AndGost28147CFB',
    '1.3.6.1.4.1.5849.1.6.2': 'id-sc-gostR3410-2001',
    '1.3.6.1.4.1.5849.1.7.2': 'id-sc-hmacWithGostR3411',
    '1.3.6.1.4.1.5849.1.8.1': 'id-sc-r3410-ESDH-r3411kdf',
    '1.3.6.1.4.1.5849.1.8.3': 'id-sc-ecdh-singlePass-cofactor-r3411kdf',
    '1.3.6.1.4.1.5849.2.2.1': 'id-sc-gostR3410-2001-publicKey',
    // additinal data
    '1.3.6.1.5.5.7.0.12': 'attribute-cert',
    '1.3.6.1.5.5.7.1.1': 'authorityInfoAccess',
    '1.3.6.1.5.5.7.1.4': 'auditIdentity',
    '1.3.6.1.5.5.7.1.6': 'aaControls',
    '1.3.6.1.5.5.7.1.10': 'ac-proxying',
    '1.3.6.1.5.5.7.1.11': 'subjectInfoAccess',
    '1.3.6.1.5.5.7.3.1': 'serverAuth',
    '1.3.6.1.5.5.7.3.2': 'clientAuth',
    '1.3.6.1.5.5.7.3.3': 'codeSigning',
    '1.3.6.1.5.5.7.3.4': 'emailProtection',
    '1.3.6.1.5.5.7.3.5': 'ipsecEndSystem',
    '1.3.6.1.5.5.7.3.6': 'ipsecTunnel',
    '1.3.6.1.5.5.7.3.7': 'ipsecUser',
    '1.3.6.1.5.5.7.3.8': 'timeStamping',
    '1.3.6.1.5.5.7.3.9': 'OCSPSigning',
    '1.3.6.1.5.5.7.5.1': 'regCtrl',
    '1.3.6.1.5.5.7.5.1.1': 'regToken',
    '1.3.6.1.5.5.7.5.1.2': 'authenticator',
    '1.3.6.1.5.5.7.5.1.3': 'pkiPublicationInfo',
    '1.3.6.1.5.5.7.5.1.4': 'pkiArchiveOptions',
    '1.3.6.1.5.5.7.5.1.5': 'oldCertID',
    '1.3.6.1.5.5.7.5.1.6': 'protocolEncrKey',
    '1.3.6.1.5.5.7.5.2': 'regInfoAttr',
    '1.3.6.1.5.5.7.5.2.1': 'UTF8Pairs',
    '1.3.6.1.5.5.7.5.2.2': 'certReq',
    '1.3.6.1.5.5.7.6.2': 'noSignature',
    '1.3.6.1.5.5.7.7.1': 'statusInfo',
    '1.3.6.1.5.5.7.7.2': 'identification',
    '1.3.6.1.5.5.7.7.3': 'identityProof',
    '1.3.6.1.5.5.7.7.4': 'dataReturn',
    '1.3.6.1.5.5.7.7.5': 'transactionId',
    '1.3.6.1.5.5.7.7.6': 'senderNonce',
    '1.3.6.1.5.5.7.7.7': 'recipientNonce',
    '1.3.6.1.5.5.7.7.8': 'addExtensions',
    '1.3.6.1.5.5.7.7.9': 'encryptedPOP',
    '1.3.6.1.5.5.7.7.10': 'decryptedPOP',
    '1.3.6.1.5.5.7.7.11': 'lraPOPWitness',
    '1.3.6.1.5.5.7.7.15': 'getCert',
    '1.3.6.1.5.5.7.7.16': 'getCRL',
    '1.3.6.1.5.5.7.7.17': 'revokeRequest',
    '1.3.6.1.5.5.7.7.18': 'regInfo',
    '1.3.6.1.5.5.7.7.19': 'responseInfo',
    '1.3.6.1.5.5.7.7.21': 'queryPending',
    '1.3.6.1.5.5.7.7.22': 'popLinkRandom',
    '1.3.6.1.5.5.7.7.23': 'popLinkWitness',
    '1.3.6.1.5.5.7.7.24': 'confirmCertAcceptance',
    '1.3.6.1.5.5.7.7.25': 'statusInfoV2',
    '1.3.6.1.5.5.7.7.26': 'trustedAnchors',
    '1.3.6.1.5.5.7.7.27': 'authPublish',
    '1.3.6.1.5.5.7.7.28': 'batchRequests',
    '1.3.6.1.5.5.7.7.29': 'batchResponses',
    '1.3.6.1.5.5.7.7.30': 'publishCert',
    '1.3.6.1.5.5.7.7.31': 'modCertTemplate',
    '1.3.6.1.5.5.7.7.32': 'controlProcessed',
    '1.3.6.1.5.5.7.7.33': 'popLinkWitnessV2',
    '1.3.6.1.5.5.7.7.34': 'identityProofV2',
    '1.3.6.1.5.5.7.9.1': 'dateOfBirth',
    '1.3.6.1.5.5.7.9.2': 'placeOfBirth',
    '1.3.6.1.5.5.7.9.3': 'gender',
    '1.3.6.1.5.5.7.9.4': 'countryOfCitizenship',
    '1.3.6.1.5.5.7.9.5': 'countryOfResidence',
    '1.3.6.1.5.5.7.10.1': 'authenticationInfo',
    '1.3.6.1.5.5.7.10.2': 'accessIdentity',
    '1.3.6.1.5.5.7.10.3': 'chargingIdentity',
    '1.3.6.1.5.5.7.10.4': 'group',
    '1.3.6.1.5.5.7.10.6': 'encAttrs',
    '1.3.6.1.5.5.7.12.2': 'PKIData',
    '1.3.6.1.5.5.7.12.3': 'PKIResponse',
    '1.3.6.1.5.5.7.48.1.1': 'ocsp-basic',
    '1.3.6.1.5.5.7.48.1.2': 'ocsp-nonce',
    '1.3.6.1.5.5.7.48.1.3': 'ocsp-crl',
    '1.3.6.1.5.5.7.48.1.4': 'ocsp-response',
    '1.3.6.1.5.5.7.48.1.5': 'ocsp-nocheck',
    '1.3.6.1.5.5.7.48.1.6': 'ocsp-archive-cutoff',
    '1.3.6.1.5.5.7.48.1.7': 'ocsp-service-locator',
    // Key packages
    '2.16.840.1.101.2.1.2.78.2': 'encryptedKeyPkg',
    '2.16.840.1.101.2.1.2.78.3': 'keyPackageReceipt',
    '2.16.840.1.101.2.1.2.78.5': 'aKeyPackage',
    '2.16.840.1.101.2.1.2.78.6': 'keyPackageError',
    // symmetric key algorithm oids
    '2.16.840.1.101.3.4': 'nistAlgorithms',
    '2.16.840.1.101.3.4.1': 'aes',
    '2.16.840.1.101.3.4.1.1': 'aes128-ECB',
    '2.16.840.1.101.3.4.1.2': 'aes128-CBC',
    '2.16.840.1.101.3.4.1.3': 'aes128-OFB',
    '2.16.840.1.101.3.4.1.4': 'aes128-CFB',
    '2.16.840.1.101.3.4.1.5': 'aes128-wrap',
    '2.16.840.1.101.3.4.1.6': 'aes128-GCM',
    '2.16.840.1.101.3.4.1.7': 'aes128-CCM',
    '2.16.840.1.101.3.4.1.8': 'aes128-wrap-pad',
    '2.16.840.1.101.3.4.1.21': 'aes192-ECB',
    '2.16.840.1.101.3.4.1.22': 'aes192-CBC',
    '2.16.840.1.101.3.4.1.23': 'aes192-OFB',
    '2.16.840.1.101.3.4.1.24': 'aes192-CFB',
    '2.16.840.1.101.3.4.1.25': 'aes192-wrap',
    '2.16.840.1.101.3.4.1.26': 'aes192-GCM',
    '2.16.840.1.101.3.4.1.27': 'aes192-CCM',
    '2.16.840.1.101.3.4.1.28': 'aes192-wrap-pad',
    '2.16.840.1.101.3.4.1.41': 'aes256-ECB',
    '2.16.840.1.101.3.4.1.42': 'aes256-CBC',
    '2.16.840.1.101.3.4.1.43': 'aes256-OFB',
    '2.16.840.1.101.3.4.1.44': 'aes256-CFB',
    '2.16.840.1.101.3.4.1.45': 'aes256-wrap',
    '2.16.840.1.101.3.4.1.46': 'aes256-GCM',
    '2.16.840.1.101.3.4.1.47': 'aes256-CCM',
    '2.16.840.1.101.3.4.1.48': 'aes256-wrap-pad',
    // hash algorihtms
    '2.16.840.1.101.3.4.2.1': 'sha256',
    '2.16.840.1.101.3.4.2.2': 'sha384',
    '2.16.840.1.101.3.4.2.3': 'sha512',
    // pkcs12
    '2.16.840.1.113730.3.1.216': 'userPKCS12',
    // certificate issuer/subject OIDsets
    '2.5.1.5.55': 'clearance',
    '2.5.4.0': 'objectClass',
    '2.5.4.1': 'aliasedEntryName',
    '2.5.4.2': 'knowldgeinformation',
    '2.5.4.3': 'commonName',
    '2.5.4.5': 'serialName',
    '2.5.4.6': 'countryName',
    '2.5.4.7': 'localityName',
    '2.5.4.8': 'stateOrProvinceName',
    '2.5.4.9': 'streetAddress',
    '2.5.4.10': 'organizationName',
    '2.5.4.11': 'organizationalUnitName',
    '2.5.4.12': 'title',
    '2.5.4.13': 'description',
    '2.5.4.14': 'searchGuide',
    '2.5.4.15': 'businessCategory',
    '2.5.4.16': 'postalAddress',
    '2.5.4.17': 'postalCode',
    '2.5.4.18': 'postOfficeBox',
    '2.5.4.19': 'physicalDeliveryOfficeName',
    '2.5.4.20': 'telephoneNumber',
    '2.5.4.21': 'telexNumber',
    '2.5.4.22': 'teletexTerminalIdentifier',
    '2.5.4.23': 'facsimileTelephoneNumber',
    '2.5.4.24': 'x121Address',
    '2.5.4.25': 'internationalISDNNumber',
    '2.5.4.26': 'registeredAddress',
    '2.5.4.27': 'destinationIndicator',
    '2.5.4.28': 'preferredDeliveryMethod',
    '2.5.4.29': 'presentationAddress',
    '2.5.4.30': 'supportedApplicationContext',
    '2.5.4.31': 'member',
    '2.5.4.32': 'owner',
    '2.5.4.33': 'roleOccupant',
    '2.5.4.34': 'seeAlso',
    '2.5.4.35': 'userPassword',
    '2.5.4.36': 'userCertificate',
    '2.5.4.37': 'cACertificate',
    '2.5.4.38': 'authorityRevocationList',
    '2.5.4.39': 'certificateRevocationList',
    '2.5.4.40': 'crossCertificatePair',
    '2.5.4.41': 'name',
    '2.5.4.42': 'givenName',
    '2.5.4.43': 'initials',
    '2.5.4.44': 'generationQualifier',
    '2.5.4.45': 'uniqueIdentifier',
    '2.5.4.46': 'dnQualifier',
    '2.5.4.47': 'enhancedSearchGuide',
    '2.5.4.48': 'protocolInformation',
    '2.5.4.49': 'distinguishedName',
    '2.5.4.50': 'uniqueMember',
    '2.5.4.51': 'houseIdentifier',
    '2.5.4.52': 'supportedAlgorithms',
    '2.5.4.53': 'deltaRevocationList',
    '2.5.4.58': 'attributeCertificate',
    '2.5.4.65': 'pseudonym',
    '2.5.4.72': 'role',
    // X.509 extension OIDsets
    '2.5.29.1': 'authorityKeyIdentifierX',
    '2.5.29.2': 'keyAttributesX',
    '2.5.29.3': 'certificatePoliciesX',
    '2.5.29.4': 'keyUsageRestriction',
    '2.5.29.5': 'policyMapping',
    '2.5.29.6': 'subtreesConstraint',
    '2.5.29.7': 'subjectAltNameX',
    '2.5.29.8': 'issuerAltNameX',
    '2.5.29.9': 'subjectDirectoryAttributes',
    '2.5.29.10': 'basicConstraintsX',
    '2.5.29.11': 'nameConstraintsX',
    '2.5.29.12': 'policyConstraintsX',
    '2.5.29.13': 'basicConstraintsY',
    '2.5.29.14': 'subjectKeyIdentifier',
    '2.5.29.15': 'keyUsage',
    '2.5.29.16': 'privateKeyUsagePeriod',
    '2.5.29.17': 'subjectAltName',
    '2.5.29.18': 'issuerAltName',
    '2.5.29.19': 'basicConstraints',
    '2.5.29.20': 'cRLNumber',
    '2.5.29.21': 'cRLReason',
    '2.5.29.22': 'expirationDate',
    '2.5.29.23': 'instructionCode',
    '2.5.29.24': 'invalidityDate',
    '2.5.29.25': 'cRLDistributionPointsX',
    '2.5.29.26': 'issuingDistributionPointX',
    '2.5.29.27': 'deltaCRLIndicator',
    '2.5.29.28': 'issuingDistributionPoint',
    '2.5.29.29': 'certificateIssuer',
    '2.5.29.30': 'nameConstraints',
    '2.5.29.31': 'cRLDistributionPoints',
    '2.5.29.32': 'certificatePolicies',
    '2.5.29.33': 'policyMappings',
    '2.5.29.34': 'policyConstraintsY',
    '2.5.29.35': 'authorityKeyIdentifier',
    '2.5.29.36': 'policyConstraints',
    '2.5.29.37': 'extKeyUsage',
    '2.5.29.46': 'freshestCRL',
    '2.5.29.54': 'inhibitAnyPolicy',
    '2.5.29.55': 'targetInformation',
    '2.5.29.56': 'noRevAvail'
};

/**
 * ASN.1 Object Identifiers for friandly names
 * Generated automaticly
 * @field identifiers
 * @memberOf GostSecurity
 */
var identifiers = {};
for (let id in names)
    identifiers[names[id]] = id;

// </editor-fold>

/**
 * Algorithm identifiers {@link gostCrypto.AlgorithmIdentifier} for Object Identifiers
 *
 * @field algorithms
 * @memberOf GostSecurity
 */ // <editor-fold defaultstate="collapsed">
var algorithms = {
    // CryptoPro algoritms
    'id-GostR3411-94-with-GostR3410-2001': 'GOST R 34.10-2001/GOST R 34.11-94',
    'id-GostR3411-94-with-GostR3410-94': 'GOST R 34.10-94/GOST R 34.11-94',
    'id-GostR3411-94': 'GOST R 34.11-94',
    'id-HMACGostR3411-94': { name: 'HMAC', hash: { name: 'GOST R 34.11-94' } },
    'id-Gost28147-89-None-KeyWrap': 'GOST 28147-89-KW',
    'id-Gost28147-89-CryptoPro-KeyWrap': 'GOST 28147-89-CPKW',
    'id-GostR3410-2001': 'GOST R 34.10-2001',
    'id-GostR3410-94': 'GOST R 34.10-94',
    'id-GostR3410-94-a': 'GOST R 34.10-94',
    'id-GostR3410-94-aBis': 'GOST R 34.10-94',
    'id-GostR3410-94-b': 'GOST R 34.10-94',
    'id-GostR3410-94-bBis': 'GOST R 34.10-94',
    'id-Gost28147-89': 'GOST 28147-89',
    'id-Gost28147-89-MAC': 'GOST 28147-89-MAC',
    'id-GostR3410-2001-CryptoPro-ESDH': 'GOST R 34.10-2001-DH/GOST R 34.11-94',
    'id-GostR3410-94-CryptoPro-ESDH': 'GOST R 34.10-94-DH/GOST R 34.11-94',
    'id-GostR3410-2001DH': 'GOST R 34.10-2001-DH',
    'id-GostR3410-94DH': 'GOST R 34.10-94-DH',
    // TK-26 attributes
    'id-tc26-gost3410-12-256': 'GOST R 34.10-256',
    'id-tc26-gost3410-12-512': 'GOST R 34.10-512',
    'id-tc26-gost3411-94': 'GOST R 34.11-94',
    'id-tc26-gost3411-12-256': 'GOST R 34.11-256',
    'id-tc26-gost3411-12-512': 'GOST R 34.11-512',
    'id-tc26-signwithdigest-gost3410-12-94': 'GOST R 34.10-256/GOST R 34.11-94',
    'id-tc26-signwithdigest-gost3410-12-256': 'GOST R 34.10-256/GOST R 34.11-256',
    'id-tc26-signwithdigest-gost3410-12-512': 'GOST R 34.10-512/GOST R 34.11-512',
    'id-tc26-hmac-gost-3411-12-256': { name: 'HMAC', hash: { name: 'GOST R 34.11-256' } },
    'id-tc26-hmac-gost-3411-12-512': { name: 'HMAC', hash: { name: 'GOST R 34.11-512' } },
    'id-tc26-agreement-gost-3410-12-256': 'GOST R 34.10-256-DH/GOST R 34.11-256',
    'id-tc26-agreement-gost-3410-12-512': 'GOST R 34.10-512-DH/GOST R 34.11-256',
    // SignalCom algorithms
    'id-sc-gost28147-ecb': 'GOST 28147-89-ECB/SC',
    'id-sc-gost28147-gamma': 'GOST 28147-89-CTR/SC',
    'id-sc-gost28147-gfb': 'GOST 28147-89-CFB/SC',
    'id-sc-gost28147-mac': 'GOST 28147-89-MAC/SC',
    'id-sc-gostR3410-94': 'GOST R 34.10-94/SC',
    'id-sc-gostR3410-94-default': 'GOST R 34.10-94/SC',
    'id-sc-gostR3410-94-test': 'GOST R 34.10-94/SC/S-TEST',
    'id-sc-gostR3411-94': 'GOST R 34.11-94/SC',
    'id-sc-gostR3411-94-with-gostR3410-94': 'GOST R 34.10-94/GOST R 34.11-94/SC',
    'id-sc-gostR3411-94-with-gostR3410-2001': 'GOST R 34.10-2001/GOST R 34.11-94/SC',
    'id-sc-cmsGostWrap': 'GOST 28147-89-SCKW/SC',
    'id-sc-cmsGost28147Wrap': 'GOST 28147-89-KW/SC',
    'id-sc-pbeWithGost3411AndGost28147': {
        derivation: { name: 'GOST R 34.11-94-PBKDF2/SC' },
        encryption: { name: 'GOST 28147-ECB/SC' }
    },
    'id-sc-pbeWithGost3411AndGost28147CFB': {
        derivation: { name: 'GOST R 34.11-94-PBKDF2/SC' },
        encryption: { name: 'GOST 28147-CFB/SC' }
    },
    'id-sc-gostR3410-2001': 'GOST R 34.10-2001/SC',
    'id-sc-hmacWithGostR3411': { name: 'HMAC', hash: { name: 'GOST R 34.11-94/SC' } },
    'id-sc-r3410-ESDH-r3411kdf': 'GOST R 34.10-2001-DH/GOST R 34.11-94/SC',
    // RSA algorithms
    noSignature: 'NONE',
    rsaEncryption: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } },
    sha1withRSAEncryption: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-1' } },
    sha256withRSAEncryption: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } },
    sha384withRSAEncryption: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-384' } },
    sha512withRSAEncryption: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-512' } },
    'rsaes-oaep': 'RSA-OAEP',
    'rsassa-pss': 'RSA-PSS',
    // ECDSA
    'ecdsa': 'ECDSA',
    'ecdsa-with-SHA1': { name: 'ECDSA', hash: { name: 'SHA-1' } },
    'ecdsa-with-SHA256': { name: 'ECDSA', hash: { name: 'SHA-256' } },
    'ecdsa-with-SHA384': { name: 'ECDSA', hash: { name: 'SHA-384' } },
    'ecdsa-with-SHA512': { name: 'ECDSA', hash: { name: 'SHA-512' } },
    // Legion of the Bouncy Castle pbe
    'pbeWithSHAAndAES128-CBC': {
        derivation: { name: 'PBKDF2', hash: { name: 'SHA-1' } },
        encryption: { name: 'AES-CBC', length: 128 }
    },
    'pbeWithSHAAndAES192-CBC': {
        derivation: { name: 'PBKDF2', hash: { name: 'SHA-1' } },
        encryption: { name: 'AES-CBC', length: 192 }
    },
    'pbeWithSHAAndAES256-CBC': {
        derivation: { name: 'PBKDF2', hash: { name: 'SHA-1' } },
        encryption: { name: 'AES-CBC', length: 256 }
    },
    'pbeWithSHA256AndAES128-CBC': {
        derivation: { name: 'PBKDF2', hash: { name: 'SHA-256' } },
        encryption: { name: 'AES-CBC', length: 128 }
    },
    'pbeWithSHA256AndAES192-CBC': {
        derivation: { name: 'PBKDF2', hash: { name: 'SHA-256' } },
        encryption: { name: 'AES-CBC', length: 192 }
    },
    'pbeWithSHA256AndAES256-CBC': {
        derivation: { name: 'PBKDF2', hash: { name: 'SHA-256' } },
        encryption: { name: 'AES-CBC', length: 256 }
    },
    // PKCS12 PBE
    'pbeWithSHAAnd3-KeyTripleDES-CBC': {
        derivation: { name: 'PFXKDF', iterations: 2000, hash: 'SHA-1' },
        encryption: { name: '3DES', block: 'CBC' }
    },
    'pbeWithSHAAnd2-KeyTripleDES-CBC': {
        derivation: { name: 'PFXKDF', iterations: 2000, hash: 'SHA-1' },
        encryption: { name: '2DES', block: 'CBC' }
    },
    'pbeWithSHAAnd128BitRC2-CBC': {
        derivation: { name: 'PFXKDF', iterations: 2000, hash: 'SHA-1' },
        encryption: { name: 'RC2', block: 'CBC', length: 128 }
    },
    'pbeWithSHAAnd40BitRC2-CBC': {
        derivation: { name: 'PFXKDF', iterations: 2000, hash: 'SHA-1' },
        encryption: { name: 'RC2', block: 'CBC', length: 40 }
    },
    'pbeUnknownGost': {
        derivation: { name: 'PFXKDF', iterations: 2000, hash: 'GOST R 34.11-94' },
        encryption: { name: 'GOST 28147-89-CFB' }
    },
    //  Diffie-Hellman Key Exchange Keys
    ecDH: 'ECDH',
    dhKeyAgreement: 'DH',
    // symmetric key algorithm oids
    'aes128-CBC': { name: 'AES-CBC', length: 128 },
    'aes128-CFB': { name: 'AES-CFB-8', length: 128 },
    'aes128-GCM': { name: 'AES-GCM', length: 128 },
    'aes128-wrap': { name: 'AES-KW', length: 128 },
    'aes192-CBC': { name: 'AES-CBC', length: 192 },
    'aes192-CFB': { name: 'AES-CFB-8', length: 192 },
    'aes192-GCM': { name: 'AES-GCM', length: 192 },
    'aes192-wrap': { name: 'AES-KW', length: 192 },
    'aes256-CBC': { name: 'AES-CBC', length: 256 },
    'aes256-CFB': { name: 'AES-CFB-8', length: 256 },
    'aes256-GCM': { name: 'AES-GCM', length: 256 },
    'aes256-wrap': { name: 'AES-KW', length: 256 },
    // hash algorihtms
    sha1: 'SHA-1',
    sha256: 'SHA-256',
    sha384: 'SHA-384',
    sha512: 'SHA-512',
    // PBE
    PBKDF2: 'PBKDF2',
    PBES2: { derivation: { name: 'PBKDF2' }, encryption: {} },
    PBMAC1: { derivation: { name: 'PBKDF2' }, hmac: {} },
    // HMAC
    hmacWithSHA1: 'SHA-1-HMAC',
    hmacWithSHA256: { name: 'HMAC', hash: { name: 'SHA-256' } },
    hmacWithSHA384: { name: 'HMAC', hash: { name: 'SHA-384' } },
    hmacWithSHA512: { name: 'HMAC', hash: { name: 'SHA-512' } }
};

// Each algorithm must has id for convertions
for (let id in algorithms) {
    let algorithm = algorithms[id];
    if (typeof algorithm === 'string') {
        algorithm = { name: algorithm };
    }
    algorithm.id = id;
    algorithms[id] = algorithm;
}  // </editor-fold>

/**
 * Algorithm parameters
 *
 * @field parameters
 * @memberOf GostSecurity
 */ // <editor-fold defaultstate="collapsed">
var parameters = {
    'id-GostR3410-94-TestParamSet': { namedParam: 'S-TEST' },
    'id-GostR3410-94-CryptoPro-A-ParamSet': { namedParam: 'S-A' },
    'id-GostR3410-94-CryptoPro-B-ParamSet': { namedParam: 'S-B' },
    'id-GostR3410-94-CryptoPro-C-ParamSet': { namedParam: 'S-C' },
    'id-GostR3410-94-CryptoPro-D-ParamSet': { namedParam: 'S-D' },
    'id-GostR3410-94-CryptoPro-XchA-ParamSet': { namedParam: 'X-A' },
    'id-GostR3410-94-CryptoPro-XchB-ParamSet': { namedParam: 'X-B' },
    'id-GostR3410-94-CryptoPro-XchC-ParamSet': { namedParam: 'X-C' },
    // CryptoPro named curves
    'id-GostR3410-2001-CryptoPro-TestParamSet': { namedCurve: 'S-256-TEST' },
    'id-GostR3410-2001-CryptoPro-A-ParamSet': { namedCurve: 'S-256-A' },
    'id-GostR3410-2001-CryptoPro-B-ParamSet': { namedCurve: 'S-256-B' },
    'id-GostR3410-2001-CryptoPro-C-ParamSet': { namedCurve: 'S-256-C' },
    'id-GostR3410-2001-CryptoPro-XchA-ParamSet': { namedCurve: 'X-256-A' },
    'id-GostR3410-2001-CryptoPro-XchB-ParamSet': { namedCurve: 'X-256-B' },
    // TC-26 named curves
    'id-tc26-gost-3410-12-256-paramSetTest': { namedCurve: 'T-256-TEST' },
    'id-tc26-gost-3410-12-256-paramSetA': { namedCurve: 'T-256-A' },
    'id-tc26-gost-3410-12-256-paramSetB': { namedCurve: 'T-256-B' },
    'id-tc26-gost-3410-12-512-paramSetTest': { namedCurve: 'T-512-TEST' },
    'id-tc26-gost-3410-12-512-paramSetA': { namedCurve: 'T-512-A' },
    'id-tc26-gost-3410-12-512-paramSetB': { namedCurve: 'T-512-B' },
    'id-tc26-gost-3410-12-512-paramSetC': { namedCurve: 'T-512-C' },
    'id-tc26-gost-3410-12-512-paramSetD': { namedCurve: 'T-512-D' },
    // Curve attributes additional algorithms
    secp256r1: { namedCurve: 'P-256' },
    secp384r: { namedCurve: 'P-384' },
    secp521r: { namedCurve: 'P-521' },
    // CryptoPro encryption parameters
    'id-GostR3411-94-TestParamSet': { sBox: 'D-TEST' },
    'id-GostR3411-94-CryptoProParamSet': { sBox: 'D-A' },
    'id-GostR3411-94-CryptoPro-A-ParamSet': { sBox: 'D-B' },
    'id-GostR3411-94-CryptoPro-B-ParamSet': { sBox: 'D-C' },
    'id-GostR3411-94-CryptoPro-C-ParamSet': { sBox: 'D-D' },
    'id-Gost28147-89-TestParamSet': { block: 'CTR', sBox: 'E-TEST' },
    'id-Gost28147-89-CryptoPro-A-ParamSet': { block: 'CFB', sBox: 'E-A', keyMeshing: 'CP' },
    'id-Gost28147-89-CryptoPro-B-ParamSet': { block: 'CFB', sBox: 'E-B', keyMeshing: 'CP' },
    'id-Gost28147-89-CryptoPro-C-ParamSet': { block: 'CFB', sBox: 'E-C', keyMeshing: 'CP' },
    'id-Gost28147-89-CryptoPro-D-ParamSet': { block: 'CFB', sBox: 'E-D', keyMeshing: 'CP' },
    'id-Gost28147-89-None-KeyMeshing': { keyMeshing: 'NO' },
    'id-Gost28147-89-CryptoPro-KeyMeshing': { keyMeshing: 'CP' },
    // TC-26 encryption parameters
    'id-tc26-gost-28147-param-Z': { block: 'CFB', sBox: 'E-Z' }
};  // </editor-fold>

/**
 * Named attributes for Algorithm identifiers {@link AlgorithmIdentifier}<br><br>
 *
 * Recognized attributes:
 *  <ul>
 *      <li>sBox - Paramsets for GOST 28147. Supported values:
 *          <ul>
 *              <li>D-TEST - id-GostR3411-94-TestParamSet</li>
 *              <li>D-A - id-GostR3411-94-CryptoProParamSet</li>
 *              <li>D-B - id-GostR3411-94-CryptoPro-A-ParamSet</li>
 *              <li>D-C - id-GostR3411-94-CryptoPro-B-ParamSet</li>
 *              <li>D-D - id-GostR3411-94-CryptoPro-C-ParamSet</li>
 *              <li>E-TEST - id-Gost28147-89-TestParamSet</li>
 *              <li>E-A - id-Gost28147-89-CryptoPro-A-ParamSet</li>
 *              <li>E-B - id-Gost28147-89-CryptoPro-B-ParamSet</li>
 *              <li>E-C - id-Gost28147-89-CryptoPro-C-ParamSet</li>
 *              <li>E-D - id-Gost28147-89-CryptoPro-D-ParamSet</li>
 *              <li>E-Z - id-tc26-gost-28147-param-Z</li>
 *              <li>D-256 - id-tc26-gost3411-12-256</li>
 *              <li>D-512 - id-tc26-gost3411-12-512</li>
 *          </ul>
 *      </li>
 *      <li>namedParam - Paramset for GOST R 34.10-94
 *          <ul>
 *              <li>S-TEST - id-GostR3410-94-TestParamSet</li>
 *              <li>S-A - id-GostR3410-94-CryptoPro-A-ParamSet</li>
 *              <li>S-B - id-GostR3410-94-CryptoPro-B-ParamSet</li>
 *              <li>S-C - id-GostR3410-94-CryptoPro-C-ParamSet</li>
 *              <li>S-D - id-GostR3410-94-CryptoPro-D-ParamSet</li>
 *              <li>X-A - id-GostR3410-94-CryptoPro-XchA-ParamSet</li>
 *              <li>X-B - id-GostR3410-94-CryptoPro-XchB-ParamSet</li>
 *              <li>X-C - id-GostR3410-94-CryptoPro-XchC-ParamSet</li>
 *          </ul>
 *      </li>
 *      <li>namedCurve - Paramset for GOST R 34.10-01 and GOST R 34.10-12
 *          <ul>
 *              <li>S-256-TEST - id-GostR3410-2001-CryptoPro-TestParamSet</li>
 *              <li>S-256-A - id-GostR3410-2001-CryptoPro-A-ParamSet</li>
 *              <li>S-256-B - id-GostR3410-2001-CryptoPro-B-ParamSet</li>
 *              <li>S-256-C - id-GostR3410-2001-CryptoPro-C-ParamSet</li>
 *              <li>X-256-A - id-GostR3410-2001-CryptoPro-XchA-ParamSet</li>
 *              <li>X-256-B - id-GostR3410-2001-CryptoPro-XchB-ParamSet</li>
 *              <li>P-256 - secp256r1</li>
 *              <li>T-256-TEST - id-tc26-gost-3410-12-256-paramSetTest</li>
 *              <li>T-256-A - id-tc26-gost-3410-12-256-paramSetA</li>
 *              <li>T-256-B - id-tc26-gost-3410-12-256-paramSetB</li>
 *              <li>T-512-TEST - id-tc26-gost-3410-12-512-paramSetTest</li>
 *              <li>T-512-A - id-tc26-gost-3410-12-512-paramSetA</li>
 *              <li>T-512-B - id-tc26-gost-3410-12-512-paramSetB</li>
 *          </ul>
 *      </li>
 *  </ul>
 * @field attributes
 * @memberOf GostSecurity
 */ // <editor-fold defaultstate="collapsed">
var attributes = {
    sBox: {
        'D-TEST': 'id-GostR3411-94-TestParamSet',
        'D-A': 'id-GostR3411-94-CryptoProParamSet',
        'D-B': 'id-GostR3411-94-CryptoPro-A-ParamSet',
        'D-C': 'id-GostR3411-94-CryptoPro-B-ParamSet',
        'D-D': 'id-GostR3411-94-CryptoPro-C-ParamSet',
        'E-TEST': 'id-Gost28147-89-TestParamSet',
        'E-A': 'id-Gost28147-89-CryptoPro-A-ParamSet',
        'E-B': 'id-Gost28147-89-CryptoPro-B-ParamSet',
        'E-C': 'id-Gost28147-89-CryptoPro-C-ParamSet',
        'E-D': 'id-Gost28147-89-CryptoPro-D-ParamSet',
        'E-Z': 'id-tc26-gost-28147-param-Z',
        'D-256': 'id-tc26-gost3411-12-256',
        'D-512': 'id-tc26-gost3411-12-512'
    },
    namedParam: {
        'S-TEST': 'id-GostR3410-94-TestParamSet',
        'S-A': 'id-GostR3410-94-CryptoPro-A-ParamSet',
        'S-B': 'id-GostR3410-94-CryptoPro-B-ParamSet',
        'S-C': 'id-GostR3410-94-CryptoPro-C-ParamSet',
        'S-D': 'id-GostR3410-94-CryptoPro-D-ParamSet',
        'X-A': 'id-GostR3410-94-CryptoPro-XchA-ParamSet',
        'X-B': 'id-GostR3410-94-CryptoPro-XchB-ParamSet',
        'X-C': 'id-GostR3410-94-CryptoPro-XchC-ParamSet'
    },
    namedCurve: {
        'S-256-TEST': 'id-GostR3410-2001-CryptoPro-TestParamSet',
        'S-256-A': 'id-GostR3410-2001-CryptoPro-A-ParamSet',
        'S-256-B': 'id-GostR3410-2001-CryptoPro-B-ParamSet',
        'S-256-C': 'id-GostR3410-2001-CryptoPro-C-ParamSet',
        'X-256-A': 'id-GostR3410-2001-CryptoPro-XchA-ParamSet',
        'X-256-B': 'id-GostR3410-2001-CryptoPro-XchB-ParamSet',
        'P-256': 'secp256r1',
        'T-256-TEST': 'id-tc26-gost-3410-12-256-paramSetTest',
        'T-256-A': 'id-tc26-gost-3410-12-256-paramSetA',
        'T-256-B': 'id-tc26-gost-3410-12-256-paramSetB',
        'T-512-TEST': 'id-tc26-gost-3410-12-512-paramSetTest',
        'T-512-A': 'id-tc26-gost-3410-12-512-paramSetA',
        'T-512-B': 'id-tc26-gost-3410-12-512-paramSetB'
    }
}; // </editor-fold>

/**
 * Set of algorithms for different providers<br><br>
 * Supported providers:
 *  <ul>
 *      <li><b>CP-94</b> - CryptoPro GOST R 34.10-94 algorithm set</li>
 *      <li><b>CP-01</b> - CryptoPro GOST R 34.10-2001 algorithm set</li>
 *      <li><b>TC-256</b> - Technical Commitee GOST R 34.10-256 algorithm set</li>
 *      <li><b>TC-512</b> - Technical Commitee GOST R 34.10-512 algorithm set</li>
 *      <li><b>SC-94</b> - SignalCom GOST R 34.10-94 algorithm set</li>
 *      <li><b>SC-01</b> - SignalCom GOST R 34.10-2001 algorithm set</li>
 *  </ul>
 *
 *  Follow set can be used if it's supported your browser native WebCrypto API:
 *  <ul>
 *      <li><b>RSA-2048</b> - RSA Encryption 2048 bits with SHA-256 algorithm set</li>
 *      <li><b>ECDSA-256</b> - ECDSA-256 with SHA-256 algorithm set</li>
 *  </ul>
 *
 *  Each provider records has follow standart algorithm identifiers:
 *  <ul>
 *      <li><b>signature</b> - Signature algorithm</li>
 *      <li><b>generation</b> - Asymmetric key generation algorithm</li>
 *      <li><b>digest</b> - Digest algorithm</li>
 *      <li><b>wrapping</b> - Key wrapping algorithm</li>
 *      <li><b>hmac</b> - Hash-based message authentication code algorithm</li>
 *      <li><b>agreement</b> - Key agreement algorithm (except RSA schema)</li>
 *      <li><b>encryption</b> - Content encription algorithm</li>
 *      <li><b>derivation</b> - Password-based derivation algorithm</li>
 *      <li><b>pbes</b> - Password-based encryption algorithm</li>
 *      <li><b>pbmac</b> - Password-based message authentication code algorithm</li>
 *  </ul>
 *
 * @field providers
 * @memberOf GostSecurity
 */ // <editor-fold defaultstate="collapsed">
var providers = {
    'CP-94': {
        title: 'Crypto-Pro GOST R 34.10-94 Cryptographic Service Provider',
        signature: algorithms['id-GostR3411-94-with-GostR3410-94'],
        publicKey: { id: 'id-GostR3410-94', name: 'GOST R 34.10-94', namedParam: 'X-A' },
        privateKey: { id: 'id-GostR3410-94DH', name: 'GOST R 34.10-94-DH', namedParam: 'X-A' },
        digest: algorithms['id-GostR3411-94'],
        wrapping: { id: 'id-Gost28147-89-CryptoPro-KeyWrap', name: 'GOST 28147-89-CPKW', sBox: 'E-A' },
        hmac: algorithms['id-HMACGostR3411-94'],
        agreement: algorithms['id-GostR3410-94-CryptoPro-ESDH'],
        encryption: { id: 'id-Gost28147-89', name: 'GOST 28147-89', block: 'CFB', sBox: 'E-A', keyMeshing: 'CP' },
        derivation: { id: 'PBKDF2', name: 'GOST R 34.11-94-PBKDF2', iterations: 2000 }
    },
    'CP-01': {
        title: 'Crypto-Pro GOST R 34.10-2001 Cryptographic Service Provider',
        signature: algorithms['id-GostR3411-94-with-GostR3410-2001'],
        publicKey: { id: 'id-GostR3410-2001', name: 'GOST R 34.10-2001', namedCurve: 'X-256-A' },
        privateKey: { id: 'id-GostR3410-2001DH', name: 'GOST R 34.10-2001-DH', namedCurve: 'X-256-A' },
        digest: { id: 'id-GostR3411-94', name: 'GOST R 34.11-94', sBox: 'D-A' },
        wrapping: { id: 'id-Gost28147-89-CryptoPro-KeyWrap', name: 'GOST 28147-89-CPKW', sBox: 'E-A' },
        hmac: algorithms['id-HMACGostR3411-94'],
        agreement: algorithms['id-GostR3410-2001-CryptoPro-ESDH'],
        encryption: { id: 'id-Gost28147-89', name: 'GOST 28147-89-CFB-CPKM', sBox: 'E-A' },
        derivation: { id: 'PBKDF2', name: 'GOST R 34.11-94-PBKDF2', iterations: 2000 }
    },
    'TC-256': {
        title: 'Crypto-Pro GOST R 34.10-2012 Cryptographic Service Provider',
        signature: algorithms['id-tc26-signwithdigest-gost3410-12-256'],
        publicKey: { id: 'id-tc26-gost3410-12-256', name: 'GOST R 34.10-256', namedCurve: 'X-256-A' },
        privateKey: {
            id: 'id-tc26-agreement-gost-3410-12-256',
            name: 'GOST R 34.10-256-DH/GOST R 34.11-256',
            namedCurve: 'X-256-A'
        },
        digest: algorithms['id-tc26-gost3411-12-256'],
        wrapping: { id: 'id-Gost28147-89-CryptoPro-KeyWrap', name: 'GOST 28147-89-CPKW', sBox: 'E-A' },
        hmac: algorithms['id-tc26-hmac-gost-3411-12-256'],
        agreement: algorithms['id-tc26-agreement-gost-3410-12-256'],
        encryption: { id: 'id-Gost28147-89', name: 'GOST 28147-89-CFB-CPKM', sBox: 'E-A' },
        derivation: { id: 'PBKDF2', name: 'GOST R 34.11-256-12-PBKDF2', iterations: 2000 }
    },
    'TC-512': {
        title: 'Crypto-Pro GOST R 34.10-2012 Strong Cryptographic Service Provider',
        signature: algorithms['id-tc26-signwithdigest-gost3410-12-512'],
        publicKey: { id: 'id-tc26-gost3410-12-512', name: 'GOST R 34.10-512', namedCurve: 'T-512-A' },
        privateKey: {
            id: 'id-tc26-agreement-gost-3410-12-512',
            name: 'GOST R 34.10-512-DH/GOST R 34.11-256',
            namedCurve: 'T-512-A'
        },
        digest: algorithms['id-tc26-gost3411-12-512'],
        wrapping: { id: 'id-Gost28147-89-CryptoPro-KeyWrap', name: 'GOST 28147-89-CPKW', sBox: 'E-A' },
        hmac: algorithms['id-tc26-hmac-gost-3411-12-512'],
        agreement: algorithms['id-tc26-agreement-gost-3410-12-512'],
        encryption: { id: 'id-Gost28147-89', name: 'GOST 28147-89-CFB-CPKM', sBox: 'E-A' },
        derivation: { id: 'PBKDF2', name: 'GOST R 34.11-256-PBKDF2', iterations: 2000 }
    },
    'SC-94': {
        title: 'Signal-COM GOST Cryptographic Provider',
        signature: algorithms['id-sc-gostR3411-94-with-gostR3410-94'],
        publicKey: { id: 'id-sc-gostR3410-94', name: 'GOST R 34.10-94/SC', namedParam: 'S-A' },
        privateKey: {
            id: 'id-sc-gostR3410-94', name: 'GOST R 34.10-94/SC', modulusLength: 1024, param: {
                p: '0xB4E25EFB018E3C8B87505E2A67553C5EDC56C2914B7E4F89D23F03F03377E70A2903489DD60E78418D3D851EDB5317C4871E40B04228C3B7902963C4B7D85D52B9AA88F2AFDBEB28DA8869D6DF846A1D98924E925561BD69300B9DDD05D247B5922D967CBB02671881C57D10E5EF72D3E6DAD4223DC82AA1F7D0294651A480DF',
                q: '0x972432A437178B30BD96195B773789AB2FFF15594B176DD175B63256EE5AF2CF',
                a: '0x8FD36731237654BBE41F5F1F8453E71CA414FFC22C25D915309E5D2E62A2A26C7111F3FC79568DAFA028042FE1A52A0489805C0DE9A1A469C844C7CABBEE625C3078888C1D85EEA883F1AD5BC4E6776E8E1A0750912DF64F79956499F1E182475B0B60E2632ADCD8CF94E9C54FD1F3B109D81F00BF2AB8CB862ADF7D40B9369A'
            }
        },
        digest: algorithms['id-sc-gostR3411-94'],
        encryption: { id: 'id-sc-gost28147-gfb', name: 'GOST 28147-89-CFB/SC' },
        hmac: algorithms['id-sc-hmacWithGostR3411'],
        wrapping: ['id-sc-cmsGostWrap'],
        agreement: algorithms['id-sc-r3410-ESDH-r3411kdf'],
        derivation: { id: 'PBKDF2', name: 'GOST R 34.11-94-PBKDF2/SC', iterations: 2048 },
        pbes: {
            id: 'id-sc-pbeWithGost3411AndGost28147CFB',
            derivation: { id: 'PBKDF2', name: 'GOST R 34.11-94-PBKDF2/SC', iterations: 2048 },
            encryption: {
                id: 'id-sc-gost28147-gfb',
                name: 'GOST 28147-CFB/SC',
                iv: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])
            }
        }
    },
    'SC-01': {
        title: 'Signal-COM ECGOST Cryptographic Provider',
        signature: algorithms['id-sc-gostR3411-94-with-gostR3410-2001'],
        publicKey: { id: 'id-sc-gostR3410-2001', name: 'GOST R 34.10-2001/SC', namedCurve: 'P-256' },
        privateKey: {
            id: 'id-sc-gostR3410-2001', name: 'GOST R 34.10-2001/SC', curve: {
                p: '0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF',
                a: '0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC',
                b: '0x5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B',
                x: '0x6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296',
                y: '0x4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5',
                q: '0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551'
            }
        },
        digest: algorithms['id-sc-gostR3411-94'],
        encryption: { id: 'id-sc-gost28147-gfb', name: 'GOST 28147-89-CFB/SC' },
        hmac: algorithms['id-sc-hmacWithGostR3411'],
        wrapping: algorithms['id-sc-cmsGostWrap'],
        agreement: algorithms['id-sc-r3410-ESDH-r3411kdf'],
        derivation: { id: 'PBKDF2', name: 'GOST R 34.11-94-PBKDF2/SC', iterations: 2048 },
        pbes: {
            id: 'id-sc-pbeWithGost3411AndGost28147CFB',
            derivation: { id: 'PBKDF2', name: 'GOST R 34.11-94-PBKDF2/SC', iterations: 2048 },
            encryption: {
                id: 'id-sc-gost28147-gfb',
                name: 'GOST 28147-CFB/SC',
                iv: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])
            }
        }
    },
    'RSA-2048': {
        title: 'Microsoft Strong Cryptographic Provider',
        signature: algorithms['sha256withRSAEncryption'],
        publicKey: {
            id: 'rsaEncryption', name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: algorithms['sha256']
        },
        privateKey: {
            id: 'rsaEncryption', name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), hash: algorithms['sha256']
        },
        digest: algorithms['sha256'],
        encryption: algorithms['aes256-CFB'],
        hmac: algorithms['hmacWithSHA256']
    },
    'ECDSA-256': {
        title: 'Microsoft Base DSS and Diffie-Hellman Cryptographic Provider',
        signature: algorithms['ecdsa-with-SHA256'],
        publicKey: { id: 'ecdsa', name: 'ECDSA', namedCurve: 'P-256' },
        privateKey: { id: 'ecdsa', name: 'ECDSA', namedCurve: 'P-256' },
        digest: algorithms['sha256'],
        encryption: algorithms['aes256-CFB'],
        hmac: algorithms['hmacWithSHA256'],
        agreement: algorithms['ecDH']
    }
};
// Russian providers extension
['CP-94', 'CP-01', 'TC-256', 'TC-512', 'SC-94', 'SC-01'].forEach(function (name) {
    var provider = providers[name];
    provider.hmac = expand(provider.hmac, { hash: provider.digest });
    provider.derivation = expand(provider.derivation, { hash: provider.digest, hmac: provider.hmac });
    provider.pbes = provider.pbes || {
        id: 'PBES2', derivation: provider.derivation,
        encryption: provider.encryption
    };
    provider.pbmac = provider.pbmac || {
        id: 'PBMAC1', derivation: provider.derivation,
        hmac: provider.hmac
    };
    provider.agreement = expand(provider.agreement, { wrapping: provider.wrapping });
});
// RSA & ECDA providers extension
['RSA-2048', 'ECDSA-256'].forEach(function (name) {
    var provider = providers[name];
    provider.derivation = provider.derivation || {
        id: 'PBKDF2', name: 'PBKDF2',
        iterations: 2048, hash: provider.digest
    };
    provider.pbes = provider.pbes || {
        id: 'PBES2',
        derivation: provider.derivation,
        encryption: provider.encryption
    };
    provider.pbmac = provider.pbmac || {
        id: 'PBMAC1',
        derivation: provider.derivation,
        hmac: provider.hmac
    };
});
// Workaround for Chrome error for RSA algorithm when hash for keys is not defined
// if (root.crypto && root.crypto.subtle)
//    setTimeout(function () {
//        root.crypto.subtle.generateKey(providers['RSA-2048'].generation, false, ["sign"])['catch'](function () {
//            providers['RSA-2048'].generation.hash = providers['RSA-2048'].digest;
//            algorithms['rsaEncryption'].hash = providers['RSA-2048'].digest;
//        });
//    });
// </editor-fold>

/**
 * GOST and common ASN.1 Object and Algorithm Identifiers
 * @class GostSecurity
 */
export function GostSecurity() {
}

GostSecurity.prototype = {
    names,
    identifiers,
    algorithms,
    parameters,
    attributes,
    providers
};

export const gostSecurityInstance = new GostSecurity();
