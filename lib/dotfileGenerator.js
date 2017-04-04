'use strict';

import fs from 'fs-extra';
import path from 'path';
import {
  isDirectoryExist,
  isPathExist,
  getSourcePath,
  getDestinationPath,
  logger
} from '../lib/utils';
import chalk from 'chalk';

module.exports = function (files, options) {
  const ERROR = 'ERROR',
        INFO = 'INFO';

  logger('Generating dotfiles...');

  // Get the source path of dotfiles
  let sourcePath = getSourcePath();

  // Check if the source path is a valid directory
  if (!isDirectoryExist(sourcePath)) {
    throw new Error(
      `${sourcePath} is not a valid dotfiles source directory.`
    );
  }

  // Set the destination path to copy dotfiles
  let destinationPath = options.destination ? path.resolve(options.destination) : getDestinationPath();

  // Check if the destination path is a valid directory
  if (!isDirectoryExist(destinationPath))
    return logger(`${destinationPath} does not exist, can not copy dotfiles.`, ERROR);

  /**
   * Loop through dotfiles requests
   */
  files.forEach(function (filename) {

    let source = path.join(this.sourcePath, filename.substring(1, filename.length));
    let destination = path.join(this.destinationPath, filename);

    // Check if the dotfile is available for install
    if (!isPathExist(source))
      return logger(`${source} is not availble.`, ERROR);

    let isDestinationExist = isPathExist(destination);

    if (!this.overwrite && isDestinationExist) {
      logger(
        filename +
        chalk.yellow(' -> ') +
        destination +
        chalk.yellow(' [skipped]'),
        INFO);
      return;
    }

    logger(
      filename +
      chalk.green(' -> ') +
      destination +
      (this.overwrite ? chalk.red(' [overwritten]') : chalk.green(' [done]')),
      INFO);

    // Copy files
    fs.copySync(source, destination, {
      overwrite: this.overwrite
    })

  }, {
      sourcePath,
      destinationPath,
      ...options
    });
}
