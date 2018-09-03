#!/usr/bin/env node

const cli = require('cli')
  .enable('version')
  .setApp(__dirname + '/../package.json')
  .setUsage([
    'gost-export-cryptopro-key [OPTIONS]',
  ].join('\n'));

cli.parse({
  keys: ['keys', 'Path to directory with *.key files: header.key  masks2.key  masks.key  name.key  primary2.key  primary.key', 'directory', '.'],
  password: ['password', 'Private key`s password in case if encypted', 'string'],
  secondary: ['secondary', 'Extract from secondary keys', 'boolean', false]
});

if (null == cli.options.keys) {
  cli.getUsage();
  cli.exit(2);
}

const fs = require('fs'),
      path = require('path'),
      root = path.normalize(cli.options.keys);

function readCryptoOperationData(relativePath) {
  var resultPath = path.join(root, relativePath);
  return new Uint8Array(fs.readFileSync(resultPath)).buffer;
}

require('../lib/gostKeys');
var gostCrypto = require('../lib/gostCrypto');

var keyContainer = new gostCrypto.keys.CryptoProKeyContainer({
    header: readCryptoOperationData('header.key'),
    name: readCryptoOperationData('name.key'),
    primary: readCryptoOperationData('primary.key'),
    masks: readCryptoOperationData('masks.key'),
    primary2: readCryptoOperationData('primary2.key'),
    masks2: readCryptoOperationData('masks2.key')
});

// Verify key container and password
keyContainer.getKey(cli.options.password, cli.options.secondary).then(function (key) {
    process.stdout.write(key.encode('PEM') + '\n');

    cli.ok('Success: The private key has been exported.');
}).catch(function (e) {
    console.error(e.message);
    console.error(e.trace);
});
