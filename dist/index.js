#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sayHello_1 = require("./commands/sayHello");
const publishArtifact_1 = require("./commands/publishArtifact");
const registerEnvironment_1 = require("./commands/registerEnvironment");
const minimist_1 = __importDefault(require("minimist"));
const argv = (0, minimist_1.default)(process.argv.slice(2));
// Check if the command is valid
if (argv._[0] === 'Hello') {
    (0, sayHello_1.sayHello)();
}
else if (argv._[0] === 'publish-artifact') {
    (0, publishArtifact_1.publishArtifact)(argv);
}
else if (argv._[0] === 'register-environment') {
    (0, registerEnvironment_1.registerEnvironment)(argv);
}
else {
    console.error('Unknown command. Please use: sayHello, publishArtifact, registerEnvironment');
    process.exit(1);
}
