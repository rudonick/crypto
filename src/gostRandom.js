/**
 * @file Implementation Web Crypto random generatore for GOST algorithms
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

import { isBrowser, getCryptoModule } from './utils/environment';

// Initialize mouse and time counters for random generator
const randomRing = {
    seed: new Uint8Array(1024),
    getIndex: 0,
    setIndex: 0,
    set: function (x) {
        if (this.setIndex >= 1024)
            this.setIndex = 0;
        this.seed[this.setIndex++] = x;
    },
    get: function () {
        if (this.getIndex >= 1024)
            this.getIndex = 0;
        return this.seed[this.getIndex++];
    }
};

if (isBrowser()) {
    try {
        // Mouse move event to fill random array
        document.addEventListener('mousemove', function (e) {
            randomRing.set((new Date().getTime() & 255) ^
              ((e.clientX || e.pageX) & 255) ^
              ((e.clientY || e.pageY) & 255));
        }, false);
    } catch (e) {
    }

    try {
        // Keypress event to fill random array
        document.addEventListener('keydown', function (e) {
            randomRing.set((new Date().getTime() & 255) ^
              (e.keyCode & 255));
        }, false);
    } catch (e) {
    }
} // </editor-fold>

class TypeMismatchError extends Error {
}

class QuotaExceededError extends Error {
}

/**
 * The gostCrypto provide general purpose cryptographic functionality for
 * GOST standards including a cryptographically strong pseudo-random number
 * generator seeded with truly random values.
 *
 * @Class GostRandom
 *
 */
export function GostRandom() {
}

/**
 * The getRandomValues method generates cryptographically random values. <br><br>
 *
 * Random generator based on JavaScript Web Crypto random genereator
 * (if it is possible) or  Math.random mixed with time and parameters of
 * mouse and keyboard events
 *
 * @memberOf GostRandom
 * @param {(ArrayBuffer|ArrayBufferView)} array Destination buffer for random data
 */

const rootCryptoModule = getCryptoModule();

GostRandom.prototype.getRandomValues = function (array) // <editor-fold defaultstate="collapsed">
{
    if (!array.byteLength)
        throw new TypeMismatchError('Array is not of an integer type (Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, or Uint32Array)');

    if (array.byteLength > 65536)
        throw new QuotaExceededError('Byte length of array can\'t be greate then 65536');

    var u8 = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
    if (rootCryptoModule && rootCryptoModule.getRandomValues) {
        // Native window cryptographic interface
        rootCryptoModule.getRandomValues(u8);
    } else {
        // Standard Javascript method
        for (var i = 0, n = u8.length; i < n; i++)
            u8[i] = Math.floor(256 * Math.random()) & 255;
    }

    // Mix bio randomizator
    for (var i = 0, n = u8.length; i < n; i++)
        u8[i] = u8[i] ^ randomRing.get();
    return array;
}; // </editor-fold>
