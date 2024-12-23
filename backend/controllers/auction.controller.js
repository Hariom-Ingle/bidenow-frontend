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

         
      const { id } = req.params; // Auction ID
      const { userId } = req.body; // Extract userId from request body
  
      const auctionItem = await Auction.findOneAndDelete({ _id: id, createdBy: userId });
  
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
      return res.status(500).json({
        success: false,
        message: "Failed to remove auction item."
      });
    }
  };
  
/****************************** REPUBLISH ITEM   *******************************/

export const republishItem = async (req, res) => {
    try {
      const { id } = req.params; // Auction ID
      const {
        title,
        description,
        startingBid,
        currentBid,
        startTime,
        endTime,
        image,
        views,
        userId, // User ID
      } = req.body; // Extract auction data from request body
  
      // Ensure the new end time is in the future
      if (!endTime || new Date(endTime) <= Date.now()) {
        return res.status(400).json({
          success: false,
          message: "New end time must be in the future.",
        });
      }
  
      // Prepare the data to update the auction item
      const updatedData = {
        title,
        description,
        startingBid,
        currentBid,
        startTime,
        endTime,
        image,
        views,
        status: "pending", // Always set status to 'pending'
        isFeatured: false, // Always set isFeatured to false
      };
  
      // Update the auction item if the user has permission
      const auctionItem = await Auction.findOneAndUpdate(
        { _id: id, createdBy: userId }, // Validate userId
        updatedData,
        { new: true }
      );
  
      if (!auctionItem) {
        return res.status(404).json({
          success: false,
          message: "Auction item not found or you do not have permission to update it.",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Auction item republished successfully.",
        auctionItem,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to republish auction item.",
      });
    }
  };
  


/****************************** INCREMENT VIEW COUNT *******************************/
export const incrementViewCount = async (req, res) => {
    try {
        const { id } = req.params; // Get auction item ID from request params

        const auctionItem = await Auction.findById(id);

        if (!auctionItem) {
            return res.status(404).json({
                success: false,
                message: "Auction item not found.",
            });
        }

        // Increment view count by 1
        auctionItem.views += 1;
        await auctionItem.save(); // Save the updated view count

        return res.status(200).json({
            success: true,
            message: "View count incremented successfully.",
        });
    } catch (error) {
        console.error("Error incrementing view count:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to increment view count.",
        });
    }
};

/****************************** GET TRENDING PRODUCTS *******************************/
export const getTrendingProducts = async (req, res) => {
    try {
        // Define logic for "trending" products
        const trendingItems = await Auction.find()
            .sort({ numberOfBids: -1, views: -1, createdAt: -1 }) // Adjust sorting logic as per your criteria
            .limit(6); // Fetch top 6 items

        if (trendingItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No trending products found.",
            });
        }

        return res.status(200).json({
            success: true,
            trendingProducts: trendingItems,
        });
    } catch (error) {
        console.error("Error fetching trending products:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch trending products.",
        });
    }
};
