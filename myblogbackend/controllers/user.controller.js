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
    heading = heading.replace(/[_]/g," ");
    return heading;
}

const appendFilenameToUser = async (user, filename) => {
    const __dirname = path.resolve();
    let userFile = await fs.promises.readFile(path.join(__dirname, "userFiles.json"), "utf-8");
    userFile = await JSON.parse(userFile);
    let counter = 0;
    for (let i=0;i<userFile.userFile.length;i++){
        let tempuser = userFile.userFile[i];
        if (tempuser.username==user){
            tempuser.blogs.push(filename);
            counter = 1;
            break;
        }
    }
    if (counter==0){
        let newUser = {
            "username":user,
            "blogs":[filename]
        }
        userFile.userFile.push(newUser);
    }
    console.log(JSON.stringify(userFile));
    await fs.promises.writeFile(path.join(__dirname, "userFiles.json"), JSON.stringify(userFile));
}

const getUserFileList = async  (username) => {
    const __dirname = path.resolve();
    let userFile = await fs.promises.readFile(path.join(__dirname, "userFiles.json"), "utf-8");
    userFile = await JSON.parse(userFile);
    for (let i=0;i<userFile.userFile.length;i++){
        let tempuser = userFile.userFile[i];
        if (tempuser.username==username){
            return tempuser.blogs;
        }
    }
    
}

export {headingExistOrNot, removeExtraCharacter, generateHeading, appendFilenameToUser, getUserFileList};