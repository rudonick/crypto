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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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
    }('5vh+XFtxH9Alg3eACST6FshJ4H6FLqSoW0aGoY8GwWoLMumi13tBbqvaN6RngVxm9heWqBpoZnb13AtwY5GVS0hi84235kvx/1ximmi9hcXLgn2m/NdXlWbTba9pufCJNWyfdEg9g7B8vOyxI4yZoTanAqwxxHCNnrao0C+839aLGfpR5bOuN5zPtUCKEn0LvAx4tQggj1rlM+OEIojs7c7Cx9N3wV/S7HgXtlBdD165TMLAgzaHHYwgXbTLCwStdjyFWyigiS9YjRt59v8yVz/s9p5DEZM+D8DTn4A6GMnuAQom9fOtgxDv6PRBGXmmXc2hDH3pOhBKG+4dEkjpLFO/8tshhHM5tPUMz6aiPQlftLyc2EeYzeiKLYsHHFb5f3dxaVp1apzF8C5xoLoevKZj+atCFeZyLrGeIt5fu3gNuc4PJZS6FIJSDmOXZk2ELwMeagII6phcfyFEob5r8Ho3yxzRY2Lbg+COK0sxHGTPcEebq5YOMoVrqYa53ucetUeMh3r1bOm4/kKIX2HW/RvdAVaWYjjIYiFXkj74qS78l/9CEUR2+J19NQhWRSzrTJDJsOCnElYjCFAt+8sBbC16A/qnpkhF' + '9G6LOL/GxKu9vvj91HfeujqsTOvIB5t58JyxBeiHnQwn+moQrIpYy4lg58FAHQzqGm+BHko1aSiQxPsHc9GW/0NQGi9gnQqf96UW4MY/N5Yc5KazuNqSUhMkdSw44IqbpahkczvsFU8r8SRXVUmzP9dm2xVEDcXHp9F5455Ct5La3xUaYZl/04agNF7AJxQjONVRe22pOaRlGPB3EEADtAJ5HZClrqLdiNJniZxKXQqTD2bfCihlwk7p1CBFCbCLMlU4kWaFKSpBKQe/xTOoQrJ+K2JUTcZzbFMERWKV4Ada9AbpU1GQih8vO2vBI2Fvw3sJ3FJV5cY5Z9Ezsf5oRCmIOcfw5xHiQJuH9xlk+aLpOK3D20sHGQwLTkf5w+v0VTTVdtNriENGEKBa64sC2CDDzfWCMvJRbeGEDb7Cseeg6N4GsPodCHuFS1QNNDM7QuKaZ7zKW3/YpgiKxDfdDsY7s6nZQ+2BIXFNvV5lo7FnYe3nte6haSQx98jVc6v21R/GheGjZxpeBjzUBBDJLSg6uY8ssEACj+vAbLLy95AX1k8Rb6HTPOBzWfGpnuSqeE7WjHTNwAZuKhnVxztC2ocStBYccEXD' + 'NxWC5O2TIW2s45BBSTn2/H7F8SGGIjt8wLCUBCusFvv510U3mlJ+v3N8Py6jtoFoM+e42brSeMqpoyo0wi/+u+SBY8z+370NjllAJG6lpnBRxu9LhCrR5CK60GUnnFCM2RSIwhhgjO4xnqVJH3zaF9OU4SgTTJxgCUv0MnLV47Ob9hKlpKrXkcy72kPSb/0PNN4fPJRq0lBPW1RomV7ha9+fr2/qj3eUJkjqWHDdCSu/x+Vtcdl8Z93msv9PIdVJPCdrRjroYAORdntPr4bHH2ihPng11LmgtowRXwMMn9QUHdLJFlggAZg9j33dUySsZKpwP8wXUlTCyYmUjgK0Jj5edtafRsLeUHRvA1h9gARF2z2CknLx5WBYSgKbVgvz+65Ypz/83GKhWl5ObK1M6EupblXOH7jMCPl0eq6CslPBAhRM9/tHG58EKJjz6442BosnrfLv+3rtypf+jApevneOBRP099jPMCwlAcMri/eNkt38F1xVTfhlxX9GBS9f6vMwG6Ky9CSqaLfsu9YNhpmPDzUBBHVMAAAAAAAAAADxLjFNNNDM7HEFIr4GGCO1rygNmTDABcGX/VziXWk8ZRmkHMYzzJoV' + 'lYRBcvjHnrjcVDK3k3aEqZQ2wTokkM9YgCsT8zLI71nEQq45fO1PXPoc2O/jq42C8uWslU0pP9Fq2CPokHobfU0iSfg88EO2A8ud2Hn58z3eLS8nNtgmdCpDpB+JHuLfb5iZnRtsEzrUrUbNPfQ2+rs131AmmCXAlk/cqoE+bYXrQbBTfuWlxAVAunWLFghHpBrkO+e7RK/juMQp0GcXl4GZk7vun765rpqN0eyXVCHzVyzdkX5uMWOT19rir/jOR6IgEjfcUzijI0PeyQPuNXn8VsSompHmAbKASNxXUeASlvVk5Lfbe3X3GINRWXoS222VUr3OLjMenbsjHXQwj1INcpP90yLZ4gpEYQwwRnf+7uLStOrUJcow/e4ggAZ1YerKSkcBWhPnSv4UhyZOMCzIg7J78RmlFmTPWbP2gtyoEap8HnivWx1WJvtkjcOytz6RF99bzjTQX3zwarVvXf0lfwrNEycYV03I5nbFKp4HOaflLriqmlSGVT4PPNmjVv9IrqqSe36+dWUlrY4th30ObPn/28hBOx7MoxRQyplpE74w6YPoQK1REAmVbqccsbW2ui20NU5Eab3KTiWgBRWvUoHKD3Hh' + 'dEWYy40OK/JZP5sxKqhjt++zim4ppPxja2qjoEwtSp09lesO5r8x46KRw5YVVL/VGBacju+by/URXWi8nU4oRrqHXxj6z3Qg0e38uLbiPr2wBzby8eNkroTZKc5libb+cLei9tpPclUOclPXXG1JKQTyOj1XQVmnCoBp6gssEI5J0HPFa7EaEYqrehk55P/XzQlaCw44rO/J+2A2WXn1SJK95pfWfzQix4kz4QUUvGHhwdm5dcm1StImYWDPG82AmkSS7Xj9hnGzzKsqiBqXk3LOv2Z/4dCI1tRbXZhalCfIEagFjD9V3mX1tDGWtQYZ90+WsdZwbkOFnR6Ly0PTNlqrioXM+j2E+ce/mcKV/P2iH9Wh3ktjD82z73Y7i0VtgD9Z+Hz3w4WyfHO+XzGRPJjjrGYzsEghv2FnTCa4+BgP+8mVxMEwyKqghiAQdhqYYFfzQiEBFqr2PHYMBlTMNS3bRcxmfZBCvPRalkvUA4Jo6KDD7zxvPae9ktJp/3O8KQriAgHtIoe33jTN6IWBj9kB7qfdYQWb1vonMhmgNVPVbxrodMzOyeoxJFwug/VUcDRVXaB75JnOJtKsVue+9/0WGFelBU44' + 'ag59pFJ0NtFb2Go4HN6f8sr3dWIxdwwysJqu2eJ5yNBd7xCRxgZ02xEQRqJRXlBFI1Ns5HKYAvzFDLz39bY8+nOhaIfNFx8DfSlBr9nyjb0/Xj60Wk87nYTu/jYbZ3FAPbjj0+cHYnEaOij58g/SSH68fHW0nnYndOXyk8frVlwY3PWeT0eLpAxu9E+prctSxpmBLZjax2B4iwbcbkadDvxl+Op1IexOMKX3IZ6OC1Ur7D9lvKV7a93QSWm68bdemZBM2+OU6lcUsgHR5upA9ruwwIJBKErdUPIEY7+PHf/o1/k7k8usuE2Mto5HfIbowd0bOZImjj98WqESCdYvyy89mKvbNcmuZxNpViv9X/UVweFsNs7igB1+su3485sX2pTTfbAN/gGHe8PsdguK2suEld/hU65EBaJHc7e0ELMShXt4PDKr3463cNBoElE7U2c5udLj5mVYTVficbJkaNeJx4/JhJclqTW7+n0a4QKLFTej36ZBiNDNXZvDeN56Ssgsmk2Az7dCd38bg722IHLSiDodM711XnotS6tqj0H02qtruxyV2ZBc/+f9jTG2g6pkIhGbOB/ArvuEQgIsSaD5CMZjAzrj' + 'pCivCASTiCat5Bw0GopTx65xIe535qhdxH9cSiWSnoy1OOmqVc3YYwY3eqna2OspoYroe7MnmJVu39pqNeSEFGt9nRmCUJSn1Bz6VaTobL/lyu3J6kLFnKNsNRwOb8F5UYHk3m+rv4n/8MUwGE0X1J1B6xWEBFiSHA1SUCjXOWHxeOwYDKiFapoFcQGO+BHNQJGifD7178wZrxUjn2Mp0jR0UO/5HrmQ4RtKB43Sd1m5Vh3l/GATMZEvH1otqZPAFlTctluiGRo+Ld4JimuZ64pm1x4PguP+jFGtt9VaCNdFM+UPiUH/fwLm3We9SFns4Giqul321S/CSCbj/0p1pWw5Bw2IrN34ZIZUjEaRpG/Rvr0mE1x8DLMPkwOPFTNKgtmEn8G/mmmcMguoVCD65PpSgkOv+QdnntTWz+loowi4Jf1YLESxR5t2kbxe3LO7x+phkEj+ZRYQY6YfgXryM0fVOGg0CaaTY8LOmExt7TAqn9/YbIHZHXseOwYDKmaUZmCJ6/vZ/YMKWY7mc3UgewdEmhQK/ElfLKilcbZZMjQfmG+KRbvC+zgapKBQs3LCVCOjrdgfrzoXJzwLi4a7bP6DJY3IabWi' + 'KHkCv9HJgPH1qUvWazg3r4iACnmyyroSVVBDEAg7DUzfNpQOB7nusgTRp85nkLLFYSQT//EltNwm8SuXxSwST4YII1GmLyis75NjL5k35ec1B7BSKTob5ucsMK5XCpxw01hgQa4UJeDeRXSz151MxJK6IoBAxWha8AsMpdyMJxy+Eofx9pxabvOeMX+x4NyGSV0RQCDsNC1pm0B+PxjNS9yjqdRq1RUoDR0U8nmJaSQAAAAAAAAAAFk+t1+hlsYeLk54FgsRa9htSuewWIh/juZf0BOHLj4Gem3bu9MOxOKsl/yJyq7xsQnMszweGdvhifPqxGLuGGR3cM9JqoetxlbFfsplV/bWA5U92m1s+5o2ko2IRFbgfB7rjzeVn2CNMdYXnE6qqSNvrDrX5cAmYkMEn6ZTmRRWq9NmncBSuO6vAsFTp8IKKzzLA243I8AHk8nCPZDhyizDO8ZeL27X00z/VjOXWCSeselOZDJdaqY34W01lHJCCnn45mG+Yj94UhTZBALHRBNILvH98MiWWxP2m8XsFgmpDogpKBTlkr5OGYtUKhB9cszAD8vrr+cbG0nIRCIrcD4lZBZNqEDp1SDGUT4f9Plm' + 'usMgP5EM6Kvy7dHCYcR+8IFMuUWs02Hzlf64lEo5IQVcnPAsFiLWrZcYZfP3cXjpvYe6K5vwofREQAWyWWVdCe11vkgkf7wLdZYSLhfP9Cq0SwkXhel6FZZrhU4nVdqf7uCDkkkTR5EyQypGI8ZSuahGW0etPkN0+LRfJBKxXoskF/bweGRLo/shYv5/3aURS7vMJ52kbcEBc+C90CSidiIgjFmivKCKj8SQbbg2803kuQ10OmZn6nFHteBwX0bvJ4LLKhUIsDnsBl719FsefSG1sYPP0FsQ2+czwGApXHefpzZyOUwBfs9VMhGGwxyB2HIOGg1Fp+07j5l6Pd+JWDr8ecft+ysu6aQZhkPvDs5fCc32e04tN09qa+n6NN8Etq3UcDihI/mNIk0KBX6qocliSLhcG/eo4/2XYDCaLrULKm5bo1GCDetCxOH+p1cilI1YKZodg3N/z5zIZLrUUaVbT7XUtypQCL9Tgc49eZdGptjV5C0E5dIrgPx+MIeWV7aed7VzVKA5aUQdgJfQtDMwyvvz4vDP4o533eC+jMNisS4lnElPRqbOcm+529HKQeJCwe7RTbp2Ay/0eqMPsEWyaKk6zeTM' + 'r38L6IRUnQgEg1SzwUaCY5JUNcLIDv7S7k438n/f+6cWejOSDGDxTfsSO1LqA+WESgyrU/27kAed6vY4D3iKGctI7FWPDLMqtZ3Estb+9+Dc28oi9PPsthHfWBNUmpxA4z/e31aKztOgwcgSQyLpwwela4FY+m0NdyeVebHh893ZsYt0QirABLjsLZ//q8KU9Kz4qC11kU97v2mx7ytoeMT2L69Iesfhds6AnMZ+XQxnEdiPkuTBTGJ7mdkkPe3+I0qlw9+2i1GQmx8VJi2/bU9m6gVLYry1GuLPWlKqaui+oFP70M4BSO1oCMDmYxTJQ/4WzRWoJxDNBJIxoGlw9ue8imyXzEywM3zoNfyzucBl3vJYfMeA81IhTt5BMrtQlfFeQ5D0k9+HCDliXdLg8UExPBr7i2avkXIK8FGyEbxHfUJ+1O6lcy47TO72474lgmJ4NOsLzEOcA+PdeOckyCh3MorZhn35FLUZReJDsPJXSw+I9+uX4oi2+piapJQ6GcTwaMsWhYZQ7mQJrxH6733zF9XATqukelZ8VJi0xqm2u/uAT0IYjjzCK887xc0L0EM26qo5dxPwL6wb7DMTLCUG26fw00iN' + '1+Zda/LDGh5eubIWH/gg9YQuBlDEbg+fcWvrHZ6EMAGpM3WMqzFe1D/kFP2ieSJlJ8nxcB7wCTJzpMHKcKdxvpQYS6bnaz0OQNgp/4wUyH4PvsP6x3Z0yzYWqWNKapVyjxORGcJe+Tf1Re1NWuo/nugCSZZQujh7ZDfnvQtYLiLmVZ+J4FPiYYCtUuMFKI38bcVaI+NLmTXeFOD1GtCtCcY5BXimWYZeltdhcQlIfLHi1ss6IRVgAgHpFeV3n67RrbAhP2p33LeYgLduuaGmq12fjSSGRM+b/V5FNsVmJljxxrn+m6y9/erNY0G+mXnE76ciFwhAVXZRB3Hs2I5UPsK6UctnHwQ9CtSCrHGvWHn+eHoEXNrJNrI4rzOOBJrtvYZsyUly7iZhXabrvYECkDKV/dCLLBcR+DQEYHO/CurzCZMpdY/8QhyusT59z6k0uiMHSBGIgysk785Ch0zmXA5X1h+w6doas9G61vmbNDzAdXsciTxFgitRDbhAOpKXXHaYwfHbYUo+DQEY1eaMtNYPSI6FXLTPrpYeDfPLM9k6jlWrFKAO10IXAyhiN4nBg4tt0ZyUYpKJX+997Ts668/LuOZOSjFJ' + 'Bkx+ZC9lw9w9Kz4qTFpj2lvT80CpIQxHtHTRV6FhWTGsWTTaHehyZm7jZRF693ZbyG7TZxawXESbpohcIB1JxbkFOHqINGxFExByxLq53f+/SUYep1GvmdUpd7wc4FuhsPeF5GAn21JUbTC6bld4jDBa1wdlD1auyYfGgmEv8pWlq4lE9fvFcX7VKOdZ8kTKjdy7zix9uIiqFUq+Mo2xuh5hm+mT7OiLCfK9nugTtxd0AapLKF0csyGFjxQxlcruSMOBhBOY0bj8t1DTsvmIiTmoapmNHOG5H4iODORzRlp4mVaDdpeHFgLPKtfuI0G/hccTtbPxoU7/kW/hK0Vn53waAjC30QV1DJj8yF7Km6Wj5/cg2p4GrWpgMaK7sfQ4lz50lH7X0mAs9GY5GMD/ml9Qp/NoZ44kNNmDtKRJ1M1orxt1VZK1h388PQIubeobq/xfW0USH2sNcektKVU1dN/99RBtTwPYCBuoe5+MGcbbfqGjrAmBu7vKEq1mFy36eXBDZgEIKccXkyZ3e/9fnAAAAAAAAAAA6yR2pMkG1xVyTdQvBzjfb7dS7mU43bZfN/+8hj31O6OO+oT8tcFX5unrXHMnJZaq' + 'GwvavyU1xDmG4SyHKk1OIJlpoovOPgh6+vsut52cS1UFakFWttksslo65qXevqKWIqOwJqgpJYBTyFs7Nq0VgbEekAEXuHWDxR86Sj/laTDgGeHtzzYhveyBHSWR/LoYRFt9TE1SSh2o2mBp3K7wBVj1zHIwneMp1MBiWWt/9XDOIq0DOdWfmFkc2ZdHAk34i5DFqgMYe1T2Y9J/w1bQ8NhYnpE1tW7VNTCWUdPWehwS+WchzSZzLtKMHD1EGjasSSqUYWQHf2ktHXPcb19RS28KcPQNaNiKYLSzDsoerEHTZQnYM4WYfQs9l0kGMPaonszJCpbEZXeiDuLFrQGofOSatV4OcKPepEKcoYJka6Dal7RG25Yvaszth9TX9t4nKrgYXTelPEafJdzv4VvLpsGcbvn+o+tTp2SjkxvYhM4v0lkLgXwQ9FaiGm2AdDkz5XOgu3nvDQ8VXAygldweI2wsT8aU1DfkEDZN9iMFMpHdMt/Hg2xCZwMmPzKZvO9uZvjNauV7b52MNa4rW+IWWTGzwuISkPh/k70gJ7+RUANpRg6QIg0bVimeJ2+uGdMoY5KMPFOiQy9wgv746Rue0LxveSw+7UD3' + 'TEDVN9LeU9t16L+uX8KyYk2pwNKlQf0KTo//4Dz9EmQmIOSVaW+n4+Hw9Ai4qY9s0aojD92m2cLH0BCd0cYoj4p50E90h9WFRpRXm6NxC6I4QX98+oNPaB1HpNsKUAflIGya8UYKZD+hKN33NL1HEoFERwZytyMt8uCGzAIQUpMYLeWNvIkrV8qh+bD4kx37a4kkR8wuWun53RGFBCCkO0vlvraKJD7WVYQlXxnI1l07Z0BOYz+gBqaNtnZsRyof94rHmrTJfiHDU0QuEICq7JpPnblXgucUBbp7yCybMiAxpUZl+LZeT7G2Ufd1R/TUi/oNhXukZoKFqWxaoWqYu5kPrvkI63nJoV43okf0pi12hX3NXSd0HvjFC4AKGCC8vmXcsgH3orRmbRuYb5Qm50zJIb9TxOZIlUEKD5PZykIgzcyqZHuk70KaQGCJChhxDE6k9psys4vM2jYt3jVM05bcI7x8Wy+pwwm7aKqFGrPSYTGnNkjgEwIdxSlB/E2yzVrat3BL5IqneWXZhO1x5jI4b9YXNLuk6C1t1TirckVcIUfqYXe0sV2hq3DPCRzorJB/znK4vf9XyF39lyJ4qKTkTGprb5QN' + 'OFGZW08f3+RiV4zK7XG8ntmIK7DAHSwKkXudXRE8UDuiwx4RqHZDxuRjySOjmcHO9xaGxX6odtyHtKlz4JbVCa8NVn2dOlgUtAwqP1ncxvQ2AviEldEh3dPh3T2YNkhK+UXnGqRmiOV1GFR+sqWR9ZNmWHRQwB2JnqgQGGWMBltPVAgMvEYDoy0DhMZRN7893DJQeOyGHirqMKj8eVc/9yFNIDDKBQy2ZfAyK4AWwwxpvpbdGyRwh9uV7pmB4WG40fwYFNnKBfiCDtK7zA3nKWPXYFBDDxTHO8yw6KCdOg+OQHZNVz9UojnRdcHhYXe9EvWjfHNPH0urN8EvH9/CbVZIsWc5XNDxbATtFTe/QqftlxYdFDBAZX1sZ9qrcrgH7Bf6h7pO6Dzfr3nLAwT7wXM/BgVxvEY+eNYcEofpiifQfPSOd7StobnCYlNskN0m4kSbWGCAFgWPwJrX+UH8+/rYzqlL5G0Oo0PyiwYI65+bEmvQSRc0e5qSh0rnaZwiGwF8QsTmnuA6TFxyDuOSVktun14+o5naa6NT9FrYPTXn/uCQTBskJSLQCYMlh+ldhCmAwA8UMOLGs8Cghh4okwh0M6QZ1yny' + 'NB89rdQtbG/uCj+u+7Kljkruc8SQ3TGDqrcttbGhajSpKgQGXiOP33tLNaFoa2/MaiO/bvSmlWwZHLlrhRrTUlXVmNTW3jUayWBN5fKufvMcpsKjqYHhct4vlVGtelOYMCWq/1bI9hYVUh2dHihg2VBv4xz6RQc6GJxV8StkewsBgOyarn6oWXzsi0AFDBBeI1DlGYv5QQTvitM0VcwN1wenvuFtZ3+S5eMluQ3naZdaBhWRom5jerYR7xYYIItGCfTfPrepgaseuweK6H2swLeRA4y2XiMfD9ONRXSwVmBn7fcCweqOvrpfS+CDEjjN48R3ws7+vlwNzkhsNUwb0oxds2QWwxkQJuqe0adicyQDnSmz74Ll658o/ILL8q4CqKronPBdJ4ZDGqz6J3SwKM9HH54xt6k4WBvQuOOSLsi8eBmbQAvvBpD7cce/QvhiHzvrEEYDBJloPnpHtVrY3piPQmOmldGQ2AjHKm5jhFMGJ1J7wxnXy+uwRGbXKZeu5n4MCuJljHwU0vEHsFbIgHEiwywwQAuMinrhH9Xaztug3ts46YoOdK0Qk1TcxhWmC+kaF/ZVzBmN3V/+uL2xSb/lMCiviQrt' + '1lum9bStemp5VvCIKZcifhDoZlUys1L5DlNh39rO/jnOx/MEn8kBYf9itWFnf18ul1zPJtIlh/BR7w+GVDuvYy8eQe8Qy/KPUnImNbu5SoiujbrnM0TwTUEHadNmiP2as6uU3jS7uWaAExeSjfGqm6VkoPDFETxU8THUvr2xoRd/caLz6o71tUCHhUnI9lXDfvFOaUTwXezURmPc9VE32PKs/Q1SM0T8AAAAAAAAAABfvG5ZjvVRWhbPNC7xqoUysDa9bds5XI0TdU/m3TG3Ervfp3otbJCUiefIrDpYKzA8aw4JzfpFncSuBYnH4mUhSXNad39f1GjK/WRWHSybGNoVAgMvn8nhiGckNpQmg2k3ghQeO6+JhJy11TEkcEvp19tKbxrT0jOm+YlDKpPZv501OauKDuOwU/LKrxXH4tFuGSg8dkMPFT3r4pNjhO3EXjyCwyCL+QMzuINMuUoT/WRw3rEuaGtVNZ/RN3pTxDZhyqV5AvNZdQQ6l1KC5Zp5/X9wSCaDEpzFLukTaZzNeCi5/w59rI0dVFV0TnignUPLfYjMs1IzQUS9EhtKE8+6TUnNJf26ThE+dssgjAYILz/2J7oieKB2' + 'wolX8gT7supFPf6B5G1n45TB5pU9p2IbLINoXP9JF2TzLBGX/E3spSsk1r2SLmj2sit4RJrFET9I87bt0SF8MS6erXW+tVrWF0/YtF/ULWtO1OSWEjir+pLmtO7+vrXQRqDXMgvvgghHIDuopZEqUST3W/jmnj6W8LE4JBPPCU7+4ln7yQH3dydqcksJHNt9vfj1Ae51R19ZmzwiTeyGkW2EAY+Zwer+dJi45BzbOazgWV5xIXxbtyqkOic8UMCv9QtD7D9UO26Djj4hYnNPcMCUkttFB/9Ycr/qn9/C7mcRaIrPnM36oBqBkNhqmDa5esvZO8YVx5XHMyw6KGCAyoY0RelO6H1Q9pZqX9DW3oXprYFPltXaHHCiL7aePqPVCmn2jVgrZEC4Qo7Jwu51f2BKSeOsjfEsW4b5CwwQyyPh2bLrjwLz7ik5E5TT0iVEyOChf1zQ1qq1jMal96JurYGT+wgjjwLC1caPRlsvn4H8/5zSiP26xXcFkVfzWdxHHSYuOQf/SSv7WCIz5ZrFV92yvOJC+LZzJXe3Ykjgls9vmcSm2D2nTMEUfkHreVcB9IuvdpEqkzc+8p0kmywKGenhYyK2+GIv' + 'VTaZQEd1f3qfTVbVpHsLM4IlZ0ZqoRdMuPUFfesIL7LMSMEL9EdfUzcwiNQnXew6lo9DJRgK7RAXPSMs9wFhUa5O0J+Ub8wT/UtHQcRTmHMbWz8N2ZM3ZS/8sJZ7ZEBS4CN20gqJhAyjrjpwMpsY10GcvSM13oUm+v6/EVt8MZkDlwdPhaqbDcWK1PtINrlwvsYL4/xBBKge/zbcS3CHchMf3DPthFO2CETjPjQXZNMP8RtuqzjNOWQ1Hwp3YbhaO1aU9QnPug4whXCEuHJF0Eevs70il6488rpcL29rVUp0vcR2H09w4c/fxkRx7cRe5hB4TB3ArxZ6yinWPBE/KC3tQRd2qFmvrF8hHpmj1e7UhPlJqH7zOzzjbKWW4BPk0SDwmDqdQyxrxARk3Fl1Y2nV9eXRlWyemulfBDaYuyTJ7MjaZqTvRNaVCMilsurGxAwiNcBQO4A4wZO6jGUhAxzux11GvJ6P0zEBGTdRWtHY4uVohuylD7E3EI1XecmRcJ87aQXKQgZP61CDFoDK7+xFavMkG9I4WNZzr+GBq74kL1Tnytm/jAIR8YENzBn9kLxNuw9DxgqVGERqnaB2HaG/y/E/VwEq' + 'K95PiWHhcrUnuFOoT3MkgbCx5kPfH0thGMw4Qlw5rGjSt/fXvzfYITEDhkowFMcgFKokY3Kr+lxuYA21TrrFdDlHZXQEA6PzCcIV8Lxx5iMqWLlH6YfwRXtM3xi0d73Ylwm165Bsb+BzCDwmgGDZC/7cQA5B+QN+KElIxuRL6bhyjsroCAZb+wYzDp4XSSsaWVCFYWnnKU665PT85sQ2T8p7z5XjDnRJfX/RhqM+lsJSg2EQ2FrWkE36oQIbTNMSkTq7dYclRPrdRuy5FA8VGD1lmmsehpEUwj8sq9cZEJrXE/4GLdRoNtCmBlay+8HcIhxaed2QlJbv0m28obFJNQ537aAjXk/Jy/05W2to9rkN4OrvpvTUxAQi/x8ahTLn+Wm4Xt7WqpR/biAHrvKPPzrQYjuBqTj+ZiTui3qtoae2gujdyFZge6eMxW8oHiowx5slekX6oI1bQXTgZCsws19ji/9+rgJUS8mvnAwF+AjOWTCK+YtGro/FjanMVcOIgDSWx2dtDrHzPKrh5w3XurtiAjJuorS/1QIPhyAYccudXKdUqbcSzoQWadh96DxWimGEeF62c59CC7pssHQeK/EtW2Dqwc5H' + 'dqw19xKDaRwsa7fZ/s7bX/zNsY9MNRqDH3nAEsMWBYLwq62uYqdMt+GlgByC7wb8Z6IYRfLLI1dRFGZfXfBNnb9A/S10J4ZYoDk9P7cxg9oFpAnRkuOwF6n7KM8LQGX5JamiKUK/PXzbdeInA0Y+ArMm4QxatdBs55aOgpWmLea5c/OzY26tQt9XHTgZwwzl7lSbcinXy8USmSr9ZeLRRvjvTpBWsChktwQeE0Aw4ovALt0q2tUJZ5MrSvSK6V0Hb+b7e8bcR4Qjmqy3VfYWZkAaS+29uAfWSF6o04mvYwWkG8IgrbSxPXU7MriXKfIRmX5YS7MyICkdaDGTztocf/9atsDJn4GOFrvV4n9n46GlnTTuJdIzzZj4roU7VKLZbfcK+ssQXnl5XS6ZubukJY5De2dEM0F4AYb2zohmgvDr8JKjuzR70rzX+mLxjR1VrdnX0BHFVx4L0+Rxsb3/3qpsL4CO6v70XuV9MfbIgKT1D6R/8ET8oBrdycNR9bWV6nZkbTNS+SIAAAAAAAAAAIWQnxb1jr6mRilFc6rxLMwKVRK/Odt9Lnjb2Fcx3SbVKc++CGwta0ghi102WDoPmxUs0q36zXis' + 'g6ORiOLHlbzDudplX3+Sap7LoBssHYnDB7X4UJ8vqep+6NbJJpQNzza2fhqvO27KhgeYWXAkJav7eEnf0xqzaUx8V8yTKlHi2WQTpg6KJ/8mPqVmxxWmcWxx/DRDdtyJSk9ZUoRjevja8xTpiyC88lcnaMFKuWaHEIjbfGguyLuIcHX5U3pqYi56RljzAsKiYZEW2+WCCE2ofd4BgybnCdzAGnecaZfo7cOcPax9UMimCjOhoHiowMGoK+RSs4uXP3Rr6hNKiOmiKMy+uv2aJ6vq2U4GjHwE9IlSsXgiflBc9Iyw+wSZWWAX4BVt5Iq9RDi08qc9NTGMUormSf9YhbUV75JN/Pt2DGYcIS6SVjS0kxlcxZp5hpzaUZoh0ZA+MpSBBbW+XC0ZSs6M1F8umEONTKI4Epzbm2+pyr7+OdSBsmAJ7wuMQd7R6/aRpY4VTm2mTZ7mSB9UsG+OzxP9iknYXh0ByeH1r8gmURwJTuP2mKMwde5nrVrHgi7sTbJDjdR8KMGZ2nWJ9oM32xzoks3ON8V8Id2jUwWX3lA8VGBqQvKqVD/3k11yen5zYhup4jKHUwdFnfFWoZ4Pwt/kd8Yd07TNnCJ9' + '5Yd/A5hqNBuUnrKkFcb07WIGEZRgKJNAY4DnWuhOEbCL53K21tDxb1CSkJHVls9t6GeV7D6e4N98+SdIK1gUMshqPhTuwm20cRnNp42swPbkAYnNEAy265KtvDoCj9/3sqAXwtLTUpwgDav40FyNazSnj5ui93c347RxnY8jHwFFvkI8L1u3wfceVf79iOVdaFMDK1nz7m5ls+nE/wc6qncqwzma5evsh4Ful/hCp1sRDi2y4EhKSzMSd8s92N7dvVEMrHnrn6U1IXlVKpH1x4qwqWhG4GptQ8foC0vwszoIybNUaxYe5TnxwjXrqZC+wb7yN2YGx7IsIJIzYUVpqusBUjtvwyialGlTq5Nazt0nKDj2PhM0DosEVeyhK6BSd6GyxJeP+KKlUSLKE+VAhiJ2E1hi0/HN243f3gi3bP5dHhLInkoXig5WgWsDlphn7l95lTMD7Vmv7XSLq3jXHW2Sny35PlPu9dio+Lp5jCr2GbFpjjnPa5Xdry90kQTi7CqcgOCIZCfOXI/YgluV6sTg2Zk6xgJxRpnDpRcwdvk9GxUfUKKfQp7VBeorx1lGNGZaz9x/S5hhsftTKSNC98chwAgOhkEw' + 'hpPNFpb9e3SHJzGScTaxS9NEbIpjoXIbZpo16KZoDkrKtljyOVCaFqTl3k70Loq5N6dDXug/CNkTTmI54mx/loJ5Gjwt9nSIP27wCoMpFjyOWn5C/etlkVyq7kx5gd21GfI0eFrx6A0lXd3j7Zi9cFCJijKpnMysKMpFGdpOZlauWYgPTLMdIg2XmPo31tsmMvlo8LT/zRqgDwlkTyWFRfo61RdeJN5y9GxUfF2yRhVxPoD7/w9+IHhDzytz0qr6vRfqNq7fYrT9ERus0W+Sz0q6p9vHLWfgs0FrXa1J+tO8oxaySRSoixXRUAaK7PkU4nwd6+Me/EBP5Ix1m+2iI37c/RQbUix4TlBw8XwmaBzmlsrBWBXzvDXSpks7tIGngAz/Kf59/fYe2frD1bqksGwmY6ke9ZnRA8EZkTRAQ0H3rU3tafIFVM2dlkm2G9aryMO95+rbE2jRMYmfsCr7ZR0Y41Lh+ufx2jkjWu98psGhu/XgqO5PepE3eAXPmgseMThxYYC/jlvZ+DrL2zzlgAJ15RXTi4l+Ry0/IfD7vMYtlG63ho6jlbo8JI0hlC4J5yI2Rb/eOYP/ZP65AuQbscl3QWMNENlX' + 'w8sXIrWNTsyieuxxnK4MO5n+y1GkjBX7FGWsgm0nMyvhvQR6116/AXn3M6+UGWDFZy7JbEGjxHXCf+umUkaE82Tv0P1144c07Z5gBAdDrhj7jimTue8UTThFPrEMYlqBaXhIB0I1XBJIz0LOFKbunhysH9YGMS3Oe4LWukeS6budFBx7H4caB1YWuA3BHEouuEnBmPIfp3d8qRgByNmlBrE0jkh+wnOtQbINHph7OkR0YKtVo8+744TmKANFdvIKG4fRbYl6YXMP4n3v5F1SWIPN5rjKPb63DCNkftAdERl6Nio+oFkjhLYfQPPxiT8QddRX0UQEcdxFWNo0I3A1uNymEWWH/CBDjZtn08mrJtArC1yI7g4lF2/nejgqtdqQJpzEctnY/jFjxB5G+qjLibervHcWQvUvfR3khS8SbzmoxrowJDOboGAFB9fO6IjIj+6Cxhogr65XokSJJteAEfyl5yg2pFjwByvOu49LTL1Je75K820koTyv6Zu3aVV9EvqevQWntanowEuqW4Nr20JzFI+sO3kFkIOEgShRwSHlV9NQbFWw/XL/mWrLTz1hPtoMjmTi3APwhoNW5rlJ6QTq1yq7Cw/8' + 'F6S1E1lncGrjyOFvBNU2f/hPMAKNr1cMGEbI/L06IjJbgSD39sqRCNRvojHs6j6mM02UdFM0ByVYQDlmworSSb7W86eanyH1aMy0g6X+li3QhXUbV+ExWv7QAj3lL9GOSw5bXyDmrd8aMy3pbrGrTKPOEPV7ZcYEEI97qNYsPNerB6OhEHPY4WsNrRKRvtVs8vNmQzUywJcuVXcmss7g1AAAAAAAAAAAywKkdt6bUCnk4y/Ui556wnNLZe4shPdeblOGvM1+EK8BtPyE58vKP8/oc1xlkF/VNhO/2g/0wuYRO4csMef26C/hi6JVBSrr6XS3LrxIoeQKvFZBuJ2Xm7RqpeYiArZuROwmsMS7/4emkDtbJ6UDx39oAZD8meZHl6hKOqcajZzdEu3hYDfqfMVUJR3dDchOiMVMfZVr4xNNkWlgSGYrXbCAcsyZCbmStd5ZYsXJfFGBuAOtGbY3ybL1l9lKgjDsCwiqxV9WXaTxMn/SAXKD1q2YkZ54815jarlRlnZ1H1Mk6SFnClN3T7n9PRwV1G1IkvZhlPvaSF9aNdxzEQFbN97T9HBUd6k9wAoOs4HNDY27iNgJxl/kNhYQSZe+rLpV' + 'IbcKyVaTsoxZ9MXiJUEYdtXbXrULIfSZVdehnPVcCW+pcka0w/hRn4VS1IeivTg1VGNdGBKXw1Ajwu/chRg78p9h+W7MDJN5U0iTo53cj+1e3wtZqgpUy6wsbRqfOJRc1667oNiqfecqv6AMCcXvKNhMxk889y+/IAP2TbFYeLOnJMffwG7J+AafMj9ogIaCzClqzVHQHJQFXiuuXMDFw2Jw4sIdYwG2O4QnIDgiGcDS8JAOhGq4JFL8byd6F0XSxpU8jOlNiw/gCfj+MJV1PmVbLHmSKE0LmEo31UNH38Tqta6/iAjipZo/0sCQzFa6nKDg//hM0DhMJZXkr63hYt9nCPSzvGMCv2IPI31U68qTQp0QHBGCYAl9T9CM3dTajC+bVy5g7O9winx/GMS0Hzow26Tf6dP/QAbxmn+w8Htfa/fdTcGe9B9tBkcycW6P+fvMhmpknTMwjI3lZ3REZIlxsPlyoCks1hpHJD9ht9jv64UR1MgnZpYctr5A0UejqrNfJfe4Et52FU5AcEQynVE9drZOVwaT80eax9L5Cqibiy5EdwechSl+uZ09haxpfjfmLfx9QMN3byWk7pOeW+BFyFDdj7Wt' + 'hu1bpxH/GVLpHQvZz2FrNTfgqyVuQI/7lgf2wDECWnoLAvXhFtI8nfPYSGv7UGUMYhz/J8QIdfV9QMtx+l/TSm2qZhbaopBin181SSPshOLshHw9xQfDswJaNmgEPOIFqL+ebE2sCxn6gIvi6b67lLW5nFJ3x0+jeNm8lfA5e8zjMuUM260mJMdPzhKTMnl+Fyns6y6nCavC1rn2mVTR+F2JjL+6uFUahZp2+xfditsb6FiGNi9/tfZBP4/xNs2K0xEPpbu341wKL+7VFMxNEegwEO3Nfxq5oedd5V9C1YHu3kpVwTshtvL1U1/5ThSADMG0bRiIdh684V/bZSmROy0l6JdacYHCcYF/HOLXpVQuUsXLXFMSS/n3pr7vnCgdnnIufSHy9W7OFw2bgdyn5g6bggUctJQbHnEvYjxJ1zMh5Fz6Qvn33MuOen+Lug9gjpiDGgEPtkZHTM8NjolbI6mShVhPsnqVjMK1cgUzVENC1bjphO/zpQEtGzQCHnGMV6Ziaq50GAv/GfwG49gTEjW6nU1qfG3+ydRMF4+G7WVQZSPmoC5SiAN3LVwGIpOJiwH0/gtpHsD42r2K7YJZkUxOOuyYW2e+' + 'sQ3wgn+/lqlqaSea1Pja4eeGidzT1f8ugS4aKx+lU9H7rZDW66DKGBrFQ7I0MQ45FgT33yy5eCemJBxpURifAnU1E8zqr3xeZPKln8hMTvokfSseSJ9fWttk1xirR0xIefSnofInCkAVc9qDKpvrrjSXhnloYhxyUUg40qIwIwTwr2U3/XL2hR0GAj46a0S6Z4WIw85u3XNmqJP3zHCs/9TSTim17anfOFYyFHDqamwHw0GMDlpKgyvLsi9WNbrNBLRs0Ah42QoG7lq4DEQ7DzshH0h2yPnlCVjDiRLu3pjRSznNv4sBWTl7KSBy9Bvgh8BAkxPhaN6tJumIR8qjn04UDIScZ4W71f9VHbfz2FOgykbRXVykDc1gIMeH/jRvhLdtzxXD+1fe/aD8oSHkzkuNe2CWAS09msZCrSmKLGQIddi9EPCvFLNXxup7g3SsTWMh2JpFFjLtqWcJxxmyP/dsJLvzKLwGxmLVJpEsCPI84l7EeJKzZrl4KD9vTzm9wIyPnp1oM/1PORewnnn0N1k94G+ywIwQ1oh4QbHRS9oZsm7uMhOdsLSUh2Z12T4vglk3dxmHwFiQ6ax4PUZhdfGCfgP/bIcJ' + 'lF3AqDU+uH9FFvllirW5Jj+Vc5h+sCDvuFUzC21RSDEq5qkbVCvLQWMx5BPGFgR5QI+OgYDTEaDv81FhwyVQOtBmIvm9lXDViHbZog1LjUmlUzE1VzoMi+Fo02TfkcQh9BsJ5/UKL48SsJsPJMGhLdpJzCypWT3EH1w0Vj5Xpr9U0U82qFaLgq983+BD9kGa6momhclD+Lzl3L+01+kdK7J63d55nQUga0Q8rtbmq217rpHJ9hvoRT64aKx8rlFjEce2UyLjMqTSPBSRuamS0I+1mC4DEcfKcKxkKODJ1NiJW8KWD1X8xXZCPpDsje/Xb/BQft6ecmc9z0XweozC6kqgYFSUH1yxWBD7W7De/Zxe/qHjvJrGk27dS0rcgAPrdBgI+OixDdIUXsG3KIWaIii8n3NQFylEJwoGQk69zNOXKu30Mxwr9gWZd+QKZqiGJVAwKkqBLtbdio2gpwN3R8UV+HqXDpt7MCPqqWAaxXi346o6c/utpg+2mTEequWXAAAAAAAAAAAxDvGdYgS09CKTcaZE22RVDeyvWRqWB5JcpJeLuKYklhwrGQo4dTU2QaKVtYLNYCwyedzBZCYnfcGhlKqfdkJx' + 'E52AOybf0KGuUcTUQegwFtgT+kStZd/BrAvyvEXU0hMjvmqSRsUV2UnXTQiSPc84nQUDISfQZucvf97/Xk1jx6R+KgFVJH0HmbFv8S+ov+1GYdQ5jJcqr9/Qu8ijP5VC3KeWlKUdBsuwIOu2faHnJboPBWNpbao05PGkgNX3bKfEOONOlRDq95OegSQ7ZPL8je+uRgctJc8sCPOjWG/wTtelY3WzzzpWIMlHzkDnhlBD+KPdhvGCKVaLeV6sammHgAMBHx27Il31NhLT9xReAxifddowDew8lXDbnDcgyfO7Ih5Xa3PbuHL2UkDk9TbdRDviUYiryKriH/442bNXqP1Dym7n5PEXyqNhS4mkfuz+NOcy4cZinoN0LEMbmbHUzzoWr4PC1mqq5agESZDpHCYnHXZMo71fkcS3TD9YEPl8bdBF+EGixn8a/Rn+YzFPyPlXI42YnOmnCQddUwbujlX8VAKqSPoOSPpWPJAjvrRl376rylI/dmyHfSLYvOHuzE0784XgReO+u2mzYRVzPhDqrWcg/UMots6xDnHl3Cq9zETvZzfgt1I/FY6kErCNmJx0xS22zmGb61mZK5Rd6Ios78oJd29M' + 'o71rjVt+N4TrRz2xy12JMMP7osKbSqB0nCgYFSXOF2toMxHy0MQ45F/Tute+hLcf/G7RWuX6gJs2zbARbF7+dymRhEdSCVjIopBwuVlgRghTEg66pgzBAToMBHx01ohpaR4KxtLaSWhz20l05utHUXqDiv30BZnJWkrNM7TiH5lgRslPwDSX8OarkujRy46iM1TH9WY4VvHZPuFwr3uuTWFr0nvCKuZ8krOaEDl6g3CryLMwS46YkL+WcodjCwKyW2fWB7b8bhXQMcOXzlU/5ha6WwGwBrUlqJut5ilucMhqH1Jdd9NDW24QNXBXPfoLZg77Khf8lat2Mnqel2NL9kutnWRiRYv18YMMrtvD90jFyPVCZpEx/5UEShzcSLDLiSli3zz4uGawueII6TDBNaFPs/BhGnZ8jSYF8hwWATbWtxki/sxUnjcIlDilkH2LC12jjlgD1JxaW8yc6m88vO2uJG07c//l0rh+D94i7c5eVKuxyoGF7B3n+I/oBWG5rV4ahwE1oIwvKtvWZc7MdleAtaeC9YNYPtyKLu3kez/J2Vw1Br7nD4O+ER1sTgXupgO5CVk2dBAQPIG0gJ/eXSxptgJ9DHdK' + 'OZCA19XIeVMJ1B4WSHQGtM3WOxgmUF5f+Z3C9JsCmOic0FQKlDy2f7yoS3+JHxfFcj0ds7eN8qZ4qm5x5ztPLhQz5pmgcWcNhPIb5FRiB4KY3zMntNIPL/BJ3OLTdp5c22xgGZZW63pkh0ayB4tHgzLNI1mNy63PHqSVW/DH2oXpoUNAG51Gtf2Spdm77CG4yBOMeQ4Ljhsu4AuabXulYvhXEriTt/H86yj+2AvqlJ1WSmXrikDqTGyZiOhHSigjRTWJixIdjy2r2MAyMazL9Loukcq5hny9eWC+Pe+OJjoMEal3YC/W8MtQ4a0WyTUn6uIulANf/YkoZtEvXeLOGv8bGEGrm/OQn5M53oz+DUOWRyfIxIoL91JFAsaqrlMcm5xe86wQtBNPovpJQqsypT8WWmLlURIrx0FI2nbm49eSSEDl5GSyp9NyrkPWl4TaIztyoQXhGoakigSRSUGmOLS2hSXJ3nhl3eq6rKbPgAIKl3PCULa9iMKE/7tevTOTi6DfRyyPak4q72y3TZUcMkJ5g3IqMY1Bc/fN/784m7IHTAr5OCwCbIpqDwskOgNab9rlPF+Ikx/Gi5iWflOKw0T/WccaqOY5' + '4vzgzkOekimiDN4kedjNQBnon6LI69jp9Ea7z/OYJwxDs1M+IoTkVdgvDc2OlFBGUQZvErJs6CDnOVeva8VCbQgezlpAwW+gOxk9T8W/q3t/5mSI3xdNQg6YFO9wWATYgTeshXw518axczJE4YWoIWlcP4lvEfhn9s8GV+Pv9SQaq/J20Clj1S2jZk51uR5eAom9mBB30iiQwf199BNgjzxVN7b9k6kXqhIQfjkZouAGhtq1MJlreNqmsFWe44Juw04v91YIWodtU1ikT/9BN/xYdZWzWUisfKUJXMfV9n77FH9si3VKwL/rJquR3az5aJbvxWekkXPKmjHhHnxcM7vkQYaxMxWpDdt5O2iav+RwtKArp/ogjuR6OntzB/lRjOzVvhSjaCLu7Um5I7FE2Rdwi024s9wxYIghnydl/tOz+o/c8fJ6CZELLTH8pgmbD1LEo3jtbcxQzL9eutmBNGvVghF/ZipPlM6aUNT92d8rJbz7RSB1JmfEK2YfSfy/SSQg/HIyWd0DQ23UGMK7PB9uRRf4crORoIVjvGmvH2jUPqS67ruGtgHK0EwItWkUrJTKywmAyZhUw9hzmjc4ZCb+xcAtusrC' + '3qnXeL4NOz4ED2ctIO65UOWw6jd7spBF8wqxNsu0JWBiAZwHNxIs++hrkwwTKC+hzBzrVC7lN0tTj9KKohs6CBthIjrYnArBNsJEdK0lFJ96I9Pp90ydBr4h9ueZaMXtz1+GgDYnjHf3BdYb61qcME0rR9FS3OCNX557/cI07Pgkd3hYPc0Y6oZ7pnxEFdWqTOGXnVppiZkAAAAAAAAAAOxk9CEzxpbxtXxVacFrEXHBx5JvRn+Ir2VNlv4PPi6XFfk21ajEDhm4pyxSqfGulalRfaoh2xncWNJxBPoY7pRZGKFI8q2HgFzdFina9lfEgnTBUWT7bPrR+xPbxuBW8n1v2RDPYJ9qtj84vdmpqk09n+f69SbAA3S7xwaHFJne32MHNLa4Uio60+0DzQrCb/reryCDwCPUwA1CI07K4buFOMuoXNdulsQCJQ5uJFjrR7w0EwJqXQWv16cfEUJypJeN94TMP2LjuW38HqFEx4Ehss85FZbIrjGOTo2VCRbzzpVWzD6S5WM4WlCb3X0QRzWBKaC156+j5vOH42NwK3ngdV1WU+lAAXvpA6X/+fQSErU8LJDoDHUzB/MVhX7E24+vuGoMYdMe' + '2eXdgYYhOVJ3+KrSn9Yi4iW9qBQ1eHH+dXEXSo+h8MoTf+xgmF1lYTBEnsGdvH/npUDU3UH0zyzcIGrgrnrpFluRHNDi2lWosjBfkPlHEx00S/nsvVLGt10XxmXSQz7QGCJP7sBesf2eWemShEtkV5pWjr+kpd0Ho8YOaHFtpFR+LLTE16IkVoexdjBMoLy+QTrupjLzNn2ZFeNrvGdmO0DwPuo6Rl9pHC0ow+CwCK1OaCoFSh5bsQXFt2EoW9BE4b+NGltcKRXywGF6wwFMdLf16PHRHMNZY8tMSz+nRe+dGoRGnInfa+M2MIJLK/s91fR09uYO76L1jGuD+y1OGEZ25F8K3zQRIHgfdR0jobq9Ypszgap+0a4dd1MZ9xuw/tHIDaMumoRVCQg/koJRcCmsAWNVV6cOp8lpRVGDHQSOZWgmBNS6ChH2UfiIKrdJ133JbvZ5PYrvJ5n1KwQtzUju8LB6hzDJIvGi7Q1Uc5JhQvHTL9CXx0pnTShq8OLhgP18yXSMvtJxfnBnr09JmpOCkKns0duziOOykzRN0XInNBWMJQ+j1g'); //==

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gostASN1Instance = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @file PKCS ASN.1 message syntax and converters
                                                                                                                                                                                                                                                                               * @version 1.76
                                                                                                                                                                                                                                                                               * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
                                                                                                                                                                                                                                                                               */

exports.GostASN1 = GostASN1;

var _helpers = __webpack_require__(18);

var _gostSecurity = __webpack_require__(6);

var _gostCoding = __webpack_require__(2);

/**
 * Service functions
 **/

var CryptoOperationData = ArrayBuffer;

// Security parameters
var algorithms = _gostSecurity.gostSecurityInstance.algorithms,
    names = _gostSecurity.gostSecurityInstance.names,
    identifiers = _gostSecurity.gostSecurityInstance.identifiers,
    attributes = _gostSecurity.gostSecurityInstance.attributes,
    parameters = _gostSecurity.gostSecurityInstance.parameters;

// Various coding algorithms

var BER = _gostCoding.gostCodingInstance.BER,
    PEM = _gostCoding.gostCodingInstance.PEM,
    Chars = _gostCoding.gostCodingInstance.Chars,
    Hex = _gostCoding.gostCodingInstance.Hex,
    Int16 = _gostCoding.gostCodingInstance.Int16;

// Swap bytes in buffer

function swapBytes(src) {
    if (src instanceof CryptoOperationData) src = new Uint8Array(src);
    var dst = new Uint8Array(src.length);
    for (var i = 0, n = src.length; i < n; i++) {
        dst[n - i - 1] = src[i];
    }return dst.buffer;
}

function isBinary(value) {
    return value instanceof CryptoOperationData || value.buffer instanceof CryptoOperationData;
}

// Left pad zero
function lpad(n, width) {
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

// Nearest power 2
function npw2(n) {
    return n <= 2 ? n : n <= 4 ? 4 : n <= 8 ? 8 : n <= 16 ? 16 : n <= 32 ? 32 : n <= 64 ? 64 : n <= 128 ? 128 : n <= 256 ? 256 : n < 512 ? 512 : n < 1024 ? 1024 : undefined;
}

// String int encode/decode to buffer
var SInt = {
    encode: function encode(value, endian) {
        return '0x' + Hex.encode(value, endian);
    },
    decode: function decode(value, endian, len) {
        if (typeof value === 'number') value = value.toString(16);
        var s = value.replace('0x', '');
        len = len || npw2(s.length);
        return Hex.decode(lpad(s, len), endian);
    }
};

// Assert invalid message
function assert(value) {
    if (value) throw Error('Invalid format');
}

function defineProperty(object, name, descriptor, enumerable) {
    if ((typeof descriptor === 'undefined' ? 'undefined' : _typeof(descriptor)) !== 'object') descriptor = { value: descriptor };
    if (enumerable !== undefined) descriptor.enumerable = enumerable;
    Object.defineProperty(object, name, descriptor);
}

function defineProperties(object, properties, enumerable) {
    for (var name in properties) {
        defineProperty(object, name, properties[name], enumerable);
    }
}

function getOwnPropertyDescriptor(object, name) {
    return Object.getOwnPropertyDescriptor(object, name);
}

// </editor-fold>

/*
     * Base ASN.1 types and definitions
     *
     */ // <editor-fold defaultstate="collapsed">

// Encode object primitive
function _encode(format, object, tagNumber, tagClass, tagConstructed, uniformTitle) {
    assert(object === undefined);
    var source = {
        tagNumber: tagNumber,
        tagClass: tagClass || 0x00,
        tagConstructed: tagConstructed || false,
        object: object
    };
    // Output format
    format = format || 'DER';
    if (format === 'DER' || format === 'CER') source = BER.encode(source, format);
    if (format === 'PEM') source = PEM.encode(source, uniformTitle);
    return source;
}

// Decode object primitive
function _decode(source, tagNumber, tagClass, tagConstructed, uniformTitle) {
    assert(source === undefined);

    // Decode PEM
    if (typeof source === 'string') source = PEM.decode(source, uniformTitle, false);
    // Decode binary data
    if (source instanceof CryptoOperationData) {
        try {
            source = PEM.decode(Chars.encode(source), uniformTitle, true);
        } catch (e) {
            source = BER.decode(source);
        }
    }

    tagClass = tagClass || 0;
    tagConstructed = tagConstructed || false;
    // Restore context implicit formats
    if (source.tagNumber === undefined) {
        source = _encode(true, source.object, tagNumber, tagClass, source.object instanceof Array);
        source = BER.decode(source);
    }

    // Check format
    assert(source.tagClass !== tagClass || source.tagNumber !== tagNumber || source.tagConstructed !== tagConstructed);
    // Clone value define from redefine original
    if (tagClass === 0 && tagNumber === 0x05) return null;else return source.object;
}

// Create class based on super
function extend(Super, Class, propertiesObject, propertiesClass) {
    // If constructor not defined
    if (typeof Class !== 'function') {
        propertiesClass = propertiesObject;
        propertiesObject = Class;
        Class = function Class() {
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
    if (propertiesObject) defineProperties(Class.prototype, propertiesObject);
    // Inherites super class properties
    if (Super !== Object) for (var name in Super) {
        Class[name] = Super[name];
    }Class.super = Super;
    if (propertiesClass) defineProperties(Class, propertiesClass, true);
    return Class;
}

// Base class
var ASN1Object = extend(Object, function (object) {
    this.object = object;
}, {
    // Call set method for a class property
    _set: function _set(Class, propName, value) {
        Class.property(propName).set.call(this, value);
    },
    // Call get method for a class property
    _get: function _get(Class, propName) {
        return Class.property(propName).get.call(this);
    },
    // Call method for a class
    _call: function _call(Class, methodName, args) {
        return Class.method(methodName).apply(this, args);
    },
    hasProperty: function hasProperty(propName) {
        return this.hasOwnProperty(propName) || !!this.constructor.property(propName);
    },
    encode: function encode() {
        return this.object;
    }
}, {
    decode: function decode(source) {
        return new this(source);
    },
    // Find ingerited property
    property: function property(propName) {
        var proto = this.prototype;
        while (proto) {
            var descriptor = getOwnPropertyDescriptor(proto, propName);
            if (descriptor) return descriptor;else proto = proto.superclass;
        }
    },
    // Find method
    method: function method(methodName) {
        var proto = this.prototype;
        while (proto) {
            if (proto[methodName]) return proto[methodName];else proto = proto.superclass;
        }
    }
});

// Primitive metaclass
var PRIMITIVE = function PRIMITIVE(tagNumber) {
    return extend(ASN1Object, {
        encode: function encode(format) {
            return _encode(format, this.object, tagNumber);
        }
    }, {
        decode: function decode(source) {
            return new this(_decode(source, tagNumber));
        }
    });
};

var ANY = ASN1Object;

var BOOLEAN = PRIMITIVE(0x01);

var IA5String = PRIMITIVE(0x16);

var NumericString = PRIMITIVE(0x12);

var PrintableString = PRIMITIVE(0x13);

var TeletexString = PRIMITIVE(0x14);

var UTF8String = PRIMITIVE(0x0c);

var UTCTime = PRIMITIVE(0x17);

var GeneralizedTime = PRIMITIVE(0x18);

var UniversalString = PRIMITIVE(0x1C);

var BMPString = PRIMITIVE(0x1e);

var NULL = extend(PRIMITIVE(0x05), {
    object: {
        get: function get() {
            return null;
        },
        set: function set(object) {
            assert(object !== null);
        }
    }
});

// Primitive class with value coding
var PRIMITIVE_CODE = function PRIMITIVE_CODE(tagNumber) {

    // Base class primitive
    var Class = extend(PRIMITIVE(tagNumber), function (object) {
        if (this instanceof Class) Class.super.apply(this, arguments);else return CODE(object);
    });

    // Create Class with encoded
    function CODE(structure) {
        // Structured class
        return extend(PRIMITIVE(tagNumber), function (object) {
            Class.super.call(this, object);
        }, {
            // Transformation to code values
            encode: function encode(format) {
                return _encode(format, structure[this.object], tagNumber);
            }
        }, {
            decode: function decode(source) {
                var id = _decode(source, tagNumber);
                for (var name in structure) {
                    if (id === structure[name]) return new this(name);
                }assert(true);
            }
        });
    }

    return Class;
};

var INTEGER = PRIMITIVE_CODE(0x02);

var ENUMERATED = PRIMITIVE_CODE(0x0a);

var OCTET_STRING = function () {
    // Base class primitive
    var Class = extend(PRIMITIVE(0x04), function (object) {
        if (this instanceof Class) Class.super.apply(this, arguments);else return WRAPPING(object);
    });

    // Wrapping class
    function WRAPPING(WrappedClass) {
        if (WrappedClass) {
            return extend(WrappedClass, {
                encode: function encode(format) {
                    return _encode(format, WrappedClass.method('encode').call(this, true), 0x04);
                }
            }, {
                decode: function decode(source) {
                    return WrappedClass.decode.call(this, _decode(source, 0x04));
                }
            });
        } else return Class;
    }

    return Class;
}();

var BIT_STRING = function () {
    // Base class primitive
    var Class = extend(PRIMITIVE(0x03), function (object) {
        if (this instanceof Class) Class.super.apply(this, arguments);else if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') return MASK(object);else return WRAPPING(object);
    });

    // Wrapping class
    function WRAPPING(WrappedClass) {
        if (WrappedClass) {
            return extend(WrappedClass, {
                encode: function encode(format) {
                    return _encode(format, WrappedClass.method('encode').call(this, true), 0x03);
                }
            }, {
                decode: function decode(source) {
                    return WrappedClass.decode.call(this, _decode(source, 0x03));
                }
            });
        } else return Class;
    }

    // Create new class for a mask
    function MASK(structure) {
        // Bit string masked class
        return extend(ASN1Object, function (object, numbits) {
            ASN1Object.call(this, object);
            this.numbits = numbits || 0;
        }, {
            encode: function encode(format) {
                var object = this.object,
                    data = [];
                if (object instanceof Array) {
                    for (var i = 0, n = object.length; i < n; i++) {
                        var j = structure[object[i]];
                        if (j !== undefined) data[j] = '1';
                    }
                    for (var i = 0, n = Math.max(data.length, this.numbits); i < n; i++) {
                        if (!data[i]) data[i] = '0';
                    }data = data.join('');
                } else data = '0';
                return _encode(format, data, 0x03);
            }
        }, {
            // Transformation to array of values
            decode: function decode(source) {
                var data = _decode(source, 0x03),
                    object = [];
                for (var name in structure) {
                    var i = structure[name];
                    if (data.charAt(i) === '1') object.push(name);
                }
                return new this(object, data.length);
            }
        });
    }

    return Class;
}();

// Combine sequence object properties with owner object
var COMBINE = function COMBINE(Class) {
    Class.combine = function (owner, valueName) {
        for (var name in Class.prototype) {
            if (Class.prototype.hasOwnProperty(name) && !owner.hasProperty(name)) {
                defineProperty(owner, name, function (name) {
                    return {
                        get: function get() {
                            // Get object property
                            return this[valueName] && this[valueName][name];
                        },
                        set: function set(object) {
                            // Set object property
                            if (!this[valueName]) this[valueName] = {};
                            this[valueName][name] = object;
                        },
                        configurable: false,
                        enumerable: true
                    };
                }(name));
            }
        }
    };
    return Class;
};

var SEQUENCE = function SEQUENCE(structure, uniformTitle) {

    /**
     * Create SEQUENCE ASN.1 metaclass
     *
     * @class GostASN1.Sequence
     * @param {(Object|FormatedData)} object Initialization object
     * @param {boolean} check Check structure after initialization
     */
    var Class = extend(ASN1Object, function (object, check) {
        // Define hidden properties
        defineProperty(this, 'items', {
            writable: true,
            value: {}
        });
        if (typeof object === 'string' || object instanceof CryptoOperationData) this.decode(object);else if (object !== undefined) {
            this.object = object;
            // Check structure
            if (check) this.check();
        }
    }, {
        object: {
            get: function get() {
                return this;
            },
            set: function set(object) {
                if (object instanceof Class) {
                    // Set the same sequence class
                    this.items = object.items;
                    for (var name in structure) {
                        var ItemClass = this.getItemClass(name, this.items);
                        if (ItemClass.combine) ItemClass.combine(this, name);
                    }
                } else {
                    // Set other object structure
                    var data = {};
                    for (var name in structure) {
                        var item = object[name];
                        var ItemClass = this.getItemClass(name, data);
                        if (item !== undefined) {
                            data[name] = new ItemClass(item);
                        } else if (ItemClass.combine) {
                            // Create combined object
                            data[name] = new ItemClass(object);
                        }
                        if (ItemClass.combine) ItemClass.combine(this, name);
                    }
                    this.items = data;
                }
            }
        },
        getItemClass: function getItemClass(name, items) {
            return structure[name];
        },
        /**
         * Encode the object
         *
         * @memberOf GostASN1.Sequence
         * @instance
         * @param {string} format Encoding format 'DER', 'CER' or 'PEM'
         * @returns {FormatedData}
         */
        encode: function encode(format) {
            var source = [],
                items = this.items;
            // Encode objects in structure
            for (var name in structure) {
                // console.log(name, 'encoding...', items[name]);
                if (items[name]) {
                    var encoded = items[name].encode(true); // Source from object
                    if (encoded !== undefined) // Can be optional
                        source.push(encoded);
                }
            }
            return _encode(format, source, 0x10, 0, true, uniformTitle);
        },
        /**
         * Decode the source to self object
         *
         * @memberOf GostASN1.Sequence
         * @instance
         * @param {FormatedData} source Encoded data
         */
        decode: function decode(source) {
            this.object = this.constructor.decode(source);
        },
        /**
         * Check the object structure
         *
         * @memberOf GostASN1.Sequence
         * @instance
         */
        check: function check() {
            this.constructor.decode(this.encode(true));
        }
    }, {
        /**
         * Encode data values with creating object
         *
         * @memberOf GostASN1.Sequence
         * @static
         * @param {Object} object Javascript object to encoding
         * @param {string} format Encoding format 'DER', 'CER' or 'PEM'
         * @returns {FormatedData}
         */
        encode: function encode(object, format) {
            return new this(object).encode(format);
        },
        /**
         * Decode source and create object
         *
         * @memberOf GostASN1.Sequence
         * @static
         * @param {FormatedData} source Encoded data
         * @returns {GostASN1.Sequence}
         *
         */
        decode: function decode(source) {
            // Decode structure
            source = _decode(source, 0x10, 0, true, uniformTitle);
            var i = 0,
                result = new this(),
                data = result.items = {};
            for (var name in structure) {
                // console.log(name, 'decoding...');
                // try to create and decode object
                var ItemClass = result.getItemClass(name, data);
                var item = ItemClass.decode(source[i]);
                // success? item can be optional
                if (item !== undefined) {
                    data[name] = item;
                    if (ItemClass.combine) ItemClass.combine(result, name);
                    i++;
                }
            }
            return result;
        }
    });

    // Append structure items
    for (var name in structure) {
        defineProperty(Class.prototype, name, function (name) {
            return {
                get: function get() {
                    // Get object property
                    return this.items[name] && this.items[name].object;
                },
                set: function set(object) {
                    // Set object property
                    if (object !== undefined) {
                        var ItemClass = this.getItemClass(name, this.items);
                        this.items[name] = new ItemClass(object);
                    } else delete this.items[name];
                },
                configurable: false,
                enumerable: !structure[name].combine
            };
        }(name));
        if (structure[name].combine) structure[name].combine(Class.prototype, name);
    }
    return Class;
};

var ATTRIBUTE = function ATTRIBUTE(structure, typeName, valueName, ownerDafaultType, uniformName) {

    var BaseClass = SEQUENCE(structure, uniformName);

    // Define attribute sequence
    var DEFINE = function DEFINE(typeSet, defaultType) {

        typeName = typeName || 'type';
        valueName = valueName || 'value';
        defaultType = defaultType || ownerDafaultType || ANY;

        var Class = extend(BaseClass, function (object) {
            // Constructor - "matrioshka"
            if (this instanceof Class) {
                // Call super
                BaseClass.apply(this, arguments);
            } else return DEFINE.apply(this, arguments);
        }, {
            getItemClass: function getItemClass(name, items) {
                var ItemClass = structure[name];
                if (valueName === name) {
                    // Define type of value attribute based on type attribute
                    var type,
                        typeId = items && items[typeName];
                    if (typeId) {
                        var id = typeId.object;
                        if (typeSet) {
                            if (typeof typeSet === 'function') type = typeSet(id);else type = typeSet[id];
                        }
                    }
                    type = type || defaultType || ANY;
                    ItemClass = ItemClass === ANY ? type : ItemClass(type);
                }
                return ItemClass;
            }
        });

        // Redefine type property
        defineProperty(Class.prototype, typeName, {
            get: function get() {
                // Get value property of object
                return this.items[typeName] && this.items[typeName].object;
            },
            set: function set() {
                // Can't set type definition property separatery
                assert(true);
            },
            configurable: false,
            enumerable: true
        });

        return Class;
    };

    return DEFINE();
};

var OBJECT_IDENTIFIER = extend(ASN1Object, {
    encode: function encode(format) {
        var object = this.object;
        object = /^(\d+\.)+\d+$/.test(object) ? object : identifiers[object];
        assert(!object);
        return _encode(format, object, 0x06);
    }
}, {
    decode: function decode(source) {
        var object = _decode(source, 0x06);
        return new this(names[object] || object);
    }
});

var IMPLICIT = function IMPLICIT(Class) {
    Class = Class || ANY;
    // Add constracted tag
    return extend(Class, {
        encode: function encode(format) {
            // Format encoding without CTX header
            var source = Class.method('encode').call(this, format);
            if (typeof source === 'string' || source instanceof CryptoOperationData) return source;
            if (source.tagNumber !== 0x04 && source.tagClass === 0 && !(source.object instanceof Array))
                // Encode primitive source
                return { object: BER.encode(source, 'DER', true) };else return { object: source.object };
        }
    }, {
        decode: function decode(source) {
            if (typeof source === 'string' || source instanceof CryptoOperationData) {
                return Class.decode.call(this, source);
            } else {
                source = {
                    object: source.object,
                    header: source.header,
                    content: source.content
                };
                return Class.decode.call(this, source);
            }
        }
    });
};

var EXPLICIT = function EXPLICIT(Class) {
    Class = Class || ANY;
    // Add constracted tag
    return extend(Class, {
        encode: function encode(format) {
            // Format encoding without CTX header
            var source = Class.method('encode').call(this, format);
            if (typeof source === 'string' || source instanceof CryptoOperationData) return source;
            return { object: [source] };
        }
    }, {
        decode: function decode(source) {
            if (typeof source === 'string' || source instanceof CryptoOperationData) {
                return Class.decode.call(this, source);
            } else return Class.decode.call(this, source.object[0]);
        }
    });
};

var CTX = function CTX(number, ContentClass) {
    function CTX() {
        ContentClass.apply(this, arguments);
    }

    // Create CTX number class with wrapped content class
    return extend(ContentClass, CTX, {
        encode: function encode(format) {
            var source = ContentClass.method('encode').call(this, format);
            if (typeof source === 'string' || source instanceof CryptoOperationData) return source;
            source.tagNumber = number;
            source.tagClass = 0x02;
            source.tagConstructed = source.object instanceof Array;
            return source;
        }
    }, {
        decode: function decode(source) {
            // Format decoding without CTX
            assert(source.tagNumber !== undefined && (source.tagClass !== 0x02 || source.tagNumber !== number));
            return ContentClass.decode.call(this, source);
        }
    });
};

var ARRAY_OF = function ARRAY_OF(tagNumber) {

    return function (ItemClassDef, typeAndValue) {
        // Difininition of item class
        ItemClassDef = ItemClassDef || ANY;

        // Metaclass definition
        var DEFINE = function DEFINE(typeSet, defaultType) {

            // Define item class
            var ItemClass = typeof ItemClassDef === 'function' && typeSet !== undefined ? ItemClassDef(typeSet, defaultType) : ItemClassDef;

            if (typeAndValue) {
                /**
                 * Create class with type and value structure<br><br>
                 *
                 * SET OF attribute and SEQUENCE OF attribute metaclass
                 *
                 * @class GostASN1.Set
                 * @param {Object} object object value
                 */
                var Class = extend(ASN1Object, function (object) {
                    // Constructor - "matrioshka"
                    if (this instanceof Class) {
                        // Define hidden items property
                        defineProperty(this, 'items', {
                            writable: true,
                            value: {}
                        });
                        // Call super
                        ASN1Object.call(this, object || {});
                    } else return DEFINE.apply(this, arguments);
                }, {
                    object: {
                        get: function get() {
                            // refresh items from object properties
                            this.read();
                            return this;
                        },
                        set: function set(object) {
                            if (object instanceof Class) {
                                object.read();
                                this.items = object.items;
                            } else {
                                // Set other object structure
                                var data = {};
                                for (var id in object) {
                                    var item = object[id];
                                    data[id] = this.createItem(item, id);
                                }
                                this.items = data;
                            }
                            // refresh object properties to items
                            this.reset();
                        }
                    },
                    createItem: function createItem(value, type) {
                        if (typeAndValue) {
                            var object = {};
                            object[typeAndValue.typeName] = type;
                            object[typeAndValue.valueName] = value;
                        } else object = value;
                        return new ItemClass(object);
                    },
                    getItemValue: function getItemValue(id) {
                        var item = this.items[id];
                        return typeAndValue ? item.object[typeAndValue.valueName] : item.object;
                    },
                    setItemValue: function setItemValue(id, value) {
                        var item = this.items[id];
                        if (typeAndValue) item.object[typeAndValue.valueName] = value;else item.object = value;
                    },
                    isItemType: function isItemType(id) {
                        return typeAndValue ? identifiers[id] : !isNaN(parseInt(id));
                    },
                    reset: function reset() {
                        // remove unused properties
                        var items = this.items;
                        for (var id in this) {
                            if (this.hasOwnProperty(id) && !this.items[id] && this.isItemType(id)) delete this[id];
                        } // add new properties
                        for (var id in items) {
                            this[id] = this.getItemValue(id);
                        }
                    },
                    read: function read() {
                        var items = this.items;
                        for (var id in this) {
                            if (this.isItemType(id)) {
                                if (!this.items[id]) {
                                    items[id] = this.createItem(this[id], id);
                                    this[id] = this.getItemValue(id);
                                } else if (this.getItemValue(id) !== this[id]) {
                                    this.setItemValue(id, this[id]);
                                }
                            }
                        }
                    },
                    /**
                     * Encode the object
                     *
                     * @memberOf GostASN1.Set
                     * @instance
                     * @param {string} format Encoding format 'DER', 'CER' or 'PEM'
                     * @returns {FormatedData}
                     */
                    encode: function encode(format) {
                        // refresh items from object properties
                        this.read();
                        // repare source
                        var object = this.items,
                            source = [];
                        for (var id in object) {
                            // console.log(id, object[id], 'encoding...');
                            var encoded = object[id].encode(true);
                            if (encoded !== undefined) source.push(encoded);
                        }
                        return _encode(format, source, tagNumber, 0, true);
                    },
                    /**
                     * Decode the source to self object
                     *
                     * @memberOf GostASN1.Set
                     * @instance
                     * @param {FormatedData} source Encoded data
                     */
                    decode: function decode(source) {
                        this.object = this.constructor.decode(source);
                    },
                    /**
                     * Check the object structure
                     *
                     * @memberOf GostASN1.Set
                     * @instance
                     */
                    check: function check() {
                        this.constructor.decode(this.encode(true));
                    }
                }, {
                    /**
                     * Encode data values with creating object
                     *
                     * @memberOf GostASN1.Set
                     * @static
                     * @param {Object} object Javascript object to encoding
                     * @param {string} format Encoding format 'DER', 'CER' or 'PEM'
                     * @returns {FormatedData}
                     */
                    encode: function encode(object, format) {
                        return new this(object).encode(format);
                    },
                    /**
                     * Decode source and create object
                     *
                     * @memberOf GostASN1.Set
                     * @static
                     * @param {FormatedData} source Encoded data
                     * @returns {GostASN1.Sequence}
                     *
                     */
                    decode: function decode(source) {
                        // Decode structure
                        source = _decode(source, tagNumber, 0, true);
                        var result = new this(),
                            data = result.items = {};
                        for (var i = 0, n = source.length; i < n; i++) {
                            var item = ItemClass.decode(source[i]);
                            var id = typeAndValue ? item.object[typeAndValue.typeName] : i;
                            data[id] = item;
                        }
                        result.reset();
                        return result;
                    }
                });

                return Class;
            } else {
                // Create array class
                var ArrayClass = extend(ASN1Object, function (object) {
                    // Constructor - "matrioshka"
                    if (this instanceof ArrayClass) {
                        // Define hidden items property
                        defineProperties(this, {
                            items: {
                                writable: true,
                                value: []
                            },
                            values: {
                                writable: true,
                                value: []
                            }
                        });
                        // Call super
                        ASN1Object.call(this, object || []);
                    } else return DEFINE.apply(this, arguments);
                }, {
                    object: {
                        get: function get() {
                            // refresh items from object properties
                            this.read();
                            return this.values;
                        },
                        set: function set(object) {
                            if (object instanceof ArrayClass) {
                                object.read();
                                this.items = object.items;
                            } else {
                                // Set other object structure
                                var data = [];
                                for (var i = 0, n = object.length; i < n; i++) {
                                    data[i] = new ItemClass(object[i]);
                                }this.items = data;
                            }
                            // refresh object properties to items
                            this.reset();
                        }
                    },
                    encode: function encode(format) {
                        // refresh items from object properties
                        this.read();
                        // repare source
                        var data = this.items,
                            source = [];
                        for (var i = 0, n = data.length; i < n; i++) {
                            var encoded = data[i].encode(true);
                            if (encoded !== undefined) source.push(encoded);
                        }
                        return _encode(format, source, tagNumber, 0, true);
                    },
                    decode: function decode(source) {
                        this.object = this.constructor.decode(source);
                    },
                    check: function check() {
                        this.constructor.decode(this.encode(true));
                    },
                    reset: function reset() {
                        // remove unused properties
                        for (var i = 0, n = this.items.length; i < n; i++) {
                            this.values.push(this.items[i].object);
                        }
                    },
                    read: function read() {
                        var items = this.items,
                            values = this.values;
                        for (var i = 0, n = values.length; i < n; i++) {
                            if (!this.items[i]) {
                                items[i] = new ItemClass(values[i]);
                                values[i] = items[i].object;
                            } else if (items[i].object !== values[i]) items[i].object = values[i];
                        }
                    }
                }, {
                    encode: function encode(object, format) {
                        return new this(object).encode(format);
                    },
                    decode: function decode(source) {
                        source = _decode(source, tagNumber, 0, true);
                        var result = new this();
                        result.items = [];
                        for (var i = 0, n = source.length; i < n; i++) {
                            result.items.push(ItemClass.decode(source[i]));
                        }result.reset();
                        return result;
                    }
                });

                return ArrayClass;
            }
        };
        return DEFINE(); // Create simple class w/o any parameters
    };
};

var SEQUENCE_OF = ARRAY_OF(0x10);

var SET_OF = ARRAY_OF(0x11);

var ENCLOSURE = function ENCLOSURE(BaseClass, modifier) {
    if (modifier) {
        var Class = extend(ASN1Object, {
            object: {
                get: function get() {
                    if (this.item) return modifier.decode(this.item.object);else return undefined;
                },
                set: function set(object) {
                    if (object !== undefined) this.item = new BaseClass(modifier.encode(object));else delete this.item;
                }
            },
            encode: function encode(format) {
                return this.item.encode(format);
            }
        }, {
            decode: function decode(source) {
                var result = new this();
                result.item = BaseClass.decode(source);
                return result;
            }
        });
        for (var name in BaseClass) {
            if (!Class[name]) Class[name] = BaseClass[name];
        }return Class;
    } else return BaseClass;
};

var SET_OF_SINGLE = function SET_OF_SINGLE(ItemClass) {

    var Class = ENCLOSURE(SET_OF(ItemClass), {
        encode: function encode(item) {
            return [item];
        },
        decode: function decode(item) {
            return item[0];
        }
    });
    return Class;
};

var CHOICE = function CHOICE(structure, define) {

    return extend(ASN1Object, {
        object: {
            get: function get() {
                return this.item && this.item.object;
            },
            set: function set(object) {
                // Try to find appropriate type in structure
                if (object instanceof ASN1Object) {
                    for (var name in structure) {
                        if (object instanceof structure[name]) {
                            this.item = object;
                            return;
                        }
                    }
                }
                // Define class
                var name = typeof define === 'function' ? define(object) : define;
                assert(!name || !structure[name]);
                object = new structure[name](object);
                this.item = object;
            }
        },
        encode: function encode(format) {
            // Already in class
            return this.item.encode(format);
        }
    }, {
        decode: function decode(source) {
            // Try to find class structure
            for (var name in structure) {
                try {
                    var item = structure[name].decode(source);
                    if (item !== undefined) return new this(item);
                } catch (e) {}
            }
            assert(true);
        }
    });
};

var ENCAPSULATES = function ENCAPSULATES(WrappedClass) {
    WrappedClass = WrappedClass || ANY;
    // BER Encode/Decode values
    return extend(WrappedClass, {
        encode: function encode() {
            return BER.encode(WrappedClass.method('encode').call(this, true));
        }
    }, {
        encode: function encode(object, format) {
            return new this(object).encode(format);
        },
        decode: function decode(source) {
            return WrappedClass.decode.call(this, BER.decode(source));
        }
    });
};

var DEFAULT = function DEFAULT(Class, optional) {
    Class = Class || ANY;
    return extend(Class, {
        encode: function encode(format) {
            if (this.object === optional) return undefined;
            return Class.method('encode').call(this, format);
        }
    }, {
        decode: function decode(source) {
            if (source === undefined) return new this(optional);else try {
                return Class.decode.call(this, source);
            } catch (e) {
                return undefined;
            }
        }
    });
};

var OPTIONAL = function OPTIONAL(Class) {
    Class = Class || ANY;
    return extend(Class, {}, {
        decode: function decode(source) {
            if (source === undefined) return undefined;else try {
                return Class.decode.call(this, source);
            } catch (e) {
                return undefined;
            }
        }
    });
};

var DEFAULT_NULL = function DEFAULT_NULL(Class, optional) {
    Class = Class || ANY;
    return extend(Class, {
        encode: function encode(format) {
            if (this.object === optional) return new NULL(null).encode(format);
            return Class.method('encode').call(this, format);
        }
    }, {
        decode: function decode(source) {
            if (source === undefined) return undefined;else if (source === null || source.tagNumber === 0x05 && source.tagClass === 0) return new this(optional);else try {
                return Class.decode.call(this, source);
            } catch (e) {
                return undefined;
            }
        }
    });
};

// </editor-fold>

/*
     * Certificate Version, Name, Attributes, Validity
     *
     * http://tools.ietf.org/html/rfc5280
     *
     */ // <editor-fold defaultstate="collapsed">

var DirectoryString = CHOICE({
    teletexString: TeletexString,
    printableString: PrintableString,
    universalString: UniversalString,
    utf8String: UTF8String,
    bmpString: BMPString,
    numericString: NumericString
}, function (value) {
    // PrintableString - for characters and symbols with no spaces, overrise UTF8String
    return (/^[A-Za-z0-9\.@\+\-\:\=\\\/\?\!\#\$\%\^\&\*\(\)\[\]\{\}\>\<\|\~]*$/.test(value) ? 'printableString' : 'utf8String'
    );
});

var Time = CHOICE({
    utcTime: UTCTime,
    generalTime: GeneralizedTime
}, function (value) {
    return value.getYear() >= 2050 ? 'generalTime' : 'utcTime';
});

// Attribute
var AttributeType = OBJECT_IDENTIFIER;

var AttributeValue = ANY;

var AttributeTypeAndValue = ATTRIBUTE({
    type: AttributeType,
    value: AttributeValue
});

var typeAndValue = {
    typeName: 'type',
    valueName: 'value'
};

/**
 * X.501 type Name
 * The Name describes a hierarchical name composed of attributes, such
 * as country name, and corresponding values, such as US.  The type of
 * the component AttributeValue is determined by the AttributeType; in
 * general it will be a DirectoryString.

 * The DirectoryString type is defined as a choice of PrintableString,
 * TeletexString, BMPString, UTF8String, and UniversalString.  The
 * UTF8String encoding [RFC 2279] is the preferred encoding, and all
 * certificates issued after December 31, 2003 MUST use the UTF8String
 * encoding of DirectoryString.
 *
 * Standard sets of attributes have been defined in the X.500 series of
 * specifications [X.520].  Implementations of this specification MUST
 * be prepared to receive the following standard attribute types in
 * issuer and subject (section 4.1.2.6) names:
 *  <ul>
 *      <li>country,</li>
 *      <li>organization,</li>
 *      <li>organizational-unit,</li>
 *      <li>distinguished name qualifier,</li>
 *      <li>state or province name,</li>
 *      <li>common name (e.g., "Susan Housley"), and</li>
 *      <li>serial number.</li>
 *  </ul>
 * In addition, implementations of this specification SHOULD be prepared
 * to receive the following standard attribute types in issuer and
 * subject names:
 *  <ul>
 *      <li>locality,</li>
 *      <li>title,</li>
 *      <li>surname,</li>
 *      <li>given name,</li>
 *      <li>initials,</li>
 *      <li>pseudonym, and</li>
 *      <li>generation qualifier (e.g., "Jr.", "3rd", or "IV").</li>
 *  </ul>
 The syntax for type Name:
 *  <pre>
 *  Name ::= CHOICE {
     *    rdnSequence RDNSequence }
 *
 *  RDNSequence ::= SEQUENCE OF RelativeDistinguishedName
 *
 *  RelativeDistinguishedName ::=
 *    SET OF AttributeTypeAndValue
 *
 *  AttributeTypeAndValue ::= SEQUENCE {
     *    type     AttributeType,
     *    value    AttributeValue }
 *
 *  AttributeType ::= OBJECT IDENTIFIER
 *
 *  AttributeValue ::= ANY DEFINED BY AttributeType
 *
 *  DirectoryString ::= CHOICE {
     *        teletexString           TeletexString (SIZE (1..MAX)),
     *        printableString         PrintableString (SIZE (1..MAX)),
     *        universalString         UniversalString (SIZE (1..MAX)),
     *        utf8String              UTF8String (SIZE (1..MAX)),
     *        bmpString               BMPString (SIZE (1..MAX)) }
 *  </pre>
 * @class GostASN1.Name
 */
var RelativeDistinguishedName = SET_OF_SINGLE(AttributeTypeAndValue({
    serialName: PrintableString,
    countryName: PrintableString,
    dnQualifier: PrintableString,
    emailAddress: IA5String,
    domainComponent: IA5String,
    SNILS: NumericString,
    OGRN: NumericString,
    INN: NumericString
}, DirectoryString));

var RDNSequence = SEQUENCE_OF(RelativeDistinguishedName, typeAndValue)();

var Name = CHOICE({
    // only one possibility for now
    rdnSequence: RDNSequence
}, 'rdnSequence');

/**
 * Validity
 * @class GostASN1.Validity
 * @extends GostASN1.Sequence
 */
var Validity = COMBINE(SEQUENCE({
    notBefore: Time,
    notAfter: Time
}));

var Version = INTEGER;

var Attribute = ATTRIBUTE({
    type: OBJECT_IDENTIFIER,
    value: ANY
});

/**
 * Type and Value Attributes <br>
 *
 * Suggested naming attributes: Definition of the following
 * information object set may be augmented to meet local
 * requirements.  Note that deleting members of the set may
 * prevent interoperability with conforming implementations.
 * presented in pairs: the AttributeType followed by the type
 * definition for the corresponding AttributeValue
 *
 * @class GostASN1.Attributes
 * @extends GostASN1.Set
 */
var Attributes = SET_OF(Attribute, typeAndValue);

var AttributeSequence = SEQUENCE_OF(Attribute, typeAndValue);
// </editor-fold>

/*
     * Algorithm identifiers
     *
     * http://tools.ietf.org/html/rfc3279
     * http://tools.ietf.org/html/rfc4357
     * http://tools.ietf.org/html/rfc2898
     *
     */ // <editor-fold defaultstate="collapsed">

var FieldElement = INTEGER;
var Curve = SEQUENCE({
    a: FieldElement,
    b: FieldElement,
    seed: OPTIONAL(BIT_STRING)
});

var ECPoint = OCTET_STRING(extend(ASN1Object, {
    encode: function encode() {
        var value = this.object;
        var len = Math.max(npw2(value.x.length - 2), npw2(value.y.length - 2)) / 2,
            r = new Uint8Array(2 * len + 1);
        r[0] = 0x04;
        r.set(new Uint8Array(SInt.decode(value.x, false, len)), 1); // x
        r.set(new Uint8Array(SInt.decode(value.y, false, len)), len + 1); // y
        return r.buffer;
    }
}, {
    decode: function decode(value) {
        var len = (value.byteLength - 1) / 2;
        return new this({
            x: SInt.encode(new Uint8Array(value, 1, len)),
            y: SInt.encode(new Uint8Array(value, len + 1, len))
        });
    }
}));

var FieldID = SEQUENCE({
    fieldType: OBJECT_IDENTIFIER,
    parameters: INTEGER
});

var ECParameters = SEQUENCE({
    version: Version, // version is always 1
    fieldID: FieldID, // identifies the finite field over which the curve is defined
    curve: Curve, // coefficients a and b of the elliptic curve
    base: ECPoint, // specifies the base point P on the elliptic curve
    order: INTEGER, // the order n of the base point
    cofactor: OPTIONAL(INTEGER)
}); // The integer h = #E(Fq)/n

var GostR3410Parameters = SEQUENCE({
    publicKeyParamSet: OBJECT_IDENTIFIER,
    digestParamSet: OBJECT_IDENTIFIER,
    encryptionParamSet: OPTIONAL(OBJECT_IDENTIFIER)
});

var GostR3411Parameters = DEFAULT_NULL(OBJECT_IDENTIFIER, 'id-GostR3411-94-CryptoProParamSet');

var ECDHParameters = CHOICE({
    namedParameters: OBJECT_IDENTIFIER,
    ecParameters: ECParameters,
    implicitly: OPTIONAL(NULL)
}, function (value) {
    return typeof value === 'string' || value instanceof String ? 'namedParameters' : 'ecParameters';
});

var Algorithm = function Algorithm(paramType, modifier) {
    return ENCLOSURE(SEQUENCE({
        algorithm: OBJECT_IDENTIFIER,
        parameters: OPTIONAL(paramType)
    }), modifier);
};

var AlgorithmIdentifier = function () {

    var DefaultAlgorithm = Algorithm(ANY),
        Class = extend(ASN1Object, function (object) {
        if (this instanceof Class) Class.super.apply(this, arguments);else return DEFINE(object);
    }, {
        encode: function encode(format) {
            return new DefaultAlgorithm(this.object).encode(format);
        }
    }, {
        decode: function decode(source) {
            return new this(DefaultAlgorithm.decode(source).object);
        }
    });

    var DEFINE = function DEFINE(algorithmSet) {

        return extend(ASN1Object, {
            object: {
                get: function get() {
                    if (this.item) return this.item.object;else return undefined;
                },
                set: function set(object) {
                    if (object) {
                        var ItemClass = algorithmSet[object.id];
                        if (!ItemClass) throw new Error('Algorithm not supported');
                        this.item = new ItemClass(object);
                    } else delete this.item;
                }
            },
            encode: function encode(format) {
                return this.item.encode(format);
            }
        }, {
            decode: function decode(source) {
                // Decode PEM
                if (typeof source === 'string') source = PEM.decode(source, undefined, false);
                // Decode binary data
                if (source instanceof CryptoOperationData) source = BER.decode(source);
                var ItemClass = algorithmSet[names[source.object[0].object]];
                if (ItemClass) {
                    var result = new this();
                    result.item = ItemClass.decode(source);
                    return result;
                } else throw new Error('Algorithm not supported');
            }
        });
    };

    return Class;
}();

var ECDHKeyAlgorithm = Algorithm(ECDHParameters, {
    encode: function encode(value) {
        var params;
        if (typeof value.namedCurve === 'string') params = attributes['namedCurve'][value.namedCurve];else params = {
            version: 1,
            fieldID: {
                fieldType: 'id-prime-Field',
                parameters: value.curve.p
            },
            curve: {
                a: value.curve.a,
                b: value.curve.b
            },
            base: {
                x: value.curve.x,
                y: value.curve.y
            },
            order: value.curve.q,
            cofactor: 1
        };
        return {
            algorithm: value.id,
            parameters: params
        };
    },
    decode: function decode(value) {
        var params = value.parameters,
            result = algorithms[value.algorithm];
        if (typeof params === 'string' || params instanceof String) {
            result = (0, _helpers.expand)(result, parameters[params]);
        } else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
            result = (0, _helpers.expand)(result, {
                curve: {
                    p: params.fieldID.parameters,
                    a: params.curve.a,
                    b: params.curve.b,
                    x: params.base.x,
                    y: params.base.y,
                    q: params.order
                }
            });
        } else throw new DataError('Invalid key paramters');
        return result;
    }
});

var GostKeyAlgorithm = Algorithm(GostR3410Parameters, {
    encode: function encode(value) {
        var paramName = value.namedCurve ? 'namedCurve' : 'namedParam',
            sBox = value.name.indexOf('-94') >= 0 || value.name.indexOf('-2001') >= 0 || value.version === 1994 || value.version === 2001 ? value.sBox || 'D-A' : value.name.indexOf('-512') >= 0 || value.length === 512 ? 'D-512' : 'D-256';
        return {
            algorithm: value.id,
            parameters: {
                publicKeyParamSet: attributes[paramName][value[paramName]],
                digestParamSet: attributes['sBox'][sBox],
                encryptionParamSet: value.encParams && value.encParams.sBox ? attributes['sBox'][value.encParams.sBox] : undefined
            }
        };
    },
    decode: function decode(value) {
        var params = value.parameters,
            algorithm = (0, _helpers.expand)(algorithms[value.algorithm], parameters[params.publicKeyParamSet], parameters[params.digestParamSet]);
        if (params.encryptionParamSet) algorithm.encParams = parameters[params.encryptionParamSet];
        return algorithm;
    }
});

var AlgorithmWithNoParam = Algorithm(ANY, {
    encode: function encode(value) {
        return { algorithm: value.id };
    },
    decode: function decode(value) {
        return algorithms[value.algorithm];
    }
});

var AlgorithmWithNullParam = Algorithm(NULL, {
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: null
        };
    },
    decode: function decode(value) {
        return algorithms[value.algorithm];
    }
});

var Gost341194DigestAlgorithm = Algorithm(GostR3411Parameters, {
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: attributes['sBox'][value.sBox || value.hash && value.hash.sBox || 'D-A']
        };
    },
    decode: function decode(value) {
        var algorithm = (0, _helpers.expand)(algorithms[value.algorithm]),
            parameter = parameters[value.parameters];
        if (algorithm.hash) algorithm.hash = (0, _helpers.expand)(algorithm.hash, parameter);else algorithm = (0, _helpers.expand)(algorithm, parameter);
        return algorithm;
    }
});

var KeyAlgorithmIdentifier = AlgorithmIdentifier({
    ecdsa: ECDHKeyAlgorithm,
    noSignature: AlgorithmWithNullParam,
    rsaEncryption: AlgorithmWithNullParam,
    'id-sc-gostR3410-2001': ECDHKeyAlgorithm,
    'id-GostR3410-2001': GostKeyAlgorithm,
    'id-GostR3410-94': GostKeyAlgorithm,
    'id-GostR3410-2001DH': GostKeyAlgorithm,
    'id-GostR3410-94DH': GostKeyAlgorithm,
    'id-tc26-gost3410-12-256': GostKeyAlgorithm,
    'id-tc26-gost3410-12-512': GostKeyAlgorithm,
    'id-tc26-agreement-gost-3410-12-256': GostKeyAlgorithm,
    'id-tc26-agreement-gost-3410-12-512': GostKeyAlgorithm,
    'id-sc-gost28147-gfb': AlgorithmWithNoParam,
    'id-Gost28147-89': AlgorithmWithNoParam
});

var SignatureAlgorithmIdentifier = AlgorithmIdentifier({
    noSignature: AlgorithmWithNullParam,
    rsaEncryption: AlgorithmWithNullParam,
    sha1withRSAEncryption: AlgorithmWithNullParam,
    sha256withRSAEncryption: AlgorithmWithNullParam,
    sha384withRSAEncryption: AlgorithmWithNullParam,
    sha512withRSAEncryption: AlgorithmWithNullParam,
    'ecdsa': AlgorithmWithNoParam,
    'ecdsa-with-SHA1': AlgorithmWithNoParam,
    'ecdsa-with-SHA256': AlgorithmWithNoParam,
    'ecdsa-with-SHA384': AlgorithmWithNoParam,
    'ecdsa-with-SHA512': AlgorithmWithNoParam,
    'id-GostR3410-94': AlgorithmWithNullParam,
    'id-GostR3410-2001': AlgorithmWithNullParam,
    'id-GostR3411-94-with-GostR3410-2001': AlgorithmWithNoParam,
    'id-GostR3411-94-with-GostR3410-94': AlgorithmWithNoParam,
    'id-tc26-gost3410-12-256': AlgorithmWithNullParam,
    'id-tc26-gost3410-12-512': AlgorithmWithNullParam,
    'id-tc26-signwithdigest-gost3410-12-94': AlgorithmWithNoParam,
    'id-tc26-signwithdigest-gost3410-12-256': AlgorithmWithNoParam,
    'id-tc26-signwithdigest-gost3410-12-512': AlgorithmWithNoParam,
    'id-sc-gostR3410-94': AlgorithmWithNullParam,
    'id-sc-gostR3410-2001': AlgorithmWithNullParam,
    'id-sc-gostR3411-94-with-gostR3410-94': AlgorithmWithNullParam,
    'id-sc-gostR3411-94-with-gostR3410-2001': AlgorithmWithNullParam
});

var DigestAlgorithmIdentifier = AlgorithmIdentifier({
    sha1: AlgorithmWithNoParam,
    sha256: AlgorithmWithNullParam,
    sha384: AlgorithmWithNullParam,
    sha512: AlgorithmWithNullParam,
    'id-GostR3411-94': Gost341194DigestAlgorithm,
    'id-tc26-gost3411-94': Gost341194DigestAlgorithm,
    'id-tc26-gost3411-12-256': AlgorithmWithNullParam,
    'id-tc26-gost3411-12-512': AlgorithmWithNullParam,
    'id-sc-gostR3411-94': AlgorithmWithNoParam
});

var Gost2814789Key = OCTET_STRING; //(SIZE (32))

var Gost2814789MAC = OCTET_STRING; // (SIZE (1..4))

var Gost2814789ParamSet = OBJECT_IDENTIFIER;

var Gost2814789IV = OCTET_STRING; // (SIZE (8))

var Gost2814789Parameters = SEQUENCE({
    iv: Gost2814789IV,
    encryptionParamSet: Gost2814789ParamSet
});

var Gost2814789KeyWrapParameters = SEQUENCE({
    encryptionParamSet: Gost2814789ParamSet,
    ukm: OPTIONAL(OCTET_STRING)
}); // (SIZE (8)) must be absent in key agreement

var Gost2814789Algorithm = Algorithm(Gost2814789Parameters, {
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: {
                iv: value.iv,
                encryptionParamSet: attributes['sBox'][value.sBox || 'E-A']
            }
        };
    },
    decode: function decode(value) {
        var algorithm = (0, _helpers.expand)(algorithms[value.algorithm], parameters[value.parameters.encryptionParamSet]);
        algorithm.iv = value.parameters.iv;
        return algorithm;
    }
});

var SCGostAlgorithm = Algorithm(Gost2814789IV, {
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: value.iv
        };
    },
    decode: function decode(value) {
        var algorithm = (0, _helpers.expand)(algorithms[value.algorithm]);
        algorithm.iv = value.parameters || new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
        return algorithm;
    }
});

var GostKeyWrapAlgorithm = Algorithm(Gost2814789KeyWrapParameters, {
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: {
                encryptionParamSet: attributes['sBox'][value.sBox || 'E-A'],
                ukm: value.ukm
            }
        };
    },
    decode: function decode(value) {
        var algorithm = (0, _helpers.expand)(algorithms[value.algorithm], parameters[value.parameters.encryptionParamSet]);
        if (value.parameters.ukm) algorithm.ukm = value.parameters.ukm;
        return algorithm;
    }
});

var KeyWrapAlgorithmIdentifier = AlgorithmIdentifier({
    'id-Gost28147-89-None-KeyWrap': GostKeyWrapAlgorithm,
    'id-Gost28147-89-CryptoPro-KeyWrap': GostKeyWrapAlgorithm
});

var GostKeyAgreementAlgorithm = Algorithm(KeyWrapAlgorithmIdentifier, {
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: value.wrapping
        };
    },
    decode: function decode(value) {
        var algorithm = (0, _helpers.expand)(algorithms[value.algorithm]);
        algorithm.wrapping = value.parameters;
        return algorithm;
    }
});

var BaseEncryptionAlgorithmIdentifier = AlgorithmIdentifier({
    'id-sc-gost28147-gfb': SCGostAlgorithm,
    'id-Gost28147-89': Gost2814789Algorithm
});

var MessageAuthenticationCodeAlgorithm = AlgorithmIdentifier({
    'id-Gost28147-89-MAC': Gost2814789Parameters,
    'id-HMACGostR3411-94': Gost341194DigestAlgorithm,
    'id-tc26-hmac-gost-3411-12-256': Gost341194DigestAlgorithm,
    'id-tc26-hmac-gost-3411-12-512': Gost341194DigestAlgorithm,
    'hmacWithSHA1': AlgorithmWithNoParam,
    'hmacWithSHA224': AlgorithmWithNoParam,
    'hmacWithSHA256': AlgorithmWithNoParam,
    'hmacWithSHA384': AlgorithmWithNoParam,
    'hmacWithSHA512': AlgorithmWithNoParam,
    'id-sc-gost28147-mac': AlgorithmWithNoParam,
    'id-sc-hmacWithGostR3411': AlgorithmWithNoParam
});

// rfc2898 PKCS #5: Password-Based Cryptography Specification
// PBKDF2
var PBKDF2params = SEQUENCE({
    salt: CHOICE({
        specified: OCTET_STRING,
        otherSource: AlgorithmIdentifier
    }, function (value) {
        return isBinary(value) ? 'specified' : 'otherSource';
    }),
    iterationCount: INTEGER,
    keyLength: OPTIONAL(INTEGER),
    prf: MessageAuthenticationCodeAlgorithm
});

var PBKDF2Algorithm = Algorithm(PBKDF2params, {
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: {
                salt: value.salt,
                iterationCount: value.iterations,
                prf: value.hmac
            }
        };
    },
    decode: function decode(value) {
        var algorithm = (0, _helpers.expand)(algorithms[value.algorithm]);
        algorithm.salt = value.parameters.salt;
        algorithm.iterations = value.parameters.iterationCount;
        algorithm.hmac = value.parameters.prf;
        algorithm.hash = algorithm.hmac.hash;
        return algorithm;
    }
});

var KeyDerivationAlgorithmIdentifier = AlgorithmIdentifier({
    'PBKDF2': PBKDF2Algorithm
});

var PBEParameter = SEQUENCE({
    salt: OCTET_STRING,
    iterationCount: INTEGER
});

var PBES1Algorithm = Algorithm(PBEParameter, {
    paramType: PBEParameter,
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: {
                salt: value.derivation.salt,
                iterationCount: value.derivation.iterations
            }
        };
    },
    decode: function decode(value) {
        var algorithm = (0, _helpers.expand)(algorithms[value.algorithm]);
        algorithm.derivation = (0, _helpers.expand)(algorithm.derivation, { salt: value.parameters.salt, iterations: value.parameters.iterationCount });
        return algorithm;
    }
});

// PBES2
var PBES2params = SEQUENCE({
    keyDerivationFunc: KeyDerivationAlgorithmIdentifier, // {{PBES2-KDFs}},
    encryptionScheme: BaseEncryptionAlgorithmIdentifier
}); // {{PBES2-Encs}}

var PBES2Algorithm = Algorithm(PBES2params, {
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: {
                keyDerivationFunc: value.derivation,
                encryptionScheme: value.encryption
            }
        };
    },
    decode: function decode(value) {
        var algorithm = (0, _helpers.expand)(algorithms[value.algorithm]);
        algorithm.derivation = value.parameters.keyDerivationFunc;
        algorithm.encryption = value.parameters.encryptionScheme;
        return algorithm;
    }
});

var PasswordEncryptionAlgorithmIndentifier = AlgorithmIdentifier({
    // PBES1
    'pbeWithSHAAndAES128-CBC': PBES1Algorithm,
    'pbeWithSHAAndAES192-CBC': PBES1Algorithm,
    'pbeWithSHAAndAES256-CBC': PBES1Algorithm,
    'pbeWithSHA256AndAES128-CBC': PBES1Algorithm,
    'pbeWithSHA256AndAES192-CBC': PBES1Algorithm,
    'pbeWithSHA256AndAES256-CBC': PBES1Algorithm,
    'id-sc-pbeWithGost3411AndGost28147': PBES1Algorithm,
    'id-sc-pbeWithGost3411AndGost28147CFB': PBES1Algorithm,
    // PKCS12 PBES1
    'pbeWithSHAAnd3-KeyTripleDES-CBC': PBES1Algorithm,
    'pbeWithSHAAnd2-KeyTripleDES-CBC': PBES1Algorithm,
    'pbeWithSHAAnd128BitRC2-CBC': PBES1Algorithm,
    'pbeWithSHAAnd40BitRC2-CBC': PBES1Algorithm,
    'pbeUnknownGost': PBES1Algorithm,
    // PBES2
    'PBES2': PBES2Algorithm
});

var KeyEncryptionAlgorithmIdentifier = AlgorithmIdentifier({
    ecdsa: ECDHKeyAlgorithm,
    rsaEncryption: AlgorithmWithNullParam,
    // Base encryption
    'id-sc-gost28147-gfb': SCGostAlgorithm,
    'id-Gost28147-89': Gost2814789Algorithm,
    // Key transport algorithms
    'id-sc-gostR3410-2001': ECDHKeyAlgorithm,
    'id-GostR3410-2001': GostKeyAlgorithm,
    'id-GostR3410-94': GostKeyAlgorithm,
    'id-tc26-gost3410-12-256': GostKeyAlgorithm,
    'id-tc26-gost3410-12-512': GostKeyAlgorithm,
    // Key agreement algorithms
    'id-GostR3410-94-CryptoPro-ESDH': GostKeyAgreementAlgorithm,
    'id-GostR3410-2001-CryptoPro-ESDH': GostKeyAgreementAlgorithm,
    'id-tc26-agreement-gost-3410-12-256': GostKeyAgreementAlgorithm,
    'id-tc26-agreement-gost-3410-12-512': GostKeyAgreementAlgorithm,
    'id-sc-r3410-ESDH-r3411kdf': AlgorithmWithNullParam,
    // Key encryption key algorithms
    'id-Gost28147-89-None-KeyWrap': GostKeyWrapAlgorithm, // Add ukm to algorithm
    'id-Gost28147-89-CryptoPro-KeyWrap': GostKeyWrapAlgorithm,
    'id-sc-cmsGostWrap': AlgorithmWithNoParam, // SC don't use ukm
    'id-sc-cmsGost28147Wrap': AlgorithmWithNoParam,
    // Password based encryption
    'pbeWithSHAAndAES128-CBC': PBES1Algorithm,
    'pbeWithSHAAndAES192-CBC': PBES1Algorithm,
    'pbeWithSHAAndAES256-CBC': PBES1Algorithm,
    'pbeWithSHA256AndAES128-CBC': PBES1Algorithm,
    'pbeWithSHA256AndAES192-CBC': PBES1Algorithm,
    'pbeWithSHA256AndAES256-CBC': PBES1Algorithm,
    'id-sc-pbeWithGost3411AndGost28147': PBES1Algorithm,
    'id-sc-pbeWithGost3411AndGost28147CFB': PBES1Algorithm,
    // PKCS12 PBES1
    'pbeWithSHAAnd3-KeyTripleDES-CBC': PBES1Algorithm,
    'pbeWithSHAAnd2-KeyTripleDES-CBC': PBES1Algorithm,
    'pbeWithSHAAnd128BitRC2-CBC': PBES1Algorithm,
    'pbeWithSHAAnd40BitRC2-CBC': PBES1Algorithm,
    'pbeUnknownGost': PBES1Algorithm,
    // PBES2
    'PBES2': PBES2Algorithm
});

var PBMAC1params = SEQUENCE({
    keyDerivationFunc: KeyDerivationAlgorithmIdentifier, // {{PBMAC1-KDFs}},
    messageAuthScheme: MessageAuthenticationCodeAlgorithm
}); // {{PBMAC1-MACs}}

var PasswordMACAlgorithm = Algorithm(PBMAC1params, {
    encode: function encode(value) {
        return {
            algorithm: value.id,
            parameters: {
                keyDerivationFunc: value.derivation,
                messageAuthScheme: value.hmac
            }
        };
    },
    decode: function decode(value) {
        var algorithm = (0, _helpers.expand)(algorithms[value.algorithm]);
        algorithm.derivation = value.parameters.keyDerivationFunc;
        algorithm.hmac = value.parameters.messageAuthScheme;
        return algorithm;
    }
});

var PasswordMACAlgorithmIdentifier = AlgorithmIdentifier({
    'PBMAC1': PasswordMACAlgorithm
});

var ContentEncryptionAlgorithmIdentifier = AlgorithmIdentifier({
    // Base encryption
    'id-sc-gost28147-gfb': SCGostAlgorithm,
    'id-Gost28147-89': Gost2814789Algorithm,
    // Password based encryption
    'pbeWithSHAAndAES128-CBC': PBES1Algorithm,
    'pbeWithSHAAndAES192-CBC': PBES1Algorithm,
    'pbeWithSHAAndAES256-CBC': PBES1Algorithm,
    'pbeWithSHA256AndAES128-CBC': PBES1Algorithm,
    'pbeWithSHA256AndAES192-CBC': PBES1Algorithm,
    'pbeWithSHA256AndAES256-CBC': PBES1Algorithm,
    'id-sc-pbeWithGost3411AndGost28147': PBES1Algorithm,
    'id-sc-pbeWithGost3411AndGost28147CFB': PBES1Algorithm,
    // PKCS12 PBES1
    'pbeWithSHAAnd3-KeyTripleDES-CBC': PBES1Algorithm,
    'pbeWithSHAAnd2-KeyTripleDES-CBC': PBES1Algorithm,
    'pbeWithSHAAnd128BitRC2-CBC': PBES1Algorithm,
    'pbeWithSHAAnd40BitRC2-CBC': PBES1Algorithm,
    'pbeUnknownGost': PBES1Algorithm,
    // PBES2
    'PBES2': PBES2Algorithm
});

// </editor-fold>

/*
     * Public Key Info
     *
     * http://tools.ietf.org/html/rfc5280
     *
     */ // <editor-fold defaultstate="collapsed">

var KeyData = ENCLOSURE;

var DHPublicKey = KeyData(BIT_STRING(ENCAPSULATES(INTEGER)), {
    encode: function encode(value) {
        return Int16.encode(swapBytes(value));
    },
    decode: function decode(value) {
        return swapBytes(Int16.decode(value));
    }
});

var ECDHPublicKey = KeyData(BIT_STRING(ENCAPSULATES(OCTET_STRING)), {
    encode: function encode(value) {
        var r = new Uint8Array(value.byteLength + 1),
            d = swapBytes(value),
            len = value.byteLength / 2;
        r[0] = 0x04; // type hex;
        r.set(new Uint8Array(d, len, len), 1); // x
        r.set(new Uint8Array(d, 0, len), len + 1); // y
        return r.buffer;
    },
    decode: function decode(value) {
        assert((value.byteLength & 1) === 0);
        var d = new Uint8Array(value.byteLength - 1),
            len = d.byteLength / 2;
        d.set(new Uint8Array(value, len + 1, len), 0); // y
        d.set(new Uint8Array(value, 1, len), len); // x
        return swapBytes(d);
    }
});

var GostR3410PublicKey = BIT_STRING(ENCAPSULATES(OCTET_STRING));

/**
 * Subject Public Key Info Syntax X.509
 * <pre>
 *  SubjectPublicKeyInfo  ::=  SEQUENCE  {
     *      algorithm            AlgorithmIdentifier,
     *      subjectPublicKey     BIT STRING  }
 *
 *  AlgorithmIdentifier  ::=  SEQUENCE  {
     *      algorithm               OBJECT IDENTIFIER,
     *      parameters              ANY DEFINED BY algorithm OPTIONAL  }
 -- contains a value of the type
 -- registered for use with the
 -- algorithm object identifier value
 * </pre>
 * RFC 5280 references {@link http://tools.ietf.org/html/rfc5280}
 * @class GostASN1.SubjectPublicKeyInfo
 * @extends GostASN1.Sequence
 * @property {AlgorithmIdentifier} algorithm Identifies the public-key algorithm.
 * @property {CryptoOperationData} subjectPublicKey An binary data whose contents are the value of the public key
 */
var SubjectPublicKeyInfo = SEQUENCE({
    algorithm: KeyAlgorithmIdentifier,
    subjectPublicKey: BIT_STRING
}, 'PUBLIC KEY');

var GostSubjectPublicKeyInfo = function (PKTypes) {

    /**
     * Coding methods for {@link Algorithm} and {@link GostASN1.SubjectPublicKeyInfo}
     * Supported types for GOST algorithms:
     * <pre>
     *  {
         *      'id-sc-gostR3410-2001': ECDHPublicKey,
         *      'id-sc-gostR3410-94': DHPublicKey,
         *      'id-GostR3410-2001': GostR3410PublicKey,
         *      'id-GostR3410-94': GostR3410PublicKey,
         *      'id-tc26-gost3410-12-256': GostR3410PublicKey,
         *      'id-tc26-gost3410-12-512': GostR3410PublicKey
         *  }
     * </pre>
     *
     * @class GostASN1.GostSubjectPublicKeyInfo
     * @extends GostASN1.SubjectPublicKeyInfo
     * @extends Key
     */
    return ENCLOSURE(ATTRIBUTE({
        algorithm: KeyAlgorithmIdentifier,
        subjectPublicKey: ANY
    }, 'algorithm', 'subjectPublicKey')(function (algorithm) {
        return PKTypes[algorithm.id];
    }), {
        encode: function encode(value) {
            return {
                algorithm: value.algorithm,
                subjectPublicKey: value.buffer
            };
        },
        decode: function decode(value) {
            return {
                algorithm: value.algorithm,
                type: 'public',
                extractable: true,
                usages: ['verify', 'deriveKey', 'deriveBits'],
                buffer: value.subjectPublicKey
            };
        }
    });
}({
    'id-sc-gostR3410-2001': ECDHPublicKey,
    'id-sc-gostR3410-94': DHPublicKey,
    'id-GostR3410-2001': GostR3410PublicKey,
    'id-GostR3410-94': GostR3410PublicKey,
    'id-tc26-gost3410-12-256': GostR3410PublicKey,
    'id-tc26-gost3410-12-512': GostR3410PublicKey
});
// </editor-fold>

/*
     * Private Key Info PKCS#8
     *
     * http://tools.ietf.org/html/rfc5208
     *
     */ // <editor-fold defaultstate="collapsed">

var PrivateKey = OCTET_STRING;

var DHPrivateKey = KeyData(PrivateKey(ENCAPSULATES(INTEGER)), {
    encode: function encode(value) {
        // for SignalCom INTEGER d
        return SInt.encode(value, true);
    },
    decode: function decode(value) {
        return SInt.decode(value, true);
    }
});

var GostR3410KeyValueMask = OCTET_STRING;

var GostR3410KeyValueInfo = SEQUENCE({
    keyValueMask: GostR3410KeyValueMask,
    keyValyePublicKey: OCTET_STRING
});

var GostR3410PrivateKey = CHOICE({
    privateKey: PrivateKey(ENCAPSULATES(CHOICE({
        keyValueMask: GostR3410KeyValueMask,
        keyValueInfo: GostR3410KeyValueInfo
    }, function (value) {
        if (isBinary(value)) return 'keyValueMask';else return 'keyValueInfo';
    }))),
    keyValueMask: GostR3410KeyValueMask
}, function (value) {
    return value.enclosed ? 'keyValueMask' : 'privateKey';
});

var GostWrappedPrivateKey = function (PKTypes) {

    /**
     * Gost Wrapped Private Key for SignalCom key container
     *
     * @class GostASN1.GostWrappedPrivateKey
     * @extends GostASN1.PrivateKeyInfo
     */
    return ATTRIBUTE({
        version: Version,
        privateKeyAlgorithm: KeyAlgorithmIdentifier,
        privateKeyWrapped: KeyData(PrivateKey(ENCAPSULATES(SEQUENCE({
            keyData: INTEGER,
            keyMac: INTEGER
        }))), {
            encode: function encode(value) {
                var size = value.byteLength - 4;
                return {
                    keyData: SInt.encode(new Uint8Array(value, 0, size)),
                    keyMac: SInt.encode(new Uint8Array(value, size, 4))
                };
            },
            decode: function decode(value) {
                var data = SInt.decode(value.keyData),
                    mac = SInt.decode(value.keyMac),
                    result = new Uint8Array(data.byteLength + mac.byteLength);
                result.set(new Uint8Array(data));
                result.set(new Uint8Array(mac), data.byteLength);
                return result;
            }
        }),
        attributes: ANY
    }, 'privateKeyAlgorithm', 'attributes')(function (algorithm) {
        return OPTIONAL(CTX(0, IMPLICIT(Attributes({
            'id-sc-gostR3410-2001-publicKey': SET_OF_SINGLE(PKTypes[algorithm.id])
        }))));
    });
}({
    // Signature keys
    'id-sc-gostR3410-2001': ECDHPublicKey,
    'id-sc-gostR3410-94': DHPublicKey,
    'id-GostR3410-2001': GostR3410PublicKey,
    'id-GostR3410-94': GostR3410PublicKey,
    'id-GostR3410-2001DH': GostR3410PublicKey,
    'id-GostR3410-94DH': GostR3410PublicKey,
    'id-tc26-gost3410-12-256': GostR3410PublicKey,
    'id-tc26-gost3410-12-512': GostR3410PublicKey,
    'id-tc26-agreement-gost-3410-12-256': GostR3410PublicKey,
    'id-tc26-agreement-gost-3410-12-512': GostR3410PublicKey
});

/**
 * Private-Key Information Syntax PKSC#8
 * <pre>
 *  -- Private-key information syntax
 *
 *  PrivateKeyInfo ::= SEQUENCE {
     *      version Version,
     *      privateKeyAlgorithm AlgorithmIdentifier {{PrivateKeyAlgorithms}},
     *      privateKey PrivateKey,
     *      attributes [0] Attributes OPTIONAL }
 *
 *  Version ::= INTEGER {v1(0)} (v1,...)
 *
 *  PrivateKey ::= OCTET STRING
 *
 *  Attributes ::= SET OF Attribute
 * </pre>
 * RFC 5208 references {@link http://tools.ietf.org/html/rfc5208}
 * @class GostASN1.PrivateKeyInfo
 * @extends GostASN1.Sequence
 * @property {number} version The syntax version number. Should be 0
 * @property {AlgorithmIndentifier} privateKeyAlgorithm Identifies the private-key algorithm
 * @property {CryptoOperationData} privateKey Is an binary data whose contents are the value of the private key.
 * @property {GostASN1.Attributes} attributes A set of attributes
 */
var PrivateKeyInfo = SEQUENCE({
    version: Version,
    privateKeyAlgorithm: KeyAlgorithmIdentifier,
    privateKey: PrivateKey,
    attributes: OPTIONAL(CTX(0, IMPLICIT(Attributes)))
}, 'PRIVATE KEY');

var PrivateKeyAlgorithmIdentifier = KeyAlgorithmIdentifier;

var PublicKey = BIT_STRING;

var OneAsymmetricKey = SEQUENCE({
    version: Version,
    privateKeyAlgorithm: PrivateKeyAlgorithmIdentifier,
    privateKey: PrivateKey,
    attributes: OPTIONAL(CTX(0, IMPLICIT(Attributes))),
    publicKey: OPTIONAL(CTX(1, IMPLICIT(PublicKey)))
});

var AsymmetricKeyPackage = SEQUENCE_OF(OneAsymmetricKey);

var GostPrivateKeyInfo = function (PKTypes) {

    /**
     * Coding methods for {@link Algorithm} and {@link GostASN1.PrivateKeyInfo}
     * Supported types for GOST algorithms:
     * <pre>
     *  {
         *      'id-sc-gostR3410-2001': DHPrivateKey,
         *      'id-sc-gostR3410-94': DHPrivateKey,
         *      'id-GostR3410-2001': GostR3410PrivateKey,
         *      'id-GostR3410-94': GostR3410PrivateKey,
         *      'id-tc26-gost3410-12-256': GostR3410PrivateKey,
         *      'id-tc26-gost3410-12-512': GostR3410PrivateKey
         *  }
     * </pre>
     *
     * @class GostASN1.GostPrivateKeyInfo
     * @extends GostASN1.PrivateKeyInfo
     * @extends Key
     */
    return ENCLOSURE(ATTRIBUTE({
        version: Version,
        privateKeyAlgorithm: KeyAlgorithmIdentifier,
        privateKey: ANY,
        attributes: OPTIONAL(CTX(0, IMPLICIT(Attributes)))
    }, 'privateKeyAlgorithm', 'privateKey')(function (algorithm) {
        return PKTypes[algorithm.id];
    }), {
        encode: function encode(value) {
            return {
                version: 0,
                privateKeyAlgorithm: value.algorithm,
                privateKey: value.buffer
            };
        },
        decode: function decode(value) {
            return {
                algorithm: value.privateKeyAlgorithm,
                type: 'private',
                extractable: true,
                usages: ['sign', 'deriveKey', 'deriveBits'],
                buffer: isBinary(value.privateKey) ? value.privateKey : value.privateKey.keyValueMask
            };
        }
    });
}({
    // Signature keys
    'id-sc-gostR3410-2001': DHPrivateKey,
    'id-sc-gostR3410-94': DHPrivateKey,
    'id-GostR3410-2001': GostR3410PrivateKey,
    'id-GostR3410-94': GostR3410PrivateKey,
    'id-GostR3410-2001DH': GostR3410PrivateKey,
    'id-GostR3410-94DH': GostR3410PrivateKey,
    'id-tc26-gost3410-12-256': GostR3410PrivateKey,
    'id-tc26-gost3410-12-512': GostR3410PrivateKey,
    'id-tc26-agreement-gost-3410-12-256': GostR3410PrivateKey,
    'id-tc26-agreement-gost-3410-12-512': GostR3410PrivateKey
});

var KeyEncryptedData = OCTET_STRING;
/**
 * Encrypted Private-Key Information Syntax
 * <pre>
 *  -- Encrypted private-key information syntax
 *
 *  EncryptedPrivateKeyInfo ::= SEQUENCE {
     *      encryptionAlgorithm AlgorithmIdentifier {{KeyEncryptionAlgorithms}},
     *      encryptedData KeyEncryptedData
     *  }
 *
 *  KeyEncryptedData ::= OCTET STRING
 *
 *  PrivateKeyAlgorithms ALGORITHM-IDENTIFIER ::= {
     *      ... -- For local profiles
     *  }
 *
 *  KeyEncryptionAlgorithms ALGORITHM-IDENTIFIER ::= {
     *      ... -- For local profiles
     *  }
 * </pre>
 * RFC 5208 references {@link http://tools.ietf.org/html/rfc5208}
 * @class GostASN1.EncryptedPrivateKeyInfo
 * @extends GostASN1.Sequence
 * @property {AlgorithmIdentifier} encryptionAlgorithm Identifies key encryption algorithm
 * @property {CryptoOperationData} encryptedData Encrypted {@link GostASN1.PrivateKeyInfo}
 */
var EncryptedPrivateKeyInfo = SEQUENCE({
    encryptionAlgorithm: KeyEncryptionAlgorithmIdentifier,
    encryptedData: KeyEncryptedData
}, 'ENCRYPTED PRIVATE KEY');
// </editor-fold>

/*
     * Certificate Extensions
     *
     * http://tools.ietf.org/html/rfc5280
     *
     */ // <editor-fold defaultstate="collapsed">
var UniqueIdentifier = BIT_STRING;

var CertificateSerialNumber = INTEGER;

var BasicConstraints = SEQUENCE({
    cA: DEFAULT(BOOLEAN, false),
    pathLenConstraint: OPTIONAL(INTEGER)
});

var KeyUsage = BIT_STRING({
    digitalSignature: 0,
    nonRepudiation: 1,
    keyEncipherment: 2,
    dataEncipherment: 3,
    keyAgreement: 4,
    keyCertSign: 5,
    cRLSign: 6,
    encipherOnly: 7,
    decipherOnly: 8
});
var KeyPurposeId = OBJECT_IDENTIFIER,
    ExtKeyUsageSyntax = SEQUENCE_OF(KeyPurposeId);

var KeyIdentifier = OCTET_STRING;

var OtherName = SEQUENCE({
    type: OBJECT_IDENTIFIER,
    value: CTX(0, EXPLICIT(ANY))
});

var EDIPartyName = SEQUENCE({
    nameAssigner: OPTIONAL(CTX(0, IMPLICIT(DirectoryString))),
    partyName: OPTIONAL(CTX(1, IMPLICIT(DirectoryString)))
});

var ORAddress = SEQUENCE({});

var GeneralName = CHOICE({
    otherName: CTX(0, IMPLICIT(OtherName)),
    rfc822Name: CTX(1, IMPLICIT(DirectoryString)),
    dNSName: CTX(2, IMPLICIT(DirectoryString)),
    x400Address: CTX(3, IMPLICIT(ORAddress)),
    directoryName: CTX(4, EXPLICIT(Name)), // Name is CHOICE(RDNSequence)
    ediPartyName: CTX(5, IMPLICIT(EDIPartyName)),
    uniformResourceIdentifier: CTX(6, IMPLICIT(DirectoryString)),
    iPAddress: CTX(7, IMPLICIT(OCTET_STRING)),
    registeredID: CTX(8, IMPLICIT(OBJECT_IDENTIFIER))
}, function (value) {
    return typeof value === 'string' || value instanceof String ? value.indexOf('@') >= 0 ? 'rfc822Name' : 'dNSName' : isBinary(value) ? 'iPAddress' : 'directoryName';
});

var GeneralNames = SEQUENCE_OF(GeneralName);

var AuthorityKeyIdentifier = SEQUENCE({
    keyIdentifier: OPTIONAL(CTX(0, IMPLICIT(KeyIdentifier))),
    authorityCertIssuer: OPTIONAL(CTX(1, IMPLICIT(GeneralNames))),
    authorityCertSerialNumber: OPTIONAL(CTX(2, IMPLICIT(CertificateSerialNumber)))
});

var PrivateKeyUsagePeriod = SEQUENCE({
    notBefore: OPTIONAL(CTX(0, IMPLICIT(GeneralizedTime))),
    notAfter: OPTIONAL(CTX(1, IMPLICIT(GeneralizedTime)))
});

var CertPolicyId = OBJECT_IDENTIFIER,
    PolicyQualifierId = OBJECT_IDENTIFIER;

var PolicyQualifierInfo = SEQUENCE({
    policyQualifierId: PolicyQualifierId,
    qualifier: ANY
});

var PolicyInformation = SEQUENCE({
    policyIdentifier: CertPolicyId,
    policyQualifiers: OPTIONAL(SEQUENCE_OF(PolicyQualifierInfo))
});

var PolicyMapping = SEQUENCE({
    issuerDomainPolicy: CertPolicyId,
    subjectDomainPolicy: CertPolicyId
});

var BaseDistance = INTEGER;

var GeneralSubtree = SEQUENCE({
    base: GeneralName,
    minimum: DEFAULT(CTX(0, IMPLICIT(BaseDistance)), 0),
    maximum: OPTIONAL(CTX(1, IMPLICIT(BaseDistance)))
});

var GeneralSubtrees = SEQUENCE_OF(GeneralSubtree);

var NameConstraints = SEQUENCE({
    permittedSubtrees: OPTIONAL(CTX(0, IMPLICIT(GeneralSubtrees))),
    excludedSubtrees: OPTIONAL(CTX(1, IMPLICIT(GeneralSubtrees)))
});

var SkipCerts = INTEGER;

var PolicyConstraints = SEQUENCE({
    requireExplicitPolicy: OPTIONAL(CTX(0, IMPLICIT(SkipCerts))),
    inhibitPolicyMapping: OPTIONAL(CTX(1, IMPLICIT(SkipCerts)))
});

var ReasonFlags = BIT_STRING({
    unused: 0,
    keyCompromise: 1,
    cACompromise: 2,
    affiliationChanged: 3,
    superseded: 4,
    cessationOfOperation: 5,
    certificateHold: 6,
    privilegeWithdrawn: 7,
    aACompromise: 8
});

var DistributionPointName = CHOICE({
    fullName: CTX(0, IMPLICIT(GeneralNames)),
    nameRelativeToCRLIssuer: CTX(1, IMPLICIT(RelativeDistinguishedName))
}, function (value) {
    return value instanceof Array ? 'fullName' : 'nameRelativeToCRLIssuer';
});

var DistributionPoint = SEQUENCE({
    distributionPoint: OPTIONAL(CTX(0, EXPLICIT(DistributionPointName))), // DistributionPointName CHOICE
    reasons: OPTIONAL(CTX(1, IMPLICIT(ReasonFlags))),
    cRLIssuer: OPTIONAL(CTX(2, IMPLICIT(GeneralNames)))
});

var CRLDistributionPoints = SEQUENCE_OF(DistributionPoint);

var FreshestCRL = CRLDistributionPoints;

var AccessDescription = SEQUENCE({
    accessMethod: OBJECT_IDENTIFIER,
    accessLocation: GeneralName
});

var Extension = function Extension(typeSet, defaultCritical) {

    var Attribute = ATTRIBUTE({
        extnID: OBJECT_IDENTIFIER,
        critical: DEFAULT(BOOLEAN, false),
        extnValue: function extnValue(type) {
            return OCTET_STRING(ENCAPSULATES(type));
        }
    }, 'extnID', 'extnValue');

    var Class = extend(Attribute(typeSet), {
        object: {
            get: function get() {
                var value = this._get(Class.super, 'object');
                if (value && _typeof(value.extnValue) === 'object') this.defineValue(value.extnValue);
                return value;
            },
            set: function set(object) {
                this._set(Class.super, 'object', object);
                // Define critical
                if (object && object.extnValue) if (object.extnValue.critical !== undefined) this.critical = object.extnValue.critical;else if (this.critical === undefined && defaultCritical) this.critical = defaultCritical(this.extnID, object.extnValue);
            }
        },
        extnValue: {
            get: function get() {
                // Get value property of object
                var value = this._get(Class.super, 'extnValue');
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') this.defineValue(value);
                return value;
            },
            set: function set(object) {
                // Set value property of object
                this._set(Class.super, 'extnValue', object);
                // Define critical
                if (object) {
                    if (object.critical !== undefined) this.critical = object.critical;else if (this.critical === undefined && defaultCritical) this.critical = defaultCritical(this.extnID, object);
                }
            }
        },
        defineValue: function defineValue(value) {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') if (!getOwnPropertyDescriptor(value, 'critical')) {
                var self = this;
                defineProperty(value, 'critical', {
                    get: function get() {
                        return self.critical;
                    },
                    set: function set(value) {
                        self.critical = value;
                    },
                    enumerable: true,
                    configurable: false
                });
            }
        }
    });
    return Class;
};

// http://base.garant.ru/70133464/#ixzz4KaOTGI1l
var IssuerSignTool = SEQUENCE({
    signTool: UTF8String,
    cATool: UTF8String,
    signToolCert: UTF8String,
    cAToolCert: UTF8String
});

/**
 * Extensions is a base class for extension attributes of certificates, CRLs, requests and etc.
 *
 * @class GostASN1.Extensions
 * @extends GostASN1.Set
 */
var Extensions = SEQUENCE_OF(Extension, {
    typeName: 'extnID',
    valueName: 'extnValue'
});

var CertExtensions = Extensions({
    authorityKeyIdentifier: AuthorityKeyIdentifier,
    subjectKeyIdentifier: KeyIdentifier,
    keyUsage: KeyUsage,
    privateKeyUsagePeriod: PrivateKeyUsagePeriod,
    certificatePolicies: SEQUENCE_OF(PolicyInformation),
    policyMappings: SEQUENCE_OF(PolicyMapping),
    subjectAltName: GeneralNames,
    issuerAltName: GeneralNames,
    subjectDirectoryAttributes: AttributeSequence,
    basicConstraints: BasicConstraints,
    nameConstraints: NameConstraints,
    policyConstraints: PolicyConstraints,
    extKeyUsage: ExtKeyUsageSyntax,
    cRLDistributionPoints: CRLDistributionPoints,
    inhibitAnyPolicy: SkipCerts,
    freshestCRL: FreshestCRL,
    authorityInfoAccess: SEQUENCE_OF(AccessDescription),
    subjectInfoAccess: SEQUENCE_OF(AccessDescription),
    subjectSignTool: UTF8String,
    issuerSignTool: IssuerSignTool
}, function (id, value) {
    return id === 'keyUsage' || id === 'basicConstraints' && value.pathLenConstraint === undefined;
});
// </editor-fold>

/*
 * Signature Values
 *
 * http://tools.ietf.org/html/rfc5280
 * http://tools.ietf.org/html/rfc4491
 *
 */ // <editor-fold defaultstate="collapsed">

/**
 * Gost Signature encode signature values for different GOST signatures
 * Support algorithms:
 * <pre>
 *  {
     *      'id-GostR3410-94': GostR3410Signature,
     *      'id-GostR3410-2001': GostR3410Signature,
     *      'id-tc26-gost3410-12-256': GostR3410Signature,
     *      'id-tc26-gost3410-12-512': GostR3410Signature,
     *      'id-GostR3411-94-with-GostR3410-2001': GostR3410Signature,
     *      'id-GostR3411-94-with-GostR3410-94': GostR3410Signature,
     *      'id-tc26-signwithdigest-gost3410-12-94': GostR3410Signature,
     *      'id-tc26-signwithdigest-gost3410-12-256': GostR3410Signature,
     *      'id-tc26-signwithdigest-gost3410-12-512': GostR3410Signature,
     *      'id-sc-gostR3410-94': ECDHSignature,
     *      'id-sc-gostR3410-2001': ECDHSignature,
     *      'id-sc-gostR3411-94-with-gostR3410-94': ECDHSignature,
     *      'id-sc-gostR3411-94-with-gostR3410-2001': ECDHSignature
     *  }
 * </pre>
 *
 * @class GostASN1.GostSignature
 * @extends GostASN1.Sequence
 */

// SignalCom signature
var ECDHSignature = SEQUENCE({
    r: INTEGER,
    s: INTEGER
});

var GostR3410Signature = ANY;

// Signature value (only need for CryptoPro
//    var GostSignature = extend(CHOICE({
//        ecdhSignature: ECDHSignature}, 'ecdhSignature'));
var GostSignature = ECDHSignature;

// </editor-fold>

/*
     * Certificate
     *
     * http://tools.ietf.org/html/rfc5280
     *
     */ // <editor-fold defaultstate="collapsed">

/**
 * The sequence TBSCertificate contains information associated with the
 * subject of the certificate and the CA who issued it.  Every
 * TBSCertificate contains the names of the subject and issuer, a public
 * key associated with the subject, a validity period, a version number,
 * and a serial number; some MAY contain optional unique identifier
 * fields.  The remainder of this section describes the syntax and
 * semantics of these fields.  A TBSCertificate usually includes
 * extensions.
 * <pre>
 *  TBSCertificate  ::=  SEQUENCE  {
     *       version         [0]  EXPLICIT Version DEFAULT v1,
     *       serialNumber         CertificateSerialNumber,
     *       signature            AlgorithmIdentifier,
     *       issuer               Name,
     *       validity             Validity,
     *       subject              Name,
     *       subjectPublicKeyInfo SubjectPublicKeyInfo,
     *       issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,
     *                            -- If present, version MUST be v2 or v3
     *       subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,
     *                            -- If present, version MUST be v2 or v3
     *       extensions      [3]  EXPLICIT Extensions OPTIONAL
     *                            -- If present, version MUST be v3
     *       }
 *
 *  Version  ::=  INTEGER  {  v1(0), v2(1), v3(2)  }
 *
 *  CertificateSerialNumber  ::=  INTEGER
 *
 *  Validity ::= SEQUENCE {
     *       notBefore      Time,
     *       notAfter       Time }
 *
 *  Time ::= CHOICE {
     *       utcTime        UTCTime,
     *       generalTime    GeneralizedTime }
 *
 *  UniqueIdentifier  ::=  BIT STRING
 *
 *  SubjectPublicKeyInfo  ::=  SEQUENCE  {
     *       algorithm            AlgorithmIdentifier,
     *       subjectPublicKey     BIT STRING  }
 *
 *  Extensions  ::=  SEQUENCE SIZE (1..MAX) OF Extension
 *
 *  Extension  ::=  SEQUENCE  {
     *       extnID      OBJECT IDENTIFIER,
     *       critical    BOOLEAN DEFAULT FALSE,
     *       extnValue   OCTET STRING  }
 * </pre>
 * See {@link GostASN1.Certificate} and {@link GostASN1.SubjectPublicKeyInfo}<br><br>
 * RFC 5280 references {@link http://tools.ietf.org/html/rfc5280}
 *
 * @class GostASN1.TBSCertificate
 * @extends GostASN1.Sequence
 * @extends GostASN1.Validity
 * @property {number} version The version of the encoded certificate
 * @property {(number|string)} serialNumber The serial number MUST be a positive integer assigned by the CA to each certificate.
 * @property {AlgorithmIdentifier} signature The algorithm identifier for the algorithm used by the CA to sign the certificate.
 * @property {GostASN1.Name} issuer The issuer field identifies the entity that has signed and issued the certificate.
 * @property {GostASN1.Validity} validity The certificate validity period
 * @property {GostASN1.Name} subject The subject field identifies the entity associated with the public key stored in the subject public key field.
 * @property {GostASN1.SubjectPublicKeyInfo} subject The public key and identify the algorithm with which the key is used
 * @property {CryptoOperationData} issuerUniqueID The issuer unique identifier
 * @property {CryptoOperationData} subjectUniqueID The subject unique identifier
 * @property {GostASN1.Extensions} extensions The extensions defined for X.509 v3 certificates
 */
var TBSCertificate = COMBINE(SEQUENCE({
    version: CTX(0, EXPLICIT(Version)),
    serialNumber: CertificateSerialNumber,
    signature: SignatureAlgorithmIdentifier,
    issuer: Name,
    validity: Validity,
    subject: Name,
    subjectPublicKeyInfo: SubjectPublicKeyInfo,
    issuerUniqueID: OPTIONAL(CTX(1, IMPLICIT(UniqueIdentifier))), // If present, version MUST be v2 or v3
    subjectUniqueID: OPTIONAL(CTX(2, IMPLICIT(UniqueIdentifier))), // If present, version MUST be v2 or v3
    extensions: OPTIONAL(CTX(3, EXPLICIT(CertExtensions)))
})); // If present, version MUST be v3

/**
 * The X.509 v3 certificate basic syntax is as follows.  For signature
 * calculation, the data that is to be signed is encoded using the ASN.1
 * distinguished encoding rules (DER) [X.690].  ASN.1 DER encoding is a
 * tag, length, value encoding system for each element.
 * <pre>
 *  Certificate  ::=  SEQUENCE  {
     *       tbsCertificate       TBSCertificate,
     *       signatureAlgorithm   AlgorithmIdentifier,
     *       signatureValue       BIT STRING  }
 * </pre>
 * See {@link GostASN1.TBSCertificate}<br><br>
 * RFC 5280 references {@link http://tools.ietf.org/html/rfc5280}
 *
 * @class GostASN1.Certificate
 * @extends GostASN1.TBSCertificate
 * @property {GostASN1.TBSCertificate} tbsCertificate The sequence TBSCertificate
 * @property {AlgorithmIndentifier} signatureAlgorithm Identifies signature algorithm
 * @property {CryptoOperationData} signatureValue Signature value
 */
var Certificate = SEQUENCE({
    tbsCertificate: TBSCertificate,
    signatureAlgorithm: SignatureAlgorithmIdentifier,
    signatureValue: BIT_STRING
}, 'CERTIFICATE');
// </editor-fold>

/*
     * Certification Request
     *
     * http://tools.ietf.org/html/rfc2986
     *
     */ // <editor-fold defaultstate="collapsed">

var ExtensionRequest = CertExtensions;

var CRIAttributes = Attributes({
    challengePassword: SET_OF_SINGLE(DirectoryString),
    extensionRequest: SET_OF_SINGLE(ExtensionRequest),
    msCertExtensions: SET_OF_SINGLE(CertExtensions),
    extendedCertificateAttributes: SET_OF_SINGLE(Attributes)
});

/**
 * Certification request information shall have ASN.1 type CertificationRequestInfo:
 * <pre>
 *  CertificationRequestInfo ::= SEQUENCE {
     *       version       INTEGER { v1(0) } (v1,...),
     *       subject       Name,
     *       subjectPKInfo SubjectPublicKeyInfo{{ PKInfoAlgorithms }},
     *       attributes    [0] Attributes{{ CRIAttributes }}
     *  }
 *
 *  SubjectPublicKeyInfo { ALGORITHM : IOSet} ::= SEQUENCE {
     *       algorithm        AlgorithmIdentifier {{IOSet}},
     *       subjectPublicKey BIT STRING
     *  }
 *
 *  PKInfoAlgorithms ALGORITHM ::= {
     *       ...  -- add any locally defined algorithms here -- }
 *
 *  Attributes { ATTRIBUTE:IOSet } ::= SET OF Attribute{{ IOSet }}
 *
 *  CRIAttributes  ATTRIBUTE  ::= {
     *       ... -- add any locally defined attributes here -- }
 *
 *  Attribute { ATTRIBUTE:IOSet } ::= SEQUENCE {
     *       type   ATTRIBUTE.&id({IOSet}),
     *       values SET SIZE(1..MAX) OF ATTRIBUTE.&Type({IOSet}{@type})
     *  }
 * </pre>
 * See {@link GostASN1.CertificationRequest} and {@link GostASN1.SubjectPublicKeyInfo}<br><br>
 * RFC 2986 references {@link http://tools.ietf.org/html/rfc2986}
 *
 * @class GostASN1.CertificationRequestInfo
 * @extends GostASN1.Sequence
 * @property {number} version The version of the encoded request
 * @property {GostASN1.Name} subject The subject field identifies the entity associated with the public key stored in the subject public key field.
 * @property {GostASN1.SubjectPublicKeyInfo} subject The public key and identify the algorithm with which the key is used
 * @property {GostASN1.Attributes} attributes The request attributes
 */
var CertificationRequestInfo = COMBINE(SEQUENCE({
    version: INTEGER,
    subject: Name,
    subjectPublicKeyInfo: SubjectPublicKeyInfo,
    attributes: CTX(0, IMPLICIT(CRIAttributes))
}));

/**
 * A certification request consists of three parts: "certification
 * request information," a signature algorithm identifier, and a digital
 * signature on the certification request information.  The
 * certification request information consists of the entity's
 * distinguished name, the entity's public key, and a set of attributes
 * providing other information about the entity.
 * <pre>
 *  A certification request shall have ASN.1 type CertificationRequest:
 *
 *  CertificationRequest ::= SEQUENCE {
     *       certificationRequestInfo CertificationRequestInfo,
     *       signatureAlgorithm AlgorithmIdentifier{{ SignatureAlgorithms }},
     *       signature          BIT STRING
     *  }
 *
 *  AlgorithmIdentifier {ALGORITHM:IOSet } ::= SEQUENCE {
     *       algorithm          ALGORITHM.&id({IOSet}),
     *       parameters         ALGORITHM.&Type({IOSet}{@algorithm}) OPTIONAL
     *  }
 *
 *  SignatureAlgorithms ALGORITHM ::= {
     *       ... -- add any locally defined algorithms here -- }
 * </pre>
 * See {@link GostASN1.CertificationRequestInfo}
 * RFC 2986 references {@link http://tools.ietf.org/html/rfc2986}
 *
 * @class GostASN1.CertificationRequest
 * @extends GostASN1.CertificationRequestInfo
 * @property {GostASN1.CertificationRequestInfo} requestInfo Request information
 * @property {AlgorithmIndentifier} signatureAlgorithm Identifies signature algorithm
 * @property {CryptoOperationData} signatureValue Signature value
 */
var CertificationRequest = SEQUENCE({
    requestInfo: CertificationRequestInfo,
    signatureAlgorithm: SignatureAlgorithmIdentifier,
    signatureValue: BIT_STRING
}, 'CERTIFICATE REQUEST');
// </editor-fold>

/*
     * Certificate Revocation List
     *
     * http://tools.ietf.org/html/rfc5280
     *
     */ // <editor-fold defaultstate="collapsed">

var CRLNumber = INTEGER;

var CRLReason = ENUMERATED({
    unspecified: 0,
    keyCompromise: 1,
    cACompromise: 2,
    affiliationChanged: 3,
    superseded: 4,
    cessationOfOperation: 5,
    certificateHold: 6,
    removeFromCRL: 8,
    privilegeWithdrawn: 9,
    aACompromise: 10
});

var IssuingDistributionPoint = SEQUENCE({
    distributionPoint: OPTIONAL(CTX(0, EXPLICIT(DistributionPointName))), // DistributionPointName is CHOICE
    onlyContainsUserCerts: DEFAULT(CTX(1, IMPLICIT(BOOLEAN)), false),
    onlyContainsCACerts: DEFAULT(CTX(2, IMPLICIT(BOOLEAN)), false),
    onlySomeReasons: OPTIONAL(CTX(3, IMPLICIT(ReasonFlags))),
    indirectCRL: DEFAULT(CTX(4, IMPLICIT(BOOLEAN)), false),
    onlyContainsAttributeCerts: DEFAULT(CTX(5, IMPLICIT(BOOLEAN)), false)
});

var CLRExtensions = Extensions({
    authorityKeyIdentifier: AuthorityKeyIdentifier,
    issuerAltName: GeneralNames,
    cRLNumber: CRLNumber,
    deltaCRLIndicator: CRLNumber,
    issuingDistributionPoint: IssuingDistributionPoint,
    freshestCRL: FreshestCRL
}, function (id) {
    return id === 'cRLNumber';
});

var CLREntryExtensions = Extensions({
    cRLReason: CRLReason,
    instructionCode: OBJECT_IDENTIFIER,
    invalidityDate: GeneralizedTime,
    certificateIssuer: GeneralNames
});

/**
 * This field is itself a sequence containing the name of the issuer,
 * issue date, issue date of the next list, the optional list of revoked
 * certificates, and optional CRL extensions.  When there are no revoked
 * certificates, the revoked certificates list is absent.  When one or
 * more certificates are revoked, each entry on the revoked certificate
 * list is defined by a sequence of user certificate serial number,
 * revocation date, and optional CRL entry extensions.
 * <pre>
 *  TBSCertList  ::=  SEQUENCE  {
     *       version                 Version OPTIONAL,
     *                                    -- if present, MUST be v2
     *       signature               AlgorithmIdentifier,
     *       issuer                  Name,
     *       thisUpdate              Time,
     *       nextUpdate              Time OPTIONAL,
     *       revokedCertificates     SEQUENCE OF SEQUENCE  {
     *            userCertificate         CertificateSerialNumber,
     *            revocationDate          Time,
     *            crlEntryExtensions      Extensions OPTIONAL
     *                                          -- if present, MUST be v2
     *                                 }  OPTIONAL,
     *       crlExtensions           [0]  EXPLICIT Extensions OPTIONAL
     *                                          -- if present, MUST be v2
     *                                 }
 * </pre>
 * See {@link GostASN1.CertificateList}<br><br>
 * RFC 5280 references {@link http://tools.ietf.org/html/rfc5280}
 *
 * @class GostASN1.TBSCertList
 * @extends GostASN1.Sequence
 * @property {number} version The version of the encoded CRL
 * @property {AlgorithmIdentifier} signature The algorithm identifier for the algorithm used to sign the CRL
 * @property {Name} issuer The issuer name identifies the entity that has signed and issued the CRL
 * @property {Date} thisUpdate The issue date of this CRL
 * @property {Date} nextUpdate The date by which the next CRL will be issued
 * @property {Array} revokedCertificates The revoked certificates are listed by their serial numbers
 * @property {Extensions} crlExtensions The CRL extensions
 */
var TBSCertList = COMBINE(SEQUENCE({
    version: OPTIONAL(Version), // if present, MUST be v2
    signature: SignatureAlgorithmIdentifier,
    issuer: Name,
    thisUpdate: Time,
    nextUpdate: OPTIONAL(Time),
    revokedCertificates: OPTIONAL(SEQUENCE_OF(SEQUENCE({
        userCertificate: CertificateSerialNumber,
        revocationDate: Time,
        crlEntryExtensions: OPTIONAL(CLREntryExtensions) // if present, MUST be v2
    }))),
    crlExtensions: OPTIONAL(CTX(0, EXPLICIT(CLRExtensions)))
})); // if present, MUST be v2

/**
 * The X.509 v2 CRL syntax is as follows.  For signature calculation,
 * the data that is to be signed is ASN.1 DER encoded.  ASN.1 DER
 * encoding is a tag, length, value encoding system for each element.
 * <pre>
 *  CertificateList  ::=  SEQUENCE  {
     *       tbsCertList          TBSCertList,
     *       signatureAlgorithm   AlgorithmIdentifier,
     *       signatureValue       BIT STRING  }
 * </pre>
 * See {@link GostASN1.TBSCertList}<br><br>
 * RFC 5280 references {@link http://tools.ietf.org/html/rfc5280}
 *
 * @class GostASN1.CertificateList
 * @extends GostASN1.TBSCertList
 * @property {GostASN1.TBSCertList} tbsCertList The tbsCertList
 * @property {AlgorithmIndentifier} signatureAlgorithm Identifies signature algorithm
 * @property {CryptoOperationData} signatureValue Signature value
 */
var CertificateList = SEQUENCE({
    tbsCertList: TBSCertList,
    signatureAlgorithm: SignatureAlgorithmIdentifier,
    signatureValue: BIT_STRING
}, 'CRL');
// </editor-fold>

/*
     * Attribute Certificate Definision
     * http://tools.ietf.org/html/rfc5755
     *
     */ // <editor-fold defaultstate="collapsed">

var AttCertVersion = INTEGER;

var ObjectDigestInfo = SEQUENCE({
    digestedObjectType: ENUMERATED({
        publicKey: 0,
        publicKeyCert: 1,
        otherObjectTypes: 2
    }), // otherObjectTypes MUST NOT be used in this profile
    otherObjectTypeID: OPTIONAL(OBJECT_IDENTIFIER),
    digestAlgorithm: DigestAlgorithmIdentifier,
    objectDigest: BIT_STRING
});

var IssuerSerial = SEQUENCE({
    issuer: GeneralNames,
    serial: CertificateSerialNumber,
    issuerUID: OPTIONAL(UniqueIdentifier)
});

var V2Form = SEQUENCE({
    issuerName: OPTIONAL(GeneralNames),
    baseCertificateID: OPTIONAL(CTX(0, IMPLICIT(IssuerSerial))),
    // issuerName MUST be present in this profile baseCertificateID and
    // objectDigestInfo MUST NOT be present in this profile
    objectDigestInfo: OPTIONAL(CTX(1, IMPLICIT(ObjectDigestInfo)))
});

var TargetCert = SEQUENCE({
    targetCertificate: IssuerSerial,
    targetName: OPTIONAL(GeneralName),
    certDigestInfo: OPTIONAL(ObjectDigestInfo)
});

var Target = CHOICE({
    targetName: CTX(0, EXPLICIT(GeneralName)), // GeneralName is CHOICE
    targetGroup: CTX(1, EXPLICIT(GeneralName)),
    targetCert: CTX(2, IMPLICIT(TargetCert))
});

var Targets = SEQUENCE_OF(Target);

var AttCertExtensions = Extensions({
    auditIdentity: OCTET_STRING,
    targetInformation: Targets,
    authorityKeyIdentifier: AuthorityKeyIdentifier,
    authorityInfoAccess: SEQUENCE_OF(AccessDescription),
    cRLDistributionPoints: CRLDistributionPoints,
    noRevAvail: NULL
}, function (id) {
    return id === 'auditIdentity' || id === 'targetInformation';
});

var Holder = SEQUENCE({
    // the issuer and serial number of the holder's Public Key Certificate
    baseCertificateID: OPTIONAL(CTX(0, IMPLICIT(IssuerSerial))),
    // the name of the claimant or role
    entityName: OPTIONAL(CTX(1, IMPLICIT(GeneralNames))),
    // used to directly authenticate the holder, for example, an executable
    objectDigestInfo: OPTIONAL(CTX(2, IMPLICIT(ObjectDigestInfo)))
});

var AttCertIssuer = CHOICE({
    v1Form: GeneralNames, // MUST NOT be used in this profile
    v2Form: CTX(0, IMPLICIT(V2Form))
}, 'v2Form'); // v2 only

var AttCertValidityPeriod = SEQUENCE({
    notBeforeTime: GeneralizedTime,
    notAfterTime: GeneralizedTime
});

var SvceAuthInfo = SEQUENCE({
    service: GeneralName,
    ident: GeneralName,
    authInfo: OPTIONAL(OCTET_STRING)
});

var RoleSyntax = SEQUENCE({
    roleAuthority: OPTIONAL(CTX(0, IMPLICIT(GeneralNames))),
    roleName: CTX(1, EXPLICIT(GeneralName))
}); // GeneralName is CHOICE

var ClassList = BIT_STRING({
    unmarked: 0,
    unclassified: 1,
    restricted: 2,
    confidential: 3,
    secret: 4,
    topSecret: 5
});

var SecurityCategory = SEQUENCE({
    type: CTX(0, IMPLICIT(OBJECT_IDENTIFIER)),
    value: CTX(1, IMPLICIT(ANY))
});

var Clearance = SEQUENCE({
    policyId: CTX(0, IMPLICIT(OBJECT_IDENTIFIER)),
    classList: DEFAULT(CTX(1, IMPLICIT(ClassList)), ['unclassified']),
    securityCategories: OPTIONAL(CTX(2, IMPLICIT(SET_OF(SecurityCategory))))
});

var IetfAttrSyntax = SEQUENCE({
    policyAuthority: OPTIONAL(CTX(0, IMPLICIT(GeneralNames))),
    values: SEQUENCE_OF(CHOICE({
        octets: OCTET_STRING,
        oid: OBJECT_IDENTIFIER,
        string: UTF8String
    }, function (value) {
        return isBinary ? 'octets' : getIdentifier(value) ? 'oid' : 'string';
    }))
});

/**
 * X.509 Attribute Certificate Definition<br><br>
 *
 * X.509 contains the definition of an AC given below.  All types that
 * are not defined in this document can be found in [PKIXPROF].
 * <pre>
 *           AttributeCertificateInfo ::= SEQUENCE {
     *                version              AttCertVersion -- version is v2,
     *                holder               Holder,
     *                issuer               AttCertIssuer,
     *                signature            AlgorithmIdentifier,
     *                serialNumber         CertificateSerialNumber,
     *                attrCertValidityPeriod   AttCertValidityPeriod,
     *                attributes           SEQUENCE OF Attribute,
     *                issuerUniqueID       UniqueIdentifier OPTIONAL,
     *                extensions           Extensions OPTIONAL
     *           }
 * <pre>
 * RFC 3281 references {@link http://tools.ietf.org/html/rfc3281}
 *
 * @class GostASN1.AttributeCertificateInfo
 * @extends GostASN1.Sequence
 * @property {number} version The version of the encoded certificate
 * @property {GostASN1.Name} holder Identifies the holder.
 * @property {GostASN1.Name} issuer Identifies the issuer.
 * @property {AlgorithmIdentifier} signature The algorithm identifier for the algorithm used by the CA to sign the certificate.
 * @property {(number|string)} serialNumber The serial number MUST be a positive integer assigned by the CA to each certificate.
 * @property {GostASN1.Validity} attrCertValidityPeriod The certificate validity period
 * @property {GostASN1.Attributes} attributes The certificate attributes
 * @property {CryptoOperationData} issuerUniqueID The issuer unique identifier
 * @property {GostASN1.Extensions} extensions The certificate extensions
 */
var AttributeCertificateInfo = COMBINE(SEQUENCE({
    version: AttCertVersion, // version is v2,
    holder: Holder,
    issuer: AttCertIssuer,
    signature: SignatureAlgorithmIdentifier,
    serialNumber: CertificateSerialNumber,
    attrCertValidityPeriod: AttCertValidityPeriod,
    attributes: AttributeSequence({
        authenticationInfo: SET_OF(SvceAuthInfo),
        accessIdentity: SET_OF(SvceAuthInfo),
        chargingIdentity: SET_OF_SINGLE(IetfAttrSyntax),
        group: SET_OF_SINGLE(IetfAttrSyntax),
        role: SET_OF(RoleSyntax),
        clearance: SET_OF(Clearance)
    }),
    issuerUniqueID: OPTIONAL(UniqueIdentifier),
    extensions: OPTIONAL(AttCertExtensions)
}));

/**
 * Attribute Certificate Profile<br></br>
 *
 * ACs may be used in a wide range of applications and environments
 * covering a broad spectrum of interoperability goals and a broader
 * spectrum of operational and assurance requirements.  The goal of this
 * document is to establish a common baseline for generic applications
 * requiring broad interoperability and limited special purpose
 * requirements.  In particular, the emphasis will be on supporting the
 * use of attribute certificates for informal Internet electronic mail,
 * IPSec, and WWW applications.
 * <pre>
 *           AttributeCertificate ::= SEQUENCE {
     *                acinfo               AttributeCertificateInfo,
     *                signatureAlgorithm   AlgorithmIdentifier,
     *                signatureValue       BIT STRING
     *           }
 * </pre>
 * See {@link GostASN1.AttributeCertificateInfo}<br><br>
 * RFC 3281 references {@link http://tools.ietf.org/html/rfc3281}
 *
 * @class GostASN1.AttributeCertificate
 * @extends GostASN1.AttributeCertificateInfo
 * @property {GostASN1.AttributeCertificateInfo} acinfo Attribute certificate information
 * @property {AlgorithmIndentifier} signatureAlgorithm Identifies signature algorithm
 * @property {CryptoOperationData} signatureValue Signature value
 */
var AttributeCertificate = SEQUENCE({
    acinfo: AttributeCertificateInfo,
    signatureAlgorithm: SignatureAlgorithmIdentifier,
    signatureValue: BIT_STRING
}, 'ATTRIBUTE CERTIFICATE');
// </editor-fold>

/*
     * Encrypted Key with CMS
     *
     * http://tools.ietf.org/html/rfc5652
     * http://tools.ietf.org/html/rfc4490
     *
     */ // <editor-fold defaultstate="collapsed">

// RecipientInfo
var EncryptedKey = OCTET_STRING;

var EncryptedContent = OCTET_STRING;

var SubjectKeyIdentifier = OCTET_STRING;

var UserKeyingMaterial = OCTET_STRING;

var ECCCMSSharedInfo = SEQUENCE({
    keyInfo: KeyWrapAlgorithmIdentifier,
    entityUInfo: OPTIONAL(CTX(0, EXPLICIT(OCTET_STRING))),
    suppPubInfo: CTX(2, EXPLICIT(OCTET_STRING))
});

// GOST Key Transport & Key agreement rfc4490
var Gost2814789EncryptedKey = ENCLOSURE(SEQUENCE({
    encryptedKey: Gost2814789Key,
    maskKey: OPTIONAL(CTX(0, IMPLICIT(Gost2814789Key))),
    macKey: Gost2814789MAC
}), {
    encode: function encode(value) {
        // wrappedKey: (CEK_ENC(32) | CEK_MAC(4))
        var encryptedKey = new Uint8Array(new Uint8Array(value, 0, 32)).buffer,
            macKey = new Uint8Array(new Uint8Array(value, 32, 4)).buffer;
        return { // from wrapped key
            encryptedKey: encryptedKey,
            macKey: macKey
        };
    },
    decode: function decode(value) {
        var encryptedKey = value.encryptedKey,
            maskKey = value.maskKey,
            macKey = value.macKey;
        if (maskKey) {
            var m = new Int32Array(maskKey),
                k = new Int32Array(encryptedKey);
            for (var i = 0, n = m.length / k.length; i < n; i++) {
                for (var j = 0, l = k.length; j < l; j++) {
                    k[j] = k[j] + m[l * i + j] & 0xffffffff;
                }
            }
        }
        var result = new Uint8Array(encryptedKey.byteLength + macKey.byteLength);
        result.set(new Uint8Array(encryptedKey), 0);
        result.set(new Uint8Array(macKey), 32);
        return result.buffer;
    }
});

var GostR3410TransportParameters = SEQUENCE({
    encryptionParamSet: Gost2814789ParamSet,
    ephemeralPublicKey: OPTIONAL(CTX(0, IMPLICIT(GostSubjectPublicKeyInfo))),
    ukm: OCTET_STRING
}); // ( SIZE(8) )

var GostR3410KeyTransport = ENCLOSURE(SEQUENCE({
    sessionEncryptedKey: Gost2814789EncryptedKey,
    transportParameters: OPTIONAL(CTX(0, IMPLICIT(GostR3410TransportParameters)))
}), {
    encode: function encode(value) {
        var algorithm = value.algorithm;
        return {
            sessionEncryptedKey: value.sessionEncryptedKey,
            transportParameters: {
                encryptionParamSet: attributes['sBox'][algorithm.wrapping.sBox || 'E-A'],
                ephemeralPublicKey: algorithm['public'],
                ukm: algorithm.ukm
            }
        };
    },
    decode: function decode(value) {
        return {
            algorithm: {
                wrapping: parameters[value.transportParameters.encryptionParamSet],
                ukm: value.transportParameters.ukm,
                'public': value.transportParameters.ephemeralPublicKey
            },
            sessionEncryptedKey: value.sessionEncryptedKey
        };
    }
});

var SCGostKeyTransport = ENCLOSURE(SEQUENCE({
    sessionEncryptedKey: Gost2814789EncryptedKey,
    ukm: SEQUENCE({
        ephemeralPublicKey: GostSubjectPublicKeyInfo,
        addedukm: OPTIONAL(CTX(0, EXPLICIT(UserKeyingMaterial)))
    })
}), {
    encode: function encode(value) {
        var algorithm = value.algorithm;
        return {
            sessionEncryptedKey: value.sessionEncryptedKey,
            ukm: {
                ephemeralPublicKey: algorithm['public'],
                addedukm: algorithm.ukm
            }
        };
    },
    decode: function decode(value) {
        return {
            algorithm: {
                ukm: value.ukm.addedukm,
                'public': value.ukm.ephemeralPublicKey
            },
            sessionEncryptedKey: value.sessionEncryptedKey
        };
    }
});

var GostEncryptedKey = function (typeSet) {
    /**
     * Gost Encrypted key encoder for CMS
     *
     * @class GostASN1.GostEncryptedKey
     * @extends GostASN1.Sequence
     * @param {AlgorithmIdentifier} algorithm
     */
    return function (algorithm) {
        var type = typeSet[algorithm.id];
        return type ? ENCAPSULATES(type) : ANY;
    };
}({
    // Key transport algorithms
    'id-sc-gostR3410-2001': SCGostKeyTransport,
    'id-sc-gostR3410-94': SCGostKeyTransport,
    'id-GostR3410-2001': GostR3410KeyTransport,
    'id-GostR3410-94': GostR3410KeyTransport,
    'id-tc26-gost3410-12-256': GostR3410KeyTransport,
    'id-tc26-gost3410-12-512': GostR3410KeyTransport,
    // Key agreement algorithms
    'id-GostR3410-94-CryptoPro-ESDH': Gost2814789EncryptedKey,
    'id-GostR3410-2001-CryptoPro-ESDH': Gost2814789EncryptedKey,
    'id-tc26-agreement-gost-3410-12-256': Gost2814789EncryptedKey,
    'id-tc26-agreement-gost-3410-12-512': Gost2814789EncryptedKey,
    'id-sc-r3410-ESDH-r3411kdf': Gost2814789EncryptedKey,
    // Key encryption key algorithms
    'id-Gost28147-89-None-KeyWrap': Gost2814789EncryptedKey,
    'id-Gost28147-89-CryptoPro-KeyWrap': Gost2814789EncryptedKey,
    'id-sc-cmsGostWrap': Gost2814789EncryptedKey,
    'id-sc-cmsGost28147Wrap': Gost2814789EncryptedKey
});

// </editor-fold>

/*
     * CryptoPro Gost Private Key Store
     */ // <editor-fold defaultstate="collapsed">

var GostKeyContainerContentAttributes = BIT_STRING({
    kccaSoftPassword: 0,
    kccaReservePrimary: 1,
    kccaPrimaryKeyAbsent: 2,
    kccaFKCShared: 3
});

var GostPrivateKeyAttributes = BIT_STRING({
    pkaExportable: 0,
    pkaUserProtect: 1,
    pkaExchange: 2,
    pkaEphemeral: 3,
    pkaNonCachable: 4,
    pkaDhAllowed: 5
});

var GostPrivateKeyParameters = SEQUENCE({
    attributes: OPTIONAL(GostPrivateKeyAttributes),
    privateKeyAlgorithm: OPTIONAL(CTX(0, IMPLICIT(KeyAlgorithmIdentifier)))
});

var CertificateLink = SEQUENCE({
    path: IA5String,
    hmac: Gost2814789MAC
});

var PasswordPolicy = AlgorithmIdentifier;

var GostKeyContainerContent = SEQUENCE({
    containerAlgoritmIdentifier: OPTIONAL(CTX(0, IMPLICIT(AlgorithmIdentifier))),
    containerName: OPTIONAL(IA5String),
    attributes: GostKeyContainerContentAttributes,
    primaryPrivateKeyParameters: GostPrivateKeyParameters,
    hmacPassword: OPTIONAL(CTX(2, IMPLICIT(Gost2814789MAC))),
    secondaryEncryptedPrivateKey: OPTIONAL(CTX(3, IMPLICIT(Gost2814789EncryptedKey))),
    secondaryPrivateKeyParameters: OPTIONAL(CTX(4, IMPLICIT(GostPrivateKeyParameters))),
    primaryCertificate: OPTIONAL(CTX(5, IMPLICIT(OCTET_STRING(ENCAPSULATES(Certificate))))),
    secondaryCertificate: OPTIONAL(CTX(6, IMPLICIT(OCTET_STRING(ENCAPSULATES(Certificate))))),
    encryptionContainerName: OPTIONAL(CTX(7, IMPLICIT(IA5String))),
    primaryCertificateLink: OPTIONAL(CTX(8, IMPLICIT(CertificateLink))),
    secondaryCertificateLink: OPTIONAL(CTX(9, IMPLICIT(CertificateLink))),
    primaryFP: OPTIONAL(CTX(10, IMPLICIT(OCTET_STRING))),
    secondaryFP: OPTIONAL(CTX(11, IMPLICIT(OCTET_STRING))),
    passwordPolicy: OPTIONAL(PasswordPolicy),
    containerSecurityLevel: OPTIONAL(INTEGER),
    extensions: OPTIONAL(CTX(12, IMPLICIT(Extensions({
        keyValidity: SEQUENCE({
            notBefore: OPTIONAL(CTX(0, IMPLICIT(GeneralizedTime))),
            notAfter: OPTIONAL(CTX(1, IMPLICIT(GeneralizedTime)))
        })
    })))),
    secondaryEncryptionContainerName: OPTIONAL(CTX(13, IMPLICIT(IA5String)))
});

/**
 * CryptoPro key container header
 *
 * @class GostASN1.GostKeyContainer
 * @extends GostASN1.Sequence
 */
var GostKeyContainer = SEQUENCE({
    keyContainerContent: GostKeyContainerContent,
    hmacKeyContainerContent: Gost2814789MAC
});

/**
 * CryptoPro key container name
 *
 * @class GostASN1.GostKeyContainerName
 * @extends GostASN1.Sequence
 */
var GostKeyContainerName = SEQUENCE({
    containerName: IA5String,
    extElem1: OPTIONAL(ANY)
});

/**
 * PrivateKey encrypted content for CryptoPro key containers
 *
 * @class GostASN1.GostPrivateKeys
 * @extends GostASN1.Sequence
 */
var GostPrivateKeys = SEQUENCE({
    primaryKey: Gost2814789Key,
    secondaryKey: OPTIONAL(Gost2814789Key),
    hmacKey: OPTIONAL(Gost2814789MAC)
});

/**
 * PrivateKey masks for CryptoPro key containers
 *
 * @class GostASN1.GostPrivateMasks
 * @extends GostASN1.Sequence
 */
var GostPrivateMasks = SEQUENCE({
    mask: Gost2814789Key,
    randomStatus: OCTET_STRING,
    hmacRandom: Gost2814789MAC
});

// </editor-fold>

/*
     * ViPNet Gost Private Key Store
     */ // <editor-fold defaultstate="collapsed">

var ViPNetKeyInfo = SEQUENCE({
    keyClass: INTEGER,
    keyType: INTEGER,
    algorithm: OPTIONAL(CTX(0, EXPLICIT(KeyAlgorithmIdentifier))),
    serialNumber: OPTIONAL(CTX(1, EXPLICIT(OCTET_STRING))),
    addSerialNumber: OPTIONAL(CTX(2, EXPLICIT(OCTET_STRING))),
    certSerialNumber: OPTIONAL(CTX(3, EXPLICIT(OCTET_STRING))),
    subjectUID: OPTIONAL(CTX(4, EXPLICIT(OCTET_STRING))),
    recipientUID: OPTIONAL(CTX(5, EXPLICIT(OCTET_STRING))),
    validity: OPTIONAL(CTX(6, EXPLICIT(CHOICE({
        validity: Validity,
        keyValidity: SEQUENCE({
            notBefore: OPTIONAL(CTX(0, IMPLICIT(GeneralizedTime))),
            notAfter: OPTIONAL(CTX(1, IMPLICIT(GeneralizedTime)))
        })
    }, function () {
        return 'keyValidity';
    })))),
    keyUID: OPTIONAL(CTX(7, EXPLICIT(BIT_STRING))),
    flags: OPTIONAL(CTX(10, EXPLICIT(INTEGER)))
});

/**
 * ViPNet key container info
 *
 * @class GostASN1.ViPNetInfo
 * @extends GostASN1.Sequence
 */
var ViPNetInfo = SEQUENCE({
    version: INTEGER,
    keyInfo: ViPNetKeyInfo,
    defenceKeyInfo: ViPNetKeyInfo,
    certificate: OPTIONAL(CTX(0, EXPLICIT(Certificate))),
    publicKey: OPTIONAL(CTX(1, EXPLICIT(OCTET_STRING)))
});

// </editor-fold>

/*
     * Cryptographic Message Syntax
     *
     * http://tools.ietf.org/html/rfc5652
     *
     */ // <editor-fold defaultstate="collapsed">

// CMS signed data
var CMSVersion = INTEGER;

var ContentType = OBJECT_IDENTIFIER;

var SigningTime = Time;

var SubjectKeyIdentifier = OCTET_STRING;

var Digest = OCTET_STRING;

var MessageAuthenticationCode = OCTET_STRING;

var BodyPartID = INTEGER;

var BodyPartPath = SEQUENCE_OF(BodyPartID);

var CMCUnsignedData = SEQUENCE({
    bodyPartPath: BodyPartPath,
    identifier: OBJECT_IDENTIFIER,
    content: ANY
}); // DEFINED BY identifier
/**
 * SignedAttributes is a collection of attributes that are signed.  The
 * field is optional, but it MUST be present if the content type of
 * the EncapsulatedContentInfo value being signed is not id-data.
 * SignedAttributes MUST be DER encoded, even if the rest of the
 * structure is BER encoded.  Useful attribute types, such as signing
 * time, are defined in Section 11.  If the field is present, it MUST
 * contain, at a minimum, the following two attributes: <br>
 *
 * A content-type attribute having as its value the content type
 * of the EncapsulatedContentInfo value being signed.  Section
 * 11.1 defines the content-type attribute.  However, the
 * content-type attribute MUST NOT be used as part of a
 * countersignature unsigned attribute as defined in Section 11.4.<br>
 *
 * A message-digest attribute, having as its value the message
 * digest of the content.  Section 11.2 defines the message-digest
 * attribute.
 *
 * @class GostASN1.SignedAttributes
 * @extends GostASN1.Attributes
 */
var SignedAttributes = Attributes({
    contentType: SET_OF_SINGLE(ContentType),
    signingTime: SET_OF_SINGLE(SigningTime),
    messageDigest: SET_OF_SINGLE(OCTET_STRING)
});

var UnsignedAttributes = Attributes(function (type) {
    /**
     * UnsignedAttributes is a collection of attributes that are not signed.
     * The field is optional.  Useful attribute types, such as
     * countersignatures.
     *
     * @class GostASN1.UnsignedAttributes
     * @extends GostASN1.Attributes
     */
    //    var UnsignedAttributes = Attributes({
    //        countersignature: SET_OF(Countersignature), // -- check forward
    //        unsignedData: SET_OF(CMCUnsignedData)
    //    });
    return {
        countersignature: SET_OF(Countersignature), // recursion
        unsignedData: SET_OF(CMCUnsignedData)
    }[type];
});

var AuthAttributes = SignedAttributes,
    UnauthAttributes = Attributes,
    UnprotectedAttributes = Attributes;

var IssuerAndSerialNumber = SEQUENCE({
    issuer: Name,
    serialNumber: CertificateSerialNumber
});

var SignerIdentifier = CHOICE({
    issuerAndSerialNumber: IssuerAndSerialNumber,
    subjectKeyIdentifier: CTX(0, IMPLICIT(SubjectKeyIdentifier))
}, function (value) {
    return isBinary(value) ? 'subjectKeyIdentifier' : 'issuerAndSerialNumber';
});

var SignerInfo = SEQUENCE({
    version: CMSVersion,
    sid: SignerIdentifier,
    digestAlgorithm: DigestAlgorithmIdentifier,
    signedAttrs: OPTIONAL(CTX(0, IMPLICIT(SignedAttributes))),
    signatureAlgorithm: SignatureAlgorithmIdentifier,
    signatureValue: OCTET_STRING,
    unsignedAttrs: OPTIONAL(CTX(1, IMPLICIT(UnsignedAttributes)))
});

var Countersignature = SignerInfo,
    SignerInfos = SET_OF(SignerInfo),
    DigestAlgorithmIdentifiers = SET_OF(DigestAlgorithmIdentifier),
    AttributeCertificateV2 = AttributeCertificate;

var ExtendedCertificateInfo = COMBINE(SEQUENCE({
    version: CMSVersion,
    certificate: Certificate,
    attributes: UnauthAttributes
}));

var ExtendedCertificate = SEQUENCE({
    extendedCertificateInfo: ExtendedCertificateInfo,
    signatureAlgorithm: SignatureAlgorithmIdentifier,
    signatureValue: BIT_STRING
});

var OtherCertificateFormat = SEQUENCE({
    otherCertFormat: OBJECT_IDENTIFIER,
    otherCert: ANY
});

var AttributeCertificateInfoV1 = COMBINE(SEQUENCE({
    version: INTEGER,
    subject: CHOICE({
        baseCertificateID: CTX(0, IMPLICIT(IssuerSerial)), // associated with a Public Key Certificate
        subjectName: CTX(1, IMPLICIT(GeneralNames))
    }, function (value) {
        return value.issuer ? 'baseCertificateID' : 'subjectName';
    }), //associated with a name
    issuer: GeneralNames,
    signature: SignatureAlgorithmIdentifier,
    serialNumber: CertificateSerialNumber,
    attCertValidityPeriod: AttCertValidityPeriod,
    attributes: AttributeSequence,
    issuerUniqueID: OPTIONAL(UniqueIdentifier),
    extensions: OPTIONAL(CertExtensions)
}));

var AttributeCertificateV1 = SEQUENCE({
    acInfo: AttributeCertificateInfoV1,
    signatureAlgorithm: SignatureAlgorithmIdentifier,
    signatureValue: BIT_STRING
});

var EncapsulatedContentInfo = SEQUENCE({
    eContentType: ContentType,
    eContent: OPTIONAL(CTX(0, EXPLICIT(OCTET_STRING)))
});

var CertificateChoices = CHOICE({
    certificate: Certificate,
    extendedCertificate: CTX(0, IMPLICIT(ExtendedCertificate)), // Obsolete
    v1AttrCert: CTX(1, IMPLICIT(AttributeCertificateV1)), // Obsolete
    v2AttrCert: CTX(2, IMPLICIT(AttributeCertificateV2)),
    other: CTX(3, IMPLICIT(OtherCertificateFormat))
}, function (value) {
    return value.holder ? 'AttributeCertificateV2' : value.certificate ? 'ExtendedCertificate' : value.otherCertFormat ? 'other' : 'certificate';
});

var OtherRevocationInfoFormat = SEQUENCE({
    otherRevInfoFormat: OBJECT_IDENTIFIER,
    otherRevInfo: ANY
});

var RevocationInfoChoice = CHOICE({
    crl: CertificateList,
    other: CTX(1, IMPLICIT(OtherRevocationInfoFormat))
}, function (value) {
    return value.otherRevInfoFormat ? 'other' : 'crl';
});

var CertificateSet = SET_OF(CertificateChoices),
    RevocationInfoChoices = SET_OF(RevocationInfoChoice);

/**
 * The signed-data content type consists of a content of any type and zero or more
 * signature values.  Any number of signers in parallel can sign any type of content.<br><br>
 *
 * The signed-data content type shall have ASN.1 type SignedData:<br><br>
 *<pre>
 *
 *      SignedData ::= SEQUENCE {
     *        version CMSVersion,
     *        digestAlgorithms DigestAlgorithmIdentifiers,
     *        encapContentInfo EncapsulatedContentInfo,
     *        certificates [0] IMPLICIT CertificateSet OPTIONAL,
     *        crls [1] IMPLICIT RevocationInfoChoices OPTIONAL,
     *        signerInfos SignerInfos }
 *
 *      DigestAlgorithmIdentifiers ::= SET OF DigestAlgorithmIdentifier
 *
 *      SignerInfos ::= SET OF SignerInfo
 *
 *       EncapsulatedContentInfo ::= SEQUENCE {
     *        eContentType ContentType,
     *        eContent [0] EXPLICIT OCTET STRING OPTIONAL }
 *
 *</pre>
 * Per-signer information is represented in the type SignerInfo:<br><br>
 *<pre>
 *
 *      SignerInfo ::= SEQUENCE {
     *        version CMSVersion,
     *        sid SignerIdentifier,
     *        digestAlgorithm DigestAlgorithmIdentifier,
     *        signedAttrs [0] IMPLICIT SignedAttributes OPTIONAL,
     *        signatureAlgorithm SignatureAlgorithmIdentifier,
     *        signature SignatureValue,
     *        unsignedAttrs [1] IMPLICIT UnsignedAttributes OPTIONAL }
 *
 *      SignerIdentifier ::= CHOICE {
     *        issuerAndSerialNumber IssuerAndSerialNumber,
     *        subjectKeyIdentifier [0] SubjectKeyIdentifier }
 *
 *      SignedAttributes ::= SET SIZE (1..MAX) OF Attribute
 *
 *      UnsignedAttributes ::= SET SIZE (1..MAX) OF Attribute
 *
 *     SignatureValue ::= OCTET STRING
 *
 *</pre>
 * See also {@link GostASN1.SignedAttributes} and {@link GostASN1.UnsignedAttributes}
 * @class GostASN1.SignedData
 * @extends GostASN1.Sequence
 * @property {number} version The syntax version number
 * @property {AlgorithmIdentifier[]} digestAlgorithms Collection of message digest algorithm identifiers
 * @property {GostASN1.Sequence} encapContentInfo The content is represented in the type EncapsulatedContentInfo
 * @property {GostASN1.Certificate[]} certificates Certificates
 * @property {GostASN1.CertificateList[]} crls Certificates
 * @property {GostASN1.Sequence[]} signerInfos The Signer information
 */
var SignedData = SEQUENCE({
    version: CMSVersion,
    digestAlgorithms: DigestAlgorithmIdentifiers,
    encapContentInfo: EncapsulatedContentInfo,
    certificates: OPTIONAL(CTX(0, IMPLICIT(CertificateSet))),
    crls: OPTIONAL(CTX(1, IMPLICIT(RevocationInfoChoices))),
    signerInfos: SignerInfos
});

var RecipientIdentifier = CHOICE({
    issuerAndSerialNumber: IssuerAndSerialNumber,
    subjectKeyIdentifier: CTX(0, IMPLICIT(SubjectKeyIdentifier))
}, function (value) {
    return isBinary(value) ? 'subjectKeyIdentifier' : 'issuerAndSerialNumber';
});

var KeyTransRecipientInfo = SEQUENCE({
    version: CMSVersion, // always set to 0 or 2
    rid: RecipientIdentifier,
    keyEncryptionAlgorithm: KeyEncryptionAlgorithmIdentifier,
    encryptedKey: EncryptedKey
});

var OtherKeyAttribute = SEQUENCE({
    keyAttrId: OBJECT_IDENTIFIER,
    keyAttr: OPTIONAL(ANY)
});

var RecipientKeyIdentifier = SEQUENCE({
    subjectKeyIdentifier: SubjectKeyIdentifier,
    date: OPTIONAL(GeneralizedTime),
    other: OPTIONAL(OtherKeyAttribute)
});

var KeyAgreeRecipientIdentifier = CHOICE({
    issuerAndSerialNumber: IssuerAndSerialNumber,
    rKeyId: CTX(0, IMPLICIT(RecipientKeyIdentifier))
}, function (value) {
    return isBinary(value) ? 'rKeyId' : 'issuerAndSerialNumber';
});

var RecipientEncryptedKey = SEQUENCE({
    rid: KeyAgreeRecipientIdentifier,
    encryptedKey: EncryptedKey
});

var RecipientEncryptedKeys = SEQUENCE_OF(RecipientEncryptedKey);

var OriginatorPublicKey = SEQUENCE({
    algorithm: KeyAlgorithmIdentifier,
    publicKey: BIT_STRING
});

var MQVuserKeyingMaterial = SEQUENCE({ // ECC rfc5753 KeyAgreeRecipientInfo in ukm
    ephemeralPublicKey: OriginatorPublicKey,
    addedukm: OPTIONAL(CTX(0, EXPLICIT(UserKeyingMaterial)))
});

var OriginatorIdentifierOrKey = CHOICE({
    issuerAndSerialNumber: IssuerAndSerialNumber,
    subjectKeyIdentifier: CTX(0, IMPLICIT(SubjectKeyIdentifier)),
    originatorKey: CTX(1, IMPLICIT(OriginatorPublicKey))
}, function (value) {
    return isBinary(value) ? 'subjectKeyIdentifier' : value.algorithm ? 'originatorKey' : 'issuerAndSerialNumber';
});

var KeyAgreeRecipientInfo = SEQUENCE({
    version: CMSVersion, // always set to 3
    originator: CTX(0, EXPLICIT(OriginatorIdentifierOrKey)),
    ukm: OPTIONAL(CTX(1, EXPLICIT(UserKeyingMaterial))),
    keyEncryptionAlgorithm: KeyEncryptionAlgorithmIdentifier,
    recipientEncryptedKeys: RecipientEncryptedKeys
});

var KEKIdentifier = SEQUENCE({
    keyIdentifier: OCTET_STRING,
    date: OPTIONAL(GeneralizedTime),
    other: OPTIONAL(OtherKeyAttribute)
});

var KEKRecipientInfo = SEQUENCE({
    version: CMSVersion, // always set to 4
    kekid: KEKIdentifier,
    keyEncryptionAlgorithm: KeyEncryptionAlgorithmIdentifier,
    encryptedKey: EncryptedKey
});

var PasswordRecipientInfo = SEQUENCE({
    version: CMSVersion, // always set to 0
    friendlyName: OPTIONAL(CTX(0, IMPLICIT(KeyDerivationAlgorithmIdentifier))),
    keyEncryptionAlgorithm: KeyEncryptionAlgorithmIdentifier,
    encryptedKey: EncryptedKey
});

var OtherRecipientInfo = SEQUENCE({
    oriType: OBJECT_IDENTIFIER,
    oriValue: ANY
});

var RecipientInfo = CHOICE({
    ktri: KeyTransRecipientInfo,
    kari: CTX(1, IMPLICIT(KeyAgreeRecipientInfo)),
    kekri: CTX(2, IMPLICIT(KEKRecipientInfo)),
    pwri: CTX(3, IMPLICIT(PasswordRecipientInfo)),
    ori: CTX(4, IMPLICIT(OtherRecipientInfo))
}, function (value) {
    return value.rid ? 'ktri' : value.originator ? 'kari' : value.kekid ? 'kekri' : value.oriType ? 'ori' : 'pwri';
});

var OriginatorInfo = SEQUENCE({
    certs: OPTIONAL(CTX(0, IMPLICIT(CertificateSet))),
    crls: OPTIONAL(CTX(1, IMPLICIT(RevocationInfoChoices)))
});

var RecipientInfos = SET_OF(RecipientInfo);

// EncryptedContentInfo
var EncryptedContentInfo = SEQUENCE({
    contentType: ContentType,
    contentEncryptionAlgorithm: ContentEncryptionAlgorithmIdentifier,
    encryptedContent: OPTIONAL(CTX(0, IMPLICIT(EncryptedContent)))
});

/**
 * The enveloped-data content type consists of an encrypted content of
 * any type and encrypted content-encryption keys for one or more
 * recipients.  The combination of the encrypted content and one
 * encrypted content-encryption key for a recipient is a "digital
 * envelope" for that recipient.  Any type of content can be enveloped
 * for an arbitrary number of recipients using any of the supported key
 * management techniques for each recipient.<br><br>
 *
 * The typical application of the enveloped-data content type will
 * represent one or more recipients' digital envelopes on content of the
 * data or signed-data content types.<br><br>
 * <pre>
 *
 *      EnvelopedData ::= SEQUENCE {
     *        version CMSVersion,
     *        originatorInfo [0] IMPLICIT OriginatorInfo OPTIONAL,
     *        recipientInfos RecipientInfos,
     *        encryptedContentInfo EncryptedContentInfo,
     *        unprotectedAttrs [1] IMPLICIT UnprotectedAttributes OPTIONAL }
 *
 *      OriginatorInfo ::= SEQUENCE {
     *        certs [0] IMPLICIT CertificateSet OPTIONAL,
     *        crls [1] IMPLICIT RevocationInfoChoices OPTIONAL }
 *
 *      RecipientInfos ::= SET SIZE (1..MAX) OF RecipientInfo
 *
 *      EncryptedContentInfo ::= SEQUENCE {
     *        contentType ContentType,
     *        contentEncryptionAlgorithm ContentEncryptionAlgorithmIdentifier,
     *        encryptedContent [0] IMPLICIT EncryptedContent OPTIONAL }
 *
 *      EncryptedContent ::= OCTET STRING
 *
 *      UnprotectedAttributes ::= SET SIZE (1..MAX) OF Attribute
 *
 * </pre>
 * @class GostASN1.EnvelopedData
 * @extends GostASN1.Sequence
 * @property {number} version The syntax version number
 * @property {GostASN1.Sequence} originatorInfo Optionally provides information about the originator.
 * @property {GostASN1.Sequence[]} recipientInfos Collection of per-recipient information.
 * @property {GostASN1.Sequence} encryptedContentInfo The content is represented in the type EncryptedContentInfo
 * @property {Attributes} unprotectedAttrs The unprotected attributes
 */
var EnvelopedData = SEQUENCE({
    version: CMSVersion,
    originatorInfo: OPTIONAL(CTX(0, IMPLICIT(OriginatorInfo))),
    recipientInfos: RecipientInfos,
    encryptedContentInfo: EncryptedContentInfo,
    unprotectedAttrs: OPTIONAL(CTX(1, IMPLICIT(UnprotectedAttributes)))
});

/**
 * The digested-data content type consists of content of any type and a
 * message digest of the content.<br><br>
 * Typically, the digested-data content type is used to provide content
 * integrity, and the result generally becomes an input to the
 * enveloped-data content type.<br><br>
 * <pre>
 *
 *      DigestedData ::= SEQUENCE {
     *        version CMSVersion,
     *        digestAlgorithm DigestAlgorithmIdentifier,
     *        encapContentInfo EncapsulatedContentInfo,
     *        digest Digest }
 *
 *      Digest ::= OCTET STRING
 *
 *</pre>
 * @class GostASN1.DigestedData
 * @extends GostASN1.Sequence
 * @property {number} version The syntax version number
 * @property {AlgorithmIdentifier} digestAlgorithm Message digest algorithm identifier
 * @property {GostASN1.Sequence} encapContentInfo The content is represented in the type EncapsulatedContentInfo
 * @property {CryptoOperationData} digest The degist
 */
var DigestedData = SEQUENCE({
    version: CMSVersion,
    digestAlgorithm: DigestAlgorithmIdentifier,
    encapContentInfo: EncapsulatedContentInfo,
    digest: Digest
});

/**
 * The encrypted-data content type consists of encrypted content of any
 * type.  Unlike the enveloped-data content type, the encrypted-data
 * content type has neither recipients nor encrypted content-encryption
 * keys.  Keys MUST be managed by other means.<br><br>
 *
 * The typical application of the encrypted-data content type will be to
 * encrypt the content of the data content type for local storage,
 * perhaps where the encryption key is derived from a password.<br><br>
 * <pre>
 *
 *      EncryptedData ::= SEQUENCE {
     *        version CMSVersion,
     *        encryptedContentInfo EncryptedContentInfo,
     *        unprotectedAttrs [1] IMPLICIT UnprotectedAttributes OPTIONAL }
 *
 *      EncryptedContentInfo ::= SEQUENCE {
     *        contentType ContentType,
     *        contentEncryptionAlgorithm ContentEncryptionAlgorithmIdentifier,
     *        encryptedContent [0] IMPLICIT EncryptedContent OPTIONAL }
 *
 *      EncryptedContent ::= OCTET STRING
 *
 * </pre>
 * @class GostASN1.EncryptedData
 * @extends GostASN1.Sequence
 * @property {number} version The syntax version number
 * @property {GostASN1.Sequence} encryptedContentInfo The content is represented in the type EncryptedContentInfo
 * @property {Attributes} unprotectedAttrs The unprotected attributes
 */
var EncryptedData = SEQUENCE({
    version: CMSVersion,
    encryptedContentInfo: EncryptedContentInfo,
    unprotectedAttrs: OPTIONAL(CTX(1, IMPLICIT(UnprotectedAttributes)))
});

/**
 * The authenticated-data content type consists of content of any type,
 * a message authentication code (MAC), and encrypted authentication
 * keys for one or more recipients.  The combination of the MAC and one
 * encrypted authentication key for a recipient is necessary for that
 * recipient to verify the integrity of the content.  Any type of
 * content can be integrity protected for an arbitrary number of
 * recipients.<br><br>
 * <pre>
 *
 *      AuthenticatedData ::= SEQUENCE {
     *        version CMSVersion,
     *        originatorInfo [0] IMPLICIT OriginatorInfo OPTIONAL,
     *        recipientInfos RecipientInfos,
     *        macAlgorithm MessageAuthenticationCodeAlgorithm,
     *        digestAlgorithm [1] DigestAlgorithmIdentifier OPTIONAL,
     *        encapContentInfo EncapsulatedContentInfo,
     *        authAttrs [2] IMPLICIT AuthAttributes OPTIONAL,
     *        mac MessageAuthenticationCode,
     *        unauthAttrs [3] IMPLICIT UnauthAttributes OPTIONAL }
 *
 *      AuthAttributes ::= SET SIZE (1..MAX) OF Attribute
 *
 *      UnauthAttributes ::= SET SIZE (1..MAX) OF Attribute
 *
 *      MessageAuthenticationCode ::= OCTET STRING
 *
 * </pre>
 * @class GostASN1.AuthenticatedData
 * @extends GostASN1.Sequence
 * @property {number} version The syntax version number
 * @property {GostASN1.Sequence} originatorInfo Optionally provides information about the originator.
 * @property {GostASN1.Sequence[]} recipientInfos Collection of per-recipient information.
 * @property {AlgorithmIdentifier} macAlgorithm Identifies the Message Authentication Code algorithm
 * @property {AlgorithmIdentifier} digestAlgorithm Identifies the Digest algorithm
 * @property {GostASN1.Sequence} encapContentInfo The content is represented in the type EncapsulatedContentInfo
 * @property {Attributes} authAttrs The autheniticated attributes
 * @property {CryptoOpertionData} mac The Message Authentication Code
 * @property {Attributes} unauthAttrs The unautheniticated attributes
 */
var AuthenticatedData = SEQUENCE({
    version: CMSVersion,
    originatorInfo: OPTIONAL(CTX(0, IMPLICIT(OriginatorInfo))),
    recipientInfos: RecipientInfos,
    macAlgorithm: MessageAuthenticationCodeAlgorithm,
    digestAlgorithm: OPTIONAL(CTX(1, DigestAlgorithmIdentifier)),
    encapContentInfo: EncapsulatedContentInfo,
    authAttrs: OPTIONAL(CTX(2, IMPLICIT(AuthAttributes))),
    mac: MessageAuthenticationCode,
    unauthAttrs: OPTIONAL(CTX(3, IMPLICIT(UnauthAttributes)))
});

// AuthEnvelopedData RFC 5911
var AuthEnvelopedData = SEQUENCE({
    version: CMSVersion,
    originatorInfo: OPTIONAL(CTX(0, IMPLICIT(OriginatorInfo))),
    recipientInfos: RecipientInfos,
    authEncryptedContentInfo: EncryptedContentInfo,
    authAttrs: OPTIONAL(CTX(1, IMPLICIT(AuthAttributes))),
    mac: MessageAuthenticationCode,
    unauthAttrs: OPTIONAL(CTX(2, IMPLICIT(UnauthAttributes)))
});

// EncryptedKeyPackage rfc6032
var EncryptedKeyPackage = CHOICE({
    encrypted: EncryptedData,
    enveloped: CTX(0, IMPLICIT(EnvelopedData)),
    authEnveloped: CTX(1, IMPLICIT(AuthEnvelopedData))
}, function (value) {
    return value.encryptedContentInfo ? value.recipientInfos ? 'enveloped' : 'encrypted' : 'authEnveloped';
});

/**
 * Cryptographic Message Syntax<br>
 * The CMS associates a content type identifier with a content. The syntax
 * MUST have ASN.1 type ContentInfo:
 * <pre>
 *
 *  ContentInfo ::= SEQUENCE {
     *    contentType ContentType,
     *    content [0] EXPLICIT ANY DEFINED BY contentType }
 *
 *  ContentType ::= OBJECT IDENTIFIER
 *
 * </pre>
 * The fields of ContentInfo have the following meanings:
 * <ul>
 * <li>contentType indicates the type of the associated content.  It is
 * an object identifier; it is a unique string of integers assigned
 * by an authority that defines the content type.</li>
 * <li>content is the associated content.  The type of content can be
 * determined uniquely by contentType.  Content types for data,
 * signed-data, enveloped-data, digested-data, encrypted-data, and
 * authenticated-data are defined in this document.  If additional
 * content types are defined in other documents, the ASN.1 type
 * defined SHOULD NOT be a CHOICE type.</li>
 * </ul>
 * RFC 5652 references {@link http://tools.ietf.org/html/rfc5652}
 *
 * @class GostASN1.ContentInfo
 * @extends GostASN1.Sequence
 * @property {string} contentType The content type identifier
 * @property {(GostASN1.Sequence|CryptoOperationData)} content The content
 */
var ContentType = OBJECT_IDENTIFIER;

var ContentInfo = ATTRIBUTE({
    contentType: ContentType,
    content: function content(type) {
        return CTX(0, EXPLICIT(type));
    }
}, 'contentType', 'content', undefined, 'CMS')({
    data: OCTET_STRING,
    signedData: COMBINE(SignedData),
    envelopedData: COMBINE(EnvelopedData),
    digestedData: COMBINE(DigestedData),
    encryptedData: COMBINE(EncryptedData),
    authData: COMBINE(AuthenticatedData),
    encryptedKeyPkg: COMBINE(EncryptedKeyPackage),
    aKeyPackage: COMBINE(AsymmetricKeyPackage)
});

var DigestInfo = SEQUENCE({
    digestAlgorithm: DigestAlgorithmIdentifier,
    digest: Digest
});
// </editor-fold>

/*
     * PFX format syntax PKCS#12
     *
     * http://tools.ietf.org/html/rfc7292
     *
     */ // <editor-fold defaultstate="collapsed">

var PKCS12Attributes = Attributes({
    friendlyName: SET_OF_SINGLE(BMPString),
    keyProviderNameAttr: SET_OF_SINGLE(BMPString),
    localKeyId: SET_OF_SINGLE(OCTET_STRING),
    certKeyIdentifierPropId: SET_OF_SINGLE(OCTET_STRING)
});

var SafeBagType = OBJECT_IDENTIFIER;

var CertType = OBJECT_IDENTIFIER;

var CRLType = OBJECT_IDENTIFIER;

var SecretType = OBJECT_IDENTIFIER;

var KeyBag = PrivateKeyInfo;

var PKCS8ShroudedKeyBag = EncryptedPrivateKeyInfo;

var CertBag = ATTRIBUTE({
    certId: CertType,
    certValue: function certValue(type) {
        return CTX(0, EXPLICIT(type));
    }
}, 'certId', 'certValue')({
    // DER-encoded X.509 certificate stored in OCTET STRING
    x509Certificate: OCTET_STRING(ENCAPSULATES(Certificate)),
    // Base64-encoded SDSI certificate stored in IA5String
    sdsiCertificate: IA5String
}, OCTET_STRING);

var CRLBag = ATTRIBUTE({
    crlId: CRLType,
    crlValue: function crlValue(type) {
        return CTX(0, EXPLICIT(type));
    }
}, 'crlId', 'crlValue')({
    // DER-encoded X.509 certificate stored in OCTET STRING
    x509CRL: OCTET_STRING(ENCAPSULATES(CertificateList))
}, OCTET_STRING);

var SecretBag = ATTRIBUTE({
    secretTypeId: SecretType,
    secretValue: function secretValue(type) {
        return CTX(0, EXPLICIT(type));
    }
}, 'secretTypeId', 'secretValue')({
    secret: OCTET_STRING
}, OCTET_STRING);

var SafeBag = ATTRIBUTE({
    bagId: SafeBagType,
    bagValue: function bagValue(type) {
        return CTX(0, EXPLICIT(type));
    },
    bagAttributes: OPTIONAL(PKCS12Attributes)
}, 'bagId', 'bagValue')(function (type) {
    return {
        keyBag: KeyBag,
        pkcs8ShroudedKeyBag: PKCS8ShroudedKeyBag,
        certBag: CertBag,
        crlBag: CRLBag,
        secretBag: SecretBag,
        safeContentsBag: SafeContents // recursion
    }[type];
});

/**
 * The SafeContents Type<br><br>
 *
 * The sixth type of bag that can be held in a SafeBag is a
 * SafeContents. This recursive structure allows for arbitrary nesting
 * of multiple KeyBags, PKCS8ShroudedKeyBags, CertBags, CRLBags, and
 * SecretBags within the top-level SafeContents.
 * <pre>
 *  SafeContents ::= SEQUENCE OF SafeBag
 *   SafeBag ::= SEQUENCE {
     *       bagId BAG-TYPE.&id ({PKCS12BagSet})
     *       bagValue [0] EXPLICIT BAG-TYPE.&Type({PKCS12BagSet}{@bagId}),
     *       bagAttributes SET OF PKCS12Attribute OPTIONAL
     *   }
 *
 *   PKCS12Attribute ::= SEQUENCE {
     *       attrId ATTRIBUTE.&id ({PKCS12AttrSet}),
     *       attrValues SET OF ATTRIBUTE.&Type ({PKCS12AttrSet}{@attrId})
     *   } -- This type is compatible with the X.500 type ’Attribute’
 *
 *   PKCS12AttrSet ATTRIBUTE ::= {
     *       friendlyName | -- from PKCS #9 [23]
     *       localKeyId, -- from PKCS #9
     *       ... -- Other attributes are allowed
     *   }
 * </pre>
 * The SafeContents type is made up of SafeBags. Each SafeBag holds one
 * piece of information -- a key, a certificate, etc. -- which is
 * identified by an object identifier.<br><br>
 *
 * See {@link GostASN1.ContentInfo} and {@link GostASN1.PFX}<br><br>
 *
 * RFC 7292 references {@link http://tools.ietf.org/html/rfc7292}
 * @class GostASN1.SafeContents
 */
var SafeContents = SEQUENCE_OF(SafeBag);

/**
 * The AuthenticatedSafe<br><br>
 * Each compliant platform shall be able to import and export
 * AuthenticatedSafe PDUs wrapped in PFX PDUs.<br>
 * For integrity, the AuthenticatedSafe is either signed (if public-key
 * integrity mode is used) or MACed (if password integrity mode is used)
 * to produce a PFX PDU.
 * <pre>
 *      AuthenticatedSafe ::= SEQUENCE OF ContentInfo
 *
 *      -- Data if unencrypted
 *      -- EncryptedData if password-encrypted
 *      -- EnvelopedData if public key-encrypted
 * </pre>
 * As mentioned, the contentType field of authSafe shall be of type data
 * or signedData. The content field of the authSafe shall, either
 * directly (data case) or indirectly (signedData case), contain a BER-
 * encoded value of type AuthenticatedSafe.<br><br>
 *
 * See {@link GostASN1.ContentInfo} and {@link GostASN1.PFX}<br><br>
 *
 * RFC 7292 references {@link http://tools.ietf.org/html/rfc7292}
 *
 * @class GostASN1.AuthenticatedSafe
 */
var AuthenticatedSafe = SEQUENCE_OF(ContentInfo);

var MacData = SEQUENCE({
    mac: DigestInfo,
    macSalt: OCTET_STRING,
    // Note: The default is for historical reasons and its use is deprecated.
    iterations: DEFAULT(INTEGER, 1)
});

/**
 * PFX format syntax<br><br>
 *
 * This format corresponds to the data model presented above, with
 * wrappers for privacy and integrity. This section makes free
 * reference to PKCS #7 {@link GostASN1.ContentInfo}<br>
 * All modes of direct exchange use the same PDU format.  ASN.1 and BER-
 * encoding ensure platform independence.<br>
 * This standard has one ASN.1 export: PFX.  This is the outer integrity
 * wrapper.<br><br>
 * Instances of PFX contain:
 *  <ol>
 *  <li>A version indicator.  The version shall be v3 for this version of
 *      this document.</li>
 *  <li>A PKCS #7 ContentInfo, whose contentType is signedData in public-
 *      key integrity mode and data in password integrity mode.</li>
 *  <li>An optional instance of MacData, present only in password
 *      integrity.  This object, if present, contains a PKCS #7
 *      DigestInfo, which holds the MAC value, a macSalt, and an
 *      iterationCount.  As described in Appendix B, the MAC key is
 *      derived from the password, the macSalt, and the iterationCount;
 *      the MAC is computed from the authSafe value and the MAC key via HMAC.
 *      The password and the MAC key are not actually present anywhere in the PFX.
 *      The salt and (to a certain extent) the iteration count thwarts dictionary
 *      attacks against the integrity password. </li>
 *  </ol>
 *  <pre>
 *  PFX ::= SEQUENCE {
     *      version     INTEGER {v3(3)}(v3,...),
     *      authSafe    ContentInfo,
     *      macData     MacData OPTIONAL
     *  }
 *
 *  MacData ::= SEQUENCE {
     *      mac         DigestInfo,
     *      macSalt     OCTET STRING,
     *      iterations  INTEGER DEFAULT 1
     *      -- Note: The default is for historical reasons and its
     *      --       use is deprecated.
     *  }
 *  </pre>
 * See {@link GostASN1.ContentInfo}<br><br>
 *
 * RFC 7292 references {@link http://tools.ietf.org/html/rfc7292}
 * @class GostASN1.PFX
 * @extends GostASN1.Sequence
 * @property {number} version Encoded version number
 * @property {GostASN1.ContentInfo} authSafe ContentInfo with {@link GostASN1.AuthenticatedSafe} content
 */
var PFX = SEQUENCE({
    version: INTEGER,
    authSafe: ContentInfo,
    macData: OPTIONAL(MacData)
}, 'PFX');
// </editor-fold>

/*
     * Certificate Request Message Format
     *
     * http://tools.ietf.org/html/rfc4211
     *
     */ // <editor-fold defaultstate="collapsed">

var RegToken = UTF8String;

var Authenticator = UTF8String;

var CertId = SEQUENCE({
    issuer: GeneralName,
    serialNumber: INTEGER
});
var OldCertId = CertId;

var ProtocolEncrKey = SubjectPublicKeyInfo;

var EncryptedValue = SEQUENCE({
    // the intended algorithm for which the value will be used
    intendedAlg: OPTIONAL(CTX(0, IMPLICIT(AlgorithmIdentifier))),
    // the symmetric algorithm used to encrypt the value
    symmAlg: OPTIONAL(CTX(1, IMPLICIT(AlgorithmIdentifier))),
    // the (encrypted) symmetric key used to encrypt the value
    encSymmKey: OPTIONAL(CTX(2, IMPLICIT(BIT_STRING))),
    // algorithm used to encrypt the symmetric key
    keyAlg: OPTIONAL(CTX(3, IMPLICIT(AlgorithmIdentifier))),
    valueHint: OPTIONAL(CTX(4, IMPLICIT(OCTET_STRING))),
    // a brief description or identifier of the encValue content
    // (may be meaningful only to the sending entity, and used only
    // if EncryptedValue might be re-examined by the sending entity
    // in the future)
    encValue: BIT_STRING
});
var KeyGenParameters = OCTET_STRING;

// The encrypted private key MUST be placed in the envelopedData
// encryptedContentInfo encryptedContent OCTET STRING.
var EncryptedKey = CHOICE({
    encryptedValue: EncryptedValue, // Deprecated
    envelopedData: CTX(0, IMPLICIT(EnvelopedData))
}, function (value) {
    return value.encryptedContentInfo ? 'envelopedData' : 'encryptedValue';
});

var PKIArchiveOptions = CHOICE({
    // the actual value of the private key
    encryptedPrivKey: CTX(0, EncryptedKey),
    // parameters that allow the private key to be re-generated
    keyGenParameters: CTX(1, IMPLICIT(KeyGenParameters)),
    // set to TRUE if sender wishes receiver to archive the private
    // key of a key pair that the receiver generates in response to
    // this request; set to FALSE if no archival is desired.
    archiveRemGenPrivKey: CTX(2, IMPLICIT(BOOLEAN))
});

var SinglePubInfo = SEQUENCE({
    pubMethod: INTEGER({
        dontCare: 0,
        x500: 1,
        web: 2,
        ldap: 3
    }),
    pubLocation: OPTIONAL(GeneralName)
});

// pubInfos MUST NOT be present if action is "dontPublish"
// (if action is "pleasePublish" and pubInfos is omitted,
// "dontCare" is assumed)
var PKIPublicationInfo = SEQUENCE({
    action: INTEGER({
        dontPublish: 0,
        pleasePublish: 1
    }),
    pubInfos: OPTIONAL(SEQUENCE_OF(SinglePubInfo))
});

var SubsequentMessage = INTEGER({
    // requests that resulting certificate be encrypted for the
    // end entity (following which, POP will be proven in a
    // confirmation message)
    encrCert: 0,
    // requests that CA engage in challenge-response exchange with
    // end entity in order to prove private key possession
    challengeResp: 1
});

var POPOPrivKey = CHOICE({
    // possession is proven in this message (which contains the private
    // key itself (encrypted for the CA))
    thisMessage: CTX(0, IMPLICIT(BIT_STRING)), // Deprecated
    subsequentMessage: CTX(1, IMPLICIT(SubsequentMessage)),
    // possession will be proven in a subsequent message
    dhMAC: CTX(2, IMPLICIT(BIT_STRING)), // Deprecated
    agreeMAC: CTX(3, IMPLICIT(PKMACValue)),
    encryptedKey: CTX(4, IMPLICIT(EnvelopedData))
});

var PBMParameter = SEQUENCE({
    salt: OCTET_STRING,
    // AlgId for a One-Way Function (SHA-1 recommended)
    owf: AlgorithmIdentifier,
    // number of times the OWF is applied
    iterationCount: INTEGER,
    // the MAC AlgId (e.g., DES-MAC, Triple-DES-MAC [PKCS11], or HMAC [HMAC, RFC2202])
    mac: AlgorithmIdentifier
});

var PKMACValue = SEQUENCE({
    // algorithm value shall be PasswordBasedMac {1 2 840 113533 7 66 13}
    // parameter value is PBMParameter
    algId: AlgorithmIdentifier,
    value: BIT_STRING
});

var POPOSigningKeyInput = SEQUENCE({
    authInfo: CHOICE({
        // used only if an authenticated identity has been
        // established for the sender (e.g., a DN from a
        // previously-issued and currently-valid certificate)
        sender: CTX(0, EXPLICIT(GeneralName)), // GeneralName choice - explicit
        // used if no authenticated GeneralName currently exists for
        // the sender; publicKeyMAC contains a password-based MAC
        // on the DER-encoded value of publicKey
        publicKeyMAC: PKMACValue
    }),
    publicKey: SubjectPublicKeyInfo
}); // from CertTemplate

var POPOSigningKey = SEQUENCE({
    poposkInput: OPTIONAL(CTX(0, POPOSigningKeyInput)),
    algorithmIdentifier: AlgorithmIdentifier,
    signature: BIT_STRING
});

var ProofOfPossession = CHOICE({
    // used if the RA has already verified that the requester is in
    // possession of the private key
    raVerified: CTX(0, IMPLICIT(NULL)),
    signature: CTX(1, IMPLICIT(POPOSigningKey)),
    keyEncipherment: CTX(2, IMPLICIT(POPOPrivKey)),
    keyAgreement: CTX(3, IMPLICIT(POPOPrivKey))
});

var Controls = SEQUENCE_OF(AttributeTypeAndValue({
    regToken: RegToken,
    authenticator: Authenticator,
    pkiPublicationInfo: PKIPublicationInfo,
    pkiArchiveOptions: PKIArchiveOptions,
    oldCertID: OldCertId,
    protocolEncrKey: ProtocolEncrKey
}));

var OptionalValidity = SEQUENCE({
    notBefore: OPTIONAL(CTX(0, IMPLICIT(Time))),
    notAfter: OPTIONAL(CTX(1, IMPLICIT(Time)))
}); // at least one MUST be present

var CertTemplate = SEQUENCE({
    version: OPTIONAL(CTX(0, IMPLICIT(Version))),
    serialNumber: OPTIONAL(CTX(1, IMPLICIT(INTEGER))),
    signingAlg: OPTIONAL(CTX(2, IMPLICIT(AlgorithmIdentifier))),
    issuer: OPTIONAL(CTX(3, IMPLICIT(Name))),
    validity: OPTIONAL(CTX(4, IMPLICIT(OptionalValidity))),
    subject: OPTIONAL(CTX(5, IMPLICIT(Name))),
    publicKey: OPTIONAL(CTX(6, IMPLICIT(SubjectPublicKeyInfo))),
    issuerUID: OPTIONAL(CTX(7, IMPLICIT(UniqueIdentifier))),
    subjectUID: OPTIONAL(CTX(8, IMPLICIT(UniqueIdentifier))),
    extensions: OPTIONAL(CTX(9, IMPLICIT(Extensions)))
});

var CertRequest = SEQUENCE({
    certReqId: INTEGER, // ID for matching request and reply
    certTemplate: CertTemplate, // Selected fields of cert to be issued
    controls: OPTIONAL(Controls)
}); // Attributes affecting issuance

var UTF8Pairs = UTF8String;

var CertReq = CertRequest;

var EncKeyWithID = SEQUENCE({
    privateKey: PrivateKeyInfo,
    identifier: OPTIONAL(CHOICE({
        string: UTF8String,
        generalName: GeneralName
    }, function (value) {
        return typeof value === 'string' || value instanceof String ? 'string' : 'generalName';
    }))
});

var CertReqMsg = SEQUENCE({
    certReq: CertRequest,
    popo: OPTIONAL(ProofOfPossession),
    // content depends upon key type
    regInfo: OPTIONAL(SEQUENCE_OF(AttributeTypeAndValue({
        utf8Pairs: UTF8Pairs,
        certReq: CertReq,
        encKeyWithID: EncKeyWithID
    })))
});

var CertReqMessages = SEQUENCE_OF(CertReqMsg);

// </editor-fold>

/*
     * Certificate Management over CMS
     *
     * http://tools.ietf.org/html/rfc5272
     *
     */ // <editor-fold defaultstate="collapsed">

var PendInfo = SEQUENCE({
    pendToken: OCTET_STRING,
    pendTime: GeneralizedTime
});

var CMCStatus = INTEGER({
    success: 0,
    failed: 2,
    pending: 3,
    noSupport: 4,
    confirmRequired: 5,
    popRequired: 6,
    partial: 7
});

var CMCFailInfo = INTEGER({
    badAlg: 0,
    badMessageCheck: 1,
    badRequest: 2,
    badTime: 3,
    badCertId: 4,
    unsupportedExt: 5,
    mustArchiveKeys: 6,
    badIdentity: 7,
    popRequired: 8,
    popFailed: 9,
    noKeyReuse: 10,
    internalCAError: 11,
    tryLater: 12,
    authDataFail: 13
});

var CMCStatusInfo = SEQUENCE({
    cMCStatus: CMCStatus,
    bodyList: SEQUENCE_OF(BodyPartID),
    statusString: OPTIONAL(UTF8String),
    otherInfo: OPTIONAL(CHOICE({
        failInfo: CMCFailInfo,
        pendInfo: PendInfo
    }))
});

var AddExtensions = SEQUENCE({
    pkiDataReference: BodyPartID,
    certReferences: SEQUENCE_OF(BodyPartID),
    extensions: SEQUENCE_OF(Extension)
});

var LraPopWitness = SEQUENCE({
    pkiDataBodyid: BodyPartID,
    bodyIds: SEQUENCE_OF(BodyPartID)
});

var GetCert = SEQUENCE({
    issuerName: GeneralName,
    serialNumber: INTEGER
});

var GetCRL = SEQUENCE({
    issuerName: Name,
    cRLName: OPTIONAL(GeneralName),
    time: OPTIONAL(GeneralizedTime),
    reasons: OPTIONAL(ReasonFlags)
});

var RevokeRequest = SEQUENCE({
    issuerName: Name,
    serialNumber: INTEGER,
    reason: CRLReason,
    invalidityDate: OPTIONAL(GeneralizedTime),
    passphrase: OPTIONAL(OCTET_STRING),
    comment: OPTIONAL(UTF8String)
});

var DecryptedPOP = SEQUENCE({
    bodyPartID: BodyPartID,
    thePOPAlgID: AlgorithmIdentifier,
    thePOP: OCTET_STRING
});

var CMCCertId = IssuerAndSerialNumber;

var BodyPartReference = CHOICE({
    bodyPartID: BodyPartID,
    bodyPartPath: BodyPartPath
});

var CMCStatusInfoV2 = SEQUENCE({
    cMCStatus: CMCStatus,
    bodyList: SEQUENCE_OF(BodyPartReference),
    statusString: OPTIONAL(UTF8String),
    otherInfo: OPTIONAL(CHOICE({
        failInfo: CMCFailInfo,
        pendInfo: PendInfo,
        extendedFailInfo: SEQUENCE({
            failInfoOID: OBJECT_IDENTIFIER,
            failInfoValue: AttributeValue
        })
    }))
});

var PublishTrustAnchors = SEQUENCE({
    seqNumber: INTEGER,
    hashAlgorithm: AlgorithmIdentifier,
    anchorHashes: SEQUENCE_OF(OCTET_STRING)
});

var AuthPublish = BodyPartID;

var BodyPartList = SEQUENCE_OF(BodyPartID);

var CMCPublicationInfo = SEQUENCE({
    hashAlg: AlgorithmIdentifier,
    certHashes: SEQUENCE_OF(OCTET_STRING),
    pubInfo: PKIPublicationInfo
});

var ModCertTemplate = SEQUENCE({
    pkiDataReference: BodyPartPath,
    certReferences: BodyPartList,
    replace: DEFAULT(BOOLEAN, true),
    certTemplate: CertTemplate
});

var ControlsProcessed = SEQUENCE({
    bodyList: SEQUENCE_OF(BodyPartReference)
});

var IdentifyProofV2 = SEQUENCE({
    proofAlgID: AlgorithmIdentifier,
    macAlgId: AlgorithmIdentifier,
    witness: OCTET_STRING
});

var PopLinkWitnessV2 = SEQUENCE({
    keyGenAlgorithm: AlgorithmIdentifier,
    macAlgorithm: AlgorithmIdentifier,
    witness: OCTET_STRING
});

var TaggedCertificationRequest = SEQUENCE({
    bodyPartID: BodyPartID,
    certificationRequest: CertificationRequest
});

var TaggedContentInfo = SEQUENCE({
    bodyPartID: BodyPartID,
    contentInfo: ContentInfo
});

var OtherMsg = SEQUENCE({
    bodyPartID: BodyPartID,
    otherMsgType: OBJECT_IDENTIFIER,
    otherMsgValue: ANY
}); //DEFINED BY otherMsgType

var TaggedRequest = CHOICE({
    tcr: CTX(0, IMPLICIT(TaggedCertificationRequest)),
    crm: CTX(1, IMPLICIT(CertReqMsg)),
    orm: CTX(2, IMPLICIT(SEQUENCE({
        bodyPartID: BodyPartID,
        requestMessageType: OBJECT_IDENTIFIER,
        requestMessageValue: ANY
    })))
}); // DEFINED BY requestMessageType

var EncryptedPOP = SEQUENCE({
    request: TaggedRequest,
    cms: ContentInfo,
    thePOPAlgID: AlgorithmIdentifier,
    witnessAlgID: AlgorithmIdentifier,
    witness: OCTET_STRING
});

var TaggedAttribute = ATTRIBUTE({
    bodyPartID: BodyPartID,
    attrType: OBJECT_IDENTIFIER,
    attrValues: function attrValues(type) {
        return SET_OF(type);
    }
}, 'attrType', 'attrValues', AttributeValue)({
    statusInfo: CMCStatusInfo,
    identification: UTF8String,
    identityProof: OCTET_STRING,
    dataReturn: OCTET_STRING,
    transactionId: INTEGER,
    senderNonce: OCTET_STRING,
    recipientNonce: OCTET_STRING,
    addExtensions: AddExtensions,
    encryptedPOP: EncryptedPOP,
    decryptedPOP: DecryptedPOP,
    lraPOPWitness: LraPopWitness,
    getCert: GetCert,
    getCRL: GetCRL,
    revokeRequest: RevokeRequest,
    regInfo: OCTET_STRING,
    responseInfo: OCTET_STRING,
    queryPending: OCTET_STRING,
    popLinkRandom: OCTET_STRING,
    popLinkWitness: OCTET_STRING,
    confirmCertAcceptance: CMCCertId,
    statusInfoV2: CMCStatusInfoV2,
    trustedAnchors: PublishTrustAnchors,
    authPublish: AuthPublish,
    batchRequests: BodyPartList,
    batchResponses: BodyPartList,
    publishCert: CMCPublicationInfo,
    modCertTemplate: ModCertTemplate,
    controlProcessed: ControlsProcessed,
    popLinkWitnessV2: PopLinkWitnessV2,
    identityProofV2: IdentifyProofV2
});
/**
 * PKIData Content Type<br><br>
 *
 * The PKIData content type is used for the Full PKI Request.  A PKIData
 * content type is identified by:
 * <pre>
 *   id-cct-PKIData ::= {id-pkix id-cct(12) 2 }
 * </pre>
 * The ASN.1 structure corresponding to the PKIData content type is:
 * <pre>
 *   PKIData ::= SEQUENCE {
     *       controlSequence    SEQUENCE SIZE(0..MAX) OF TaggedAttribute,
     *       reqSequence        SEQUENCE SIZE(0..MAX) OF TaggedRequest,
     *       cmsSequence        SEQUENCE SIZE(0..MAX) OF TaggedContentInfo,
     *       otherMsgSequence   SEQUENCE SIZE(0..MAX) OF OtherMsg
     *   }
 * </pre>
 * All certification requests encoded into a single PKIData SHOULD be
 * for the same identity.  RAs that batch process (see Section 6.17) are
 * expected to place the PKI Requests received into the cmsSequence of a
 * PKIData. <br><br>
 * See {@link GostASN1.ContentInfo} and {@link GostASN1.PKIResponse}<br><br>
 * RFC 5272 references {@link http://tools.ietf.org/html/rfc5272}
 *
 * @class GostASN1.PKIData
 * @extends GostASN1.Sequence
 * @property {GostASN1.Attributes[]} controlSequence
 * @property {GostASN1.Sequence[]} reqSequence
 * @property {GostASN1.ContentInfo[]} cmsSequence
 * @property {GostASN1.Sequence[]} otherMsgSequence
 */
var PKIData = SEQUENCE({
    controlSequence: SEQUENCE_OF(TaggedAttribute),
    reqSequence: SEQUENCE_OF(TaggedRequest),
    cmsSequence: SEQUENCE_OF(TaggedContentInfo),
    otherMsgSequence: SEQUENCE_OF(OtherMsg)
}, 'PKI REQUEST');

/**
 * PKIResponse Content Type<br><br>
 *
 * The PKIResponse content type is used for the Full PKI Response.  The
 * PKIResponse content type is identified by:
 * <pre>
 *   id-cct-PKIResponse ::= {id-pkix id-cct(12) 3  }
 * </pre>
 * The ASN.1 structure corresponding to the PKIResponse content type is:
 * <pre>
 *    PKIResponse ::= SEQUENCE {
     *        controlSequence   SEQUENCE SIZE(0..MAX) OF TaggedAttribute,
     *        cmsSequence       SEQUENCE SIZE(0..MAX) OF TaggedContentInfo,
     *        otherMsgSequence  SEQUENCE SIZE(0..MAX) OF OtherMsg
     *    }
 *
 *    ReponseBody ::= PKIResponse
 * </pre>
 *
 * Note: In [RFC2797], this ASN.1 type was named ResponseBody.  It has
 * been renamed to PKIResponse for clarity and the old name kept as a
 * synonym.<br><br>
 *
 * See {@link GostASN1.ContentInfo} and {@link GostASN1.PKIData}<br><br>
 *
 * RFC 5272 references {@link http://tools.ietf.org/html/rfc5272}
 *
 * @class GostASN1.PKIResponse
 * @extends GostASN1.Sequence
 * @property {GostASN1.Attributes[]} controlSequence
 * @property {GostASN1.ContentInfo[]} cmsSequence
 * @property {GostASN1.Sequence[]} otherMsgSequence
 */
var PKIResponse = SEQUENCE({
    controlSequence: SEQUENCE_OF(TaggedAttribute),
    cmsSequence: SEQUENCE_OF(TaggedContentInfo),
    otherMsgSequence: SEQUENCE_OF(OtherMsg)
}, 'PKI RESPONSE');

// </editor-fold>

/**
 * ASN.1 syntax definitions
 *
 * @class GostASN1
 */
function GostASN1() {}

GostASN1.prototype = {
    /**
     * Gost PrivateKey info encoder
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.GostPrivateKeyInfo
     */
    GostPrivateKeyInfo: GostPrivateKeyInfo,
    /**
     * Gost subject PublicKey info encoder
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.GostSubjectPublicKeyInfo
     */
    GostSubjectPublicKeyInfo: GostSubjectPublicKeyInfo,
    /**
     * CryptoPro key container header
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.GostKeyContainer
     */
    GostKeyContainer: GostKeyContainer,
    /**
     * CryptoPro key container name
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.GostKeyContainerName
     */
    GostKeyContainerName: GostKeyContainerName,
    /**
     * CryptoPro encrypted PrivateKey for key containers
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.GostPrivateKeys
     */
    GostPrivateKeys: GostPrivateKeys,
    /**
     * CryptoPro PrivateKey masks for key containers
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.GostPrivateMasks
     */
    GostPrivateMasks: GostPrivateMasks,
    /**
     * ViPNet key container
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.ViPNetInfo
     */
    ViPNetInfo: ViPNetInfo,
    /**
     * Gost Signature encoders
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.GostSignature
     */
    GostSignature: GostSignature,
    /**
     * Gost Encrypted key encoder for CMS
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.GostEncryptedKey
     */
    GostEncryptedKey: GostEncryptedKey,
    /**
     * SignalCom wrapped PrivateKey
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.GostWrappedPrivateKey
     */
    GostWrappedPrivateKey: GostWrappedPrivateKey,
    /**
     * PKCS#8 PrivateKey info
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.PrivateKeyInfo
     */
    PrivateKeyInfo: PrivateKeyInfo,
    /**
     * PKCS#8 encrypted PrivateKey info
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.EncryptedPrivateKeyInfo
     */
    EncryptedPrivateKeyInfo: EncryptedPrivateKeyInfo,
    /**
     * X.509 subject PublicKey info
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.SubjectPublicKeyInfo
     */
    SubjectPublicKeyInfo: SubjectPublicKeyInfo,
    /**
     * X.509 To be signed Certificate
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.TBSCertificate
     */
    TBSCertificate: TBSCertificate,
    /**
     * X.509 Certificate
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.Certificate
     */
    Certificate: Certificate,
    /**
     * PKCS#10 Certification request definition
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.CertificationRequestInfo
     */
    CertificationRequestInfo: CertificationRequestInfo,
    /**
     * PKCS#10 Certification request
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.CertificationRequest
     */
    CertificationRequest: CertificationRequest,
    /**
     * X.509 To be signed CRL
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.TBSCertList
     */
    TBSCertList: TBSCertList,
    /**
     * X.509 CRL
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.CertificateList
     */
    CertificateList: CertificateList,
    /**
     * X.509 Attribute Certificate definition
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.AttributeCertificateInfo
     */
    AttributeCertificateInfo: AttributeCertificateInfo,
    /**
     * X.509 Attribute Certificate
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.AttributeCertificate
     */
    AttributeCertificate: AttributeCertificate,
    /**
     * CMS Signed Attributes
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.SignedAttributes
     */
    SignedAttributes: SignedAttributes,
    /**
     * CMS Unsigned Attributes
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.UnsignedAttributes
     */
    UnsignedAttributes: UnsignedAttributes,
    /**
     * CMS Content definition
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.ContentInfo
     */
    ContentInfo: ContentInfo,
    /**
     * PKCS#12 Safe Contents
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.SafeContents
     */
    SafeContents: SafeContents,
    /**
     * PKCS#12 Authenticated Safe
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.AuthenticatedSafe
     */
    AuthenticatedSafe: AuthenticatedSafe,
    /**
     * PKCS#12 Personal Information Exchange (PFX)
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.PFX
     */
    PFX: PFX,
    /**
     * PKI Request
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.PKIData
     */
    PKIData: PKIData,
    /**
     * PKI Response
     *
     * @memberOf GostASN1
     * @instance
     * @type GostASN1.PKIResponse
     */
    PKIResponse: PKIResponse
};

var gostASN1Instance = exports.gostASN1Instance = new GostASN1();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.GostSecurity = GostSecurity;
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
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') for (var name in item) {
            r[name] = item[name];
        }
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
for (var id in names) {
    identifiers[names[id]] = id;
} // </editor-fold>

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
for (var _id in algorithms) {
    var algorithm = algorithms[_id];
    if (typeof algorithm === 'string') {
        algorithm = { name: algorithm };
    }
    algorithm.id = _id;
    algorithms[_id] = algorithm;
} // </editor-fold>

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
}; // </editor-fold>

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
function GostSecurity() {}

GostSecurity.prototype = {
    names: names,
    identifiers: identifiers,
    algorithms: algorithms,
    parameters: parameters,
    attributes: attributes,
    providers: providers
};

var gostSecurityInstance = exports.gostSecurityInstance = new GostSecurity();

/***/ }),
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gostEngine = undefined;

var _gostCipher = __webpack_require__(4);

var _gostDigest = __webpack_require__(3);

var _gostSign = __webpack_require__(9);

var _errors = __webpack_require__(0);

/*
 * Engine definition base on normalized algorithm identifier
 *
 */ // <editor-fold defaultstate="collapsed">

// Define engine
/**
 * @file GOST 34.10-2012 signature function with 1024/512 bits digest
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

function defineEngine(method, algorithm) {
    if (!algorithm) throw new (SyntaxError || Error)('Algorithm not defined');

    if (!algorithm.name) throw new (SyntaxError || Error)('Algorithm name not defined');

    var name = algorithm.name,
        mode = algorithm.mode;
    if ((name === 'GOST 28147' || name === 'GOST R 34.12' || name === 'RC2') && (method === 'generateKey' || mode === 'MAC' && (method === 'sign' || method === 'verify') || (mode === 'KW' || mode === 'MASK') && (method === 'wrapKey' || method === 'unwrapKey') || (!mode || mode === 'ES') && (method === 'encrypt' || method === 'decrypt'))) {
        return 'GostCipher';
    } else if ((name === 'GOST R 34.11' || name === 'SHA') && (method === 'digest' || mode === 'HMAC' && (method === 'sign' || method === 'verify' || method === 'generateKey') || (mode === 'KDF' || mode === 'PBKDF2' || mode === 'PFXKDF' || mode === 'CPKDF') && (method === 'deriveKey' || method === 'deriveBits' || method === 'generateKey'))) {
        return 'GostDigest';
    } else if (name === 'GOST R 34.10' && (method === 'generateKey' || (!mode || mode === 'SIGN') && (method === 'sign' || method === 'verify') || mode === 'MASK' && (method === 'wrapKey' || method === 'unwrapKey') || mode === 'DH' && (method === 'deriveKey' || method === 'deriveBits'))) {
        return 'GostSign';
    } else throw new _errors.NotSupportedError('Algorithm ' + name + '-' + mode + ' is not valid for ' + method);
} // </editor-fold>

/**
 * Object enables usage GOST cryptographic algorithms in the main JS thread.
 *
 * Object provide interface to GOST low-level cryptogric classes:
 *  <ul>
 *      <li>GostCipher - implementation of GOST 28147, GOST R 34.12, GOST R 34.13 Encryption algorithms. Reference {@link http://tools.ietf.org/html/rfc5830}</li>
 *      <li>GostDigest - implementation of GOST R 34.11 Hash Function algorithms. References {@link http://tools.ietf.org/html/rfc5831} and {@link http://tools.ietf.org/html/rfc6986}</li>
 *      <li>GostSign - implementation of GOST R 34.10 Digital Signature algorithms. References {@link http://tools.ietf.org/html/rfc5832} and {@link http://tools.ietf.org/html/rfc7091}</li>
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
    execute: function execute(algorithm, method, args) {
        // Define engine for GOST algorithms
        var engine = defineEngine(method, algorithm);
        // Create cipher
        var cipher = this['get' + engine](algorithm);
        // Execute method
        return cipher[method].apply(cipher, args);
    },
    /**
     * gostEngine.getGostCipher(algorithm) returns GOST 28147 / GOST R 34.12 cipher instance<br><br>
     *
     * GOST 28147-89 / GOST R 34.12-15 Encryption Algorithm<br><br>
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
     *              <li><b>MASK</b> Key mask mode</li>
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
     *      <li>Wrap/Unwrap key mode (MASK)</li>
     *  </ul>
     *
     * Supported paramters values:
     *
     *  <ul>
     *      <li>Block modes (parameter 'block')
     *          <ul>
     *              <li><b>ECB</b> "prostaya zamena" (ECB) mode (default)</li>
     *              <li><b>CFB</b> "gammirovanie s obratnoj svyaziyu" (64-bit CFB) mode</li>
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
     *              <li><b>NO</b> No padding only for CFB and CTR modes</li>
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
     * @returns {GostCipher} Instance of GostCipher
     */
    getGostCipher: function getGostCipher(algorithm) {
        return new _gostCipher.GostCipher(algorithm);
    },
    /**
     * gostEngine.getGostDigest(algorithm) returns GOST R 34.11 cipher instance<br><br>
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
     *              <li><b>PFXKDF</b> PFX key dirivation algorithms PFXKDF</li>
     *              <li><b>CPKDF</b> CryptoPro Password based key dirivation algorithms</li>
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
     * @memberOf gostEngine
     * @param {AlgorithmIndentifier} algorithm Algorithm identifier
     * @returns {GostDigest} Instance of GostDigest
     */
    getGostDigest: function getGostDigest(algorithm) {
        return new _gostDigest.GostDigest(algorithm);
    },
    /**
     * gostEngine.getGostSign(algorithm) returns GOST R 34.10 cipher instance<br><br>
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
     *              <li><b>MASK</b> Key mask mode</li>
     *          </ul>
     *      </li>
     *      <li><b>sBox</b> Paramset sBox for GOST 34.11-94. Used only if version = 1994 or 2001</li>
     *  </ul>
     *
     * Supported algorithms, modes and parameters:
     *
     *  <ul>
     *      <li>Sign/Verify mode (SIGN)</li>
     *      <li>Wrap/Unwrap mode (MASK)</li>
     *      <li>DeriveKey/DeriveBits mode (DH)
     *          <ul>
     *              <li>{@link CryptoOperationData} <b>ukm</b> User key material. Default - random generated value</li>
     *              <li>{@link CryptoOperationData} <b>public</b> The peer's EC public key data</li>
     *          </ul>
     *      </li>
     *      <li>GenerateKey mode (SIGN and DH and MASK) version = 1994
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
     *      <li>GenerateKey mode (SIGN and DH and MASK) version = 2001 or 2012
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
     * @returns {GostSign} Instance of GostSign
     */
    getGostSign: function getGostSign(algorithm) {
        return new _gostSign.GostSign(algorithm);
    }
};

exports.gostEngine = gostEngine;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gostSubtleInstance = undefined;
exports.SubtleCrypto = SubtleCrypto;

var _gostEngineSync = __webpack_require__(10);

var _environment = __webpack_require__(7);

var _errors = __webpack_require__(0);

var _gostASN = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidStateError = function (_Error) {
    _inherits(InvalidStateError, _Error);

    function InvalidStateError() {
        _classCallCheck(this, InvalidStateError);

        return _possibleConstructorReturn(this, (InvalidStateError.__proto__ || Object.getPrototypeOf(InvalidStateError)).apply(this, arguments));
    }

    return InvalidStateError;
}(Error);

var InvalidAccessError = function (_Error2) {
    _inherits(InvalidAccessError, _Error2);

    function InvalidAccessError() {
        _classCallCheck(this, InvalidAccessError);

        return _possibleConstructorReturn(this, (InvalidAccessError.__proto__ || Object.getPrototypeOf(InvalidAccessError)).apply(this, arguments));
    }

    return InvalidAccessError;
}(Error);

/*
 * Algorithm normalization
 *
 */ // <editor-fold defaultstate="collapsed">

var rootCrypto = (0, _environment.getCryptoModule)();

// Normalize algorithm
function normalize(algorithm, method) {
    if (typeof algorithm === 'string' || algorithm instanceof String) algorithm = { name: algorithm };
    var name = algorithm.name;
    if (!name) throw new SyntaxError('Algorithm name not defined');
    // Extract algorithm modes from name
    var modes = name.split('/'),
        modes = modes[0].split('-').concat(modes.slice(1));
    // Normalize the name with default modes
    var na = {};
    name = modes[0].replace(/[\.\s]/g, '');
    modes = modes.slice(1);
    if (name.indexOf('28147') >= 0) {
        na = {
            name: 'GOST 28147',
            version: 1989,
            mode: (algorithm.mode || ( // ES, MAC, KW
            method === 'sign' || method === 'verify' ? 'MAC' : method === 'wrapKey' || method === 'unwrapKey' ? 'KW' : 'ES')).toUpperCase(),
            length: algorithm.length || 64
        };
    } else if (name.indexOf('3412') >= 0) {
        na = {
            name: 'GOST R 34.12',
            version: 2015,
            mode: (algorithm.mode || ( // ES, MAC, KW
            method === 'sign' || method === 'verify' ? 'MAC' : method === 'wrapKey' || method === 'unwrapKey' ? 'KW' : 'ES')).toUpperCase(),
            length: algorithm.length || 64 // 128
        };
    } else if (name.indexOf('3411') >= 0) {
        na = {
            name: 'GOST R 34.11',
            version: 2012, // 1994
            mode: (algorithm.mode || ( // HASH, KDF, HMAC, PBKDF2, PFXKDF, CPKDF
            method === 'deriveKey' || method === 'deriveBits' ? 'KDF' : method === 'sign' || method === 'verify' ? 'HMAC' : 'HASH')).toUpperCase(),
            length: algorithm.length || 256 // 512
        };
    } else if (name.indexOf('3410') >= 0) {
        na = {
            name: 'GOST R 34.10',
            version: 2012, // 1994, 2001
            mode: (algorithm.mode || ( // SIGN, DH, MASK
            method === 'deriveKey' || method === 'deriveBits' ? 'DH' : 'SIGN')).toUpperCase(),
            length: algorithm.length || 256 // 512
        };
    } else if (name.indexOf('SHA') >= 0) {
        na = {
            name: 'SHA',
            version: (algorithm.length || 160) === 160 ? 1 : 2, // 1, 2
            mode: (algorithm.mode || ( // HASH, KDF, HMAC, PBKDF2, PFXKDF
            method === 'deriveKey' || method === 'deriveBits' ? 'KDF' : method === 'sign' || method === 'verify' ? 'HMAC' : 'HASH')).toUpperCase(),
            length: algorithm.length || 160
        };
    } else if (name.indexOf('RC2') >= 0) {
        na = {
            name: 'RC2',
            version: 1,
            mode: (algorithm.mode || ( // ES, MAC, KW
            method === 'sign' || method === 'verify' ? 'MAC' : method === 'wrapKey' || method === 'unwrapKey' ? 'KW' : 'ES')).toUpperCase(),
            length: algorithm.length || 32 // 1 - 1024
        };
    } else if (name.indexOf('PBKDF2') >= 0) {
        na = normalize(algorithm.hash, 'digest');
        na.mode = 'PBKDF2';
    } else if (name.indexOf('PFXKDF') >= 0) {
        na = normalize(algorithm.hash, 'digest');
        na.mode = 'PFXKDF';
    } else if (name.indexOf('CPKDF') >= 0) {
        na = normalize(algorithm.hash, 'digest');
        na.mode = 'CPKDF';
    } else if (name.indexOf('HMAC') >= 0) {
        na = normalize(algorithm.hash, 'digest');
        na.mode = 'HMAC';
    } else throw new _errors.NotSupportedError('Algorithm not supported');

    // Compile modes
    modes.forEach(function (mode) {
        mode = mode.toUpperCase();
        if (/^[0-9]+$/.test(mode)) {
            if (['8', '16', '32'].indexOf(mode) >= 0 || na.length === '128' && mode === '64') {
                // Shift bits
                if (na.mode === 'ES') na.shiftBits = parseInt(mode);else if (na.mode === 'MAC') na.macLength = parseInt(mode);else throw new _errors.NotSupportedError('Algorithm ' + na.name + ' mode ' + mode + ' not supported');
            } else if (['89', '94', '01', '12', '15', '1989', '1994', '2001', '2012', '2015'].indexOf(mode) >= 0) {
                // GOST Year
                var version = parseInt(mode);
                version = version < 1900 ? version < 80 ? 2000 + version : 1900 + version : version;
                na.version = version;
            } else if (['1'].indexOf(mode) >= 0 && na.name === 'SHA') {
                // SHA-1
                na.version = 1;
                na.length = 160;
            } else if (['256', '384', '512'].indexOf(mode) >= 0 && na.name === 'SHA') {
                // SHA-2
                na.version = 2;
                na.length = parseInt(mode);
            } else if (['40', '128'].indexOf(mode) >= 0 && na.name === 'RC2') {
                // RC2
                na.version = 1;
                na.length = parseInt(mode); // key size
            } else if (['64', '128', '256', '512'].indexOf(mode) >= 0) // block size
                na.length = parseInt(mode);else if (['1000', '2000'].indexOf(mode) >= 0) // Iterations
                na.iterations = parseInt(mode);
            // Named Paramsets
        } else if (['E-TEST', 'E-A', 'E-B', 'E-C', 'E-D', 'E-SC', 'E-Z', 'D-TEST', 'D-A', 'D-SC'].indexOf(mode) >= 0) {
            na.sBox = mode;
        } else if (['S-TEST', 'S-A', 'S-B', 'S-C', 'S-D', 'X-A', 'X-B', 'X-C'].indexOf(mode) >= 0) {
            na.namedParam = mode;
        } else if (['S-256-TEST', 'S-256-A', 'S-256-B', 'S-256-C', 'P-256', 'T-512-TEST', 'T-512-A', 'T-512-B', 'X-256-A', 'X-256-B', 'T-256-TEST', 'T-256-A', 'T-256-B', 'S-256-B', 'T-256-C', 'S-256-C'].indexOf(mode) >= 0) {
            na.namedCurve = mode;
        } else if (['SC', 'CP', 'VN'].indexOf(mode) >= 0) {
            na.procreator = mode;

            // Encription GOST 28147 or GOST R 34.12
        } else if (na.name === 'GOST 28147' || na.name === 'GOST R 34.12' || na.name === 'RC2') {
            if (['ES', 'MAC', 'KW', 'MASK'].indexOf(mode) >= 0) {
                na.mode = mode;
            } else if (['ECB', 'CFB', 'OFB', 'CTR', 'CBC'].indexOf(mode) >= 0) {
                na.mode = 'ES';
                na.block = mode;
            } else if (['CPKW', 'NOKW', 'SCKW'].indexOf(mode) >= 0) {
                na.mode = 'KW';
                na.keyWrapping = mode.replace('KW', '');
            } else if (['ZEROPADDING', 'PKCS5PADDING', 'NOPADDING', 'RANDOMPADDING', 'BITPADDING'].indexOf(mode) >= 0) {
                na.padding = mode.replace('PADDING', '');
            } else if (['NOKM', 'CPKM'].indexOf(mode) >= 0) {
                na.keyMeshing = mode.replace('KM', '');
            } else throw new _errors.NotSupportedError('Algorithm ' + na.name + ' mode ' + mode + ' not supported');

            // Digesting GOST 34.11
        } else if (na.name === 'GOST R 34.11' || na.name === 'SHA') {
            if (['HASH', 'KDF', 'HMAC', 'PBKDF2', 'PFXKDF', 'CPKDF'].indexOf(mode) >= 0) na.mode = mode;else throw new _errors.NotSupportedError('Algorithm ' + na.name + ' mode ' + mode + ' not supported');

            // Signing GOST 34.10
        } else if (na.name === 'GOST R 34.10') {
            var hash = mode.replace(/[\.\s]/g, '');
            if (hash.indexOf('GOST') >= 0 && hash.indexOf('3411') >= 0) na.hash = mode;else if (['SIGN', 'DH', 'MASK'].indexOf(mode)) na.mode = mode;else throw new _errors.NotSupportedError('Algorithm ' + na.name + ' mode ' + mode + ' not supported');
        }
    });

    // Procreator
    na.procreator = algorithm.procreator || na.procreator || 'CP';

    // Key size
    switch (na.name) {
        case 'GOST R 34.10':
            na.keySize = na.length / (na.version === 1994 ? 4 : 8);
            break;
        case 'GOST R 34.11':
            na.keySize = 32;
            break;
        case 'GOST 28147':
        case 'GOST R 34.12':
            na.keySize = 32;
            break;
        case 'RC2':
            na.keySize = Math.ceil(na.length / 8);
            break;
        case 'SHA':
            na.keySize = na.length / 8;
            break;
    }

    // Encrypt additional modes
    if (na.mode === 'ES') {
        if (algorithm.block) na.block = algorithm.block; // ECB, CFB, OFB, CTR, CBC
        if (na.block) na.block = na.block.toUpperCase();
        if (algorithm.padding) na.padding = algorithm.padding; // NO, ZERO, PKCS5, RANDOM, BIT
        if (na.padding) na.padding = na.padding.toUpperCase();
        if (algorithm.shiftBits) na.shiftBits = algorithm.shiftBits; // 8, 16, 32, 64
        if (algorithm.keyMeshing) na.keyMeshing = algorithm.keyMeshing; // NO, CP
        if (na.keyMeshing) na.keyMeshing = na.keyMeshing.toUpperCase();
        // Default values
        if (method !== 'importKey' && method !== 'generateKey') {
            na.block = na.block || 'ECB';
            na.padding = na.padding || (na.block === 'CBC' || na.block === 'ECB' ? 'ZERO' : 'NO');
            if (na.block === 'CFB' || na.block === 'OFB') na.shiftBits = na.shiftBits || na.length;
            na.keyMeshing = na.keyMeshing || 'NO';
        }
    }
    if (na.mode === 'KW') {
        if (algorithm.keyWrapping) na.keyWrapping = algorithm.keyWrapping; // NO, CP, SC
        if (na.keyWrapping) na.keyWrapping = na.keyWrapping.toUpperCase();
        if (method !== 'importKey' && method !== 'generateKey') na.keyWrapping = na.keyWrapping || 'NO';
    }

    // Paramsets
    ['sBox', 'namedParam', 'namedCurve', 'curve', 'param', 'modulusLength'].forEach(function (name) {
        algorithm[name] && (na[name] = algorithm[name]);
    });
    // Default values
    if (method !== 'importKey' && method !== 'generateKey') {
        if (na.name === 'GOST 28147') {
            na.sBox = na.sBox || (na.procreator === 'SC' ? 'E-SC' : 'E-A'); // 'E-A', 'E-B', 'E-C', 'E-D', 'E-SC'
        } else if (na.name === 'GOST R 34.12' && na.length === 64) {
            na.sBox = 'E-Z';
        } else if (na.name === 'GOST R 34.11' && na.version === 1994) {
            na.sBox = na.sBox || (na.procreator === 'SC' ? 'D-SC' : 'D-A'); // 'D-SC'
        } else if (na.name === 'GOST R 34.10' && na.version === 1994) {
            na.namedParam = na.namedParam || (na.mode === 'DH' ? 'X-A' : 'S-A'); // 'S-B', 'S-C', 'S-D', 'X-B', 'X-C'
        } else if (na.name === 'GOST R 34.10' && na.version === 2001) {
            na.namedCurve = na.namedCurve || (na.length === 256 ? na.procreator === 'SC' ? 'P-256' : na.mode === 'DH' ? 'X-256-A' : 'S-256-A' : // 'S-256-B', 'S-256-C', 'X-256-B', 'T-256-A', 'T-256-B', 'T-256-C', 'P-256'
            na.mode === 'T-512-A'); // 'T-512-B', 'T-512-C'
        } else if (na.name === 'GOST R 34.10' && na.version === 2012) {
            na.namedCurve = na.namedCurve || (na.length === 256 ? na.procreator === 'SC' ? 'P-256' : na.mode === 'DH' ? 'X-256-A' : 'S-256-A' : // 'S-256-B', 'S-256-C', 'X-256-B', 'T-256-A', 'T-256-B', 'T-256-C', 'P-256'
            na.mode === 'T-512-A'); // 'T-512-B', 'T-512-C'
        }
    }

    // Vectors
    switch (na.mode) {
        case 'DH':
            algorithm.ukm && (na.ukm = algorithm.ukm);
            algorithm['public'] && (na['public'] = algorithm['public']);
            break;
        case 'SIGN':
        case 'KW':
            algorithm.ukm && (na.ukm = algorithm.ukm);
            break;
        case 'ES':
        case 'MAC':
            algorithm.iv && (na.iv = algorithm.iv);
            break;
        case 'KDF':
            algorithm.label && (na.label = algorithm.label);
            algorithm.contex && (na.context = algorithm.contex);
            break;
        case 'PBKDF2':
            algorithm.salt && (na.salt = algorithm.salt);
            algorithm.iterations && (na.iterations = algorithm.iterations);
            algorithm.diversifier && (na.diversifier = algorithm.diversifier);
            break;
        case 'PFXKDF':
            algorithm.salt && (na.salt = algorithm.salt);
            algorithm.iterations && (na.iterations = algorithm.iterations);
            algorithm.diversifier && (na.diversifier = algorithm.diversifier);
            break;
        case 'CPKDF':
            algorithm.salt && (na.salt = algorithm.salt);
            algorithm.iterations && (na.iterations = algorithm.iterations);
            break;
    }

    // Verification method and modes
    if (method && (na.mode !== 'ES' && na.mode !== 'SIGN' && na.mode !== 'MAC' && na.mode !== 'HMAC' && na.mode !== 'KW' && na.mode !== 'DH' && na.mode !== 'MASK' && method === 'generateKey' || na.mode !== 'ES' && (method === 'encrypt' || method === 'decrypt') || na.mode !== 'SIGN' && na.mode !== 'MAC' && na.mode !== 'HMAC' && (method === 'sign' || method === 'verify') || na.mode !== 'HASH' && method === 'digest' || na.mode !== 'KW' && na.mode !== 'MASK' && (method === 'wrapKey' || method === 'unwrapKey') || na.mode !== 'DH' && na.mode !== 'PBKDF2' && na.mode !== 'PFXKDF' && na.mode !== 'CPKDF' && na.mode !== 'KDF' && (method === 'deriveKey' || method === 'deriveBits'))) throw new _errors.NotSupportedError('Algorithm mode ' + na.mode + ' not valid for method ' + method);

    // Normalize hash algorithm
    algorithm.hash && (na.hash = algorithm.hash);
    if (na.hash) {
        if ((typeof na.hash === 'string' || na.hash instanceof String) && na.procreator) na.hash = na.hash + '/' + na.procreator;
        na.hash = normalize(na.hash, 'digest');
    }

    // Algorithm object identirifer
    algorithm.id && (na.id = algorithm.id);

    return na;
}

// Check for possibility use native crypto.subtle
function checkNative(algorithm) {
    if (!rootCrypto || !rootCrypto.subtle || !algorithm) return false;
    // Prepare name
    var name = typeof algorithm === 'string' || algorithm instanceof String ? name = algorithm : algorithm.name;
    if (!name) return false;
    name = name.toUpperCase();
    // Digest algorithm for key derivation
    if ((name.indexOf('KDF') >= 0 || name.indexOf('HMAC') >= 0) && algorithm.hash) return checkNative(algorithm.hash);
    // True if no supported names
    return name.indexOf('GOST') === -1 && name.indexOf('SHA-1') === -1 && name.indexOf('RC2') === -1 && name.indexOf('?DES') === -1;
}

// </editor-fold>

/*
 * Key conversion methods
 *
 */ // <editor-fold defaultstate="collapsed">

// Check key parameter
function checkKey(key, method) {
    if (!key.algorithm) throw new SyntaxError('Key algorithm not defined');

    if (!key.algorithm.name) throw new SyntaxError('Key algorithm name not defined');

    var name = key.algorithm.name,
        gostCipher = name === 'GOST 28147' || name === 'GOST R 34.12' || name === 'RC2',
        gostDigest = name === 'GOST R 34.11' || name === 'SHA',
        gostSign = name === 'GOST R 34.10';

    if (!gostCipher && !gostSign && !gostDigest) throw new _errors.NotSupportedError('Key algorithm ' + name + ' is unsupproted');

    if (!key.type) throw new SyntaxError('Key type not defined');

    if ((gostCipher || gostDigest) && key.type !== 'secret' || gostSign && !(key.type === 'public' || key.type === 'private')) throw new _errors.DataError('Key type ' + key.type + ' is not valid for algorithm ' + name);

    if (!key.usages || !key.usages.indexOf) throw new SyntaxError('Key usages not defined');

    for (var i = 0, n = key.usages.length; i < n; i++) {
        var md = key.usages[i];
        if ((md === 'encrypt' || md === 'decrypt') && key.type !== 'secret' || md === 'sign' && key.type === 'public' || md === 'verify' && key.type === 'private') throw new InvalidStateError('Key type ' + key.type + ' is not valid for ' + md);
    }

    if (method) if (key.usages.indexOf(method) === -1) throw new InvalidAccessError('Key usages is not contain method ' + method);

    if (!key.buffer) throw new SyntaxError('Key buffer is not defined');

    var size = key.buffer.byteLength * 8,
        keySize = 8 * key.algorithm.keySize;
    if (key.type === 'secret' && size !== (keySize || 256) && (key.usages.indexOf('encrypt') >= 0 || key.usages.indexOf('decrypt') >= 0) || key.type === 'private' && !(size === 256 || size === 512) || key.type === 'public' && !(size === 512 || size === 1024)) throw new SyntaxError('Key buffer has wrong size ' + size + ' bit');
}

// Extract key and enrich cipher algorithm
function extractKey(method, algorithm, key) {
    checkKey(key, method);
    if (algorithm) {
        var params;
        switch (algorithm.mode) {
            case 'ES':
                params = ['sBox', 'keyMeshing', 'padding', 'block'];
                break;
            case 'SIGN':
                params = ['namedCurve', 'namedParam', 'sBox', 'curve', 'param', 'modulusLength'];
                break;
            case 'MAC':
                params = ['sBox'];
                break;
            case 'KW':
                params = ['keyWrapping', 'ukm'];
                break;
            case 'DH':
                params = ['namedCurve', 'namedParam', 'sBox', 'ukm', 'curve', 'param', 'modulusLength'];
                break;
            case 'KDF':
                params = ['context', 'label'];
                break;
            case 'PBKDF2':
                params = ['sBox', 'iterations', 'salt'];
                break;
            case 'PFXKDF':
                params = ['sBox', 'iterations', 'salt', 'diversifier'];
                break;
            case 'CPKDF':
                params = ['sBox', 'salt'];
                break;
        }
        if (params) params.forEach(function (name) {
            key.algorithm[name] && (algorithm[name] = key.algorithm[name]);
        });
    }
    return key.buffer;
}

// Make key definition
function convertKey(algorithm, extractable, keyUsages, keyData, keyType) {
    var key = {
        type: keyType || (algorithm.name === 'GOST R 34.10' ? 'private' : 'secret'),
        extractable: extractable || 'false',
        algorithm: algorithm,
        usages: keyUsages || [],
        buffer: keyData
    };
    checkKey(key);
    return key;
}

function convertKeyPair(publicAlgorithm, privateAlgorithm, extractable, keyUsages, publicBuffer, privateBuffer) {

    if (!keyUsages || !keyUsages.indexOf) throw new SyntaxError('Key usages not defined');

    var publicUsages = keyUsages.filter(function (value) {
        return value !== 'sign';
    });
    var privateUsages = keyUsages.filter(function (value) {
        return value !== 'verify';
    });

    return {
        publicKey: convertKey(publicAlgorithm, extractable, publicUsages, publicBuffer, 'public'),
        privateKey: convertKey(privateAlgorithm, extractable, privateUsages, privateBuffer, 'private')
    };
}

// Swap bytes in buffer
function swapBytes(src) {
    if (src instanceof CryptoOperationData) src = new Uint8Array(src);
    var dst = new Uint8Array(src.length);
    for (var i = 0, n = src.length; i < n; i++) {
        dst[n - i - 1] = src[i];
    }return dst.buffer;
}

// </editor-fold>

// Executor for any method
function execute(algorithm, method, args) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(_gostEngineSync.gostEngine.execute(algorithm, method, args));
        } catch (error) {
            reject(error);
        }
    });
}

// Self resolver
function call(callback) {
    try {
        callback();
    } catch (e) {}
}

// </editor-fold>

/*
 * WebCrypto common class references
 *
 */ // <editor-fold defaultstate="collapsed">
/**
 * The Algorithm object is a dictionary object [WebIDL] which is used to
 * specify an algorithm and any additional parameters required to fully
 * specify the desired operation.<br>
 * <pre>
 *  dictionary Algorithm {
     *      DOMString name;
     *  };
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#algorithm-dictionary}
 * @class Algorithm
 * @param {DOMString} name The name of the registered algorithm to use.
 */

/**
 * AlgorithmIdentifier - Algorithm or DOMString name of algorithm<br>
 * <pre>
 *  typedef (Algorithm or DOMString) AlgorithmIdentifier;
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#algorithm-dictionary}
 * @class AlgorithmIdentifier
 */

/**
 * The KeyAlgorithm interface represents information about the contents of a
 * given Key object.
 * <pre>
 *  interface KeyAlgorithm {
     *      readonly attribute DOMString name
     *  };
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-algorithm-interface}
 * @class KeyAlgorithm
 * @param {DOMString} name The name of the algorithm used to generate the Key
 */

/**
 * The type of a key. The recognized key type values are "public", "private"
 * and "secret". Opaque keying material, including that used for symmetric
 * algorithms, is represented by "secret", while keys used as part of asymmetric
 * algorithms composed of public/private keypairs will be either "public" or "private".
 * <pre>
 *  typedef DOMString KeyType;
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-interface}
 * @class KeyType
 */

/**
 * Sequence of operation type that may be performed using a key. The recognized
 * key usage values are "encrypt", "decrypt", "sign", "verify", "deriveKey",
 * "deriveBits", "wrapKey" and "unwrapKey".
 * <pre>
 *  typedef DOMString[] KeyUsages;
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-interface}
 * @class KeyUsages
 */

/**
 * The Key object represents an opaque reference to keying material that is
 * managed by the user agent.<br>
 * This specification provides a uniform interface for many different kinds of
 * keying material managed by the user agent. This may include keys that have
 * been generated by the user agent, derived from other keys by the user agent,
 * imported to the user agent through user actions or using this API,
 * pre-provisioned within software or hardware to which the user agent has
 * access or made available to the user agent in other ways. The term key refers
 * broadly to any keying material including actual keys for cryptographic
 * operations and secret values obtained within key derivation or exchange operations.<br>
 * The Key object is not required to directly interface with the underlying key
 * storage mechanism, and may instead simply be a reference for the user agent
 * to understand how to obtain the keying material when needed, eg. when performing
 * a cryptographic operation.
 * <pre>
 *  interface Key {
     *      readonly attribute KeyType type;
     *      readonly attribute boolean extractable;
     *      readonly attribute KeyAlgorithm algorithm;
     *      readonly attribute KeyUsages usages;
     *  };
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-interface}
 * @class Key
 * @param {KeyType} type The type of a key. The recognized key type values are "public", "private" and "secret".
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application.
 * @param {KeyAlgorithm} algorithm The Algorithm used to generate the key.
 * @param {KeyUsages} usages Key usage array: type of operation that may be performed using a key.
 */

/**
 * The KeyPair interface represents an asymmetric key pair that is comprised of both public and private keys.
 * <pre>
 *  interface KeyPair {
     *      readonly attribute Key publicKey;
     *      readonly attribute Key privateKey;
     *  };
 * </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#keypair}
 * @class KeyPair
 * @param {Key} privateKey Private key
 * @param {Key} publicKey Public key
 */

/**
 * Specifies a serialization format for a key. The recognized key format values are:
 *  <ul>
 *      <li>'raw' - An unformatted sequence of bytes. Intended for secret keys.</li>
 *      <li>'pkcs8' - The DER encoding of the PrivateKeyInfo structure from RFC 5208.</li>
 *      <li>'spki' - The DER encoding of the SubjectPublicKeyInfo structure from RFC 5280.</li>
 *      <li>'jwk' - The key is represented as JSON according to the JSON Web Key format.</li>
 *  </ul>
 *  <pre>
 *  typedef DOMString KeyFormat;
 *  </pre>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#key-interface}
 *  @class KeyFormat
 */

/**
 * Binary data
 *  <pre>
 *  typedef (ArrayBuffer or ArrayBufferView) CryptoOperationData;
 *  </pre>
 * @class CryptoOperationData
 */
var CryptoOperationData = ArrayBuffer;

/**
 * DER-encoded ArrayBuffer or PEM-encoded DOMString constains ASN.1 object<br>
 * <pre>
 *  typedef (ArrayBuffer or DOMString) FormatedData;
 * </pre>
 * @class FormatedData
 */

// </editor-fold>

/**
 * The SubtleCrypto class provides low-level cryptographic primitives and algorithms.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface}
 *
 * @class SubtleCrypto
 */ // <editor-fold>
function SubtleCrypto() {}

/**
 * The encrypt method returns a new Promise object that will encrypt data
 * using the specified algorithm identifier with the supplied Key.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-encrypt}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST 28147-ECB</b> "prostaya zamena" (ECB) mode (default)</li>
 *      <li><b>GOST 28147-CFB</b> "gammirovanie s obratnoj svyaziyu po shifrotekstu" (CFB) mode</li>
 *      <li><b>GOST 28147-OFB</b> "gammirovanie s obratnoj svyaziyu po vyhodu" (OFB) mode</li>
 *      <li><b>GOST 28147-CTR</b> "gammirovanie" (counter) mode</li>
 *      <li><b>GOST 28147-CBC</b> Cipher-Block-Chaining (CBC) mode</li>
 *      <li><b>GOST R 34.12-ECB</b> "prostaya zamena" (ECB) mode (default)</li>
 *      <li><b>GOST R 34.12-CFB</b> "gammirovanie s obratnoj svyaziyu po shifrotekstu" (CFB) mode</li>
 *      <li><b>GOST R 34.12-OFB</b> "gammirovanie s obratnoj svyaziyu po vyhodu" (OFB) mode</li>
 *      <li><b>GOST R 34.12-CTR</b> "gammirovanie" (counter) mode</li>
 *      <li><b>GOST R 34.12-CBC</b> Cipher-Block-Chaining (CBC) mode</li>
 *  </ul>
 *  For more information see {@link GostCipher}
 *
 * @memberOf SubtleCrypto
 * @method encrypt
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} key Key object
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.encrypt = function (algorithm, key, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm)) return rootCrypto.subtle.encrypt(algorithm, key, data);

        algorithm = normalize(algorithm, 'encrypt');
        return execute(algorithm, 'encrypt', [extractKey('encrypt', algorithm, key), data]);
    });
}; // </editor-fold>

/**
 * The decrypt method returns a new Promise object that will decrypt data
 * using the specified algorithm identifier with the supplied Key.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-decrypt}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST 28147-ECB</b> "prostaya zamena" (ECB) mode (default)</li>
 *      <li><b>GOST 28147-CFB</b> "gammirovanie s obratnoj svyaziyu po shifrotekstu" (CFB) mode</li>
 *      <li><b>GOST 28147-OFB</b> "gammirovanie s obratnoj svyaziyu po vyhodu" (OFB) mode</li>
 *      <li><b>GOST 28147-CTR</b> "gammirovanie" (counter) mode</li>
 *      <li><b>GOST 28147-CBC</b> Cipher-Block-Chaining (CBC) mode</li>
 *      <li><b>GOST R 34.12-ECB</b> "prostaya zamena" (ECB) mode (default)</li>
 *      <li><b>GOST R 34.12-CFB</b> "gammirovanie s obratnoj svyaziyu po shifrotekstu" (CFB) mode</li>
 *      <li><b>GOST R 34.12-OFB</b> "gammirovanie s obratnoj svyaziyu po vyhodu" (OFB) mode</li>
 *      <li><b>GOST R 34.12-CTR</b> "gammirovanie" (counter) mode</li>
 *      <li><b>GOST R 34.12-CBC</b> Cipher-Block-Chaining (CBC) mode</li>
 *  </ul>
 *  For additional modes see {@link GostCipher}
 *
 * @memberOf SubtleCrypto
 * @method decrypt
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} key Key object
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.decrypt = function (algorithm, key, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm)) return rootCrypto.subtle.decrypt(algorithm, key, data);

        algorithm = normalize(algorithm, 'decrypt');
        return execute(algorithm, 'decrypt', [extractKey('decrypt', algorithm, key), data]);
    });
}; // </editor-fold>

/**
 * The sign method returns a new Promise object that will sign data using
 * the specified algorithm identifier with the supplied Key.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-sign}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-94</b> GOST Signature</li>
 *      <li><b>GOST R 34.10-94/GOST R 34.11-94</b> GOST Signature with Hash</li>
 *      <li><b>GOST R 34.10</b> ECGOST Signature</li>
 *      <li><b>GOST R 34.10/GOST R 34.11-94</b> ECGOST Signature with Old-Style Hash</li>
 *      <li><b>GOST R 34.10/GOST R 34.11</b> ECGOST Signature with Streebog Hash</li>
 *      <li><b>GOST 28147-MAC</b> MAC base on GOST 28147</li>
 *      <li><b>GOST R 34.12-MAC</b> MAC base on GOST R 43.12</li>
 *      <li><b>GOST R 34.11-HMAC</b> HMAC base on GOST 34.11</li>
 *      <li><b>SHA-HMAC</b> HMAC base on SHA</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}
 *
 * @memberOf SubtleCrypto
 * @method sign
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} key Key object
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.sign = function (algorithm, key, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm)) return rootCrypto.subtle.sign(algorithm, key, data);

        algorithm = normalize(algorithm, 'sign');
        var value = execute(algorithm, 'sign', [extractKey('sign', algorithm, key), data]).then(function (data) {
            if (algorithm.procreator === 'SC' && algorithm.mode === 'SIGN') {
                data = _gostASN.gostASN1Instance.GostSignature.encode(data);
            }
            return data;
        });
        return value;
    });
}; // </editor-fold>

/**
 * The verify method returns a new Promise object that will verify data
 * using the specified algorithm identifier with the supplied Key.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-verify}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-94</b> GOST Signature</li>
 *      <li><b>GOST R 34.10-94/GOST R 34.11-94</b> GOST Signature with Hash</li>
 *      <li><b>GOST R 34.10</b> ECGOST Signature</li>
 *      <li><b>GOST R 34.10/GOST R 34.11-94</b> ECGOST Signature with Old-Style Hash</li>
 *      <li><b>GOST R 34.10/GOST R 34.11</b> ECGOST Signature with Streebog Hash</li>
 *      <li><b>GOST 28147-MAC</b> MAC base on GOST 28147</li>
 *      <li><b>GOST R 34.12-MAC</b> MAC base on GOST R 34.12</li>
 *      <li><b>GOST R 34.11-HMAC</b> HMAC base on GOST 34.11</li>
 *      <li><b>SHA-HMAC</b> HMAC base on SHA</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}
 *
 * @memberOf SubtleCrypto
 * @method verify
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} key Key object
 * @param {CryptoOperationData} signature Signature data
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with boolean value of verification result
 */
SubtleCrypto.prototype.verify = function (algorithm, key, signature, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm)) return rootCrypto.subtle.verify(algorithm, key, signature, data);

        algorithm = normalize(algorithm, 'verify');
        if (algorithm.procreator === 'SC' && algorithm.mode === 'SIGN') {
            var obj = _gostASN.gostASN1Instance.GostSignature.decode(signature);
            signature = { r: obj.r, s: obj.s };
        }
        return execute(algorithm, 'verify', [extractKey('verify', algorithm, key), signature, data]);
    });
}; // </editor-fold>

/**
 * The digest method returns a new Promise object that will digest data
 * using the specified algorithm identifier.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-digest}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.11-94</b> Old-Style GOST Hash</li>
 *      <li><b>GOST R 34.11</b> GOST Streebog Hash</li>
 *      <li><b>SHA</b> SHA Hash</li>
 *  </ul>
 *  For additional modes see {@link GostDigest}
 *
 * @memberOf SubtleCrypto
 * @method digest
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {CryptoOperationData} data Operation data
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.digest = function (algorithm, data) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm)) return rootCrypto.subtle.digest(algorithm, data);

        algorithm = normalize(algorithm, 'digest');
        return execute(algorithm, 'digest', [data]);
    });
}; // </editor-fold>

/**
 * The generateKey method returns a new Promise object that will key(s) using
 * the specified algorithm identifier. Key can be used in according with
 * KeyUsages sequence. The recognized key usage values are "encrypt", "decrypt",
 * "sign", "verify", "deriveKey", "deriveBits", "wrapKey" and "unwrapKey".
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-generateKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10</b> ECGOST Key Pairs</li>
 *      <li><b>GOST 28147</b> Key for encryption GOST 28147 modes</li>
 *      <li><b>GOST 28147-KW</b> Key for wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12</b> Key for encryption GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key for wrapping GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}<br>
 *  Note: Generation key for GOST R 34.10-94 not supported.
 *
 * @memberOf SubtleCrypto
 * @method generateKey
 * @instance
 * @param {AlgorithmIdentifier} algorithm Key algorithm identifier
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application
 * @param {KeyUsages} keyUsages Key usage array: type of operation that may be performed using a key
 * @returns {Promise} Promise that resolves with {@link Key} or {@link KeyPair} in according to key algorithm
 */
SubtleCrypto.prototype.generateKey = function (algorithm, extractable, keyUsages) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm)) return rootCrypto.subtle.generateKey(algorithm, extractable, keyUsages);

        var privateAlgorithm = algorithm.privateKey,
            publicAlgorithm = algorithm.publicKey;
        algorithm = normalize(algorithm, 'generateKey');
        if (privateAlgorithm) privateAlgorithm = normalize(privateAlgorithm, 'generateKey');else privateAlgorithm = algorithm;
        if (publicAlgorithm) publicAlgorithm = normalize(publicAlgorithm, 'generateKey');else publicAlgorithm = algorithm;
        return execute(algorithm, 'generateKey', []).then(function (data) {
            if (data.publicKey && data.privateKey) return convertKeyPair(publicAlgorithm, privateAlgorithm, extractable, keyUsages, data.publicKey, data.privateKey);else return convertKey(algorithm, extractable, keyUsages, data);
        });
    });
}; // </editor-fold>

/**
 * The deriveKey method returns a new Promise object that will key(s) using
 * the specified algorithm identifier. Key can be used in according with
 * KeyUsage sequence. The recognized key usage values are "encrypt", "decrypt",
 * "sign", "verify", "deriveKey", "deriveBits", "wrapKey" and "unwrapKey".
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-deriveKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-DH</b> ECDH Key Agreement mode</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PBKDF2</b> Password Based Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PFXKDF</b> PFX Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-CPKDF</b> Password Based Key for CryptoPro Derivation Algorithm</li>
 *      <li><b>SHA-PBKDF2</b> Password Based Key for Derivation Algorithm</li>
 *      <li><b>SHA-PFXKDF</b> PFX Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign} and {@link GostDigest}
 *
 * @memberOf SubtleCrypto
 * @method deriveKey
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} baseKey Derivation key object
 * @param {AlgorithmIdentifier} derivedKeyType Derived key algorithm identifier
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application
 * @param {KeyUsages} keyUsages Key usage array: type of operation that may be performed using a key
 * @returns {Promise} Promise that resolves with {@link Key}
 */
SubtleCrypto.prototype.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm)) return rootCrypto.subtle.deriveKey(algorithm, baseKey, derivedKeyType, extractable, keyUsages);

        algorithm = normalize(algorithm, 'deriveKey');
        derivedKeyType = normalize(derivedKeyType, 'generateKey');
        algorithm.keySize = derivedKeyType.keySize;
        if (algorithm['public']) {
            algorithm['public'].algorithm = normalize(algorithm['public'].algorithm);
            algorithm['public'] = extractKey('deriveKey', algorithm, algorithm['public']);
        }
        return execute(algorithm, 'deriveKey', [extractKey('deriveKey', algorithm, baseKey)]).then(function (data) {
            return convertKey(derivedKeyType, extractable, keyUsages, data);
        });
    });
}; // </editor-fold>

/**
 * The deriveBits method returns length bits on baseKey using the
 * specified algorithm identifier.
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-deriveBits}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-DH</b> ECDH Key Agreement mode</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PBKDF2</b> Password Based Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PFXKDF</b> PFX Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-CPKDF</b> Password Based Key for CryptoPro Derivation Algorithm</li>
 *      <li><b>SHA-PBKDF2</b> Password Based Key for Derivation Algorithm</li>
 *      <li><b>SHA-PFXKDF</b> PFX Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign} and {@link GostDigest}
 *
 * @memberOf SubtleCrypto
 * @method deriveBits
 * @instance
 * @param {AlgorithmIdentifier} algorithm Algorithm identifier
 * @param {Key} baseKey Derivation key object
 * @param {number} length Length bits
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.deriveBits = function (algorithm, baseKey, length) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(algorithm)) return rootCrypto.subtle.deriveBits(algorithm, baseKey, length);

        algorithm = normalize(algorithm, 'deriveBits');
        if (algorithm['public']) algorithm['public'] = extractKey('deriveBits', algorithm, algorithm['public']);
        return execute(algorithm, 'deriveBits', [extractKey('deriveBits', algorithm, baseKey), length]);
    });
}; // </editor-fold>

/**
 * The importKey method returns a new Promise object that will key(s) using
 * the specified algorithm identifier. Key can be used in according with
 * KeyUsage sequence. The recognized key usage values are "encrypt", "decrypt",
 * "sign", "verify", "deriveKey", "deriveBits", "wrapKey" and "unwrapKey".<br><br>
 * Parameter keyData contains data in defined format.
 * The suppored key format values are:
 *  <ul>
 *      <li>'raw' - An unformatted sequence of bytes. Intended for secret keys.</li>
 *      <li>'pkcs8' - The DER encoding of the PrivateKeyInfo structure from RFC 5208.</li>
 *      <li>'spki' - The DER encoding of the SubjectPublicKeyInfo structure from RFC 5280.</li>
 *  </ul>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-importKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-94</b> GOST Private and Public keys</li>
 *      <li><b>GOST R 34.10</b> ECGOST Private and Public keys</li>
 *      <li><b>GOST 28147</b> Key for encryption GOST 28147 modes</li>
 *      <li><b>GOST 28147-KW</b> Key for key wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12</b> Key for encryption GOST 34.12 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key for key wrapping GOST 34.12 modes</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}<br>
 *
 * @memberOf SubtleCrypto
 * @method importKey
 * @instance
 * @param {KeyFormat} format Key format Format specifies a serialization format for a key
 * @param {CryptoOperationData} keyData
 * @param {AlgorithmIdentifier} algorithm Key algorithm identifier
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application
 * @param {KeyUsages} keyUsages Key usage array: type of operation that may be performed using a key
 * @returns {Promise} Promise that resolves with {@link Key}
 */
SubtleCrypto.prototype.importKey = function (format, keyData, algorithm, extractable, keyUsages) // <editor-fold defaultstate="collapsed">
{
    var type;
    return new Promise(call).then(function () {
        if (checkNative(algorithm)) return rootCrypto.subtle.importKey(format, keyData, algorithm, extractable, keyUsages);

        if (format === 'raw') {
            algorithm = normalize(algorithm, 'importKey');
            if (keyUsages && keyUsages.indexOf) {
                var name = algorithm.name.toUpperCase().replace(/[\.\s]/g, '');
                if (name.indexOf('3410') >= 0 && keyUsages.indexOf('sign') >= 0) type = 'private';else if (name.indexOf('3410') >= 0 && keyUsages.indexOf('verify') >= 0) type = 'public';
            }
            return keyData;
        } else {
            var key;
            if (format === 'pkcs8') key = _gostASN.gostASN1Instance.GostPrivateKeyInfo.decode(keyData).object;else if (format === 'spki') key = _gostASN.gostASN1Instance.GostSubjectPublicKeyInfo.decode(keyData).object;else throw new _errors.NotSupportedError('Key format not supported');

            algorithm = normalize(key.algorithm, 'importKey');
            type = key.type;
            if (extractable !== false) extractable = extractable || key.extractable;
            if (keyUsages) {
                for (var i = 0; i < keyUsages.length; i++) {
                    if (key.usages.indexOf(keyUsages[i]) < 0) throw (0, _errors.DataError)('Key usage not valid for this key');
                }
            } else keyUsages = key.usages;
            var data = key.buffer,
                keySize = algorithm.keySize,
                dataLen = data.byteLength;
            if (type === 'public' || keySize === dataLen) return data;else {
                // Remove private key masks
                if (dataLen % keySize > 0) throw new _errors.DataError('Invalid key size');
                algorithm.mode = 'MASK';
                algorithm.procreator = 'VN';
                var chain = [];
                for (var i = keySize; i < dataLen; i += keySize) {
                    chain.push(function (mask) {
                        return function (data) {
                            return execute(algorithm, 'unwrapKey', [mask, data]).then(function (data) {
                                var next = chain.pop();
                                if (next) return next(data);else {
                                    delete algorithm.mode;
                                    return data;
                                }
                            });
                        };
                    }(new Uint8Array(data, i, keySize)));
                }
                return chain.pop()(new Uint8Array(data, 0, keySize));
            }
        }
    }).then(function (data) {
        return convertKey(algorithm, extractable, keyUsages, data, type);
    });
}; // </editor-fold>

/**
 * The exportKey method returns a new Promise object that will key data in
 * defined format. <br><br>
 * The suppored key format values are:
 *  <ul>
 *      <li>'raw' - An unformatted sequence of bytes. Intended for secret keys.</li>
 *      <li>'pkcs8' - The DER encoding of the PrivateKeyInfo structure from RFC 5208.</li>
 *      <li>'spki' - The DER encoding of the SubjectPublicKeyInfo structure from RFC 5280.</li>
 *  </ul>
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-exportKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST R 34.10-94</b> GOST Private and Public keys</li>
 *      <li><b>GOST R 34.10</b> ECGOST Private and Public keys</li>
 *      <li><b>GOST 28147</b> Key for encryption GOST 28147 modes</li>
 *      <li><b>GOST 28147-KW</b> Key for key wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12</b> Key for encryption GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key for key wrapping GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.11-KDF</b> Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PBKDF2</b> Import Password for Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-PFXKDF</b> Import PFX Key for Derivation Algorithm</li>
 *      <li><b>GOST R 34.11-CPKDF</b> Import Password Key for CryptoPro Derivation Algorithm</li>
 *      <li><b>SHA-PBKDF2</b> Import Password for Key for Derivation Algorithm</li>
 *      <li><b>SHA-PFXKDF</b> Import PFX Key for Derivation Algorithm</li>
 *  </ul>
 *  For additional modes see {@link GostSign}, {@link GostDigest} and {@link GostCipher}<br>
 *
 * @memberOf SubtleCrypto
 * @method exportKey
 * @instance
 * @param {KeyFormat} format Format specifies a serialization format for a key
 * @param {Key} key Key object
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.exportKey = function (format, key) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (key && checkNative(key.algorithm)) return rootCrypto.subtle.exportKey(format, key);

        if (!key.extractable) throw new InvalidAccessError('Key not extractable');

        var raw = extractKey(null, null, key);
        if (format === 'raw') return raw;else if (format === 'pkcs8' && key.algorithm && key.algorithm.id) {
            if (key.algorithm.procreator === 'VN') {
                // Add masks for ViPNet
                var algorithm = key.algorithm,
                    mask;
                algorithm.mode = 'MASK';
                return execute(algorithm, 'generateKey').then(function (data) {
                    mask = data;
                    return execute(algorithm, 'wrapKey', [mask, key.buffer]);
                }).then(function (data) {
                    delete algorithm.mode;
                    var d = new Uint8Array(data.byteLength + mask.byteLength);
                    d.set(new Uint8Array(data, 0, data.byteLength));
                    d.set(new Uint8Array(mask, 0, mask.byteLength), data.byteLength);
                    var buffer = d.buffer;
                    buffer.enclosed = true;
                    return _gostASN.gostASN1Instance.GostPrivateKeyInfo.encode({
                        algorithm: algorithm,
                        buffer: buffer
                    });
                });
            } else return _gostASN.gostASN1Instance.GostPrivateKeyInfo.encode(key);
        } else if (format === 'spki' && key.algorithm && key.algorithm.id) return _gostASN.gostASN1Instance.GostSubjectPublicKeyInfo.encode(key);else throw new _errors.NotSupportedError('Key format not supported');
    });
}; // </editor-fold>

/**
 * The wrapKey method returns a new Promise object that will wrapped key(s).
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-wrapKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST 28147-KW</b> Key Wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key Wrapping GOST R 34.12 modes</li>
 *      <li><b>GOST 28147-MASK</b> Key Mask GOST 28147 modes</li>
 *      <li><b>GOST R 34.12-MASK</b> Key Mask GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.10-MASK</b> Key Mask GOST R 34.10 modes</li>
 *  </ul>
 *  For additional modes see {@link GostCipher}<br>
 *
 * @memberOf SubtleCrypto
 * @method wrapKey
 * @instance
 * @param {KeyFormat} format Format specifies a serialization format for a key. Now suppored only 'raw' key format.
 * @param {Key} key Key object
 * @param {Key} wrappingKey Wrapping key object
 * @param {AlgorithmIdentifier} wrapAlgorithm Algorithm identifier
 * @returns {Promise} Promise that resolves with {@link CryptoOperationData}
 */
SubtleCrypto.prototype.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(wrapAlgorithm)) return rootCrypto.subtle.wrapKey(format, key, wrappingKey, wrapAlgorithm);

        wrapAlgorithm = normalize(wrapAlgorithm, 'wrapKey');
        var keyData = extractKey(null, null, key);
        if (wrapAlgorithm.procreator === 'SC' && key.type === 'private') keyData = swapBytes(keyData);
        return execute(wrapAlgorithm, 'wrapKey', [extractKey('wrapKey', wrapAlgorithm, wrappingKey), keyData]).then(function (data) {
            if (format === 'raw') return data;else throw new _errors.NotSupportedError('Key format not supported');
        });
    });
}; // </editor-fold>

/**
 * The unwrapKey method returns a new Promise object that will unwrapped key(s).
 * WebCrypto API reference {@link http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-unwrapKey}<br><br>
 *
 * Supported algorithm names:
 *  <ul>
 *      <li><b>GOST 28147-KW</b> Key Wrapping GOST 28147 modes</li>
 *      <li><b>GOST R 34.12-KW</b> Key Wrapping GOST R 34.12 modes</li>
 *      <li><b>GOST 28147-MASK</b> Key Mask GOST 28147 modes</li>
 *      <li><b>GOST R 34.12-MASK</b> Key Mask GOST R 34.12 modes</li>
 *      <li><b>GOST R 34.10-MASK</b> Key Mask GOST R 34.10 modes</li>
 *  </ul>
 *  For additional modes see {@link GostCipher}<br>
 *
 * @memberOf SubtleCrypto
 * @method unwrapKey
 * @instance
 * @param {KeyFormat} format Format specifies a serialization format for a key. Now suppored only 'raw' key format.
 * @param {CryptoOperationData} wrappedKey Wrapped key data
 * @param {Key} unwrappingKey Unwrapping key object
 * @param {AlgorithmIdentifier} unwrapAlgorithm Algorithm identifier
 * @param {AlgorithmIdentifier} unwrappedKeyAlgorithm Key algorithm identifier
 * @param {boolean} extractable Whether or not the raw keying material may be exported by the application
 * @param {KeyUsages} keyUsages Key usage array: type of operation that may be performed using a key
 * @returns {Promise} Promise that resolves with {@link Key}
 */
SubtleCrypto.prototype.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) // <editor-fold defaultstate="collapsed">
{
    return new Promise(call).then(function () {
        if (checkNative(unwrapAlgorithm)) return rootCrypto.subtle.unwrapKey(format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages);

        unwrapAlgorithm = normalize(unwrapAlgorithm, 'unwrapKey');
        unwrappedKeyAlgorithm = normalize(unwrappedKeyAlgorithm, 'importKey');
        if (format !== 'raw') throw new _errors.NotSupportedError('Key format not supported');

        return execute(unwrapAlgorithm, 'unwrapKey', [extractKey('unwrapKey', unwrapAlgorithm, unwrappingKey), wrappedKey]).then(function (data) {
            var type;
            if (unwrappedKeyAlgorithm && unwrappedKeyAlgorithm.name) {
                var name = unwrappedKeyAlgorithm.name.toUpperCase().replace(/[\.\s]/g, '');
                if (name.indexOf('3410') >= 0 && keyUsages.indexOf('sign') >= 0) type = 'private';else if (name.indexOf('3410') >= 0 && keyUsages.indexOf('verify') >= 0) type = 'public';
            }
            if (unwrapAlgorithm.procreator === 'SC' && type === 'private') data = swapBytes(data);
            return convertKey(unwrappedKeyAlgorithm, extractable, keyUsages, data, type);
        });
    });
}; // </editor-fold>

var gostSubtleInstance = exports.gostSubtleInstance = new SubtleCrypto();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gostCertInstance = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @file Provides facilities for handling certificates, CRLs, etc.
                                                                                                                                                                                                                                                                               * @version 1.76
                                                                                                                                                                                                                                                                               * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
                                                                                                                                                                                                                                                                               */

exports.GostCert = GostCert;

var _gostCrypto = __webpack_require__(15);

var _gostSecurity = __webpack_require__(6);

var _gostCoding = __webpack_require__(2);

var _gostASN = __webpack_require__(5);

var _gostSubtle = __webpack_require__(11);

/*
 * Common algorithms
 *
 */ // <editor-fold defaultstate="collapsed">
var CryptoOperationData = ArrayBuffer;

// Coding
var coding = _gostCoding.gostCodingInstance;

// Providers
var providers = _gostSecurity.gostSecurityInstance.providers;

// ASN.1 syntax
var asn1 = _gostASN.gostASN1Instance;

// Crypto subtle
var subtle = _gostSubtle.gostSubtleInstance;

// Expand javascript object
function expand(r) {
    for (var i = 1, n = arguments.length; i < n; i++) {
        var item = arguments[i];
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') for (var name in item) {
            if (item.hasOwnProperty(name)) r[name] = item[name];
        }
    }
    return r;
}

// Extend javascript class
function extend(Class) {
    var F = function F() {};
    F.prototype = Class.prototype;
    var r = new F(),
        args = [r];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }return expand.apply(this, args);
}

// Today date + n days
function today(n) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    if (n) date.setDate(date.getDate() + n);
    return date;
}

// Self resolver
function call(callback) {
    try {
        callback();
    } catch (e) {}
}

// Serial number
function genSerialNumber() {
    var seed = new Uint8Array(4);
    _gostCrypto.gostCrypto.getRandomValues(seed);
    seed[0] = seed[0] & 0x7f;
    return coding.Int16.encode(seed);
}

// True if equal numbers
var equalNumbers = function () {
    // Convert number to bigendian hex string
    var hex = function hex(s) {
        var t = typeof s === 'undefined' ? 'undefined' : _typeof(s);
        return t === 'undefined' || s === '' ? '0' : t === 'number' || s instanceof Number ? s.toString(16).toLowerCase() : s.replace('0x', '').toLowerCase();
    };
    // Zero left padding
    var lpad = function lpad(s, size) {
        return (new Array(size + 1).join('0') + s).slice(-size);
    };
    return function (s1, s2) {
        s1 = hex(s1);
        s2 = hex(s2);
        var len = Math.max(s1.length, s2.length);
        return lpad(s1, len) === lpad(s2, len);
    };
}();

// Check equal names
function equalNames(name1, name2) {
    for (var key in name1) {
        if (name1[key] !== name2[key]) return false;
    }for (var key in name2) {
        if (name1[key] !== name2[key]) return false;
    }return true;
}

// Check the buffers to equal
function equalBuffers(r1, r2) {
    var s1 = new Uint8Array(r1),
        s2 = new Uint8Array(r2);
    if (s1.length !== s2.length) return false;
    for (var i = 0, n = s1.length; i < n; i++) {
        if (s1[i] !== s2[i]) return false;
    }return true;
}

// Match certificate
function matchCertificate(cert, selector) {
    var skid = cert.extensions && cert.extensions.subjectKeyIdentifier;
    return cert && selector && (!selector.issuer || equalNames(cert.issuer, selector.issuer)) && (!selector.serialNumber || equalNumbers(cert.serialNumber, selector.serialNumber)) && (!selector.subjectKeyIdentifier || equalBuffers(skid, selector.subjectKeyIdentifier)) && (!selector.subject || equalNames(cert.subject, selector.subject)) && (!selector.date || cert.notBefore.getTime() <= selector.date.getTime() && cert.notAfter.getTime() > selector.date.getTime());
}

// Create authority certificate selector
function authoritySelector(cert, extensions, date) {
    var selector = { subject: cert.issuer, date: date },
        akid = extensions && extensions.authorityKeyIdentifier;
    if (akid) {
        selector.subjectKeyIdentifier = akid.keyIdentifier;
        if (akid.authorityCertIssuer && akid.authorityCertIssuer[0] && akid.authorityCertSerialNumber) {
            selector.issuer = akid.authorityCertIssuer[0];
            selector.serialNumber = akid.authorityCertSerialNumber;
        }
    }
    return selector;
}

// Find certificates
function selectCertificates(certs, selector) {
    var result = [];
    for (var i = 0, n = certs.length; i < n; i++) {
        if (matchCertificate(certs[i], selector)) result.push(certs[i]);
    }return result;
}

// Match CRL
function matchCRL(crl, selector) {
    return (!selector.issuer || equalNames(crl.issuer, selector.issuer)) && (!selector.date || crl.thisUpdate.getTime() < selector.date.getTime());
}

// Find certificates
function selectCRLs(crls, selector) {
    var result = [];
    for (var i = 0, n = crls.length; i < n; i++) {
        if (matchCRL(crls[i], selector)) result.push(crls[i]);
    }return result;
}

// Define provider for key algorithm
function keyProvider(algorithm) {
    var id = algorithm.id;
    for (var name in providers) {
        var provider = providers[name];
        if (provider.publicKey.id === id) return provider;
    }
}

function defineProperty(object, name, descriptor, enumerable) {
    if ((typeof descriptor === 'undefined' ? 'undefined' : _typeof(descriptor)) !== 'object') descriptor = { value: descriptor };
    if (enumerable !== undefined) descriptor.enumerable = enumerable;
    Object.defineProperty(object, name, descriptor);
}

function defineProperties(object, properties, enumerable) {
    for (var name in properties) {
        defineProperty(object, name, properties[name], enumerable);
    }
}

// Extend javascript class
function extend(Super, Class, propertiesObject, propertiesClass) {
    // If constructor not defined
    if (typeof Class !== 'function') {
        propertiesClass = propertiesObject;
        propertiesObject = Class;
        Class = function Class() {
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
    if (propertiesObject) defineProperties(Class.prototype, propertiesObject, true);
    // Inherites super class properties
    if (Super !== Object) for (var name in Super) {
        Class[name] = Super[name];
    }Class.super = Super;
    if (propertiesClass) defineProperties(Class, propertiesClass, true);
    return Class;
}

// </editor-fold>

/**
 * Provides facilities for handling certificates, CRLs, etc.
 *
 * @class GostCert
 */
function GostCert() {}

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
var options = { // <editor-fold defaultstate="collapsed">
    providerName: 'CP-01',
    subject: { countryName: 'RU', commonName: 'Anonymous' },
    caKeyUsage: ['digitalSignature', 'nonRepudiation', 'keyEncipherment', 'dataEncipherment', 'keyAgreement', 'keyCertSign', 'cRLSign'],
    caExtKeyUsage: ['serverAuth', 'clientAuth', 'codeSigning', 'emailProtection', 'ipsecEndSystem', 'ipsecTunnel', 'ipsecUser', 'timeStamping', 'OCSPSigning'],
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
var X509 = function X509(cert) // <editor-fold defaultstate="collapsed">
{
    try {
        // Try to use decode X.509 certificate
        asn1.Certificate.call(this, cert, true);
    } catch (e) {
        try {
            // Try to decode certification request
            cert = new asn1.CertificationRequest(cert, true);
        } catch (e) {}
        // Create new certificate structure
        cert = cert || {};
        asn1.Certificate.call(this, {
            version: 2,
            serialNumber: cert.serialNumber || genSerialNumber(),
            signature: cert.signature || { id: 'noSignature' },
            issuer: cert.subject || options.subject,
            notBefore: cert.notBefore || today(),
            notAfter: cert.notAfter || today(cert.days || options.days),
            subject: cert.subject || options.subject,
            subjectPublicKeyInfo: cert.subjectPublicKeyInfo || {
                algorithm: { id: 'noSignature' },
                subjectPublicKey: new CryptoOperationData(0)
            },
            extensions: cert.attributes && (cert.attributes.extensionRequest || cert.attributes.msCertExtensions) || cert.extensions,
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
    sign: function sign(issuerPrivateKey, issuerCertificate) // <editor-fold defaultstate="collapsed">
    {

        var self = this,
            spki = self.subjectPublicKeyInfo;
        return new Promise(call).then(function () {

            // Need generated key
            if (!spki || !spki.algorithm || spki.algorithm === 'noSignature') throw new Error('Key pair was not generated for the certificate');
            // Check issuer private key
            if (!issuerPrivateKey) throw new Error('The private key of the issuer is not defined');

            // Certificate can be self signed
            issuerCertificate = issuerCertificate || self;

            // Calculate subject key indentifier
            return subtle.digest('SHA-1', spki.subjectPublicKey);
        }).then(function (digest) {

            // Signature algorithm
            var provider = issuerCertificate.getProvider() || providers[options.providerName];
            if (!self.signature || self.signature.id === 'noSignature') self.signature = provider.signature;
            self.signatureAlgorithm = self.signature;

            // Set issuer
            self.issuer = issuerCertificate.subject;
            // Set default extensions
            if (!self.extensions) self.extensions = {};
            var exts = self.extensions,
                ae = issuerCertificate.extensions;
            if (self === issuerCertificate) {
                // Self-signed CA certificate
                // Set key usage
                exts.keyUsage = exts.keyUsage || options.caKeyUsage;
                exts.extKeyUsage = exts.extKeyUsage || options.caExtKeyUsage;
                // Set basic constraints
                exts.basicConstraints = exts.basicConstraints || { cA: true };
            } else {
                // Check key usage and validity
                if (!issuerCertificate.checkUsage('keyCertSign', self.notBefore)) throw new Error('The issuer\'s certificate is not valid for signing a certificate');

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
                        if (pathLen > 0) exts.basicConstraints.pathLenConstraint = pathLen - 1;else throw new Error('Path length constraint exceeded');
                    }
                }
            }
            // Subject key identifier 160 bit from public key hash
            exts.subjectKeyIdentifier = digest;
            // Authority key identifier
            if (ae && ae.subjectKeyIdentifier) exts.authorityKeyIdentifier = {
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
    generate: function generate(keyAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            privateKey,
            provider;
        if (keyAlgorithm) provider = providers[keyAlgorithm];else provider = this.getProvider() || providers[options.providerName];
        if (provider) keyAlgorithm = expand(provider.publicKey, { privateKey: provider.privateKey });

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
    getPublicKey: function getPublicKey() // <editor-fold defaultstate="collapsed">
    {
        var spki = this.subjectPublicKeyInfo,
            keyUsages = spki.algorithm.id === 'rsaEncryption' ? ['verify'] : ['verify', 'deriveKey', 'deriveBits'];
        return subtle.importKey('spki', spki.encode(), spki.algorithm, 'false', keyUsages);
    }, // </editor-fold>
    /**
     * Get appropriate crypto provider for public key
     *
     * @memberOf GostCert.X509
     * @instance
     * @returns Object Set of crypto provider algorithms
     */
    getProvider: function getProvider() // <editor-fold defaultstate="collapsed">
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
    verify: function verify(issuerCertificate, issuerCRL, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            exts = self.extensions;
        return new Promise(call).then(function () {
            // Current date
            date = date || today();
            if (self.notBefore.getTime() > date.getTime() || self.notAfter.getTime() <= date.getTime()) throw new Error('The certificate has not yet started or expired');
            // A unrecognized critical extensions
            for (var name in exts) {
                var value = exts[name];
                if (value.critical && ['authorityKeyIdentifier', 'subjectKeyIdentifier', 'keyUsage', 'certificatePolicies', 'policyMappings', 'basicConstraints', 'nameConstraints', 'policyConstraints', 'extKeyUsage'].indexOf(name) < 0) throw new Error('The critical extension \'' + name + '\' is unrecognized');
            }
            // The certificate can be self-signed
            var selector = authoritySelector(self, exts, self.notBefore);
            if (!issuerCertificate && matchCertificate(self, selector)) issuerCertificate = self;
            // Check issuer
            if (issuerCertificate) {
                if (!matchCertificate(issuerCertificate, selector) || !issuerCertificate.checkUsage('keyCertSign', self.notBefore)) throw new Error('The issuer\'s certificate is not valid');
                // Check certificate signature
                return issuerCertificate.verifySignature(self.tbsCertificate.encode(), self.signatureValue, self.signatureAlgorithm);
            }
            return true;
        }).then(function (result) {
            if (!result) throw new Error('The certificate has invalid signature');
            // Check CRL
            if (issuerCRL) {
                if (!matchCRL(issuerCRL, { issuer: self.issuer, date: date })) throw new Error('The issuer\'s CRL is not valid');
                if (issuerCRL.isRevoked(self.serialNumber)) throw new Error('The certificate is revoked');
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
    verifySignature: function verifySignature(data, signature, algorithm) // <editor-fold defaultstate="collapsed">
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
    checkUsage: function checkUsage(operation, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            exts = self.extensions;
        date = date || today();
        return self.notBefore.getTime() <= date.getTime() && self.notAfter.getTime() > date.getTime() && (!exts || !(['keyCertSign', 'cRLSign'].indexOf(operation) > 0 && exts.basicConstraints && !exts.basicConstraints.cA || exts.keyUsage && exts.keyUsage.indexOf(operation) < 0 && exts.extKeyUsage && exts.extKeyUsage.indexOf(operation) < 0));
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
var CRL = function CRL(crl) // <editor-fold defaultstate="collapsed">
{
    // Call super
    CRL.super.call(this, crl);
    // Initialize defaults
    if (!this.version) this.version = 1;
    if (!this.revokedCertificates) this.revokedCertificates = [];
    if (!this.thisUpdate) this.thisUpdate = today();
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
    sign: function sign(issuerPrivateKey, issuerCertificate) // <editor-fold defaultstate="collapsed">
    {

        var self = this;
        return new Promise(call).then(function () {
            // Check issuer private key
            if (!issuerPrivateKey) throw new Error('The issuer\'s private key is not defined');
            // Check issuer certificate
            if (!issuerCertificate) throw new Error('The issuer\'s certificate is not defined');
            // Check issuer name
            if (!self.issuer) self.issuer = issuerCertificate.issuer;else if (!equalNames(self.issuer, issuerCertificate.issuer)) throw new Error('The CRL prototype and authority certificate have different issuers');
            // Check key usage and validity
            if (!issuerCertificate.checkUsage('cRLSign', self.thisUpdate)) throw new Error('The issuer\'s certificate is not valid for signing a CRL');

            // Signature algorithm
            var provider = issuerCertificate.getProvider() || providers[options.providerName];
            if (!self.signature) self.signature = provider.signature;
            self.signatureAlgorithm = self.signature;

            // Set issuer
            self.issuer = issuerCertificate.subject;
            // Set default extensions
            if (!self.crlExtensions) self.crlExtensions = {};
            var exts = self.crlExtensions,
                ae = issuerCertificate.extensions;
            if (ae && ae.subjectKeyIdentifier) exts.authorityKeyIdentifier = {
                keyIdentifier: ae.subjectKeyIdentifier,
                authorityCertIssuer: [issuerCertificate.issuer],
                authorityCertSerialNumber: issuerCertificate.serialNumber
            };
            exts.cRLNumber = exts.cRLNumber || 0;

            // Import the private key
            return subtle.importKey('pkcs8', issuerPrivateKey.encode(), issuerPrivateKey.privateKeyAlgorithm, false, ['sign']);
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
    verify: function verify(issuerCertificate, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            exts = self.crlExtensions;
        return new Promise(call).then(function () {
            // Current date
            date = date || today();
            if (!self.thisUpdate.getTime() > date.getTime()) throw new Error('The CRL has not yet started');
            // Check issuer
            if (issuerCertificate) {
                if (!matchCertificate(issuerCertificate, authoritySelector(self, exts, self.thisUpdate)) || !issuerCertificate.checkUsage('cRLSign', self.thisUpdate)) throw new Error('The issuer\'s certificate is not valid');
                if (!self.signatureValue || !self.signatureAlgorithm) throw new Error('The has no signature');
                // Check CRL signature
                return issuerCertificate.verifySignature(self.tbsCertList.encode(), self.signatureValue, self.signatureAlgorithm);
            }
        }).then(function (result) {
            if (!result) throw new Error('The CRL has invalid signature');
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
    isRevoked: function isRevoked(serialNumber, date) // <editor-fold defaultstate="collapsed">
    {
        var rc = this.revokedCertificates;
        date = date || today();
        for (var i = 0; i < rc.length; i++) {
            // Check date and serial number
            if (date.getTime() >= rc[i].revocationDate.getTime() && equalNumbers(rc[i].userCertificate, serialNumber)) return true;
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
    generate: function generate(keyAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            privateKey,
            provider;
        if (keyAlgorithm) provider = providers[keyAlgorithm];else provider = this.getProvider() || providers[options.providerName];
        if (provider) keyAlgorithm = expand(provider.publicKey, { privateKey: provider.privateKey });

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
    getProvider: function getProvider() // <editor-fold defaultstate="collapsed">
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
    sign: function sign(privateKey) // <editor-fold defaultstate="collapsed">
    {

        var self = this,
            spki = self.subjectPublicKeyInfo;
        return new Promise(call).then(function () {

            // Need generated key
            if (!spki || !spki.algorithm || spki.algorithm === 'noSignature') throw new Error('Key pair was not generated for the certificate');
            // Check issuer private key
            if (!privateKey) throw new Error('The private key is not defined');

            // Signature algorithm
            var provider = keyProvider(spki.algorithm) || providers[options.providerName];
            self.signatureAlgorithm = provider.signature;

            // Import the private key
            return subtle.importKey('pkcs8', privateKey.encode(), privateKey.privateKeyAlgorithm, false, ['sign']);
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
    verify: function verify() // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            spki = self.subjectPublicKeyInfo;
        return new Promise(call).then(function () {

            // Import key
            return subtle.importKey('spki', spki.encode(), spki.algorithm, 'false', ['verify']);
        }).then(function (publicKey) {

            // Verify signature
            return subtle.verify(self.signatureAlgorithm, publicKey, self.signatureValue, self.requestInfo.encode());
        }).then(function (result) {
            if (!result) throw new Error('The certification request has invalid signature');
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
    getCertificates: function getCertificates(selector) // <editor-fold defaultstate="collapsed">
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
    getCRLs: function getCRLs(selector) // <editor-fold defaultstate="collapsed">
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
    load: function load(store) // <editor-fold defaultstate="collapsed">
    {
        var info = new asn1.ContentInfo(store),
            certs = info.certificates,
            crls = info.crls;
        for (var i = 0; i < certs.length; i++) {
            this.certificates.push(new X509(certs[i]));
        }for (var i = 0; i < crls.length; i++) {
            this.crls.push(new CRL(crls[i]));
        }return this;
    }, // </editor-fold>
    /**
     * Stores this CertStore to the given output stream in PKCS#7 format.
     *
     * @memberOf GostCert.CertStore
     * @instance
     * @returns {GostASN1.ContentInfo} PKCS#7 content info with certificates and crls from CertStore
     */
    store: function store() // <editor-fold defaultstate="collapsed">
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
    build: function build(certificate, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Build certification path
            var current = new X509(certificate),
                certPath = [],
                success = false,
                verifiers = [];
            while (current) {
                var foundCRLs = [],
                    founds = [];
                certPath.push(current);
                if (!success) {
                    // Select issuer CRL
                    foundCRLs = self.certStore.getCRLs({ issuer: current.issuer, date: date });
                    // Create issuer's selection criteria
                    var selector = authoritySelector(current, current.extensions, current.notBefore);
                    // Self-signed certificate?
                    if (!matchCertificate(current, selector))
                        // Select issuer form trusted CA root list
                        founds = self.certStore.getCertificates(selector);else success = true;
                }
                // Add verification tasks
                var next = founds.length > 0 && new X509(founds[0]),
                    crl = foundCRLs.length > 0 && new CRL(foundCRLs[0]);
                // Verify CRLs
                if (crl) verifiers.push(crl.verify(next, date));

                // Verify the certificate
                verifiers.push(current.verify(next, crl, date));
                current = next;
            }
            if (!success) throw new Error('Root certificate is not found');
            // Verify all certificates in path
            return Promise.all(verifiers).then(function (results) {
                for (var i = 0; i < results; i++) {
                    if (!results[i]) throw new Error('Certification path is not validated');
                }return certPath;
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
function CertificateTrustPolicy() {}

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
    getValidCertificate: function getValidCertificate(selector, certificates, crls) {}
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
    getValidCertificate: function getValidCertificate(selector, certificates, crls, date) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            certPath;
        return new Promise(call).then(function () {
            certificates = certificates || [];
            crls = crls || [];
            // Get certificates from the trusted list
            var certs = selectCertificates(self.trustedCACerts, selector);
            if (certs.length > 0) return new X509(certs[0]);
            // Get certificates from the list
            certs = selectCertificates(certificates, selector);
            if (certs.length === 0) return;
            // Build certification path
            var current = new X509(certs[0]),
                success = false,
                verifiers = [];
            certPath = [];
            while (current) {
                var foundCRLs = [],
                    founds = [];
                certPath.push(current);
                if (!success) {
                    // Select issuer CRL
                    foundCRLs = selectCRLs(crls, { issuer: current.issuer, date: date });
                    if (foundCRLs.length === 0 && self.requireCRL) return; // The issuer\'s CRL is not found
                    // Create issuer's selection criteria
                    selector = authoritySelector(current, current.extensions, current.notBefore);
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
                                    if (!exts || !exts.basicConstraints || !exts.basicConstraints.cA) return; // The issuer\'s certificate is not valid
                                    // Check path length limit
                                    if (exts.basicConstraints.pathLenConstraint !== undefined && exts.basicConstraints.pathLenConstraint < certPath.length - 1) return; // The issuer\'s certificate path length constraint exceeded
                                }
                            } else return; // Certification path is not built
                        }
                    } else success = true;
                }
                // Add verification tasks
                var next = founds.length > 0 && new X509(founds[0]),
                    crl = foundCRLs.length > 0 && new CRL(foundCRLs[0]);
                // Verify CRLs
                if (crl) verifiers.push(crl.verify(next, date));

                // Verify the certificate
                verifiers.push(current.verify(next, crl, date));
                current = next;
            }
            if (!success) throw new Error('Trusted root certificate is not found');
            // Verify all certificates in path
            return Promise.all(verifiers).then(function (results) {
                for (var i = 0; i < results; i++) {
                    if (!results[i]) throw new Error('Certification path is not validated');
                }return certPath[0];
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

var gostCertInstance = exports.gostCertInstance = new GostCert();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gostCMSInstance = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @file Implements the Cryptographic Message Syntax as specified in RFC-2630.
                                                                                                                                                                                                                                                                               * @version 1.76
                                                                                                                                                                                                                                                                               * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
                                                                                                                                                                                                                                                                               */

exports.GostCMS = GostCMS;

var _gostSubtle = __webpack_require__(11);

var _gostASN = __webpack_require__(5);

var _gostCoding = __webpack_require__(2);

var _gostCert = __webpack_require__(13);

var _gostSecurity = __webpack_require__(6);

/*
 * Common algorithms
 */ // <editor-fold defaultstate="collapsed">

var CryptoOperationData = ArrayBuffer;

var providers = _gostSecurity.gostSecurityInstance.providers;
var coding = _gostCoding.gostCodingInstance;
var asn1 = _gostASN.gostASN1Instance;
var subtle = _gostSubtle.gostSubtleInstance;
var cert = _gostCert.gostCertInstance;

// Expand javascript object
function expand() {
    var r = {};
    for (var i = 0, n = arguments.length; i < n; i++) {
        var item = arguments[i];
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') for (var name in item) {
            if (item.hasOwnProperty(name)) r[name] = item[name];
        }
    }
    return r;
}

function defineProperty(object, name, descriptor, enumerable) {
    if ((typeof descriptor === 'undefined' ? 'undefined' : _typeof(descriptor)) !== 'object') descriptor = { value: descriptor };
    if (enumerable !== undefined) descriptor.enumerable = enumerable;
    Object.defineProperty(object, name, descriptor);
}

function defineProperties(object, properties, enumerable) {
    for (var name in properties) {
        defineProperty(object, name, properties[name], enumerable);
    }
}

// Extend javascript class
function extend(Super, Class, propertiesObject, propertiesClass) {
    // If constructor not defined
    if (typeof Class !== 'function') {
        propertiesClass = propertiesObject;
        propertiesObject = Class;
        Class = function Class() {
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
    if (propertiesObject) defineProperties(Class.prototype, propertiesObject, true);
    // Inherites super class properties
    if (Super !== Object) for (var name in Super) {
        Class[name] = Super[name];
    }Class.super = Super;
    if (propertiesClass) defineProperties(Class, propertiesClass, true);
    return Class;
}

// Self resolver
function call(callback) {
    try {
        callback();
    } catch (e) {}
}

// Check the buffers to equal
function equalBuffers(r1, r2) {
    var s1 = new Uint8Array(r1),
        s2 = new Uint8Array(r2);
    if (s1.length !== s2.length) return false;
    for (var i = 0, n = s1.length; i < n; i++) {
        if (s1[i] !== s2[i]) return false;
    }return true;
}

// True if equal numbers
var equalNumbers = function () {
    // Convert number to bigendian hex string
    var hex = function hex(s) {
        var t = typeof s === 'undefined' ? 'undefined' : _typeof(s);
        return t === 'undefined' || s === '' ? '0' : t === 'number' || s instanceof Number ? s.toString(16).toLowerCase() : s.replace('0x', '').toLowerCase();
    };
    // Zero left padding
    var lpad = function lpad(s, size) {
        return (new Array(size + 1).join('0') + s).slice(-size);
    };
    return function (s1, s2) {
        s1 = hex(s1);
        s2 = hex(s2);
        var len = Math.max(s1.length, s2.length);
        return lpad(s1, len) === lpad(s2, len);
    };
}();

// Check equal names
function equalNames(name1, name2) {
    for (var key in name1) {
        if (name1[key] !== name2[key]) return false;
    }for (var key in name2) {
        if (name1[key] !== name2[key]) return false;
    }return true;
}

// Add unique value to array
function addUnique(array, item, comparator) {
    var found = false;
    for (var i = 0, n = array.length; i < n; i++) {
        if (comparator(array[i], item)) {
            found = true;
            break;
        }
    }if (!found) array.push(item);
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
        if (typeof contentInfo === 'string') try {
            contentInfo = coding.PEM.decode(contentInfo);
        } catch (e1) {
            contentInfo = coding.Chars.decode(contentInfo);
        }
        if (contentInfo instanceof CryptoOperationData) try {
            contentInfo = asn1.ContentInfo.decode(contentInfo);
        } catch (e) {
            contentInfo = { contentType: 'data', content: contentInfo };
        }
        contentType = contentInfo.contentType;
        if (!contentType) throw new Error('Invalid content object');
        content = contentInfo.content;
        if (!(content instanceof CryptoOperationData)) content = content.encode();
        return { contentType: contentType, content: content };
    } else contentInfo = { contentType: 'data' };
    return contentInfo;
}

function createContentInfo(contentInfo) {
    try {
        // Some provider has mistake to envelop ContentInfo enstead
        // content field of ContentInfo
        contentInfo = new asn1.ContentInfo(contentInfo.content, true);
    } catch (e) {}
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
    return id instanceof CryptoOperationData ? cert.extensions && equalBuffers(id, cert.extensions.subjectKeyIdentifier) : equalNames(cert.issuer, id.issuer) && equalNumbers(cert.serialNumber, id.serialNumber);
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
    if (!password) return new CryptoOperationData(0);
    if (password instanceof CryptoOperationData) return password;
    if (typeof password !== 'string') throw new Error('The password must be string or raw data type');
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
        return coding.Chars.decode(password + '\0', 'unicode');else
        // PKCS#5 password mode
        return coding.Chars.decode(password, 'utf8');
}

// Define provider for encription algorithm
function encryptionProvider(algorithm) {
    var id = algorithm.id;
    for (var name in providers) {
        var provider = providers[name];
        if (provider.encryption.id === id) return provider;
    }
}

// </editor-fold>

/**
 * Provides facilities for handling certificates, CRLs, etc.
 * @class GostCMS
 */
function GostCMS() {}

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
var options = { // <editor-fold defaultstate="collapsed">
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
    if (defaultSet && this.contentType !== (defaultSet.contentType || 'data')) throw new Error('Invalid content type');
} // </editor-fold>

extend(asn1.ContentInfo, DataContentInfo, {
    /**
     * Indicates if this is a detached CMS object.
     *
     * @memberOf GostCMS.DataContentInfo
     * @instance
     * @returns {boolean} true if detached; false otherwise.
     */
    isDetached: { // <editor-fold defaultstate="collapsed">
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
    writeDetached: function writeDetached(createDetached) // <editor-fold defaultstate="collapsed">
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
    encode: function encode(format) // <editor-fold defaultstate="collapsed">
    {
        if (this.isDetached) {
            var data = getContentData(this);
            setContentData(this, { contentType: data.contentType });
            var result = asn1.ContentInfo.method('encode').call(this, format);
            setContentData(this, data);
            return result;
        } else return asn1.ContentInfo.method('encode').call(this, format);
    }, // </editor-fold>
    /**
     * Enclose content to document.
     *
     * @memberOf GostCMS.DataContentInfo
     * @instance
     * @param {(FormatedData|GostASN1.ContentInfo)} contentInfo
     * @returns {Promise} Promise to return self object after enclose content
     */
    encloseContent: function encloseContent(contentInfo) // <editor-fold defaultstate="collapsed">
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
    setEnclosed: function setEnclosed(contentInfo) // <editor-fold defaultstate="collapsed">
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
    getEnclosed: function getEnclosed() // <editor-fold defaultstate="collapsed">
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
} // </editor-fold>

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
    encloseContent: function encloseContent(contentInfo, digestAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Set enclosed data
            self.setEnclosed(contentInfo);

            // Define digest algorithm
            if (digestAlgorithm) {
                var digestProvider = providers[digestAlgorithm];
                self.digestAlgorithm = digestProvider && digestProvider.digest || digestAlgorithm;
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
    verify: function verify(contentInfo) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Append attached
            if (contentInfo) self.setEnclosed(contentInfo);

            // Check data
            var dataToVerify = self.encapContentInfo && self.encapContentInfo.eContent;
            if (!dataToVerify) throw new Error('Detached content is not found');

            // Calculate digest
            return subtle.digest(self.digestAlgorithm, self.encapContentInfo.eContent);
        }).then(function (digest) {
            if (!equalBuffers(digest, self.digest)) throw Error('Message digest is not verified');
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
} // </editor-fold>

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
    addSignature: function addSignature(signerKey, signerCert, signedAttrs, unsignedAttrs) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            signerInfo,
            dataToSign,
            signerCertChain;
        return new Promise(call).then(function () {
            // Check attribures
            if (!signerKey || !signerCert) throw new Error('Signer key or certificate is not defined');
            // Cert chain
            if (signerCert instanceof Array) {
                signerCertChain = signerCert;
                signerCert = signerCertChain[0];
            } else signerCertChain = [signerCert];
            // Signature algorithm provider
            var provider = signerCert.getProvider() || providers[options.providerName];
            var useKeyIdentifier = options.useKeyIdentifier && signerCert.extensions && signerCert.extensions.subjectKeyIdentifier;
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
            if (unsignedAttrs) signerInfo.unsignedAttrs = unsignedAttrs;
            // For a signed attributes calculate digest
            if (signedAttrs) {
                if ((typeof signedAttrs === 'undefined' ? 'undefined' : _typeof(signedAttrs)) !== 'object') signedAttrs = {};
                return subtle.digest(signerInfo.digestAlgorithm, dataToSign);
            }
        }).then(function (digest) {
            if (digest) {
                // Add standard signed attributes
                signedAttrs.contentType = self.encapContentInfo.eContentType, signedAttrs.messageDigest = digest, signedAttrs.signingTime = new Date();
                signerInfo.signedAttrs = signedAttrs,
                // Now data to sign = attributes
                dataToSign = asn1.SignedAttributes.encode(signerInfo.signedAttrs);
            }

            // Import the private key
            return subtle.importKey('pkcs8', asn1.PrivateKeyInfo.encode(signerKey), signerKey.privateKeyAlgorithm, false, ['sign']);
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
                if (!self.certificates) self.certificates = [];
                for (var i = 0, n = signerCertChain.length; i < n; i++) {
                    addUnique(self.certificates, signerCertChain[i], function (cert1, cert2) {
                        return equalNames(cert1.issuer, cert2.issuer) && equalNumbers(cert1.serialNumber, cert2.serialNumber);
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
    isDegenerate: { // <editor-fold defaultstate="collapsed">
        get: function get() {
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
    verify: function verify(trustPolicy, contentInfo) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            result;
        return new Promise(call).then(function () {
            // Append attached
            if (contentInfo) self.setEnclosed(contentInfo);
            if (!self.signerInfos || self.signerInfos.length === 0) throw new Error('No signatures found');
            // Validate certificate of signers
            return Promise.all(self.signerInfos.map(function (signerInfo, i) {
                var sid = signerInfo.sid,
                    selector = sid instanceof CryptoOperationData ? {
                    subjectKeyIdentifier: sid
                } : {
                    issuer: sid.issuer,
                    serialNumber: sid.serialNumber
                };
                // Signing date
                var date;
                if (signerInfo.signedAttrs && signerInfo.signedAttrs.signingTime) date = signerInfo.signedAttrs.signingTime;
                // Use certificate trust policy validation
                return trustPolicy.getValidCertificate(selector, self.certificates, self.crls, date).catch(function () {
                    return; // Ignore error
                });
            }));
        }).then(function (certs) {
            // Get encapsulated data
            var verifiers = [];
            // Verify signatures for each signers
            certs.forEach(function (signerCert) {
                if (signerCert) verifiers.push(self.verifySignature(signerCert).then(function (data) {
                    result = data; // Enough one valid signature
                }, function () {
                    return; // Ignore error
                }));
            });
            if (verifiers.length === 0) throw new Error('Valid verification path not found');
            return Promise.all(verifiers);
        }).then(function () {
            if (!result) throw Error('Verification path found but no valid signature');
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
    verifySignature: function verifySignature(signerCert, contentInfo) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            signerInfo,
            dataToVerify,
            dataDigest;
        return new Promise(call).then(function () {
            // Append attached
            if (contentInfo) self.setEnclosed(contentInfo);
            dataToVerify = self.encapContentInfo && self.encapContentInfo.eContent;
            if (!dataToVerify) throw new Error('Detached content is not found');
            // Find signer
            for (var i = 0; i < self.signerInfos.length; i++) {
                var sid = self.signerInfos[i].sid;
                if (matchCert(sid, signerCert)) {
                    signerInfo = self.signerInfos[i];
                    break;
                }
            }
            if (!signerInfo) throw new Error('Signature not found for the certificate');
            // Choice data for verification
            if (signerInfo.signedAttrs) {
                dataDigest = signerInfo.signedAttrs.messageDigest;
                if (!dataDigest) throw new Error('Message digest must present in signed attributes');

                // To exclude implicit [0] need to reassemble signed attributes (auto on CTX object)
                dataToVerify = signerInfo.signedAttrs.encode();
            }
            if (!dataToVerify) throw new Error('Data for verification not found');
            // Verify signature
            var algorithm = expand(signerInfo.signatureAlgorithm, { hash: signerInfo.digestAlgorithm });
            return signerCert.verifySignature(dataToVerify, signerInfo.signatureValue, algorithm);
        }).then(function (result) {
            if (!result) throw new Error('Signature not verified');
            // Verify digest
            if (signerInfo.signedAttrs) return subtle.digest(signerInfo.digestAlgorithm, self.encapContentInfo.eContent);
        }).then(function (digest) {
            if (digest && !equalBuffers(digest, dataDigest)) throw new Error('Message digest not verified');
            // Return content
            return createContentInfo({
                contentType: self.encapContentInfo.eContentType,
                content: self.encapContentInfo.eContent
            });
        });
    } // </editor-fold>
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
} // </editor-fold>

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
    encloseContent: function encloseContent(contentInfo, contentEncryptionKey, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            encryption,
            derivation;
        return new Promise(call).then(function () {
            // Check content info
            contentInfo = checkContentInfo(contentInfo);
            if (!contentInfo.content) throw new Error('Content for encryption must be specified');

            // Define encryption algorithm
            var type = typeof contentEncryptionKey === 'string' ? 'pbes' : 'encryption';
            if (encryptionAlgorithm) {
                var provider = providers[encryptionAlgorithm];
                encryptionAlgorithm = provider && provider[type] || encryptionAlgorithm;
            } else encryptionAlgorithm = providers[options.providerName][type];
            // Prepare content encryption key
            if (encryptionAlgorithm.derivation) {
                // Encrypt with password
                derivation = expand(encryptionAlgorithm.derivation);
                encryption = expand(encryptionAlgorithm.encryption);
                derivation.salt = getSeed(saltSize(encryptionAlgorithm));
                // Import password for key generation
                var integrityKey;
                return subtle.importKey('raw', passwordData(derivation, contentEncryptionKey), derivation, false, ['deriveKey', 'deriveBits']).then(function (key) {
                    integrityKey = key;
                    // Derive IV
                    if (derivation.name.indexOf('PFXKDF') >= 0) {
                        derivation.diversifier = 2;
                        return subtle.deriveBits(derivation, integrityKey, 64);
                    }
                }).then(function (iv) {
                    if (iv) encryption.iv = iv;
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
                } else throw new Error('Content encryption key must be raw data or secret key type');
            }
        }).then(function (encryptionKey) {
            // Initial vector
            if (!encryption.iv) encryption.iv = getSeed(8);

            return subtle.encrypt(encryption, encryptionKey, contentInfo.content);
        }).then(function (encryptedContent) {
            if (encryptionAlgorithm.derivation) {
                delete derivation.diversifier;
                encryptionAlgorithm = expand(encryptionAlgorithm, {
                    derivation: derivation,
                    encryption: encryption
                });
            } else encryptionAlgorithm = encryption;
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
    getEnclosed: function getEnclosed(decryptionKey, contentInfo) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            encryption,
            derivation,
            encryptedContent;
        return new Promise(call).then(function () {
            // Append attached
            if (contentInfo) self.setEnclosed(contentInfo);
            encryptedContent = self.encryptedContentInfo.encryptedContent;
            if (!encryptedContent) throw new Error('Encrypted content must be specified');

            encryption = expand(self.encryptedContentInfo.contentEncryptionAlgorithm);
            if (encryption.derivation) {
                // Decrypt with password
                derivation = expand(encryption.derivation);
                encryption = expand(encryption.encryption);
                // Derive encryption key from password
                var integrityKey;
                return subtle.importKey('raw', passwordData(derivation, decryptionKey), derivation, false, ['deriveKey', 'deriveBits']).then(function (key) {
                    integrityKey = key;
                    // Derive iv for PFX
                    if (derivation.name.indexOf('PFXKDF') >= 0) {
                        derivation.diversifier = 2;
                        return subtle.deriveBits(derivation, integrityKey, 64);
                    }
                }).then(function (iv) {
                    if (iv) encryption.iv = iv;
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
                } else throw new Error('Decryption key must be raw data or secret key type');
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
} // </editor-fold>

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
    encloseContent: function encloseContent(contentInfo, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Check content info
            contentInfo = checkContentInfo(contentInfo);
            if (!contentInfo.content) throw new Error('Content for encryption must be specified');
            // Define encryption algorithm
            if (encryptionAlgorithm) {
                var provider = providers[encryptionAlgorithm];
                encryptionAlgorithm = provider && provider.encryption || encryptionAlgorithm;
            } else encryptionAlgorithm = providers[options.providerName].encryption;
            // Generate key for encryption content
            return subtle.generateKey(encryptionAlgorithm, true, ['encrypt']);
        }).then(function (encryptionKey) {
            // Encrypt content
            self.contentEncryptionKey = encryptionKey;
            // Initial vector
            if (!encryptionAlgorithm.iv) encryptionAlgorithm.iv = getSeed(8);
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
    addRecipient: function addRecipient(recipientCert, keyEncryptionAlgorithm, senderKey, senderCert) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            privateKey,
            encryptionProvider,
            derivation,
            wrapping;
        return new Promise(call).then(function () {
            // Check for recepient cert
            recipientCert = new cert.X509(recipientCert);
            if (keyEncryptionAlgorithm && typeof keyEncryptionAlgorithm !== 'string' && !keyEncryptionAlgorithm.algorithm) {
                // Sender parameters
                senderCert = senderKey;
                senderKey = keyEncryptionAlgorithm;
                keyEncryptionAlgorithm = undefined;
            }
            if (keyEncryptionAlgorithm) {
                encryptionProvider = providers[keyEncryptionAlgorithm];
            } else encryptionProvider = recipientCert.getProvider();

            // Check for content encryption key
            if (!self.contentEncryptionKey) throw new Error('The content encryption key is not assigned');

            if (senderCert) {
                // Sender certificate for agreement protocol
                var senderCertChain;
                if (senderCert instanceof Array) {
                    senderCertChain = senderCert;
                    senderCert = senderCertChain[0];
                } else senderCertChain = [senderCert];

                // Add sender certificate
                if (options.autoAddCert) {
                    if (!self.originatorInfo) self.originatorInfo = { certs: [] };else if (!self.originatorInfo.certs) self.originatorInfo.certs = [];
                    for (var i = 0, n = senderCertChain.length; i < n; i++) {
                        addUnique(self.originatorInfo.certs, senderCertChain[i], function (cert1, cert2) {
                            return equalNames(cert1.issuer, cert2.issuer) && equalNumbers(cert1.serialNumber, cert2.serialNumber);
                        });
                    }
                }
                // Key Agreement
                if (encryptionProvider) keyEncryptionAlgorithm = expand(encryptionProvider.agreement);else encryptionProvider = recipientCert.getProvider();
                // Certificates must have similar curve parameters
                if (recipientCert.subjectPublicKeyInfo.algorithm.namedCurve !== senderCert.subjectPublicKeyInfo.algorithm.namedCurve) throw new Error('The sender and the recipient have different public key algorithms');
                // Get private sender key
                return subtle.importKey('pkcs8', senderKey.encode(), senderKey.privateKeyAlgorithm, false, ['deriveKey']);
            } else {
                // Key Transport
                if (encryptionProvider) keyEncryptionAlgorithm = expand(recipientCert.subjectPublicKeyInfo.algorithm);else encryptionProvider = recipientCert.getProvider();
                // Generate key pair
                return subtle.generateKey(keyEncryptionAlgorithm, true, ['deriveKey']).then(function (keyPair) {
                    keyEncryptionAlgorithm['public'] = keyPair.publicKey;
                    return keyPair.privateKey;
                });
            }
        }).then(function (key) {
            privateKey = key;
            // Get public key from recipient certificate
            return subtle.importKey('spki', recipientCert.subjectPublicKeyInfo.encode(), recipientCert.subjectPublicKeyInfo.algorithm, false, ['deriveKey', 'deriveBits']);
        }).then(function (publicKey) {
            // Derivate key encryption key
            keyEncryptionAlgorithm.ukm = getSeed(8);
            derivation = expand(encryptionProvider.agreement, { sBox: keyEncryptionAlgorithm.sBox, ukm: keyEncryptionAlgorithm.ukm, 'public': publicKey });
            wrapping = expand(keyEncryptionAlgorithm.wrapping || encryptionProvider.wrapping, { ukm: keyEncryptionAlgorithm.ukm });
            return subtle.deriveKey(derivation, privateKey, wrapping, true, ['wrapKey']);
        }).then(function (wrappingKey) {
            // Wrap content encryption key
            keyEncryptionAlgorithm.wrapping = wrapping;
            return subtle.wrapKey('raw', self.contentEncryptionKey, wrappingKey, wrapping);
        }).then(function (wrappedKey) {
            // Create recipient info
            var recipientInfo;
            var useKeyIdentifier = options.useKeyIdentifier && recipientCert.extensions && recipientCert.extensions.subjectKeyIdentifier,
                rid = useKeyIdentifier ? recipientCert.extensions.subjectKeyIdentifier : {
                issuer: recipientCert.issuer,
                serialNumber: recipientCert.serialNumber
            };
            if (senderCert) {
                var spki = senderCert.subjectPublicKeyInfo;
                recipientInfo = { // KeyAgreeRecipientInfo
                    version: 3, // always set to 3
                    originator: {
                        algorithm: spki.algorithm,
                        publicKey: spki.subjectPublicKey
                    },
                    ukm: keyEncryptionAlgorithm.ukm,
                    keyEncryptionAlgorithm: keyEncryptionAlgorithm,
                    recipientEncryptedKeys: [{ // use only one recipient in domain
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
    getEnclosed: function getEnclosed(recipientKey, recipientCert, contentInfo, originatorCert) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            wrappedKey,
            encryptedContent,
            derivation,
            wrapping,
            encryption;
        return new Promise(call).then(function () {
            var encryptionProvider = recipientCert.getProvider();
            // Append attached
            if (contentInfo) self.setEnclosed(contentInfo);
            encryptedContent = self.encryptedContentInfo.encryptedContent;
            if (!encryptedContent) throw new Error('Encrypted content must be specified');

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
                                } else if (originatorCert && matchCert(originator, originatorCert)) return importKey('pkcs', originatorCert.subjectPublicKeyInfo.encode(), originatorCert.subjectPublicKeyInfo.algorithm, false, ['deriveKey', 'deriveBits']);else throw Error('Originator certificate not specified or not valid');
                            }
                        }
                    }
                }
            }
            throw new Error('Recipient not found or format not supported');
        }).then(function (publicKey) {
            derivation['public'] = publicKey;
            // Import private key
            return subtle.importKey('pkcs8', recipientKey.encode(), recipientKey.privateKeyAlgorithm, false, ['deriveKey', 'deriveBits']);
        }).then(function (privateKey) {
            // Derive key
            return subtle.deriveKey(derivation, privateKey, wrapping, true, ['unwrapKey']);
        }).then(function (unwrappingKey) {
            // Unwrap key
            return subtle.unwrapKey('raw', wrappedKey, unwrappingKey, wrapping, encryption, false, ['decrypt']);
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

var gostCMSInstance = exports.gostCMSInstance = new GostCMS();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gostCrypto = undefined;

var _gostRandom = __webpack_require__(8);

var _gostCoding = __webpack_require__(2);

var _gostSecurity = __webpack_require__(6);

var _gostASN = __webpack_require__(5);

var _gostSubtle = __webpack_require__(11);

var _gostCert = __webpack_require__(13);

var _gostCMS = __webpack_require__(14);

var _gostKeys = __webpack_require__(17);

/**
 * The gostCrypto provide general purpose cryptographic functionality for
 * GOST standards including a cryptographically strong pseudo-random number
 * generator seeded with truly random values.
 *
 * @namespace gostCrypto
 */
/**
 * @file Implementation Web Crypto interfaces for GOST algorithms
 * @version 1.76
 * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
 */

var gostCrypto = exports.gostCrypto = {
  /**
   * Coding algorithms: Base64, Hex, Int16, Chars, BER and PEM
   *
   * @memberOf gostCrypto
   * @type GostCoding
   */
  coding: _gostCoding.gostCodingInstance,

  /**
   * GOST and common ASN.1 Object and Algorithm Identifiers
   *
   * @memberOf gostCrypto
   * @type GostSecurity
   */
  security: _gostSecurity.gostSecurityInstance,

  /**
   * PKCS ASN.1 message syntax and converters
   *
   * @memberOf gostCrypto
   * @type GostASN1
   */
  asn1: _gostASN.gostASN1Instance,

  /**
   * The subtle attribute provides an instance of the SubtleCrypto
   * interface which provides low-level cryptographic primitives and
   * algorithms.
   *
   * @memberOf gostCrypto
   * @type SubtleCrypto
   */
  subtle: _gostSubtle.gostSubtleInstance,

  /**
   * Provides facilities for handling certificates, CRLs, etc.
   *
   * @memberOf gostCrypto
   * @type GostCert
   */
  cert: _gostCert.gostCertInstance,

  /**
   * Implements the Cryptographic Message Syntax as specified in RFC-2630.
   *
   * @memberOf gostCrypto
   * @type GostCMS
   */
  cms: _gostCMS.gostCMSInstance,

  /**
   * Implements the Key and Certificate Store methods
   *
   * @memberOf gostCrypto
   * @type GostKeys
   */
  keys: _gostKeys.gostKeysInstance
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
    var gostRandom = new _gostRandom.GostRandom();
    return gostRandom.getRandomValues(array);
  } catch (e) {
    throw new Error('Error occurred during random values generation');
  }
}; // </editor-fold>
// </editor-fold>

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gostKeysInstance = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @file Key and Certificate Store methods
                                                                                                                                                                                                                                                                               * @version 1.76
                                                                                                                                                                                                                                                                               * @copyright 2014-2016, Rudolf Nickolaev. All rights reserved.
                                                                                                                                                                                                                                                                               */

exports.GostKeys = GostKeys;

var _gostSecurity = __webpack_require__(6);

var _gostCoding = __webpack_require__(2);

var _gostASN = __webpack_require__(5);

var _gostSubtle = __webpack_require__(11);

var _gostCert = __webpack_require__(13);

var _gostCMS = __webpack_require__(14);

/*
 * Common tools and methods
 */ // <editor-fold defaultstate="collapsed">

var CryptoOperationData = ArrayBuffer;

var coding = _gostCoding.gostCodingInstance;
var providers = _gostSecurity.gostSecurityInstance.providers;
var asn1 = _gostASN.gostASN1Instance;
var subtle = _gostSubtle.gostSubtleInstance;
var cert = _gostCert.gostCertInstance;
var cms = _gostCMS.gostCMSInstance;

// Expand javascript object
function expand() {
    var r = {};
    for (var i = 0, n = arguments.length; i < n; i++) {
        var item = arguments[i];
        if ((typeof item === "undefined" ? "undefined" : _typeof(item)) === 'object') for (var name in item) {
            if (item.hasOwnProperty(name)) r[name] = item[name];
        }
    }
    return r;
}

function defineProperty(object, name, descriptor, enumerable) {
    if ((typeof descriptor === "undefined" ? "undefined" : _typeof(descriptor)) !== 'object') descriptor = { value: descriptor };
    if (enumerable !== undefined) descriptor.enumerable = enumerable;
    Object.defineProperty(object, name, descriptor);
}

function defineProperties(object, properties, enumerable) {
    for (var name in properties) {
        defineProperty(object, name, properties[name], enumerable);
    }
}

// Extend javascript class
function extend(Super, Class, propertiesObject, propertiesClass) {
    // If constructor not defined
    if (typeof Class !== 'function') {
        propertiesClass = propertiesObject;
        propertiesObject = Class;
        Class = function Class() {
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
    if (propertiesObject) defineProperties(Class.prototype, propertiesObject, true);
    // Inherites super class properties
    if (Super !== Object) for (var name in Super) {
        Class[name] = Super[name];
    }Class.super = Super;
    if (propertiesClass) defineProperties(Class, propertiesClass, true);
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
    } catch (e) {}
}

// Get buffer
function buffer(d) {
    if (d instanceof CryptoOperationData) return d;else if (d && d.buffer && d.buffer instanceof CryptoOperationData) return d.byteOffset === 0 && d.byteLength === d.buffer.byteLength ? d.buffer : new Uint8Array(new Uint8Array(d, d.byteOffset, d.byteLength)).buffer;else throw new DataError('CryptoOperationData required');
}

// Today date + n days with time
function now(n) {
    var date = new Date();
    if (n) date.setDate(date.getDate() + n);
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
    if (s1.length !== s2.length) return false;
    for (var i = 0, n = s1.length; i < n; i++) {
        if (s1[i] !== s2[i]) return false;
    }return true;
}

// Generate new alias
function generateUUID() {
    var r = new Uint8Array(getSeed(16)),
        s = '';
    for (var i = 0; i < 16; i++) {
        s += ('00' + r[i].toString(16)).slice(-2);
    }return s.substr(0, 8) + '-' + s.substr(8, 4) + '-4' + s.substr(13, 3) + '-9' + s.substr(17, 3) + '-' + s.substr(20, 12);
}

// Return get32 from buffer
function get32(buffer, offset) {
    var r = new Uint8Array(buffer, offset, 4);
    return r[3] << 24 | r[2] << 16 | r[1] << 8 | r[0];
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
    if (!password) return new CryptoOperationData(0);
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
        return coding.Chars.decode(password + '\0', 'unicode');else
        // PKCS#5 password mode
        return coding.Chars.decode(password, 'utf8');
}

// </editor-fold>

/**
 * Key and Certificate Store methods
 *
 * @class GostKeys
 */
function GostKeys() {}

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
var options = { // <editor-fold defaultstate="collapsed">
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
    getPrivateKey: function getPrivateKey() // <editor-fold defaultstate="collapsed">
    {
        var keyUsages = this.privateKeyAlgorithm.id === 'rsaEncryption' ? ['sign'] : ['sign', 'deriveKey', 'deriveBits'];
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
    setPrivateKey: function setPrivateKey(privateKey) // <editor-fold defaultstate="collapsed">
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
    generate: function generate(req, keyAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            if (!(req instanceof cert.Request)) req = new cert.Request(req);
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
    getKey: function getKey(keyPassword) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            engine;
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
    getPrivateKey: function getPrivateKey(keyPassword) // <editor-fold defaultstate="collapsed">
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
    setKey: function setKey(keyInfo, keyPassword, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            engine;
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
    setPrivateKey: function setPrivateKey(privateKey, keyPassword, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
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
    generate: function generate(req, keyPassword, keyAlgorithm, encryptionAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            if (!(req instanceof cert.Request)) req = new cert.Request(req);
            // Generate request
            return req.generate(keyAlgorithm);
        }).then(function (key) {
            return self.setKey(key, keyPassword, encryptionAlgorithm);
        }).then(function () {
            return req;
        });
    } // </editor-fold>
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
    getEncryptionKey: function getEncryptionKey(keyPassword) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            wrapping = providers['SC-01'].wrapping,
            encryption = providers['SC-01'].encryption,
            derivation = providers['SC-01'].derivation,
            masks = self['masks.db3'],
            mk = self['mk.db3'],
            kek = self['kek.opq'];
        // Decrypt key
        return new Promise(call).then(function () {
            if (!masks || !mk || !kek) throw new Error('Not enougth key container files');
            // Check for encrypted key
            if (masks.byteLength > 32) {
                if (keyPassword) {
                    // Extract password based encryption mask
                    return subtle.importKey('raw', coding.Chars.decode(keyPassword, 'utf8'), derivation, false, ['deriveKey', 'deriveBits']).then(function (integrityKey) {
                        return subtle.deriveKey(expand(derivation, { salt: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]) }), integrityKey, encryption, false, ['decrypt']);
                    }).then(function (encryptionKey) {
                        var encrypted = new cms.EncryptedDataContentInfo(masks);
                        return encrypted.getEnclosed(encryptionKey);
                    }).then(function (digested) {
                        return digested.verify();
                    }).then(function (data) {
                        return data.content;
                    });
                } else throw new Error('Key password is required');
            } else if (keyPassword) throw new Error('Key password is not required');
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
            return subtle.unwrapKey('raw', kek, unwrappingKey, wrapping, encryption, false, ['wrapKey', 'unwrapKey']);
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
    generateContainer: function generateContainer(keyPassword) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            wrapping = providers['SC-01'].wrapping,
            encryption = providers['SC-01'].encryption,
            derivation = providers['SC-01'].derivation,
            digest = providers['SC-01'].digest,
            encryptionKey,
            wrappingKey;
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
                    digested = { // Double wrapping - SignalCom mistake
                        contentType: 'digestedData',
                        content: digested.encode()
                    };
                    return subtle.importKey('raw', coding.Chars.decode(keyPassword, 'utf8'), derivation, false, ['deriveKey', 'deriveBits']);
                }).then(function (integrityKey) {
                    return subtle.deriveKey(expand(derivation, { salt: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]) }), integrityKey, encryption, false, ['encrypt']);
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
    getKey: function getKey(keyPassword) // <editor-fold defaultstate="collapsed">
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
    getPrivateKey: function getPrivateKey(keyPassword) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            wrapping = providers['SC-01'].wrapping,
            publicKeyData;
        // Decrypt key
        return new Promise(call).then(function () {
            // Get password key
            return self.getEncryptionKey(keyPassword, true);
        }).then(function (encryptionKey) {
            // Unwrap private key
            return subtle.unwrapKey('raw', self.privateKeyWrapped, encryptionKey, wrapping, self.privateKeyAlgorithm, true, ['sign', 'deriveKey', 'deriveBits']);
        }).then(function (privateKey) {
            publicKeyData = self.attributes && self.attributes['id-sc-gostR3410-2001-publicKey'];
            // Generate key pair
            if (publicKeyData) return subtle.generateKey(expand(privateKey.algorithm, { ukm: privateKey.buffer }), privateKey.extractable, privateKey.usages);else return { privateKey: privateKey };
        }).then(function (keyPair) {
            // Compare public key
            if (publicKeyData && !equalBuffers(keyPair.publicKey.buffer, publicKeyData)) throw new Error('Check public key failed');
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
    setKey: function setKey(keyInfo, keyPassword) // <editor-fold defaultstate="collapsed">
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
    setPrivateKey: function setPrivateKey(privateKey, keyPassword) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            wrapping = providers['SC-01'].wrapping,
            wrappedData;
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
            return subtle.generateKey(expand(privateKey.algorithm, { ukm: privateKey.buffer }), true, ['sign', 'verify']);
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
    changePassword: function changePassword(oldKeyPassword, newKeyPassword) // <editor-fold defaultstate="collapsed">
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
    generate: function generate(req, keyPassword, keyAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            keyInfo;
        return new Promise(call).then(function () {
            if (!(req instanceof cert.Request)) req = new cert.Request(req);
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

extend(Object, CryptoProKeyContainer, function () {

    // <editor-fold defaultstate="collapsed">
    // True if 512 bit
    function isKeySize512(algorithm) {
        return algorithm.name.indexOf('-512') >= 0 || algorithm.length === 512;
    }

    // Test version 2012
    function isVersion2012(algorithm) {
        return !(algorithm.name.indexOf('-94') >= 0 || algorithm.name.indexOf('-2001') >= 0 || algorithm.version === 1994 || algorithm.version === 2001);
    }

    // Derive password key
    function derivePasswordKey(algorithm, password, salt) {
        var hash = isVersion2012(algorithm) ? 'GOST R 34.11-256' : 'GOST R 34.11-94/' + (algorithm.sBox || 'D-A'),
            derivation = { name: 'CPKDF', hash: hash, salt: salt, iterations: password ? 2000 : 2 };

        // Import password
        return subtle.importKey('raw', passwordData(derivation, password), derivation, false, ['deriveKey', 'deriveBits']).then(function (baseKey) {

            // Derive key
            return subtle.deriveKey(derivation, baseKey, 'GOST 28147', false, ['sign', 'verify', 'encrypt', 'decrypt']);
        });
    }

    // Compute password MAC
    function computePasswordMAC(algorithm, password, salt) {
        var mac = expand({ name: 'GOST 28147-MAC' }, algorithm.encParams);

        // Derive password
        return derivePasswordKey(algorithm, password, salt).then(function (macKey) {

            // Mac for 16 zero bytes
            return subtle.sign(mac, macKey, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
        });
    }

    //        var lastBuffer;
    // Compute container MAC
    function computeContainerMAC(algorithm, content) {
        var mac = expand({ name: 'GOST 28147-MAC' }, algorithm.encParams),
            keyData = new Uint8Array([// 32 zero bytes
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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
            keyData = mask.byteLength === 64 ? new Uint8Array(new Uint8Array(mask, 32, 32)).buffer : mask;
        return subtle.importKey('raw', keyData, mac, false, ['sign']).then(function (macKey) {

            // Verify MAC for maskStatus
            return subtle.sign(mac, macKey, status);
        });
    }

    // Generate mask
    function generateMasks(algorithm) {
        var wrapAlgorithm = expand(algorithm, { mode: 'MASK' }),
            mask,
            status = getSeed(12);
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
            unwrapAlgorithm = expand(algorithm, { mode: 'MASK' }),
            privateKey;
        unwrapAlgorithm.name = unwrapAlgorithm.name.replace('-DH', '');
        var wrappedKey;

        // Encrypt ukm data for private key
        return subtle.decrypt(encryption, encryptionKey, key).then(function (data) {
            wrappedKey = data;
            // Import mask key
            return subtle.importKey('raw', mask, unwrapAlgorithm, 'false', ['sign', 'unwrapKey']);
        }).then(function (unwrappingKey) {

            // Unwrap private key
            return subtle.unwrapKey('raw', wrappedKey, unwrappingKey, unwrapAlgorithm, algorithm, 'true', ['sign']);
        }).then(function (key) {
            privateKey = key;
            return computeFP(privateKey);
        }).then(function (computedFP) {
            // Check public key buffer
            if (!equalBuffers(computedFP, fp)) throw new Error('Incorrect fp');

            return privateKey;
        });
    }

    // Wrap private key
    function wrapKey(algorithm, encryptionKey, privateKey, mask) {
        var encryption = { name: 'GOST 28147-ECB', sBox: algorithm.encParams && algorithm.encParams.sBox },
            wrapAlgorithm = expand(algorithm, { mode: 'MASK' });
        wrapAlgorithm.name = wrapAlgorithm.name.replace('-DH', '');

        // Import mask key
        return subtle.importKey('raw', mask, wrapAlgorithm, false, ['sign', 'wrapKey']).then(function (wrappingKey) {
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
            if (primary.hmacKey) throw new Error('Old key format');

            if (masks.randomStatus.byteLength < 12) throw new Error("Invalid random status length");

            // Import mask as key for MAC
            return computeMaskMAC(algorithm, masks.mask, masks.randomStatus);
        }).then(function (hmac) {
            if (!equalBuffers(hmac, masks.hmacRandom)) throw new Error("Imita for mask is invalid");

            // Derive key
            return derivePasswordKey(algorithm, keyPassword, new Uint8Array(masks.randomStatus, 0, 12));
        }).then(function (encryptionKey) {
            // Unwrap keys
            return secondary && primary.secondaryKey ? unwrapKey(content.secondaryPrivateKeyParameters.privateKeyAlgorithm, encryptionKey, primary.secondaryKey, masks.mask, content.secondaryFP) : unwrapKey(algorithm, encryptionKey, primary.primaryKey, masks.mask, content.primaryFP);
        });
    }

    // Encrypt private key
    function encryptKey(algorithm, primary, masks, keyPassword, secondary, privateKey) {
        // Derive key
        return derivePasswordKey(algorithm, keyPassword, new Uint8Array(masks.randomStatus, 0, 12)).then(function (encryptionKey) {
            // Wrap keys
            return wrapKey(algorithm, encryptionKey, privateKey, masks.mask);
        }).then(function (encryptedKey) {
            if (!primary) primary = new asn1.GostPrivateKeys();
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
        getKey: function getKey(keyPassword, secondary) // <editor-fold defaultstate="collapsed">
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
        getPrivateKey: function getPrivateKey(keyPassword, secondary) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                content = self.header.keyContainerContent;
            // Decrypt key
            return decryptKey(content, self.primary, self.masks, keyPassword, secondary)['catch'](function (e) {
                if (self.primary2 && self.masks2) return decryptKey(content, self.primary2, self.masks2, keyPassword, secondary);else throw e;
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
        getCertificate: function getCertificate(secondary) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                content = self.header.keyContainerContent;
            return new Promise(call).then(function () {
                if (secondary) return new cert.X509(content.secondaryCertificate);else return new cert.X509(content.primaryCertificate);
            });
        }, // </editor-fold>
        /**
         * Get the container name
         *
         * @memberOf GostKeys.CryptoProKeyContainer
         * @instance
         * @returns {string} Container name
         */
        getContainerName: function getContainerName() // <editor-fold defaultstate="collapsed">
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
        setKey: function setKey(keyInfo, keyPassword, secondary, days) // <editor-fold defaultstate="collapsed">
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
        setPrivateKey: function setPrivateKey(privateKey, keyPassword, secondary, days) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                content,
                algorithm;
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
                var keyParameters = secondary ? content.secondaryPrivateKeyParameters : content.primaryPrivateKeyParameters;
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
                        if (!content.primaryPrivateKeyParameters) throw new Error('Primary key must be defined first');
                        content.secondaryPrivateKeyParameters = keyParameters;
                    } else {
                        content.primaryPrivateKeyParameters = keyParameters;
                        var absent = content.attributes.indexOf('kccaPrimaryKeyAbsent');
                        if (absent >= 0) content.attributes.splice(absent, 1);
                    }
                } else algorithm = keyParameters.privateKeyAlgorithm;
                // Generate masks
                var promises = [];
                [0, 1].forEach(function (i) {
                    var name = 'masks' + (i > 0 ? '2' : '');
                    if (!self[name]) promises.push(generateMasks(algorithm).then(function (masks) {
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
                    if (secondary) content.secondaryFP = FP;else content.primaryFP = FP;
                });
            }).then(function () {
                // Compute password MAC
                var softPassword = content.attributes.indexOf('kccaSoftPassword');
                if (keyPassword) {
                    if (softPassword < 0) content.attributes.push('kccaSoftPassword');
                    return computePasswordMAC(algorithm, keyPassword, content.primaryFP);
                } else {
                    if (softPassword >= 0) content.attributes.splice(softPassword, 1);
                }
            }).then(function (hmac) {
                if (hmac) content.hmacPassword = hmac;
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
        setCertificate: function setCertificate(certificate, secondary, days) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                content,
                algorithm;
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
                algorithm = content.primaryPrivateKeyParameters && content.primaryPrivateKeyParameters.privateKeyAlgorithm || expand(certificate.subjectPublicKeyInfo.algorithm, {
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
                    if (content.secondaryFP && !equalBuffers(content.secondaryFP, new Uint8Array(publicKey.buffer, 0, content.secondaryFP.byteLength))) throw new Error('The public key of the certificate does not match the private key');
                    content.secondaryCertificate = certificate;
                } else {
                    if (content.primaryFP && !equalBuffers(content.primaryFP, new Uint8Array(publicKey.buffer, 0, content.primaryFP.byteLength))) throw new Error('The public key of the certificate does not match the private key');
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
        setContainerName: function setContainerName(name) // <editor-fold defaultstate="collapsed">
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
        verify: function verify(keyPassword) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                content,
                algorithm;
            return new Promise(call).then(function () {
                content = self.header.keyContainerContent;
                algorithm = content.primaryPrivateKeyParameters.privateKeyAlgorithm;
                // Verify container MAC
                return computeContainerMAC(algorithm, content);
            }).then(function (hmac) {
                if (!equalBuffers(hmac, self.header.hmacKeyContainerContent)) throw new Error("Container is not valid.");
                // Verify key password MAC
                var needPassword = content.attributes.indexOf('kccaSoftPassword') >= 0;
                if (!keyPassword && needPassword) throw new Error("Password is required");
                if (keyPassword && !needPassword) throw new Error("Password is not reqiured.");
                if (keyPassword)
                    // Derive password
                    return computePasswordMAC(algorithm, keyPassword, content.primaryFP).then(function (hmac) {
                        if (!equalBuffers(hmac, content.hmacPassword)) throw new Error("Password is not valid.");
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
        changePassword: function changePassword(oldKeyPassword, newKeyPassword) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                content;
            return new Promise(call).then(function () {
                content = self.header.keyContainerContent;
                if (!content.primaryPrivateKeyParameters) throw new Error('Private key not yet defined');
                return self.getPrivateKey(oldKeyPassword).then(function (privateKey) {
                    return self.setPrivateKey(privateKey, newKeyPassword);
                });
            }).then(function () {
                if (content.secondaryPrivateKeyParameters) return self.getPrivateKey(oldKeyPassword, true).then(function (privateKey) {
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
        generate: function generate(req, keyPassword, keyAlgorithm) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                certificate,
                keyInfo;
            return new Promise(call).then(function () {
                if (!(req instanceof cert.Request)) req = new cert.Request(req);
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
        encode: function encode(format) // <editor-fold defaultstate="collapsed">
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
}());

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

extend(asn1.ViPNetInfo, ViPNetContainerEntry, function () {

    function getKeyPassword(keyPassword) // <editor-fold defaultstate="collapsed">
    {
        if (keyPassword === undefined) keyPassword = '';
        // Generate key data
        var passwordData = coding.Chars.decode(keyPassword, 'win1251'),
            keyData;
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
            return subtle.unwrapKey('raw', keyData, unwrappingKey, 'GOST 28147-MASK/VN', 'GOST 28147-89', 'false', ['encrypt', 'decrypt', 'sign', 'verify']);
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
        getPrivateKey: function getPrivateKey(keyPassword) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                keyPart,
                encryptedKey;
            // Decrypt key
            return new Promise(call).then(function () {
                return !keyPassword || typeof keyPassword === 'string' ? getKeyPassword(keyPassword) : keyPassword;
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
                if (!result) throw new Error('Invalid key password');
                var iv = new Uint8Array(keyPart, keyPart.byteLength - 8, 8);
                // Decrypt key data
                return subtle.decrypt({ name: 'GOST 28147-89-CFB', iv: iv }, keyPassword, encryptedKey);
            }).then(function (keyData) {
                var l2 = keyData.byteLength / 2;
                if (self.keyInfo.keyClass & 0x3 === 0) {
                    // Secret key. Remove mask and import
                    return subtle.importKey('raw', new Int32Array(keyData, l2, l2), 'GOST 28147', false, ['unwrapKey']).then(function (unwrappingKey) {
                        // Unwrap secret key
                        return subtle.unwrapKey('raw', new Int32Array(keyData, 0, l2), unwrappingKey, 'GOST 28147-MASK/VN', 'GOST 28147-89', 'false', ['encrypt', 'decrypt', 'sign', 'verify']);
                    });
                } else {
                    // Private key
                    var algorithm = self.keyInfo.algorithm || self.certificate && self.certificate.subjectPublicKeyInfo.algorithm;
                    if (!algorithm) throw new Error('Algorithm is not specified');
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
                        if (self.publicKey) return subtle.generateKey(expand(privateKey.algorithm, { ukm: privateKey.buffer }), privateKey.extractable, privateKey.usages);else return { privateKey: privateKey };
                    }).then(function (keyPair) {
                        // Compare public key
                        if (self.publicKey && !equalBuffers(keyPair.publicKey.buffer, self.publicKey)) throw new Error('Check public key failed');
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
        setPrivateKey: function setPrivateKey(privateKey, keyPassword, days) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                wrapAlgorithm,
                wrappingKey,
                keyData,
                keyPart;
            // Decrypt key
            return new Promise(call).then(function () {
                return !keyPassword || typeof keyPassword === 'string' ? getKeyPassword(keyPassword) : keyPassword;
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
                    return subtle.generateKey(expand(algorithm, { ukm: privateKey.buffer }), true, ['sign', 'verify']).then(function (keyPair) {
                        self.publicKey = keyPair.publicKey.buffer;
                        // Check certificate
                        if (self.certificate) {
                            var spki = self.certificate.subjectPublicKeyInfo;
                            return subtle.importKey('spki', spki.encode(), spki.algorithm, true, ['verify']);
                        }
                    }).then(function (publicKey) {
                        if (publicKey && !equalBuffers(publicKey.buffer, self.publicKey)) delete self.certificate; // Remove not valid certificate
                    });
                } else if (privateKey.type === 'secret') {
                    wrapAlgorithm = 'GOST 28147/MASK/VN';
                    delete self.certificate;
                    delete self.publicKey;
                    self.keyInfo.keyClass = 64;
                    self.keyInfo.keyType = 24622;
                } else throw new Error('Invalid key type');
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
        encode: function encode(format) // <editor-fold defaultstate="collapsed">
        {
            var header = asn1.ViPNetInfo.method('encode').call(this),
                result = new Uint8Array(8 + header.byteLength + this.keyPart.byteLength);
            set32(result.buffer, 0, 4 + header.byteLength + this.keyPart.byteLength);
            result.set(new Uint8Array(header), 4);
            set32(result.buffer, 4 + header.byteLength, this.keyPart.byteLength);
            result.set(new Uint8Array(this.keyPart), 8 + header.byteLength);
            if (format === 'PEM') return coding.Base64.encode(result.buffer);
            return result.buffer;
        } // </editor-fold>
    };
}(), {
    /**
     * Decode container entry
     *
     * @memberOf GostKeys.ViPNetContainerEntry
     * @param {FormatedData} entry
     * @returns {GostKeys.ViPNetContainer}
     */
    decode: function decode(entry) // <editor-fold defaultstate="collapsed">
    {
        if (typeof entry === 'string') entry = coding.Base64.decode(entry);
        entry = buffer(entry);
        // Entry size
        var entrySize = get32(entry, 0);
        if (entry.byteLength !== entrySize + 4) throw new Error('Invalid container entry size');
        // Decode header info
        var source = coding.BER.decode(new Uint8Array(entry, 4, entrySize));
        var result = asn1.ViPNetInfo.decode.call(this, source);
        // Decode key info
        var headerSize = source.header.byteLength + source.content.byteLength,
            keyPartSize = get32(entry, 4 + headerSize);
        if (entry.byteLength !== headerSize + keyPartSize + 8) throw new Error('Invalid container key part size');
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
    if (container && (container instanceof CryptoOperationData || container.buffer instanceof CryptoOperationData || typeof container === 'string')) this.decode(container);else {
        container = container || {};
        this.fileType = container.fileType || 'ITCS';
        this.fileVersion = container.fileVersion || 0x10;
        if (container.applicationHeader) this.applicationHeader = container.applicationHeader;
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
    getCertificate: function getCertificate(index) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            var entry = self.entries[index || 0];
            if (!entry) throw new Error('Entry not defined');
            if (entry.certificate) return new cert.X509(entry.certificate);
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
    getKey: function getKey(keyPassword, index) // <editor-fold defaultstate="collapsed">
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
    getPrivateKey: function getPrivateKey(keyPassword, index) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            var entry = self.entries[index || 0];
            if (!entry) throw new Error('Entry not defined');
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
    setCertificate: function setCertificate(certificate, index) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            entry,
            certificate;
        return new Promise(call).then(function () {
            entry = self.entries[index || 0] || (self.entries[index || 0] = new ViPNetContainerEntry());
            certificate = new cert.X509(certificate);
            if (entry.publicKey) return certificate.getPublicKey();
        }).then(function (publicKey) {
            if (publicKey && !equalBuffers(entry.publicKey, publicKey.buffer)) throw new Error('Invalid certificate for private key');
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
    setKey: function setKey(keyInfo, keyPassword, index, days) // <editor-fold defaultstate="collapsed">
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
    setPrivateKey: function setPrivateKey(privateKey, keyPassword, index, days) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            var entry = self.entries[index || 0] || (self.entries[index || 0] = new ViPNetContainerEntry());
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
    changePassword: function changePassword(oldKeyPassword, newKeyPassword) // <editor-fold defaultstate="collapsed">
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
    generate: function generate(req, keyPassword, keyAlgorithm) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            certificate,
            keyInfo;
        return new Promise(call).then(function () {
            if (!(req instanceof cert.Request)) req = new cert.Request(req);
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
    encode: function encode(format) // <editor-fold defaultstate="collapsed">
    {
        // Encode entries
        var entries = [],
            entriesSize = 0;
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
        if (headerSize > 0) result.set(new Uint8Array(this.applicationHeader), 12);
        var offset = 12 + headerSize;
        entries.forEach(function (entry) {
            result.set(new Uint8Array(entry), offset);
            offset += entry.byteLength;
        });
        if (format === 'PEM') return coding.Base64.encode(result.buffer);
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
    decode: function decode(container) // <editor-fold defaultstate="collapsed">
    {
        container = this.constructor.decode(container);
        this.fileType = container.fileType;
        this.fileVersion = container.fileVersion;
        if (container.applicationHeader) this.applicationHeader = container.applicationHeader;
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
    encode: function encode(object, format) // <editor-fold defaultstate="collapsed">
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
    decode: function decode(container) // <editor-fold defaultstate="collapsed">
    {
        if (typeof container === 'string') container = coding.Base64.decode(container);
        container = buffer(container);
        // File type
        var fileType = coding.Chars.encode(new Uint8Array(container, 0, 4), 'ascii');
        if (fileType !== 'ITCS' && fileType !== 'PKEY' && fileType !== '_CCK' && fileType !== '_LCK') throw new Error('Unsupported ViPNet container type');
        // File version
        var fileVersion = get32(container, 4),
            i = fileVersion >>> 16,
            j = fileVersion & 0xffff;
        if (i !== 0 && i !== 1 || j > 0xff) throw new Error('Unsupported ViPNet container version');
        // File header
        var headerSize = get32(container, 8),
            applicationHeader;
        if (headerSize > 0) applicationHeader = buffer(new Uint8Array(container, 12, headerSize));
        // Read entries
        var offset = 12 + headerSize,
            entries = [];
        while (offset < container.byteLength) {
            // Entry size
            var entrySize = get32(container, offset);
            // Decode entry
            entries.push(ViPNetContainerEntry.decode(new Uint8Array(container, offset, entrySize + 4)));
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

extend(asn1.PFX, PKCS12, function () {

    // <editor-fold defaultstate="collapsed">
    function calcHMAC(derivation, password, content) {
        var hmac = { name: 'HMAC', hash: derivation.hash };
        // Import password for key generation
        return subtle.importKey('raw', passwordData(derivation, password), derivation, false, ['deriveKey']).then(function (passwordKey) {
            // Generate key from password.
            return subtle.deriveKey(derivation, passwordKey, hmac, false, ['sign']);
        }).then(function (integrityKey) {
            // Sign MAC
            return subtle.sign(hmac, integrityKey, content);
        });
    }

    function verifyHMAC(derivation, password, digest, content) {
        return calcHMAC(derivation, password, content).then(function (test) {
            if (!equalBuffers(digest, test)) throw new Error('Invalid password, MAC is not verified');
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
        sign: function sign(password, digestAlgorithm) // <editor-fold defaultstate="collapsed">
        {
            var self = this;
            return new Promise(call).then(function () {
                // Calculate mac for password integrity
                if (password) {
                    // Define digeset algorithm
                    var hash, derivation, digestProvider;
                    if (digestAlgorithm) digestProvider = providers[digestAlgorithm];else digestAlgorithm = providers[options.providerName].digest;
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
                } else return self;
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
        verify: function verify(password) // <editor-fold defaultstate="collapsed">
        {
            var self = this,
                authSafe = self.authSafe,
                derivation;
            return new Promise(call).then(function () {
                // Indirectly verification
                if (authSafe.contentType === 'data') {
                    // Check MAC
                    if (self.macData) {
                        if (!password) throw new Error('Password must be defined for the MAC verification');
                        derivation = {
                            name: 'PFXKDF',
                            hash: self.macData.mac.digestAlgorithm,
                            salt: self.macData.macSalt,
                            iterations: self.macData.iterations,
                            diversifier: 3
                        };
                        var content = self.authSafe.content,
                            digest = self.macData.mac.digest;
                        // Verify HMAC with PFXKDF (PKCS#12)
                        return verifyHMAC(derivation, password, digest, content)['catch'](function () {
                            // Verify HMAC with PBKDF2 (TC 26, PKCS#5)
                            derivation.name = 'PBKDF2';
                            return verifyHMAC(derivation, password, digest, content);
                        });
                    } // No check with MAC
                } else throw new Error('Unsupported format');
            }).then(function () {
                return self;
            });
        } // </editor-fold>
    };
}());

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
    if (entries) for (var name in entries) {
        this.setEntry(name, entries[name]);
    }
} // </editor-fold>

extend(Object, KeyStore, {
    /**
     * Lists all the alias names of this keystore.
     *
     * @memberOf GostKeys.KeyStore
     * @instance
     * @returns {string[]}
     */
    aliases: function aliases() // <editor-fold defaultstate="collapsed">
    {
        var result = [];
        for (var name in this.entries) {
            result.push(name);
        }return result;
    }, // </editor-fold>
    /**
     * Checks if the given alias exists in this keystore.
     *
     * @memberOf GostKeys.KeyStore
     * @instance
     * @param {string} alias The alias name
     * @returns {boolean} True if the alias exists, false otherwise
     */
    containsAlias: function containsAlias(alias) // <editor-fold defaultstate="collapsed">
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
    deleteEntry: function deleteEntry(alias) // <editor-fold defaultstate="collapsed">
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
    setEntry: function setEntry(alias, entry) // <editor-fold defaultstate="collapsed">
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
                    if (entry.key instanceof CryptoOperationData) r.key = entry.key; // Secret key
                    else throw new Error('Unknown Key format');
                }
            }
        }
        // Certs
        if (entry.certs) {
            var certs = entry.certs instanceof Array ? entry.certs : [entry.certs];
            for (var i = 0; i < certs.length; i++) {
                try {
                    certs[i] = new cert.X509(certs[i]);
                } catch (e) {}
            }
            r.certs = certs;
        }
        // CRLs
        if (entry.crls) {
            var crls = entry.crls instanceof Array ? entry.crls : [entry.crls];
            for (var i = 0; i < crls.length; i++) {
                try {
                    crls[i] = new cert.CRL(crls[i]);
                } catch (e) {}
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
    getEntry: function getEntry(alias) // <editor-fold defaultstate="collapsed">
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
    load: function load(store, password) // <editor-fold defaultstate="collapsed">
    {
        var self = this;
        return new Promise(call).then(function () {
            // Verify store file
            store = new PKCS12(store);
            return store.verify(password);
        }).then(function () {
            if (store.authSafe.contentType !== 'data') throw new Error('Unsupported PFX format');
            var authSafe = asn1.AuthenticatedSafe.decode(store.authSafe.content).object,
                promises = [];
            // Decrypt encrypted content
            authSafe.forEach(function (info) {
                if (info.contentType === 'data') promises.push(new cms.DataContentInfo(info));else if (info.contentType === 'encryptedData') promises.push(new cms.EncryptedDataContentInfo(info).getEnclosed(password));else throw new Error('Unsupported PFX format');
            });
            return Promise.all(promises);
        }).then(function (contents) {
            // Read bags
            var entries = {};
            contents.forEach(function (info) {
                var bags = asn1.SafeContents.decode(info.content).object;
                bags.forEach(function (bag) {
                    var keyId = coding.Hex.encode(bag.bagAttributes && bag.bagAttributes.localKeyId || getSeed(4), true),
                        entry = entries[keyId] || (entries[keyId] = {});
                    switch (bag.bagId) {
                        case 'keyBag':
                            entry.key = new PKCS8(bag.bagValue);
                            break;
                        case 'pkcs8ShroudedKeyBag':
                            entry.key = new PKCS8Encrypted(bag.bagValue);
                            break;
                        case 'secretBag':
                            if (bag.bagValue.secretTypeId === 'secret') entry.key = bag.bagValue.secretValue;
                            break;
                        case 'certBag':
                            var certs = entry.certs || (entry.certs = []);
                            if (bag.bagValue.certId === 'x509Certificate') certs.push(new cert.X509(bag.bagValue.certValue));
                            break;
                        case 'crlBag':
                            var crls = entry.crls || (entry.crls = []);
                            if (bag.bagValue.crlId === 'x509CRL') crls.push(new cert.CRL(bag.bagValue.crlValue));
                            break;
                    }
                    if (bag.bagAttributes && bag.bagAttributes.friendlyName) entry.friendlyName = bag.bagAttributes.friendlyName;
                });
            });
            // Decrypt keys
            var promises = [];
            for (var name in entries) {
                promises.push(function (entry) {
                    // Try to decrypt private key
                    if (entry.key instanceof PKCS8Encrypted) return entry.key.getKey(password).then(function (key) {
                        // Return entry with decrypted key
                        entry.key = key;
                        return entry;
                    })['catch'](function () {
                        // Return entry with encrypted key
                        return entry;
                    });else return entry;
                }(entries[name]));
            }return Promise.all(promises);
        }).then(function (entries) {
            // Set alias names
            entries.forEach(function (entry) {
                var friendlyName = entry.friendlyName;
                if (friendlyName) {
                    delete entry.friendlyName;
                    self.entries[friendlyName] = entry;
                } else self.entries[generateUUID()] = entry;
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
    store: function store(password, digestAlgortihm, encryptionAlgortihm) // <editor-fold defaultstate="collapsed">
    {
        var self = this,
            keys = [],
            contents = [],
            authSafe = [];
        return new Promise(call).then(function () {
            // Define encryption algorithm
            if (encryptionAlgortihm) encryptionAlgortihm = providers[encryptionAlgortihm] ? providers[encryptionAlgortihm].pbes : encryptionAlgortihm;else if (digestAlgortihm) encryptionAlgortihm = providers[digestAlgortihm] ? providers[digestAlgortihm].pbes : providers[options.providerName].pbes;else encryptionAlgortihm = providers[options.providerName].pbes;
            // Prepare keys and certs
            var index = 1;
            for (var name in self.entries) {
                var keyId = new Uint32Array([index]),
                    entry = self.entries[name];
                if (entry.key) {
                    (function (key, attributes) {
                        if (key instanceof CryptoOperationData) contents.push({
                            bagId: 'secretBag',
                            bagValue: {
                                secretTypeId: 'secret',
                                secretValue: key,
                                bagAttributes: attributes
                            }
                        });else if (key instanceof PKCS8) {
                            if (encryptionAlgortihm && password) keys.push(new PKCS8Encrypted().setKey(key, password, encryptionAlgortihm).then(function (encryptedKey) {
                                return {
                                    bagId: 'pkcs8ShroudedKeyBag',
                                    bagValue: encryptedKey,
                                    bagAttributes: attributes
                                };
                            }));else keys.push({
                                bagId: 'keyBag',
                                bagValue: key,
                                bagAttributes: attributes
                            });
                        } else if (key instanceof PKCS8Encrypted) keys.push({
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
                        if (certificate instanceof cert.X509) contents.push({
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
                        if (crl instanceof cert.CRL) contents.push({
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
            if (keys.length > 0) return Promise.all(keys);
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
                if (encryptionAlgortihm && password) return new cms.EncryptedDataContentInfo().encloseContent(contents, password, encryptionAlgortihm);else return new cms.DataContentInfo().encloseContent(contents);
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

var gostKeysInstance = exports.gostKeysInstance = new GostKeys();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.expand = expand;
// Expand javascript object
function expand() {
    var r = {};
    for (var i = 0, n = arguments.length; i < n; i++) {
        var item = arguments[i];
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') for (var name in item) {
            r[name] = item[name];
        }
    }
    return r;
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GostEngine = exports.CryptoGost = undefined;

var _gostCrypto = __webpack_require__(15);

var _gostEngineSync = __webpack_require__(10);

exports.CryptoGost = _gostCrypto.gostCrypto;
exports.GostEngine = _gostEngineSync.gostEngine;

/***/ })
/******/ ]);
});
//# sourceMappingURL=CryptoGost.js.map