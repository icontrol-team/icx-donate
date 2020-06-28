import getSelf from "./lib/get-self";
import createButton from "./lib/iconex-button";

const self = getSelf(window);
const button = createButton(window.document, self);
self.parentNode.replaceChild(button, self);
