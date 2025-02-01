import { UserSchema } from "../model/user.model.js";

// Create a new user
export async function createUser(req, res) {
  const { first_name, last_name, email, password } = await UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    role: true,
  }).parseAsync(req.body);

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await req.prisma.user.create({
    data: {
      first_name,
      last_name,
      email,
      password, // In a real app, hash the password before saving
      role: "user", // Default role
    },
  });

  res.status(201).json({ message: "User Created", user });
}

// Get all users
export async function getAllUsers(req, res) {
  const users = await req.prisma.user.findMany({
    orderBy: { createdAt: "desc" }, // Order by creation time (latest first)
  });

  res.status(200).json({ message: "Users fetched", users });
}

// Get a specific user by ID
export async function getUserById(req, res) {
  const { id } = req.params;

  const user = await req.prisma.user.findUnique({
    where: { id },
    include: {
      posts: true, // Include posts if needed
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User details", user });
}

// Update a user
export async function updateUser(req, res) {
  const { id } = req.params;
  const { first_name, last_name, email, password, role } =
    await UserSchema.partial().parseAsync(req.body);

  const user = await req.prisma.user.findUnique({ where: { id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Make sure the user is updating their own profile or is an admin
  if (user.id !== req.user.id && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized to update this user" });
  }

  const updatedUser = await req.prisma.user.update({
    where: { id },
    data: {
      first_name: first_name || user.first_name,
      last_name: last_name || user.last_name,
      email: email || user.email,
      password: password || user.password, // In a real app, hash the password before saving
      role: role || user.role,
    },
  });

  res.status(200).json({ message: "User updated", updatedUser });
}

// Delete a user
export async function deleteUser(req, res) {
  const { id } = req.params;

  const user = await req.prisma.user.findUnique({ where: { id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Make sure the user is deleting their own profile or is an admin
  if (user.id !== req.user.id && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this user" });
  }

  await req.prisma.user.delete({
    where: { id },
  });

  res.status(200).json({ message: "User deleted" });
}
