#!/usr/bin/env node

const fs = require('fs');

require('../lib/gostKeys');
var gostCrypto = require('../lib/gostCrypto');

function readCryptoOperationData(path) {
	return new Uint8Array(fs.readFileSync(path)).buffer;
}

[
	__dirname + '/fixtures/signal-com-keys/2001/',
	__dirname + '/fixtures/signal-com-keys/2012/',
].forEach(function (keysPrefix) {
	var keyContainer = new gostCrypto.keys.SignalComPrivateKeyInfo(
		readCryptoOperationData(keysPrefix + 'keys/00000001.key'),
		{
			'mk.db3'    : readCryptoOperationData(keysPrefix + 'mk.db3'),
			'masks.db3' : readCryptoOperationData(keysPrefix + 'masks.db3'),
			'kek.opq'    : readCryptoOperationData(keysPrefix + 'kek.opq')
		}
	);

	keyContainer.getKey().then(function (key) {
		var expectedPrivateKeyInPem = fs.readFileSync(keysPrefix + 'keys/00000001.key.pem');
		var actualPrivateKeyInPem = key.encode('PEM').replace(/\r/g, '');

		console.log('Keys prefix is', keysPrefix);
		if (expectedPrivateKeyInPem == actualPrivateKeyInPem) {
			console.log('Success');
		} else {
			console.error('Actual private key is not equals to expected:');
			console.error('expectedPrivateKeyInPem: ' + expectedPrivateKeyInPem);
			console.error('actualPrivateKeyInPem: ' + actualPrivateKeyInPem);
		}
		console.log();
	}).catch(function (e) {
		console.error(e.message);
		console.error(e.trace);
	});
});
