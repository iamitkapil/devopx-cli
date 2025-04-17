#!/usr/bin/env node

import { sayHello } from './commands/sayHello';
import { publishArtifact } from './commands/publishArtifact';
import { registerEnvironment } from './commands/registerEnvironment';
import type { PublishArgs } from './commands/publishArtifact';
import type { RegisterEnvironmentArgs } from './commands/registerEnvironment';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

// Check if the command is valid
if (argv._[0] === 'sayHello') {
  sayHello();
} else if (argv._[0] === 'publishArtifact') {
  publishArtifact(argv as Partial<PublishArgs>);
} else if (argv._[0] === 'registerEnvironment') {
  registerEnvironment(argv as Partial<RegisterEnvironmentArgs>);
} else {
  console.error('Unknown command. Please use: sayHello, publishArtifact, registerEnvironment');
  process.exit(1);
}
