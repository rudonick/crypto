import { gostEngine as GostEngine } from './engine/gostEngineSync';

const defaultGostSignAlgorithm = {
    name: 'GOST R 34.10',
    version: 2012,
    mode: 'SIGN',
    length: 256,
    procreator: 'CP',
    keySize: 32,
    namedCurve: 'S-256-A',
    hash:
      {
          name: 'GOST R 34.11',
          version: 2012,
          mode: 'HASH',
          length: 256,
          procreator: 'CP',
          keySize: 32
      },
    id: 'id-tc26-gost3410-12-256'
};

const CryptoGostAPI = {
    hash(byteArray) {
        // GOST R 34.11-12-256 algorithm
        const cipher = GostEngine.getGostDigest({
            name: 'GOST R 34.11',
            length: 256,
            version: 2012
        });

        // returns byte array
        return cipher['digest'](byteArray);
    },

    sign(privateKey, data) {
        // using algorithm : GostDigest-2012-with-Gost-3410-2012

        const cipher = GostEngine.getGostSign(defaultGostSignAlgorithm);

        // returns byte array
        return cipher.sign(privateKey, data);
    },

    verify(publicKey, message, sign) {
        const cipher = GostEngine.getGostSign(defaultGostSignAlgorithm);

        // return boolean
        return cipher.verify(publicKey, sign, message);
    }
};

export default CryptoGostAPI
