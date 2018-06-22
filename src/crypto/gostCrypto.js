/**
 * @file Implementation Web Crypto interfaces for GOST algorithms
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

import { GostRandom } from '../gostRandom';
import { gostCodingInstance } from './gostCoding';
import { gostSecurityInstance } from './gostSecurity';
import { gostASN1Instance } from './gostASN1';
import { gostSubtleInstance } from './gostSubtle';
import { gostCertInstance } from './gostCert';
import { gostCMSInstance } from './gostCMS';
import { gostKeysInstance } from './gostKeys';

/**
 * The gostCrypto provide general purpose cryptographic functionality for
 * GOST standards including a cryptographically strong pseudo-random number
 * generator seeded with truly random values.
 *
 * @namespace gostCrypto
 */
export const gostCrypto = {
    /**
     * Coding algorithms: Base64, Hex, Int16, Chars, BER and PEM
     *
     * @memberOf gostCrypto
     * @type GostCoding
     */
    coding: gostCodingInstance,

    /**
     * GOST and common ASN.1 Object and Algorithm Identifiers
     *
     * @memberOf gostCrypto
     * @type GostSecurity
     */
    security: gostSecurityInstance,

    /**
     * PKCS ASN.1 message syntax and converters
     *
     * @memberOf gostCrypto
     * @type GostASN1
     */
    asn1: gostASN1Instance,

    /**
     * The subtle attribute provides an instance of the SubtleCrypto
     * interface which provides low-level cryptographic primitives and
     * algorithms.
     *
     * @memberOf gostCrypto
     * @type SubtleCrypto
     */
    subtle: gostSubtleInstance,

    /**
     * Provides facilities for handling certificates, CRLs, etc.
     *
     * @memberOf gostCrypto
     * @type GostCert
     */
    cert: gostCertInstance,

    /**
     * Implements the Cryptographic Message Syntax as specified in RFC-2630.
     *
     * @memberOf gostCrypto
     * @type GostCMS
     */
    cms: gostCMSInstance,

    /**
     * Implements the Key and Certificate Store methods
     *
     * @memberOf gostCrypto
     * @type GostKeys
     */
    keys: gostKeysInstance
};

/**
 * The getRandomValues method generates cryptographically random values.
 *
 * First try to use Web Crypto random genereator. Next make random
 * bytes based on standart Math.random mixed with time and mouse pointer
 *
 * @memberOf gostCrypto
 * @param {(CryptoOperationData)} array Destination buffer for random data
 */
gostCrypto.getRandomValues = function (array) // <editor-fold defaultstate="collapsed">
{
    try {
        const gostRandom = new GostRandom();
        return gostRandom.getRandomValues(array);
    } catch (e) {
        throw new Error('Error occurred during random values generation');
    }
}; // </editor-fold>
// </editor-fold>
