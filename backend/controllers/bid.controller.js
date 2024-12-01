import { Bid } from "../models/bidding.model.js";
import User from "../models/user.model.js";
import Auction from "../models/auctionSchema.model.js";
 

export const placeBid = async (req, res) => {
    const { id } = req.params; // Auction item ID
    const { amount } = req.body;
 console.log("amount ",amount)
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Please enter a valid bid amount." });
    }

    try {
        // Fetch the auction item
        const auctionItem = await Auction.findById(id);
        if (!auctionItem) {
            return res.status(404).json({ message: "Auction item not found." });
        }

        // Validate bid amount
        if (amount <= auctionItem.currentBid) {
            return res.status(400).json({ message: "Bid amount must be greater than the current bid." });
        }

        if (amount <= auctionItem.startingBid) {
            return res.status(400).json({ message: "Bid amount must be greater than the starting bid." });
        }

        // Fetch bidder details
        const bidderDetails = await User.findById(req.userId);
        if (!bidderDetails) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the user already placed a bid on this auction item
        const existingBid = await Bid.findOne({
            "bidder.id": req.userId,
            auctionItem: auctionItem._id,
        });

        if (existingBid) {
            // Update existing bid
            existingBid.amount = amount;
            await existingBid.save();

            // Update auction item bid details
            const bidIndex = auctionItem.bids.findIndex(
                (bid) => bid.userId.toString() === req.userId.toString()
            );
            if (bidIndex !== -1) {
                auctionItem.bids[bidIndex].amount = amount;
            }
        } else {
            // Create a new bid
            const newBid = await Bid.create({
                amount,
                bidder: {
                    id: bidderDetails._id,
                    userName: bidderDetails.userName,
                    profileImage: bidderDetails.profileImage?.url,
                },
                auctionItem: auctionItem._id,
            });

            // Add the new bid to the auction item
            auctionItem.bids.push({
                userId: req.userId,
                userName: bidderDetails.userName,
                profileImage: bidderDetails.profileImage?.url,
                amount,
            });
        }

        // Update the current bid in the auction item
        auctionItem.currentBid = amount;
        await auctionItem.save();

        return res.status(201).json({
            success: true,
            message: "Bid placed successfully.",
            currentBid: auctionItem.currentBid,
        });
    } catch (error) {
        console.error("Error at placeBid controller:", error.message);
        return res.status(500).json({ message: "An error occurred while placing the bid." });
    }
};

