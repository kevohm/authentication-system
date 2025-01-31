import { z } from "zod";

export const PostSchema = z.object({
  title: z.string({message:'title must be a string', required_error:"Please provide a title"}).min(1, "Title is required"), // Title must be a non-empty string
  content: z.string({message:'content must be a string', required_error:"Please provide some content"}).min(1, "Content is required"), // Content must be a non-empty string
  published: z.boolean({message:'published must be a boolean', required_error:"Please provide a published status"}).default(false), // Published field defaults to false
  authorId: z.string({message:'author must be a string', required_error:"Please provide an author"}).cuid({
    message: "Author ID must be a valid CUID",
  }), // Author ID must be a valid CUID
});


