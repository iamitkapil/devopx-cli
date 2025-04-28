#!/usr/bin/env node

import { hello } from './commands/hello';
import { publishArtifact } from './commands/publishArtifact';
import { registerEnvironment } from './commands/registerEnvironment';
import type { PublishArgs } from './commands/publishArtifact';
import { promoteArtifacts } from './commands/promoteArtifacts';
import minimist from 'minimist';
import { getVersion } from './commands/version'; // Update this import

const argv = minimist(process.argv.slice(2));

// Check if the command is valid
if (argv._[0] === 'hello') {
  hello();
} else if (argv._[0] === 'publish-artifact') {
  publishArtifact(argv as Partial<PublishArgs>);
} else if (argv._[0] === 'register-environment') {
  registerEnvironment();
} else if (argv._[0] === 'promote-artifacts') {
  promoteArtifacts(argv);  
} else if (argv._[0] === '--version' || argv.version) { // Handle version check
  console.log(`devopx-cli version ${getVersion()}`); // Use getVersion function
  process.exit(0);
} else {
  console.error('Unknown command. Please use: hello, publish-artifact, register-environment');
  process.exit(1);
}
