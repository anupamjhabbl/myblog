import express from 'express';
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';
import blogRouter from './routes/blog.route.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/admin', adminRouter);
app.use('/blogs', blogRouter);
app.use('/users', userRouter);

app.get('/', async (req, res) => {
    res.send({"message":"server is working"});
})

app.listen(port, () => {
    console.log(`Server is listening on http://127.0.0.1:${port}`);
})