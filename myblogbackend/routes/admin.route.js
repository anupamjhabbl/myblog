import { Router } from "express";

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
    
})

adminRouter.post("/approveBlog", async (req, res) => {
    
})

adminRouter.post("/rejectBlog", async (req, res) => {

})

export default adminRouter;