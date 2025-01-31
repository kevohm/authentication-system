import { db } from "../config/prisma.config.js";
import { UserSchema } from "../model/user.model.js";
import { encryptData, verifyPassword } from "../utils/auth.utils.js";

export async function currentUser(req, res) {
  const user = await db.user.findUnique({ where: { id: req.user.id } });
  res.status(201).json({ message: "User details", user });
}
export async function signup(req, res) {
  const data = await UserSchema.parseAsync(req.body);
  const { email } = data;
  const user = await req.db.user.findUnique({ where: { email } });
  if (user) {
    return res.status(401).json({ message: "User already exists" });
  }
  await req.prisma.user.create({
    data
  });
  res.status(201).json({ message: "User Created" });
}

export async function login(req, res) {
  const { email, password } = await UserSchema.pick({
    email: true,
    password: true,
  }).parseAsync(req.body);
  if (req.session.isAuthenticated) {
    return res.status(200).json({ message: "Already Logged In" });
  }
  if (!email || !password) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const user = await req.db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const validPassword = await verifyPassword(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const token = await encryptData({ id: user.id });
  req.session.token = token;
  req.session.isAuthenticated = true;
  res.status(200).json({ message: "Login Success" });
}

export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "An error occurred" });
    }
    return res.status(200).json({ message: "Logged Out" });
  });
}
