import express from "express";
import multer from "multer";
import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionItems,
  removeFromAuction,
  republishItem,
  incrementViewCount,
  getTrendingProducts,
} from "../controllers/auction.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes
router.post("/create", upload.single("image"), verifyToken, addNewAuctionItem);
router.get("/allitems", getAllItems);
router.get("/my-auctions", verifyToken, getMyAuctionItems);
router.get("/auctiondetails/:id", getAuctionDetails);
router.get("/getTrendingAuctions", getTrendingProducts);

// Increment view count
router.put("/:id/view", incrementViewCount);

router.post("/delete/:id",removeFromAuction);
router.post("/update/:id",republishItem);

export default router;
