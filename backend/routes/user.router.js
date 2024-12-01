import express from "express";
import multer from "multer";
import {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth,
    getProfile,
    fetchLeaderboard,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get("/check-auth", verifyToken, checkAuth);
router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifyToken, getProfile);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/leaderboard", fetchLeaderboard);

export default router;
