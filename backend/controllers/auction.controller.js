import User from "../models/user.model.js";
import Auction from "../models/auctionSchema.model.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

export const addNewAuctionItem = async (req, res) => {
    try {
        // Check if an image file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Auction item image is required." });
        }

        console.log(req.userId);

        const { mimetype, path } = req.file;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(mimetype)) {
            return res.status(400).json({ message: "File format not supported." });
        }

        const { title, description, category, startingBid, startTime, endTime } = req.body;

        // Validate all required fields
        if (![title, description, category, startingBid, startTime, endTime].every(Boolean)) {
            return res.status(400).json({ message: "Please provide all required details." });
        }

        if (new Date(startTime) >= new Date(endTime)) {
            return res.status(400).json({ message: "Auction start time must be less than end time." });
        }

        if (new Date(startTime) < Date.now()) {
            return res.status(400).json({ message: "Auction start time must be in the future." });
        }

        // Check if user has an active auction
        // const activeAuction = await Auction.findOne({
        //     createdBy: req.userId,
        //     endTime: { $gt: Date.now() },
        // });

        // if (activeAuction) {
        //     return res.status(400).json({ message: "You already have one active auction." });
        // }

        // Upload image to Cloudinary
        let cloudinaryResponse;
        try {
            cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
                folder: "AUCTION_PLATFORM_AUCTIONS",
            });
        } catch (error) {
            console.error("Cloudinary upload failed:", error);
            return res.status(500).json({ message: "Image upload to Cloudinary failed." });
        }

        // Create auction item
        const auctionItem = await Auction.create({
            title,
            description,
            category,

            startingBid,
            startTime,
            endTime,
            image: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
            createdBy: req.userId,
        });

        return res.status(201).json({
            success: true,
            message: `Auction item created and will be listed on the auction page at ${startTime}.`,
            auctionItem,
        });
    } catch (error) {
        console.error("Failed to create auction:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};



/****************************** GET ALL ITEMS *******************************/

export const getAllItems = async (req, res) => {
    try {
        const items = await Auction.find(); // Fetch all auction items
        return res.status(200).json({
           items
        });
    } catch (error) {
        console.error("Error fetching all items:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch auction items."
        });
    }
};

/****************************** GET MY AUCTION DETAILS  *******************************/
export const getMyAuctionItems = async (req, res) => {
    try {
        const items = await Auction.find({ createdBy: req.userId }); // Filter by user's ID
        console.log(req.userId)
        return res.status(200).json({
 
            items
        });
    } catch (error) {
        console.error("Error fetching user's auction items:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch your auction items."
        });
    }
};

/****************************** GET AUCTION DETAILS *******************************/
 
export const getAuctionDetails = async (req, res) => {
    try {
        const { id } = req.params; // Get auction item ID from request params
        const auctionItem = await Auction.findById(id);
 
        if (!auctionItem) {
            return res.status(404).json({
                success: false,
                message: "Auction item not found."
            });
        }

        return res.status(200).json({
            auctionItem
        });
    } catch (error) {
        console.error("Error fetching auction details:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch auction item details."
        });
    }
};

/****************************** REMOVE FROM AUCTION *******************************/

export const removeFromAuction = async (req, res) => {
    try {
        const { id } = req.params; // Get auction item ID from request params
        const auctionItem = await Auction.findOneAndDelete({ _id: id, createdBy: req.userId });

        if (!auctionItem) {
            return res.status(404).json({
                success: false,
                message: "Auction item not found or you do not have permission to delete it."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Auction item removed successfully."
        });
    } catch (error) {
        console.error("Error removing auction item:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to remove auction item."
        });
    }
};

/****************************** REPUBLISH ITEM   *******************************/

export const republishItem = async (req, res) => {
    try {
        const { id } = req.params; // Get auction item ID from request params
        const { newEndTime } = req.body; // Get new end time from request body

        if (!newEndTime || new Date(newEndTime) <= Date.now()) {
            return res.status(400).json({
                success: false,
                message: "New end time must be in the future."
            });
        }

        const auctionItem = await Auction.findOneAndUpdate(
            { _id: id, createdBy: req.userId },
            { endTime: newEndTime },
            { new: true }
        );

        if (!auctionItem) {
            return res.status(404).json({
                success: false,
                message: "Auction item not found or you do not have permission to update it."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Auction item republished successfully.",
            auctionItem
        });
    } catch (error) {
        console.error("Error republishing auction item:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to republish auction item."
        });
    }
};
