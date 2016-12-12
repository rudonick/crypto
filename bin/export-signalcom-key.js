#!/usr/bin/env node

const cli = require('cli')
  .enable('version')
  .setApp(__dirname + '/../package.json')
  .setUsage([
    'gost-export-signalcom-key [OPTIONS]',
  ].join('\n'));

cli.parse({
  pse: ['pse', 'Path to PSE directory, which contains all container files "mk.db3", "masks.db3", "kek.opq", "rand.opq"', 'directory'],
  key: ['key', 'Relative to PSE path of private key file like "keys/00000001.key"', 'path', 'keys/00000001.key'],
  password: ['password', 'Private key`s password in case if encypted', 'string']
});

if (null == cli.options.pse) {
  cli.getUsage();
  cli.exit(2);
}

const fs = require('fs'),
      path = require('path'),
      root = path.normalize(cli.options.pse);

function readCryptoOperationData(relativePath) {
  var resultPath = path.join(root, relativePath);
  return new Uint8Array(fs.readFileSync(resultPath)).buffer;
}

require('../lib/gostKeys');
var gostCrypto = require('../lib/gostCrypto');

var keyContainer = new gostCrypto.keys.SignalComPrivateKeyInfo(
  readCryptoOperationData(cli.options.key),
  {
    'mk.db3': readCryptoOperationData('mk.db3'),
    'masks.db3': readCryptoOperationData('masks.db3'),
    'kek.opq': readCryptoOperationData('kek.opq'),
    'rand.opq': readCryptoOperationData('rand.opq')
  }
);

keyContainer.getKey(cli.options.password).then(function (key) {
  encodedKey = key.encode('PEM');
  process.stdout.write(encodedKey + '\n');
  cli.ok('Private SignalCom key successfully exported in STDOUT in "PEM" format.');
}).catch(function (e) {
  console.error(e.message);
  console.error(e.trace);
});
