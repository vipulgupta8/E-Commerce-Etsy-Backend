import express from "express"
import { signOut, signin, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout",verifyToken, signOut)

export default router;