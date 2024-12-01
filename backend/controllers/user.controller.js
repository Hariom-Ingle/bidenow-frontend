import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendverificationEmail } from "../mailtrap/email.js";

dotenv.config();

/********************* USER REGISTER ********************/
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate required fields
        if (!username || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate and upload profile image
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Profile image is required" });
        }

        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(req.file.mimetype)) {
            return res.status(400).json({ success: false, message: "File format not supported" });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: "AUCTION_PLATFORM_USERS",
        });

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(500).json({ success: false, message: "Failed to upload image to Cloudinary" });
        }

        // Hash password and generate verification token
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Create and save the user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            profileImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
            role,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Expires in 24 hours
        });

        await user.save();

        // Generate token, set cookie, and send verification email
        generateTokenAndSetCookie(res, user._id);
        // await sendverificationEmail(user.email, verificationToken);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: { ...user._doc, password: undefined },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


/********************* VERIFY EMAIL ********************/

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.username);

        return res.status(200).json({
            message: "User verified successfully",
            success: true,
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


/********************* USER LOGIN ********************/

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check for missing fields
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Missing required fields", success: false });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist", success: false });
        }

        const  isroleMatch = user.role === role;
        if (!isroleMatch) {
            return res.status(400).json({ message: "User role does not match", success: false });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }

        // Generate JWT token
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = Date.now();
        await user.save();
        res.status(200).json({ message: "User logged in successfully", success: true, user: { ...user._doc, password: undefined } });



    } catch (error) {
        console.log("error in login function ".error);
        res.status(400).json({ error: error.message });
    }
};

/********************* USER LOGOUT ********************/

export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" });

        return res.status(200).json({
            message: "Logged out successfully.",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfile = async (req, res) =>{
    try {
        const user = await User.findById(req.userId).select("-password");
        
        if(!user){
            return res.status(400).json({message:"user not found",success:false})
        }
        res.status(200).json({success:true,user })
    } catch (error) {
        console.log("error in check  auth", error);
        res.status(500).json({ error: error.message });
    }
}


/********************* FORGOT PASSWORD ********************/


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body; // Extract email from request body
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        // Generate a unique token for password reset
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpires;
        
        await user.save();


        // send email
        await sendPasswordResetEmail(user.email, `http://localhost:4200/reset-password/${resetToken}`);

        
        return res.status(200).json({
            message: "Password reset email sent successfully",
            success: true,
        });
    } catch (error) {
        console.log("error in forgot password", error);
        res.status(500).json({ error: error.message });
    }
};


/********************* RESET PASSWORD ********************/

export const resetPassword = async (req, res) => {
    try {
        console.log(req.params);
        const { token } = req.params;
        
        const { password } = req.body;       
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token", success: false });
        }
        
        // update password
        
        const  hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;        
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;        
        await user.save();   
        
        await sendResetSuccessEmail(user.email);     
        
        return res.status(200).json({ message: "Password reset successfully", success: true });        
    } catch (error) {
        console.log("error in reset password", error);
        res.status(500).json({ error: error.message });
    }
}

/********************* CHECK AUTH ********************/

export const checkAuth = async (req,res)=>{
    try {
        const user = await  User.findById(req.userId).select("-password")
        
        if(!user){
            return res.status(400).json({message:"user not found",success:false})
        }
        res.status(200).json({success:true,user })
    } catch (error) {
        console.log("error in check  auth", error);
        res.status(500).json({ error: error.message });
    }
}

/********************* LEADERBOARD  ********************/


export  const  fetchLeaderboard = async(req,res)=>{

    const users = await  User.find({moneySpent:{$gt:0}});
    const leaderboard= users.sort((a,b)=>b.moneySpent - a.moneySpent)
    return res.status(200).json({ leaderboard });

}

