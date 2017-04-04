'use strict';

import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

export function getRootPath() {
  return path.join(path.dirname(require.main.filename), '..');
}

export function getSourcePath() {
  return path.join(getRootPath(), 'dotfiles');
}

/**
 * if not, check if env is passed and the value is l i.e. local, set the path for local installation
 * if not, which means a global installation, set the path to current directory
 * @param {*} env
 */
export function getDestinationPath(mode) {
  return (mode && mode === 'l') ? path.join(getRootPath(), '..', '..', '..') : process.cwd();
}

export function isPathExist(p) {
  return fs.existsSync(p);
}

export function isDirectoryExist(p) {
  return (isPathExist(p) && fs.statSync(p).isDirectory()) ? true : false;
}

export function logger(msg, t) {

  switch (t) {
    case 'ERROR':
      console.error(chalk.red(msg));
      return false;

    case 'INFO':
      console.error(chalk.gray(msg));
      break;

    default:
      console.log(msg)
      break;
  }
}
