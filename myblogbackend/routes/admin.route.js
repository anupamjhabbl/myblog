import { Router } from "express";
import fs from 'fs';
import path from 'path';
import { generateHeading, headingExistOrNot, removeExtraCharacter } from "../controllers/user.controller.js";

const adminRouter = Router();

adminRouter.get('/login', async (req, res) => {
    res.send({"message":"admin login page"});
    // reirect to admin login form page
})

adminRouter.post("/login", async (req, res) => {
    const username = req.body.userame;
    const password = req.body.password;

    if (username=="admin" && password=="12345678"){
        res.status(200).send({"message":"logged in as admin"});
        // reirect to adminBlogs page
    }
    else{
        res.status(200).send({"message":"not logged in. try again"})
        // redirect to first page 
    }
})

adminRouter.post("/logout", async (req, res) => {
    res.send({"message":"admin logged out"})
    // redirect to first page
})

adminRouter.get("/adminBlogs", async (req, res) => {
    const __dirname = path.resolve();
    let dirpath = path.join(__dirname, 'nonApprovedBlogs');
    const response = [];
    fs.readdir(dirpath, async (err, files) => {
        if (err){
            res.status(500).send({"message":"some internal server occured in getting blogs"});
            return ;
        }
        for (let i=0;i<files.length;i++){
            const file = files[i];
            const content = await fs.promises.readFile(path.join(__dirname, 'nonApprovedBlogs', file), 'utf-8');
            const tempObj = {
                "heading": generateHeading(file),
                "content": content
            }
            response.push(tempObj);
        }
        res.status(200).send({"response":response});
    })
})

adminRouter.post("/approveBlog", async (req, res) => {
    let heading = req.body.heading;
    let content = req.body.content;

    // replacing spaces with undersocre
    heading = heading.replace(/\s/g, '_');  
    
    // removing extra characters from heading
    heading = removeExtraCharacter(heading);
    
    // getting th e filepath where to write the file
    const __dirname = path.resolve();
    let filepath = path.join(__dirname, 'approvedBlogs', `${heading}.txt`);

    // checking that heading already exist or not
    const headingExists = headingExistOrNot(heading, "approvedBlogs");
    if (headingExists){
        res.status(400).send({"message":"Please change your heading, this heading already exists"});
        return ;
    }
    
    // writting to the file
    try{
        fs.promises.writeFile(filepath, content);
        res.status(200).send({"message":"Thisblog is approved"})
    }
    catch(err){
        console.log(err);
        res.status(500).send({"message":"There is some problem in approving this blog. Please try again"});
    }
    fs.unlinkSync(path.join(__dirname,"nonApprovedBlogs",`${heading}.txt`));
})

adminRouter.post("/rejectBlog", async (req, res) => {
    let heading = req.body.heading;
    let content = req.body.content;

    // replacing spaces with undersocre
    heading = heading.replace(/\s/g, '_');  
    
    // removing extra characters from heading
    heading = removeExtraCharacter(heading);
    
    // getting th e filepath where to write the file
    const __dirname = path.resolve();
    let filepath = path.join(__dirname, 'nonApprovedBlogs', `${heading}.txt`);
    fs.unlinkSync(filepath);
    res.status(200).send({"message":"this blog is rejected"});
})

export default adminRouter;