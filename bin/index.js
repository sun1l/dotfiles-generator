#!/usr/bin/env node

/**
 * This is the entry point for CLI, it validates the node version againts the confg file and
 * load 'cli.js', which will load commands and prompts for user input
 *
 * Note: DO NOT remove the shebang i.e. '#!/usr/bin/env node' on top of this file.
 * To know more, read https://en.wikipedia.org/wiki/Shebang_(Unix)
 */

'use strict';

const CONFIG = require('../lib/config');

let nodeVersion = process.versions.node;

if (nodeVersion.split('.')[0] < CONFIG.mimNodeVersion) {

  console.error(
    require('chalk').red(
      `You are running Node v${nodeVersion}\n` +
      `${require('../../package.json').name} requires Node v${CONFIG.mimNodeVersion} or higher.`
    )
  );

  process.exit(1);
}

require('./cli');
