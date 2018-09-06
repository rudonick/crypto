module.exports = ExportKey

require('../lib/gostKeys');
const gostCrypto = require('../lib/gostCrypto');

function ExportKey() {
    this.toolName = undefined;
    this.containerKeysFiles = undefined;
    this.definedOptions = {
        container: ['c', 'Path to directory with container files', 'directory', '.'],
        password: ['p', 'Private key`s password in case if encypted', 'string'],
        format: ['f', 'Export format', ['PEM', 'DER'], 'PEM']
    };
    this.gostCrypto = gostCrypto;
    this.parsedOptions = {};
}

ExportKey.prototype.run = function run() {
    const cli = this.createCli();

    this.parsedOptions = cli.options;
    
    const format = this.parsedOptions.format;
    this.keyPromise().then(function (key) {
        var encodedKey = key.encode(format);
        if ('PEM' == format) {
            encodedKey += '\n';
        } else if ('DER' == format) {
            encodedKey = new Buffer(new Uint8Array(encodedKey));
        }
        process.stdout.write(encodedKey);

        cli.ok('Private key successfully exported in STDOUT in "'+format+'" format.');
    }).catch(function (e) {
        cli.fatal(e.stack);
    });
}

ExportKey.prototype.createCli = function createCli() {
    const cli = require('cli')
        .enable('version')
        .setApp(__dirname + '/../package.json')
        .setUsage(this.toolName+' [OPTIONS]');

    var containerFiles = [];
    for (var key in this.containerKeysFiles) {
      containerFiles.push('"'+this.containerKeysFiles[key]+'"');
    }
    this.definedOptions.container[1] += ' '+containerFiles.join(', ');

    cli.width = 120;
    cli.option_width = 30;
    cli.parse(this.definedOptions);

    if (null == cli.options.container) {
        cli.getUsage();
        cli.exit(2);
    }
    
    return cli;
}

ExportKey.prototype.keyPromise = function keyPromise() {
    throw new Error('Unimplemented method keyPromise')
}

ExportKey.prototype.containerKeys = function containerKeys() {
    var result = {};
    for (var key in this.containerKeysFiles) {
        result[key] = this.readKey(this.containerKeysFiles[key]);
    }

    return result;
}

const fs = require('fs'),
    path = require('path');

ExportKey.prototype.readKey = function readKey(relativePath) {
    const root = path.normalize(this.parsedOptions.container),
    resultPath = path.join(root, relativePath);
    
    return new Uint8Array(fs.readFileSync(resultPath)).buffer;
}
