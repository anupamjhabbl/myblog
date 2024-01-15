import { Router } from "express";

const blogRouter = Router();

blogRouter.get('/', async (req, res) => {
    res.send({"message":"blog route is also working"});
})

export default blogRouter;