import { Router } from "express";
import fs from 'fs';
import path from 'path';
import { headingExistOrNot } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/login', async (req, res) => {
    res.send({"message":"login page"});
})

userRouter.post('/login', async (req, res) => {
    res.send({"message":"userlogin"});
});

userRouter.get("/register", async (req, res) => {
    res.send({"message":"register page"});
});

userRouter.post("/register", async (req, res) => {
    res.send({"message":"userregister"});
})

userRouter.post('/logout', async (req, res) => {
    res.send({"message":"userlogout"});
})

userRouter.get("/postBlog", async (req, res) => {
    res.send({"message":"post blog page"});
})

userRouter.post('/postBlog', async (req, res) => {
    let heading = req.body.heading;
    let content = req.body.content;

    // replacing spaces with undersocre
    heading = heading.replace(/\s/g, '_');  
    
    // removing extra characters from heading


    // getting th e filepath where to write the file
    const __dirname = path.resolve();
    let filepath = path.join(__dirname, 'nonApprovedBlogs', `${heading}.txt`);

    // checking that heading already exist or not
    const headingExists = headingExistOrNot(heading);
    if (headingExists){
        res.status(200).send({"message":"Please change your heading, this heading already exists"});
        return ;
    }
    
    // writting to the file
    try{
        fs.promises.writeFile(filepath, content);
        res.status(200).send({"message":"Your blog is given to admin for review"})
    }
    catch(err){
        console.log(err);
        res.status(500).send({"message":"There is some problem in writting your blog. Please try again"});
    }
})

export default userRouter;