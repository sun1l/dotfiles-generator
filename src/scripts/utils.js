import path from 'path';
import fs from 'fs-extra';

export function getRootPath(){
    return path.dirname(require.main.filename);
}

export function getSourcePath(){
    let p = path.join(getRootPath(), 'dotfiles');
    
    if(!fs.existsSync(p))
        throw new Error('Source Path does not exist.');
    
    return p;
}

export function getDestinationPath(overwrite, env){
    // Check if overwrite is passed, set the path to overwrite path
    // if not, check if env is passed and the value is l i.e. local, set the path for local installation
    // if not, which means a global installation, set the path to current directory
    let p = overwrite || (env && env === 'l')? path.join(getRootPath(), '..', '..', '..') : false || process.cwd();
    
    if(!fs.existsSync(p))
        throw new Error('Destination Path does not exist.');
    
    return p;
}

/**
 * Get list of dotfiles from the source folder
 */
export function getDotfilesFromSource(){
    return fs.readdirSync(getSourcePath());
}