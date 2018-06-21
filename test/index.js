import gostCipherTests from './gostCipher.test';
import gostDigestTests from './gostDigest.test';
import gostSignTests from './gostSign.test';

/* Running tests */
gostCipherTests();
gostDigestTests(true);
gostSignTests();
