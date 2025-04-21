"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = void 0;
const { version } = require('../../package.json'); // Dynamic require
function getVersion() {
    return version; // Return version from package.json
}
exports.getVersion = getVersion;
