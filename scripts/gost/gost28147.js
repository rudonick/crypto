/**
 * @file GOST 28147-89 Encryption Algorithm
 * @version 0.99
 * @copyright 2014, Rudolf Nickolaev. All rights reserved.
 */

/*
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this 
 *    list of conditions and the following disclaimer.
 *    
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
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

(function(root, factory) {
    
    /*
     * Module imports and exports
     * 
     */ // <editor-fold defaultstate="collapsed">
    if (typeof define === 'function' && define.amd) {
        define(['gostRandom'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('gostRandom'));
    } else {
        if (typeof importScripts !== 'undefined') {
            if (!root.gostRandom)
                importScripts('gostRandom.js');
        }
        root.Gost28147 = factory(root.gostRandom);
    }
    // </editor-fold>

}(this, function(gostRandom) {
    
    /*
     * Initial parameters and common algortithms of GOST 28147-89 
     * 
     * http://tools.ietf.org/html/rfc5830
     * 
     */ // <editor-fold defaultstate="collapsed">

    var root = this;
    var rootCrypto = root.crypto || root.msCrypto;

    var SyntaxError = root.SyntaxError || Error,
            DataError = root.DataError || Error,
            NotSupportedError = root.NotSupportedError || Error;

    /*
     * Check supported
     * This implementation support only Little Endian arhitecture
     */

    var littleEndian = (function() {
        var buffer = new ArrayBuffer(2);
        new DataView(buffer).setInt16(0, 256, true);
        return new Int16Array(buffer)[0] === 256;
    })();

    // Default initial vector
    var defaultIV = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

    // Predefined sBox collection
    var sBoxes = {
        'E-DEFAULT': [// This is default S-box in according to draft of new standard
            0xc, 0x4, 0x6, 0x2, 0xa, 0x5, 0xb, 0x9, 0xe, 0x8, 0xd, 0x7, 0x0, 0x3, 0xf, 0x1,
            0x6, 0x8, 0x2, 0x3, 0x9, 0xa, 0x5, 0xc, 0x1, 0xe, 0x4, 0x7, 0xb, 0xd, 0x0, 0xf,
            0xb, 0x3, 0x5, 0x8, 0x2, 0xf, 0xa, 0xd, 0xe, 0x1, 0x7, 0x4, 0xc, 0x9, 0x6, 0x0,
            0xc, 0x8, 0x2, 0x1, 0xd, 0x4, 0xf, 0x6, 0x7, 0x0, 0xa, 0x5, 0x3, 0xe, 0x9, 0xb,
            0x7, 0xf, 0x5, 0xa, 0x8, 0x1, 0x6, 0xd, 0x0, 0x9, 0x3, 0xe, 0xb, 0x4, 0x2, 0xc,
            0x5, 0xd, 0xf, 0x6, 0x9, 0x2, 0xc, 0xa, 0xb, 0x7, 0x8, 0x1, 0x4, 0x3, 0xe, 0x0,
            0x8, 0xe, 0x2, 0x5, 0x6, 0x9, 0x1, 0xc, 0xf, 0x4, 0xb, 0x0, 0xd, 0xa, 0x3, 0x7,
            0x1, 0x7, 0xe, 0xd, 0x0, 0x5, 0x8, 0x3, 0x4, 0xf, 0xa, 0x6, 0x9, 0xc, 0xb, 0x2
        ],
        'E-TEST': [
            0x4, 0x2, 0xF, 0x5, 0x9, 0x1, 0x0, 0x8, 0xE, 0x3, 0xB, 0xC, 0xD, 0x7, 0xA, 0x6,
            0xC, 0x9, 0xF, 0xE, 0x8, 0x1, 0x3, 0xA, 0x2, 0x7, 0x4, 0xD, 0x6, 0x0, 0xB, 0x5,
            0xD, 0x8, 0xE, 0xC, 0x7, 0x3, 0x9, 0xA, 0x1, 0x5, 0x2, 0x4, 0x6, 0xF, 0x0, 0xB,
            0xE, 0x9, 0xB, 0x2, 0x5, 0xF, 0x7, 0x1, 0x0, 0xD, 0xC, 0x6, 0xA, 0x4, 0x3, 0x8,
            0x3, 0xE, 0x5, 0x9, 0x6, 0x8, 0x0, 0xD, 0xA, 0xB, 0x7, 0xC, 0x2, 0x1, 0xF, 0x4,
            0x8, 0xF, 0x6, 0xB, 0x1, 0x9, 0xC, 0x5, 0xD, 0x3, 0x7, 0xA, 0x0, 0xE, 0x2, 0x4,
            0x9, 0xB, 0xC, 0x0, 0x3, 0x6, 0x7, 0x5, 0x4, 0x8, 0xE, 0xF, 0x1, 0xA, 0x2, 0xD,
            0xC, 0x6, 0x5, 0x2, 0xB, 0x0, 0x9, 0xD, 0x3, 0xE, 0x7, 0xA, 0xF, 0x4, 0x1, 0x8
        ],
        'E-A': [
            0x9, 0x6, 0x3, 0x2, 0x8, 0xB, 0x1, 0x7, 0xA, 0x4, 0xE, 0xF, 0xC, 0x0, 0xD, 0x5,
            0x3, 0x7, 0xE, 0x9, 0x8, 0xA, 0xF, 0x0, 0x5, 0x2, 0x6, 0xC, 0xB, 0x4, 0xD, 0x1,
            0xE, 0x4, 0x6, 0x2, 0xB, 0x3, 0xD, 0x8, 0xC, 0xF, 0x5, 0xA, 0x0, 0x7, 0x1, 0x9,
            0xE, 0x7, 0xA, 0xC, 0xD, 0x1, 0x3, 0x9, 0x0, 0x2, 0xB, 0x4, 0xF, 0x8, 0x5, 0x6,
            0xB, 0x5, 0x1, 0x9, 0x8, 0xD, 0xF, 0x0, 0xE, 0x4, 0x2, 0x3, 0xC, 0x7, 0xA, 0x6,
            0x3, 0xA, 0xD, 0xC, 0x1, 0x2, 0x0, 0xB, 0x7, 0x5, 0x9, 0x4, 0x8, 0xF, 0xE, 0x6,
            0x1, 0xD, 0x2, 0x9, 0x7, 0xA, 0x6, 0x0, 0x8, 0xC, 0x4, 0x5, 0xF, 0x3, 0xB, 0xE,
            0xB, 0xA, 0xF, 0x5, 0x0, 0xC, 0xE, 0x8, 0x6, 0x2, 0x3, 0x9, 0x1, 0x7, 0xD, 0x4
        ],
        'E-B': [
            0x8, 0x4, 0xB, 0x1, 0x3, 0x5, 0x0, 0x9, 0x2, 0xE, 0xA, 0xC, 0xD, 0x6, 0x7, 0xF,
            0x0, 0x1, 0x2, 0xA, 0x4, 0xD, 0x5, 0xC, 0x9, 0x7, 0x3, 0xF, 0xB, 0x8, 0x6, 0xE,
            0xE, 0xC, 0x0, 0xA, 0x9, 0x2, 0xD, 0xB, 0x7, 0x5, 0x8, 0xF, 0x3, 0x6, 0x1, 0x4,
            0x7, 0x5, 0x0, 0xD, 0xB, 0x6, 0x1, 0x2, 0x3, 0xA, 0xC, 0xF, 0x4, 0xE, 0x9, 0x8,
            0x2, 0x7, 0xC, 0xF, 0x9, 0x5, 0xA, 0xB, 0x1, 0x4, 0x0, 0xD, 0x6, 0x8, 0xE, 0x3,
            0x8, 0x3, 0x2, 0x6, 0x4, 0xD, 0xE, 0xB, 0xC, 0x1, 0x7, 0xF, 0xA, 0x0, 0x9, 0x5,
            0x5, 0x2, 0xA, 0xB, 0x9, 0x1, 0xC, 0x3, 0x7, 0x4, 0xD, 0x0, 0x6, 0xF, 0x8, 0xE,
            0x0, 0x4, 0xB, 0xE, 0x8, 0x3, 0x7, 0x1, 0xA, 0x2, 0x9, 0x6, 0xF, 0xD, 0x5, 0xC
        ],
        'E-C': [
            0x1, 0xB, 0xC, 0x2, 0x9, 0xD, 0x0, 0xF, 0x4, 0x5, 0x8, 0xE, 0xA, 0x7, 0x6, 0x3,
            0x0, 0x1, 0x7, 0xD, 0xB, 0x4, 0x5, 0x2, 0x8, 0xE, 0xF, 0xC, 0x9, 0xA, 0x6, 0x3,
            0x8, 0x2, 0x5, 0x0, 0x4, 0x9, 0xF, 0xA, 0x3, 0x7, 0xC, 0xD, 0x6, 0xE, 0x1, 0xB,
            0x3, 0x6, 0x0, 0x1, 0x5, 0xD, 0xA, 0x8, 0xB, 0x2, 0x9, 0x7, 0xE, 0xF, 0xC, 0x4,
            0x8, 0xD, 0xB, 0x0, 0x4, 0x5, 0x1, 0x2, 0x9, 0x3, 0xC, 0xE, 0x6, 0xF, 0xA, 0x7,
            0xC, 0x9, 0xB, 0x1, 0x8, 0xE, 0x2, 0x4, 0x7, 0x3, 0x6, 0x5, 0xA, 0x0, 0xF, 0xD,
            0xA, 0x9, 0x6, 0x8, 0xD, 0xE, 0x2, 0x0, 0xF, 0x3, 0x5, 0xB, 0x4, 0x1, 0xC, 0x7,
            0x7, 0x4, 0x0, 0x5, 0xA, 0x2, 0xF, 0xE, 0xC, 0x6, 0x1, 0xB, 0xD, 0x9, 0x3, 0x8
        ],
        'E-D': [
            0xF, 0xC, 0x2, 0xA, 0x6, 0x4, 0x5, 0x0, 0x7, 0x9, 0xE, 0xD, 0x1, 0xB, 0x8, 0x3,
            0xB, 0x6, 0x3, 0x4, 0xC, 0xF, 0xE, 0x2, 0x7, 0xD, 0x8, 0x0, 0x5, 0xA, 0x9, 0x1,
            0x1, 0xC, 0xB, 0x0, 0xF, 0xE, 0x6, 0x5, 0xA, 0xD, 0x4, 0x8, 0x9, 0x3, 0x7, 0x2,
            0x1, 0x5, 0xE, 0xC, 0xA, 0x7, 0x0, 0xD, 0x6, 0x2, 0xB, 0x4, 0x9, 0x3, 0xF, 0x8,
            0x0, 0xC, 0x8, 0x9, 0xD, 0x2, 0xA, 0xB, 0x7, 0x3, 0x6, 0x5, 0x4, 0xE, 0xF, 0x1,
            0x8, 0x0, 0xF, 0x3, 0x2, 0x5, 0xE, 0xB, 0x1, 0xA, 0x4, 0x7, 0xC, 0x9, 0xD, 0x6,
            0x3, 0x0, 0x6, 0xF, 0x1, 0xE, 0x9, 0x2, 0xD, 0x8, 0xC, 0x4, 0xB, 0xA, 0x5, 0x7,
            0x1, 0xA, 0x6, 0x8, 0xF, 0xB, 0x0, 0x4, 0xC, 0x3, 0x5, 0x9, 0x7, 0xD, 0x2, 0xE
        ],
        'E-SC': [
            0x3, 0x6, 0x1, 0x0, 0x5, 0x7, 0xd, 0x9, 0x4, 0xb, 0x8, 0xc, 0xe, 0xf, 0x2, 0xa,
            0x7, 0x1, 0x5, 0x2, 0x8, 0xb, 0x9, 0xc, 0xd, 0x0, 0x3, 0xa, 0xf, 0xe, 0x4, 0x6,
            0xf, 0x1, 0x4, 0x6, 0xc, 0x8, 0x9, 0x2, 0xe, 0x3, 0x7, 0xa, 0xb, 0xd, 0x5, 0x0,
            0x3, 0x4, 0xf, 0xc, 0x5, 0x9, 0xe, 0x0, 0x6, 0x8, 0x7, 0xa, 0x1, 0xb, 0xd, 0x2,
            0x6, 0x9, 0x0, 0x7, 0xb, 0x8, 0x4, 0xc, 0x2, 0xe, 0xa, 0xf, 0x1, 0xd, 0x5, 0x3,
            0x6, 0x1, 0x2, 0xf, 0x0, 0xb, 0x9, 0xc, 0x7, 0xd, 0xa, 0x5, 0x8, 0x4, 0xe, 0x3,
            0x0, 0x2, 0xe, 0xc, 0x9, 0x1, 0x4, 0x7, 0x3, 0xf, 0x6, 0x8, 0xa, 0xd, 0xb, 0x5,
            0x5, 0x2, 0xb, 0x8, 0x4, 0xc, 0x7, 0x1, 0xa, 0x6, 0xe, 0x0, 0x9, 0x3, 0xd, 0xf
        ],
        'E-Z': [// http://www.tc26.ru/methods/recommendation/%D0%A2%D0%9A26%D0%A3%D0%97.pdf
            0x1, 0x8, 0x5, 0x7, 0xc, 0xb, 0x6, 0xc, 0x7, 0xe, 0xd, 0xf, 0x8, 0x3, 0x8, 0x4,
            0xe, 0x2, 0xf, 0x5, 0x2, 0x5, 0x2, 0x6, 0xd, 0x5, 0x6, 0xa, 0x1, 0x8, 0x3, 0x2,
            0x0, 0x6, 0x9, 0x8, 0xd, 0x2, 0x9, 0xa, 0x5, 0x9, 0x2, 0x1, 0x4, 0xf, 0xa, 0x5,
            0x8, 0x1, 0xc, 0x6, 0xf, 0xa, 0x5, 0xb, 0x3, 0xc, 0xa, 0xd, 0x6, 0xd, 0xc, 0x9,
            0x4, 0xf, 0xb, 0x0, 0x7, 0xe, 0x1, 0xe, 0xf, 0x4, 0x7, 0x9, 0x0, 0x1, 0xe, 0x8,
            0xa, 0xb, 0x8, 0x3, 0xa, 0x7, 0x4, 0xd, 0x6, 0x0, 0x1, 0xe, 0x5, 0x4, 0x7, 0x7,
            0x9, 0xd, 0x4, 0xb, 0x3, 0xc, 0xb, 0x0, 0xc, 0xa, 0x3, 0x4, 0xe, 0x9, 0xd, 0x3,
            0xb, 0x3, 0xe, 0x2, 0x9, 0x6, 0x0, 0xf, 0x2, 0x7, 0x0, 0xc, 0xb, 0x0, 0xf, 0x1
        ],
        //S-box for digest
        'D-TEST': [
            0x4, 0xA, 0x9, 0x2, 0xD, 0x8, 0x0, 0xE, 0x6, 0xB, 0x1, 0xC, 0x7, 0xF, 0x5, 0x3,
            0xE, 0xB, 0x4, 0xC, 0x6, 0xD, 0xF, 0xA, 0x2, 0x3, 0x8, 0x1, 0x0, 0x7, 0x5, 0x9,
            0x5, 0x8, 0x1, 0xD, 0xA, 0x3, 0x4, 0x2, 0xE, 0xF, 0xC, 0x7, 0x6, 0x0, 0x9, 0xB,
            0x7, 0xD, 0xA, 0x1, 0x0, 0x8, 0x9, 0xF, 0xE, 0x4, 0x6, 0xC, 0xB, 0x2, 0x5, 0x3,
            0x6, 0xC, 0x7, 0x1, 0x5, 0xF, 0xD, 0x8, 0x4, 0xA, 0x9, 0xE, 0x0, 0x3, 0xB, 0x2,
            0x4, 0xB, 0xA, 0x0, 0x7, 0x2, 0x1, 0xD, 0x3, 0x6, 0x8, 0x5, 0x9, 0xC, 0xF, 0xE,
            0xD, 0xB, 0x4, 0x1, 0x3, 0xF, 0x5, 0x9, 0x0, 0xA, 0xE, 0x7, 0x6, 0x8, 0x2, 0xC,
            0x1, 0xF, 0xD, 0x0, 0x5, 0x7, 0xA, 0x4, 0x9, 0x2, 0x3, 0xE, 0x6, 0xB, 0x8, 0xC
        ],
        'D-A': [
            0xA, 0x4, 0x5, 0x6, 0x8, 0x1, 0x3, 0x7, 0xD, 0xC, 0xE, 0x0, 0x9, 0x2, 0xB, 0xF,
            0x5, 0xF, 0x4, 0x0, 0x2, 0xD, 0xB, 0x9, 0x1, 0x7, 0x6, 0x3, 0xC, 0xE, 0xA, 0x8,
            0x7, 0xF, 0xC, 0xE, 0x9, 0x4, 0x1, 0x0, 0x3, 0xB, 0x5, 0x2, 0x6, 0xA, 0x8, 0xD,
            0x4, 0xA, 0x7, 0xC, 0x0, 0xF, 0x2, 0x8, 0xE, 0x1, 0x6, 0x5, 0xD, 0xB, 0x9, 0x3,
            0x7, 0x6, 0x4, 0xB, 0x9, 0xC, 0x2, 0xA, 0x1, 0x8, 0x0, 0xE, 0xF, 0xD, 0x3, 0x5,
            0x7, 0x6, 0x2, 0x4, 0xD, 0x9, 0xF, 0x0, 0xA, 0x1, 0x5, 0xB, 0x8, 0xE, 0xC, 0x3,
            0xD, 0xE, 0x4, 0x1, 0x7, 0x0, 0x5, 0xA, 0x3, 0xC, 0x8, 0xF, 0x6, 0x2, 0x9, 0xB,
            0x1, 0x3, 0xA, 0x9, 0x5, 0xB, 0x4, 0xF, 0x8, 0x6, 0x7, 0xE, 0xD, 0x0, 0x2, 0xC
        ],
        'D-SC': [
            0xb, 0xd, 0x7, 0x0, 0x5, 0x4, 0x1, 0xf, 0x9, 0xe, 0x6, 0xa, 0x3, 0xc, 0x8, 0x2,
            0x1, 0x2, 0x7, 0x9, 0xd, 0xb, 0xf, 0x8, 0xe, 0xc, 0x4, 0x0, 0x5, 0x6, 0xa, 0x3,
            0x5, 0x1, 0xd, 0x3, 0xf, 0x6, 0xc, 0x7, 0x9, 0x8, 0xb, 0x2, 0x4, 0xe, 0x0, 0xa,
            0xd, 0x1, 0xb, 0x4, 0x9, 0xc, 0xe, 0x0, 0x7, 0x5, 0x8, 0xf, 0x6, 0x2, 0xa, 0x3,
            0x2, 0xd, 0xa, 0xf, 0x9, 0xb, 0x3, 0x7, 0x8, 0xc, 0x5, 0xe, 0x6, 0x0, 0x1, 0x4,
            0x0, 0x4, 0x6, 0xc, 0x5, 0x3, 0x8, 0xd, 0xa, 0xb, 0xf, 0x2, 0x1, 0x9, 0x7, 0xe,
            0x1, 0x3, 0xc, 0x8, 0xa, 0x6, 0xb, 0x0, 0x2, 0xe, 0x7, 0x9, 0xf, 0x4, 0x5, 0xd,
            0xa, 0xb, 0x6, 0x0, 0x1, 0x3, 0x4, 0x7, 0xe, 0xd, 0x5, 0xf, 0x8, 0x2, 0x9, 0xc
        ]
    };

    var C = new Uint8Array([
        0x69, 0x00, 0x72, 0x22, 0x64, 0xC9, 0x04, 0x23,
        0x8D, 0x3A, 0xDB, 0x96, 0x46, 0xE9, 0x2A, 0xC4,
        0x18, 0xFE, 0xAC, 0x94, 0x00, 0xED, 0x07, 0x12,
        0xC0, 0x86, 0xDC, 0xC2, 0xEF, 0x4C, 0xA9, 0x2B
    ]);


    function signed(x) {
        return x >= 0x80000000 ? x - 0x100000000 : x;
    }

    function unsigned(x) {
        return x < 0 ? x + 0x100000000 : x;
    }

    // Set random values into Uint8Arry
    function randomSeed(e) {
        // Random generator
        gostRandom = gostRandom || root.gostRandom;
        if (!gostRandom && rootCrypto && rootCrypto.getRandomValues)
            gostRandom = rootCrypto;
        if (gostRandom)
            gostRandom.getRandomValues(e);
        else
            throw new NotSupportedError('Random generator not found');
    }

    // Get buffer
    function buffer(d) {
        if (d instanceof ArrayBuffer)
            return d;
        else if (d && d.buffer && d.buffer instanceof ArrayBuffer)
            return d.byteOffset === 0 && d.byteLength === d.buffer.byteLength ?
                    d.buffer : new Uint8Array(new Uint8Array(d, d.byteOffset, d.byteLength)).buffer;
        else
            throw new DataError('ArrayBuffer or ArrayBufferView required');
    }

    // Get byte array
    function byteArray(d) {
        return new Uint8Array(buffer(d));
    }

    // Get int32 array
    function intArray(d) {
        return new Int32Array(buffer(d));
    } // </editor-fold>

    /**
     * One GOST encryption round
     * 
     * @memberOf Gost28147
     * @private
     * @instance
     * @method round
     * @param {Int8Array} S sBox
     * @param {Int32Array} m 2x32 bits cipher block 
     * @param {Int32Array} k 8x32 bits key 
     */
    function round(S, m, k) // <editor-fold defaultstate="collapsed">
    {

        var cm = (m[0] + k) & 0xffffffff;

        var om = S[  0 + ((cm >> (0 * 4)) & 0xF)] << (0 * 4);
        om |= S[ 16 + ((cm >> (1 * 4)) & 0xF)] << (1 * 4);
        om |= S[ 32 + ((cm >> (2 * 4)) & 0xF)] << (2 * 4);
        om |= S[ 48 + ((cm >> (3 * 4)) & 0xF)] << (3 * 4);
        om |= S[ 64 + ((cm >> (4 * 4)) & 0xF)] << (4 * 4);
        om |= S[ 80 + ((cm >> (5 * 4)) & 0xF)] << (5 * 4);
        om |= S[ 96 + ((cm >> (6 * 4)) & 0xF)] << (6 * 4);
        om |= S[112 + ((cm >> (7 * 4)) & 0xF)] << (7 * 4);

        cm = om << 11 | om >>> (32 - 11);

        cm ^= m[1];

        m[1] = m[0];
        m[0] = cm;

    } // </editor-fold>
    
    /**
     * Process encrypt/decrypt block with key K using GOST 28147-89
     * 
     * @memberOf Gost28147
     * @private
     * @instance
     * @method process
     * @param e {boolean}  encrypt/decrypt
     * @param s {Int8Array} sBox
     * @param k {Int32Array} 8x32 bits key 
     * @param d {Int32Array} 2x32 bits cipher block 
     */
    function process(e, s, k, d) // <editor-fold defaultstate="collapsed">
    {

        for (var i = 0; i < 8; i++)
            round(s, d, k[i]);
        if (e) {
            for (var i = 0; i < 8; i++)
                round(s, d, k[i]);
            for (var i = 0; i < 8; i++)
                round(s, d, k[i]);
        } else {
            for (var i = 7; i >= 0; i--)
                round(s, d, k[i]);
            for (var i = 7; i >= 0; i--)
                round(s, d, k[i]);
        }
        for (var i = 7; i >= 0; i--)
            round(s, d, k[i]);

        var r = d[0];
        d[0] = d[1];
        d[1] = r;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-ECB<br><br>
     * 
     * encryptECB (K, D) is D, encrypted with key k using GOST 28147-89 in 
     * "prostaya zamena" (ECB) mode. 
     * @memberOf Gost28147
     * @method encrypt
     * @instance
     * @param k {(ArrayBuffer|TypedArray)} 8x32 bit key 
     * @param d {(ArrayBuffer|TypedArray)} 8 bits message
     * @return {ArrayBuffer} result
     */
    function encryptECB(k, d) // <editor-fold defaultstate="collapsed">
    {
        var m = this.padding(d),
                n = m.byteLength / 8,
                key = new Int32Array(buffer(k));

        for (var i = 0; i < n; i++) {
            var msg = new Int32Array(m.buffer, 8 * i, 2);
            process(true, this.sBox, key, msg);
        }
        return m.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-ECB<br><br>
     * 
     * decryptECB (K, D) is D, decrypted with key K using GOST 28147-89 in   
     * ECB mode.
     * 
     * @memberOf Gost28147
     * @method decrypt
     * @instance
     * @param k {(ArrayBuffer|TypedArray)} 8x32 bits key 
     * @param d {(ArrayBuffer|TypedArray)} 8 bits message
     * @return {ArrayBuffer} result
     */
    function decryptECB(k, d) // <editor-fold defaultstate="collapsed">
    {
        var m = this.padding(d),
                n = m.byteLength / 8,
                key = new Int32Array(buffer(k));

        for (var i = 0; i < n; i++) {
            var msg = new Int32Array(m.buffer, 8 * i, 2);
            process(false, this.sBox, key, msg);
        }
        return m.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-CFB<br><br>
     * 
     * encryptCFB (IV, K, D) is D, encrypted with key K using GOST 28147-89   
     * in "gammirovanie s obratnoj svyaziyu" (64-bit CFB) mode, and IV is   
     * used as the initialization vector.
     * 
     * @memberOf Gost28147
     * @method encrypt
     * @instance
     * @param {(ArrayBuffer|TypedArray)} k 8x32 bits key 
     * @param {(ArrayBuffer|TypedArray)} d 8 bits array with data 
     * @param {(ArrayBuffer|TypedArray)} iv 8x8 optional bits initial vector
     * @return {ArrayBuffer} result
     */
    function encryptCFB(k, d, iv) // <editor-fold defaultstate="collapsed">
    {
        var s = new Uint8Array(iv || this.iv || defaultIV),
                m = this.padding(d),
                b = Math.floor(this.shiftBits / 8) || 8,
                n = m.length, r = n % b, q = (n - r) / b,
                key = new Int32Array(intArray(k)),
                syn = new Int32Array(s.buffer);

        for (var i = 0; i < q; i++) {
            if (b === 8) {
                process(true, this.sBox, key, syn);

                var msg = new Int32Array(m.buffer, i * b, 2);
                msg[0] ^= syn[0];
                msg[1] ^= syn[1];

                syn[0] = msg[0];
                syn[1] = msg[1];
            } else {
                var t = new Uint8Array(s);

                process(true, this.sBox, key, syn);

                for (var j = 0; j < b; j++)
                    m[i * b + j] ^= s[j];

                for (var j = 0; j < 8 - b; j++)
                    s[j] = t[b + j];
                for (var j = 0; j < b; j++)
                    s[8 - b + j] = m[i * b + j];
            }

            this.keyMeshing && this.keyMeshing(key, syn, i);
        }

        if (r > 0) {
            process(true, this.sBox, key, syn);

            for (var i = 0; i < r; i++)
                m[q * b + i] ^= s[i];
        }
        return m.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-CFB<br><br>
     * 
     * decryptCFB (IV, K, D) is D, decrypted with key K using GOST 28147-89   
     * in "gammirovanie s obratnoj svyaziyu" (64-bit CFB) mode, and IV is   
     * used as the initialization vector.
     * 
     * @memberOf Gost28147
     * @method decrypt
     * @instance
     * @param {(ArrayBuffer|TypedArray)} k 8x32 bits key 
     * @param {(ArrayBuffer|TypedArray)} d 8 bits array with data 
     * @param {(ArrayBuffer|TypedArray)} iv 8x8 optional bits initial vector
     * @return {ArrayBuffer} result
     */
    function decryptCFB(k, d, iv) // <editor-fold defaultstate="collapsed">
    {
        var s = new Uint8Array(iv || this.iv || defaultIV),
                m = this.padding(d),
                tmp = new Int32Array(2),
                b = Math.floor(this.shiftBits / 8) || 8,
                n = m.length, r = n % b, q = (n - r) / b,
                key = new Int32Array(intArray(k)),
                syn = new Int32Array(s.buffer);

        for (var i = 0; i < q; i++) {
            if (b === 8) {
                process(true, this.sBox, key, syn);

                var msg = new Int32Array(m.buffer, i * b, 2);
                tmp[0] = msg[0];
                tmp[1] = msg[1];

                msg[0] ^= syn[0];
                msg[1] ^= syn[1];

                syn[0] = tmp[0];
                syn[1] = tmp[1];
            } else {
                var t = new Uint8Array(s);

                process(true, this.sBox, key, syn);

                for (var j = 0; j < b; j++) {
                    t[j] = m[i * b + j];
                    m[i * b + j] ^= s[j];
                }

                for (var j = 0; j < 8 - b; j++)
                    s[j] = t[b + j];
                for (var j = 0; j < b; j++)
                    s[8 - b + j] = t[j];
            }

            this.keyMeshing && this.keyMeshing(key, syn, i);
        }

        if (r > 0) {
            process(true, this.sBox, key, syn);

            for (var i = 0; i < r; i++)
                m[q * b + i] ^= s[i];
        }
        return m.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-CNT<br><br>
     * 
     * encryptCNT/decryptCNT (IV, K, D) is D, encrypted with key K using GOST 28147-89   
     * in "gammirovanie" (counter) mode, and IV is used as the   
     * initialization vector.
     * @memberOf Gost28147
     * @method encrypt
     * @instance
     * @param {(ArrayBuffer|TypedArray)} k 8x32 bits key 
     * @param {(ArrayBuffer|TypedArray)} d 8 bits array with data 
     * @param {(ArrayBuffer|TypedArray)} iv 8x8 optional bits initial vector
     * @return {ArrayBuffer} result
     */
    /**
     * Algorithm name GOST 28147-CNT<br><br>
     * 
     * encryptCNT/decryptCNT (IV, K, D) is D, encrypted with key K using GOST 28147-89   
     * in "gammirovanie" (counter) mode, and IV is used as the   
     * initialization vector.
     * @memberOf Gost28147
     * @method decrypt
     * @instance
     * @param {(ArrayBuffer|TypedArray)} k 8x32 bits key 
     * @param {(ArrayBuffer|TypedArray)} d 8 bits array with data 
     * @param {(ArrayBuffer|TypedArray)} iv 8x8 optional bits initial vector
     * @return {ArrayBuffer} result
     */
    function processCNT(k, d, iv) // <editor-fold defaultstate="collapsed">
    {
        var s = new Uint8Array(iv || this.iv || defaultIV),
                m = new this.padding(d),
                tmp = new Int32Array(2),
                n = m.length, r = n % 8, q = (n - r) / 8,
                key = new Int32Array(intArray(k)),
                syn = new Int32Array(s.buffer);

        process(true, this.sBox, key, syn);

        for (var i = 0; i < q; i++) {
            var msg = new Int32Array(m.buffer, i * 8, 2);
            syn[0] = (syn[0] + 0x1010101) & 0xffffffff;
            syn[1] = signed(unsigned((syn[1] + 0x1010104) & 0xffffffff) % 0xffffffff);

            tmp[0] = syn[0];
            tmp[1] = syn[1];

            process(true, this.sBox, key, syn);

            msg[0] ^= syn[0];
            msg[1] ^= syn[1];

            syn[0] = tmp[0];
            syn[1] = tmp[1];

            this.keyMeshing && this.keyMeshing(key, syn, i);
        }
        if (r > 0) {
            syn[0] = (syn[0] + 0x1010101) & 0xffffffff;
            syn[1] = signed(unsigned((syn[1] + 0x1010104) & 0xffffffff) % 0xffffffff);

            process(true, this.sBox, key, syn);

            for (var i = 0; i < r; i++)
                m[q * 8 + i] ^= s[i];
        }
        return m.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-CBC<br><br>
     * 
     * encryptCBC (IV, K, D) is D, encrypted with key K using GOST 28147-89   
     * in Cipher-Block-Chaining (CBC) mode and IV is used as the initialization 
     * vector.
     * 
     * @memberOf Gost28147
     * @method encrypt
     * @instance
     * @param {(ArrayBuffer|TypedArray)} k 8x32 bits key 
     * @param {(ArrayBuffer|TypedArray)} d 8 bits array with data 
     * @param {(ArrayBuffer|TypedArray)} iv 8x8 optional bits initial vector
     * @return {ArrayBuffer} result
     */
    function encryptCBC(k, d, iv) // <editor-fold defaultstate="collapsed">
    {
        var s = new Uint8Array(iv || this.iv || defaultIV),
                m = this.padding(d),
                key = new Int32Array(intArray(k)),
                syn = new Int32Array(s.buffer);

        for (var i = 0, n = m.length / 8; i < n; i++) {
            var msg = new Int32Array(m.buffer, i * 8, 2);

            syn[0] ^= msg[0];
            syn[1] ^= msg[1];

            process(true, this.sBox, key, syn);

            msg[0] = syn[0];
            msg[1] = syn[1];

            this.keyMeshing && this.keyMeshing(key, syn, i);
        }

        return m.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-CBC<br><br>
     * 
     * decryptCBC (IV, K, D) is D, decrypted with key K using GOST 28147-89   
     * in Cipher-Block-Chaining (CBC) mode and IV is used as the initialization 
     * vector.
     * 
     * @memberOf Gost28147
     * @method decrypt
     * @instance
     * @param {(ArrayBuffer|TypedArray)} k 8x32 bits key 
     * @param {(ArrayBuffer|TypedArray)} d 8 bits array with data 
     * @param {(ArrayBuffer|TypedArray)} iv 8x8 optional bits initial vector
     * @return {ArrayBuffer} result
     */
    function decryptCBC(k, d, iv) // <editor-fold defaultstate="collapsed">
    {
        var s = new Uint8Array(iv || this.iv || defaultIV),
                m = this.padding(d),
                next = new Int32Array(2),
                key = new Int32Array(intArray(k)),
                syn = new Int32Array(s.buffer);

        for (var i = 0, n = m.length / 8; i < n; i++) {
            var msg = new Int32Array(m.buffer, i * 8, 2);

            next[0] = msg[0];
            next[1] = msg[1];

            process(false, this.sBox, key, msg);

            msg[0] ^= syn[0];
            msg[1] ^= syn[1];

            syn[0] = next[0];
            syn[1] = next[1];

            this.keyMeshing && this.keyMeshing(key, syn, i);
        }

        return m.buffer;
    } // </editor-fold>

    /**
     * The generateKey method returns a new generated key.
     * 
     * @memberOf Gost28147
     * @method generateKey
     * @instance
     * @return {ArrayBuffer} result
     */

    function generateKey() // <editor-fold defaultstate="collapsed">
    {
        // Simple generate 256 bit random seed
        var k = new Uint8Array(this.bitLength / 8);
        randomSeed(k);
        return k.buffer;
    } // </editor-fold>

    /**
     * makeIMIT (K, D) is the 32-bit result of the GOST 28147-89 in   
     * "imitovstavka" (MAC) mode, used with D as plaintext, K as key and IV   
     * as initialization vector.  Note that the standard specifies its use   
     * in this mode only with an initialization vector of zero.
     * 
     * @memberOf Gost28147
     * @method sign
     * @instance
     * @param {(ArrayBuffer|TypedArray)} k 8x32 bits key 
     * @param {(ArrayBuffer|TypedArray)} d 8 bits array with data 
     * @param {(ArrayBuffer|TypedArray)} iv 8x8 optional bits initial vector
     * @return {ArrayBuffer} result
     */
    function signIMIT(k, d, iv) // <editor-fold defaultstate="collapsed">
    {
        var s = new Uint8Array(iv || this.iv || defaultIV), m = byteArray(d),
                n = m.length, r = n % 8, q = (n - r) / 8,
                key = new Int32Array(intArray(k)),
                sum = new Int32Array(s.buffer),
                sBox = this.sBox;

        // Complete block loop
        for (var j = 0; j < q; j++) {
            var msg = new Int32Array(m.buffer, j * 8, 2);
            sum[0] = sum[0] ^ msg[0];
            sum[1] = sum[1] ^ msg[1];

            for (var i = 0; i < 8; i++) // 1-16 steps
                round(sBox, sum, key[i]);
            for (var i = 0; i < 8; i++)
                round(sBox, sum, key[i]);

            this.keyMeshing && this.keyMeshing(key, sum, i);
        }

        // Remider with padding zero
        if (r > 0) {
            for (var i = 0; i < r; i++) {
                s[i] = s[i] ^ m[q * 8 + i];
            }
            for (var i = 0; i < 8; i++) // 1-16 steps
                round(sBox, sum, key[i]);
            for (var i = 0; i < 8; i++)
                round(sBox, sum, key[i]);
        }

        var len = Math.ceil(this.macLength / 8) || 4,
                mac = new Uint8Array(len); // mac size
        mac.set(new Uint8Array(s.buffer, 4 - len, len));
        return mac.buffer;
    } // </editor-fold>

    /**
     * verifyIMIT (K, D) is the 32-bit result of the GOST 28147-89 in   
     * "imitovstavka" (MAC) mode, used with D as plaintext, K as key and IV   
     * as initialization vector.  Note that the standard specifies its use   
     * in this mode only with an initialization vector of zero.
     * 
     * @memberOf Gost28147
     * @method verify
     * @instance
     * @param {(ArrayBuffer|TypedArray)} k 8x32 bits key 
     * @param {(ArrayBuffer|TypedArray)} m 8 bits array with signature
     * @param {(ArrayBuffer|TypedArray)} d 8 bits array with data 
     * @param {(ArrayBuffer|TypedArray)} iv 8x8 optional bits initial vector
     * @return {boolen} MAC verified = true
     */
    function verifyIMIT(k, m, d, iv) // <editor-fold defaultstate="collapsed">
    {
        var mac = new Uint8Array(signIMIT.call(this, k, d, iv)),
                test = new byteArray(m);
        if (mac.length !== test.length)
            return false;
        for (var i = 0, n = mac.length; i < n; i++)
            if (mac[i] !== test[i])
                return false;
        return true;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-KW<br><br>
     * 
     * This algorithm encrypts GOST 28147-89 CEK with a GOST 28147-89 KEK.
     * Ref. rfc4357 6.1 GOST 28147-89 Key Wrap
     * Note: This algorithm MUST NOT be used with a KEK produced by VKO GOST   
     * R 34.10-94, because such a KEK is constant for every sender-recipient   
     * pair.  Encrypting many different content encryption keys on the same   
     * constant KEK may reveal that KEK.
     * 
     * @memberOf Gost28147
     * @method wrapKey
     * @instance
     * @param {(ArrayBuffer|TypedArray)} kek Key encryption key
     * @param {(ArrayBuffer|TypedArray)} cek Content encryption key
     * @param {(ArrayBuffer|TypedArray)} ukm Random generated value
     * @returns {ArrayBuffer} Encrypted cek
     */
    function wrapKeyGOST(kek, cek, ukm) // <editor-fold defaultstate="collapsed">
    {
        // 1) For a unique symmetric KEK, generate 8 octets at random and call 
        // the result UKM.  For a KEK, produced by VKO GOST R 34.10-2001, use 
        // the UKM that was used for key derivation.    
        if (!ukm) {
            if (this.ukm)
                ukm = new Uint8Array(this.ukm);
            else
                randomSeed(ukm = new Uint8Array(8));
        }
        // 2) Compute a 4-byte checksum value, gost28147IMIT (UKM, KEK, CEK).       
        // Call the result CEK_MAC. 
        var mac = signIMIT.call(this, kek, cek, ukm);
        // 3) Encrypt the CEK in ECB mode using the KEK.  Call the ciphertext CEK_ENC.
        var enc = encryptECB.call(this, kek, cek);
        // 4) The wrapped content-encryption key is (UKM | CEK_ENC | CEK_MAC).
        var r = new Uint8Array(44);
        r.set(new Uint8Array(ukm));
        r.set(new Uint8Array(enc), 8);
        r.set(new Uint8Array(mac), 40);
        return r.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-KW<br><br>
     * 
     *  This algorithm decrypts GOST 28147-89 CEK with a GOST 28147-89 KEK.
     *  Ref. rfc4357 6.2 GOST 28147-89 Key Unwrap
     *  
     * @memberOf Gost28147
     * @method unwrapKey
     * @instance
     * @param {type} kek Key encryption key
     * @param {type} data Content encryption key
     * @return {ArrayBuffer} result
     */
    function unwrapKeyGOST(kek, data) // <editor-fold defaultstate="collapsed">
    {
        // 1) If the wrapped content-encryption key is not 44 octets, then error.
        var d = buffer(data);
        if (d.byteLength !== 44)
            throw new DataError('Wrapping key size must be ' + 44 + ' bytes');
        // 2) Decompose the wrapped content-encryption key into UKM, CEK_ENC, and CEK_MAC.  
        // UKM is the most significant (first) 8 octets. CEK_ENC is next 32 octets, 
        // and CEK_MAC is the least significant (last) 4 octets.    
        var ukm = new Uint8Array(d, 0, 8),
                enc = new Uint8Array(d, 8, 32),
                mac = new Uint8Array(d, 40, 4);
        // 3) Decrypt CEK_ENC in ECB mode using the KEK.  Call the output CEK.
        var cek = decryptECB.call(this, kek, enc);
        // 4) Compute a 4-byte checksum value, gost28147IMIT (UKM, KEK, CEK), 
        // compare the result with CEK_MAC.  If they are not equal, then error.
        var check = verifyIMIT.call(this, kek, mac, cek, ukm);
        if (!check)
            throw new DataError('Error verify MAC of wrapping key');

        return cek;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-CPKW<br><br>
     * 
     * Given a random 64-bit UKM and a GOST 28147-89 key K, this algorithm   
     * creates a new GOST 28147-89 key K(UKM).
     * Ref. rfc4357 6.3 CryptoPro KEK Diversification Algorithm
     * 
     * @memberOf Gost28147
     * @method diversify
     * @instance
     * @private
     * @param {(ArrayBuffer|TypedArray)} kek Key encryption key
     * @param {(ArrayBuffer|TypedArray)} ukm Random generated value
     * @returns {ArrayBuffer} Diversified kek
     */
    function diversifyKEK(kek, ukm) // <editor-fold defaultstate="collapsed">
    {

        // 1) Let K[0] = K;    
        var k = intArray(kek);
        // 2) UKM is split into components a[i,j]:       
        //    UKM = a[0]|..|a[7] (a[i] - byte, a[i,0]..a[i,7] - it’s bits) 
        var a = [];
        for (var i = 0; i < 8; i++) {
            a[i] = [];
            for (var j = 0; j < 8; j++) {
                a[i][j] = (ukm[i] >>> j) & 0x1;
            }
        }
        // 3) Let i be 0.    
        // 4) K[1]..K[8] are calculated by repeating the following algorithm       
        //    eight times:     
        for (var i = 0; i < 8; i++) {
            //     A) K[i] is split into components k[i,j]:
            //        K[i] = k[i,0]|k[i,1]|..|k[i,7] (k[i,j] - 32-bit integer)
            //     B) Vector S[i] is calculated:        
            //        S[i] = ((a[i,0]*k[i,0] + ... + a[i,7]*k[i,7]) mod 2^32) |        
            //         (((~a[i,0])*k[i,0] + ... + (~a[i,7])*k[i,7]) mod 2^32);     
            var s = new Int32Array(2);
            for (var j = 0; j < 8; j++) {
                if (a[i][j])
                    s[0] = (s[0] + k[j]) & 0xffffffff;
                else
                    s[1] = (s[1] + k[j]) & 0xffffffff;
            }
            //     C) K[i+1] = encryptCFB (S[i], K[i], K[i])
            var iv = new Uint8Array(s.buffer);
            k = encryptCFB.call(this, k, k, iv);
            //     D) i = i + 1
        }
        // 5) Let K(UKM) be K[8].
        return k;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-CPKW<br><br>
     * 
     * This algorithm encrypts GOST 28147-89 CEK with a GOST 28147-89 KEK.   
     * It can be used with any KEK (e.g., produced by VKO GOST R 34.10-94 or   
     * VKO GOST R 34.10-2001) because a unique UKM is used to diversify the KEK.
     * Ref. rfc4357 6.3  CryptoPro Key Wrap
     * 
     * @memberOf Gost28147
     * @method wrapKey
     * @instance
     * @param {(ArrayBuffer|TypedArray)} kek Key encryption key
     * @param {(ArrayBuffer|TypedArray)} cek Content encryption key
     * @param {(ArrayBuffer|TypedArray)} ukm Random generated value
     * @returns {ArrayBuffer} Encrypted cek
     */
    function wrapKeyCP(kek, cek, ukm) // <editor-fold defaultstate="collapsed">
    {
        // 1) For a unique symmetric KEK or a KEK produced by VKO GOST R       
        // 34.10-94, generate 8 octets at random.  Call the result UKM.  For       
        // a KEK, produced by VKO GOST R 34.10-2001, use the UKM that was       
        // used for key derivation.
        if (!ukm) {
            if (this.ukm)
                ukm = new Uint8Array(this.ukm);
            else
                randomSeed(ukm = new Uint8Array(8));
        }
        // 2) Diversify KEK, using the CryptoPro KEK Diversification Algorithm,       
        // described in Section 6.5.  Call the result KEK(UKM).
        var dek = diversifyKEK.call(this, kek, ukm);
        // 3) Compute a 4-byte checksum value, gost28147IMIT (UKM, KEK(UKM),       
        // CEK).  Call the result CEK_MAC.    
        var mac = signIMIT.call(this, kek, cek, ukm);
        // 4) Encrypt CEK in ECB mode using KEK(UKM).  Call the ciphertext       
        // CEK_ENC.    
        var enc = encryptECB.call(this, dek, cek);
        // 5) The wrapped content-encryption key is (UKM | CEK_ENC | CEK_MAC).
        var r = new Uint8Array(44);
        r.set(new Uint8Array(ukm));
        r.set(new Uint8Array(enc), 8);
        r.set(new Uint8Array(mac), 40);
        return r.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-CPKW<br><br>
     * 
     * This algorithm encrypts GOST 28147-89 CEK with a GOST 28147-89 KEK. 
     * Ref. rfc4357 6.4 CryptoPro Key Unwrap
     *
     * @memberOf Gost28147
     * @method unwrapKey
     * @instance
     * @param {(ArrayBuffer|TypedArray)} kek Key encryption key
     * @param {(ArrayBuffer|TypedArray)} data Encrypted content encryption keu
     * @return {ArrayBuffer} result Decrypted content encryption keu
     */
    function unwrapKeyCP(kek, data) // <editor-fold defaultstate="collapsed">
    {
        // 1) If the wrapped content-encryption key is not 44 octets, then error.    
        var d = buffer(data);
        if (d.byteLength !== 44)
            throw new DataError('Wrapping key size must be ' + 44 + ' bytes');
        // 2) Decompose the wrapped content-encryption key into UKM, CEK_ENC,       
        // and CEK_MAC.  UKM is the most significant (first) 8 octets.       
        // CEK_ENC is next 32 octets, and CEK_MAC is the least significant       
        // (last) 4 octets.    
        var ukm = new Uint8Array(d, 0, 8),
                enc = new Uint8Array(d, 8, 32),
                mac = new Uint8Array(d, 40, 4);
        // 3) Diversify KEK using the CryptoPro KEK Diversification Algorithm,       
        // described in section 6.5.  Call the result KEK(UKM).    
        var dek = diversifyKEK.call(this, kek, ukm);
        // 4) Decrypt CEK_ENC in ECB mode using KEK(UKM).  Call the output CEK.    
        var cek = decryptECB.call(this, dek, enc);
        // 5) Compute a 4-byte checksum value, gost28147IMIT (UKM, KEK(UKM),       
        // CEK), compare the result with CEK_MAC.  If they are not equal, 
        // then it is an error.
        var check = verifyIMIT.call(this, kek, mac, cek, ukm);
        if (!check)
            throw new DataError('Error verify MAC of wrapping key');
        return cek;
    } // </editor-fold>

    /**
     * SignalCom master key packing algorithm
     * 
     * kek stored in 3 files - kek.opq, mk.db3, masks.db3
     * kek.opq - always 36 bytes length = 32 bytes encrypted kek + 4 bytes mac of decrypted kek
     * mk.db3 - 6 bytes header (1 byte magic code 0x22 + 1 byte count of masks + 4 bytes mac of 
     * xor summarizing masks value) + attached masks 
     * masks.db3 - detached masks. 
     * Total length  of attached + detached masks = 32 bits * count of masks
     * Default value of count 8 = (7 attached + 1 detached). But really no reason for such 
     * separation - all masks xor summarizing - order is not matter.
     * Content of file rand.opq can used as ukm. Don't forget change file content after using. 
     * 
     * For usb-token files has names: 
     * a001 - mk.db3, b001 - masks.db3, c001 - kek.opq, d001 - rand.opq
     * 
     * @memberOf Gost28147
     * @method packKey
     * @instance
     * @private
     * @param {(ArrayBuffer|TypedArray)} unpacked - clear main key 32 bytes
     * @param {(ArrayBuffer|TypedArray)} ukm - random vector for packing - 32 bits * (count of masks - 1)
     * @returns {ArrayBuffer} packed master key - concatination of mk.db3 + masks.db3
     */
    function packKeySC(unpacked, ukm) // <editor-fold defaultstate="collapsed">
    {
        var mcount = 8;
        var key = new Uint8Array(buffer(unpacked));
        if (key.byteLength !== 32)
            throw new DataError('Wrong cleartext size ' + k.byteLength + ' bytes');
        // Check or generate UKM
        if (ukm) {
            ukm = new Uint8Array(buffer(ukm));
            if (ukm.byteLength > 0 && ukm.byteLength % 32 === 0)
                mcount = ukm.byteLength / 32 + 1;
            else
                throw new DataError('Wrong rand size ' + ukm.byteLength + ' bytes');
        } else
            randomSeed(ukm = new Uint8Array((mcount - 1) * 32));
        // Output array
        var d = new Uint8Array(mcount * 32 + 6), b = mask.buffer;
        // Calculate MAC
        var zero32 = new Uint8Array(32);
        var mac = signIMIT.call(this, key, zero32);
        d[0] = 0x22; // Magic code
        d[1] = mcount; // Count of masks
        d.set(mac, 2);
        d.set(ukm, 38);
        for (var i = 1; i < mcount; i++) {
            var mask = new Uint8Array(b, 6 + 32 * i);
            for (var j = 0; j < 32; j++)
                key[j] ^= mask[j];
        }
        d.set(key, 6);
        return d.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-SCKW<br><br>
     * 
     * SignalCom master key unpacking algorithm
     * 
     * @memberOf Gost28147
     * @method unpackKey
     * @instance
     * @private
     * @param {(ArrayBuffer|TypedArray)} packed - concatination of mk.db3 + masks.db3
     * @returns {ArrayBuffer} unpacked master key
     */
    function unpackKeySC(packed) // <editor-fold defaultstate="collapsed">
    {
        var b = buffer(packed);
        // Unpack master key
        var magic = new Uint8Array(b, 0, 1)[0];
        if (magic !== 0x22)
            throw new DataError('Invalid magic number');
        var mcount = new Uint8Array(b, 1, 1)[0];
        var mac = new Uint8Array(b, 2, 4); // MAC for summarized mask
        // Compute packKey xor summing for all masks
        var key = new Uint8Array(32);
        for (var i = 0; i < mcount; i++) {
            var mask = new Uint8Array(b, 6 + 32 * i, 32);
            for (var j = 0; j < 32; j++)
                key[j] ^= mask[j];
        }
        // Test MAC for packKey with default sBox on zero 32 bytes array
        var zero32 = new Uint8Array(32);
        var test = verifyIMIT.call(this, key, mac, zero32);
        if (!test) {
            // Try to use different sBoxes
            var names = ['E-A', 'E-B', 'E-C', 'E-D', 'E-SC', 'D-A', 'D-SC', 'D-TEST', 'E-Z', 'E-DEFAULT', 'E-TEST'];
            for (var i = 0, n = names.length; i < n; i++) {
                this.sBox = sBoxes[names[i]];
                test = verifyIMIT.call(this, key, mac, zero32);
                if (test)
                    break;
            }
        }
        if (!test)
            throw new DataError('Invalid main key MAC');
        return key.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-SCKW<br><br>
     * 
     * SignalCom Key Wrapping algorithm
     * 
     * @memberOf Gost28147
     * @method wrapKey
     * @instance
     * @param {type} kek - clear kek or concatination of mk.db3 + masks.db3
     * @param {type} cek - key for wrapping 
     * @returns {ArrayBuffer} wrapped key - file kek.opq
     */
    function wrapKeySC(kek, cek) // <editor-fold defaultstate="collapsed">
    {
        var k = buffer(kek);
        var c = buffer(cek);
        if (k.byteLength !== 32)
            k = unpackKeySC.call(this, k);
        var enc = encryptECB.call(this, k, c);
        var mac = signIMIT.call(this, k, c);
        var d = new Uint8Array(36);
        d.set(new Uint8Array(enc), 0);
        d.set(new Uint8Array(mac), 32);
        return d.buffer;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-SCKW<br><br>
     * 
     * SignalCom Key UnWrapping algorithm
     * 
     * @memberOf Gost28147
     * @method unwrapKey
     * @instance
     * @param {type} kek - concatination of files mk.db3 + masks.db3 or clear kek 
     * @param {type} cek - wrapping key - file kek.opq
     * @return {ArrayBuffer} result
     */
    function unwrapKeySC(kek, cek) // <editor-fold defaultstate="collapsed">
    {
        var k = buffer(kek);
        var c = buffer(cek);
        if (k.byteLength !== 32)
            k = unpackKeySC.call(this, k);
        var enc = new Uint8Array(c, 0, 32); // Encrypted kek
        var mac = new Uint8Array(c, 32, 4); // MAC for clear kek
        var d = decryptECB.call(this, k, enc);
        if (!verifyIMIT.call(this, k, mac, d))
            throw new DataError('Invalid key MAC');
        return d;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-SCKW<br><br>
     * 
     * SignalCom master key generation for wrapping
     * 
     * @memberOf Gost28147
     * @method generateKey
     * @instance
     * @return {ArrayBuffer} result
     */
    function generateWrappingKeySC() // <editor-fold defaultstate="collapsed">
    {
        return packKeySC.call(this, generateKey.call(this));
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-CPKM<br><br>
     * 
     * Key meshing in according to rfc4357 2.3.2. CryptoPro Key Meshing
     * 
     * @memberOf Gost28147
     * @method keyMeshing
     * @instance
     * @private
     * @param {(ArrayBuffer|TypedArray)} k 8x32 bit key array
     * @param {(ArrayBuffer|TypedArray)} s 8x32 bit sync array (iv)
     * @param {Integer} i block index
     */
    function keyMeshingCP(k, s, i) // <editor-fold defaultstate="collapsed">
    {
        if (i % 256 === 0) { // every 256 blocks
            var k1 = new Int32Array(decryptECB.call(this, k, C));
            var s1 = new Int32Array(encryptECB.call(this, k1, s));
            k.set(k1);
            s.set(s1);
        }
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-NoPadding<br><br>
     * 
     * No padding.
     * 
     * @memberOf Gost28147
     * @method padding
     * @instance
     * @private
     * @param {(ArrayBuffer|TypedArray)} d array with source data
     * @returns {Uint8Array} result
     */
    function noPadding(d) // <editor-fold defaultstate="collapsed">
    {
        var r = new Uint8Array(d.byteLength);
        r.set(byteArray(d));
        return r;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-PKCS5Padding<br><br>
     * 
     *  PKCS#5 padding: 8-x remaining bytes are filled with the value of      
     *  8-x.  If there’s no incomplete block, one extra block filled with      
     *  value 8 is added
     * 
     * @memberOf Gost28147
     * @method padding
     * @instance
     * @private
     * @param {(ArrayBuffer|TypedArray)} d array with source data
     * @returns {Uint8Array} result
     */
    function pkcs5Padding(d) // <editor-fold defaultstate="collapsed">
    {
        var n = d.byteLength, q = 8 - n % 8, m = Math.ceil(n / 8) * 8,
                r = new Uint8Array(m);
        r.set(byteArray(d));
        for (var i = n; i < m; i++)
            r[i] = q;
        return r;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-ZeroPadding<br><br>
     * 
     * Zero padding: 8-x remaining bytes are filled with zero
     * 
     * @memberOf Gost28147
     * @method padding
     * @instance
     * @private
     * @param {(ArrayBuffer|TypedArray)} d array with source data
     * @returns {Uint8Array} result
     */
    function zeroPadding(d) // <editor-fold defaultstate="collapsed">
    {
        var n = d.byteLength, m = Math.ceil(n / 8) * 8, r = new Uint8Array(m);
        r.set(byteArray(d));
        for (var i = n; i < m; i++)
            r[i] = 0;
        return r;
    } // </editor-fold>

    /**
     * Algorithm name GOST 28147-RandomPadding<br><br>
     * 
     * Random padding: 8-x remaining bytes of the last block are set to      
     * random.
     * 
     * @memberOf Gost28147
     * @method padding
     * @instance
     * @private
     * @param {(ArrayBuffer|TypedArray)} d array with source data
     * @returns {Uint8Array} result
     */
    function randomPadding(d) // <editor-fold defaultstate="collapsed">
    {
        var n = d.byteLength, q = 8 - n % 8, m = Math.ceil(n / 8) * 8,
                r = new Uint8Array(m), e = new Uint8Array(r.buffer, n, q);
        r.set(byteArray(d));
        randomSeed(e);
        return r;
    } // </editor-fold>

    /**
     * GOST 28147-89 Encryption Algorithm<br><br> 
     * 
     * References {@link http://tools.ietf.org/html/rfc5830}<br><br>
     * 
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
     * @class Gost28147
     * @param {AlgorithmIndentifier} algorithm WebCryptoAPI algorithm identifier
     */
    function Gost28147(algorithm) // <editor-fold defaultstate="collapsed">
    {
        // Check little endian support
        if (!littleEndian)
            throw new NotSupportedError('Big endian platform not supported');

        algorithm = algorithm || {};

        this.bitLength = algorithm.length || 256;
        this.blockLength = this.bitLength / 4;

        this.name = (algorithm.name || 'GOST 28147') + '-' + ((algorithm.version || 1989) % 100) + '-' +
                ((algorithm.mode === 'MAC') ? 'MAC-' + (algorithm.macLength || this.bitLength / 8) :
                        (algorithm.mode === 'KW' || algorithm.keyWrapping) ?
                        ((algorithm.keyWrapping || 'NO') !== 'NO' ? algorithm.keyWrapping : '') + 'KW' :
                        (algorithm.block || 'ECB') + (algorithm.block === 'CFB' ?
                        ('-' + (algorithm.shiftBits || this.blockLength)) : '') +
                        (algorithm.padding ? '-' + (algorithm.padding || (algorithm.block === 'CNT' ||
                                algorithm.block === 'CFB' ? 'NO' : 'ZERO')) + 'PADDING' : '') +
                        ((algorithm.keyMeshing || 'NO') !== 'NO' ? '-CPKEYMESHING' : '')) +
                (typeof algorithm.sBox === 'string' ? '/' + algorithm.sBox : '');

        switch (algorithm.version || 1989) {
            case 1989:
                break;
            default:
                throw new NotSupportedError('Algorithm version ' + algorithm.version + ' not supported');
        }

        switch (algorithm.mode || (algorithm.keyWrapping && 'KW') || 'ES') {

            case 'ES':
                switch (algorithm.block || 'ECB') {
                    case 'ECB':
                        this.encrypt = encryptECB;
                        this.decrypt = decryptECB;
                        break;
                    case 'CNT':
                        this.encrypt = processCNT;
                        this.decrypt = processCNT;
                        break
                    case 'CBC':
                        this.encrypt = encryptCBC;
                        this.decrypt = decryptCBC;
                        break
                    case 'CFB':
                        this.encrypt = encryptCFB;
                        this.decrypt = decryptCFB;
                        this.shiftBits = algorithm.shiftBits || this.blockLength;
                        break;
                    default:
                        throw new NotSupportedError('Block mode ' + algorithm.block + ' not supported');
                }
                switch (algorithm.keyMeshing) {
                    case 'CP':
                        this.keyMeshing = keyMeshingCP;
                }
                switch (algorithm.padding) {
                    case 'PKCS5P':
                        this.padding = pkcs5Padding;
                        break;
                    case 'ZERO':
                        this.padding = zeroPadding;
                        break;
                    case 'RANDOM':
                        this.padding = randomPadding;
                        break;
                    default:
                        if (this.encrypt === encryptCFB || this.encrypt === processCNT)
                            this.padding = noPadding;
                        else
                            this.padding = zeroPadding;
                }
                this.generateKey = generateKey;
                break;
            case 'MAC':
                this.sign = signIMIT;
                this.verify = verifyIMIT;
                this.generateKey = generateKey;
                this.macLength = algorithm.macLength || (this.bitLength / 8);
                break;
            case 'KW':
                this.padding = noPadding;
                switch (algorithm.keyWrapping) {
                    case 'CP':
                        this.wrapKey = wrapKeyCP;
                        this.unwrapKey = unwrapKeyCP;
                        this.generateKey = generateKey;
                        break;
                    case 'SC':
                        this.wrapKey = wrapKeySC;
                        this.unwrapKey = unwrapKeySC;
                        this.generateKey = generateWrappingKeySC;
                        break;
                    default:
                        this.wrapKey = wrapKeyGOST;
                        this.unwrapKey = unwrapKeyGOST;
                }
                break;
            default:
                throw new NotSupportedError('Mode ' + algorithm.mode + ' not supported');

        }

        // Define sBox parameter
        var sBox = algorithm.sBox, sBoxName;
        if (!sBox)
            sBox = sBoxes['E-DEFAULT'];
        else if (typeof sBox === 'string') {
            sBoxName = sBox.toUpperCase();
            sBox = sBoxes[sBoxName];
            if (!sBox)
                throw new SyntaxError('Unknown sBox name: ' + algorithm.sBox);
        } else if (!sBox.length || sBox.length !== sBoxes['E-DEFAULT'].length)
            throw new SyntaxError('Length of sBox must be ' + sBoxes['E-DEFAULT'].length);
        this.sBox = sBox;

        // Initial vector
        if (algorithm.iv) {
            this.iv = new Uint8Array(algorithm.iv);
            if (this.iv.byteLength !== this.blockLength / 8)
                throw new SyntaxError('Length of iv must be ' + this.blockLength + ' bits');
        }

        // User key material
        if (algorithm.ukm) {
            this.ukm = new Uint8Array(algorithm.ukm);
            if (this.ukm.byteLength !== this.blockLength / 8)
                throw new SyntaxError('Length of ukm must be ' + this.blockLength + ' bits');
        }
    } // </editor-fold>

    return Gost28147;

}));

