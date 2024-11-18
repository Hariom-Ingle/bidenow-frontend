import express from "express";
import { register, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth ,} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/check-auth",verifyToken,checkAuth)

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post( logout);

router.route("/verify-email").post( verifyEmail);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);


export default router;