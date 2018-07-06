import { GostCoding, gostCodingInstance as coding } from './crypto/gostCoding';
import { GostSign } from './engine/gostSign';
import CryptoGostAPI from './crypto-gost-wrapper';

const message = 'qwerty';
const gostCoding = new GostCoding();
const encodedMessage = gostCoding.Chars.decode(message, 'utf8');

/* hash test */
const hashTest = gostCoding.Base64.encode(CryptoGostAPI.hash(encodedMessage));
console.log('Hash test result: ', hashTest);

/* verify test */
const publicKey = 'KM0R5bn0+pAaQPdse9AYECNUInRL1RqH6R6UlgdsQgahm7OVFw7fAapvletSpYQcmwzuC5PqVLKqIEcpyC12TA==';
const signature = 'VBTs9RLwHEwB6lu4b+tlLAuQUakG5VYktiCKHv3bWmt9J1UxgKgzIPKwI8K76Y4EXZlClyWJ1cp4evtLnISxkA==';
const decodedPublicKey = coding.Base64.decode(publicKey, true);
const decodedSign = coding.Base64.decode(signature, true);
console.log('Verify test result: ', CryptoGostAPI.verify(decodedPublicKey, encodedMessage, decodedSign));

/* sign test */
const cipher = new GostSign(CryptoGostAPI.algorithmGostSign);
const
  keyPair = cipher.generateKey(),
  signPrivateKey = keyPair.privateKey,
  signPublicKey = keyPair.publicKey;

console.log('------------');
console.log('Private key: ', gostCoding.Base64.encode(signPrivateKey));
console.log('Public key: ', gostCoding.Base64.encode(signPublicKey));
console.log('------------');

const signTest = gostCoding.Base64.encode(CryptoGostAPI.sign(signPrivateKey, encodedMessage));
console.log('Sign test result: ', signTest);
