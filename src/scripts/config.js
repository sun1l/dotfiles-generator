import minimist from 'minimist';
import * as utils from './utils';

// Parse the arguments passed on command line
let argv = minimist(process.argv.slice(2));

export const CONFIG = {
    'rootPath' : utils.getRootPath(),
    'sourcePath': utils.getSourcePath(),
    'destinationPath': utils.getDestinationPath(argv.destination, argv.env),

    'env': argv.env || 'g',
    'files': argv._ || [],
    'overwrite' : argv.overwrite || false,

    'sourceFiles' : utils.getDotfilesFromSource(),
    'verbose' : argv.verbose || false
}