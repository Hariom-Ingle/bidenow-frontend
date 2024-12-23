import User from "../models/user.model.js";
import Auction from "../models/auctionSchema.model.js";

export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users excluding those with the role 'admin'
        const users = await User.find({ role: { $ne: 'admin' } });  
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server Error. Unable to fetch users."
        });
    }
};
export const getUserById = async (req, res) => {
    try {
        // Get user ID from request params
        const userId = req.params.id;

        // Fetch the user by ID excluding those with the role 'admin'
        const user = await User.findOne({ _id: userId, role: { $ne: 'admin' } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or is an admin."
            });
        }

        // Return the user details if found
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server Error. Unable to fetch user details."
        });
    }
};

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

 
export const getAuctionDetail = async (req, res) => {
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


export const updateAuctionStatus = async (req, res) => {
    try {
        const { id } = req.params; // Get auction item ID from request params
        const { status } = req.body; // Get the new status from request body

        // Validate status
        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Allowed statuses are 'approved', 'rejected', or 'pending'."
            });
        }

        // Find auction item and update its status
        const updatedAuction = await Auction.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedAuction) {
            return res.status(404).json({
                success: false,
                message: "Auction item not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: `Auction item status updated to ${status}.`,
            auctionItem: updatedAuction
        });
    } catch (error) {
        console.error("Error updating auction status:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update auction item status."
        });
    }
};


/****************************** GET FEATURED PRODUCTS *******************************/

export const getFeaturedAuctions = async (req, res) => {
    try {
        const featuredItems = await Auction.find({ isFeatured: true});
        return res.status(200).json({
            success: true,
            featuredItems
        });
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch featured products."
        });
    }
};

/****************************** TOGGLE IS FEATURED *******************************/

export const toggleIsFeatured = async (req, res) => {
    try {
        const { id } = req.params; // Get auction item ID from request params

        const auctionItem = await Auction.findById(id);

        if (!auctionItem) {
            return res.status(404).json({
                success: false,
                message: "Auction item not found."
            });
        }

        // Toggle the isFeatured property
        auctionItem.isFeatured = !auctionItem.isFeatured;
        await auctionItem.save();

        return res.status(200).json({
            success: true,
            message: `Auction item isFeatured status toggled to ${auctionItem.isFeatured}.`,
            auctionItem
        });
    } catch (error) {
        console.error("Error toggling isFeatured status:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to toggle isFeatured status."
        });
    }
};
