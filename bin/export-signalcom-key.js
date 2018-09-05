#!/usr/bin/env node

const ExportKey = require('./export-key');

function ExportSignalComKey() {
    ExportKey.call(this);

    this.toolName = 'gost-export-signalcom-key';
    this.containerKeysFiles = {
        'mk.db3': 'mk.db3',
        'masks.db3': 'masks.db3',
        'kek.opq': 'kek.opq'
    };
    this.definedOptions.key = ['k', 'Path to private key (relative to container)', 'path', 'keys/00000001.key'];
}
require('util').inherits(ExportSignalComKey, ExportKey);

ExportSignalComKey.prototype.keyPromise = function keyPromise() {
    return new this.gostCrypto.keys.SignalComPrivateKeyInfo(
      this.readKey(this.parsedOptions.key),
      this.containerKeys()
    ).getKey(this.parsedOptions.password);
}

new ExportSignalComKey().run();
