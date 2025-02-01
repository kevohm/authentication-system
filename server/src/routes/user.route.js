import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// User routes
router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export const userRouter = router;