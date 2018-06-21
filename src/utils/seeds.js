import { GostRandom } from '../gostRandom';

// Get random values
export function getSeed(length) {
    const gostRandom = new GostRandom();
    try {
        const d = new Uint8Array(Math.ceil(length / 8));
        gostRandom.getRandomValues(d);
        return d;
    } catch (e) {
        throw new Error('Error occurred during random values generation');
    }
}

// Set random values into Uint8Arry
// Random generator
export function randomSeed(e) {
    try {
        const gostRandom = new GostRandom();
        return gostRandom.getRandomValues(e);
    } catch (e) {
        throw new Error('Error occurred during random values generation');
    }
}
