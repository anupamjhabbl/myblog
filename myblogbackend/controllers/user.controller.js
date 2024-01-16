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

export {headingExistOrNot};