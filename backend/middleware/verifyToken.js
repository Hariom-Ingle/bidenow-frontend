 
import dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // Ensure the decoded token contains the necessary user info
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        req.user = decoded; // Attach full decoded token to req.user
        req.userId = decoded.userId; // Convenience property for userId
        console.log("Token from cookies:", req.cookies.token);
console.log("Token from headers:", req.headers.authorization);

        next();
    } catch (error) {
        console.error("Error in verifyToken:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};




// export const isAuthorized = (...roles) => {
//     return (req, res, next) => {
//         // Ensure `req.user` exists and contains a valid `role`
//         if (!req.user || !req.user.role) {
//             return res.status(401).json({ success: false, message: "Unauthorized - User role not found" });
//         }

//         // Check if the user's role is included in the allowed roles
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ 
//                 success: false, 
//                 message: `${req.user.role} is not allowed to access this resource` 
//             });
//         }

//         // If the role is authorized, proceed to the next middleware
//         next();
//     };
// };
