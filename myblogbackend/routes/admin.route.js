import { Router } from "express";
import fs from 'fs';
import path from 'path';
import { generateHeading } from "../controllers/user.controller.js";

const adminRouter = Router();

adminRouter.get('/login', async (req, res) => {
    res.send({"message":"admin login page"});
})

adminRouter.post("/login", async (req, res) => {
    res.send({"message":"adminlogin"});
})

adminRouter.post("/logout", async (req, res) => {
    res.send({"message":"admin logged out"})
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
    
})

adminRouter.post("/rejectBlog", async (req, res) => {

})

export default adminRouter;