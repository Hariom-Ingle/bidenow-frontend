import mongoose from "mongoose";
import Auction from "../models/auctionSchema.model.js";

export const checkAuctionEndTime = async (req, res,next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "invalid Id formate "
        })
    }

    const auction = await Auction.findById(id);
    if (!auction) {

        return res.status(400).json({
            message: "Auction not found "
        })
    }
    const now = new Date();
    if (new Date(auction.startTime) > now) {

        return res.status(400).json({
            message: "Auction has not started yet ",
        })
    }
    if (new Date(auction.endTime) < now) {

        return res.status(400).json({
            message: "Auction is ended. ",
        })
    }
    next()

}