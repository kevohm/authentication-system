import { PostSchema } from "../model/post.model.js";

// Create a new post
export async function createPost(req, res) {
  const { title, content, published } = await PostSchema.omit({
    authorId: true,
  }).parseAsync(req.body);

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const post = await req.prisma.post.create({
    data: {
      title,
      content,
      published: published || false, // Default to false if not provided
      authorId: req.user.id, // Assuming `req.user.id` contains the logged-in user's ID
    },
  });

  res.status(201).json({ message: "Post Created", post });
}

// Get all posts
export async function getAllPosts(req, res) {
  const posts = await req.prisma.post.findMany({
    where:{
      published:true
    },
    orderBy: { createdAt: "desc" }, // Order by creation time (latest first)
  });

  res.status(200).json({ message: "Posts fetched", posts });
}
// Get single user posts
export async function getAllUserPosts(req, res) {
  const { id } = req.params;
  const posts = await req.prisma.post.findMany({
    where: {
      authorId:id,
    },
    orderBy: { createdAt: "desc" }, // Order by creation time (latest first)
  });

  res.status(200).json({ message: "Posts fetched", posts });
}

// Get a specific post by ID
export async function getPostById(req, res) {
  const { id } = req.params;

  const post = await req.prisma.post.findUnique({
    where: { id },
    include: {
      author: true, // Include author details if needed
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json({ message: "Post details", post });
}

// Update a post
export async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content, published } = await PostSchema.partial().parseAsync(
    req.body
  );

  const post = await req.prisma.post.findUnique({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Make sure the user is the author of the post
  if (post.authorId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this post" });
  }

  const updatedPost = await req.prisma.post.update({
    where: { id },
    data: {
      title: title || post.title,
      content: content || post.content,
      published: published !== undefined ? published : post.published,
    },
  });

  res.status(200).json({ message: "Post updated", updatedPost });
}

// Delete a post
export async function deletePost(req, res) {
  const { id } = req.params;

  const post = await req.prisma.post.findUnique({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Make sure the user is the author of the post
  if (post.authorId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this post" });
  }

  await req.prisma.post.delete({
    where: { id },
  });

  res.status(200).json({ message: "Post deleted" });
}
