import express from 'express';
const app = express();
import connectDB from './db/server.js';
import userRouter from './routes/user.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
const port = process.env.PORT || 5000;


/********** apis *********************/
app.use("/api/user", userRouter);


app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`);
});