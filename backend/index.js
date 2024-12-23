import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import cloudinary from './utils/cloudinary.js';
import connectDB from './db/server.js';
import userRouter from './routes/user.router.js';
import auctionRouter from"./routes/auction_routes.js"
 import adminRoutes  from "./routes/admin.routes.js"
import bidRouter from "./routes/bid.routes.js"
dotenv.config("");




const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
const port = process.env.PORT || 5000;


/********** apis *********************/
app.use("/api/user", userRouter);
app.use("/api/auction", auctionRouter);
app.use("/api/bid", bidRouter);
app.use('/api/admin', adminRoutes);
 


app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`);
});