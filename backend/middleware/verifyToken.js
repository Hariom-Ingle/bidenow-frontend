import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

 export const verifyToken=(req,res,next)=>{
    const token =req.cookies.token
    if(!token) return res.status(401).json({success:false,message:"Unauthorized - no Token Provided "})
    try {

        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode)return res.status(401).json({success:false,message:"Unauthorized - Invalid Token "})
        req.userId= decode.userId
        next()
        
    } catch (error) {

        console.log("Error in verifyToken",error)
        return res.status(500).json({success:false,message:"server error"})
    }
 }