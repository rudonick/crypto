export function getRoot() {
    return isInNode() ? global : self;
}

export function getCryptoModule() {
    const root = getRoot();
    if (getRoot().hasOwnProperty('crypto')) {
        return root.crypto;
    } else if (root.hasOwnProperty('msCrypto')) {
        return root.msCrypto;
    } else if (isInNode()) {
        return require('crypto');
    }

    throw new Error('Your environment does not have сrypto module');
}

export function isInNode() {
    return typeof exports === 'object' && typeof module !== 'undefined';
}

export function isBrowser() {
    return typeof window !== 'undefined';
}

export function isInWebWorker() {
    return typeof importScripts !== 'undefined';
}
