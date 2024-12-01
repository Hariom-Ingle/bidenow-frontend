import express from "express";
import multer from "multer";
import { addNewAuctionItem, getAllItems, getAuctionDetails, getMyAuctionItems, removeFromAuction, republishItem } from "../controllers/auction.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/create", upload.single("image"), verifyToken,  addNewAuctionItem);
router.get("/allitems",getAllItems );
router.get("/my-auctions", verifyToken ,  getMyAuctionItems);
router.get("/auctiondetails/:id",    getAuctionDetails);
router.post("/delete/:id", verifyToken,  removeFromAuction  );
router.post("/republish/:id", verifyToken,  republishItem);

export default router;
 