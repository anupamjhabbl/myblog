import { Router } from "express";
import fs from 'fs';
import path from 'path';
import { headingExistOrNot, removeExtraCharacter, generateHeading, appendFilenameToUser, getUserFileList, passwordHasher, tokenGenerator, getUserFromToken } from "../controllers/user.controller.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userRouter = Router();

userRouter.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ username: username });
        if (user == null) {
            res.status(400).send({ "message": "wrong credentials" });
            return;
        }
        const check = await bcrypt.compare(password, user.password);
        if (check) {
            const obj = {
                username: username
            }
            const token = tokenGenerator(obj);
            res.cookie("jwt", token, { httpOnly: true, sameSite: 'None', secure: true });
            console.log("hdhdhd")
            res.redirect("http://127.0.0.1:3000/user/getBlogs");
        }
        else {
            res.status(400).send({ "message": "wrong credentials" });
        }
    }
    catch (err) {
        res.status(500).send({ "message": "not able to user login" });
    }
});

userRouter.post("/register", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    password = await passwordHasher(password);

    try {
        const user = new User({
            "username": username,
            "email": email,
            "password": password
        });
        await user.save();
        const obj = {
            username: username
        }
        const token = tokenGenerator(obj);
        res.cookie("jwt", token, { httpOnly: true, sameSite: 'None', secure: true });
        res.redirect("http://127.0.0.1:3000/");
    }
    catch (err) {
        if (err.code == 11000) {
            res.status(400).send({ "message": "This username has already been used. Please try with some other usernmae" });
        }
        else {
            res.status(500).send({ "message": "some internal server error occured in saving the register info in db" });
        }
    }
})

userRouter.post('/logout', async (req, res) => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() - 1);
    res.cookie("jwt", '', { expires: expirationDate, httpOnly: true });
    res.redirect("http://127.0.0.1:3000/")
})

userRouter.get("/getBlogs", async (req, res) => {
    const __dirname = path.resolve();
    let dirpath = path.join(__dirname, 'approvedBlogs');
    const response = [];
    fs.readdir(dirpath, async (err, files) => {
        if (err) {
            res.status(500).send({ "message": "some internal server occured in getting blogs" });
            return;
        }
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const content = await fs.promises.readFile(path.join(__dirname, 'approvedBlogs', file), 'utf-8');
            const tempObj = {
                "heading": generateHeading(file),
                "content": content
            }
            response.push(tempObj);
        }
        res.status(200).send({ "response": response });
    })

})

userRouter.get('/getMyBlogs', async (req, res) => {
    const token = req.cookies.jwt;
    if (token == "fuckyou") {
        let response = [];
        res.status(200).send({ "response": response });
        return ;
    }
    else {
        const username = getUserFromToken(token);
        let files = await getUserFileList(username);
        let __dirname = path.resolve();
        console.log(files);
        let response = [];
        let filelength;
        if (files == undefined) {
            filelength = 0;
        }
        else {
            filelength = files.length;
        }
        for (let i = 0; i < filelength; i++) {
            const file = files[i] + ".txt";
            try {
                const content = await fs.promises.readFile(path.join(__dirname, 'nonApprovedBlogs', file), 'utf-8');
                const tempObj = {
                    "heading": generateHeading(file),
                    "content": content,
                    "status": "Not approved"
                }
                response.push(tempObj);
            }
            catch (err) {
                try {
                    const content = await fs.promises.readFile(path.join(__dirname, 'approvedBlogs', file), 'utf-8');
                    const tempObj = {
                        "heading": generateHeading(file),
                        "content": content,
                        "status": "approved"
                    }
                    response.push(tempObj);
                }
                catch (err) {
                    console.log("this blog is rejected by admin")
                }
            }

        }
        res.status(200).send({ "response": response });
    }


})

userRouter.post('/postBlog', async (req, res) => {
    let heading = req.body.heading;
    let content = req.body.content;
    const token = req.cookies.jwt;
    if (token=="fuckyou"){
        res.redirect("http://localhost:3000/");
        return ;
    }
    const username = getUserFromToken(token);

    // replacing spaces with undersocre
    heading = heading.replace(/\s/g, '_');

    // removing extra characters from heading
    heading = removeExtraCharacter(heading);

    // getting th e filepath where to write the file
    const __dirname = path.resolve();
    let filepath = path.join(__dirname, 'nonApprovedBlogs', `${heading}.txt`);

    // checking that heading already exist or not
    const headingExists = headingExistOrNot(heading, "nonApprovedBlogs");
    if (headingExists) {
        res.status(400).send({ "message": "Please change your heading, this heading already exists" });
        return;
    }

    // writting to the file
    try {
        fs.promises.writeFile(filepath, content);
        await appendFilenameToUser(username, heading);
        // res.status(200).send({"message":"Your blog is given to admin for review"})
        res.redirect('http://127.0.0.1:3000/user/getBlogs');
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "message": "There is some problem in writting your blog. Please try again" });
    }
})

export default userRouter;