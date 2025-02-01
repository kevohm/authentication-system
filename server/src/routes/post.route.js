import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllUserPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js"; // Make sure user is authenticated

const router = express.Router();

// Route for creating a post
router.route("/")
  .post(authMiddleware, createPost)
  .get(authMiddleware, getAllPosts);

// Route for getting a post by ID
router.route("/by/:id")
  .get(authMiddleware, getAllUserPosts)
router.route("/:id")
  .get(authMiddleware, getPostById)
  .put(authMiddleware, updatePost)
  .delete(authMiddleware, deletePost);

export const postRouter = router;
