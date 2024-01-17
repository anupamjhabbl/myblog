import express from 'express';
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';
import connectToDb from './db/dbConnection.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8000;

connectToDb();
app.use(express.json());
app.use(express.urlencoded()); 
app.use(cors({ origin: 'http://127.0.0.1:3000', credentials:true}));
app.use(cookieParser("Mercedes#@myaim1"));
app.use('/admin', adminRouter);
app.use('/users', userRouter);

app.get('/', async (req, res) => {
    res.send({"message":"server is working"});
})

app.listen(port, () => {
    console.log(`Server is listening on http://127.0.0.1:${port}`);
})