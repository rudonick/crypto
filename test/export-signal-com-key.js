#!/usr/bin/env node

const fs = require('fs');

var expectedPrivateKeyInPem = [
	'-----BEGIN PRIVATE KEY-----',
	'MEYCAQAwHQYGKoUDAgITMBMGByqFAwICIwEGCCqFAwcBAQICBCIEIG0GEmE3dhrH',
	'zm1KfFDpKBWEmMydwcmP0hNKvXXbEbLO',
	'-----END PRIVATE KEY-----',
].join('\r\n'),
	actualPrivateKeyInPem = null;

require('../lib/gostKeys');
var gostCrypto = require('../lib/gostCrypto');

var keysPrefix = __dirname + '/fixtures/signal-com-keys/';
function readCryptoOperationData(path) {
	return new Uint8Array(fs.readFileSync(path)).buffer;
}

var keyContainer = new gostCrypto.keys.SignalComPrivateKeyInfo(
	readCryptoOperationData(keysPrefix + '00000001.key'),
	{
	    'mk.db3'	: readCryptoOperationData(keysPrefix + 'mk.db3'),
	    'masks.db3'	: readCryptoOperationData(keysPrefix + 'masks.db3'),
	    'kek.opq'	: readCryptoOperationData(keysPrefix + 'kek.opq'),
	    'rand.opq'	: readCryptoOperationData(keysPrefix + 'rand.opq')
	}
);

keyContainer.getKey().then(function (key) {
	actualPrivateKeyInPem = key.encode('PEM');
}).catch(function (e) {
    console.error(e.message);
    console.error(e.trace);
});

if (expectedPrivateKeyInPem == actualPrivateKeyInPem) {
	console.log('Success');
} else {
	console.error('Actual private key is not equals to expected:');
	console.error('expectedPrivateKeyInPem: ' + expectedPrivateKeyInPem);
	console.error('actualPrivateKeyInPem: ' + actualPrivateKeyInPem);
}