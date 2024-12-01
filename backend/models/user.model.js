import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
         
    },
    role:{
        type:String,
        enum:["bidder","seller","admin"],
        default:"bidder",
    },
    profileImage: {  
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }, 
    paymentMethods:{
        bankTransfer:{
            bankAccountNumber:String,
            bankAccountName:String,
            bankName:String
        },
        paypal:{
            paypalEmail:String
        },


    },

    isVerified: {
        type: Boolean,
        default: false,
    },
    unpaidCommission:{
        type:Number,
        default:0,

    },
    auctionWon:{
        type:Number,
        default:0

    },
    moneySpent:{
        type:Number,
        default:0
    },
   

    cartItems:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        }
    ],
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String, // Use camelCase for consistency
    verificationTokenExpiresAt: Date, // Use camelCase for consistency
    lastLogin: Date,
}, {
    timestamps: true
});
const User = mongoose.model("User", userSchema);
export default User;
