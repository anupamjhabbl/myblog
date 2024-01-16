import fs from 'fs';
import path from 'path';

const headingExistOrNot =  (heading) => {
    const __dirname = path.resolve();
    const files = fs.readdirSync(path.join(__dirname, 'nonApprovedBlogs'));
    for (let i=0;i<files.length;i++){
        if (files[i]==`${heading}.txt`) {
            return true;
        }
    }
    return false;
}

const removeExtraCharacter = (heading) => {
    let newHeading = "";
    for (let i=0;i<heading.length;i++){
        if (heading[i]>='a' && heading[i]<='z'){
            newHeading += heading[i];
        }
        else if(heading[i]>='A' && heading[i]<='Z'){
            newHeading += heading[i];
        }
        else if(heading[i]>='0' && heading[i]<='9'){
            newHeading += heading[i];
        }
        else if(heading[i]=='_'){
            newHeading += heading[i];
        }
        else{
            continue;
        }
    }
    return newHeading;
}

const generateHeading = (heading) => {
    heading = heading.substring(0, heading.length-4);
    heading = heading.replace("_"," ");
    return heading;
}

export {headingExistOrNot, removeExtraCharacter, generateHeading};