import { Router } from "express";

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
    res.send({"message":"your blog is posted successfully"});
})

export default userRouter;