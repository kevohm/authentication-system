import { Router } from "express";
import { currentUser, login, logout, signup } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const authRouter = Router();

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/me").get(authMiddleware,currentUser);

export { authRouter };
