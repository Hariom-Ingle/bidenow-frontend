import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";

const auctionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    category:{
        type:String,
        required:[true,"category is required"]
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending",
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    startingBid:Number,
    currentBid:{type:Number,default:0},
    startTime:String,
    endTime:String,
    image: {
        public_id: {
            type: String,
            required: [true, "Image is required"],
        },
        url: {
           type: String,
           required: [true, "Image is required"],
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"],
    },
    bids: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: [true, "Bidder is required"],
            },
          userName: String,
          profileImage:String,
          amount:Number
        },
    ],
    
   
    highestBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    commissionCalculated:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }   
     
})

  
  const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;
