#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("./commands/hello");
const publishArtifact_1 = require("./commands/publishArtifact");
const registerEnvironment_1 = require("./commands/registerEnvironment");
const promoteArtifacts_1 = require("./commands/promoteArtifacts");
const minimist_1 = __importDefault(require("minimist"));
const version_1 = require("./commands/version"); // Update this import
const argv = (0, minimist_1.default)(process.argv.slice(2));
// Check if the command is valid
if (argv._[0] === 'hello') {
    (0, hello_1.hello)();
}
else if (argv._[0] === 'publish-artifact') {
    (0, publishArtifact_1.publishArtifact)(argv);
}
else if (argv._[0] === 'register-environment') {
    (0, registerEnvironment_1.registerEnvironment)();
}
else if (argv._[0] === 'promote-artifacts') {
    (0, promoteArtifacts_1.promoteArtifacts)(argv);
}
else if (argv._[0] === '--version' || argv.version) { // Handle version check
    console.log(`devopx-cli version ${(0, version_1.getVersion)()}`); // Use getVersion function
    process.exit(0);
}
else {
    console.error('Unknown command. Please use: hello, publish-artifact, register-environment');
    process.exit(1);
}
