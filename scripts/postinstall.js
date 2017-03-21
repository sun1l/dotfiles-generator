#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const args = require('yargs').argv;

const config = {
    'rootPath' : path.join(__dirname),
    'sourceFiles' : [],
    'files': args._ || [],
    'overwrite' : args.overwrite || false,
    'verbose' : false
}

/**
 * Get list of dotfiles from the source folder
 */
function getDotfilesFromSource(sourcePath){
    var dotfilesList = fs.readdirSync(sourcePath);
    return dotfilesList;
}

/**
 * Return a array of dotfiles available for install
 */
function getDotfilesList(){
    return config.sourceFiles;
}

function copy (files = null, sourcePath = null, destinationPath = null, overwrite = false){

    if(!files || !sourcePath || !destinationPath){
        console.log('files, source and destination are mandatory for "copy" function.');
    }

    files.forEach(function(filename){
        let sourceFilename = filename.substring(1, filename.length);

        if(!getDotfilesList().includes(sourceFilename)){
            console.log(filename + ' is not available.');
            return false;
        }

        let source = path.join(sourcePath, sourceFilename);
        let destination = path.join(destinationPath, filename);

        function filterFiles(source, destination){
            
            const filename = path.basename(source);

            if(overwrite === false && fs.existsSync(destination)){
                console.log(filename + ' already exist >> Skipped');
                return false;
            } else {
                console.log(filename + ' >> success!' + "\n");
                return true;
            }
        }

        fs.copy(source, destination, {
                'filter': filterFiles
            }, err => {
                if (err){
                    return console.error(err);
                } 
        });
    });
}

!function(){
    let sourcePath, destinationPath;

    if(!sourcePath){
        sourcePath = path.join(config.rootPath, '../dotfiles');
    }

    if(!destinationPath){
        destinationPath = path.join(config.rootPath, '..', '..', '..');
    }

    config.sourceFiles = getDotfilesFromSource(sourcePath);

    copy(config.files, sourcePath, destinationPath, config.overwrite);

}();
