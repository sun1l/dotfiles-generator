import fs from 'fs-extra';
import path from 'path';
import {CONFIG} from './config';

class dotfileGenerator {

    constructor(){
        this.config = CONFIG;

        if(CONFIG.verbose){
            console.log(CONFIG);
        }

        this.copy(this.config.files, this.config.sourcePath, this.config.destinationPath, this.config.overwrite);
    }

    copy (files = null, sourcePath = null, destinationPath = null, overwrite = false){

        const dotfilesList = this.config.sourceFiles;

        if(!files || !sourcePath || !destinationPath)
            throw new Error('files,  sourcePath, destinationPath are mandatory');

        files.forEach(function(filename){
            
            // Remove the "." dot from the filename
            let sourceFilename = filename.substring(1, filename.length);

            // Check if the file exist in the dot files
            if(!dotfilesList.includes(sourceFilename)){
                console.log(filename + ' -> Not available for installation');
                return false;
            }

            let source = path.join(sourcePath, sourceFilename);
            let destination = path.join(destinationPath, filename);

            fs.copy(source, destination, {
                    'filter': filterFiles
                }, err => {
                    if (err){
                        return console.error(err);
                    } 
            });
        });

        function filterFiles(source, destination){
            const filename = path.basename(destination);

            if(overwrite === false && fs.existsSync(destination)){
                console.log(filename + ' -> File already exist... skipping');
                return false;
            } else {
                console.log(filename + ' -> ' + destination);
                return true;
            }
        }

    }
}

module.exports = dotfileGenerator;
