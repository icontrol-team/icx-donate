const QUERY = 'script[data-meta="icx-donate"]';
// const QUERY = 'script[address="'+address+'"]';

export default function getSelf(global) {
    const scriptEls = global.document.querySelectorAll(QUERY);
    return scriptEls[scriptEls.length - 1];
}
