import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { placeBid } from "../controllers/bid.controller.js";
import { checkAuctionEndTime } from "../middleware/checkAuctionEnd.js";
const router = express.Router();

// Multer configuration

 router.post("/place/:id", verifyToken ,checkAuctionEndTime,  placeBid);
 
export default router;
 