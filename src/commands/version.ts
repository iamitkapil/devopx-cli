const { version } = require('../../package.json'); // Dynamic require
export function getVersion() {
  return version; // Return version from package.json
}