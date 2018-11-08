(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["crypto-gost-js"] = factory();
	else
		root["crypto-gost-js"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotSupportedError = exports.NotSupportedError = function (_Error) {
  _inherits(NotSupportedError, _Error);

  function NotSupportedError() {
    _classCallCheck(this, NotSupportedError);

    return _possibleConstructorReturn(this, (NotSupportedError.__proto__ || Object.getPrototypeOf(NotSupportedError)).apply(this, arguments));
  }

  return NotSupportedError;
}(Error);

var DataError = exports.DataError = function (_Error2) {
  _inherits(DataError, _Error2);

  function DataError() {
    _classCallCheck(this, DataError);

    return _possibleConstructorReturn(this, (DataError.__proto__ || Object.getPrototypeOf(DataError)).apply(this, arguments));
  }

  return DataError;
}(Error);

var OperationError = exports.OperationError = function (_Error3) {
  _inherits(OperationError, _Error3);

  function OperationError() {
    _classCallCheck(this, OperationError);

    return _possibleConstructorReturn(this, (OperationError.__proto__ || Object.getPrototypeOf(OperationError)).apply(this, arguments));
  }

  return OperationError;
}(Error);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSeed = getSeed;
exports.randomSeed = randomSeed;

var _gostRandom = __webpack_require__(8);

// Get random values
function getSeed(length) {
    var gostRandom = new _gostRandom.GostRandom();
    try {
        var d = new Uint8Array(Math.ceil(length / 8));
        gostRandom.getRandomValues(d);
        return d;
    } catch (e) {
        throw new Error('Error occurred during random values generation');
    }
}

// Set random values into Uint8Arry
// Random generator
function randomSeed(e) {
    try {
        var gostRandom = new _gostRandom.GostRandom();
        return gostRandom.getRandomValues(e);
    } catch (e) {
        throw new Error('Error occurred during random values generation');
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gostCodingInstance = undefined;
exports.GostCoding = GostCoding;

var _errors = __webpack_require__(0);

/**
 * The Coding interface provides string converting methods: Base64, Hex,
 * Int16, Chars, BER and PEM
 * @class GostCoding
 *
 */ // <editor-fold defaultstate="collapsed">

var CryptoOperationData = ArrayBuffer; /**
                                        * @file Coding algorithms: Base64, Hex, Int16, Chars, BER and PEM
                                        * @version 1.76
                                        * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
                                        */

function buffer(d) {
    if (d instanceof CryptoOperationData) return d;else if (d && d.buffer && d.buffer instanceof CryptoOperationData) return d.byteOffset === 0 && d.byteLength === d.buffer.byteLength ? d.buffer : new Uint8Array(new Uint8Array(d, d.byteOffset, d.byteLength)).buffer;else throw new _errors.DataError('CryptoOperationData required');
} // </editor-fold>

function GostCoding() {}

/**
 * BASE64 conversion
 *
 * @class GostCoding.Base64
 */
var Base64 = { // <editor-fold defaultstate="collapsed">
    /**
     * Base64.decode convert BASE64 string s to CryptoOperationData
     *
     * @memberOf GostCoding.Base64
     * @param {String} s BASE64 encoded string value
     * @returns {CryptoOperationData} Binary decoded data
     */
    decode: function decode(s) {
        s = s.replace(/[^A-Za-z0-9\+\/]/g, '');
        var n = s.length,
            k = n * 3 + 1 >> 2,
            r = new Uint8Array(k);

        for (var m3, m4, u24 = 0, j = 0, i = 0; i < n; i++) {
            m4 = i & 3;
            var c = s.charCodeAt(i);

            c = c > 64 && c < 91 ? c - 65 : c > 96 && c < 123 ? c - 71 : c > 47 && c < 58 ? c + 4 : c === 43 ? 62 : c === 47 ? 63 : 0;

            u24 |= c << 18 - 6 * m4;
            if (m4 === 3 || n - i === 1) {
                for (m3 = 0; m3 < 3 && j < k; m3++, j++) {
                    r[j] = u24 >>> (16 >>> m3 & 24) & 255;
                }
                u24 = 0;
            }
        }
        return r.buffer;
    },
    /**
     * Base64.encode(data) convert CryptoOperationData data to BASE64 string
     *
     * @memberOf GostCoding.Base64
     * @param {CryptoOperationData} data Bynary data for encoding
     * @returns {String} BASE64 encoded data
     */
    encode: function encode(data) {
        var slen = 8,
            d = new Uint8Array(buffer(data));
        var m3 = 2,
            s = '';
        for (var n = d.length, u24 = 0, i = 0; i < n; i++) {
            m3 = i % 3;
            if (i > 0 && i * 4 / 3 % (12 * slen) === 0) s += '\r\n';
            u24 |= d[i] << (16 >>> m3 & 24);
            if (m3 === 2 || n - i === 1) {
                for (var j = 18; j >= 0; j -= 6) {
                    var c = u24 >>> j & 63;
                    c = c < 26 ? c + 65 : c < 52 ? c + 71 : c < 62 ? c - 4 : c === 62 ? 43 : c === 63 ? 47 : 65;
                    s += String.fromCharCode(c);
                }
                u24 = 0;
            }
        }
        return s.substr(0, s.length - 2 + m3) + (m3 === 2 ? '' : m3 === 1 ? '=' : '==');
    } // </editor-fold>
};

/**
 * BASE64 conversion
 *
 * @memberOf GostCoding
 * @insnance
 * @type GostCoding.Base64
 */
GostCoding.prototype.Base64 = Base64;

/**
 * Text string conversion <br>
 * Methods support charsets: ascii, win1251, utf8, utf16 (ucs2, unicode), utf32 (ucs4)
 *
 * @class GostCoding.Chars
 */
var Chars = function () {
    // <editor-fold defaultstate="collapsed">

    var _win1251_ = {
        0x402: 0x80,
        0x403: 0x81,
        0x201A: 0x82,
        0x453: 0x83,
        0x201E: 0x84,
        0x2026: 0x85,
        0x2020: 0x86,
        0x2021: 0x87,
        0x20AC: 0x88,
        0x2030: 0x89,
        0x409: 0x8A,
        0x2039: 0x8B,
        0x40A: 0x8C,
        0x40C: 0x8D,
        0x40B: 0x8E,
        0x40f: 0x8f,
        0x452: 0x90,
        0x2018: 0x91,
        0x2019: 0x92,
        0x201C: 0x93,
        0x201D: 0x94,
        0x2022: 0x95,
        0x2013: 0x96,
        0x2014: 0x97,
        0x2122: 0x99,
        0x459: 0x9A,
        0x203A: 0x9B,
        0x45A: 0x9C,
        0x45C: 0x9D,
        0x45B: 0x9E,
        0x45f: 0x9f,
        0xA0: 0xA0,
        0x40E: 0xA1,
        0x45E: 0xA2,
        0x408: 0xA3,
        0xA4: 0xA4,
        0x490: 0xA5,
        0xA6: 0xA6,
        0xA7: 0xA7,
        0x401: 0xA8,
        0xA9: 0xA9,
        0x404: 0xAA,
        0xAB: 0xAB,
        0xAC: 0xAC,
        0xAD: 0xAD,
        0xAE: 0xAE,
        0x407: 0xAf,
        0xB0: 0xB0,
        0xB1: 0xB1,
        0x406: 0xB2,
        0x456: 0xB3,
        0x491: 0xB4,
        0xB5: 0xB5,
        0xB6: 0xB6,
        0xB7: 0xB7,
        0x451: 0xB8,
        0x2116: 0xB9,
        0x454: 0xBA,
        0xBB: 0xBB,
        0x458: 0xBC,
        0x405: 0xBD,
        0x455: 0xBE,
        0x457: 0xBf
    };
    var _win1251back_ = {};
    for (var from in _win1251_) {
        var to = _win1251_[from];
        _win1251back_[to] = from;
    }

    return {
        /**
         * Chars.decode(s, charset) convert string s with defined charset to CryptoOperationData
         *
         * @memberOf GostCoding.Chars
         * @param {string} s Javascript string
         * @param {string} charset Charset, default 'win1251'
         * @returns {CryptoOperationData} Decoded binary data
         */
        decode: function decode(s, charset) {
            charset = (charset || 'win1251').toLowerCase().replace('-', '');
            var r = [];
            for (var i = 0, j = s.length; i < j; i++) {
                var c = s.charCodeAt(i);
                if (charset === 'utf8') {
                    if (c < 0x80) {
                        r.push(c);
                    } else if (c < 0x800) {
                        r.push(0xc0 + (c >>> 6));
                        r.push(0x80 + (c & 63));
                    } else if (c < 0x10000) {
                        r.push(0xe0 + (c >>> 12));
                        r.push(0x80 + (c >>> 6 & 63));
                        r.push(0x80 + (c & 63));
                    } else if (c < 0x200000) {
                        r.push(0xf0 + (c >>> 18));
                        r.push(0x80 + (c >>> 12 & 63));
                        r.push(0x80 + (c >>> 6 & 63));
                        r.push(0x80 + (c & 63));
                    } else if (c < 0x4000000) {
                        r.push(0xf8 + (c >>> 24));
                        r.push(0x80 + (c >>> 18 & 63));
                        r.push(0x80 + (c >>> 12 & 63));
                        r.push(0x80 + (c >>> 6 & 63));
                        r.push(0x80 + (c & 63));
                    } else {
                        r.push(0xfc + (c >>> 30));
                        r.push(0x80 + (c >>> 24 & 63));
                        r.push(0x80 + (c >>> 18 & 63));
                        r.push(0x80 + (c >>> 12 & 63));
                        r.push(0x80 + (c >>> 6 & 63));
                        r.push(0x80 + (c & 63));
                    }
                } else if (charset === 'unicode' || charset === 'ucs2' || charset === 'utf16') {
                    if (c < 0xD800 || c >= 0xE000 && c <= 0x10000) {
                        r.push(c >>> 8);
                        r.push(c & 0xff);
                    } else if (c >= 0x10000 && c < 0x110000) {
                        c -= 0x10000;
                        var first = ((0xffc00 & c) >> 10) + 0xD800;
                        var second = (0x3ff & c) + 0xDC00;
                        r.push(first >>> 8);
                        r.push(first & 0xff);
                        r.push(second >>> 8);
                        r.push(second & 0xff);
                    }
                } else if (charset === 'utf32' || charset === 'ucs4') {
                    r.push(c >>> 24 & 0xff);
                    r.push(c >>> 16 & 0xff);
                    r.push(c >>> 8 & 0xff);
                    r.push(c & 0xff);
                } else if (charset === 'win1251') {
                    if (c >= 0x80) {
                        if (c >= 0x410 && c < 0x450) // А..Яа..я
                            c -= 0x350;else c = _win1251_[c] || 0;
                    }
                    r.push(c);
                } else r.push(c & 0xff);
            }
            return new Uint8Array(r).buffer;
        },
        /**
         * Chars.encode(data, charset) convert CryptoOperationData data to string with defined charset
         *
         * @memberOf GostCoding.Chars
         * @param {CryptoOperationData} data Binary data
         * @param {string} charset Charset, default win1251
         * @returns {string} Encoded javascript string
         */
        encode: function encode(data, charset) {
            charset = (charset || 'win1251').toLowerCase().replace('-', '');
            var r = [],
                d = new Uint8Array(buffer(data));
            for (var i = 0, n = d.length; i < n; i++) {
                var c = d[i];
                if (charset === 'utf8') {
                    c = c >= 0xfc && c < 0xfe && i + 5 < n ? // six bytes
                    (c - 0xfc) * 1073741824 + (d[++i] - 0x80 << 24) + (d[++i] - 0x80 << 18) + (d[++i] - 0x80 << 12) + (d[++i] - 0x80 << 6) + d[++i] - 0x80 : c >> 0xf8 && c < 0xfc && i + 4 < n ? // five bytes
                    (c - 0xf8 << 24) + (d[++i] - 0x80 << 18) + (d[++i] - 0x80 << 12) + (d[++i] - 0x80 << 6) + d[++i] - 0x80 : c >> 0xf0 && c < 0xf8 && i + 3 < n ? // four bytes
                    (c - 0xf0 << 18) + (d[++i] - 0x80 << 12) + (d[++i] - 0x80 << 6) + d[++i] - 0x80 : c >= 0xe0 && c < 0xf0 && i + 2 < n ? // three bytes
                    (c - 0xe0 << 12) + (d[++i] - 0x80 << 6) + d[++i] - 0x80 : c >= 0xc0 && c < 0xe0 && i + 1 < n ? // two bytes
                    (c - 0xc0 << 6) + d[++i] - 0x80 : c; // one byte
                } else if (charset === 'unicode' || charset === 'ucs2' || charset === 'utf16') {
                    c = (c << 8) + d[++i];
                    if (c >= 0xD800 && c < 0xE000) {
                        var first = c - 0xD800 << 10;
                        c = d[++i];
                        c = (c << 8) + d[++i];
                        var second = c - 0xDC00;
                        c = first + second + 0x10000;
                    }
                } else if (charset === 'utf32' || charset === 'ucs4') {
                    c = (c << 8) + d[++i];
                    c = (c << 8) + d[++i];
                    c = (c << 8) + d[++i];
                } else if (charset === 'win1251') {
                    if (c >= 0x80) {
                        if (c >= 0xC0 && c < 0x100) c += 0x350; // А..Яа..я
                        else c = _win1251back_[c] || 0;
                    }
                }
                r.push(String.fromCharCode(c));
            }
            return r.join('');
        }
    }; // </editor-fold>
}();

/**
 * Text string conversion
 *
 * @memberOf GostCoding
 * @insnance
 * @type GostCoding.Chars
 */
GostCoding.prototype.Chars = Chars;

/**
 * HEX conversion
 *
 * @class GostCoding.Hex
 */
var Hex = { // <editor-fold defaultstate="collapsed">
    /**
     * Hex.decode(s, endean) convert HEX string s to CryptoOperationData in endean mode
     *
     * @memberOf GostCoding.Hex
     * @param {string} s Hex encoded string
     * @param {boolean} endean Little or Big Endean, default Little
     * @returns {CryptoOperationData} Decoded binary data
     */
    decode: function decode(s, endean) {
        s = s.replace(/[^A-fa-f0-9]/g, '');
        var n = Math.ceil(s.length / 2),
            r = new Uint8Array(n);
        s = (s.length % 2 > 0 ? '0' : '') + s;
        if (endean && (typeof endean !== 'string' || endean.toLowerCase().indexOf('little') < 0)) for (var i = 0; i < n; i++) {
            r[i] = parseInt(s.substr((n - i - 1) * 2, 2), 16);
        } else for (var i = 0; i < n; i++) {
            r[i] = parseInt(s.substr(i * 2, 2), 16);
        }return r.buffer;
    },
    /**
     * Hex.encode(data, endean) convert CryptoOperationData data to HEX string in endean mode
     *
     * @memberOf GostCoding.Hex
     * @param {CryptoOperationData} data Binary data
     * @param {boolean} endean Little/Big Endean, default Little
     * @returns {string} Hex decoded string
     */
    encode: function encode(data, endean) {
        var s = [],
            d = new Uint8Array(buffer(data)),
            n = d.length;
        if (endean && (typeof endean !== 'string' || endean.toLowerCase().indexOf('little') < 0)) for (var i = 0; i < n; i++) {
            var j = n - i - 1;
            s[j] = (j > 0 && j % 32 === 0 ? '\r\n' : '') + ('00' + d[i].toString(16)).slice(-2);
        } else for (var i = 0; i < n; i++) {
            s[i] = (i > 0 && i % 32 === 0 ? '\r\n' : '') + ('00' + d[i].toString(16)).slice(-2);
        }return s.join('');
    } // </editor-fold>
};

/**
 *  HEX conversion
 * @memberOf GostCoding
 * @insnance
 * @type GostCoding.Hex
 */
GostCoding.prototype.Hex = Hex;

/**
 * String hex-encoded integer conversion
 *
 * @class GostCoding.Int16
 */
var Int16 = { // <editor-fold defaultstate="collapsed">
    /**
     * Int16.decode(s) convert hex big insteger s to CryptoOperationData
     *
     * @memberOf GostCoding.Int16
     * @param {string} s Int16 string
     * @returns {CryptoOperationData} Decoded binary data
     */
    decode: function decode(s) {
        s = (s || '').replace(/[^\-A-fa-f0-9]/g, '');
        if (s.length === 0) s = '0';
        // Signature
        var neg = false;
        if (s.charAt(0) === '-') {
            neg = true;
            s = s.substring(1);
        }
        // Align 2 chars
        while (s.charAt(0) === '0' && s.length > 1) {
            s = s.substring(1);
        }s = (s.length % 2 > 0 ? '0' : '') + s;
        // Padding for singanuture
        // '800000' - 'ffffff' - for positive
        // '800001' - 'ffffff' - for negative
        if (!neg && !/^[0-7]/.test(s) || neg && !/^[0-7]|8[0]+$/.test(s)) s = '00' + s;
        // Convert hex
        var n = s.length / 2,
            r = new Uint8Array(n),
            t = 0;
        for (var i = n - 1; i >= 0; --i) {
            var c = parseInt(s.substr(i * 2, 2), 16);
            if (neg && c + t > 0) {
                c = 256 - c - t;
                t = 1;
            }
            r[i] = c;
        }
        return r.buffer;
    },
    /**
     * Int16.encode(data) convert CryptoOperationData data to big integer hex string
     *
     * @memberOf GostCoding.Int16
     * @param {CryptoOperationData} data Binary data
     * @returns {string} Int16 encoded string
     */
    encode: function encode(data) {
        var d = new Uint8Array(buffer(data)),
            n = d.length;
        if (d.length === 0) return '0x00';
        var s = [],
            neg = d[0] > 0x7f,
            t = 0;
        for (var i = n - 1; i >= 0; --i) {
            var v = d[i];
            if (neg && v + t > 0) {
                v = 256 - v - t;
                t = 1;
            }
            s[i] = ('00' + v.toString(16)).slice(-2);
        }
        s = s.join('');
        while (s.charAt(0) === '0') {
            s = s.substring(1);
        }return (neg ? '-' : '') + '0x' + s;
    } // </editor-fold>
};

/**
 * String hex-encoded integer conversion
 * @memberOf GostCoding
 * @insnance
 * @type GostCoding.Int16
 */
GostCoding.prototype.Int16 = Int16;

/**
 * BER, DER, CER conversion
 *
 * @class GostCoding.BER
 */
var BER = function () {
    // <editor-fold defaultstate="collapsed">

    // Predefenition block
    function encodeBER(source, format, onlyContent) {
        // Correct primitive type
        var object = source.object;
        if (object === undefined) object = source;

        // Determinate tagClass
        var tagClass = source.tagClass = source.tagClass || 0; // Universial default

        // Determinate tagNumber. Use only for Universal class
        if (tagClass === 0) {
            var tagNumber = source.tagNumber;
            if (typeof tagNumber === 'undefined') {
                if (typeof object === 'string') {
                    if (object === '') // NULL
                        tagNumber = 0x05;else if (/^\-?0x[0-9a-fA-F]+$/.test(object)) // INTEGER
                        tagNumber = 0x02;else if (/^(\d+\.)+\d+$/.test(object)) // OID
                        tagNumber = 0x06;else if (/^[01]+$/.test(object)) // BIT STRING
                        tagNumber = 0x03;else if (/^(true|false)$/.test(object)) // BOOLEAN
                        tagNumber = 0x01;else if (/^[0-9a-fA-F]+$/.test(object)) // OCTET STRING
                        tagNumber = 0x04;else tagNumber = 0x13; // Printable string (later can be changed to UTF8String)
                } else if (typeof object === 'number') {
                    // INTEGER
                    tagNumber = 0x02;
                } else if (typeof object === 'boolean') {
                    // BOOLEAN
                    tagNumber = 0x01;
                } else if (object instanceof Array) {
                    // SEQUENCE
                    tagNumber = 0x10;
                } else if (object instanceof Date) {
                    // GeneralizedTime
                    tagNumber = 0x18;
                } else if (object instanceof CryptoOperationData || object && object.buffer instanceof CryptoOperationData) {
                    tagNumber = 0x04;
                } else throw new _errors.DataError('Unrecognized type for ' + object);
            }
        }

        // Determinate constructed
        var tagConstructed = source.tagConstructed;
        if (typeof tagConstructed === 'undefined') tagConstructed = source.tagConstructed = object instanceof Array;

        // Create content
        var content;
        if (object instanceof CryptoOperationData || object && object.buffer instanceof CryptoOperationData) {
            // Direct
            content = new Uint8Array(buffer(object));
            if (tagNumber === 0x03) {
                // BITSTRING
                // Set unused bits
                var a = new Uint8Array(buffer(content));
                content = new Uint8Array(a.length + 1);
                content[0] = 0; // No unused bits
                content.set(a, 1);
            }
        } else if (tagConstructed) {
            // Sub items coding
            if (object instanceof Array) {
                var bytelen = 0,
                    ba = [],
                    offset = 0;
                for (var i = 0, n = object.length; i < n; i++) {
                    ba[i] = encodeBER(object[i], format);
                    bytelen += ba[i].length;
                }
                if (tagNumber === 0x11) ba.sort(function (a, b) {
                    // Sort order for SET components
                    for (var i = 0, n = Math.min(a.length, b.length); i < n; i++) {
                        var r = a[i] - b[i];
                        if (r !== 0) return r;
                    }
                    return a.length - b.length;
                });
                if (format === 'CER') {
                    // final for CER 00 00
                    ba[n] = new Uint8Array(2);
                    bytelen += 2;
                }
                content = new Uint8Array(bytelen);
                for (var i = 0, n = ba.length; i < n; i++) {
                    content.set(ba[i], offset);
                    offset = offset + ba[i].length;
                }
            } else throw new _errors.DataError('Constracted block can\'t be primitive');
        } else {
            switch (tagNumber) {
                // 0x00: // EOC
                case 0x01:
                    // BOOLEAN
                    content = new Uint8Array(1);
                    content[0] = object ? 0xff : 0;
                    break;
                case 0x02: // INTEGER
                case 0x0a:
                    // ENUMIRATED
                    content = Int16.decode(typeof object === 'number' ? object.toString(16) : object);
                    break;
                case 0x03:
                    // BIT STRING
                    if (typeof object === 'string') {
                        var unusedBits = 7 - (object.length + 7) % 8;
                        var n = Math.ceil(object.length / 8);
                        content = new Uint8Array(n + 1);
                        content[0] = unusedBits;
                        for (var i = 0; i < n; i++) {
                            var c = 0;
                            for (var j = 0; j < 8; j++) {
                                var k = i * 8 + j;
                                c = (c << 1) + (k < object.length ? object.charAt(k) === '1' ? 1 : 0 : 0);
                            }
                            content[i + 1] = c;
                        }
                    }
                    break;
                case 0x04:
                    content = Hex.decode(typeof object === 'number' ? object.toString(16) : object);
                    break;
                // case 0x05: // NULL
                case 0x06:
                    // OBJECT IDENTIFIER
                    var a = object.match(/\d+/g),
                        r = [];
                    for (var i = 1; i < a.length; i++) {
                        var n = +a[i],
                            r1 = [];
                        if (i === 1) n = n + a[0] * 40;
                        do {
                            r1.push(n & 0x7F);
                            n = n >>> 7;
                        } while (n);
                        // reverse order
                        for (j = r1.length - 1; j >= 0; --j) {
                            r.push(r1[j] + (j === 0 ? 0x00 : 0x80));
                        }
                    }
                    content = new Uint8Array(r);
                    break;
                // case 0x07: // ObjectDescriptor
                // case 0x08: // EXTERNAL
                // case 0x09: // REAL
                // case 0x0A: // ENUMERATED
                // case 0x0B: // EMBEDDED PDV
                case 0x0C:
                    // UTF8String
                    content = Chars.decode(object, 'utf8');
                    break;
                // case 0x10: // SEQUENCE
                // case 0x11: // SET
                case 0x12: // NumericString
                case 0x16: // IA5String // ASCII
                case 0x13: // PrintableString // ASCII subset
                case 0x14: // TeletexString // aka T61String
                case 0x15: // VideotexString
                case 0x19: // GraphicString
                case 0x1A: // VisibleString // ASCII subset
                case 0x1B:
                    // GeneralString
                    // Reflect on character encoding
                    for (var i = 0, n = object.length; i < n; i++) {
                        if (object.charCodeAt(i) > 255) tagNumber = 0x0C;
                    }if (tagNumber === 0x0C) content = Chars.decode(object, 'utf8');else content = Chars.decode(object, 'ascii');
                    break;
                case 0x17: // UTCTime
                case 0x18:
                    // GeneralizedTime
                    var result = object.original;
                    if (!result) {
                        var date = new Date(object);
                        date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // to UTC
                        var ms = tagNumber === 0x18 ? date.getMilliseconds().toString() : ''; // Milliseconds, remove trailing zeros
                        while (ms.length > 0 && ms.charAt(ms.length - 1) === '0') {
                            ms = ms.substring(0, ms.length - 1);
                        }if (ms.length > 0) ms = '.' + ms;
                        result = (tagNumber === 0x17 ? date.getYear().toString().slice(-2) : date.getFullYear().toString()) + ('00' + (date.getMonth() + 1)).slice(-2) + ('00' + date.getDate()).slice(-2) + ('00' + date.getHours()).slice(-2) + ('00' + date.getMinutes()).slice(-2) + ('00' + date.getSeconds()).slice(-2) + ms + 'Z';
                    }
                    content = Chars.decode(result, 'ascii');
                    break;
                case 0x1C:
                    // UniversalString
                    content = Chars.decode(object, 'utf32');
                    break;
                case 0x1E:
                    // BMPString
                    content = Chars.decode(object, 'utf16');
                    break;
            }
        }

        if (!content) content = new Uint8Array(0);
        if (content instanceof CryptoOperationData) content = new Uint8Array(content);

        if (!tagConstructed && format === 'CER') {
            // Encoding CER-form for string types
            var k;
            switch (tagNumber) {
                case 0x03:
                    // BIT_STRING
                    k = 1; // ingnore unused bit for bit string
                case 0x04: // OCTET_STRING
                case 0x0C: // UTF8String
                case 0x12: // NumericString
                case 0x13: // PrintableString
                case 0x14: // TeletexString
                case 0x15: // VideotexString
                case 0x16: // IA5String
                case 0x19: // GraphicString
                case 0x1A: // VisibleString
                case 0x1B: // GeneralString
                case 0x1C: // UniversalString
                case 0x1E:
                    // BMPString
                    k = k || 0;
                    // Split content on 1000 octet len parts
                    var size = 1000;
                    var bytelen = 0,
                        ba = [],
                        offset = 0;
                    for (var i = k, n = content.length; i < n; i += size - k) {
                        ba[i] = encodeBER({
                            object: new Unit8Array(content.buffer, i, Math.min(size - k, n - i)),
                            tagNumber: tagNumber,
                            tagClass: 0,
                            tagConstructed: false
                        }, format);
                        bytelen += ba[i].length;
                    }
                    ba[n] = new Uint8Array(2); // final for CER 00 00
                    bytelen += 2;
                    content = new Uint8Array(bytelen);
                    for (var i = 0, n = ba.length; i < n; i++) {
                        content.set(ba[i], offset);
                        offset = offset + ba[i].length;
                    }
            }
        }

        // Restore tagNumber for all classes
        if (tagClass === 0) source.tagNumber = tagNumber;else source.tagNumber = tagNumber = source.tagNumber || 0;
        source.content = content;

        if (onlyContent) return content;

        // Create header
        // tagNumber
        var ha = [],
            first = tagClass === 3 ? 0xC0 : tagClass === 2 ? 0x80 : tagClass === 1 ? 0x40 : 0x00;
        if (tagConstructed) first |= 0x20;
        if (tagNumber < 0x1F) {
            first |= tagNumber & 0x1F;
            ha.push(first);
        } else {
            first |= 0x1F;
            ha.push(first);
            var n = tagNumber,
                ha1 = [];
            do {
                ha1.push(n & 0x7F);
                n = n >>> 7;
            } while (n);
            // reverse order
            for (var j = ha1.length - 1; j >= 0; --j) {
                ha.push(ha1[j] + (j === 0 ? 0x00 : 0x80));
            }
        }
        // Length
        if (tagConstructed && format === 'CER') {
            ha.push(0x80);
        } else {
            var len = content.length;
            if (len > 0x7F) {
                var l2 = len,
                    ha2 = [];
                do {
                    ha2.push(l2 & 0xff);
                    l2 = l2 >>> 8;
                } while (l2);
                ha.push(ha2.length + 0x80); // reverse order
                for (var j = ha2.length - 1; j >= 0; --j) {
                    ha.push(ha2[j]);
                }
            } else {
                // simple len
                ha.push(len);
            }
        }
        var header = source.header = new Uint8Array(ha);

        // Result - complete buffer
        var block = new Uint8Array(header.length + content.length);
        block.set(header, 0);
        block.set(content, header.length);
        return block;
    }

    function decodeBER(source, offset) {

        // start pos
        var pos = offset || 0,
            start = pos;
        var tagNumber, tagClass, tagConstructed, content, header, buffer, sub, len;

        if (source.object) {
            // Ready from source
            tagNumber = source.tagNumber;
            tagClass = source.tagClass;
            tagConstructed = source.tagConstructed;
            content = source.content;
            header = source.header;
            buffer = source.object instanceof CryptoOperationData ? new Uint8Array(source.object) : null;
            sub = source.object instanceof Array ? source.object : null;
            len = buffer && buffer.length || null;
        } else {
            // Decode header
            var d = source;

            // Read tag
            var buf = d[pos++];
            tagNumber = buf & 0x1f;
            tagClass = buf >> 6;
            tagConstructed = (buf & 0x20) !== 0;
            if (tagNumber === 0x1f) {
                // long tag
                tagNumber = 0;
                do {
                    if (tagNumber > 0x1fffffffffff80) throw new _errors.DataError('Convertor not supported tag number more then (2^53 - 1) at position ' + offset);
                    buf = d[pos++];
                    tagNumber = (tagNumber << 7) + (buf & 0x7f);
                } while (buf & 0x80);
            }

            // Read len
            buf = d[pos++];
            len = buf & 0x7f;
            if (len !== buf) {
                if (len > 6) // no reason to use Int10, as it would be a huge buffer anyways
                    throw new _errors.DataError('Length over 48 bits not supported at position ' + offset);
                if (len === 0) len = null; // undefined
                else {
                        buf = 0;
                        for (var i = 0; i < len; ++i) {
                            buf = (buf << 8) + d[pos++];
                        }len = buf;
                    }
            }

            start = pos;
            sub = null;

            if (tagConstructed) {
                // must have valid content
                sub = [];
                if (len !== null) {
                    // definite length
                    var end = start + len;
                    while (pos < end) {
                        var s = decodeBER(d, pos);
                        sub.push(s);
                        pos += s.header.length + s.content.length;
                    }
                    if (pos !== end) throw new _errors.DataError('Content size is not correct for container starting at offset ' + start);
                } else {
                    // undefined length
                    try {
                        for (;;) {
                            var s = decodeBER(d, pos);
                            pos += s.header.length + s.content.length;
                            if (s.tagClass === 0x00 && s.tagNumber === 0x00) break;
                            sub.push(s);
                        }
                        len = pos - start;
                    } catch (e) {
                        throw new _errors.DataError('Exception ' + e + ' while decoding undefined length content at offset ' + start);
                    }
                }
            }

            // Header and content
            header = new Uint8Array(d.buffer, offset, start - offset);
            content = new Uint8Array(d.buffer, start, len);
            buffer = content;
        }

        // Constructed types - check for string concationation
        if (sub !== null && tagClass === 0) {
            var k;
            switch (tagNumber) {
                case 0x03:
                    // BIT_STRING
                    k = 1; // ingnore unused bit for bit string
                case 0x04: // OCTET_STRING
                case 0x0C: // UTF8String
                case 0x12: // NumericString
                case 0x13: // PrintableString
                case 0x14: // TeletexString
                case 0x15: // VideotexString
                case 0x16: // IA5String
                case 0x19: // GraphicString
                case 0x1A: // VisibleString
                case 0x1B: // GeneralString
                case 0x1C: // UniversalString
                case 0x1E:
                    // BMPString
                    k = k || 0;
                    // Concatination
                    if (sub.length === 0) throw new _errors.DataError('No constructed encoding content of string type at offset ' + start);
                    len = k;
                    for (var i = 0, n = sub.length; i < n; i++) {
                        var s = sub[i];
                        if (s.tagClass !== tagClass || s.tagNumber !== tagNumber || s.tagConstructed) throw new _errors.DataError('Invalid constructed encoding of string type at offset ' + start);
                        len += s.content.length - k;
                    }
                    buffer = new Uint8Array(len);
                    for (var i = 0, n = sub.length, j = k; i < n; i++) {
                        var s = sub[i];
                        if (k > 0) buffer.set(s.content.subarray(1), j);else buffer.set(s.content, j);
                        j += s.content.length - k;
                    }
                    tagConstructed = false; // follow not required
                    sub = null;
                    break;
            }
        }
        // Primitive types
        var object = '';
        if (sub === null) {
            if (len === null) throw new _errors.DataError('Invalid tag with undefined length at offset ' + start);

            if (tagClass === 0) {
                switch (tagNumber) {
                    case 0x01:
                        // BOOLEAN
                        object = buffer[0] !== 0;
                        break;
                    case 0x02: // INTEGER
                    case 0x0a:
                        // ENUMIRATED
                        if (len > 6) {
                            object = Int16.encode(buffer);
                        } else {
                            var v = buffer[0];
                            if (buffer[0] > 0x7f) v = v - 256;
                            for (var i = 1; i < len; i++) {
                                v = v * 256 + buffer[i];
                            }object = v;
                        }
                        break;
                    case 0x03:
                        // BIT_STRING
                        if (len > 5) {
                            // Content buffer
                            object = new Uint8Array(buffer.subarray(1)).buffer;
                        } else {
                            // Max bit mask only for 32 bit
                            var unusedBit = buffer[0],
                                skip = unusedBit,
                                s = [];
                            for (var i = len - 1; i >= 1; --i) {
                                var b = buffer[i];
                                for (var j = skip; j < 8; ++j) {
                                    s.push(b >> j & 1 ? '1' : '0');
                                }skip = 0;
                            }
                            object = s.reverse().join('');
                        }
                        break;
                    case 0x04:
                        // OCTET_STRING
                        object = new Uint8Array(buffer).buffer;
                        break;
                    //  case 0x05: // NULL
                    case 0x06:
                        // OBJECT_IDENTIFIER
                        var s = '',
                            n = 0,
                            bits = 0;
                        for (var i = 0; i < len; ++i) {
                            var v = buffer[i];
                            n = (n << 7) + (v & 0x7F);
                            bits += 7;
                            if (!(v & 0x80)) {
                                // finished
                                if (s === '') {
                                    var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                                    s = m + "." + (n - m * 40);
                                } else s += "." + n.toString();
                                n = 0;
                                bits = 0;
                            }
                        }
                        if (bits > 0) throw new _errors.DataError('Incompleted OID at offset ' + start);
                        object = s;
                        break;
                    //case 0x07: // ObjectDescriptor
                    //case 0x08: // EXTERNAL
                    //case 0x09: // REAL
                    //case 0x0A: // ENUMERATED
                    //case 0x0B: // EMBEDDED_PDV
                    case 0x10: // SEQUENCE
                    case 0x11:
                        // SET
                        object = [];
                        break;
                    case 0x0C:
                        // UTF8String
                        object = Chars.encode(buffer, 'utf8');
                        break;
                    case 0x12: // NumericString
                    case 0x13: // PrintableString
                    case 0x14: // TeletexString
                    case 0x15: // VideotexString
                    case 0x16: // IA5String
                    case 0x19: // GraphicString
                    case 0x1A: // VisibleString
                    case 0x1B:
                        // GeneralString
                        object = Chars.encode(buffer, 'ascii');
                        break;
                    case 0x1C:
                        // UniversalString
                        object = Chars.encode(buffer, 'utf32');
                        break;
                    case 0x1E:
                        // BMPString
                        object = Chars.encode(buffer, 'utf16');
                        break;
                    case 0x17: // UTCTime
                    case 0x18:
                        // GeneralizedTime
                        var shortYear = tagNumber === 0x17;
                        var s = Chars.encode(buffer, 'ascii'),
                            m = (shortYear ? /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/ : /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/).exec(s);
                        if (!m) throw new _errors.DataError('Unrecognized time format "' + s + '" at offset ' + start);
                        if (shortYear) {
                            // Where YY is greater than or equal to 50, the year SHALL be interpreted as 19YY; and
                            // Where YY is less than 50, the year SHALL be interpreted as 20YY
                            m[1] = +m[1];
                            m[1] += m[1] < 50 ? 2000 : 1900;
                        }
                        var dt = new Date(m[1], +m[2] - 1, +m[3], +(m[4] || '0'), +(m[5] || '0'), +(m[6] || '0'), +(m[7] || '0')),
                            tz = dt.getTimezoneOffset();
                        if (m[8] || tagNumber === 0x17) {
                            if (m[8].toUpperCase() !== 'Z' && m[9]) {
                                tz = tz + parseInt(m[9]);
                            }
                            dt.setMinutes(dt.getMinutes() - tz);
                        }
                        dt.original = s;
                        object = dt;
                        break;
                }
            } else // OCTET_STRING
                object = new Uint8Array(buffer).buffer;
        } else object = sub;

        // result
        return {
            tagConstructed: tagConstructed,
            tagClass: tagClass,
            tagNumber: tagNumber,
            header: header,
            content: content,
            object: object
        };
    }

    return {
        /**
         * BER.decode(object, format) convert javascript object to ASN.1 format CryptoOperationData<br><br>
         * If object has members tagNumber, tagClass and tagConstructed
         * it is clear define encoding rules. Else method use defaul rules:
         * <ul>
         *   <li>Empty string or null - NULL</li>
         *   <li>String starts with '0x' and has 0-9 and a-f characters - INTEGER</li>
         *   <li>String like d.d.d.d (d - set of digits) - OBJECT IDENTIFIER</li>
         *   <li>String with characters 0 and 1 - BIT STRING</li>
         *   <li>Strings 'true' or 'false' - BOOLEAN</li>
         *   <li>String has only 0-9 and a-f characters - OCTET STRING</li>
         *   <li>String has only characters with code 0-255 - PrintableString</li>
         *   <li>Other strings - UTF8String</li>
         *   <li>Number - INTEGER</li>
         *   <li>Date - GeneralizedTime</li>
         *   <li>Boolean - SEQUENCE</li>
         *   <li>CryptoOperationData - OCTET STRING</li>
         * </ul>
         * SEQUENCE or SET arrays recursively encoded for each item.<br>
         * OCTET STRING and BIT STRING can presents as array with one item.
         * It means encapsulates encoding for child element.<br>
         *
         * If CONTEXT or APPLICATION classes item presents as array with one
         * item we use EXPLICIT encoding for element, else IMPLICIT encoding.<br>
         *
         * @memberOf GostCoding.BER
         * @param {Object} object Object to encoding
         * @param {string} format Encoding rule: 'DER' or 'CER', default 'DER'
         * @param {boolean} onlyContent Encode content only, without header
         * @returns {CryptoOperationData} BER encoded data
         */
        encode: function encode(object, format, onlyContent) {
            return encodeBER(object, format, onlyContent).buffer;
        },
        /**
         * BER.encode(data) convert ASN.1 format CryptoOperationData data to javascript object<br><br>
         *
         * Conversion rules to javascript object:
         *  <ul>
         *      <li>BOOLEAN - Boolean object</li>
         *      <li>INTEGER, ENUMIRATED - Integer object if len <= 6 (48 bits) else Int16 encoded string</li>
         *      <li>BIT STRING - Integer object if len <= 5 (w/o unsedBit octet - 32 bits) else String like '10111100' or  Array with one item in case of incapsulates encoding</li>
         *      <li>OCTET STRING - Hex encoded string or Array with one item in case of incapsulates encoding</li>
         *      <li>OBJECT IDENTIFIER - String with object identifier</li>
         *      <li>SEQUENCE, SET - Array of encoded items</li>
         *      <li>UTF8String, NumericString, PrintableString, TeletexString, VideotexString,
         *          IA5String, GraphicString, VisibleString, GeneralString, UniversalString,
         *          BMPString - encoded String</li>
         *      <li>UTCTime, GeneralizedTime - Date</li>
         *  </ul>
         * @memberOf GostCoding.BER
         * @param {(CryptoOperationData|GostCoding.BER)} data Binary data to decode
         * @returns {Object} Javascript object with result of decoding
         */
        decode: function decode(data) {
            return decodeBER(data.object ? data : new Uint8Array(buffer(data)), 0);
        }
    }; // </editor-fold>
}();

/**
 * BER, DER, CER conversion
 * @memberOf GostCoding
 * @insnance
 * @type GostCoding.BER
 */
GostCoding.prototype.BER = BER;

/**
 * PEM conversion
 * @class GostCoding.PEM
 */
var PEM = { // <editor-fold defaultstate="collapsed">
    /**
     * PEM.encode(data, name) encode CryptoOperationData to PEM format with name label
     *
     * @memberOf GostCoding.PEM
     * @param {(Object|CryptoOperationData)} data Java script object or BER-encoded binary data
     * @param {string} name Name of PEM object: 'certificate', 'private key' etc.
     * @returns {string} Encoded object
     */
    encode: function encode(data, name) {
        return (name ? '-----BEGIN ' + name.toUpperCase() + '-----\r\n' : '') + Base64.encode(data instanceof CryptoOperationData ? data : BER.encode(data)) + (name ? '\r\n-----END ' + name.toUpperCase() + '-----' : '');
    },
    /**
     * PEM.decode(s, name, deep) decode PEM format s labeled name to CryptoOperationData or javascript object in according to deep parameter
     *
     * @memberOf GostCoding.PEM
     * @param {string} s PEM encoded string
     * @param {string} name Name of PEM object: 'certificate', 'private key' etc.
     * @param {boolean} deep If true method do BER-decoding, else only BASE64 decoding
     * @param {integer} index Index of decoded value
     * @returns {(Object|CryptoOperationData)} Decoded javascript object if deep=true, else CryptoOperationData for father BER decoding
     */
    decode: function decode(s, name, deep, index) {
        // Try clear base64
        var re1 = /([A-Za-z0-9\+\/\s\=]+)/g,
            valid = re1.exec(s);
        if (valid[1].length !== s.length) valid = false;
        if (!valid && name) {
            // Try with the name
            var re2 = new RegExp('-----\\s?BEGIN ' + name.toUpperCase() + '-----([A-Za-z0-9\\+\\/\\s\\=]+)-----\\s?END ' + name.toUpperCase() + '-----', 'g');
            valid = re2.exec(s);
        }
        if (!valid) {
            // Try with some name
            var re3 = new RegExp('-----\\s?BEGIN [A-Z0-9\\s]+' + '-----([A-Za-z0-9\\+\\/\\s\\=]+)-----\\s?END ' + '[A-Z0-9\\s]+-----', 'g');
            valid = re3.exec(s);
        }
        var r = valid && valid[1 + (index || 0)];
        if (!r) throw new _errors.DataError('Not valid PEM format');
        var out = Base64.decode(r);
        if (deep) out = BER.decode(out);
        return out;
    } // </editor-fold>
};

/**
 * PEM conversion
 * @memberOf GostCoding
 * @insnance
 * @type GostCoding.PEM
 */
GostCoding.prototype.PEM = PEM;

var gostCodingInstance = exports.gostCodingInstance = new GostCoding();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GostDigest = GostDigest;

var _seeds = __webpack_require__(1);

var _gostCipher = __webpack_require__(4);

var _errors = __webpack_require__(0);

/*
 * GOST R 34.11
 * Common methods
 *
 */ // <editor-fold defaultstate="collapsed">

// Copy len values from s[sOfs] to d[dOfs]
function arraycopy(s, sOfs, d, dOfs, len) {
    for (var i = 0; i < len; i++) {
        d[dOfs + i] = s[sOfs + i];
    }
}

// Swap bytes in buffer
/**
 * @file GOST R 34.11-94 / GOST R 34.11-12 implementation
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

function swap(s) {
    var src = new Uint8Array(s),
        dst = new Uint8Array(src.length);
    for (var i = 0, n = src.length; i < n; i++) {
        dst[n - i - 1] = src[i];
    }return dst.buffer;
}

// Convert BASE64 string to Uint8Array
// for decompression of constants and precalc values
function b64decode(s) {
    // s = s.replace(/[^A-Za-z0-9\+\/]/g, '');
    var n = s.length,
        k = n * 3 + 1 >> 2,
        r = new Uint8Array(k);

    for (var m3, m4, u24 = 0, j = 0, i = 0; i < n; i++) {
        m4 = i & 3;
        var c = s.charCodeAt(i);

        c = c > 64 && c < 91 ? c - 65 : c > 96 && c < 123 ? c - 71 : c > 47 && c < 58 ? c + 4 : c === 43 ? 62 : c === 47 ? 63 : 0;

        u24 |= c << 18 - 6 * m4;
        if (m4 === 3 || n - i === 1) {
            for (m3 = 0; m3 < 3 && j < k; m3++, j++) {
                r[j] = u24 >>> (16 >>> m3 & 24) & 255;
            }
            u24 = 0;
        }
    }
    return r.buffer;
}

// Check buffer
function buffer(d) {
    if (d instanceof ArrayBuffer) return d;else if (d && d.buffer && d.buffer instanceof ArrayBuffer) return d.byteOffset === 0 && d.byteLength === d.buffer.byteLength ? d.buffer : new Uint8Array(new Uint8Array(d, d.byteOffset, d.byteLength)).buffer;else throw new _errors.DataError('ArrayBuffer or ArrayBufferView required');
} // </editor-fold>

/**
 * Algorithm name GOST R 34.11 or GOST R 34.11-12<br><br>
 *
 * http://tools.ietf.org/html/rfc6986
 *
 * The digest method returns digest data in according to GOST R 4311-2012.<br>
 * Size of digest also defines in algorithm name.
 *  <ul>
 *      <li>GOST R 34.11-256-12 - 256 bits digest</li>
 *      <li>GOST R 34.11-512-12 - 512 bits digest</li>
 *  </ul>
 *
 * @memberOf GostDigest
 * @method digest
 * @instance
 * @param {(ArrayBuffer|TypedArray)} data Data
 * @returns {ArrayBuffer} Digest of data
 */
var digest2012 = function () // <editor-fold defaultstate="collapsed">
{
    // Constants
    var buffer0 = new Int32Array(16); // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var buffer512 = new Int32Array(16); // [512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    buffer512[0] = 512;

    // Constant C
    var C = function (s) {
        var h = new Int32Array(b64decode(s)),
            r = new Array(12);
        for (var i = 0; i < 12; i++) {
            r[i] = new Int32Array(h.buffer, i * 64, 16);
        }return r;
    }('B0Wm8lllgN0jTXTMNnR2BRXTYKQIKkKiAWlnkpHgfEv8xIV1jbhOcRbQRS5DdmovH3xlwIEvy+vp2soe2lsIsbebsSFwBHnmVs3L1xui3VXKpwrbwmG1XFiZ1hJrF7WaMQG1Fg9e1WGYKyMKcur+89e1cA9GneNPGi+dqYq1o2+yCroK9ZYemTHbeoZD9LbCCdtiYDc6ycGxnjWQ5A/i03t7KbEUderyix+cUl9e8QY1hD1qKPw5Cscvzius3HT1LtHjhLy+DCLxN+iToepTNL4DUpMzE7fYddYD7YIs16k/NV5orRxynX08XDN+hY5I3eRxXaDhSPnSZhXos98f71f+bHz9WBdg9WPqqX6iVnoWGicjtwD/36P1OiVHF82/vf8PgNc1njVKEIYWHxwVf2MjqWwMQT+amUdHraxr6ktufWRGekBo+jVPkDZyxXG/tsa+wmYf8gq0t5oct6b6z8aO8Jq0mn8YbKRCUfnEZi3AOTB6O8Okb9nTOh2urk+uk9QUOk1WhojzSjyiTEUXNQQFSiiDaUcGNyyCLcWrkgnJk3oZMz5H08mHv+bHxp45VAkkv/6GrFHsxaruFg7H9B7nAr/UDX+k' + '2ahRWTXCrDYvxKXRK43RaZAGm5LLK4n0msTbTTtEtIke3jaccfi3TkFBbgwCqucDp8mTTUJbH5vbWiODUURhcmAqH8uS3DgOVJwHppqKK3uxzrLbC0QKgIQJDeC3Vdk8JEKJJRs6fTreXxbs2JpMlJsiMRZUWo837ZxFmPvHtHTDtjsV0fqYNvRSdjswbB56SzNprwJn558DYTMbiuH/H9t4iv8c50GJ8/PkskjlKjhSbwWApt6+qxst84HNpMprXdhvwEpZot6Ybkd9Hc2678q5SOrvcR2KeWaEFCGAASBhB6vru2v62JT+WmPNxgIw+4nI79CezXsg1xvxSpK8SJkbstnVF/T6UijhiKqkHeeGzJEYne+AXZufITDUEiD4dx3fvDI8pM16sUkEsIAT0roxFvFn5443');

    // Precalc Ax
    var Ax = function (s) {
        return new Int32Array(b64decode(s));
    }('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'); //==

    // Variables
    var sigma, N, h;

    // 64bit tools
    function get8(x, i) {
        return x[i >> 2] >> ((i & 3) << 3) & 0xff;
    }

    // 512bit tools
    function add512(x, y) {
        var CF = 0,
            w0,
            w1;
        for (var i = 0; i < 16; i++) {
            w0 = (x[i] & 0xffff) + (y[i] & 0xffff) + (CF || 0);
            w1 = (x[i] >>> 16) + (y[i] >>> 16) + (w0 >>> 16);
            x[i] = w0 & 0xffff | w1 << 16;
            CF = w1 >>> 16;
        }
    }

    function get512(d) {
        return new Int32Array(d.buffer, d.byteOffset, 16);
    }

    function copy512(r, d) {
        for (var i = 0; i < 16; i++) {
            r[i] = d[i];
        }
    }

    function new512() {
        return new Int32Array(16);
    }

    // Core private algorithms
    function xor512(x, y) {
        for (var i = 0; i < 16; i++) {
            x[i] = x[i] ^ y[i];
        }
    }

    var r = new512();

    function XLPS(x, y) {
        copy512(r, x);
        xor512(r, y);
        for (var i = 0; i < 8; i++) {
            var z0,
                z1,
                k = get8(r, i) << 1;
            z0 = Ax[k];
            z1 = Ax[k + 1];
            for (var j = 1; j < 8; j++) {
                k = (j << 9) + (get8(r, (j << 3) + i) << 1);
                z0 = z0 ^ Ax[k];
                z1 = z1 ^ Ax[k + 1];
            }
            x[i << 1] = z0;
            x[(i << 1) + 1] = z1;
        }
    }

    var data = new512(),
        Ki = new512();

    function g(h, N, m) {
        var i;

        copy512(data, h);
        XLPS(data, N);

        /* Starting E() */
        copy512(Ki, data);
        XLPS(data, m);

        for (i = 0; i < 11; i++) {
            XLPS(Ki, C[i]);
            XLPS(data, Ki);
        }

        XLPS(Ki, C[11]);
        xor512(data, Ki);
        /* E() done */

        xor512(h, data);
        xor512(h, m);
    }

    // Stages
    function stage2(d) {
        var m = get512(d);
        g(h, N, m);

        add512(N, buffer512);
        add512(sigma, m);
    }

    function stage3(d) {
        var n = d.length;
        if (n > 63) return;

        var b0 = new Int32Array(16);
        b0[0] = n << 3;

        var b = new Uint8Array(64);
        for (var i = 0; i < n; i++) {
            b[i] = d[i];
        }b[n] = 0x01;

        var m = get512(b),
            m0 = get512(b0);
        g(h, N, m);

        add512(N, m0);
        add512(sigma, m);

        g(h, buffer0, N);
        g(h, buffer0, sigma);
    }

    return function (data) {

        // Cleanup
        sigma = new512();
        N = new512();

        // Initial vector
        h = new512();
        for (var i = 0; i < 16; i++) {
            if (this.bitLength === 256) h[i] = 0x01010101;
        } // Make data
        var d = new Uint8Array(buffer(data));

        var n = d.length;
        var r = n % 64,
            q = (n - r) / 64;

        for (var i = 0; i < q; i++) {
            stage2.call(this, new Uint8Array(d.buffer, i * 64, 64));
        }stage3.call(this, new Uint8Array(d.buffer, q * 64, r));

        var digest;
        if (this.bitLength === 256) {
            digest = new Int32Array(8);
            for (var i = 0; i < 8; i++) {
                digest[i] = h[8 + i];
            }
        } else {
            digest = new Int32Array(16);
            for (var i = 0; i < 16; i++) {
                digest[i] = h[i];
            }
        }
        // Swap hash for SignalCom
        if (this.procreator === 'SC' || this.procreator === 'VN') return swap(digest.buffer);else return digest.buffer;
    };
} // </editor-fold>
();

/**
 * Algorithm name GOST R 34.11-94<br><br>
 *
 * http://tools.ietf.org/html/rfc5831
 *
 * The digest method returns digest data in according to GOST R 34.11-94.
 * @memberOf GostDigest
 * @method digest
 * @instance
 * @param {(ArrayBuffer|TypedArray)} data Data
 * @returns {ArrayBuffer} Digest of data
 */
var digest94 = function () // <editor-fold defaultstate="collapsed">
{
    var C, H, M, Sum;

    // (i + 1 + 4(k - 1)) = 8i + k      i = 0-3, k = 1-8
    function P(d) {
        var K = new Uint8Array(32);

        for (var k = 0; k < 8; k++) {
            K[4 * k] = d[k];
            K[1 + 4 * k] = d[8 + k];
            K[2 + 4 * k] = d[16 + k];
            K[3 + 4 * k] = d[24 + k];
        }

        return K;
    }

    //A (x) = (x0 ^ x1) || x3 || x2 || x1
    function A(d) {
        var a = new Uint8Array(8);

        for (var j = 0; j < 8; j++) {
            a[j] = d[j] ^ d[j + 8];
        }

        arraycopy(d, 8, d, 0, 24);
        arraycopy(a, 0, d, 24, 8);

        return d;
    }

    // (in:) n16||..||n1 ==> (out:) n1^n2^n3^n4^n13^n16||n16||..||n2
    function fw(d) {
        var wS = new Uint16Array(d.buffer, 0, 16);
        var wS15 = wS[0] ^ wS[1] ^ wS[2] ^ wS[3] ^ wS[12] ^ wS[15];
        arraycopy(wS, 1, wS, 0, 15);
        wS[15] = wS15;
    }

    //Encrypt function, ECB mode
    function encrypt(key, s, sOff, d, dOff) {
        var t = new Uint8Array(8);
        arraycopy(d, dOff, t, 0, 8);
        var r = new Uint8Array(this.cipher.encrypt(key, t));
        arraycopy(r, 0, s, sOff, 8);
    }

    // block processing
    function process(d, dOff) {
        var S = new Uint8Array(32),
            U = new Uint8Array(32),
            V = new Uint8Array(32),
            W = new Uint8Array(32);

        arraycopy(d, dOff, M, 0, 32);

        //key step 1

        // H = h3 || h2 || h1 || h0
        // S = s3 || s2 || s1 || s0
        arraycopy(H, 0, U, 0, 32);
        arraycopy(M, 0, V, 0, 32);
        for (var j = 0; j < 32; j++) {
            W[j] = U[j] ^ V[j];
        }
        // Encrypt GOST 28147-ECB
        encrypt.call(this, P(W), S, 0, H, 0); // s0 = EK0 [h0]

        //keys step 2,3,4
        for (var i = 1; i < 4; i++) {
            var tmpA = A(U);
            for (var j = 0; j < 32; j++) {
                U[j] = tmpA[j] ^ C[i][j];
            }
            V = A(A(V));
            for (var j = 0; j < 32; j++) {
                W[j] = U[j] ^ V[j];
            }
            // Encrypt GOST 28147-ECB
            encrypt.call(this, P(W), S, i * 8, H, i * 8); // si = EKi [hi]
        }

        // x(M, H) = y61(H^y(M^y12(S)))
        for (var n = 0; n < 12; n++) {
            fw(S);
        }
        for (var n = 0; n < 32; n++) {
            S[n] = S[n] ^ M[n];
        }

        fw(S);

        for (var n = 0; n < 32; n++) {
            S[n] = H[n] ^ S[n];
        }
        for (var n = 0; n < 61; n++) {
            fw(S);
        }
        arraycopy(S, 0, H, 0, H.length);
    }

    //  256 bitsblock modul -> (Sum + a mod (2^256))
    function summing(d) {
        var carry = 0;
        for (var i = 0; i < Sum.length; i++) {
            var sum = (Sum[i] & 0xff) + (d[i] & 0xff) + carry;

            Sum[i] = sum;

            carry = sum >>> 8;
        }
    }

    // reset the chaining variables to the IV values.
    var C2 = new Uint8Array([0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0xFF, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0xFF, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0xFF]);

    return function (data) {

        // Reset buffers
        H = new Uint8Array(32);
        M = new Uint8Array(32);
        Sum = new Uint8Array(32);

        // Reset IV value
        C = new Array(4);
        for (var i = 0; i < 4; i++) {
            C[i] = new Uint8Array(32);
        }arraycopy(C2, 0, C[2], 0, C2.length);

        // Make data
        var d = new Uint8Array(buffer(data));

        var n = d.length;
        var r = n % 32,
            q = (n - r) / 32;

        // Proccess full blocks
        for (var i = 0; i < q; i++) {
            var b = new Uint8Array(d.buffer, i * 32, 32);

            summing.call(this, b); // calc sum M
            process.call(this, b, 0);
        }

        // load d the remadder with padding zero;
        if (r > 0) {
            var b = new Uint8Array(d.buffer, q * 32),
                c = new Uint8Array(32);
            arraycopy(b, 0, c, 0, r);
            summing.call(this, c); // calc sum M
            process.call(this, c, 0);
        }

        // get length into L (byteCount * 8 = bitCount) in little endian.
        var L = new Uint8Array(32),
            n8 = n * 8,
            k = 0;
        while (n8 > 0) {
            L[k++] = n8 & 0xff;
            n8 = Math.floor(n8 / 256);
        }
        process.call(this, L, 0);
        process.call(this, Sum, 0);

        var h = H.buffer;

        // Swap hash for SignalCom
        if (this.procreator === 'SC') h = swap(h);

        return h;
    };
} // </editor-fold>
();

/**
 * Algorithm name SHA-1<br><br>
 *
 * https://tools.ietf.org/html/rfc3174
 *
 * The digest method returns digest data in according to SHA-1.<br>
 *
 * @memberOf GostDigest
 * @method digest
 * @instance
 * @param {(ArrayBuffer|TypedArray)} data Data
 * @returns {ArrayBuffer} Digest of data
 */
var digestSHA1 = function () // <editor-fold defaultstate="collapsed">
{

    // Create a buffer for each 80 word block.
    var state,
        block = new Uint32Array(80);

    function common(a, e, w, k, f) {
        return f + e + w + k + (a << 5 | a >>> 27) >>> 0;
    }

    function f1(a, b, c, d, e, w) {
        return common(a, e, w, 0x5A827999, d ^ b & (c ^ d));
    }

    function f2(a, b, c, d, e, w) {
        return common(a, e, w, 0x6ED9EBA1, b ^ c ^ d);
    }

    function f3(a, b, c, d, e, w) {
        return common(a, e, w, 0x8F1BBCDC, b & c | d & (b | c));
    }

    function f4(a, b, c, d, e, w) {
        return common(a, e, w, 0xCA62C1D6, b ^ c ^ d);
    }

    function cycle(state, block) {
        var a = state[0],
            b = state[1],
            c = state[2],
            d = state[3],
            e = state[4];

        // Partially unroll loops so we don't have to shift variables.
        var fn = f1;
        for (var i = 0; i < 80; i += 5) {
            if (i === 20) {
                fn = f2;
            } else if (i === 40) {
                fn = f3;
            } else if (i === 60) {
                fn = f4;
            }
            e = fn(a, b, c, d, e, block[i]);
            b = (b << 30 | b >>> 2) >>> 0;
            d = fn(e, a, b, c, d, block[i + 1]);
            a = (a << 30 | a >>> 2) >>> 0;
            c = fn(d, e, a, b, c, block[i + 2]);
            e = (e << 30 | e >>> 2) >>> 0;
            b = fn(c, d, e, a, b, block[i + 3]);
            d = (d << 30 | d >>> 2) >>> 0;
            a = fn(b, c, d, e, a, block[i + 4]);
            c = (c << 30 | c >>> 2) >>> 0;
        }
        state[0] += a;
        state[1] += b;
        state[2] += c;
        state[3] += d;
        state[4] += e;
    }

    // Swap bytes for 32bits word
    function swap32(b) {
        return (b & 0xff) << 24 | (b & 0xff00) << 8 | b >> 8 & 0xff00 | b >> 24 & 0xff;
    }

    // input is a Uint8Array bitstream of the data
    return function (data) {
        var d = new Uint8Array(buffer(data)),
            dlen = d.length;

        // Pad the input string length.
        var len = dlen + 9;
        if (len % 64) {
            len += 64 - len % 64;
        }

        state = new Uint32Array(5);
        state[0] = 0x67452301;
        state[1] = 0xefcdab89;
        state[2] = 0x98badcfe;
        state[3] = 0x10325476;
        state[4] = 0xc3d2e1f0;

        for (var ofs = 0; ofs < len; ofs += 64) {

            // Copy input to block and write padding as needed
            for (var i = 0; i < 64; i++) {
                var b = 0,
                    o = ofs + i;
                if (o < dlen) {
                    b = d[o];
                } else if (o === dlen) {
                    b = 0x80;
                } else {
                    // Write original bit length as a 64bit big-endian integer to the end.
                    var x = len - o - 1;
                    if (x >= 0 && x < 4) {
                        b = dlen << 3 >>> x * 8 & 0xff;
                    }
                }

                // Interpret the input bytes as big-endian per the spec
                if (i % 4 === 0) {
                    block[i >> 2] = b << 24;
                } else {
                    block[i >> 2] |= b << (3 - i % 4) * 8;
                }
            }

            // Extend the block
            for (var i = 16; i < 80; i++) {
                var w = block[i - 3] ^ block[i - 8] ^ block[i - 14] ^ block[i - 16];
                block[i] = w << 1 | w >>> 31;
            }

            cycle(state, block);
        }

        // Swap the bytes around since they are big endian internally
        for (var i = 0; i < 5; i++) {
            state[i] = swap32(state[i]);
        }return state.buffer;
    };
} // </editor-fold>
();

/**
 * Algorithm name GOST R 34.11-HMAC<br><br>
 *
 * HMAC with the specified hash function.
 * @memberOf GostDigest
 * @method sign
 * @instance
 * @param {ArrayBuffer} key The key for HMAC.
 * @param {Hash} data Data
 */
function signHMAC(key, data) // <editor-fold defaultstate="collapsed">
{
    // GOST R 34.11-94 - B=32b, L=32b
    // GOST R 34.11-256 - B=64b, L=32b
    // GOST R 34.11-512 - B=64b, L=64b
    var b = this.digest === digest94 ? 32 : 64,
        l = this.bitLength / 8,
        k = buffer(key),
        d = buffer(data),
        k0;
    if (k.byteLength === b) k0 = new Uint8Array(k);else {
        var k0 = new Uint8Array(b);
        if (k.byteLength > b) {
            k0.set(new Uint8Array(this.digest(k)));
        } else {
            k0.set(new Uint8Array(k));
        }
    }
    var s0 = new Uint8Array(b + d.byteLength),
        s1 = new Uint8Array(b + l);
    for (var i = 0; i < b; i++) {
        s0[i] = k0[i] ^ 0x36;
        s1[i] = k0[i] ^ 0x5C;
    }
    s0.set(new Uint8Array(d), b);
    s1.set(new Uint8Array(this.digest(s0)), b);
    return this.digest(s1);
} // </editor-fold>

/**
 * Algorithm name GOST R 34.11-HMAC<br><br>
 *
 * Verify HMAC based on GOST R 34.11 hash
 *
 * @memberOf GostDigest
 * @method verify
 * @instance
 * @param {(ArrayBuffer|TypedArray)} key Key which used for HMAC generation
 * @param {(ArrayBuffer|TypedArray)} signature generated HMAC
 * @param {(ArrayBuffer|TypedArray)} data Data
 * @returns {boolean} HMAC verified = true
 */
function verifyHMAC(key, signature, data) // <editor-fold defaultstate="collapsed">
{
    var hmac = new Uint8Array(this.sign(key, data)),
        test = new Uint8Array(signature);
    if (hmac.length !== test.length) return false;
    for (var i = 0, n = hmac.length; i < n; i++) {
        if (hmac[i] !== test[i]) return false;
    }return true;
} // </editor-fold>


/**
 * Algorithm name GOST R 34.11-KDF<br><br>
 *
 * Simple generate key 256/512 bit random seed for derivation algorithms
 *
 * @memberOf GostDigest
 * @method generateKey
 * @instance
 * @returns {ArrayBuffer} Generated key
 */
function generateKey() // <editor-fold defaultstate="collapsed">
{
    return (0, _seeds.getSeed)(this.bitLength).buffer;
} // </editor-fold>

/**
 * Algorithm name GOST R 34.11-PFXKDF<br><br>
 *
 * Derive bits from password (PKCS12 mode)
 *  <ul>
 *      <li>algorithm.salt - random value, salt</li>
 *      <li>algorithm.iterations - number of iterations</li>
 *  </ul>
 * @memberOf GostDigest
 * @method deriveBits
 * @instance
 * @param {ArrayBuffer} baseKey - password after UTF-8 decoding
 * @param {number} length output bit-length
 * @returns {ArrayBuffer} result
 */
function deriveBitsPFXKDF(baseKey, length) // <editor-fold defaultstate="collapsed">
{
    if (length % 8 > 0) throw new _errors.DataError('Length must multiple of 8');
    var u = this.bitLength / 8,
        v = this.digest === digest94 ? 32 : 64,
        n = length / 8,
        r = this.iterations;
    //   1.  Construct a string, D (the "diversifier"), by concatenating v/8
    //       copies of ID.
    var ID = this.diversifier,
        D = new Uint8Array(v);
    for (var i = 0; i < v; i++) {
        D[i] = ID;
    } //   2.  Concatenate copies of the salt together to create a string S of
    //       length v(ceiling(s/v)) bits (the final copy of the salt may be
    //       truncated to create S).  Note that if the salt is the empty
    //       string, then so is S.
    var S0 = new Uint8Array(buffer(this.salt)),
        s = S0.length,
        slen = v * Math.ceil(s / v),
        S = new Uint8Array(slen);
    for (var i = 0; i < slen; i++) {
        S[i] = S0[i % s];
    } //   3.  Concatenate copies of the password together to create a string P
    //       of length v(ceiling(p/v)) bits (the final copy of the password
    //       may be truncated to create P).  Note that if the password is the
    //       empty string, then so is P.
    var P0 = new Uint8Array(buffer(baseKey)),
        p = P0.length,
        plen = v * Math.ceil(p / v),
        P = new Uint8Array(plen);
    for (var i = 0; i < plen; i++) {
        P[i] = P0[i % p];
    } //   4.  Set I=S||P to be the concatenation of S and P.
    var I = new Uint8Array(slen + plen);
    arraycopy(S, 0, I, 0, slen);
    arraycopy(P, 0, I, slen, plen);
    //   5.  Set c=ceiling(n/u).
    var c = Math.ceil(n / u);
    //   6.  For i=1, 2, ..., c, do the following:
    var A = new Uint8Array(c * u);
    for (var i = 0; i < c; i++) {
        //  A.  Set A2=H^r(D||I). (i.e., the r-th hash of D||1,
        //      H(H(H(... H(D||I))))
        var H = new Uint8Array(v + slen + plen);
        arraycopy(D, 0, H, 0, v);
        arraycopy(I, 0, H, v, slen + plen);
        for (var j = 0; j < r; j++) {
            H = new Uint8Array(this.digest(H));
        }arraycopy(H, 0, A, i * u, u);
        //  B.  Concatenate copies of Ai to create a string B of length v
        //      bits (the final copy of Ai may be truncated to create B).
        var B = new Uint8Array(v);
        for (var j = 0; j < v; j++) {
            B[j] = H[j % u];
        } //  C.  Treating I as a concatenation I_0, I_1, ..., I_(k-1) of v-bit
        //      blocks, where k=ceiling(s/v)+ceiling(p/v), modify I by
        //      setting I_j=(I_j+B+1) mod 2^v for each j.
        var k = (slen + plen) / v;
        for (j = 0; j < k; j++) {
            var cf = 1,
                w;
            for (var l = v - 1; l >= 0; --l) {
                w = I[v * j + l] + B[l] + cf;
                cf = w >>> 8;
                I[v * j + l] = w & 0xff;
            }
        }
    }
    //   7.  Concatenate A_1, A_2, ..., A_c together to form a pseudorandom
    //       bit string, A.
    //   8.  Use the first n bits of A as the output of this entire process.
    var R = new Uint8Array(n);
    arraycopy(A, 0, R, 0, n);
    return R.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST R 34.11-KDF<br><br>
 *
 * Derive bits for KEK deversification in 34.10-2012 algorithm
 * KDF(KEK, UKM, label) = HMAC256 (KEK,  0x01|label|0x00|UKM|0x01|0x00)
 * Default label = 0x26|0xBD|0xB8|0x78
 *
 * @memberOf GostDigest
 * @method deriveBits
 * @instance
 * @param {(ArrayBuffer|TypedArray)} baseKey base key for deriviation
 * @param {number} length output bit-length
 * @returns {ArrayBuffer} result
 */
function deriveBitsKDF(baseKey, length) // <editor-fold defaultstate="collapsed">
{
    if (length % 8 > 0) throw new _errors.DataError('Length must be multiple of 8');
    var rlen = length / 8,
        label,
        context = new Uint8Array(buffer(this.context)),
        blen = this.bitLength / 8,
        n = Math.ceil(rlen / blen);
    if (this.label) label = new Uint8Array(buffer(this.label));else label = new Uint8Array([0x26, 0xBD, 0xB8, 0x78]);
    var result = new Uint8Array(rlen);
    for (var i = 0; i < n; i++) {
        var data = new Uint8Array(label.length + context.length + 4);
        data[0] = i + 1;
        data.set(label, 1);
        data[label.length + 1] = 0x00;
        data.set(context, label.length + 2);
        data[data.length - 2] = length >>> 8;
        data[data.length - 1] = length & 0xff;
        result.set(new Uint8Array(signHMAC.call(this, baseKey, data), 0, i < n - 1 ? blen : rlen - i * blen), i * blen);
    }
    return result.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST R 34.11-PBKDF1<br><br>
 *
 * Derive bits from password
 *  <ul>
 *      <li>algorithm.salt - random value, salt</li>
 *      <li>algorithm.iterations - number of iterations</li>
 *  </ul>
 * @memberOf GostDigest
 * @method deriveBits
 * @instance
 * @param {ArrayBuffer} baseKey - password after UTF-8 decoding
 * @param {number} length output bit-length
 * @returns {ArrayBuffer} result
 */
function deriveBitsPBKDF1(baseKey, length) // <editor-fold defaultstate="collapsed">
{
    if (length < this.bitLength / 2 || length % 8 > 0) throw new _errors.DataError('Length must be more than ' + this.bitLength / 2 + ' bits and multiple of 8');
    var hLen = this.bitLength / 8,
        dkLen = length / 8,
        c = this.iterations,
        P = new Uint8Array(buffer(baseKey)),
        S = new Uint8Array(buffer(this.salt)),
        slen = S.length,
        plen = P.length,
        T = new Uint8Array(plen + slen),
        DK = new Uint8Array(dkLen);
    if (dkLen > hLen) throw new _errors.DataError('Invalid parameters: Length value');
    arraycopy(P, 0, T, 0, plen);
    arraycopy(S, 0, T, plen, slen);
    for (var i = 0; i < c; i++) {
        T = new Uint8Array(this.digest(T));
    }arraycopy(T, 0, DK, 0, dkLen);
    return DK.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST R 34.11-PBKDF2<br><br>
 *
 * Derive bits from password
 *  <ul>
 *      <li>algorithm.salt - random value, salt</li>
 *      <li>algorithm.iterations - number of iterations</li>
 *  </ul>
 * @memberOf GostDigest
 * @method deriveBits
 * @instance
 * @param {ArrayBuffer} baseKey - password after UTF-8 decoding
 * @param {number} length output bit-length
 * @returns {ArrayBuffer} result
 */
function deriveBitsPBKDF2(baseKey, length) // <editor-fold defaultstate="collapsed">
{
    var diversifier = this.diversifier || 1; // For PKCS12 MAC required 3*length
    length = length * diversifier;
    if (length < this.bitLength / 2 || length % 8 > 0) throw new _errors.DataError('Length must be more than ' + this.bitLength / 2 + ' bits and multiple of 8');
    var hLen = this.bitLength / 8,
        dkLen = length / 8,
        c = this.iterations,
        P = new Uint8Array(buffer(baseKey)),
        S = new Uint8Array(buffer(this.salt));
    var slen = S.byteLength,
        data = new Uint8Array(slen + 4);
    arraycopy(S, 0, data, 0, slen);

    if (dkLen > (0xffffffff - 1) * 32) throw new _errors.DataError('Invalid parameters: Length value');
    var n = Math.ceil(dkLen / hLen),
        DK = new Uint8Array(dkLen);
    for (var i = 1; i <= n; i++) {
        data[slen] = i >>> 24 & 0xff;
        data[slen + 1] = i >>> 16 & 0xff;
        data[slen + 2] = i >>> 8 & 0xff;
        data[slen + 3] = i & 0xff;

        var U = new Uint8Array(signHMAC.call(this, P, data)),
            Z = U;
        for (var j = 1; j < c; j++) {
            U = new Uint8Array(signHMAC.call(this, P, U));
            for (var k = 0; k < hLen; k++) {
                Z[k] = U[k] ^ Z[k];
            }
        }
        var ofs = (i - 1) * hLen;
        arraycopy(Z, 0, DK, ofs, Math.min(hLen, dkLen - ofs));
    }
    if (diversifier > 1) {
        var rLen = dkLen / diversifier,
            R = new Uint8Array(rLen);
        arraycopy(DK, dkLen - rLen, R, 0, rLen);
        return R.buffer;
    } else return DK.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST R 34.11-CPKDF<br><br>
 *
 * Derive bits from password. CryptoPro algorithm
 *  <ul>
 *      <li>algorithm.salt - random value, salt</li>
 *      <li>algorithm.iterations - number of iterations</li>
 *  </ul>
 * @memberOf GostDigest
 * @method deriveBits
 * @instance
 * @param {ArrayBuffer} baseKey - password after UTF-8 decoding
 * @param {number} length output bit-length
 * @returns {ArrayBuffer} result
 */
function deriveBitsCP(baseKey, length) {
    if (length > this.bitLength || length % 8 > 0) throw new _errors.DataError('Length can\'t be more than ' + this.bitLength + ' bits and multiple of 8');
    // GOST R 34.11-94 - B=32b, L=32b
    // GOST R 34.11-256 - B=64b, L=32b
    // GOST R 34.11-512 - B=64b, L=64b
    var b = this.digest === digest94 ? 32 : 64,
        l = this.bitLength / 8,
        p = baseKey && baseKey.byteLength > 0 ? new Uint8Array(buffer(baseKey)) : false,
        plen = p ? p.length : 0,
        iterations = this.iterations,
        salt = new Uint8Array(buffer(this.salt)),
        slen = salt.length,
        d = new Uint8Array(slen + plen);
    arraycopy(salt, 0, d, 0, slen);
    if (p) arraycopy(p, 0, d, slen, plen);

    var h = new Uint8Array(this.digest(d)),
        k = new Uint8Array(b),
        s0 = new Uint8Array(b),
        s1 = new Uint8Array(b);
    var c = 'DENEFH028.760246785.IUEFHWUIO.EF';
    for (var i = 0; i < c.length; i++) {
        k[i] = c.charCodeAt(i);
    }d = new Uint8Array(2 * (b + l));
    for (var j = 0; j < iterations; j++) {
        for (var i = 0; i < b; i++) {
            s0[i] = k[i] ^ 0x36;
            s1[i] = k[i] ^ 0x5C;
            k[i] = 0;
        }
        arraycopy(s0, 0, d, 0, b);
        arraycopy(h, 0, d, b, l);
        arraycopy(s1, 0, d, b + l, b);
        arraycopy(h, 0, d, b + l + b, l);
        arraycopy(new Uint8Array(this.digest(d)), 0, k, 0, l);
    }
    for (var i = 0; i < l; i++) {
        s0[i] = k[i] ^ 0x36;
        s1[i] = k[i] ^ 0x5C;
        k[i] = 0;
    }
    d = new Uint8Array(2 * l + slen + plen);
    arraycopy(s0, 0, d, 0, l);
    arraycopy(salt, 0, d, l, slen);
    arraycopy(s1, 0, d, l + slen, l);
    if (p) arraycopy(p, 0, d, l + slen + l, plen);
    h = this.digest(this.digest(d));
    if (length === this.bitLength) return h;else {
        var rlen = length / 8,
            r = new Uint8Array(rlen);
        arraycopy(h, 0, r, 0, rlen);
        return r.buffer;
    }
}

/**
 * Algorithm name GOST R 34.11-KDF or GOST R 34.11-PBKDF2 or other<br><br>
 *
 * Derive key from derive bits subset
 *
 * @memberOf GostDigest
 * @method deriveKey
 * @instance
 * @param {ArrayBuffer} baseKey
 * @returns {ArrayBuffer}
 */
function deriveKey(baseKey) // <editor-fold defaultstate="collapsed">
{
    return this.deriveBits(baseKey, this.keySize * 8);
} // </editor-fold>

/**
 * GOST R 34.11 Algorithm<br><br>
 *
 * References: {@link http://tools.ietf.org/html/rfc6986} and {@link http://tools.ietf.org/html/rfc5831}<br><br>
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
 *              <li><b>PFXKDF</b> Password based PFX key dirivation algorithms</li>
 *              <li><b>CPKDF</b> CpyptoPro Password based key dirivation algorithms</li>
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
 *              <li><b>diversifier</b> Deversifier, ID=1 - key material for performing encryption or decryption, ID=3 - integrity key for MACing</li>
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
 * @class GostDigest
 * @param {AlgorithmIdentifier} algorithm WebCryptoAPI algorithm identifier
 */
function GostDigest(algorithm) // <editor-fold defaultstate="collapsed">
{
    algorithm = algorithm || {};

    this.name = (algorithm.name || 'GOST R 34.10') + '-' + (algorithm.version || 2012) % 100 + ((algorithm.version || 2012) > 1 ? '-' + (algorithm.length || 256) : '') + ((algorithm.mode || 'HASH') !== 'HASH' ? '-' + algorithm.mode : '') + (algorithm.procreator ? '/' + algorithm.procreator : '') + (typeof algorithm.sBox === 'string' ? '/' + algorithm.sBox : '');

    // Algorithm procreator
    this.procreator = algorithm.procreator;

    // Bit length
    this.bitLength = algorithm.length || 256;

    switch (algorithm.version || 2012) {
        case 1:
            // SHA-1
            this.digest = digestSHA1;
            this.bitLength = 160;
            break;
        case 1994:
            this.digest = digest94;
            // Define chiper algorithm
            this.sBox = (algorithm.sBox || (algorithm.procreator === 'SC' ? 'D-SC' : 'D-A')).toUpperCase();

            this.cipher = new _gostCipher.GostCipher({
                name: 'GOST 28147',
                block: 'ECB',
                sBox: this.sBox,
                procreator: this.procreator
            });

            break;
        case 2012:
            this.digest = digest2012;
            break;
        default:
            throw new _errors.NotSupportedError('Algorithm version ' + algorithm.version + ' not supported');
    }

    // Key size
    this.keySize = algorithm.keySize || (algorithm.version <= 2 ? this.bitLength / 8 : 32);

    switch (algorithm.mode || 'HASH') {
        case 'HASH':
            break;
        case 'HMAC':
            this.sign = signHMAC;
            this.verify = verifyHMAC;
            this.generateKey = generateKey;
            break;
        case 'KDF':
            this.deriveKey = deriveKey;
            this.deriveBits = deriveBitsKDF;
            this.label = algorithm.label;
            this.context = algorithm.context;
            break;
        case 'PBKDF2':
            this.deriveKey = deriveKey;
            this.deriveBits = deriveBitsPBKDF2;
            this.generateKey = generateKey;
            this.salt = algorithm.salt;
            this.iterations = algorithm.iterations || 2000;
            this.diversifier = algorithm.diversifier || 1;
            break;
        case 'PFXKDF':
            this.deriveKey = deriveKey;
            this.deriveBits = deriveBitsPFXKDF;
            this.generateKey = generateKey;
            this.salt = algorithm.salt;
            this.iterations = algorithm.iterations || 2000;
            this.diversifier = algorithm.diversifier || 1;
            break;
        case 'CPKDF':
            this.deriveKey = deriveKey;
            this.deriveBits = deriveBitsCP;
            this.generateKey = generateKey;
            this.salt = algorithm.salt;
            this.iterations = algorithm.iterations || 2000;
            break;
        default:
            throw new _errors.NotSupportedError('Algorithm mode ' + algorithm.mode + ' not supported');
    }
} // </editor-fold>

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GostCipher = GostCipher;

var _errors = __webpack_require__(0);

var _seeds = __webpack_require__(1);

/*
 * Initial parameters and common algortithms of GOST 28147-89
 *
 * http://tools.ietf.org/html/rfc5830
 *
 */ // <editor-fold defaultstate="collapsed">

/**
 * @file GOST 28147-89/GOST R 34.12-2015/GOST R 32.13-2015 Encryption Algorithm
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

var CryptoOperationData = ArrayBuffer;

/*
 * Check supported
 * This implementation support only Little Endian arhitecture
 */

var littleEndian = function () {
    var buffer = new CryptoOperationData(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
}();

// Default initial vector
var defaultIV = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

// Predefined sBox collection
var sBoxes = {
    'E-TEST': [0x4, 0x2, 0xF, 0x5, 0x9, 0x1, 0x0, 0x8, 0xE, 0x3, 0xB, 0xC, 0xD, 0x7, 0xA, 0x6, 0xC, 0x9, 0xF, 0xE, 0x8, 0x1, 0x3, 0xA, 0x2, 0x7, 0x4, 0xD, 0x6, 0x0, 0xB, 0x5, 0xD, 0x8, 0xE, 0xC, 0x7, 0x3, 0x9, 0xA, 0x1, 0x5, 0x2, 0x4, 0x6, 0xF, 0x0, 0xB, 0xE, 0x9, 0xB, 0x2, 0x5, 0xF, 0x7, 0x1, 0x0, 0xD, 0xC, 0x6, 0xA, 0x4, 0x3, 0x8, 0x3, 0xE, 0x5, 0x9, 0x6, 0x8, 0x0, 0xD, 0xA, 0xB, 0x7, 0xC, 0x2, 0x1, 0xF, 0x4, 0x8, 0xF, 0x6, 0xB, 0x1, 0x9, 0xC, 0x5, 0xD, 0x3, 0x7, 0xA, 0x0, 0xE, 0x2, 0x4, 0x9, 0xB, 0xC, 0x0, 0x3, 0x6, 0x7, 0x5, 0x4, 0x8, 0xE, 0xF, 0x1, 0xA, 0x2, 0xD, 0xC, 0x6, 0x5, 0x2, 0xB, 0x0, 0x9, 0xD, 0x3, 0xE, 0x7, 0xA, 0xF, 0x4, 0x1, 0x8],
    'E-A': [0x9, 0x6, 0x3, 0x2, 0x8, 0xB, 0x1, 0x7, 0xA, 0x4, 0xE, 0xF, 0xC, 0x0, 0xD, 0x5, 0x3, 0x7, 0xE, 0x9, 0x8, 0xA, 0xF, 0x0, 0x5, 0x2, 0x6, 0xC, 0xB, 0x4, 0xD, 0x1, 0xE, 0x4, 0x6, 0x2, 0xB, 0x3, 0xD, 0x8, 0xC, 0xF, 0x5, 0xA, 0x0, 0x7, 0x1, 0x9, 0xE, 0x7, 0xA, 0xC, 0xD, 0x1, 0x3, 0x9, 0x0, 0x2, 0xB, 0x4, 0xF, 0x8, 0x5, 0x6, 0xB, 0x5, 0x1, 0x9, 0x8, 0xD, 0xF, 0x0, 0xE, 0x4, 0x2, 0x3, 0xC, 0x7, 0xA, 0x6, 0x3, 0xA, 0xD, 0xC, 0x1, 0x2, 0x0, 0xB, 0x7, 0x5, 0x9, 0x4, 0x8, 0xF, 0xE, 0x6, 0x1, 0xD, 0x2, 0x9, 0x7, 0xA, 0x6, 0x0, 0x8, 0xC, 0x4, 0x5, 0xF, 0x3, 0xB, 0xE, 0xB, 0xA, 0xF, 0x5, 0x0, 0xC, 0xE, 0x8, 0x6, 0x2, 0x3, 0x9, 0x1, 0x7, 0xD, 0x4],
    'E-B': [0x8, 0x4, 0xB, 0x1, 0x3, 0x5, 0x0, 0x9, 0x2, 0xE, 0xA, 0xC, 0xD, 0x6, 0x7, 0xF, 0x0, 0x1, 0x2, 0xA, 0x4, 0xD, 0x5, 0xC, 0x9, 0x7, 0x3, 0xF, 0xB, 0x8, 0x6, 0xE, 0xE, 0xC, 0x0, 0xA, 0x9, 0x2, 0xD, 0xB, 0x7, 0x5, 0x8, 0xF, 0x3, 0x6, 0x1, 0x4, 0x7, 0x5, 0x0, 0xD, 0xB, 0x6, 0x1, 0x2, 0x3, 0xA, 0xC, 0xF, 0x4, 0xE, 0x9, 0x8, 0x2, 0x7, 0xC, 0xF, 0x9, 0x5, 0xA, 0xB, 0x1, 0x4, 0x0, 0xD, 0x6, 0x8, 0xE, 0x3, 0x8, 0x3, 0x2, 0x6, 0x4, 0xD, 0xE, 0xB, 0xC, 0x1, 0x7, 0xF, 0xA, 0x0, 0x9, 0x5, 0x5, 0x2, 0xA, 0xB, 0x9, 0x1, 0xC, 0x3, 0x7, 0x4, 0xD, 0x0, 0x6, 0xF, 0x8, 0xE, 0x0, 0x4, 0xB, 0xE, 0x8, 0x3, 0x7, 0x1, 0xA, 0x2, 0x9, 0x6, 0xF, 0xD, 0x5, 0xC],
    'E-C': [0x1, 0xB, 0xC, 0x2, 0x9, 0xD, 0x0, 0xF, 0x4, 0x5, 0x8, 0xE, 0xA, 0x7, 0x6, 0x3, 0x0, 0x1, 0x7, 0xD, 0xB, 0x4, 0x5, 0x2, 0x8, 0xE, 0xF, 0xC, 0x9, 0xA, 0x6, 0x3, 0x8, 0x2, 0x5, 0x0, 0x4, 0x9, 0xF, 0xA, 0x3, 0x7, 0xC, 0xD, 0x6, 0xE, 0x1, 0xB, 0x3, 0x6, 0x0, 0x1, 0x5, 0xD, 0xA, 0x8, 0xB, 0x2, 0x9, 0x7, 0xE, 0xF, 0xC, 0x4, 0x8, 0xD, 0xB, 0x0, 0x4, 0x5, 0x1, 0x2, 0x9, 0x3, 0xC, 0xE, 0x6, 0xF, 0xA, 0x7, 0xC, 0x9, 0xB, 0x1, 0x8, 0xE, 0x2, 0x4, 0x7, 0x3, 0x6, 0x5, 0xA, 0x0, 0xF, 0xD, 0xA, 0x9, 0x6, 0x8, 0xD, 0xE, 0x2, 0x0, 0xF, 0x3, 0x5, 0xB, 0x4, 0x1, 0xC, 0x7, 0x7, 0x4, 0x0, 0x5, 0xA, 0x2, 0xF, 0xE, 0xC, 0x6, 0x1, 0xB, 0xD, 0x9, 0x3, 0x8],
    'E-D': [0xF, 0xC, 0x2, 0xA, 0x6, 0x4, 0x5, 0x0, 0x7, 0x9, 0xE, 0xD, 0x1, 0xB, 0x8, 0x3, 0xB, 0x6, 0x3, 0x4, 0xC, 0xF, 0xE, 0x2, 0x7, 0xD, 0x8, 0x0, 0x5, 0xA, 0x9, 0x1, 0x1, 0xC, 0xB, 0x0, 0xF, 0xE, 0x6, 0x5, 0xA, 0xD, 0x4, 0x8, 0x9, 0x3, 0x7, 0x2, 0x1, 0x5, 0xE, 0xC, 0xA, 0x7, 0x0, 0xD, 0x6, 0x2, 0xB, 0x4, 0x9, 0x3, 0xF, 0x8, 0x0, 0xC, 0x8, 0x9, 0xD, 0x2, 0xA, 0xB, 0x7, 0x3, 0x6, 0x5, 0x4, 0xE, 0xF, 0x1, 0x8, 0x0, 0xF, 0x3, 0x2, 0x5, 0xE, 0xB, 0x1, 0xA, 0x4, 0x7, 0xC, 0x9, 0xD, 0x6, 0x3, 0x0, 0x6, 0xF, 0x1, 0xE, 0x9, 0x2, 0xD, 0x8, 0xC, 0x4, 0xB, 0xA, 0x5, 0x7, 0x1, 0xA, 0x6, 0x8, 0xF, 0xB, 0x0, 0x4, 0xC, 0x3, 0x5, 0x9, 0x7, 0xD, 0x2, 0xE],
    'E-SC': [0x3, 0x6, 0x1, 0x0, 0x5, 0x7, 0xd, 0x9, 0x4, 0xb, 0x8, 0xc, 0xe, 0xf, 0x2, 0xa, 0x7, 0x1, 0x5, 0x2, 0x8, 0xb, 0x9, 0xc, 0xd, 0x0, 0x3, 0xa, 0xf, 0xe, 0x4, 0x6, 0xf, 0x1, 0x4, 0x6, 0xc, 0x8, 0x9, 0x2, 0xe, 0x3, 0x7, 0xa, 0xb, 0xd, 0x5, 0x0, 0x3, 0x4, 0xf, 0xc, 0x5, 0x9, 0xe, 0x0, 0x6, 0x8, 0x7, 0xa, 0x1, 0xb, 0xd, 0x2, 0x6, 0x9, 0x0, 0x7, 0xb, 0x8, 0x4, 0xc, 0x2, 0xe, 0xa, 0xf, 0x1, 0xd, 0x5, 0x3, 0x6, 0x1, 0x2, 0xf, 0x0, 0xb, 0x9, 0xc, 0x7, 0xd, 0xa, 0x5, 0x8, 0x4, 0xe, 0x3, 0x0, 0x2, 0xe, 0xc, 0x9, 0x1, 0x4, 0x7, 0x3, 0xf, 0x6, 0x8, 0xa, 0xd, 0xb, 0x5, 0x5, 0x2, 0xb, 0x8, 0x4, 0xc, 0x7, 0x1, 0xa, 0x6, 0xe, 0x0, 0x9, 0x3, 0xd, 0xf],
    'E-Z': [// This is default S-box in according to draft of new standard
    0xc, 0x4, 0x6, 0x2, 0xa, 0x5, 0xb, 0x9, 0xe, 0x8, 0xd, 0x7, 0x0, 0x3, 0xf, 0x1, 0x6, 0x8, 0x2, 0x3, 0x9, 0xa, 0x5, 0xc, 0x1, 0xe, 0x4, 0x7, 0xb, 0xd, 0x0, 0xf, 0xb, 0x3, 0x5, 0x8, 0x2, 0xf, 0xa, 0xd, 0xe, 0x1, 0x7, 0x4, 0xc, 0x9, 0x6, 0x0, 0xc, 0x8, 0x2, 0x1, 0xd, 0x4, 0xf, 0x6, 0x7, 0x0, 0xa, 0x5, 0x3, 0xe, 0x9, 0xb, 0x7, 0xf, 0x5, 0xa, 0x8, 0x1, 0x6, 0xd, 0x0, 0x9, 0x3, 0xe, 0xb, 0x4, 0x2, 0xc, 0x5, 0xd, 0xf, 0x6, 0x9, 0x2, 0xc, 0xa, 0xb, 0x7, 0x8, 0x1, 0x4, 0x3, 0xe, 0x0, 0x8, 0xe, 0x2, 0x5, 0x6, 0x9, 0x1, 0xc, 0xf, 0x4, 0xb, 0x0, 0xd, 0xa, 0x3, 0x7, 0x1, 0x7, 0xe, 0xd, 0x0, 0x5, 0x8, 0x3, 0x4, 0xf, 0xa, 0x6, 0x9, 0xc, 0xb, 0x2],
    //S-box for digest
    'D-TEST': [0x4, 0xA, 0x9, 0x2, 0xD, 0x8, 0x0, 0xE, 0x6, 0xB, 0x1, 0xC, 0x7, 0xF, 0x5, 0x3, 0xE, 0xB, 0x4, 0xC, 0x6, 0xD, 0xF, 0xA, 0x2, 0x3, 0x8, 0x1, 0x0, 0x7, 0x5, 0x9, 0x5, 0x8, 0x1, 0xD, 0xA, 0x3, 0x4, 0x2, 0xE, 0xF, 0xC, 0x7, 0x6, 0x0, 0x9, 0xB, 0x7, 0xD, 0xA, 0x1, 0x0, 0x8, 0x9, 0xF, 0xE, 0x4, 0x6, 0xC, 0xB, 0x2, 0x5, 0x3, 0x6, 0xC, 0x7, 0x1, 0x5, 0xF, 0xD, 0x8, 0x4, 0xA, 0x9, 0xE, 0x0, 0x3, 0xB, 0x2, 0x4, 0xB, 0xA, 0x0, 0x7, 0x2, 0x1, 0xD, 0x3, 0x6, 0x8, 0x5, 0x9, 0xC, 0xF, 0xE, 0xD, 0xB, 0x4, 0x1, 0x3, 0xF, 0x5, 0x9, 0x0, 0xA, 0xE, 0x7, 0x6, 0x8, 0x2, 0xC, 0x1, 0xF, 0xD, 0x0, 0x5, 0x7, 0xA, 0x4, 0x9, 0x2, 0x3, 0xE, 0x6, 0xB, 0x8, 0xC],
    'D-A': [0xA, 0x4, 0x5, 0x6, 0x8, 0x1, 0x3, 0x7, 0xD, 0xC, 0xE, 0x0, 0x9, 0x2, 0xB, 0xF, 0x5, 0xF, 0x4, 0x0, 0x2, 0xD, 0xB, 0x9, 0x1, 0x7, 0x6, 0x3, 0xC, 0xE, 0xA, 0x8, 0x7, 0xF, 0xC, 0xE, 0x9, 0x4, 0x1, 0x0, 0x3, 0xB, 0x5, 0x2, 0x6, 0xA, 0x8, 0xD, 0x4, 0xA, 0x7, 0xC, 0x0, 0xF, 0x2, 0x8, 0xE, 0x1, 0x6, 0x5, 0xD, 0xB, 0x9, 0x3, 0x7, 0x6, 0x4, 0xB, 0x9, 0xC, 0x2, 0xA, 0x1, 0x8, 0x0, 0xE, 0xF, 0xD, 0x3, 0x5, 0x7, 0x6, 0x2, 0x4, 0xD, 0x9, 0xF, 0x0, 0xA, 0x1, 0x5, 0xB, 0x8, 0xE, 0xC, 0x3, 0xD, 0xE, 0x4, 0x1, 0x7, 0x0, 0x5, 0xA, 0x3, 0xC, 0x8, 0xF, 0x6, 0x2, 0x9, 0xB, 0x1, 0x3, 0xA, 0x9, 0x5, 0xB, 0x4, 0xF, 0x8, 0x6, 0x7, 0xE, 0xD, 0x0, 0x2, 0xC],
    'D-SC': [0xb, 0xd, 0x7, 0x0, 0x5, 0x4, 0x1, 0xf, 0x9, 0xe, 0x6, 0xa, 0x3, 0xc, 0x8, 0x2, 0x1, 0x2, 0x7, 0x9, 0xd, 0xb, 0xf, 0x8, 0xe, 0xc, 0x4, 0x0, 0x5, 0x6, 0xa, 0x3, 0x5, 0x1, 0xd, 0x3, 0xf, 0x6, 0xc, 0x7, 0x9, 0x8, 0xb, 0x2, 0x4, 0xe, 0x0, 0xa, 0xd, 0x1, 0xb, 0x4, 0x9, 0xc, 0xe, 0x0, 0x7, 0x5, 0x8, 0xf, 0x6, 0x2, 0xa, 0x3, 0x2, 0xd, 0xa, 0xf, 0x9, 0xb, 0x3, 0x7, 0x8, 0xc, 0x5, 0xe, 0x6, 0x0, 0x1, 0x4, 0x0, 0x4, 0x6, 0xc, 0x5, 0x3, 0x8, 0xd, 0xa, 0xb, 0xf, 0x2, 0x1, 0x9, 0x7, 0xe, 0x1, 0x3, 0xc, 0x8, 0xa, 0x6, 0xb, 0x0, 0x2, 0xe, 0x7, 0x9, 0xf, 0x4, 0x5, 0xd, 0xa, 0xb, 0x6, 0x0, 0x1, 0x3, 0x4, 0x7, 0xe, 0xd, 0x5, 0xf, 0x8, 0x2, 0x9, 0xc]
};

var C = new Uint8Array([0x69, 0x00, 0x72, 0x22, 0x64, 0xC9, 0x04, 0x23, 0x8D, 0x3A, 0xDB, 0x96, 0x46, 0xE9, 0x2A, 0xC4, 0x18, 0xFE, 0xAC, 0x94, 0x00, 0xED, 0x07, 0x12, 0xC0, 0x86, 0xDC, 0xC2, 0xEF, 0x4C, 0xA9, 0x2B]);

function signed(x) {
    return x >= 0x80000000 ? x - 0x100000000 : x;
}

function unsigned(x) {
    return x < 0 ? x + 0x100000000 : x;
}

// Get buffer
function buffer(d) {
    if (d instanceof CryptoOperationData) return d;else if (d && d.buffer && d.buffer instanceof CryptoOperationData) return d.byteOffset === 0 && d.byteLength === d.buffer.byteLength ? d.buffer : new Uint8Array(new Uint8Array(d, d.byteOffset, d.byteLength)).buffer;else throw new _errors.DataError('CryptoOperationData required');
}

// Get byte array
function byteArray(d) {
    return new Uint8Array(buffer(d));
}

// Clone byte array
function cloneArray(d) {
    return new Uint8Array(byteArray(d));
}

// Get int32 array
function intArray(d) {
    return new Int32Array(buffer(d));
}

// Swap bytes for version 2015
function swap32(b) {
    return (b & 0xff) << 24 | (b & 0xff00) << 8 | b >> 8 & 0xff00 | b >> 24 & 0xff;
}

// </editor-fold>

/*
 * Initial parameters and common algortithms of GOST R 34.12-15
 * Algorithm "Kuznechik" 128bit
 *
 */ // <editor-fold defaultstate="collapsed">

// Default initial vector
var defaultIV128 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

// Mult table for R function
var multTable = function () {

    // Multiply two numbers in the GF(2^8) finite field defined
    // by the polynomial x^8 + x^7 + x^6 + x + 1 = 0 */
    function gmul(a, b) {
        var p = 0,
            counter,
            carry;
        for (counter = 0; counter < 8; counter++) {
            if (b & 1) p ^= a;
            carry = a & 0x80; // detect if x^8 term is about to be generated
            a = a << 1 & 0xff;
            if (carry) a ^= 0xc3; // replace x^8 with x^7 + x^6 + x + 1
            b >>= 1;
        }
        return p & 0xff;
    }

    // It is required only this values for R function
    //       0   1   2    3    4    5    6    7
    var x = [1, 16, 32, 133, 148, 192, 194, 251];
    var m = [];
    for (var i = 0; i < 8; i++) {
        m[i] = [];
        for (var j = 0; j < 256; j++) {
            m[i][j] = gmul(x[i], j);
        }
    }
    return m;
}();

// 148, 32, 133, 16, 194, 192, 1, 251, 1, 192, 194, 16, 133, 32, 148, 1
var kB = [4, 2, 3, 1, 6, 5, 0, 7, 0, 5, 6, 1, 3, 2, 4, 0];

// R - function
function funcR(d) {
    var sum = 0;
    for (var i = 0; i < 16; i++) {
        sum ^= multTable[kB[i]][d[i]];
    }for (var i = 16; i > 0; --i) {
        d[i] = d[i - 1];
    }d[0] = sum;
}

function funcReverseR(d) {
    var tmp = d[0];
    for (var i = 0; i < 15; i++) {
        d[i] = d[i + 1];
    }d[15] = tmp;

    var sum = 0;
    for (i = 0; i < 16; i++) {
        sum ^= multTable[kB[i]][d[i]];
    }d[15] = sum;
}

// Nonlinear transformation
var kPi = [252, 238, 221, 17, 207, 110, 49, 22, 251, 196, 250, 218, 35, 197, 4, 77, 233, 119, 240, 219, 147, 46, 153, 186, 23, 54, 241, 187, 20, 205, 95, 193, 249, 24, 101, 90, 226, 92, 239, 33, 129, 28, 60, 66, 139, 1, 142, 79, 5, 132, 2, 174, 227, 106, 143, 160, 6, 11, 237, 152, 127, 212, 211, 31, 235, 52, 44, 81, 234, 200, 72, 171, 242, 42, 104, 162, 253, 58, 206, 204, 181, 112, 14, 86, 8, 12, 118, 18, 191, 114, 19, 71, 156, 183, 93, 135, 21, 161, 150, 41, 16, 123, 154, 199, 243, 145, 120, 111, 157, 158, 178, 177, 50, 117, 25, 61, 255, 53, 138, 126, 109, 84, 198, 128, 195, 189, 13, 87, 223, 245, 36, 169, 62, 168, 67, 201, 215, 121, 214, 246, 124, 34, 185, 3, 224, 15, 236, 222, 122, 148, 176, 188, 220, 232, 40, 80, 78, 51, 10, 74, 167, 151, 96, 115, 30, 0, 98, 68, 26, 184, 56, 130, 100, 159, 38, 65, 173, 69, 70, 146, 39, 94, 85, 47, 140, 163, 165, 125, 105, 213, 149, 59, 7, 88, 179, 64, 134, 172, 29, 247, 48, 55, 107, 228, 136, 217, 231, 137, 225, 27, 131, 73, 76, 63, 248, 254, 141, 83, 170, 144, 202, 216, 133, 97, 32, 113, 103, 164, 45, 43, 9, 91, 203, 155, 37, 208, 190, 229, 108, 82, 89, 166, 116, 210, 230, 244, 180, 192, 209, 102, 175, 194, 57, 75, 99, 182];

var kReversePi = function () {
    var m = [];
    for (var i = 0, n = kPi.length; i < n; i++) {
        m[kPi[i]] = i;
    }return m;
}();

function funcS(d) {
    for (var i = 0; i < 16; ++i) {
        d[i] = kPi[d[i]];
    }
}

function funcReverseS(d) {
    for (var i = 0; i < 16; ++i) {
        d[i] = kReversePi[d[i]];
    }
}

function funcX(a, b) {
    for (var i = 0; i < 16; ++i) {
        a[i] ^= b[i];
    }
}

function funcL(d) {
    for (var i = 0; i < 16; ++i) {
        funcR(d);
    }
}

function funcReverseL(d) {
    for (var i = 0; i < 16; ++i) {
        funcReverseR(d);
    }
}

function funcLSX(a, b) {
    funcX(a, b);
    funcS(a);
    funcL(a);
}

function funcReverseLSX(a, b) {
    funcX(a, b);
    funcReverseL(a);
    funcReverseS(a);
}

function funcF(inputKey, inputKeySecond, iterationConst) {
    var tmp = new Uint8Array(inputKey);
    funcLSX(inputKey, iterationConst);
    funcX(inputKey, inputKeySecond);
    inputKeySecond.set(tmp);
}

function funcC(number, d) {
    for (var i = 0; i < 15; i++) {
        d[i] = 0;
    }d[15] = number;
    funcL(d);
}

// </editor-fold>

/**
 * Key schedule for GOST R 34.12-15 128bits
 *
 * @memberOf GostCipher
 * @private
 * @instance
 * @method keySchedule
 * @param {type} k
 * @returns {Uint8Array}
 */
function keySchedule128(k) // <editor-fold defaultstate="collapsed">
{
    var keys = new Uint8Array(160),
        c = new Uint8Array(16);
    keys.set(byteArray(k));
    for (var j = 0; j < 4; j++) {
        var j0 = 32 * j,
            j1 = 32 * (j + 1);
        keys.set(new Uint8Array(keys.buffer, j0, 32), j1);
        for (var i = 1; i < 9; i++) {
            funcC(j * 8 + i, c);
            funcF(new Uint8Array(keys.buffer, j1, 16), new Uint8Array(keys.buffer, j1 + 16, 16), c);
        }
    }
    return keys;
} // </editor-fold>

/**
 * GOST R 34.12-15 128 bits encrypt/decrypt process
 *
 * @memberOf GostCipher
 * @private
 * @instance
 * @method round
 * @param {Uint8Array} k Scheduled key
 * @param {Uint8Array} d Data
 * @param {number} ofs Offsec
 * @param {number} e true - decrypt
 */
function process128(k, d, ofs, e) // <editor-fold defaultstate="collapsed">
{
    ofs = ofs || d.byteOffset;
    var r = new Uint8Array(d.buffer, ofs, 16);
    if (e) {
        for (var i = 0; i < 9; i++) {
            funcReverseLSX(r, new Uint8Array(k.buffer, (9 - i) * 16, 16));
        }funcX(r, new Uint8Array(k.buffer, 0, 16));
    } else {
        for (var i = 0; i < 9; i++) {
            funcLSX(r, new Uint8Array(k.buffer, 16 * i, 16));
        }funcX(r, new Uint8Array(k.buffer, 16 * 9, 16));
    }
} // </editor-fold>

/**
 * One GOST encryption round
 *
 * @memberOf GostCipher
 * @private
 * @instance
 * @method round
 * @param {Int8Array} S sBox
 * @param {Int32Array} m 2x32 bits cipher block
 * @param {Int32Array} k 32 bits key[i]
 */
function round(S, m, k) // <editor-fold defaultstate="collapsed">
{
    var cm = m[0] + k & 0xffffffff;

    var om = S[0 + (cm >> 0 * 4 & 0xF)] << 0 * 4;
    om |= S[16 + (cm >> 1 * 4 & 0xF)] << 1 * 4;
    om |= S[32 + (cm >> 2 * 4 & 0xF)] << 2 * 4;
    om |= S[48 + (cm >> 3 * 4 & 0xF)] << 3 * 4;
    om |= S[64 + (cm >> 4 * 4 & 0xF)] << 4 * 4;
    om |= S[80 + (cm >> 5 * 4 & 0xF)] << 5 * 4;
    om |= S[96 + (cm >> 6 * 4 & 0xF)] << 6 * 4;
    om |= S[112 + (cm >> 7 * 4 & 0xF)] << 7 * 4;
    cm = om << 11 | om >>> 32 - 11;

    cm ^= m[1];
    m[1] = m[0];
    m[0] = cm;
} // </editor-fold>

/**
 * Process encrypt/decrypt block with key K using GOST 28147-89
 *
 * @memberOf GostCipher
 * @private
 * @instance
 * @method process
 * @param k {Int32Array} 8x32 bits key
 * @param d {Int32Array} 8x8 bits cipher block
 * @param ofs {number} offset
 */
function process89(k, d, ofs) // <editor-fold defaultstate="collapsed">
{
    ofs = ofs || d.byteOffset;
    var s = this.sBox,
        m = new Int32Array(d.buffer, ofs, 2);

    for (var i = 0; i < 32; i++) {
        round(s, m, k[i]);
    }var r = m[0];
    m[0] = m[1];
    m[1] = r;
} // </editor-fold>

/**
 * Process encrypt/decrypt block with key K using GOST R 34.12-15 64bit block
 *
 * @memberOf GostCipher
 * @private
 * @instance
 * @method process
 * @param k {Int32Array} 8x32 bits key
 * @param d {Int32Array} 8x8 bits cipher block
 * @param ofs {number} offset
 */
function process15(k, d, ofs) // <editor-fold defaultstate="collapsed">
{
    ofs = ofs || d.byteOffset;
    var s = this.sBox,
        m = new Int32Array(d.buffer, ofs, 2),
        r = swap32(m[0]);
    m[0] = swap32(m[1]);
    m[1] = r;

    for (var i = 0; i < 32; i++) {
        round(s, m, k[i]);
    }m[0] = swap32(m[0]);
    m[1] = swap32(m[1]);
} // </editor-fold>

/**
 * Key keySchedule algorithm for GOST 28147-89 64bit cipher
 *
 * @memberOf GostCipher
 * @private
 * @instance
 * @method process
 * @param k {Uint8Array} 8 bit key array
 * @param e {boolean}  true - decrypt
 * @returns {Int32Array} keyScheduled 32-bit key
 */
function keySchedule89(k, e) // <editor-fold defaultstate="collapsed">
{
    var sch = new Int32Array(32),
        key = new Int32Array(buffer(k));

    for (var i = 0; i < 8; i++) {
        sch[i] = key[i];
    }if (e) {
        for (var i = 0; i < 8; i++) {
            sch[i + 8] = sch[7 - i];
        }for (var i = 0; i < 8; i++) {
            sch[i + 16] = sch[7 - i];
        }
    } else {
        for (var i = 0; i < 8; i++) {
            sch[i + 8] = sch[i];
        }for (var i = 0; i < 8; i++) {
            sch[i + 16] = sch[i];
        }
    }

    for (var i = 0; i < 8; i++) {
        sch[i + 24] = sch[7 - i];
    }return sch;
} // </editor-fold>

/**
 * Key keySchedule algorithm for GOST R 34.12-15 64bit cipher
 *
 * @memberOf GostCipher
 * @private
 * @instance
 * @method process
 * @param k {Uint8Array} 8 bit key array
 * @param e {boolean}  true - decrypt
 * @returns {Int32Array} keyScheduled 32-bit key
 */
function keySchedule15(k, e) // <editor-fold defaultstate="collapsed">
{
    var sch = new Int32Array(32),
        key = new Int32Array(buffer(k));

    for (var i = 0; i < 8; i++) {
        sch[i] = swap32(key[i]);
    }if (e) {
        for (var i = 0; i < 8; i++) {
            sch[i + 8] = sch[7 - i];
        }for (var i = 0; i < 8; i++) {
            sch[i + 16] = sch[7 - i];
        }
    } else {
        for (var i = 0; i < 8; i++) {
            sch[i + 8] = sch[i];
        }for (var i = 0; i < 8; i++) {
            sch[i + 16] = sch[i];
        }
    }

    for (var i = 0; i < 8; i++) {
        sch[i + 24] = sch[7 - i];
    }return sch;
} // </editor-fold>

/**
 * Key schedule for RC2
 *
 * https://tools.ietf.org/html/rfc2268
 *
 * @memberOf GostCipher
 * @private
 * @instance
 * @method keySchedule
 * @param {Uint8Array} k
 * @returns {Uint16Array}
 */
var keyScheduleRC2 = function () // <editor-fold defaultstate="collapsed">
{
    // an array of "random" bytes based on the digits of PI = 3.14159...
    var PITABLE = new Uint8Array([0xd9, 0x78, 0xf9, 0xc4, 0x19, 0xdd, 0xb5, 0xed, 0x28, 0xe9, 0xfd, 0x79, 0x4a, 0xa0, 0xd8, 0x9d, 0xc6, 0x7e, 0x37, 0x83, 0x2b, 0x76, 0x53, 0x8e, 0x62, 0x4c, 0x64, 0x88, 0x44, 0x8b, 0xfb, 0xa2, 0x17, 0x9a, 0x59, 0xf5, 0x87, 0xb3, 0x4f, 0x13, 0x61, 0x45, 0x6d, 0x8d, 0x09, 0x81, 0x7d, 0x32, 0xbd, 0x8f, 0x40, 0xeb, 0x86, 0xb7, 0x7b, 0x0b, 0xf0, 0x95, 0x21, 0x22, 0x5c, 0x6b, 0x4e, 0x82, 0x54, 0xd6, 0x65, 0x93, 0xce, 0x60, 0xb2, 0x1c, 0x73, 0x56, 0xc0, 0x14, 0xa7, 0x8c, 0xf1, 0xdc, 0x12, 0x75, 0xca, 0x1f, 0x3b, 0xbe, 0xe4, 0xd1, 0x42, 0x3d, 0xd4, 0x30, 0xa3, 0x3c, 0xb6, 0x26, 0x6f, 0xbf, 0x0e, 0xda, 0x46, 0x69, 0x07, 0x57, 0x27, 0xf2, 0x1d, 0x9b, 0xbc, 0x94, 0x43, 0x03, 0xf8, 0x11, 0xc7, 0xf6, 0x90, 0xef, 0x3e, 0xe7, 0x06, 0xc3, 0xd5, 0x2f, 0xc8, 0x66, 0x1e, 0xd7, 0x08, 0xe8, 0xea, 0xde, 0x80, 0x52, 0xee, 0xf7, 0x84, 0xaa, 0x72, 0xac, 0x35, 0x4d, 0x6a, 0x2a, 0x96, 0x1a, 0xd2, 0x71, 0x5a, 0x15, 0x49, 0x74, 0x4b, 0x9f, 0xd0, 0x5e, 0x04, 0x18, 0xa4, 0xec, 0xc2, 0xe0, 0x41, 0x6e, 0x0f, 0x51, 0xcb, 0xcc, 0x24, 0x91, 0xaf, 0x50, 0xa1, 0xf4, 0x70, 0x39, 0x99, 0x7c, 0x3a, 0x85, 0x23, 0xb8, 0xb4, 0x7a, 0xfc, 0x02, 0x36, 0x5b, 0x25, 0x55, 0x97, 0x31, 0x2d, 0x5d, 0xfa, 0x98, 0xe3, 0x8a, 0x92, 0xae, 0x05, 0xdf, 0x29, 0x10, 0x67, 0x6c, 0xba, 0xc9, 0xd3, 0x00, 0xe6, 0xcf, 0xe1, 0x9e, 0xa8, 0x2c, 0x63, 0x16, 0x01, 0x3f, 0x58, 0xe2, 0x89, 0xa9, 0x0d, 0x38, 0x34, 0x1b, 0xab, 0x33, 0xff, 0xb0, 0xbb, 0x48, 0x0c, 0x5f, 0xb9, 0xb1, 0xcd, 0x2e, 0xc5, 0xf3, 0xdb, 0x47, 0xe5, 0xa5, 0x9c, 0x77, 0x0a, 0xa6, 0x20, 0x68, 0xfe, 0x7f, 0xc1, 0xad]);

    return function (k) {
        var key = new Uint8Array(buffer(k)),
            T = Math.min(key.length, 128),
            T1 = this.effectiveLength,
            T8 = Math.floor((T1 + 7) / 8),
            TM = 0xff % Math.pow(2, 8 + T1 - 8 * T8);

        var L = new Uint8Array(128),
            K = new Uint16Array(L.buffer);
        for (var i = 0; i < T; i++) {
            L[i] = key[i];
        }for (var i = T; i < 128; i++) {
            L[i] = PITABLE[(L[i - 1] + L[i - T]) % 256];
        }L[128 - T8] = PITABLE[L[128 - T8] & TM];
        for (var i = 127 - T8; i >= 0; --i) {
            L[i] = PITABLE[L[i + 1] ^ L[i + T8]];
        }return K;
    };
} // </editor-fold>
();

/**
 * RC2 encrypt/decrypt process
 *
 * https://tools.ietf.org/html/rfc2268
 *
 * @memberOf GostCipher
 * @private
 * @instance
 * @method round
 * @param {CryptoOperationData} k Scheduled key
 * @param {CryptoOperationData} d Data
 * @param {number} ofs Offsec
 * @param {number} e true - decrypt
 */
var processRC2 = function () // <editor-fold defaultstate="collapsed">
{
    var K,
        j,
        R = new Uint16Array(4),
        s = new Uint16Array([1, 2, 3, 5]),
        reverse;

    function rol(R, s) {
        return (R << s | R >>> 16 - s) & 0xffff;
    }

    function ror(R, s) {
        return (R >>> s | R << 16 - s) & 0xffff;
    }

    function mix(i) {
        if (reverse) {
            R[i] = ror(R[i], s[i]);
            R[i] = R[i] - K[j] - (R[(i + 3) % 4] & R[(i + 2) % 4]) - (~R[(i + 3) % 4] & R[(i + 1) % 4]);
            j = j - 1;
        } else {
            R[i] = R[i] + K[j] + (R[(i + 3) % 4] & R[(i + 2) % 4]) + (~R[(i + 3) % 4] & R[(i + 1) % 4]);
            j = j + 1;
            R[i] = rol(R[i], s[i]);
        }
    }

    function mash(i) {
        if (reverse) {
            R[i] = R[i] - K[R[(i + 3) % 4] & 63];
        } else {
            R[i] = R[i] + K[R[(i + 3) % 4] & 63];
        }
    }

    function perform(method, count) {
        count = count || 1;
        for (var j = 0; j < count; j++) {
            if (reverse) {
                for (var i = 3; i >= 0; --i) {
                    method(i);
                }
            } else {
                for (var i = 0; i < 4; i++) {
                    method(i);
                }
            }
        }
    }

    return function (k, d, ofs, e) {
        reverse = e;
        //  1. Initialize words R[0], ..., R[3] to contain the 64-bit
        //     ciphertext value.
        R = new Uint16Array(d.buffer, ofs || d.byteOffset, 4);
        //  2. Expand the key, so that words K[0], ..., K[63] become
        //     defined.
        K = k;
        //  3. Initialize j to zero (enc) j to 63 (dec).
        j = e ? 63 : 0;
        //  4. Perform five mixing rounds.
        perform(mix, 5);
        //  5. Perform one mashing round.
        perform(mash);
        //  6. Perform six mixing rounds.
        perform(mix, 6);
        //  7. Perform one mashing round.
        perform(mash);
        //  8. Perform five mixing rounds.
        perform(mix, 5);
    };
} // </editor-fold>
();

/**
 * Algorithm name GOST 28147-ECB<br><br>
 *
 * encryptECB (K, D) is D, encrypted with key k using GOST 28147/GOST R 34.13 in
 * "prostaya zamena" (Electronic Codebook, ECB) mode.
 * @memberOf GostCipher
 * @method encrypt
 * @instance
 * @param k {CryptoOperationData} 8x32 bit key
 * @param d {CryptoOperationData} 8 bits message
 * @return {CryptoOperationData} result
 */
function encryptECB(k, d) // <editor-fold defaultstate="collapsed">
{
    var p = this.pad(byteArray(d)),
        n = this.blockSize,
        b = p.byteLength / n,
        key = this.keySchedule(k);

    for (var i = 0; i < b; i++) {
        this.process(key, p, n * i);
    }return p.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-ECB<br><br>
 *
 * decryptECB (K, D) is D, decrypted with key K using GOST 28147/GOST R 34.13 in
 * "prostaya zamena"  (Electronic Codebook, ECB) mode.
 *
 * @memberOf GostCipher
 * @method decrypt
 * @instance
 * @param k {CryptoOperationData} 8x32 bits key
 * @param d {CryptoOperationData} 8 bits message
 * @return {CryptoOperationData} result
 */
function decryptECB(k, d) // <editor-fold defaultstate="collapsed">
{
    var p = cloneArray(d),
        n = this.blockSize,
        b = p.byteLength / n,
        key = this.keySchedule(k, 1);

    for (var i = 0; i < b; i++) {
        this.process(key, p, n * i, 1);
    }return this.unpad(p).buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CFB<br><br>
 *
 * encryptCFB (IV, K, D) is D, encrypted with key K using GOST 28147/GOST R 34.13
 * in "gammirovanie s obratnoj svyaziyu" (Cipher Feedback, CFB) mode, and IV is
 * used as the initialization vector.
 *
 * @memberOf GostCipher
 * @method encrypt
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv initial vector
 * @return {CryptoOperationData} result
 */
function encryptCFB(k, d, iv) // <editor-fold defaultstate="collapsed">
{
    var s = new Uint8Array(iv || this.iv),
        c = cloneArray(d),
        m = s.length,
        t = new Uint8Array(m),
        b = this.shiftBits >> 3,
        cb = c.length,
        r = cb % b,
        q = (cb - r) / b,
        key = this.keySchedule(k);

    for (var i = 0; i < q; i++) {

        for (var j = 0; j < m; j++) {
            t[j] = s[j];
        }this.process(key, s);

        for (var j = 0; j < b; j++) {
            c[i * b + j] ^= s[j];
        }for (var j = 0; j < m - b; j++) {
            s[j] = t[b + j];
        }for (var j = 0; j < b; j++) {
            s[m - b + j] = c[i * b + j];
        }k = this.keyMeshing(k, s, i, key);
    }

    if (r > 0) {
        this.process(key, s);

        for (var i = 0; i < r; i++) {
            c[q * b + i] ^= s[i];
        }
    }
    return c.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CFB<br><br>
 *
 * decryptCFB (IV, K, D) is D, decrypted with key K using GOST 28147/GOST R 34.13
 * in "gammirovanie s obratnoj svyaziyu po shifrotekstu" (Cipher Feedback, CFB) mode, and IV is
 * used as the initialization vector.
 *
 * @memberOf GostCipher
 * @method decrypt
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv initial vector
 * @return {CryptoOperationData} result
 */
function decryptCFB(k, d, iv) // <editor-fold defaultstate="collapsed">
{
    var s = new Uint8Array(iv || this.iv),
        c = cloneArray(d),
        m = s.length,
        t = new Uint8Array(m),
        b = this.shiftBits >> 3,
        cb = c.length,
        r = cb % b,
        q = (cb - r) / b,
        key = this.keySchedule(k);

    for (var i = 0; i < q; i++) {

        for (var j = 0; j < m; j++) {
            t[j] = s[j];
        }this.process(key, s);

        for (var j = 0; j < b; j++) {
            t[j] = c[i * b + j];
            c[i * b + j] ^= s[j];
        }

        for (var j = 0; j < m - b; j++) {
            s[j] = t[b + j];
        }for (var j = 0; j < b; j++) {
            s[m - b + j] = t[j];
        }k = this.keyMeshing(k, s, i, key);
    }

    if (r > 0) {
        this.process(key, s);

        for (var i = 0; i < r; i++) {
            c[q * b + i] ^= s[i];
        }
    }
    return c.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-OFB<br><br>
 *
 * encryptOFB/decryptOFB (IV, K, D) is D, encrypted with key K using GOST 28147/GOST R 34.13
 * in "gammirovanie s obratnoj svyaziyu po vyhodu" (Output Feedback, OFB) mode, and IV is
 * used as the initialization vector.
 *
 * @memberOf GostCipher
 * @method encrypt
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv 8x8 optional bits initial vector
 * @return {CryptoOperationData} result
 */
/**
 * Algorithm name GOST 28147-OFB<br><br>
 *
 * encryptOFB/decryptOFB (IV, K, D) is D, encrypted with key K using GOST 28147/GOST R 34.13
 * in "gammirovanie s obratnoj svyaziyu po vyhodu" (Output Feedback, OFB) mode, and IV is
 * used as the initialization vector.
 *
 * @memberOf GostCipher
 * @method decrypt
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv initial vector
 * @return {CryptoOperationData} result
 */
function processOFB(k, d, iv) // <editor-fold defaultstate="collapsed">
{
    var s = new Uint8Array(iv || this.iv),
        c = cloneArray(d),
        m = s.length,
        t = new Uint8Array(m),
        b = this.shiftBits >> 3,
        p = new Uint8Array(b),
        cb = c.length,
        r = cb % b,
        q = (cb - r) / b,
        key = this.keySchedule(k);

    for (var i = 0; i < q; i++) {

        for (var j = 0; j < m; j++) {
            t[j] = s[j];
        }this.process(key, s);

        for (var j = 0; j < b; j++) {
            p[j] = s[j];
        }for (var j = 0; j < b; j++) {
            c[i * b + j] ^= s[j];
        }for (var j = 0; j < m - b; j++) {
            s[j] = t[b + j];
        }for (var j = 0; j < b; j++) {
            s[m - b + j] = p[j];
        }k = this.keyMeshing(k, s, i, key);
    }

    if (r > 0) {
        this.process(key, s);

        for (var i = 0; i < r; i++) {
            c[q * b + i] ^= s[i];
        }
    }
    return c.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CTR<br><br>
 *
 * encryptCTR/decryptCTR (IV, K, D) is D, encrypted with key K using GOST 28147/GOST R 34.13
 * in "gammirovanie" (Counter Mode-CTR) mode, and IV is used as the
 * initialization vector.
 * @memberOf GostCipher
 * @method encrypt
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv 8x8 optional bits initial vector
 * @return {CryptoOperationData} result
 */
/**
 * Algorithm name GOST 28147-CTR<br><br>
 *
 * encryptCTR/decryptCTR (IV, K, D) is D, encrypted with key K using GOST 28147/GOST R 34.13
 * in "gammirovanie" (Counter Mode-CTR) mode, and IV is used as the
 * initialization vector.
 * @memberOf GostCipher
 * @method decrypt
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv initial vector
 * @return {CryptoOperationData} result
 */
function processCTR89(k, d, iv) // <editor-fold defaultstate="collapsed">
{
    var s = new Uint8Array(iv || this.iv),
        c = cloneArray(d),
        b = this.blockSize,
        t = new Int8Array(b),
        cb = c.length,
        r = cb % b,
        q = (cb - r) / b,
        key = this.keySchedule(k),
        syn = new Int32Array(s.buffer);

    this.process(key, s);

    for (var i = 0; i < q; i++) {
        syn[0] = syn[0] + 0x1010101 & 0xffffffff;
        // syn[1] = signed(unsigned((syn[1] + 0x1010104) & 0xffffffff) % 0xffffffff);
        var tmp = unsigned(syn[1]) + 0x1010104; // Special thanks to Ilya Matveychikov
        syn[1] = signed(tmp < 0x100000000 ? tmp : tmp - 0xffffffff);

        for (var j = 0; j < b; j++) {
            t[j] = s[j];
        }this.process(key, syn);

        for (var j = 0; j < b; j++) {
            c[i * b + j] ^= s[j];
        }for (var j = 0; j < b; j++) {
            s[j] = t[j];
        }k = this.keyMeshing(k, s, i, key);
    }
    if (r > 0) {
        syn[0] = syn[0] + 0x1010101 & 0xffffffff;
        // syn[1] = signed(unsigned((syn[1] + 0x1010104) & 0xffffffff) % 0xffffffff);
        var tmp = unsigned(syn[1]) + 0x1010104; // Special thanks to Ilya Matveychikov
        syn[1] = signed(tmp < 0x100000000 ? tmp : tmp - 0xffffffff);

        this.process(key, syn);

        for (var i = 0; i < r; i++) {
            c[q * b + i] ^= s[i];
        }
    }
    return c.buffer;
} // </editor-fold>

function processCTR15(k, d, iv) // <editor-fold defaultstate="collapsed">
{
    var c = cloneArray(d),
        n = this.blockSize,
        b = this.shiftBits >> 3,
        cb = c.length,
        r = cb % b,
        q = (cb - r) / b,
        s = new Uint8Array(n),
        t = new Int32Array(n),
        key = this.keySchedule(k);

    s.set(iv || this.iv);
    for (var i = 0; i < q; i++) {

        for (var j = 0; j < n; j++) {
            t[j] = s[j];
        }this.process(key, s);

        for (var j = 0; j < b; j++) {
            c[b * i + j] ^= s[j];
        }for (var j = 0; j < n; j++) {
            s[j] = t[j];
        }for (var j = n - 1; i >= 0; --i) {
            if (s[j] > 0xfe) {
                s[j] -= 0xfe;
            } else {
                s[j]++;
                break;
            }
        }
    }

    if (r > 0) {
        this.process(key, s);
        for (var j = 0; j < r; j++) {
            c[b * q + j] ^= s[j];
        }
    }

    return c.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CBC<br><br>
 *
 * encryptCBC (IV, K, D) is D, encrypted with key K using GOST 28147/GOST R 34.13
 * in "Prostaya zamena s zatsepleniem" (Cipher-Block-Chaining, CBC) mode and IV is used as the initialization
 * vector.
 *
 * @memberOf GostCipher
 * @method encrypt
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv initial vector
 * @return {CryptoOperationData} result
 */
function encryptCBC(k, d, iv) // <editor-fold defaultstate="collapsed">
{
    var s = new Uint8Array(iv || this.iv),
        n = this.blockSize,
        m = s.length,
        c = this.pad(byteArray(d)),
        key = this.keySchedule(k);

    for (var i = 0, b = c.length / n; i < b; i++) {

        for (var j = 0; j < n; j++) {
            s[j] ^= c[i * n + j];
        }this.process(key, s);

        for (var j = 0; j < n; j++) {
            c[i * n + j] = s[j];
        }if (m !== n) {
            for (var j = 0; j < m - n; j++) {
                s[j] = s[n + j];
            }for (var j = 0; j < n; j++) {
                s[j + m - n] = c[i * n + j];
            }
        }

        k = this.keyMeshing(k, s, i, key);
    }

    return c.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CBC<br><br>
 *
 * decryptCBC (IV, K, D) is D, decrypted with key K using GOST 28147/GOST R 34.13
 * in "Prostaya zamena s zatsepleniem" (Cipher-Block-Chaining, CBC) mode and IV is used as the initialization
 * vector.
 *
 * @memberOf GostCipher
 * @method decrypt
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv initial vector
 * @return {CryptoOperationData} result
 */
function decryptCBC(k, d, iv) // <editor-fold defaultstate="collapsed">
{
    var s = new Uint8Array(iv || this.iv),
        n = this.blockSize,
        m = s.length,
        c = cloneArray(d),
        next = new Uint8Array(n),
        key = this.keySchedule(k, 1);

    for (var i = 0, b = c.length / n; i < b; i++) {

        for (var j = 0; j < n; j++) {
            next[j] = c[i * n + j];
        }this.process(key, c, i * n, 1);

        for (var j = 0; j < n; j++) {
            c[i * n + j] ^= s[j];
        }if (m !== n) {
            for (var j = 0; j < m - n; j++) {
                s[j] = s[n + j];
            }
        }

        for (var j = 0; j < n; j++) {
            s[j + m - n] = next[j];
        }k = this.keyMeshing(k, s, i, key, 1);
    }

    return this.unpad(c).buffer;
} // </editor-fold>

/**
 * The generateKey method returns a new generated key.
 *
 * @memberOf GostCipher
 * @method generateKey
 * @instance
 * @return {CryptoOperationData} result
 */

function generateKey() // <editor-fold defaultstate="collapsed">
{
    // Simple generate 256 bit random seed
    var k = new Uint8Array(this.keySize);
    (0, _seeds.randomSeed)(k);
    return k.buffer;
} // </editor-fold>


/**
 * makeIMIT (K, D) is the 32-bit result of the GOST 28147/GOST R 34.13 in
 * "imitovstavka" (MAC) mode, used with D as plaintext, K as key and IV
 * as initialization vector.  Note that the standard specifies its use
 * in this mode only with an initialization vector of zero.
 *
 * @memberOf GostCipher
 * @method processMAC
 * @private
 * @instance
 * @param {Int32Array} key 8x32 bits key
 * @param {Int32Array} s 8x8 sum array
 * @param {Uint8Array} d 8 bits array with data
 * @return {Uint8Array} result
 */
function processMAC89(key, s, d) // <editor-fold defaultstate="collapsed">
{
    var c = zeroPad.call(this, byteArray(d)),
        n = this.blockSize,
        q = c.length / n,
        sBox = this.sBox,
        sum = new Int32Array(s.buffer);

    for (var i = 0; i < q; i++) {

        for (var j = 0; j < n; j++) {
            s[j] ^= c[i * n + j];
        }for (var j = 0; j < 16; j++) {
            // 1-16 steps
            round(sBox, sum, key[j]);
        }
    }
} // </editor-fold>

function processKeyMAC15(s) // <editor-fold defaultstate="collapsed">
{
    var t = 0,
        n = s.length;
    for (var i = n - 1; i >= 0; --i) {
        var t1 = s[i] >>> 7;
        s[i] = s[i] << 1 & 0xff | t;
        t = t1;
    }
    if (t !== 0) {
        if (n === 16) s[15] ^= 0x87;else s[7] ^= 0x1b;
    }
} // </editor-fold>

function processMAC15(key, s, d) // <editor-fold defaultstate="collapsed">
{
    var n = this.blockSize,
        sBox = this.sBox,
        c = byteArray(d),
        r = new Uint8Array(n);
    // R
    this.process(key, r);
    // K1
    processKeyMAC15(r);
    if (d.byteLength % n !== 0) {
        c = bitPad.call(this, byteArray(d));
        // K2
        processKeyMAC15(r);
    }

    for (var i = 0, q = c.length / n; i < q; i++) {

        for (var j = 0; j < n; j++) {
            s[j] ^= c[i * n + j];
        }if (i === q - 1) {
            // Last block
            for (var j = 0; j < n; j++) {
                s[j] ^= r[j];
            }
        }

        this.process(key, s);
    }
} // </editor-fold>

/**
 * signMAC (K, D, IV) is the 32-bit result of the GOST 28147/GOST R 34.13 in
 * "imitovstavka" (MAC) mode, used with D as plaintext, K as key and IV
 * as initialization vector.  Note that the standard specifies its use
 * in this mode only with an initialization vector of zero.
 *
 * @memberOf GostCipher
 * @method sign
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv initial vector
 * @return {CryptoOperationData} result
 */
function signMAC(k, d, iv) // <editor-fold defaultstate="collapsed">
{
    var key = this.keySchedule(k),
        s = new Uint8Array(iv || this.iv),
        m = Math.ceil(this.macLength >> 3) || this.blockSize >> 1;

    this.processMAC(key, s, d);

    var mac = new Uint8Array(m); // mac size
    mac.set(new Uint8Array(s.buffer, 0, m));
    return mac.buffer;
} // </editor-fold>

/**
 * verifyMAC (K, M, D, IV) the 32-bit result verification of the GOST 28147/GOST R 34.13 in
 * "imitovstavka" (MAC) mode, used with D as plaintext, K as key and IV
 * as initialization vector.  Note that the standard specifies its use
 * in this mode only with an initialization vector of zero.
 *
 * @memberOf GostCipher
 * @method verify
 * @instance
 * @param {CryptoOperationData} k 8x32 bits key
 * @param {CryptoOperationData} m 8 bits array with signature
 * @param {CryptoOperationData} d 8 bits array with data
 * @param {CryptoOperationData} iv 8x8 optional bits initial vector
 * @return {boolen} MAC verified = true
 */
function verifyMAC(k, m, d, iv) // <editor-fold defaultstate="collapsed">
{
    var mac = new Uint8Array(signMAC.call(this, k, d, iv)),
        test = byteArray(m);
    if (mac.length !== test.length) return false;
    for (var i = 0, n = mac.length; i < n; i++) {
        if (mac[i] !== test[i]) return false;
    }return true;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-KW<br><br>
 *
 * This algorithm encrypts GOST 28147-89 CEK with a GOST 28147/GOST R 34.13 KEK.
 * Ref. rfc4357 6.1 GOST 28147-89 Key Wrap
 * Note: This algorithm MUST NOT be used with a KEK produced by VKO GOST
 * R 34.10-94, because such a KEK is constant for every sender-recipient
 * pair.  Encrypting many different content encryption keys on the same
 * constant KEK may reveal that KEK.
 *
 * @memberOf GostCipher
 * @method wrapKey
 * @instance
 * @param {CryptoOperationData} kek Key encryption key
 * @param {CryptoOperationData} cek Content encryption key
 * @returns {CryptoOperationData} Encrypted cek
 */
function wrapKeyGOST(kek, cek) // <editor-fold defaultstate="collapsed">
{
    var n = this.blockSize,
        k = this.keySize,
        len = k + (n >> 1);
    // 1) For a unique symmetric KEK, generate 8 octets at random and call
    // the result UKM.  For a KEK, produced by VKO GOST R 34.10-2001, use
    // the UKM that was used for key derivation.
    if (!this.ukm) throw new _errors.DataError('UKM must be defined');
    var ukm = new Uint8Array(this.ukm);
    // 2) Compute a 4-byte checksum value, GOST 28147IMIT (UKM, KEK, CEK).
    // Call the result CEK_MAC.
    var mac = signMAC.call(this, kek, cek, ukm);
    // 3) Encrypt the CEK in ECB mode using the KEK.  Call the ciphertext CEK_ENC.
    var enc = encryptECB.call(this, kek, cek);
    // 4) The wrapped content-encryption key is (UKM | CEK_ENC | CEK_MAC).
    var r = new Uint8Array(len);
    r.set(new Uint8Array(enc), 0);
    r.set(new Uint8Array(mac), k);
    return r.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-KW<br><br>
 *
 *  This algorithm decrypts GOST 28147-89 CEK with a GOST 28147 KEK.
 *  Ref. rfc4357 6.2 GOST 28147-89 Key Unwrap
 *
 * @memberOf GostCipher
 * @method unwrapKey
 * @instance
 * @param {type} kek Key encryption key
 * @param {type} data Content encryption key
 * @return {CryptoOperationData} result
 */
function unwrapKeyGOST(kek, data) // <editor-fold defaultstate="collapsed">
{
    var n = this.blockSize,
        k = this.keySize,
        len = k + (n >> 1);
    // 1) If the wrapped content-encryption key is not 44 octets, then error.
    var d = buffer(data);
    if (d.byteLength !== len) throw new _errors.DataError('Wrapping key size must be ' + len + ' bytes');
    // 2) Decompose the wrapped content-encryption key into UKM, CEK_ENC, and CEK_MAC.
    // UKM is the most significant (first) 8 octets. CEK_ENC is next 32 octets,
    // and CEK_MAC is the least significant (last) 4 octets.
    if (!this.ukm) throw new _errors.DataError('UKM must be defined');
    var ukm = new Uint8Array(this.ukm),
        enc = new Uint8Array(d, 0, k),
        mac = new Uint8Array(d, k, n >> 1);
    // 3) Decrypt CEK_ENC in ECB mode using the KEK.  Call the output CEK.
    var cek = decryptECB.call(this, kek, enc);
    // 4) Compute a 4-byte checksum value, GOST 28147IMIT (UKM, KEK, CEK),
    // compare the result with CEK_MAC.  If they are not equal, then error.
    var check = verifyMAC.call(this, kek, mac, cek, ukm);
    if (!check) throw new _errors.DataError('Error verify MAC of wrapping key');
    return cek;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CPKW<br><br>
 *
 * Given a random 64-bit UKM and a GOST 28147 key K, this algorithm
 * creates a new GOST 28147-89 key K(UKM).
 * Ref. rfc4357 6.3 CryptoPro KEK Diversification Algorithm
 *
 * @memberOf GostCipher
 * @method diversify
 * @instance
 * @private
 * @param {CryptoOperationData} kek Key encryption key
 * @param {CryptoOperationData} ukm Random generated value
 * @returns {CryptoOperationData} Diversified kek
 */
function diversifyKEK(kek, ukm) // <editor-fold defaultstate="collapsed">
{
    var n = this.blockSize;

    // 1) Let K[0] = K;
    var k = intArray(kek);
    // 2) UKM is split into components a[i,j]:
    //    UKM = a[0]|..|a[7] (a[i] - byte, a[i,0]..a[i,7] - it’s bits)
    var a = [];
    for (var i = 0; i < n; i++) {
        a[i] = [];
        for (var j = 0; j < 8; j++) {
            a[i][j] = ukm[i] >>> j & 0x1;
        }
    }
    // 3) Let i be 0.
    // 4) K[1]..K[8] are calculated by repeating the following algorithm
    //    eight times:
    for (var i = 0; i < n; i++) {
        //     A) K[i] is split into components k[i,j]:
        //        K[i] = k[i,0]|k[i,1]|..|k[i,7] (k[i,j] - 32-bit integer)
        //     B) Vector S[i] is calculated:
        //        S[i] = ((a[i,0]*k[i,0] + ... + a[i,7]*k[i,7]) mod 2^32) |
        //         (((~a[i,0])*k[i,0] + ... + (~a[i,7])*k[i,7]) mod 2^32);
        var s = new Int32Array(2);
        for (var j = 0; j < 8; j++) {
            if (a[i][j]) s[0] = s[0] + k[j] & 0xffffffff;else s[1] = s[1] + k[j] & 0xffffffff;
        }
        //     C) K[i+1] = encryptCFB (S[i], K[i], K[i])
        var iv = new Uint8Array(s.buffer);
        k = new Int32Array(encryptCFB.call(this, k, k, iv));
        //     D) i = i + 1
    }
    // 5) Let K(UKM) be K[8].
    return k;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CPKW<br><br>
 *
 * This algorithm encrypts GOST 28147-89 CEK with a GOST 28147 KEK.
 * It can be used with any KEK (e.g., produced by VKO GOST R 34.10-94 or
 * VKO GOST R 34.10-2001) because a unique UKM is used to diversify the KEK.
 * Ref. rfc4357 6.3  CryptoPro Key Wrap
 *
 * @memberOf GostCipher
 * @method wrapKey
 * @instance
 * @param {CryptoOperationData} kek Key encryption key
 * @param {CryptoOperationData} cek Content encryption key
 * @returns {CryptoOperationData} Encrypted cek
 */
function wrapKeyCP(kek, cek) // <editor-fold defaultstate="collapsed">
{
    var n = this.blockSize,
        k = this.keySize,
        len = k + (n >> 1);
    // 1) For a unique symmetric KEK or a KEK produced by VKO GOST R
    // 34.10-94, generate 8 octets at random.  Call the result UKM.  For
    // a KEK, produced by VKO GOST R 34.10-2001, use the UKM that was
    // used for key derivation.
    if (!this.ukm) throw new _errors.DataError('UKM must be defined');
    var ukm = new Uint8Array(this.ukm);
    // 2) Diversify KEK, using the CryptoPro KEK Diversification Algorithm,
    // described in Section 6.5.  Call the result KEK(UKM).
    var dek = diversifyKEK.call(this, kek, ukm);
    // 3) Compute a 4-byte checksum value, GOST 28147IMIT (UKM, KEK(UKM),
    // CEK).  Call the result CEK_MAC.
    var mac = signMAC.call(this, dek, cek, ukm);
    // 4) Encrypt CEK in ECB mode using KEK(UKM).  Call the ciphertext
    // CEK_ENC.
    var enc = encryptECB.call(this, dek, cek);
    // 5) The wrapped content-encryption key is (UKM | CEK_ENC | CEK_MAC).
    var r = new Uint8Array(len);
    r.set(new Uint8Array(enc), 0);
    r.set(new Uint8Array(mac), k);
    return r.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CPKW<br><br>
 *
 * This algorithm encrypts GOST 28147-89 CEK with a GOST 28147 KEK.
 * Ref. rfc4357 6.4 CryptoPro Key Unwrap
 *
 * @memberOf GostCipher
 * @method unwrapKey
 * @instance
 * @param {CryptoOperationData} kek Key encryption key
 * @param {CryptoOperationData} data Encrypted content encryption keu
 * @return {CryptoOperationData} result Decrypted content encryption keu
 */
function unwrapKeyCP(kek, data) // <editor-fold defaultstate="collapsed">
{
    var n = this.blockSize,
        k = this.keySize,
        len = k + (n >> 1);
    // 1) If the wrapped content-encryption key is not 44 octets, then error.
    var d = buffer(data);
    if (d.byteLength !== len) throw new _errors.DataError('Wrapping key size must be ' + len + ' bytes');
    // 2) Decompose the wrapped content-encryption key into UKM, CEK_ENC,
    // and CEK_MAC.  UKM is the most significant (first) 8 octets.
    // CEK_ENC is next 32 octets, and CEK_MAC is the least significant
    // (last) 4 octets.
    if (!this.ukm) throw new _errors.DataError('UKM must be defined');
    var ukm = new Uint8Array(this.ukm),
        enc = new Uint8Array(d, 0, k),
        mac = new Uint8Array(d, k, n >> 1);
    // 3) Diversify KEK using the CryptoPro KEK Diversification Algorithm,
    // described in section 6.5.  Call the result KEK(UKM).
    var dek = diversifyKEK.call(this, kek, ukm);
    // 4) Decrypt CEK_ENC in ECB mode using KEK(UKM).  Call the output CEK.
    var cek = decryptECB.call(this, dek, enc);
    // 5) Compute a 4-byte checksum value, GOST 28147IMIT (UKM, KEK(UKM),
    // CEK), compare the result with CEK_MAC.  If they are not equal,
    // then it is an error.
    var check = verifyMAC.call(this, dek, mac, cek, ukm);
    if (!check) throw new _errors.DataError('Error verify MAC of wrapping key');
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
 * For windows registry
 * 00000001 - mk.db3, 00000002 - masks.db3, 00000003 - key.opq, 00000004 - rand.opq,
 * 00000006 - keys\00000001.key, 0000000A - certificate
 *
 * @memberOf GostCipher
 * @method packKey
 * @instance
 * @private
 * @param {CryptoOperationData} unpacked - clear main key 32 bytes
 * @param {CryptoOperationData} ukm - random vector for packing - 32 bytes * (count of masks - 1)
 * @returns {CryptoOperationData} packed master key - concatination of mk.db3 + masks.db3
 */
function packKeySC(unpacked, ukm) // <editor-fold defaultstate="collapsed">
{
    var m = this.blockSize >> 1,
        k = this.keySize;
    var mcount = 8;
    var key = new Uint8Array(buffer(unpacked));
    if (key.byteLength !== k) throw new _errors.DataError('Wrong cleartext size ' + key.byteLength + ' bytes');
    // Check or generate UKM
    ukm = ukm || this.ukm;
    if (ukm) {
        ukm = new Uint8Array(buffer(ukm));
        if (ukm.byteLength > 0 && ukm.byteLength % k === 0) mcount = ukm.byteLength / k + 1;else throw new _errors.DataError('Wrong rand size ' + ukm.byteLength + ' bytes');
    } else (0, _seeds.randomSeed)(ukm = new Uint8Array((mcount - 1) * k));
    // Output array
    var d = new Uint8Array(mcount * k + m + 2),
        b = d.buffer;
    // Calculate MAC
    var zero32 = new Uint8Array(k);
    var mac = signMAC.call(this, key, zero32);
    d[0] = 0x22; // Magic code
    d[1] = mcount; // Count of masks
    d.set(new Uint8Array(mac), 2);
    d.set(ukm, k + m + 2);
    for (var i = 1; i < mcount; i++) {
        var mask = new Uint8Array(b, 2 + m + k * i);
        for (var j = 0; j < k; j++) {
            key[j] ^= mask[j];
        }
    }
    d.set(key, m + 2);
    return d.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-SCKW<br><br>
 *
 * SignalCom master key unpacking algorithm
 *
 * @memberOf GostCipher
 * @method unpackKey
 * @instance
 * @private
 * @param {CryptoOperationData} packed - concatination of mk.db3 + masks.db3
 * @returns {CryptoOperationData} unpacked master key
 */
function unpackKeySC(packed) // <editor-fold defaultstate="collapsed">
{
    var m = this.blockSize >> 1,
        k = this.keySize;
    var b = buffer(packed);
    // Unpack master key
    var magic = new Uint8Array(b, 0, 1)[0];
    if (magic !== 0x22) throw new _errors.DataError('Invalid magic number');
    var mcount = new Uint8Array(b, 1, 1)[0];
    var mac = new Uint8Array(b, 2, m); // MAC for summarized mask
    // Compute packKey xor summing for all masks
    var key = new Uint8Array(k);
    for (var i = 0; i < mcount; i++) {
        var mask = new Uint8Array(b, 2 + m + k * i, k);
        for (var j = 0; j < k; j++) {
            key[j] ^= mask[j];
        }
    }
    // Test MAC for packKey with default sBox on zero 32 bytes array
    var zero32 = new Uint8Array(k);
    var test = verifyMAC.call(this, key, mac, zero32);
    if (!test) {
        // Try to use different sBoxes
        var names = ['E-A', 'E-B', 'E-C', 'E-D', 'E-SC'];
        for (var i = 0, n = names.length; i < n; i++) {
            this.sBox = sBoxes[names[i]];
            test = verifyMAC.call(this, key, mac, zero32);
            if (test) break;
        }
    }
    if (!test) throw new _errors.DataError('Invalid main key MAC');
    return key.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-SCKW<br><br>
 *
 * SignalCom Key Wrapping algorithm
 *
 * @memberOf GostCipher
 * @method wrapKey
 * @instance
 * @param {CryptoOperationData} kek - clear kek or concatination of mk.db3 + masks.db3
 * @param {CryptoOperationData} cek - key for wrapping
 * @returns {CryptoOperationData} wrapped key - file kek.opq
 */
function wrapKeySC(kek, cek) // <editor-fold defaultstate="collapsed">
{
    var m = this.blockSize >> 1,
        n = this.keySize;
    var k = buffer(kek);
    var c = buffer(cek);
    if (k.byteLength !== n) k = unpackKeySC.call(this, k);
    var enc = encryptECB.call(this, k, c);
    var mac = signMAC.call(this, k, c);
    var d = new Uint8Array(m + n);
    d.set(new Uint8Array(enc), 0);
    d.set(new Uint8Array(mac), n);
    return d.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-SCKW<br><br>
 *
 * SignalCom Key UnWrapping algorithm
 *
 * @memberOf GostCipher
 * @method unwrapKey
 * @instance
 * @param {CryptoOperationData} kek - concatination of files mk.db3 + masks.db3 or clear kek
 * @param {CryptoOperationData} cek - wrapping key - file kek.opq
 * @return {CryptoOperationData} result
 */
function unwrapKeySC(kek, cek) // <editor-fold defaultstate="collapsed">
{
    var m = this.blockSize >> 1,
        n = this.keySize;
    var k = buffer(kek);
    var c = buffer(cek);
    if (k.byteLength !== n) k = unpackKeySC.call(this, k);
    var enc = new Uint8Array(c, 0, n); // Encrypted kek
    var mac = new Uint8Array(c, n, m); // MAC for clear kek
    var d = decryptECB.call(this, k, enc);
    if (!verifyMAC.call(this, k, mac, d)) throw new _errors.DataError('Invalid key MAC');
    return d;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-SCKW<br><br>
 *
 * SignalCom master key generation for wrapping
 *
 * @memberOf GostCipher
 * @method generateKey
 * @instance
 * @return {CryptoOperationData} result
 */
function generateWrappingKeySC() // <editor-fold defaultstate="collapsed">
{
    return packKeySC.call(this, generateKey.call(this));
} // </editor-fold>

function maskKey(mask, key, inverse, keySize) // <editor-fold defaultstate="collapsed">
{
    var k = keySize / 4,
        m32 = new Int32Array(buffer(mask)),
        k32 = new Int32Array(buffer(key)),
        r32 = new Int32Array(k);
    if (inverse) for (var i = 0; i < k; i++) {
        r32[i] = k32[i] + m32[i] & 0xffffffff;
    } else for (var i = 0; i < k; i++) {
        r32[i] = k32[i] - m32[i] & 0xffffffff;
    }return r32.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-MASK<br><br>
 *
 * This algorithm wrap key mask
 *
 * @memberOf GostCipher
 * @method wrapKey
 * @instance
 * @param {CryptoOperationData} mask The mask
 * @param {CryptoOperationData} key The key
 * @returns {CryptoOperationData} The masked key
 */
function wrapKeyMask(mask, key) // <editor-fold defaultstate="collapsed">
{
    return maskKey(mask, key, this.procreator === 'VN', this.keySize);
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CPKW<br><br>
 *
 * This algorithm unwrap key mask
 *
 * @memberOf GostCipher
 * @method unwrapKey
 * @instance
 * @param {CryptoOperationData} mask The mask
 * @param {CryptoOperationData} key The masked key
 * @return {CryptoOperationData} result The key
 */
function unwrapKeyMask(mask, key) // <editor-fold defaultstate="collapsed">
{
    return maskKey(mask, key, this.procreator !== 'VN', this.keySize);
} // </editor-fold>

/**
 * Algorithm name GOST 28147-CPKM<br><br>
 *
 * Key meshing in according to rfc4357 2.3.2. CryptoPro Key Meshing
 *
 * @memberOf GostCipher
 * @method keyMeshing
 * @instance
 * @private
 * @param {(Uint8Array|CryptoOperationData)} k 8x8 bit key
 * @param {Uint8Array} s 8x8 bit sync (iv)
 * @param {Integer} i block index
 * @param {Int32Array} key 8x32 bit key schedule
 * @param {boolean} e true - decrypt
 * @returns CryptoOperationData next 8x8 bit key
 */
function keyMeshingCP(k, s, i, key, e) // <editor-fold defaultstate="collapsed">
{
    if ((i + 1) * this.blockSize % 1024 === 0) {
        // every 1024 octets
        // K[i+1] = decryptECB (K[i], C);
        k = decryptECB.call(this, k, C);
        // IV0[i+1] = encryptECB (K[i+1],IVn[i])
        s.set(new Uint8Array(encryptECB.call(this, k, s)));
        // restore key schedule
        key.set(this.keySchedule(k, e));
    }
    return k;
} // </editor-fold>

/**
 *  Null Key Meshing in according to rfc4357 2.3.1
 *
 * @memberOf GostCipher
 * @method keyMeshing
 * @instance
 * @private
 * @param {(Uint8Array|CryptoOperationData)} k 8x8 bit key
 */
function noKeyMeshing(k) // <editor-fold defaultstate="collapsed">
{
    return k;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-NoPadding<br><br>
 *
 * No padding.
 *
 * @memberOf GostCipher
 * @method padding
 * @instance
 * @private
 * @param {Uint8Array} d array with source data
 * @returns {Uint8Array} result
 */
function noPad(d) // <editor-fold defaultstate="collapsed">
{
    return new Uint8Array(d);
} // </editor-fold>

/**
 * Algorithm name GOST 28147-PKCS5Padding<br><br>
 *
 *  PKCS#5 padding: 8-x remaining bytes are filled with the value of
 *  8-x.  If there’s no incomplete block, one extra block filled with
 *  value 8 is added
 *
 * @memberOf GostCipher
 * @method padding
 * @instance
 * @private
 * @param {Uint8Array} d array with source data
 * @returns {Uint8Array} result
 */
function pkcs5Pad(d) // <editor-fold defaultstate="collapsed">
{
    var n = d.byteLength,
        nb = this.blockSize,
        q = nb - n % nb,
        m = Math.ceil((n + 1) / nb) * nb,
        r = new Uint8Array(m);
    r.set(d);
    for (var i = n; i < m; i++) {
        r[i] = q;
    }return r;
} // </editor-fold>

function pkcs5Unpad(d) // <editor-fold defaultstate="collapsed">
{
    var m = d.byteLength,
        nb = this.blockSize,
        q = d[m - 1],
        n = m - q;
    if (q > nb) throw (0, _errors.DataError)('Invalid padding');
    var r = new Uint8Array(n);
    if (n > 0) r.set(new Uint8Array(d.buffer, 0, n));
    return r;
} // </editor-fold>


/**
 * Algorithm name GOST 28147-ZeroPadding<br><br>
 *
 * Zero padding: 8-x remaining bytes are filled with zero
 *
 * @memberOf GostCipher
 * @method padding
 * @instance
 * @private
 * @param {Uint8Array} d array with source data
 * @returns {Uint8Array} result
 */
function zeroPad(d) // <editor-fold defaultstate="collapsed">
{
    var n = d.byteLength,
        nb = this.blockSize,
        m = Math.ceil(n / nb) * nb,
        r = new Uint8Array(m);
    r.set(d);
    for (var i = n; i < m; i++) {
        r[i] = 0;
    }return r;
} // </editor-fold>


/**
 * Algorithm name GOST 28147-BitPadding<br><br>
 *
 * Bit padding: P* = P || 1 || 000...0 If there’s no incomplete block,
 * one extra block filled with 1 || 000...0
 *
 * @memberOf GostCipher
 * @method padding
 * @instance
 * @private
 * @param {Uint8Array} d array with source data
 * @returns {Uint8Array} result
 */
function bitPad(d) // <editor-fold defaultstate="collapsed">
{
    var n = d.byteLength,
        nb = this.blockSize,
        m = Math.ceil((n + 1) / nb) * nb,
        r = new Uint8Array(m);
    r.set(d);
    r[n] = 1;
    for (var i = n + 1; i < m; i++) {
        r[i] = 0;
    }return r;
} // </editor-fold>

function bitUnpad(d) // <editor-fold defaultstate="collapsed">
{
    var m = d.byteLength,
        n = m;
    while (n > 1 && d[n - 1] === 0) {
        n--;
    }if (d[n - 1] !== 1) throw (0, _errors.DataError)('Invalid padding');
    n--;
    var r = new Uint8Array(n);
    if (n > 0) r.set(new Uint8Array(d.buffer, 0, n));
    return r;
} // </editor-fold>

/**
 * Algorithm name GOST 28147-RandomPadding<br><br>
 *
 * Random padding: 8-x remaining bytes of the last block are set to
 * random.
 *
 * @memberOf GostCipher
 * @method padding
 * @instance
 * @private
 * @param {Uint8Array} d array with source data
 * @returns {Uint8Array} result
 */
function randomPad(d) // <editor-fold defaultstate="collapsed">
{
    var n = d.byteLength,
        nb = this.blockSize,
        q = nb - n % nb,
        m = Math.ceil(n / nb) * nb,
        r = new Uint8Array(m),
        e = new Uint8Array(r.buffer, n, q);
    r.set(d);
    (0, _seeds.randomSeed)(e);
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
 *  </ul>
 *
 * Supported paramters values:
 *
 *  <ul>
 *      <li>Block modes (parameter 'block')
 *          <ul>
 *              <li><b>ECB</b> "prostaya zamena" (ECB) mode (default)</li>
 *              <li><b>CFB</b> "gammirovanie s obratnoj svyaziyu po shifrotekstu" (CFB) mode</li>
 *              <li><b>OFB</b> "gammirovanie s obratnoj svyaziyu po vyhodu" (OFB) mode</li>
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
 *              <li><b>NO</b> No padding only for CFB, OFB and CTR modes</li>
 *              <li><b>PKCS5</b> PKCS#5 padding mode</li>
 *              <li><b>ZERO</b> Zero bits padding mode</li>
 *              <li><b>RANDOM</b> Random bits padding mode</li>
 *              <li><b>BIT</b> One bit padding mode</li>
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
 * @class GostCipher
 * @param {AlgorithmIndentifier} algorithm WebCryptoAPI algorithm identifier
 */
function GostCipher(algorithm) // <editor-fold defaultstate="collapsed">
{
    // Check little endian support
    if (!littleEndian) throw new _errors.NotSupportedError('Big endian platform not supported');
    algorithm = algorithm || {};
    this.keySize = 32;
    this.blockLength = algorithm.length || 64;
    this.blockSize = this.blockLength >> 3;

    this.name = (algorithm.name || (algorithm.version === 1 ? 'RC2' : algorithm.version === 1989 ? 'GOST 28147' : 'GOST R 34.12')) + (algorithm.version > 4 ? '-' + (algorithm.version || 1989) % 100 : '') + '-' + (this.blockLength === 64 ? '' : this.blockLength + '-') + (algorithm.mode === 'MAC' ? 'MAC-' + (algorithm.macLength || this.blockLength >> 1) : algorithm.mode === 'KW' || algorithm.keyWrapping ? ((algorithm.keyWrapping || 'NO') !== 'NO' ? algorithm.keyWrapping : '') + 'KW' : (algorithm.block || 'ECB') + ((algorithm.block === 'CFB' || algorithm.block === 'OFB' || algorithm.block === 'CTR' && algorithm.version === 2015) && algorithm.shiftBits && algorithm.shiftBits !== this.blockLength ? '-' + algorithm.shiftBits : '') + (algorithm.padding ? '-' + (algorithm.padding || (algorithm.block === 'CTR' || algorithm.block === 'CFB' || algorithm.block === 'OFB' ? 'NO' : 'ZERO')) + 'PADDING' : '') + ((algorithm.keyMeshing || 'NO') !== 'NO' ? '-CPKEYMESHING' : '')) + (algorithm.procreator ? '/' + algorithm.procreator : '') + (typeof algorithm.sBox === 'string' ? '/' + algorithm.sBox : '');

    // Algorithm procreator
    this.procreator = algorithm.procreator;

    switch (algorithm.version || 1989) {
        case 1:
            this.process = processRC2;
            this.keySchedule = keyScheduleRC2;
            this.blockLength = 64;
            this.effectiveLength = algorithm.length || 32;
            this.keySize = 8 * Math.ceil(this.effectiveLength / 8); // Max 128
            this.blockSize = this.blockLength >> 3;
            break;
        case 2015:
            this.version = 2015;
            if (this.blockLength === 64) {
                this.process = process15;
                this.keySchedule = keySchedule15;
            } else if (this.blockLength === 128) {
                this.process = process128;
                this.keySchedule = keySchedule128;
            } else throw new _errors.DataError('Invalid block length');
            this.processMAC = processMAC15;
            break;
        case 1989:
            this.version = 1989;
            this.process = process89;
            this.processMAC = processMAC89;
            this.keySchedule = keySchedule89;
            if (this.blockLength !== 64) throw new _errors.DataError('Invalid block length');
            break;
        default:
            throw new _errors.NotSupportedError('Algorithm version ' + algorithm.version + ' not supported');
    }

    switch (algorithm.mode || algorithm.keyWrapping && 'KW' || 'ES') {

        case 'ES':
            switch (algorithm.block || 'ECB') {
                case 'ECB':
                    this.encrypt = encryptECB;
                    this.decrypt = decryptECB;
                    break;
                case 'CTR':
                    if (this.version === 1989) {
                        this.encrypt = processCTR89;
                        this.decrypt = processCTR89;
                    } else {
                        this.encrypt = processCTR15;
                        this.decrypt = processCTR15;
                        this.shiftBits = algorithm.shiftBits || this.blockLength;
                    }
                    break;
                case 'CBC':
                    this.encrypt = encryptCBC;
                    this.decrypt = decryptCBC;
                    break;
                case 'CFB':
                    this.encrypt = encryptCFB;
                    this.decrypt = decryptCFB;
                    this.shiftBits = algorithm.shiftBits || this.blockLength;
                    break;
                case 'OFB':
                    this.encrypt = processOFB;
                    this.decrypt = processOFB;
                    this.shiftBits = algorithm.shiftBits || this.blockLength;
                    break;
                default:
                    throw new _errors.NotSupportedError('Block mode ' + algorithm.block + ' not supported');
            }
            switch (algorithm.keyMeshing) {
                case 'CP':
                    this.keyMeshing = keyMeshingCP;
                    break;
                default:
                    this.keyMeshing = noKeyMeshing;
            }
            if (this.encrypt === encryptECB || this.encrypt === encryptCBC) {
                switch (algorithm.padding) {
                    case 'PKCS5P':
                        this.pad = pkcs5Pad;
                        this.unpad = pkcs5Unpad;
                        break;
                    case 'RANDOM':
                        this.pad = randomPad;
                        this.unpad = noPad;
                        break;
                    case 'BIT':
                        this.pad = bitPad;
                        this.unpad = bitUnpad;
                        break;
                    default:
                        this.pad = zeroPad;
                        this.unpad = noPad;
                }
            } else {
                this.pad = noPad;
                this.unpad = noPad;
            }
            this.generateKey = generateKey;
            break;
        case 'MAC':
            this.sign = signMAC;
            this.verify = verifyMAC;
            this.generateKey = generateKey;
            this.macLength = algorithm.macLength || this.blockLength >> 1;
            this.pad = noPad;
            this.unpad = noPad;
            this.keyMeshing = noKeyMeshing;
            break;
        case 'KW':
            this.pad = noPad;
            this.unpad = noPad;
            this.keyMeshing = noKeyMeshing;
            switch (algorithm.keyWrapping) {
                case 'CP':
                    this.wrapKey = wrapKeyCP;
                    this.unwrapKey = unwrapKeyCP;
                    this.generateKey = generateKey;
                    this.shiftBits = algorithm.shiftBits || this.blockLength;
                    break;
                case 'SC':
                    this.wrapKey = wrapKeySC;
                    this.unwrapKey = unwrapKeySC;
                    this.generateKey = generateWrappingKeySC;
                    break;
                default:
                    this.wrapKey = wrapKeyGOST;
                    this.unwrapKey = unwrapKeyGOST;
                    this.generateKey = generateKey;
            }
            break;
        case 'MASK':
            this.wrapKey = wrapKeyMask;
            this.unwrapKey = unwrapKeyMask;
            this.generateKey = generateKey;
            break;
        default:
            throw new _errors.NotSupportedError('Mode ' + algorithm.mode + ' not supported');
    }

    // Define sBox parameter
    var sBox = algorithm.sBox,
        sBoxName;
    if (!sBox) sBox = this.version === 2015 ? sBoxes['E-Z'] : this.procreator === 'SC' ? sBoxes['E-SC'] : sBoxes['E-A'];else if (typeof sBox === 'string') {
        sBoxName = sBox.toUpperCase();
        sBox = sBoxes[sBoxName];
        if (!sBox) throw new SyntaxError('Unknown sBox name: ' + algorithm.sBox);
    } else if (!sBox.length || sBox.length !== sBoxes['E-Z'].length) throw new SyntaxError('Length of sBox must be ' + sBoxes['E-Z'].length);
    this.sBox = sBox;
    // Initial vector
    if (algorithm.iv) {
        this.iv = new Uint8Array(algorithm.iv);
        if (this.iv.byteLength !== this.blockSize && this.version === 1989) throw new SyntaxError('Length of iv must be ' + this.blockLength + ' bits');else if (this.iv.byteLength !== this.blockSize >> 1 && this.encrypt === processCTR15) throw new SyntaxError('Length of iv must be ' + this.blockLength >> 1 + ' bits');else if (this.iv.byteLength % this.blockSize !== 0 && this.encrypt !== processCTR15) throw new SyntaxError('Length of iv must be a multiple of ' + this.blockLength + ' bits');
    } else this.iv = this.blockLength === 128 ? defaultIV128 : defaultIV;
    // User key material
    if (algorithm.ukm) {
        this.ukm = new Uint8Array(algorithm.ukm);
        if (this.ukm.byteLength * 8 !== this.blockLength) throw new SyntaxError('Length of ukm must be ' + this.blockLength + ' bits');
    }
} // </editor-fold>

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getRoot = getRoot;
exports.getCryptoModule = getCryptoModule;
exports.isInNode = isInNode;
exports.isBrowser = isBrowser;
exports.isInWebWorker = isInWebWorker;
function getRoot() {
    return isInNode() ? global : self;
}

function getCryptoModule() {
    var root = getRoot();
    if (getRoot().hasOwnProperty('crypto')) {
        return root.crypto;
    } else if (root.hasOwnProperty('msCrypto')) {
        return root.msCrypto;
    } else if (isInNode()) {
        return __webpack_require__(12);
    }

    throw new Error('Your environment does not have сrypto module');
}

function isInNode() {
    return ( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined';
}

function isBrowser() {
    return typeof window !== 'undefined';
}

function isInWebWorker() {
    return typeof importScripts !== 'undefined';
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GostRandom = GostRandom;

var _environment = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Implementation Web Crypto random generatore for GOST algorithms
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 1.76
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// Initialize mouse and time counters for random generator
var randomRing = {
    seed: new Uint8Array(1024),
    getIndex: 0,
    setIndex: 0,
    set: function set(x) {
        if (this.setIndex >= 1024) this.setIndex = 0;
        this.seed[this.setIndex++] = x;
    },
    get: function get() {
        if (this.getIndex >= 1024) this.getIndex = 0;
        return this.seed[this.getIndex++];
    }
};

if ((0, _environment.isBrowser)()) {
    try {
        // Mouse move event to fill random array
        document.addEventListener('mousemove', function (e) {
            randomRing.set(new Date().getTime() & 255 ^ (e.clientX || e.pageX) & 255 ^ (e.clientY || e.pageY) & 255);
        }, false);
    } catch (e) {}

    try {
        // Keypress event to fill random array
        document.addEventListener('keydown', function (e) {
            randomRing.set(new Date().getTime() & 255 ^ e.keyCode & 255);
        }, false);
    } catch (e) {}
} // </editor-fold>

var TypeMismatchError = function (_Error) {
    _inherits(TypeMismatchError, _Error);

    function TypeMismatchError() {
        _classCallCheck(this, TypeMismatchError);

        return _possibleConstructorReturn(this, (TypeMismatchError.__proto__ || Object.getPrototypeOf(TypeMismatchError)).apply(this, arguments));
    }

    return TypeMismatchError;
}(Error);

var QuotaExceededError = function (_Error2) {
    _inherits(QuotaExceededError, _Error2);

    function QuotaExceededError() {
        _classCallCheck(this, QuotaExceededError);

        return _possibleConstructorReturn(this, (QuotaExceededError.__proto__ || Object.getPrototypeOf(QuotaExceededError)).apply(this, arguments));
    }

    return QuotaExceededError;
}(Error);

/**
 * The gostCrypto provide general purpose cryptographic functionality for
 * GOST standards including a cryptographically strong pseudo-random number
 * generator seeded with truly random values.
 *
 * @Class GostRandom
 *
 */


function GostRandom() {}

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

var rootCryptoModule = (0, _environment.getCryptoModule)();

GostRandom.prototype.getRandomValues = function (array) // <editor-fold defaultstate="collapsed">
{
    if (!array.byteLength) throw new TypeMismatchError('Array is not of an integer type (Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, or Uint32Array)');

    if (array.byteLength > 65536) throw new QuotaExceededError('Byte length of array can\'t be greate then 65536');

    var u8 = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
    if (rootCryptoModule && rootCryptoModule.getRandomValues) {
        // Native window cryptographic interface
        rootCryptoModule.getRandomValues(u8);
    } else {
        // Standard Javascript method
        for (var i = 0, n = u8.length; i < n; i++) {
            u8[i] = Math.floor(256 * Math.random()) & 255;
        }
    }

    // Mix bio randomizator
    for (var i = 0, n = u8.length; i < n; i++) {
        u8[i] = u8[i] ^ randomRing.get();
    }return array;
}; // </editor-fold>

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GostSign = GostSign;

var _gostDigest = __webpack_require__(3);

var _errors = __webpack_require__(0);

var _seeds = __webpack_require__(1);

/*
 * Predefined curves and params collection
 *
 * http://tools.ietf.org/html/rfc5832
 * http://tools.ietf.org/html/rfc7091
 * http://tools.ietf.org/html/rfc4357
 *
 */ // <editor-fold defaultstate="collapsed">

var CryptoOperationData = ArrayBuffer;

// Predefined named curve collection
/**
 * @file GOST 34.10-2012 signature function with 1024/512 bits digest
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

var ECGostParams = {
    'S-256-TEST': {
        a: 7,
        b: '0x5FBFF498AA938CE739B8E022FBAFEF40563F6E6A3472FC2A514C0CE9DAE23B7E',
        p: '0x8000000000000000000000000000000000000000000000000000000000000431',
        q: '0x8000000000000000000000000000000150FE8A1892976154C59CFC193ACCF5B3',
        x: 2,
        y: '0x8E2A8A0E65147D4BD6316030E16D19C85C97F0A9CA267122B96ABBCEA7E8FC8'
    },
    'S-256-A': {
        a: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFD94',
        b: 166,
        p: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFD97',
        q: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF6C611070995AD10045841B09B761B893',
        x: 1,
        y: '0x8D91E471E0989CDA27DF505A453F2B7635294F2DDF23E3B122ACC99C9E9F1E14'
    },
    'S-256-B': {
        a: '0x8000000000000000000000000000000000000000000000000000000000000C96',
        b: '0x3E1AF419A269A5F866A7D3C25C3DF80AE979259373FF2B182F49D4CE7E1BBC8B',
        p: '0x8000000000000000000000000000000000000000000000000000000000000C99',
        q: '0x800000000000000000000000000000015F700CFFF1A624E5E497161BCC8A198F',
        x: 1,
        y: '0x3FA8124359F96680B83D1C3EB2C070E5C545C9858D03ECFB744BF8D717717EFC'
    },
    'S-256-C': {
        a: '0x9B9F605F5A858107AB1EC85E6B41C8AACF846E86789051D37998F7B9022D7598',
        b: 32858,
        p: '0x9B9F605F5A858107AB1EC85E6B41C8AACF846E86789051D37998F7B9022D759B',
        q: '0x9B9F605F5A858107AB1EC85E6B41C8AA582CA3511EDDFB74F02F3A6598980BB9',
        x: 0,
        y: '0x41ECE55743711A8C3CBF3783CD08C0EE4D4DC440D4641A8F366E550DFDB3BB67'
    },
    'P-256': {
        p: '0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF',
        a: '0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC',
        b: '0x5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B',
        x: '0x6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296',
        y: '0x4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5',
        q: '0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551'
    },
    'T-512-TEST': {
        a: 7,
        b: '0x1CFF0806A31116DA29D8CFA54E57EB748BC5F377E49400FDD788B649ECA1AC4361834013B2AD7322480A89CA58E0CF74BC9E540C2ADD6897FAD0A3084F302ADC',
        p: '0x4531ACD1FE0023C7550D267B6B2FEE80922B14B2FFB90F04D4EB7C09B5D2D15DF1D852741AF4704A0458047E80E4546D35B8336FAC224DD81664BBF528BE6373',
        q: '0x4531ACD1FE0023C7550D267B6B2FEE80922B14B2FFB90F04D4EB7C09B5D2D15DA82F2D7ECB1DBAC719905C5EECC423F1D86E25EDBE23C595D644AAF187E6E6DF',
        x: '0x24D19CC64572EE30F396BF6EBBFD7A6C5213B3B3D7057CC825F91093A68CD762FD60611262CD838DC6B60AA7EEE804E28BC849977FAC33B4B530F1B120248A9A',
        y: '0x2BB312A43BD2CE6E0D020613C857ACDDCFBF061E91E5F2C3F32447C259F39B2C83AB156D77F1496BF7EB3351E1EE4E43DC1A18B91B24640B6DBB92CB1ADD371E'
    },
    'T-512-A': {
        p: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDC7',
        a: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDC4',
        b: '0xE8C2505DEDFC86DDC1BD0B2B6667F1DA34B82574761CB0E879BD081CFD0B6265EE3CB090F30D27614CB4574010DA90DD862EF9D4EBEE4761503190785A71C760',
        q: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF27E69532F48D89116FF22B8D4E0560609B4B38ABFAD2B85DCACDB1411F10B275',
        x: 3,
        y: '0x7503CFE87A836AE3A61B8816E25450E6CE5E1C93ACF1ABC1778064FDCBEFA921DF1626BE4FD036E93D75E6A50E3A41E98028FE5FC235F5B889A589CB5215F2A4'
    },
    'T-512-B': {
        p: '0x8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006F',
        a: '0x8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006C',
        b: '0x687D1B459DC841457E3E06CF6F5E2517B97C7D614AF138BCBF85DC806C4B289F3E965D2DB1416D217F8B276FAD1AB69C50F78BEE1FA3106EFB8CCBC7C5140116',
        q: '0x800000000000000000000000000000000000000000000000000000000000000149A1EC142565A545ACFDB77BD9D40CFA8B996712101BEA0EC6346C54374F25BD',
        x: 2,
        y: '0x1A8F7EDA389B094C2C071E3647A8940F3C123B697578C213BE6DD9E6C8EC7335DCB228FD1EDF4A39152CBCAAF8C0398828041055F94CEEEC7E21340780FE41BD'
    }
};
ECGostParams['X-256-A'] = ECGostParams['S-256-A'];
ECGostParams['X-256-B'] = ECGostParams['S-256-C'];
ECGostParams['T-256-TEST'] = ECGostParams['S-256-TEST'];
ECGostParams['T-256-A'] = ECGostParams['S-256-A'];
ECGostParams['T-256-B'] = ECGostParams['S-256-B'];
ECGostParams['T-256-C'] = ECGostParams['S-256-C'];

var GostParams = {
    'S-TEST': {
        modulusLength: 512, // bit length of p (512 or 1024 bits)
        p: '0xEE8172AE8996608FB69359B89EB82A69854510E2977A4D63BC97322CE5DC3386EA0A12B343E9190F23177539845839786BB0C345D165976EF2195EC9B1C379E3',
        q: '0x98915E7EC8265EDFCDA31E88F24809DDB064BDC7285DD50D7289F0AC6F49DD2D',
        a: '0x9e96031500c8774a869582d4afde2127afad2538b4b6270a6f7c8837b50d50f206755984a49e509304d648be2ab5aab18ebe2cd46ac3d8495b142aa6ce23e21c'
    },
    'S-A': {
        modulusLength: 1024,
        p: '0xB4E25EFB018E3C8B87505E2A67553C5EDC56C2914B7E4F89D23F03F03377E70A2903489DD60E78418D3D851EDB5317C4871E40B04228C3B7902963C4B7D85D52B9AA88F2AFDBEB28DA8869D6DF846A1D98924E925561BD69300B9DDD05D247B5922D967CBB02671881C57D10E5EF72D3E6DAD4223DC82AA1F7D0294651A480DF',
        q: '0x972432A437178B30BD96195B773789AB2FFF15594B176DD175B63256EE5AF2CF',
        a: '0x8FD36731237654BBE41F5F1F8453E71CA414FFC22C25D915309E5D2E62A2A26C7111F3FC79568DAFA028042FE1A52A0489805C0DE9A1A469C844C7CABBEE625C3078888C1D85EEA883F1AD5BC4E6776E8E1A0750912DF64F79956499F1E182475B0B60E2632ADCD8CF94E9C54FD1F3B109D81F00BF2AB8CB862ADF7D40B9369A'
    },
    'S-B': {
        modulusLength: 1024,
        p: '0xC6971FC57524B30C9018C5E621DE15499736854F56A6F8AEE65A7A404632B1BCF0349FFCAFCB0A103177971FC1612ADCDB8C8CC938C70225C8FD12AFF01B1D064E0AD6FDE6AB9159166CB9F2FC171D92F0CC7B6A6B2CD7FA342ACBE2C9315A42D576B1ECCE77A963157F3D0BD96A8EB0B0F3502AD238101B05116334F1E5B7AB',
        q: '0xB09D634C10899CD7D4C3A7657403E05810B07C61A688BAB2C37F475E308B0607',
        a: '0x3D26B467D94A3FFC9D71BF8DB8934084137264F3C2E9EB16DCA214B8BC7C872485336744934FD2EF5943F9ED0B745B90AA3EC8D70CDC91682478B664A2E1F8FB56CEF2972FEE7EDB084AF746419B854FAD02CC3E3646FF2E1A18DD4BEB3C44F7F2745588029649674546CC9187C207FB8F2CECE8E2293F68395C4704AF04BAB5'
    },
    'S-C': {
        modulusLength: 1024,
        p: '0x9D88E6D7FE3313BD2E745C7CDD2AB9EE4AF3C8899E847DE74A33783EA68BC30588BA1F738C6AAF8AB350531F1854C3837CC3C860FFD7E2E106C3F63B3D8A4C034CE73942A6C3D585B599CF695ED7A3C4A93B2B947B7157BB1A1C043AB41EC8566C6145E938A611906DE0D32E562494569D7E999A0DDA5C879BDD91FE124DF1E9',
        q: '0xFADD197ABD19A1B4653EECF7ECA4D6A22B1F7F893B641F901641FBB555354FAF',
        a: '0x7447ED7156310599070B12609947A5C8C8A8625CF1CF252B407B331F93D639DDD1BA392656DECA992DD035354329A1E95A6E32D6F47882D960B8F10ACAFF796D13CD9611F853DAB6D2623483E46788708493937A1A29442598AEC2E0742022563440FE9C18740ECE6765AC05FAF024A64B026E7E408840819E962E7E5F401AE3'
    },
    'S-D': {
        modulusLength: 1024,
        p: '0x80F102D32B0FD167D069C27A307ADAD2C466091904DBAA55D5B8CC7026F2F7A1919B890CB652C40E054E1E9306735B43D7B279EDDF9102001CD9E1A831FE8A163EED89AB07CF2ABE8242AC9DEDDDBF98D62CDDD1EA4F5F15D3A42A6677BDD293B24260C0F27C0F1D15948614D567B66FA902BAA11A69AE3BCEADBB83E399C9B5',
        q: '0xF0F544C418AAC234F683F033511B65C21651A6078BDA2D69BB9F732867502149',
        a: '0x6BCC0B4FADB3889C1E06ADD23CC09B8AB6ECDEDF73F04632595EE4250005D6AF5F5ADE44CB1E26E6263C672347CFA26F9E9393681E6B759733784CDE5DBD9A14A39369DFD99FA85CC0D10241C4010343F34A91393A706CF12677CBFA1F578D6B6CFBE8A1242CFCC94B3B653A476E145E3862C18CC3FED8257CFEF74CDB205BF1'
    },
    'X-A': {
        modulusLength: 1024,
        p: '0xCA3B3F2EEE9FD46317D49595A9E7518E6C63D8F4EB4D22D10D28AF0B8839F079F8289E603B03530784B9BB5A1E76859E4850C670C7B71C0DF84CA3E0D6C177FE9F78A9D8433230A883CD82A2B2B5C7A3306980278570CDB79BF01074A69C9623348824B0C53791D53C6A78CAB69E1CFB28368611A397F50F541E16DB348DBE5F',
        q: '0xCAE4D85F80C147704B0CA48E85FB00A9057AA4ACC44668E17F1996D7152690D9',
        a: '0xBE27D652F2F1E339DA734211B85B06AE4DE236AA8FBEEB3F1ADCC52CD43853777E834A6A518138678A8ADBD3A55C70A7EAB1BA7A0719548677AAF4E609FFB47F6B9D7E45B0D06D83D7ADC53310ABD85783E7317F7EC73268B6A9C08D260B85D8485696CA39C17B17F044D1E050489036ABD381C5E6BF82BA352A1AFF136601AF'
    },
    'X-B': {
        modulusLength: 1024,
        p: '0x9286DBDA91ECCFC3060AA5598318E2A639F5BA90A4CA656157B2673FB191CD0589EE05F4CEF1BD13508408271458C30851CE7A4EF534742BFB11F4743C8F787B11193BA304C0E6BCA25701BF88AF1CB9B8FD4711D89F88E32B37D95316541BF1E5DBB4989B3DF13659B88C0F97A3C1087B9F2D5317D557DCD4AFC6D0A754E279',
        q: '0xC966E9B3B8B7CDD82FF0F83AF87036C38F42238EC50A876CD390E43D67B6013F',
        a: '0x7E9C3096676F51E3B2F9884CF0AC2156779496F410E049CED7E53D8B7B5B366B1A6008E5196605A55E89C3190DABF80B9F1163C979FCD18328DAE5E9048811B370107BB7715F82091BB9DE0E33EE2FED6255474F8769FCE5EAFAEEF1CB5A32E0D5C6C2F0FC0B3447072947F5B4C387666993A333FC06568E534AD56D2338D729'
    },
    'X-C': {
        modulusLength: 1024,
        p: '0xB194036ACE14139D36D64295AE6C50FC4B7D65D8B340711366CA93F383653908EE637BE428051D86612670AD7B402C09B820FA77D9DA29C8111A8496DA6C261A53ED252E4D8A69A20376E6ADDB3BDCD331749A491A184B8FDA6D84C31CF05F9119B5ED35246EA4562D85928BA1136A8D0E5A7E5C764BA8902029A1336C631A1D',
        q: '0x96120477DF0F3896628E6F4A88D83C93204C210FF262BCCB7DAE450355125259',
        a: '0x3F1817052BAA7598FE3E4F4FC5C5F616E122CFF9EBD89EF81DC7CE8BF56CC64B43586C80F1C4F56DD5718FDD76300BE336784259CA25AADE5A483F64C02A20CF4A10F9C189C433DEFE31D263E6C9764660A731ECCAECB74C8279303731E8CF69205BC73E5A70BDF93E5BB681DAB4EEB9C733CAAB2F673C475E0ECA921D29782E'
    }
}; // </editor-fold>

/*
 * BigInteger arithmetic tools
 * optimized release of http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn.js
 *
 */ // <editor-fold defaultstate="collapsed">

// Bits per one element
var DB = 28,
    DM = (1 << DB) - 1,
    DV = 1 << DB,
    FV = Math.pow(2, 52),
    F1 = 52 - DB,
    F2 = 2 * DB - 52;

function am(y, i, x, w, j, c, n) {
    var xl = x & 0x3fff,
        xh = x >> 14;
    while (--n >= 0) {
        var l = y[i] & 0x3fff;
        var h = y[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w[j++] = l & 0xfffffff;
    }
    return c;
}

function nbi(words) {
    var r = new Array(Math.ceil(words));
    r.s = 0;
    r.t = 0;
    return r;
}

function copyTo(x, r) {
    for (var i = x.t - 1; i >= 0; --i) {
        r[i] = x[i];
    }r.t = x.t;
    r.s = x.s;
    return r;
}

function copy(x) {
    return copyTo(x, nbi(x.t));
}

function setInt(x, i) {
    x.t = 1;
    x.s = i < 0 ? -1 : 0;
    if (i > 0) x[0] = i;else if (i < -1) x[0] = i + DV;else x.t = 0;
    return x;
}

function nbv(i) {
    var r = nbi(1);
    setInt(r, i);
    return r;
}

var ZERO = nbv(0),
    ONE = nbv(1),
    THREE = nbv(3);

function clamp(x) {
    var c = x.s & DM;
    while (x.t > 0 && x[x.t - 1] === c) {
        --x.t;
    }return x;
}

function subTo(x, a, r) {
    var i = 0,
        c = 0,
        m = Math.min(a.t, x.t);
    while (i < m) {
        c += x[i] - a[i];
        r[i++] = c & DM;
        c >>= DB;
    }
    if (a.t < x.t) {
        c -= a.s;
        while (i < x.t) {
            c += x[i];
            r[i++] = c & DM;
            c >>= DB;
        }
        c += x.s;
    } else {
        c += x.s;
        while (i < a.t) {
            c -= a[i];
            r[i++] = c & DM;
            c >>= DB;
        }
        c -= a.s;
    }
    r.s = c < 0 ? -1 : 0;
    if (c < -1) r[i++] = DV + c;else if (c > 0) r[i++] = c;
    r.t = i;
    return clamp(r);
}

function sub(x, y) {
    return subTo(x, y, nbi(x.t));
}

function addTo(x, a, r) {
    var i = 0,
        c = 0,
        m = Math.min(a.t, x.t);
    while (i < m) {
        c += x[i] + a[i];
        r[i++] = c & DM;
        c >>= DB;
    }
    if (a.t < x.t) {
        c += a.s;
        while (i < x.t) {
            c += x[i];
            r[i++] = c & DM;
            c >>= DB;
        }
        c += x.s;
    } else {
        c += x.s;
        while (i < a.t) {
            c += a[i];
            r[i++] = c & DM;
            c = c >> DB;
        }
        c += a.s;
    }
    r.s = c < 0 ? -1 : 0;
    if (c > 0) r[i++] = c;else if (c < -1) r[i++] = DV + c;
    r.t = i;
    return clamp(r);
}

function add(x, y) {
    return addTo(x, y, nbi(x.t));
}

function negTo(x, r) {
    return subTo(ZERO, x, r);
}

function neg(x) {
    return negTo(x, nbi(x.t));
}

function absTo(x, r) {
    return x.s < 0 ? negTo(r) : copyTo(r);
}

function abs(x) {
    return x.s < 0 ? neg(x) : x;
}

function compare(x, a) {
    var r = x.s - a.s;
    if (r !== 0) return r;
    var i = x.t;
    r = i - a.t;
    if (r !== 0) return x.s < 0 ? -r : r;
    while (--i >= 0) {
        if ((r = x[i] - a[i]) !== 0) return r;
    }return 0;
}

function equals(x, y) {
    return compare(x, y) === 0;
}

function min(x, y) {
    return compare(x, y) < 0 ? x : y;
}

function max(x, y) {
    return compare(x, y) > 0 ? x : y;
}

function nbits(x) {
    var r = 1,
        t;
    if ((t = x >>> 16) !== 0) {
        x = t;
        r += 16;
    }
    if ((t = x >> 8) !== 0) {
        x = t;
        r += 8;
    }
    if ((t = x >> 4) !== 0) {
        x = t;
        r += 4;
    }
    if ((t = x >> 2) !== 0) {
        x = t;
        r += 2;
    }
    if ((t = x >> 1) !== 0) {
        x = t;
        r += 1;
    }
    return r;
}

function dshlTo(x, n, r) {
    var i;
    for (i = x.t - 1; i >= 0; --i) {
        r[i + n] = x[i];
    }for (i = n - 1; i >= 0; --i) {
        r[i] = 0;
    }r.t = x.t + n;
    r.s = x.s;
    return r;
}

function dshrTo(x, n, r) {
    for (var i = n; i < x.t; ++i) {
        r[i - n] = x[i];
    }r.t = Math.max(x.t - n, 0);
    r.s = x.s;
    return r;
}

function shlTo(x, n, r) {
    var bs = n % DB;
    var cbs = DB - bs;
    var bm = (1 << cbs) - 1;
    var ds = Math.floor(n / DB),
        c = x.s << bs & DM,
        i;
    for (i = x.t - 1; i >= 0; --i) {
        r[i + ds + 1] = x[i] >> cbs | c;
        c = (x[i] & bm) << bs;
    }
    for (i = ds - 1; i >= 0; --i) {
        r[i] = 0;
    }r[ds] = c;
    r.t = x.t + ds + 1;
    r.s = x.s;
    return clamp(r);
}

function shrTo(x, n, r) {
    r.s = x.s;
    var ds = Math.floor(n / DB);
    if (ds >= x.t) {
        r.t = 0;
        return;
    }
    var bs = n % DB;
    var cbs = DB - bs;
    var bm = (1 << bs) - 1;
    r[0] = x[ds] >> bs;
    for (var i = ds + 1; i < x.t; ++i) {
        r[i - ds - 1] |= (x[i] & bm) << cbs;
        r[i - ds] = x[i] >> bs;
    }
    if (bs > 0) r[x.t - ds - 1] |= (x.s & bm) << cbs;
    r.t = x.t - ds;
    return clamp(r);
}

function shl(x, n) {
    var r = nbi(x.t);
    if (n < 0) shrTo(x, -n, r);else shlTo(x, n, r);
    return r;
}

function shr(x, n) {
    var r = nbi(x.t);
    if (n < 0) shlTo(x, -n, r);else shrTo(x, n, r);
    return r;
}

function bitLength(x) {
    if (x.t <= 0) return 0;
    return DB * (x.t - 1) + nbits(x[x.t - 1] ^ x.s & DM);
}

function _mulTo(b, a, r) {
    var x = abs(b),
        y = abs(a);
    var i = x.t;
    r.t = i + y.t;
    while (--i >= 0) {
        r[i] = 0;
    }for (i = 0; i < y.t; ++i) {
        r[i + x.t] = am(x, 0, y[i], r, i, 0, x.t);
    }r.s = 0;
    if (b.s !== a.s) subTo(ZERO, r, r);
    return clamp(r);
}

function mul(x, y) {
    return _mulTo(x, y, nbi(x.t + y.t));
}

function _sqrTo(a, r) {
    var x = abs(a);
    var i = r.t = 2 * x.t;
    while (--i >= 0) {
        r[i] = 0;
    }for (i = 0; i < x.t - 1; ++i) {
        var c = am(x, i, x[i], r, 2 * i, 0, 1);
        if ((r[i + x.t] += am(x, i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
            r[i + x.t] -= x.DV;
            r[i + x.t + 1] = 1;
        }
    }
    if (r.t > 0) r[r.t - 1] += am(x, i, x[i], r, 2 * i, 0, 1);
    r.s = 0;
    return clamp(r);
}

function sqr(a) {
    return _sqrTo(a, nbi(a.t * 2));
}

function divRemTo(n, m, q, r) {
    var pm = abs(m);
    if (pm.t <= 0) throw new OperationError('Division by zero');
    var pt = abs(n);
    if (pt.t < pm.t) {
        if (q) setInt(q, 0);
        if (r) copyTo(n, r);
        return q;
    }
    if (!r) r = nbi(m.t);
    var y = nbi(m.t),
        ts = n.s,
        ms = m.s;
    var nsh = DB - nbits(pm[pm.t - 1]);
    if (nsh > 0) {
        shlTo(pm, nsh, y);
        shlTo(pt, nsh, r);
    } else {
        copyTo(pm, y);
        copyTo(pt, r);
    }
    var ys = y.t;
    var y0 = y[ys - 1];
    if (y0 === 0) return q;
    var yt = y0 * (1 << F1) + (ys > 1 ? y[ys - 2] >> F2 : 0);
    var d1 = FV / yt,
        d2 = (1 << F1) / yt,
        e = 1 << F2;
    var i = r.t,
        j = i - ys,
        t = !q ? nbi(Math.max(n.t - m.t, 1)) : q;
    dshlTo(y, j, t);
    if (compare(r, t) >= 0) {
        r[r.t++] = 1;
        subTo(r, t, r);
    }
    dshlTo(ONE, ys, t);
    subTo(t, y, y);
    while (y.t < ys) {
        y[y.t++] = 0;
    }while (--j >= 0) {
        var qd = r[--i] === y0 ? DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
        if ((r[i] += am(y, 0, qd, r, j, 0, ys)) < qd) {
            dshlTo(y, j, t);
            subTo(r, t, r);
            while (r[i] < --qd) {
                subTo(r, t, r);
            }
        }
    }
    if (q) {
        dshrTo(r, ys, q);
        if (ts !== ms) subTo(ZERO, q, q);
    }
    r.t = ys;
    clamp(r);
    if (nsh > 0) shrTo(r, nsh, r);
    if (ts < 0) subTo(ZERO, r, r);
    return q;
}

function modTo(b, a, r) {
    divRemTo(abs(b), a, null, r);
    if (b.s < 0 && compare(r, ZERO) > 0) subTo(a, r, r);
    return r;
}

function mod(b, a) {
    return modTo(b, a, nbi(a.t));
}

function div(b, a) {
    return divRemTo(b, a, nbi(Math.max(b.t - a.t, 1)), null);
}

function isEven(x) {

    return (x.t > 0 ? x[0] & 1 : x.s) === 0;
}

function isZero(x) {
    return equals(x, ZERO);
}

function sig(x) {
    if (x.s < 0) return -1;else if (x.t <= 0 || x.t === 1 && x[0] <= 0) return 0;else return 1;
}

function invMod(x, m) {
    var ac = isEven(m);
    if (isEven(x) && ac || sig(m) === 0) return ZERO;
    var u = copy(m),
        v = copy(x);
    var a = nbv(1),
        b = nbv(0),
        c = nbv(0),
        d = nbv(1);
    while (sig(u) !== 0) {
        while (isEven(u)) {
            shrTo(u, 1, u);
            if (ac) {
                if (!isEven(a) || !isEven(b)) {
                    addTo(a, x, a);
                    subTo(b, m, b);
                }
                shrTo(a, 1, a);
            } else if (!isEven(b)) subTo(b, m, b);
            shrTo(b, 1, b);
        }
        while (isEven(v)) {
            shrTo(v, 1, v);
            if (ac) {
                if (!isEven(c) || !isEven(d)) {
                    addTo(c, x, c);
                    subTo(d, m, d);
                }
                shrTo(c, 1, c);
            } else if (!isEven(d)) subTo(d, m, d);
            shrTo(d, 1, d);
        }
        if (compare(u, v) >= 0) {
            subTo(u, v, u);
            if (ac) subTo(a, c, a);
            subTo(b, d, b);
        } else {
            subTo(v, u, v);
            if (ac) subTo(c, a, c);
            subTo(d, b, d);
        }
    }
    if (compare(v, ONE) !== 0) return ZERO;
    if (compare(d, m) >= 0) return subtract(d, m);
    if (sig(d) < 0) addTo(d, m, d);else return d;
    if (sig(d) < 0) return add(d, m);else return d;
}

function testBit(x, n) {
    var j = Math.floor(n / DB);
    if (j >= x.t) return x.s !== 0;
    return (x[j] & 1 << n % DB) !== 0;
}

function nothing(x) {
    return x;
}

function extend(c, o) {
    for (var i in o) {
        c.prototype[i] = o[i];
    }
} // </editor-fold>

/*
 * Classic, Barret, Mongomery reductions, optimized ExpMod algorithms
 * optimized release of http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn2.js
 *
 */ // <editor-fold defaultstate="collapsed">

// Classic reduction
var Classic = function Classic(m) {
    this.m = m;
};

extend(Classic, {
    convert: function convert(x) {
        if (x.s < 0 || compare(x, this.m) >= 0) return mod(x, this.m);else return x;
    },
    revert: nothing,
    reduce: function reduce(x) {
        modTo(x, this.m, x);
    },
    sqrTo: function sqrTo(x, r) {
        _sqrTo(x, r);
        this.reduce(r);
    },
    mulTo: function mulTo(x, y, r) {
        _mulTo(x, y, r);
        this.reduce(r);
    }
});

function invDig(a) {
    if (a.t < 1) return 0;
    var x = a[0];
    if ((x & 1) === 0) return 0;
    var y = x & 3;
    y = y * (2 - (x & 0xf) * y) & 0xf;
    y = y * (2 - (x & 0xff) * y) & 0xff;
    y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff;
    y = y * (2 - x * y % DV) % DV;
    return y > 0 ? DV - y : -y;
}

// Montgomery reduction
var Montgomery = function Montgomery(m) {
    this.m = m;
    this.mp = invDig(m);
    this.mpl = this.mp & 0x7fff;
    this.mph = this.mp >> 15;
    this.um = (1 << DB - 15) - 1;
    this.mt2 = 2 * m.t;
};

extend(Montgomery, {
    // xR mod m
    convert: function convert(x) {
        var r = nbi(x.t);
        dshlTo(abs(x), this.m.t, r);
        divRemTo(r, this.m, null, r);
        if (x.s < 0 && compare(r, ZERO) > 0) subTo(this.m, r, r);
        return r;
    },
    // x/R mod m
    revert: function revert(x) {
        var r = nbi(x.t);
        copyTo(x, r);
        this.reduce(r);
        return r;
    },
    // x = x/R mod m (HAC 14.32)
    reduce: function reduce(x) {
        while (x.t <= this.mt2) {
            x[x.t++] = 0;
        }for (var i = 0; i < this.m.t; ++i) {
            var j = x[i] & 0x7fff;
            var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & DM;
            j = i + this.m.t;
            x[j] += am(this.m, 0, u0, x, i, 0, this.m.t);
            while (x[j] >= DV) {
                x[j] -= DV;
                x[++j]++;
            }
        }
        clamp(x);
        dshrTo(x, this.m.t, x);
        if (compare(x, this.m) >= 0) subTo(x, this.m, x);
    },
    // r = "x^2/R mod m"; x != r
    sqrTo: function sqrTo(x, r) {
        _sqrTo(x, r);
        this.reduce(r);
    },
    // r = "xy/R mod m"; x,y != r
    mulTo: function mulTo(x, y, r) {
        _mulTo(x, y, r);
        this.reduce(r);
    }
});

function dAddOffset(x, n, w) {
    if (n === 0) return;
    while (x.t <= w) {
        x[x.t++] = 0;
    }x[w] += n;
    while (x[w] >= DV) {
        x[w] -= DV;
        if (++w >= x.t) x[x.t++] = 0;
        ++x[w];
    }
}

function mulLowerTo(x, a, n, r) {
    var i = Math.min(x.t + a.t, n);
    r.s = 0; // assumes a,x >= 0
    r.t = i;
    while (i > 0) {
        r[--i] = 0;
    }var j;
    for (j = r.t - x.t; i < j; ++i) {
        r[i + x.t] = am(x, 0, a[i], r, i, 0, x.t);
    }for (j = Math.min(a.t, n); i < j; ++i) {
        am(x, 0, a[i], r, i, 0, n - i);
    }return clamp(r);
}

function mulUpperTo(x, a, n, r) {
    --n;
    var i = r.t = x.t + a.t - n;
    r.s = 0; // assumes a,x >= 0
    while (--i >= 0) {
        r[i] = 0;
    }for (i = Math.max(n - x.t, 0); i < a.t; ++i) {
        r[x.t + i - n] = am(x, n - i, a[i], r, 0, 0, x.t + i - n);
    }clamp(r);
    return dshrTo(r, 1, r);
}

// Barrett modular reduction
function Barrett(m) {
    // setup Barrett
    this.r2 = nbi(2 * m.t);
    this.q3 = nbi(2 * m.t);
    dshlTo(ONE, 2 * m.t, this.r2);
    this.mu = div(this.r2, m);
    this.m = m;
}

extend(Barrett, {
    convert: function convert(x) {
        if (x.s < 0 || x.t > 2 * this.m.t) return mod(x, this.m);else if (compare(x, this.m) < 0) return x;else {
            var r = nbi(x.t);
            copyTo(x, r);
            this.reduce(r);
            return r;
        }
    },
    revert: function revert(x) {
        return x;
    },
    // x = x mod m (HAC 14.42)
    reduce: function reduce(x) {
        dshrTo(x, this.m.t - 1, this.r2);
        if (x.t > this.m.t + 1) {
            x.t = this.m.t + 1;
            clamp(x);
        }
        mulUpperTo(this.mu, this.r2, this.m.t + 1, this.q3);
        mulLowerTo(this.m, this.q3, this.m.t + 1, this.r2);
        while (compare(x, this.r2) < 0) {
            dAddOffset(x, 1, this.m.t + 1);
        }subTo(x, this.r2, x);
        while (compare(x, this.m) >= 0) {
            subTo(x, this.m, x);
        }
    },
    // r = x^2 mod m; x != r
    sqrTo: function sqrTo(x, r) {
        _sqrTo(x, r);
        this.reduce(r);
    },
    // r = x*y mod m; x,y != r
    mulTo: function mulTo(x, y, r) {
        _mulTo(x, y, r);
        this.reduce(r);
    }

});

// x^e % m (HAC 14.85)
function expMod(x, e, m) {
    var i = bitLength(e),
        k,
        r = nbv(1),
        z;
    if (i <= 0) return r;else if (i < 18) k = 1;else if (i < 48) k = 3;else if (i < 144) k = 4;else if (i < 768) k = 5;else k = 6;
    if (i < 8) z = new Classic(m);else if (isEven(m)) z = new Barrett(m);else z = new Montgomery(m);

    // precomputation
    var g = new Array(),
        n = 3,
        k1 = k - 1,
        km = (1 << k) - 1;
    g[1] = z.convert(x);
    if (k > 1) {
        var g2 = nbi(m.t * 2);
        z.sqrTo(g[1], g2);
        while (n <= km) {
            g[n] = nbi(m.t * 2);
            z.mulTo(g2, g[n - 2], g[n]);
            n += 2;
        }
    }

    var j = e.t - 1,
        w,
        is1 = true,
        r2 = nbi(m.t * 2),
        t;
    i = nbits(e[j]) - 1;
    while (j >= 0) {
        if (i >= k1) w = e[j] >> i - k1 & km;else {
            w = (e[j] & (1 << i + 1) - 1) << k1 - i;
            if (j > 0) w |= e[j - 1] >> DB + i - k1;
        }

        n = k;
        while ((w & 1) == 0) {
            w >>= 1;
            --n;
        }
        if ((i -= n) < 0) {
            i += DB;
            --j;
        }
        if (is1) {
            // ret == 1, don't bother squaring or multiplying it
            copyTo(g[w], r);
            is1 = false;
        } else {
            while (n > 1) {
                z.sqrTo(r, r2);
                z.sqrTo(r2, r);
                n -= 2;
            }
            if (n > 0) z.sqrTo(r, r2);else {
                t = r;
                r = r2;
                r2 = t;
            }
            z.mulTo(r2, g[w], r);
        }
        while (j >= 0 && (e[j] & 1 << i) == 0) {
            z.sqrTo(r, r2);
            t = r;
            r = r2;
            r2 = t;
            if (--i < 0) {
                i = DB - 1;
                --j;
            }
        }
    }
    return z.revert(r);
} // </editor-fold>

/*
 * EC Field Elements, Points, Curves
 * optimized release of http://www-cs-students.stanford.edu/~tjw/jsbn/ec.js
 *
 */ // <editor-fold defaultstate="collapsed">

// EC Field Elemets
function newFE(a, x) {
    a.r.reduce(x);
    x.q = a.q;
    x.r = a.r;
    return x;
}

function copyFE(a, x) {
    x.q = a.q;
    x.r = a.r;
    return x;
}

function negFE(a) {
    return copyFE(a, sub(a.q, a));
}

function addFE(a, b) {
    var r = add(a, b);
    if (compare(r, a.q) > 0) subTo(r, a.q, r);
    return copyFE(a, r);
}

function subFE(a, b) {
    var r = sub(a, b);
    if (r.s < 0) addTo(a.q, r, r);
    return copyFE(a, r);
}

function mulFE(a, b) {
    return newFE(a, mul(a, b));
}

function sqrFE(a) {
    return newFE(a, sqr(a));
}

function shlFE(a, i) {
    return newFE(a, shl(a, i));
}

function invFE(a) {
    return copyFE(a, invMod(a, a.q));
}

// EC Points
function newEC(curve, x, y, z) {
    return {
        curve: curve,
        x: x,
        y: y,
        z: z || newFE(curve, ONE)
    };
}

function getX(point) {
    if (!point.zinv) point.zinv = invFE(point.z);
    return mulFE(point.x, point.zinv);
}

function getY(point) {
    if (!point.zinv) point.zinv = invFE(point.z);
    return mulFE(point.y, point.zinv);
}

function isInfinity(a) {
    if (!a.x && !a.y) return true;
    return isZero(a.z) && !isZero(a.y);
}

function getInfinity(a) {
    return a.curve.infinity;
}

function equalsEC(a, b) {
    if (a === b) return true;
    if (isInfinity(a)) return isInfinity(b);
    if (isInfinity(b)) return isInfinity(a);
    var u, v;
    // u = Y2 * Z1 - Y1 * Z2
    u = subFE(mulFE(b.y, a.z), mulFE(a.y, b.z));
    if (!isZero(u)) return false;
    // v = X2 * Z1 - X1 * Z2
    v = subFE(mulFE(b.x, a.z), mulFE(a.x, b.z));
    return isZero(v);
}

function negEC(a) {
    return newEC(a.curve, a.x, negFE(a.y), a.z);
}

function addEC(a, b) {
    if (isInfinity(a)) return b;
    if (isInfinity(b)) return a;

    // u = Y2 * Z1 - Y1 * Z2
    var u = subFE(mulFE(b.y, a.z), mulFE(a.y, b.z));
    // v = X2 * Z1 - X1 * Z2
    var v = subFE(mulFE(b.x, a.z), mulFE(a.x, b.z));

    if (isZero(v)) {
        if (isZero(u)) {
            return twiceEC(a); // a == b, so double
        }
        return getInfinity(a); // a = -b, so infinity
    }

    var x1 = a.x;
    var y1 = a.y;

    var v2 = sqrFE(v);
    var v3 = mulFE(v2, v);
    var x1v2 = mulFE(x1, v2);
    var zu2 = mulFE(sqrFE(u), a.z);

    // x3 = v * (z2 * (z1 * u^2 - 2 * x1 * v^2) - v^3)
    var x3 = mulFE(subFE(mulFE(subFE(zu2, shlFE(x1v2, 1)), b.z), v3), v);
    // y3 = z2 * (3 * x1 * u * v^2 - y1 * v^3 - z1 * u^3) + u * v^3
    var y3 = addFE(mulFE(subFE(subFE(mulFE(mulFE(x1v2, THREE), u), mulFE(y1, v3)), mulFE(zu2, u)), b.z), mulFE(u, v3));
    // z3 = v^3 * z1 * z2
    var z3 = mulFE(mulFE(v3, a.z), b.z);

    return newEC(a.curve, x3, y3, z3);
}

function twiceEC(b) {
    if (isInfinity(b)) return b;
    if (sig(b.y) === 0) return getInfinity(b);

    var x1 = b.x;
    var y1 = b.y;

    var y1z1 = mulFE(y1, b.z);
    var y1sqz1 = mulFE(y1z1, y1);
    var a = b.curve.a;

    // w = 3 * x1^2 + a * z1^2
    var w = mulFE(sqrFE(x1), THREE);
    if (!isZero(a)) {
        w = addFE(w, mulFE(sqrFE(b.z), a));
    }

    // x3 = 2 * y1 * z1 * (w^2 - 8 * x1 * y1^2 * z1)
    var x3 = mulFE(shlFE(subFE(sqrFE(w), mulFE(shlFE(x1, 3), y1sqz1)), 1), y1z1);
    // y3 = 4 * y1^2 * z1 * (3 * w * x1 - 2 * y1^2 * z1) - w^3
    var y3 = subFE(mulFE(shlFE(subFE(mulFE(mulFE(w, THREE), x1), shlFE(y1sqz1, 1)), 2), y1sqz1), mulFE(sqrFE(w), w));
    // z3 = 8 * (y1 * z1)^3
    var z3 = shlFE(mulFE(sqrFE(y1z1), y1z1), 3);

    return newEC(b.curve, x3, y3, z3);
}

// Simple NAF (Non-Adjacent Form) multiplication algorithm
function mulEC(a, k) {
    if (isInfinity(a)) return a;
    if (sig(k) === 0) return getInfinity(a);

    var e = k;
    var h = mul(e, THREE);

    var neg = negEC(a);
    var R = a;

    var i;
    for (i = bitLength(h) - 2; i > 0; --i) {
        R = twiceEC(R);

        var hBit = testBit(h, i);
        var eBit = testBit(e, i);

        if (hBit !== eBit) {
            R = addEC(R, hBit ? a : neg);
        }
    }

    return R;
}

function mul2AndAddEC(a, k) {
    var nbits = bitLength(k);
    var R = a,
        Q = getInfinity(a);

    for (var i = 0; i < nbits - 1; i++) {
        if (testBit(k, i) === 1) Q = addEC(Q, R);

        R = twiceEC(R);
    }

    if (testBit(k, nbits - 1) === 1) Q = addEC(Q, R);

    return Q;
}

// Compute a*j + x*k (simultaneous multiplication)
function mulTwoEC(a, j, x, k) {
    var i;
    if (bitLength(j) > bitLength(k)) i = bitLength(j) - 1;else i = bitLength(k) - 1;

    var R = getInfinity(a);
    var both = addEC(a, x);
    while (i >= 0) {
        R = twiceEC(R);
        if (testBit(j, i)) {
            if (testBit(k, i)) {
                R = addEC(R, both);
            } else {
                R = addEC(R, a);
            }
        } else {
            if (testBit(k, i)) {
                R = addEC(R, x);
            }
        }
        --i;
    }

    return R;
}

// EC Curve
function newCurve(q, a, b) {
    var curve = {};
    curve.q = q;
    curve.r = new Barrett(q);
    curve.a = newFE(curve, a);
    curve.b = newFE(curve, b);
    curve.infinity = newEC(curve);
    return curve;
} // </editor-fold>

/*
 * Converion tools (hex, binary)
 *
 */ // <editor-fold defaultstate="collapsed">

function atobi(d) {
    var k = 8;
    var a = new Uint8Array(d);
    var r = nbi(a.length * 8 / DB);
    r.t = 0;
    r.s = 0;
    var sh = 0;
    for (var i = 0, n = a.length; i < n; i++) {
        var x = a[i];
        if (sh === 0) r[r.t++] = x;else if (sh + k > DB) {
            r[r.t - 1] |= (x & (1 << DB - sh) - 1) << sh;
            r[r.t++] = x >> DB - sh;
        } else r[r.t - 1] |= x << sh;
        sh += k;
        if (sh >= DB) sh -= DB;
    }
    return clamp(r);
}

function bitoa(s, bitLength) {
    var k = 8;
    var km = (1 << k) - 1,
        d,
        m = false,
        r = [],
        i = s.t;
    var p = DB - i * DB % k;
    if (i-- > 0) {
        if (p < DB && (d = s[i] >> p) > 0) {
            m = true;
            r.push(d);
        }
        while (i >= 0) {
            if (p < k) {
                d = (s[i] & (1 << p) - 1) << k - p;
                d |= s[--i] >> (p += DB - k);
            } else {
                d = s[i] >> (p -= k) & km;
                if (p <= 0) {
                    p += DB;
                    --i;
                }
            }
            if (d > 0) m = true;
            if (m) r.push(d);
        }
    }
    var r8 = new Uint8Array(bitLength ? bitLength / 8 : r.length);
    if (m) r8.set(r.reverse());
    return r8.buffer;
}

function htobi(s) {
    if (typeof s === 'number' || s instanceof Number) return nbv(s);
    s = s.replace(/[^\-A-Fa-f0-9]/g, '');
    if (!s) s = '0';
    var k = 4;
    var r = nbi(s.length / 7);
    var i = s.length,
        mi = false,
        sh = 0;
    while (--i >= 0) {
        var c = s.charAt(i);
        if (c === '-') {
            mi = true;
            continue;
        }
        var x = parseInt(s.charAt(i), 16);
        mi = false;
        if (sh === 0) r[r.t++] = x;else if (sh + k > DB) {
            r[r.t - 1] |= (x & (1 << DB - sh) - 1) << sh;
            r[r.t++] = x >> DB - sh;
        } else r[r.t - 1] |= x << sh;
        sh += k;
        if (sh >= DB) sh -= DB;
    }
    if (mi) subTo(ZERO, r, r);
    return clamp(r);
}

function bitoh(x) {
    if (x.s < 0) return "-" + bitoh(negTo(x, nbi(x.t)));
    var k = 4;
    var km = (1 << k) - 1,
        d,
        m = false,
        r = "",
        i = x.t;
    var p = DB - i * DB % k;
    if (i-- > 0) {
        if (p < DB && (d = x[i] >> p) > 0) {
            m = true;
            r = d.toString(16);
        }
        while (i >= 0) {
            if (p < k) {
                d = (x[i] & (1 << p) - 1) << k - p;
                d |= x[--i] >> (p += DB - k);
            } else {
                d = x[i] >> (p -= k) & km;
                if (p <= 0) {
                    p += DB;
                    --i;
                }
            }
            if (d > 0) m = true;
            if (m) r += d.toString(16);
        }
    }
    return "0x" + (m ? r : "0");
}

// biginteger to big-endian integer bytearray
function bitoi(s) {
    var i = s.t,
        r = [];
    r[0] = s.s;
    var p = DB - i * DB % 8,
        d,
        k = 0;
    if (i-- > 0) {
        if (p < DB && (d = s[i] >> p) !== (s.s & DM) >> p) r[k++] = d | s.s << DB - p;
        while (i >= 0) {
            if (p < 8) {
                d = (s[i] & (1 << p) - 1) << 8 - p;
                d |= s[--i] >> (p += DB - 8);
            } else {
                d = s[i] >> (p -= 8) & 0xff;
                if (p <= 0) {
                    p += DB;
                    --i;
                }
            }
            if ((d & 0x80) !== 0) d |= -256;
            if (k === 0 && (s.s & 0x80) !== (d & 0x80)) ++k;
            if (k > 0 || d !== s.s) r[k++] = d;
        }
    }
    return new Uint8Array(r).buffer;
}

// big-endian integer bytearray to biginteger
function itobi(d) {
    var k = 8,
        s = new Uint8Array(d),
        r = nbi(s.length / 7);
    r.t = 0;
    r.s = 0;
    var i = s.length,
        sh = 0;
    while (--i >= 0) {
        var x = s[i] & 0xff;
        if (sh === 0) r[r.t++] = x;else if (sh + k > DB) {
            r[r.t - 1] |= (x & (1 << DB - sh) - 1) << sh;
            r[r.t++] = x >> DB - sh;
        } else r[r.t - 1] |= x << sh;
        sh += k;
        if (sh >= DB) sh -= DB;
    }
    if ((s[0] & 0x80) !== 0) {
        r.s = -1;
        if (sh > 0) r[r.t - 1] |= (1 << DB - sh) - 1 << sh;
    }
    return clamp(r);
}

// Swap bytes in buffer
function swap(s) {
    var src = new Uint8Array(s),
        dst = new Uint8Array(src.length);
    for (var i = 0, n = src.length; i < n; i++) {
        dst[n - i - 1] = src[i];
    }return dst.buffer;
}

// Calculate hash of data
function hash(d) {
    if (this.hash) d = this.hash.digest(d);
    // Swap hash for SignalCom
    if (this.procreator === 'SC' || this.procreator === 'VN' && this.hash.version === 2012) d = swap(d);
    return d;
}

// Check buffer
function buffer(d) {
    if (d instanceof CryptoOperationData) return d;else if (d && d.buffer && d.buffer instanceof CryptoOperationData) return d.byteOffset === 0 && d.byteLength === d.buffer.byteLength ? d.buffer : new Uint8Array(new Uint8Array(d, d.byteOffset, d.byteLength)).buffer;else throw new _errors.DataError('CryptoOperationData or CryptoOperationDataView required');
}

// Check double buffer
function to2(d) {
    var b = buffer(d);
    if (b.byteLength % 2 > 0) throw new _errors.DataError('Buffer length must be even');
    var n = b.byteLength / 2;
    return [atobi(new Uint8Array(b, 0, n)), atobi(new Uint8Array(b, n, n))];
}

function from2(x, y, bitLength) {
    var a = bitoa(x, bitLength),
        b = bitoa(y, bitLength),
        d = new Uint8Array(a.byteLength + b.byteLength);
    d.set(new Uint8Array(a));
    d.set(new Uint8Array(b), a.byteLength);
    return d.buffer;
}

// </editor-fold>

/**
 * Algorithm name GOST R 34.10<br><br>
 *
 * The sign method returns sign data generated with the supplied privateKey.<br>
 *
 * @memberOf GostSign
 * @method sign
 * @instance
 * @param {(CryptoOperationData|TypedArray)} privateKey Private key
 * @param {(CryptoOperationData|TypedArray)} data Data
 * @returns {CryptoOperationData} Signature
 */
function sign(privateKey, data) // <editor-fold defaultstate="collapsed">
{

    // Stage 1
    var b = buffer(data);
    var alpha = atobi(hash.call(this, b));

    var q = this.q;
    var x = mod(atobi(buffer(privateKey)), q);

    // Stage 2
    var e = mod(alpha, q);
    if (isZero(e)) e = ONE;

    var s = ZERO;
    while (isZero(s)) {
        var r = ZERO;
        while (isZero(r)) {

            // Stage 3
            var k = mod(atobi(this.ukm || (0, _seeds.getSeed)(this.bitLength)), q); // pseudo random 0 < k < q
            // Stage 4
            if (this.curve) {
                // Gost R 34.10-2001 || Gost R 34.10-2012
                var P = this.P;
                var C = mulEC(P, k);
                r = mod(getX(C), q);
            } else {
                // Gost R 34.10-94
                var p = this.p,
                    a = this.a;
                r = mod(expMod(a, k, p), q);
            }
        }
        // Stage 5
        s = mod(add(mul(r, x), mul(k, e)), q);
    }
    // Stage 6
    // console.log('s', bitoh(s));
    // console.log('r', bitoh(r));
    var zetta;
    // Integer structure for SignalCom algorithm
    if (this.procreator === 'SC') {
        zetta = {
            r: bitoh(r),
            s: bitoh(s)
        };
    } else {
        zetta = from2(r, s, this.bitLength);
        // Swap bytes for CryptoPro algorithm
        if (this.procreator === 'CP' || this.procreator === 'VN') zetta = swap(zetta);
    }
    return zetta;
} // </editor-fold>

/**
 * Algorithm name GOST R 34.10<br><br>
 *
 * The verify method returns signature verification for the supplied publicKey.<br>
 *
 * @memberOf GostSign
 * @method sign
 * @instance
 * @param {(CryptoOperationData|TypedArray)} publicKey Public key
 * @param {(CryptoOperationData|TypedArray)} signature Signature
 * @param {(CryptoOperationData|TypedArray)} data Data
 * @returns {boolean} Signature verified = true
 */
function verify(publicKey, signature, data) // <editor-fold defaultstate="collapsed">
{

    // Stage 1
    var q = this.q;
    var r, s;
    // Ready int for SignalCom algorithm
    if (this.procreator === 'SC') {
        r = htobi(signature.r);
        s = htobi(signature.s);
    } else {
        if (this.procreator === 'CP' || this.procreator === 'VN') signature = swap(signature);
        var zetta = to2(signature);
        // Swap bytes for CryptoPro algorithm
        s = zetta[1]; //  first 32 octets contain the big-endian representation of s
        r = zetta[0]; //  and second 32 octets contain the big-endian representation of r
    }
    if (compare(r, q) >= 0 || compare(s, q) >= 0) return false;
    // Stage 2
    var b = buffer(data);
    var alpha = atobi(hash.call(this, b));
    // Stage 3
    var e = mod(alpha, q);
    if (isZero(e) === 0) e = ONE;
    // Stage 4
    var v = invMod(e, q);
    // Stage 5
    var z1 = mod(mul(s, v), q);
    var z2 = sub(q, mod(mul(r, v), q));
    // Stage 6
    if (this.curve) {
        // Gost R 34.10-2001 || Gost R 34.10-2012
        var k2 = to2(publicKey),
            curve = this.curve,
            P = this.P,
            x = newFE(curve, k2[0]),
            // first 32 octets contain the little-endian representation of x
        y = newFE(curve, k2[1]),
            // and second 32 octets contain the little-endian representation of y.
        Q = new newEC(curve, x, y); // This corresponds to the binary representation of (<y>256||<x>256)
        var C = mulTwoEC(P, z1, Q, z2);
        var R = mod(getX(C), q);
    } else {
        // Gost R 34.10-94
        var p = this.p,
            a = this.a;
        var y = atobi(publicKey);
        var R = mod(mod(mul(expMod(a, z1, p), expMod(y, z2, p)), p), q);
    }
    // Stage 7
    return compare(R, r) === 0;
} // </editor-fold>

/**
 * Algorithm name GOST R 34.10<br><br>
 *
 * The generateKey method returns a new generated key pair using the specified
 * AlgorithmIdentifier.
 *
 * @memberOf GostSign
 * @method generateKey
 * @instance
 * @returns {Object} Object with two CryptoOperationData members: privateKey and publicKey
 */
function generateKey() // <editor-fold defaultstate="collapsed">
{
    var curve = this.curve;
    if (curve) {

        var Q = curve.infinity;
        while (isInfinity(Q)) {

            // Generate random private key
            var d = ZERO;
            if (this.ukm) {
                d = atobi(this.ukm);
            } else {
                while (isZero(d)) {
                    d = mod(atobi((0, _seeds.getSeed)(this.bitLength)), this.q);
                } // 0 < d < q
            }

            // Calculate public key
            Q = mulEC(this.P, d);
            var x = getX(Q),
                y = getY(Q);
            // console.log('d', bitoh(d));
            // console.log('x', bitoh(x));
            // console.log('y', bitoh(y));
        }

        // Return result
        return {
            privateKey: bitoa(d, this.bitLength),
            publicKey: from2(x, y, this.bitLength) // This corresponds to the binary representation of (<y>256||<x>256)
        };
    } else throw new _errors.NotSupportedError('Key generation for GOST R 34.10-94 not supported');
} // </editor-fold>

/**
 * Algorithm name GOST R 34.10 mode MASK<br><br>
 *
 * The generateMaskKey method returns a new generated key mask using for wrapping.
 *
 * @memberOf GostSign
 * @method generateMaskKey
 * @instance
 * @returns {Object} Object with two CryptoOperationData members: privateKey and publicKey
 */
function generateMaskKey() // <editor-fold defaultstate="collapsed">
{
    var curve = this.curve;
    if (curve) {
        // Generate random private key
        var d = ZERO;
        while (isZero(d)) {
            d = mod(atobi((0, _seeds.getSeed)(this.bitLength)), this.q);
        } // 0 < d < q

        // Return result
        return bitoa(d, this.bitLength);
    } else throw new _errors.NotSupportedError('Key generation for GOST R 34.10-94 not supported');
} // </editor-fold>

/**
 * Algorithm name GOST R 34.10<br><br>
 *
 * Unwrap private key from private key and ukm (mask)
 *
 * @memberOf GostSign
 * @method unwrap
 * @instance
 * @param {(CryptoOperationData|TypedArray)} baseKey Unwrapping key
 * @param {(CryptoOperationData|TypedArray)} data Wrapped key
 * @returns {Object} CryptoOperationData unwrapped privateKey
 */
function unwrapKey(baseKey, data) // <editor-fold defaultstate="collapsed">
{
    var curve = this.curve;
    if (curve) {
        var q = this.q;
        var x = mod(atobi(buffer(data)), q);
        var y = mod(atobi(buffer(baseKey)), q);
        var z = this.procreator === 'VN' ? mod(mul(x, y), q) : mod(mul(x, invMod(y, q)), q);
        return bitoa(z);
    } else throw new _errors.NotSupportedError('Key wrapping GOST R 34.10-94 not supported');
} // </editor-fold>

/**
 * Algorithm name GOST R 34.10<br><br>
 *
 * Wrap private key with private key and ukm (mask)
 *
 * @memberOf GostSign
 * @method unwrap
 * @instance
 * @param {(CryptoOperationData|TypedArray)} baseKey Wrapping key
 * @param {(CryptoOperationData|TypedArray)} data Key
 * @returns {Object} CryptoOperationData unwrapped privateKey
 */
function wrapKey(baseKey, data) // <editor-fold defaultstate="collapsed">
{
    var curve = this.curve;
    if (curve) {
        var q = this.q;
        var x = mod(atobi(buffer(data)), q);
        var y = mod(atobi(buffer(baseKey)), q);
        var z = this.procreator === 'VN' ? mod(mul(x, invMod(y, q)), q) : mod(mul(x, y), q);
        return bitoa(z);
    } else throw new _errors.NotSupportedError('Key wrapping GOST R 34.10-94 not supported');
} // </editor-fold>

/**
 * Algorithm name GOST R 34.10<br><br>
 *
 * @memberOf GostSign
 * @method derive
 * @instance
 * @private
 * @param {CryptoOperationData} baseKey Key for deriviation
 * @returns {CryptoOperationData}
 */
function derive(baseKey) // <editor-fold defaultstate="collapsed">
{

    var k,
        ukm = atobi(this.ukm);
    var q = this.q;
    var x = mod(atobi(buffer(baseKey)), q);

    if (this.curve) {
        // 1) Let K(x,y,UKM) = ((UKM*x)(mod q)) . (y.P) (512 bit), where
        // x - sender’s private key (256 bit)
        // x.P - sender’s public key (512 bit)
        // y - recipient’s private key (256 bit)
        // y.P - recipient’s public key (512 bit)
        // UKM - non-zero integer, produced as in step 2 p. 6.1 [GOSTR341001]
        // P - base point on the elliptic curve (two 256-bit coordinates)
        // UKM*x - x multiplied by UKM as integers
        // x.P - a multiple point
        var K = mulEC(this.peer_Q, mod(mul(ukm, x), q));
        k = from2(getX(K), getY(K), // This corresponds to the binary representation of (<y>256||<x>256)
        this.bitLength);
    } else {
        // 1) Let K(x,y) = a^(x*y) (mod p), where
        // x - sender’s private key, a^x - sender’s public key
        // y - recipient’s private key, a^y - recipient’s public key
        // a, p - parameters
        var p = this.p,
            a = this.a;
        k = bitoa(expMod(this.peer_y, x, p));
    }
    // 2) Calculate a 256-bit hash of K(x,y,UKM):
    // KEK(x,y,UKM) = gostSign (K(x,y,UKM)
    return hash.call(this, k);
} // </editor-fold>

/**
 * Algorithm name GOST R 34.10<br><br>
 *
 * The deriveBits method returns length bits on baseKey.
 *
 * @memberOf GostSign
 * @method deriveBits
 * @instance
 * @param {(CryptoOperationData|TypedArray)} baseKey Key for deriviation
 * @param {number} length output bit-length
 * @returns {CryptoOperationData} result
 */
function deriveBits(baseKey, length) // <editor-fold defaultstate="collapsed">
{
    if (length < 8 || length > this.bitLength || length % 8 > 0) throw new _errors.DataError('Length must be no more than ' + this.bitLength + ' bits and multiple of 8');
    var n = length / 8,
        b = derive.call(this, baseKey),
        r = new Uint8Array(n);

    r.set(new Uint8Array(b, 0, n));
    return r.buffer;
} // </editor-fold>

/**
 * Algorithm name GOST R 34.10<br><br>
 *
 * The deriveKey method returns 256 bit Key encryption key on baseKey.
 *
 * This algorithm creates a key encryption key (KEK) using 64 bit UKM,
 * the sender’s private key, and the recipient’s public key (or the
 * reverse of the latter pair
 *
 * @memberOf GostSign
 * @method deriveKey
 * @instance
 * @param {(CryptoOperationData|TypedArray)} baseKey Key for deriviation
 * @returns {CryptoOperationData} result
 */
function deriveKey(baseKey) // <editor-fold defaultstate="collapsed">
{
    var b = derive.call(this, baseKey),
        r = new Uint8Array(32);

    r.set(new Uint8Array(b, 0, 32));
    return r.buffer;
} // </editor-fold>


/**
 * Gost R 34.10 universal object<br><br>
 *
 * References: {@link http://tools.ietf.org/html/rfc6986} and {@link http://tools.ietf.org/html/rfc5831}<br><br>
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
 * @class GostSign
 * @param {AlgorithmIndentifier} algorithm
 */
function GostSign(algorithm) // <editor-fold defaultstate="collapsed">
{
    algorithm = algorithm || {};
    this.name = (algorithm.name || 'GOST R 34.10') + '-' + (algorithm.version || 2012) % 100 + '-' + (algorithm.length || 256) + ((algorithm.mode || 'SIGN') !== 'SIGN' ? '-' + algorithm.mode : '') + (typeof algorithm.namedParam === 'string' ? '/' + algorithm.namedParam : '') + (typeof algorithm.namedCurve === 'string' ? '/' + algorithm.namedCurve : '') + (typeof algorithm.sBox === 'string' ? '/' + algorithm.sBox : '');

    var version = algorithm.version || 2012;

    // Functions
    switch (algorithm.mode || 'SIGN') {
        case 'SIGN':
            this.sign = sign;
            this.verify = verify;
            this.generateKey = generateKey;
            break;
        case 'DH':
            this.deriveBits = deriveBits;
            this.deriveKey = deriveKey;
            this.generateKey = generateKey;
            break;
        case 'MASK':
            this.wrapKey = wrapKey;
            this.unwrapKey = unwrapKey;
            this.generateKey = generateMaskKey;
            break;
    }

    // Define parameters
    if (version === 1994) {
        // Named or parameters algorithm
        var param = algorithm.param;
        if (!param) param = GostParams[this.namedParam = (algorithm.namedParam || 'S-A').toUpperCase()];
        this.modulusLength = algorithm.modulusLength || param.modulusLength || 1024;
        this.p = htobi(param.p);
        this.q = htobi(param.q);
        this.a = htobi(param.a);
        // Public key for derive
        if (algorithm['public']) this.peer_y = atobi(algorithm['public']);
    } else {
        // Named or parameters algorithm
        var param = algorithm.curve;
        if (!param) param = ECGostParams[this.namedCurve = (algorithm.namedCurve || 'S-256-A').toUpperCase()];
        var curve = this.curve = newCurve(htobi(param.p), htobi(param.a), htobi(param.b));
        this.P = newEC(curve, newFE(curve, htobi(param.x)), newFE(curve, htobi(param.y)));
        this.q = htobi(param.q);
        // Public key for derive
        if (algorithm['public']) {
            var k2 = to2(algorithm['public']);
            this.peer_Q = new newEC(this.curve, // This corresponds to the binary representation of (<y>256||<x>256)
            newFE(this.curve, k2[0]), // first 32 octets contain the little-endian representation of x
            newFE(this.curve, k2[1])); // and second 32 octets contain the little-endian representation of y.
        }
    }

    // Check bit length
    var hashLen, keyLen;
    if (this.curve) {
        keyLen = algorithm.length || bitLength(this.q);
        if (keyLen > 508 && keyLen <= 512) keyLen = 512;else if (keyLen > 254 && keyLen <= 256) keyLen = 256;else throw new _errors.NotSupportedError('Support keys only 256 or 512 bits length');
        hashLen = keyLen;
    } else {
        keyLen = algorithm.modulusLength || bitLength(this.p);
        if (keyLen > 1016 && keyLen <= 1024) keyLen = 1024;else if (keyLen > 508 && keyLen <= 512) keyLen = 512;else throw new _errors.NotSupportedError('Support keys only 512 or 1024 bits length');
        hashLen = 256;
    }
    this.bitLength = hashLen;
    this.keyLength = keyLen;

    // Algorithm proceator for result conversion
    this.procreator = algorithm.procreator;

    // Hash function definition
    var hash = algorithm.hash;
    if (hash) {
        if (typeof hash === 'string' || hash instanceof String) hash = { name: hash };
        if (algorithm.version === 1994 || algorithm.version === 2001) {
            hash.version = 1994;
            hash.length = 256;
            hash.sBox = algorithm.sBox || hash.sBox;
        } else {
            hash.version = 2012;
            hash.length = hashLen;
        }
        hash.procreator = hash.procreator || algorithm.procreator;

        this.hash = new _gostDigest.GostDigest(hash);
    }

    // Pregenerated seed for key exchange algorithms
    if (algorithm.ukm) // Now don't check size
        this.ukm = algorithm.ukm;
} // </editor-fold>

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    // GOST R 34.10 tests
    var tests = 0,
        i = 0;
    println('GOST R 34.10-94 TEST', true);

    tests += perform(++i, {
        name: 'GOST R 34.10',
        version: 1994,
        namedParam: 'S-TEST',
        ukm: '90F3A564439242F5186EBB224C8E223811B7105C64E4F5390807E6362DF4C72A'
    }, '3534454132454236443134453437313943363345374143423445413631454230', '3036314538303830343630454235324435324234314132373832433138443046', 'ee1902a40692d273edc1b5adc55f91128e35f9d165fa9901caf00d27018ba6df324519c11a6e272526589cd6e6a2eddaafe1c3081259be9fcee667a2701f4352', '3F0DD5D4400D47C08E4CE505FF7434B6DBF729592E37C74856DAB85115A609553E5F895E276D81D2D52C0763270A458157B784C57ABDBD807BC44FD43A32AC06');

    println();
    println('TOTAL ' + (tests ? tests + ' ERRORS' : 'OK'));
    println();

    var tests2 = 0;
    i = 0;
    println('GOST R 34.10-2012 TEST', true);

    tests2 += perform(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'S-256-TEST',
        ukm: '77105C9B20BCD3122823C8CF6FCC7B956DE33814E95B7FE64FED924594DCEAB3'
    }, '2DFBC1B372D89A1188C09C52E0EEC61FCE52032AB1022E8E67ECE6672B043EE5', '7A929ADE789BB9BE10ED359DD39A72C11B60961F49397EEE1D19CE9891EC3B28', '26F1B489D6701DD185C8413A977B3CBBAF64D1C593D26627DFFB101A87FF77DA7F2B49E270DB6D90D8595BEC458B50C58585BA1D4E9B788F6689DBD8E56FD80B', '01456C64BA4642A1653C235A98A60249BCD6D3F746B631DF928014F6C5BF9C4041AA28D2F1AB148280CD9ED56FEDA41974053554A42767B83AD043FD39DC0493');

    tests2 += perform(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'T-512-TEST',
        ukm: '359E7F4B1410FEACC570456C6801496946312120B39D019D455986E364F365886748ED7A44B3E794434006011842286212273A6D14CF70EA3AF71BB1AE679F1'
    }, '3754F3CFACC9E0615C4F4A7C4D8DAB531B09B6F9C170C533A71D147035B0C5917184EE536593F4414339976C647C5D5A407ADEDB1D560C4FC6777D2972075B8C', 'BA6048AADAE241BA40936D47756D7C93091A0E8514669700EE7508E508B102072E8123B2200A0563322DAD2827E2714A2636B7BFD18AADFC62967821FA18DD4', '37C7C90CD40B0F5621DC3AC1B751CFA0E2634FA0503B3D52639F5D7FB72AFD61EA199441D943FFE7F0C70A2759A3CDB84C114E1F9339FDF27F35ECA93677BEEC115DC5BC96760C7B48598D8AB9E740D4C4A85A65BE33C1815B5C320C854621DD5A515856D13314AF69BC5B924C8B4DDFF75C45415C1D9DD9DD33612CD530EFE1', '1081B394696FFE8E6585E7A9362D26B6325F56778AADBC081C0BFBE933D52FF5823CE288E8C4F362526080DF7F70CE406A6EEB1F56919CB92A9853BDE73E5B4A2F86FA60A081091A23DD795E1E3C689EE512A3C82EE0DCC2643C78EEA8FCACD35492558486B20F1C9EC197C90699850260C93BCBCD9C5C3317E19344E173AE36');

    // Free random generator
    tests2 += perform(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'S-256-TEST'
    }, '2DFBC1B372D89A1188C09C52E0EEC61FCE52032AB1022E8E67ECE6672B043EE5', '7A929ADE789BB9BE10ED359DD39A72C11B60961F49397EEE1D19CE9891EC3B28', '26F1B489D6701DD185C8413A977B3CBBAF64D1C593D26627DFFB101A87FF77DA7F2B49E270DB6D90D8595BEC458B50C58585BA1D4E9B788F6689DBD8E56FD80B');

    // Free key & random generator
    tests2 += perform(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'S-256-TEST'
    }, '2DFBC1B372D89A1188C09C52E0EEC61FCE52032AB1022E8E67ECE6672B043EE5');

    // GostDigest-94-with-Gost-3410-2001
    tests2 += perform(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'S-256-TEST',
        hash: {
            name: 'GOST R 34.11',
            version: 1994
        }
    }, gostCoding.Chars.decode('Suppose the original message has length = 50 bytes'));

    // GostDigest-2012-with-Gost-3410-2012
    tests2 += perform(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'T-512-TEST',
        hash: {
            name: 'GOST R 34.11'
        }
    }, gostCoding.Chars.decode('Се ветри, Стрибожи внуци, веютъ с моря стрелами на храбрыя плъкы Игоревы'));

    // Derive key
    println();
    println('Key exchange scenario');
    performDerive(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'S-256-TEST',
        mode: 'DH',
        ukm: '77105C9B20BCD312'
    });
    performDerive(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'X-256-A',
        mode: 'DH',
        ukm: '77105C9B20BCD312',
        hash: {
            name: 'GOST R 34.11'
        }
    });
    performDerive(++i, {
        name: 'GOST R 34.10',
        namedCurve: 'X-256-A',
        mode: 'DH',
        ukm: '77105C9B20BCD312',
        hash: {
            name: 'GOST R 34.11',
            version: 1994
        }
    });

    println();

    println('TOTAL ' + (tests2 ? tests2 + ' ERRORS' : 'OK'));
    println();

    return tests + tests2;
};

var _gostCoding = __webpack_require__(2);

var _gostSign = __webpack_require__(9);

/**
 * Copyright (c) 2014, Rudolf Nickolaev.
 * All rights reserved.
 *
 * Tests for GOST 34.12 signature.
 *
 */

var gostCoding = new _gostCoding.GostCoding();

/* ========== Tests ========== */

function println(s, h) {
    if (typeof importScripts !== 'undefined') {
        var tag = h ? 'h3' : 'span';
        if (typeof postMessage !== 'undefined') {
            postMessage({ log: '<' + tag + '>' + (s || '&nbsp') + '</' + tag + '>' });
        } else {
            console.log(s, h);
        }
    } else {
        if (typeof document !== 'undefined') {
            var el = document.createElement(h ? 'h3' : 'div');
            el.innerHTML = s || '&nbsp';
            (document.getElementById('output') || document.body).appendChild(el);
        }
        if (typeof console !== 'undefined') console.log((s || '') + (h ? '' : '\n'));
    }
}

function perform(id, algorithm, message, privateKey, publicKey, output) {
    var Hex = gostCoding.Hex;
    if (algorithm.ukm) algorithm.ukm = Hex.decode(algorithm.ukm, true);else output = false;

    var cipher = new _gostSign.GostSign(algorithm);
    var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
    var data = typeof message === 'string' ? Hex.decode(message, true) : message;

    if (!privateKey) {
        var keyPair = cipher.generateKey();
        privateKey = keyPair.privateKey;
        publicKey = keyPair.publicKey;
        output = false;
    } else {
        privateKey = Hex.decode(privateKey, true);
        publicKey = Hex.decode(publicKey, true);
    }

    try {
        var start, signed, verified;
        start = new Date().getTime();
        var out = Hex.encode(cipher.sign(privateKey, data), true);
        var test = 0 + (output && out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== output.toLowerCase());
        if (!test) {
            signed = new Date().getTime();
            test = 0 + !cipher.verify(publicKey, Hex.decode(out, true), data);
            verified = new Date().getTime();
            if (!test) result += 'PASSED Sign ' + (signed - start) / 1000 + ' sec, Verify ' + (verified - signed) / 1000 + ' sec';else result += 'FAILED - Verify return (false)';
        } else result += 'FAILED - Sign expected ' + output.toLowerCase() + " got " + out.toLowerCase();
    } catch (e) {
        result += 'FAILED - Throw error: ' + e.message;
    }

    println(result);
    return test;
}

function performDerive(id, algorithm) {
    var ukm = algorithm.ukm;
    delete algorithm.ukm;
    var cipher = new _gostSign.GostSign(algorithm);
    var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
    var keyPair1 = cipher.generateKey(),
        keyPair2 = cipher.generateKey(),
        privateKey1 = keyPair1.privateKey,
        publicKey1 = keyPair1.publicKey,
        privateKey2 = keyPair2.privateKey,
        publicKey2 = keyPair2.publicKey;

    try {
        if (ukm) algorithm.ukm = gostCoding.Hex.decode(ukm);

        var start = new Date().getTime();
        algorithm.public = publicKey2;
        cipher = new _gostSign.GostSign(algorithm);
        var kek1 = gostCoding.Hex.encode(cipher.deriveKey(privateKey1));
        var finish = new Date().getTime();

        algorithm.public = publicKey1;
        cipher = new _gostSign.GostSign(algorithm);
        var kek2 = gostCoding.Hex.encode(cipher.deriveKey(privateKey2));

        var test = 0 + (kek1 !== kek2);
        if (!test) result += 'PASSED DeriveKey ' + (finish - start) / 1000 + ' sec';else result += 'PASSED DeriveKey - one side got ' + kek1 + ' but other side got ' + kek2;
    } catch (e) {
        result += 'FAILED - Throw error: ' + e.message;
    }
    println(result);
    return test;
}

;

var pk = '34BF9806FD77DF19F2BD0E3085FF53C1E18C3B58A0CD82BDA7466D9CC259FA23';
var maskdb = '5d6f4f794c0f584718252fb2d9ffffe6d2adc4c86616466fe032ed28790e6af6';
var mkdb = '\
2208cd6bc96a009f05175f635bee6cc09c78260b9b7eee1e070d346462e6881b\
bf572f436df5716b1212a9fba3d022db4aed0a18530ae6c62d9bdd206479805c\
e652c17bc9cc07dcdce25cba19276285f6c54dfa940ab55473bde2d8338eaaed\
c59cdd808619f75296db91e016b588c0650686ff6929258a76d5ca7ba91b7fa8\
7f41b2deb535a66b489a5485ac68971e00658836ce358dcda04b358621ebf08c\
e062b671d84a30706495ee2ed7d0f0a6a3e171a9daba04b582c3b7113905053a\
5b9254c7e08bea27cb66e19699db55444f1e1f1b5a3b7db7cbcc04728e225e67\
ab8099dc82b1';
var kek = '7c34bf4e03d0bc120768164f355cf6180b32851e2ad6fc22b386bbea17fa1d5f1789eb95';

//var sign0 = 'EE92016C722C08F2FED0310E7D1C8D4EFD7224F52E53C3499E8A5392A2F41D04575BE6077F8E4008B3C3CCEC2EAC3BEC0AA0AA2AF6EFCB1D3906F2426D0394C2';
//var pubkey =  '51cd2d8d96c67e0cf1ee74319cf89043c5f30ba34b68c8fc2284b5ef9e574eea0783c50ea37a2d3f2e222c038980ab0a182fe38945911e9513dfa6b1e87df63a';

var sign0 = '575BE6077F8E4008B3C3CCEC2EAC3BEC0AA0AA2AF6EFCB1D3906F2426D0394C2EE92016C722C08F2FED0310E7D1C8D4EFD7224F52E53C3499E8A5392A2F41D04';
var pubkey = '0783c50ea37a2d3f2e222c038980ab0a182fe38945911e9513dfa6b1e87df63a51cd2d8d96c67e0cf1ee74319cf89043c5f30ba34b68c8fc2284b5ef9e574eea';

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (performance) {
    // GOST R 34.11-94 tests
    var tests = 0,
        i = 0;
    println('GOST R 34.11-94 TEST', true);

    var cipher = new _gostDigest.GostDigest({ name: 'GOST R 34.11', version: 1994 });

    tests += perform(cipher, ++i, gostCoding.Chars.decode(''), '981e5f3ca30c841487830f84fb433e13ac1101569b9c13584ac483234cd656c0');
    tests += perform(cipher, ++i, gostCoding.Chars.decode('This is message, length=32 bytes'), '2cefc2f7b7bdc514e18ea57fa74ff357e7fa17d652c75f69cb1be7893ede48eb');
    tests += perform(cipher, ++i, gostCoding.Chars.decode('Suppose the original message has length = 50 bytes'), 'c3730c5cbccacf915ac292676f21e8bd4ef75331d9405e5f1a61dc3130a65011');
    tests += perform(cipher, ++i, gostCoding.Chars.decode('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'), '73b70a39497de53a6e08c67b6d4db853540f03e9389299d9b0156ef7e85d0f61');
    println();

    cipher = new _gostDigest.GostDigest({ name: 'GOST R 34.11', version: 1994, sBox: 'D-TEST' });

    tests += perform(cipher, ++i, gostCoding.Chars.decode(''), 'ce85b99cc46752fffee35cab9a7b0278abb4c2d2055cff685af4912c49490f8d');
    tests += perform(cipher, ++i, gostCoding.Chars.decode('This is message, length=32 bytes'), 'b1c466d37519b82e8319819ff32595e047a28cb6f83eff1c6916a815a637fffa');
    tests += perform(cipher, ++i, gostCoding.Chars.decode('Suppose the original message has length = 50 bytes'), '471aba57a60a770d3a76130635c1fbea4ef14de51f78b4ae57dd893b62f55208');
    tests += perform(cipher, ++i, gostCoding.Chars.decode('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'), '95c1af627c356496d80274330b2cff6a10c67b5f597087202f94d06d2338cf8e');
    println();

    println('PBKDF2 tests');
    cipher = new _gostDigest.GostDigest({
        name: 'GOST R 34.11',
        version: 1994,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1
    });
    tests += perform(cipher, ++i, gostCoding.Chars.decode('password'), '7314e7c04fb2e662c543674253f68bd0b73445d07f241bed872882da21662d58', 'deriveKey');
    cipher = new _gostDigest.GostDigest({
        name: 'GOST R 34.11',
        version: 1994,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 2
    });
    tests += perform(cipher, ++i, gostCoding.Chars.decode('password'), '990dfa2bd965639ba48b07b792775df79f2db34fef25f274378872fed7ed1bb3', 'deriveKey');
    cipher = new _gostDigest.GostDigest({
        name: 'GOST R 34.11',
        version: 1994,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1000
    });
    tests += perform(cipher, ++i, gostCoding.Chars.decode('password'), '2b6e0a5cc2103274dd3353fb86e4983c6451f8025a51cd9ddfd33361c6cb572b', 'deriveKey');
    println();

    if (performance) {

        println('PBKDF2 4096 iterations tests');
        cipher = new _gostDigest.GostDigest({
            name: 'GOST R 34.11',
            version: 1994,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('salt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('password'), '1f1829a94bdff5be10d0aeb36af498e7a97467f3b31116a5a7c1afff9deadafe', 'deriveKey');

        cipher = new _gostDigest.GostDigest({
            name: 'GOST R 34.11',
            version: 1994,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('passwordPASSWORDpassword'), '788358c69cb2dbe251a7bb17d5f4241f265a792a35becde8d56f326b49c85047b7638acb4764b1fd', 'deriveBits', 320);

        cipher = new _gostDigest.GostDigest({
            name: 'GOST R 34.11',
            version: 1994,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('sa\0lt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('pass\0word'), '43e06c5590b08c0225242373127edf9c8e9c3291', 'deriveBits', 160);

        println();

        cipher = new _gostDigest.GostDigest({ name: 'GOST R 34.11', version: 1994 });
        println('Million "a" TEST');
        var million_a = new Array(1000001).join('a');
        tests += perform(cipher, ++i, gostCoding.Chars.decode(million_a), '8693287aa62f9478f7cb312ec0866b6c4e4a0f11160441e8f4ffcd2715dd554f');
        println();
    }
    println('TOTAL ' + (tests ? tests + ' ERRORS' : 'OK'));
    println();

    // GOST R 34.11-2012 tests
    var tests2 = 0;
    i = 0;
    println('GOST R 34.11-2012 TEST', true);

    cipher = new _gostDigest.GostDigest();
    tests2 += perform(cipher, ++i, gostCoding.Chars.decode('012345678901234567890123456789012345678901234567890123456789012'), '9d151eefd8590b89daa6ba6cb74af9275dd051026bb149a452fd84e5e57b5500');
    tests2 += perform(cipher, ++i, gostCoding.Chars.decode('Се ветри, Стрибожи внуци, веютъ с моря стрелами на храбрыя плъкы Игоревы'), '9dd2fe4e90409e5da87f53976d7405b0c0cac628fc669a741d50063c557e8f50');
    tests2 += perform(cipher, ++i, new Uint8Array(0), '3f539a213e97c802cc229d474c6aa32a825a360b2a933a949fd925208d9ce1bb');
    tests2 += perform(cipher, ++i, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), 'df1fda9ce83191390537358031db2ecaa6aa54cd0eda241dc107105e13636b95');
    println();

    cipher = new _gostDigest.GostDigest({
        name: 'GOST R 34.11', version: 2012, mode: 'KDF', context: gostCoding.Hex.decode('af21434145656378'),
        label: gostCoding.Hex.decode('26bdb878')
    });
    tests += perform(cipher, ++i, gostCoding.Hex.decode('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), 'a1aa5f7de402d7b3d323f2991c8d4534013137010a83754fd0af6d7cd4922ed9', 'deriveKey');
    cipher = new _gostDigest.GostDigest({
        name: 'GOST R 34.11', version: 2012, mode: 'KDF', context: gostCoding.Hex.decode('af21434145656378'),
        label: gostCoding.Hex.decode('26bdb878')
    });
    tests += perform(cipher, ++i, gostCoding.Hex.decode('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), '22b6837845c6bef65ea71672b265831086d3c76aebe6dae91cad51d83f79d16b074c9330599d7f8d712fca54392f4ddde93751206b3584c8f43f9e6dc51531f9', 'deriveBits', 512);
    println();

    println('HMAC/PBKDF2 tests');
    cipher = new _gostDigest.GostDigest({ name: 'GOST R 34.11', mode: 'HMAC' });
    tests += perform(cipher, ++i, gostCoding.Hex.decode('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), 'a1aa5f7de402d7b3d323f2991c8d4534013137010a83754fd0af6d7cd4922ed9', 'sign', gostCoding.Hex.decode('0126bdb87800af214341456563780100'));
    cipher = new _gostDigest.GostDigest({ name: 'GOST R 34.11', length: 512, mode: 'HMAC' });
    tests += perform(cipher, ++i, gostCoding.Hex.decode('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), 'a59bab22ecae19c65fbde6e5f4e9f5d8549d31f037f9df9b905500e171923a773d5f1530f2ed7e964cb2eedc29e9ad2f3afe93b2814f79f5000ffc0366c251e6', 'sign', gostCoding.Hex.decode('0126bdb87800af214341456563780100'));
    cipher = new _gostDigest.GostDigest({
        name: 'GOST R 34.11',
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1000
    });
    tests += perform(cipher, ++i, gostCoding.Chars.decode('password'), 'c5f66589be62e183038e5dee22ea3d7a32afb314abd9970dc8f66858d1a924f4', 'deriveKey');
    cipher = new _gostDigest.GostDigest({
        name: 'GOST R 34.11',
        length: 512,
        procreator: 'VN',
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1
    });
    tests += perform(cipher, ++i, gostCoding.Chars.decode('password'), 'bcd19a1c423a63e72e47ef0f56566c726745d96ac1a1c127b2edadb45fb45b307aca15999e91f640f4818f68af716e30fd543c52026bbb295d100eb471339f46', 'deriveBits', 512);
    cipher = new _gostDigest.GostDigest({
        name: 'GOST R 34.11',
        length: 512,
        procreator: 'VN',
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 2
    });
    tests += perform(cipher, ++i, gostCoding.Chars.decode('password'), '088fec3b0f1ffaf0615eb267de92907fd4e0bb89d2f5ef9d4111a80e3cbf231af07ba3ce96065395f8f1a7505f9781f97e99a26b8314907dbf3510bc3ca2000c', 'deriveBits', 512);
    println();

    cipher = new _gostDigest.GostDigest({ name: 'GOST R 34.11', length: 512 });

    tests2 += perform(cipher, ++i, gostCoding.Chars.decode('012345678901234567890123456789012345678901234567890123456789012'), '1b54d01a4af5b9d5cc3d86d68d285462b19abc2475222f35c085122be4ba1ffa00ad30f8767b3a82384c6574f024c311e2a481332b08ef7f41797891c1646f48');
    tests2 += perform(cipher, ++i, gostCoding.Chars.decode('Се ветри, Стрибожи внуци, веютъ с моря стрелами на храбрыя плъкы Игоревы'), '1e88e62226bfca6f9994f1f2d51569e0daf8475a3b0fe61a5300eee46d961376035fe83549ada2b8620fcd7c496ce5b33f0cb9dddc2b6460143b03dabac9fb28');
    tests2 += perform(cipher, ++i, new Uint8Array(0), '8e945da209aa869f0455928529bcae4679e9873ab707b55315f56ceb98bef0a7362f715528356ee83cda5f2aac4c6ad2ba3a715c1bcd81cb8e9f90bf4c1c1a8a');
    tests2 += perform(cipher, ++i, new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]), 'b0fd29ac1b0df441769ff3fdb8dc564df67721d6ac06fb28ceffb7bbaa7948c6c014ac999235b58cb26fb60fb112a145d7b4ade9ae566bf2611402c552d20db7');
    println();

    if (performance) {

        println('PBKDF2 4096 iterations tests');
        cipher = new _gostDigest.GostDigest({
            name: 'GOST R 34.11',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('salt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('password'), 'd744dc35ddfe10c7679af205ceb6492fb3680f861db598ee8110b30e3a0f3cb4', 'deriveKey');

        cipher = new _gostDigest.GostDigest({
            name: 'GOST R 34.11',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('passwordPASSWORDpassword'), '8452d34400e6404864f12206a2ac3f932fe7fe55026b1dd8f21a645cf340cbf0cca377e603024e82', 'deriveBits', 320);

        cipher = new _gostDigest.GostDigest({
            name: 'GOST R 34.11',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('sa\0lt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('pass\0word'), '5023f9b3cc41e5aa491ea3e9eb65b6c01ffbeb63', 'deriveBits', 160);

        cipher = new _gostDigest.GostDigest({
            name: 'GOST R 34.11',
            length: 512,
            procreator: 'VN',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('salt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('password'), '596f63971eae970a4eac9c18bff42ec52b936c1ccac6d17caa308afe12d4ff31943180ce02e42956524e991392c4bddeb7077edc1d2abf52eaf72b9e32a8c605', 'deriveBits', 512);

        cipher = new _gostDigest.GostDigest({
            name: 'GOST R 34.11',
            length: 512,
            procreator: 'VN',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('passwordPASSWORDpassword'), 'e457ee6126f07c09be004ba512adc90c611c2b3fa11141c21196dae5a48a50d83ccf163233f014fb6ade71695bf37159e9062443b75dac911fa7a181d24c4ed2a910499d72aba93284c78dbc1acba2789bd8ef50b5052f33ec6e2491f4f74eda05723864', 'deriveBits', 800);

        cipher = new _gostDigest.GostDigest({
            name: 'GOST R 34.11',
            length: 512,
            procreator: 'VN',
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('sa\0lt'),
            iterations: 4096
        });
        tests += perform(cipher, ++i, gostCoding.Chars.decode('pass\0word'), 'eed92e8d76e18d6a632f2da65c9b2859af555c3335ea30095989dea14d9d093114668e329deb034cc1565c3d731de0b5ca11acbdf85ab9eaab15295df05b9805', 'deriveBits', 512);

        println();

        cipher = new _gostDigest.GostDigest();
        println('Million "a" TEST');
        var million_a = gostCoding.Chars.decode(new Array(1000001).join('a'));
        tests += perform(cipher, ++i, million_a, '841af1a0b2f92a800fb1b7e4aabc8e48763153c448a0fc57c90ba830e130f152');
        cipher = new _gostDigest.GostDigest({ name: 'GOST R 34.11', length: '512' });
        tests += perform(cipher, ++i, million_a, 'd396a40b126b1f324465bfa7aa159859ab33fac02dcdd4515ad231206396a266d0102367e4c544ef47d2294064e1a25342d0cd25ae3d904b45abb1425ae41095');
        println();
    }

    println('TOTAL ' + (tests2 ? tests2 + ' ERRORS' : 'OK'));
    println();

    // SHA-1 tests
    var tests3 = 0;
    i = 0;
    println('SHA-1 TEST', true);

    var cipher = new _gostDigest.GostDigest({ name: 'SHA', version: 1 });
    tests3 += perform(cipher, ++i, gostCoding.Chars.decode('abc'), 'a9993e364706816aba3e25717850C26c9cd0d89d');
    tests3 += perform(cipher, ++i, gostCoding.Chars.decode('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'), '84983e441c3bd26ebaae4aa1f95129e5e54670f1');

    tests3 += perform(cipher, ++i, gostCoding.Chars.decode(new Array(11).join('0123456701234567012345670123456701234567012345670123456701234567')), 'dea356a2cddd90c7a7ecedc5ebb563934f460452');

    println();

    println('PBKDF2 tests');
    cipher = new _gostDigest.GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 1
    });
    tests3 += perform(cipher, ++i, gostCoding.Chars.decode('password'), '0c60c80f961f0e71f3a9b524af6012062fe037a6', 'deriveKey');
    cipher = new _gostDigest.GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PBKDF2',
        salt: gostCoding.Chars.decode('salt'),
        iterations: 2
    });
    tests3 += perform(cipher, ++i, gostCoding.Chars.decode('password'), 'ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957', 'deriveKey');
    cipher = new _gostDigest.GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PFXKDF',
        salt: gostCoding.Hex.decode('0A58CF64530D823F'),
        iterations: 1
    });
    tests3 += perform(cipher, ++i, gostCoding.Hex.decode('0073006D006500670000'), '8aaae6297b6cb04642ab5b077851284eb7128f1a2a7fbca3', 'deriveBits', 192);
    cipher = new _gostDigest.GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PFXKDF',
        salt: gostCoding.Hex.decode('0A58CF64530D823F'),
        iterations: 1,
        diversifier: 2
    });
    tests3 += perform(cipher, ++i, gostCoding.Hex.decode('0073006D006500670000'), '79993dfe048d3b76', 'deriveBits', 64);
    cipher = new _gostDigest.GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PFXKDF',
        salt: gostCoding.Hex.decode('3D83C0E4546AC140'),
        iterations: 1,
        diversifier: 3
    });
    tests3 += perform(cipher, ++i, gostCoding.Hex.decode('0073006D006500670000'), '8D967D88F6CAA9D714800AB3D48051D63F73A312', 'deriveBits', 160);
    cipher = new _gostDigest.GostDigest({
        name: 'SHA',
        version: 1,
        mode: 'PFXKDF',
        salt: gostCoding.Hex.decode('05DEC959ACFF72F7'),
        iterations: 1000,
        diversifier: 1
    });
    tests3 += perform(cipher, ++i, gostCoding.Hex.decode('007100750065006500670000'), 'ED2034E36328830FF09DF1E1A07DD357185DAC0D4F9EB3D4', 'deriveBits', 192);
    println();

    if (performance) {
        println('PBKDF2 4096 iterations tests');
        cipher = new _gostDigest.GostDigest({
            name: 'SHA',
            version: 1,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('salt'),
            iterations: 4096
        });
        tests3 += perform(cipher, ++i, gostCoding.Chars.decode('password'), '4b007901b765489abead49d926f721d065a429c1', 'deriveKey');
        cipher = new _gostDigest.GostDigest({
            name: 'SHA',
            version: 1,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('saltSALTsaltSALTsaltSALTsaltSALTsalt'),
            iterations: 4096
        });
        tests3 += perform(cipher, ++i, gostCoding.Chars.decode('passwordPASSWORDpassword'), '3d2eec4fe41c849b80c8d83662c0e44a8b291a964cf2f07038', 'deriveBits', 200);
        cipher = new _gostDigest.GostDigest({
            name: 'SHA',
            version: 1,
            mode: 'PBKDF2',
            salt: gostCoding.Chars.decode('sa\0lt'),
            iterations: 4096
        });
        tests3 += perform(cipher, ++i, gostCoding.Chars.decode('pass\0word'), '56fa6aa75548099dcc37d7f03425e0c3', 'deriveBits', 128);
        println();

        println('Million "a" TEST');
        var million_a = new Array(1000001).join('a');
        tests3 += perform(cipher, ++i, gostCoding.Chars.decode(million_a), '34aa973cd4c4daa4f61eeb2bdbad27316534016f');
        println();
    }

    println('TOTAL ' + (tests3 ? tests3 + ' ERRORS' : 'OK'));
    println();

    return tests + tests2;
};

var _gostCoding = __webpack_require__(2);

var _gostDigest = __webpack_require__(3);

/**
 * Copyright (c) 2014, Rudolf Nickolaev.
 * All rights reserved.
 *
 * Tests for GOST R 34.11-2012 hash function with 512/256 bits digest.
 *
 */

var gostCoding = new _gostCoding.GostCoding();

/* ========== Tests ========== */

function println(s, h) {
    if (typeof importScripts !== 'undefined') {
        var tag = h ? 'h3' : 'div';
        if (typeof postMessage !== 'undefined') {
            postMessage({ log: '<' + tag + '>' + (s || '&nbsp') + '</' + tag + '>' });
        } else {
            console.log(s, h);
        }
    } else {
        if (typeof document !== 'undefined') {
            var el = document.createElement(h ? 'h3' : 'div');
            el.innerHTML = s || '&nbsp';
            (document.getElementById('output') || document.body).appendChild(el);
        }
        if (typeof console !== 'undefined') console.log((s || '') + (h ? '' : '\n'));
    }
}

function perform(cipher, id, array, digest, method, param) {
    var start, finish, out, r, test;

    start = new Date().getTime();
    r = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
    try {
        method = method || 'digest';
        out = gostCoding.Hex.encode(cipher[method](array, param));
        finish = new Date().getTime();
        out = out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase();
        test = 0 + (out !== digest.toLowerCase());
        if (test) r += 'FAILED: Expected ' + digest + " got " + out;else r += 'PASSED ' + (finish - start) / 1000 + ' sec';
    } catch (e) {
        r += 'FAILED - Throw error: ' + e.message;
    }

    println(r);
    return test;
}

;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var input1 = "0000000000000000";
    var output1 = "1b0bbc32cebcab42";
    var input2 = "bc350e71aac5f5c2";
    var output2 = "d35ab653493b49f5";
    var input3 = "bc350e71aa11345709acde";
    var output3 = "8824c124c4fd14301fb1e8";
    var input4 = "000102030405060708090a0b0c0d0e0fff0102030405060708090a0b0c0d0e0f";
    var output4 = "29b7083e0a6d955ca0ec5b04fdb4ea41949f1dd2efdf17baffc1780b031f3934";

    var TestSBox = new Uint8Array([0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF, 0xF, 0xE, 0xD, 0xC, 0xB, 0xA, 0x9, 0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1, 0x0, 0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF, 0xF, 0xE, 0xD, 0xC, 0xB, 0xA, 0x9, 0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1, 0x0, 0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF, 0xF, 0xE, 0xD, 0xC, 0xB, 0xA, 0x9, 0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1, 0x0, 0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF, 0xF, 0xE, 0xD, 0xC, 0xB, 0xA, 0x9, 0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1, 0x0]);

    // Basic chiper mode tests
    var tests = 0,
        i = 0;
    println('GOST 28147-89/GOST R 34.12-2015 TEST', true);

    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', input1, output1);
    tests += perform(++i, { name: 'GOST 28147', block: 'CBC', iv: '1234567890abcdef', sBox: 'D-TEST' }, '00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF', input2, output2);
    tests += perform(++i, { name: 'GOST 28147', block: 'CTR', iv: '1234567890abcdef', sBox: 'D-TEST' }, '0011223344556677889900112233445566778899001122334455667788990011', input3, output3);
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', iv: 'aafd12f659cae634', sBox: 'D-TEST' }, 'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5', input4, output4);

    // Tests with parameters, set S-box.
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', input1, output1); // default parameter S-box set to D-TEST
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', iv: '1234567890abcdef', sBox: 'D-TEST' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'b587f7a0814c911d'); //type S-box
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', iv: '1234567890abcdef', sBox: 'E-TEST' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'e8287f53f991d52b');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', shiftBits: 64, iv: '1234567890abcdef', sBox: 'E-A' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'c41009dba22ebe35');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', iv: '1234567890abcdef', sBox: 'E-B', shiftBits: 8 }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '80d8723fcd3aba28');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: 'E-C' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '739f6f95068499b5');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: 'E-D' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '4663f720f4340f57');
    tests += perform(++i, { name: 'GOST 28147', block: 'CFB', shiftBits: 8, iv: '1234567890abcdef', sBox: 'D-A' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', '5bb0a31d218ed564');
    tests += perform(++i, {
        name: 'GOST 28147',
        block: 'CFB',
        shiftBits: 8,
        iv: '1234567890abcdef',
        sBox: TestSBox
    }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', '0000000000000000', 'c3af96ef788667c5');
    tests += perform(++i, { name: 'GOST 28147', block: 'CTR', iv: '1234567890abcdef', sBox: 'E-A' }, '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', 'bc350e71aa11345709acde', '1bcc2282707c676fb656dc');
    tests += perform(++i, { name: 'GOST 28147', block: 'ECB', sBox: 'E-Z' }, '8182838485868788898a8b8c8d8e8f80d1d2d3d4d5d6d7d8d9dadbdcdddedfd0', '0102030405060708f1f2f3f4f5f6f7f8', 'ce5a5ed7e0577a5fd0cc85ce31635b8b');

    var gkeyBytes5 = "6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49";
    var gkeyBytes6 = "6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49";

    var input5 = "7768617420646f2079612077616e7420666f72206e6f7468696e673f";
    var input6 = "7768617420646f2079612077616e7420666f72206e6f7468696e673f";

    var output5 = "93468a46";
    var output6 = "93468a46";

    // MAC
    println();
    println('MAC sing/verify');
    tests += performMac(++i, { name: 'GOST 28147', mode: 'MAC', sBox: 'E-A' }, gkeyBytes5, input5, output5);
    tests += performMac(++i, { name: 'GOST 28147', mode: 'MAC', sBox: 'E-A' }, gkeyBytes6, input6, output6);

    // Padding
    println();
    println('Padding');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'BIT' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba98765432');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'BIT' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba9876543210');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'PKCS5P' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba98765432');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'PKCS5P' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba9876543210');
    tests += perform(++i, { name: 'GOST 28147', sBox: 'D-TEST', padding: 'ZERO' }, '546d203368656c326973652073736e62206167796967747473656865202c3d73', 'fedcba9876543210');

    // Key meshing
    println();
    println('Key meshing');
    var input = new Array(10001).join('61'); // hex(a)
    tests += perform(++i, {
        name: 'GOST 28147',
        block: 'CFB',
        keyMeshing: 'CP',
        iv: '1234567890abcdef',
        sBox: 'E-A'
    }, '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);
    tests += perform(++i, {
        name: 'GOST 28147',
        block: 'CBC',
        keyMeshing: 'CP',
        iv: '1234567890abcdef',
        sBox: 'E-A'
    }, '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);
    tests += perform(++i, {
        name: 'GOST 28147',
        block: 'CTR',
        keyMeshing: 'CP',
        iv: '1234567890abcdef',
        sBox: 'E-A'
    }, '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);
    tests += performMac(++i, {
        name: 'GOST 28147',
        mode: 'MAC',
        keyMeshing: 'CP',
        iv: '1234567890abcdef',
        sBox: 'E-A'
    }, '4ef72b778f0b0bebeef4f077551cb74a927b470ad7d7f2513454569a247e989d', input);

    println();
    println('Key wrapping');
    var input = new Array(10001).join('61'); // hex(a)
    tests += performWrap(++i, { name: 'GOST 28147', mode: 'KW', ukm: '1234567890abcdef', sBox: 'D-TEST' }, // Initial UKM seed
    'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5', '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49', 'af502015229a831dc82b4d32dc00173f5d43d921e5e09cc09ce947c777414397022a90c7');
    tests += performWrap(++i, { name: 'GOST 28147', mode: 'KW', ukm: '1234567890abcdef', sBox: 'E-A' }, // E-A
    'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5', '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49');

    tests += performWrap(++i, { name: 'GOST 28147', sBox: 'D-TEST', ukm: '1234567890abcdef', keyWrapping: 'CP' }, // CryptoPro.
    'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5', '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49', '16256f060dd3b3d8734a9fcc9ab4c3d04e777dc5c46a2f4c3e411e3597a5bfc32b41e492');

    tests += performWrap(++i, {
        name: 'GOST 28147',
        mode: 'KW',
        keyWrapping: 'CP',
        ukm: '1234567890abcdef',
        sBox: 'E-A'
    }, // CryptoPro E-A
    'aafd12f659cae63489b479e5076ddec2f06cb58faafd12f659cae63489b479e5', '6d145dc993f4019e104280df6fcd8cd8e01e101e4c113d7ec4f469ce6dcd9e49');

    tests += performWrap(++i, { name: 'GOST 28147', mode: 'KW', keyWrapping: 'SC', sBox: 'E-SC' }, '2208cd6bc96a' + '009f05175f635bee6cc09c78260b9b7eee1e070d346462e6881bbf572f436df5' + '716b1212a9fba3d022db4aed0a18530ae6c62d9bdd206479805ce652c17bc9cc' + '07dcdce25cba19276285f6c54dfa940ab55473bde2d8338eaaedc59cdd808619' + 'f75296db91e016b588c0650686ff6929258a76d5ca7ba91b7fa87f41b2deb535' + 'a66b489a5485ac68971e00658836ce358dcda04b358621ebf08ce062b671d84a' + '30706495ee2ed7d0f0a6a3e171a9daba04b582c3b7113905053a5b9254c7e08b' + 'ea27cb66e19699db55444f1e1f1b5a3b7db7cbcc04728e225e67ab8099dc82b1' + // mk.db3
    '5d6f4f794c0f584718252fb2d9ffffe6d2adc4c86616466fe032ed28790e6af6', // masks.db3
    '5a7145b0ee4c080e0fcf689e5222c25876ac9d2b25a68fb3357eea8f849d6272', '7c34bf4e03d0bc120768164f355cf6180b32851e2ad6fc22b386bbea17fa1d5f1789eb95'); // kek.opq

    // Tests for new GOST 2015
    println();
    println('GOST R 34.12-2015/64bits');
    var key64 = 'ffeeddccbbaa99887766554433221100f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff';
    var inp64 = '92def06b3c130a59db54c704f8189d204a98fb2e67a8024c8912409b17b57e41';
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015 }, key64, 'fedcba9876543210', '4ee901e5c2d8ca3d');
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015, block: 'ECB' }, key64, inp64, '2b073f0494f372a0de70e715d3556e4811d8d9e9eacfbc1e7c68260996c67efb');
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015, block: 'CTR', iv: '12345678' }, key64, inp64, '4e98110c97b7b93c3e250d93d6e85d69136d868807b2dbef568eb680ab52a12d');
    tests += perform(++i, {
        name: 'GOST R 34.12',
        version: 2015,
        block: 'CBC',
        iv: '1234567890abcdef234567890abcdef134567890abcdef12'
    }, key64, inp64, '96d1b05eea683919aff76129abb937b95058b4a1c4bc001920b78b1a7cd7e667');
    tests += perform(++i, {
        name: 'GOST R 34.12',
        version: 2015,
        block: 'CFB',
        iv: '1234567890abcdef234567890abcdef1'
    }, key64, inp64, 'db37e0e266903c830d46644c1f9a089c24bdd2035315d38bbcc0321421075505');
    tests += perform(++i, {
        name: 'GOST R 34.12',
        version: 2015,
        block: 'OFB',
        iv: '1234567890abcdef234567890abcdef1'
    }, key64, inp64, 'db37e0e266903c830d46644c1f9a089ca0f83062430e327ec824efb8bd4fdb05');
    tests += performMac(++i, { name: 'GOST R 34.12', version: 2015, mode: 'MAC' }, key64, inp64, '154e7210');

    println();
    println('GOST R 34.12-2015/128bits');
    var key128 = '8899aabbccddeeff0011223344556677fedcba98765432100123456789abcdef';
    var inp128 = '1122334455667700ffeeddccbbaa998800112233445566778899aabbcceeff0a112233445566778899aabbcceeff0a002233445566778899aabbcceeff0a0011';
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015, length: 128 }, key128, '1122334455667700ffeeddccbbaa9988', '7f679d90bebc24305a468d42b9d4edcd');
    tests += perform(++i, { name: 'GOST R 34.12', version: 2015, length: 128 }, key128, inp128, '7f679d90bebc24305a468d42b9d4edcdb429912c6e0032f9285452d76718d08bf0ca33549d247ceef3f5a5313bd4b157d0b09ccde830b9eb3a02c4c5aa8ada98');
    tests += perform(++i, {
        name: 'GOST R 34.12',
        version: 2015,
        length: 128,
        block: 'CTR',
        iv: '1234567890abcef0'
    }, key128, inp128, 'f195d8bec10ed1dbd57b5fa240bda1b885eee733f6a13e5df33ce4b33c45dee4a5eae88be6356ed3d5e877f13564a3a5cb91fab1f20cbab6d1c6d15820bdba73');
    tests += perform(++i, {
        name: 'GOST R 34.12', version: 2015, length: 128, block: 'OFB',
        iv: '1234567890abcef0a1b2c3d4e5f0011223344556677889901213141516171819'
    }, key128, inp128, '81800a59b1842b24ff1f795e897abd95ed5b47a7048cfab48fb521369d9326bf66a257ac3ca0b8b1c80fe7fc10288a13203ebbc066138660a0292243f6903150');
    tests += perform(++i, {
        name: 'GOST R 34.12', version: 2015, length: 128, block: 'CBC',
        iv: '1234567890abcef0a1b2c3d4e5f0011223344556677889901213141516171819'
    }, key128, inp128, '689972d4a085fa4d90e52e3d6d7dcc272826e661b478eca6af1e8e448d5ea5acfe7babf1e91999e85640e8b0f49d90d0167688065a895c631a2d9a1560b63970');
    tests += perform(++i, {
        name: 'GOST R 34.12', version: 2015, length: 128, block: 'CFB',
        iv: '1234567890abcef0a1b2c3d4e5f0011223344556677889901213141516171819'
    }, key128, inp128, '81800a59b1842b24ff1f795e897abd95ed5b47a7048cfab48fb521369d9326bf79f2a8eb5cc68d38842d264e97a238b54ffebecd4e922de6c75bd9dd44fbf4d1');
    tests += performMac(++i, { name: 'GOST R 34.12', version: 2015, length: 128, mode: 'MAC' }, key128, inp128, '336f4d296059fbe3');

    println();
    println('RC2');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 63
    }, '0000000000000000', '0000000000000000', 'ebb773f993278eff');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 64
    }, 'ffffffffffffffff', 'ffffffffffffffff', '278b27e42e2f0d49');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 64
    }, '3000000000000000', '1000000000000001', '30649edf9be7d2c2');
    tests += perform(++i, { name: 'RC2', version: 1, length: 64 }, '88', '0000000000000000', '61a8a244adacccf0');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 64
    }, '88bca90e90875a', '0000000000000000', '6ccf4308974c267f');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 64
    }, '88bca90e90875a7f0f79c384627bafb2', '0000000000000000', '1a807d272bbe5db1');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 128
    }, '88bca90e90875a7f0f79c384627bafb2', '0000000000000000', '2269552ab0f85ca6');
    tests += perform(++i, {
        name: 'RC2',
        version: 1,
        length: 129
    }, '88bca90e90875a7f0f79c384627bafb216f80a6f85920584c42fceb0be255daf1e', '0000000000000000', '5b78d3a43dfff1f1');
    println();

    println('TOTAL ' + (tests ? tests + ' ERRORS' : 'OK'));
    println();

    return tests;
};

var _gostCoding = __webpack_require__(2);

var _gostCipher = __webpack_require__(4);

/**
 * Copyright (c) 2015, Rudolf Nickolaev.
 * All rights reserved.
 *
 * GOST 28147-89 Encryption Algorithm
 *
 */

var gostCoding = new _gostCoding.GostCoding();

function println(s, h) {
    if (typeof importScripts !== 'undefined') {
        var tag = h ? 'h3' : 'div';
        if (typeof postMessage !== 'undefined') {
            postMessage({ log: '<' + tag + '>' + (s || '&nbsp') + '</' + tag + '>' });
        } else {
            console.log(s, h);
        }
    } else {
        if (typeof document !== 'undefined') {
            var el = document.createElement(h ? 'h3' : 'div');
            el.innerHTML = s || '&nbsp';
            (document.getElementById('output') || document.body).appendChild(el);
        }
        if (typeof console !== 'undefined') console.log((s || '') + (h ? '' : '\n'));
    }
}

function perform(id, algorithm, key, input, output) {
    var Hex = gostCoding.Hex;
    if (algorithm.iv) algorithm.iv = Hex.decode(algorithm.iv);

    var cipher = new _gostCipher.GostCipher(algorithm);
    var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
    try {
        var out = Hex.encode(cipher.encrypt(Hex.decode(key), Hex.decode(input)));
        var test = 0 + (output && out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== output.toLowerCase());
        if (!test) {
            var out = Hex.encode(cipher.decrypt(Hex.decode(key), Hex.decode(out)));
            test = 0 + (out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== input.toLowerCase());
            if (!test) result += 'PASSED';else result += 'FAILED - Decrypt expected ' + input + " got " + out;
        } else result += 'FAILED - Encrypt expected ' + output + " got " + out;
    } catch (e) {
        result += 'FAILED - Throw error: ' + e.message;
    }
    println(result);
    return test;
}

function performMac(id, algorithm, key, input, output) {
    var Hex = gostCoding.Hex;
    if (algorithm.iv) algorithm.iv = Hex.decode(algorithm.iv);

    var cipher = new _gostCipher.GostCipher(algorithm);
    var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
    try {
        var out = Hex.encode(cipher.sign(Hex.decode(key), Hex.decode(input)));
        var test = 0 + (output && out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== output.toLowerCase());
        if (!test) {
            var res = cipher.verify(Hex.decode(key), Hex.decode(out), Hex.decode(input));
            test = 0 + !res;
            if (!test) result += 'PASSED';else result += 'FAILED - Verify return (false)';
        } else result += 'FAILED - Sign expected ' + output + " got " + out;
    } catch (e) {
        result += 'FAILED - Throw error: ' + e.message;
    }
    println(result);
    return test;
}

function performWrap(id, algorithm, key, input, output) {
    var Hex = gostCoding.Hex;
    if (algorithm.ukm) algorithm.ukm = Hex.decode(algorithm.ukm);

    var cipher = new _gostCipher.GostCipher(algorithm);
    var result = 'Test ' + ' ' + ('0' + id).slice(-2) + ' ' + (cipher.name + ' ' + new Array(61).join('.')).substring(0, 60) + ' ';
    try {
        var out = Hex.encode(cipher.wrapKey(Hex.decode(key), Hex.decode(input)));
        var test = 0 + (output && out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== output.toLowerCase());
        if (!test) {
            var out = Hex.encode(cipher.unwrapKey(Hex.decode(key), Hex.decode(out)));
            test = 0 + (out.replace(/[^\-A-Fa-f0-9]/g, '').toLowerCase() !== input.toLowerCase());
            if (!test) result += 'PASSED';else result += 'FAILED - Unwrap key expected ' + input + " got " + out;
        } else result += 'FAILED - Wrap key expected ' + output + " got " + out;
    } catch (e) {
        result += 'FAILED - Throw error: ' + e.message;
    }
    println(result);
    return test;
}

/**
 * Test cases
 *
 * @returns {number} of tests
 */
;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gostCipher = __webpack_require__(22);

var _gostCipher2 = _interopRequireDefault(_gostCipher);

var _gostDigest = __webpack_require__(21);

var _gostDigest2 = _interopRequireDefault(_gostDigest);

var _gostSign = __webpack_require__(20);

var _gostSign2 = _interopRequireDefault(_gostSign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Running tests */
(0, _gostCipher2.default)();
(0, _gostDigest2.default)(true);
(0, _gostSign2.default)();

/***/ })
/******/ ]);
});
//# sourceMappingURL=TestNode.js.map