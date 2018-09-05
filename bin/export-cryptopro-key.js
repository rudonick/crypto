#!/usr/bin/env node

const ExportKey = require('./export-key');

function ExportCryptoProKey() {
    ExportKey.call(this);

    this.toolName = 'gost-export-cryptopro-key';
    this.containerKeysFiles = {
        'header': 'header.key',
        'name': 'name.key',
        'primary': 'primary.key',
        'masks': 'masks.key',
        'primary2': 'primary2.key',
        'masks2': 'masks2.key'
    };
    this.definedOptions.secondary = ['s', 'Extract from secondary keys', 'boolean', false];
}
require('util').inherits(ExportCryptoProKey, ExportKey);

ExportCryptoProKey.prototype.keyPromise = function keyPromise() {
    return new this.gostCrypto.keys.CryptoProKeyContainer(
        this.containerKeys()
    ).getKey(this.parsedOptions.password, this.parsedOptions.secondary);
}

new ExportCryptoProKey().run();
