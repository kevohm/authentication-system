import cors from "cors";
import express from "express";
import "express-async-errors";
import MySQLSessionStore from "express-mysql-session";
import session from "express-session";
import { db } from "./config/db.js";
import { ErrorHandler } from "./middleware/error.middleware.js";
import { UserSchema } from "./model/user.model.js";
import { encryptData, verifyPassword } from "./utils/auth.js";
const MySQLStore = MySQLSessionStore(session);

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "#Kevin123",
  database: "authentication-system",
};

const app = express();
const sessionStore = new MySQLStore(options);
var sess = {
  key: "session_cookie_name",
  secret: "session_cookie_secret",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 1, // 1 day
  },
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.post("/auth/signup", async (req, res) => {
  const { email, password } = await UserSchema.omit({
    phone_number: true,
  }).parseAsync(req.body);
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const user = await db.user.findUnique({ where: { email } });
  if (user) {
    return res.status(401).json({ message: "User already exists" });
  }
  await db.user.create({
    data: {
      email,
      password,
    },
  });
  res.status(201).json({ message: "User Created" });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = await UserSchema.omit({
    phone_number: true,
  }).parseAsync(req.body);
  if (req.session.isAuthenticated) {
    return res.status(200).json({ message: "Already Logged In" });
  }
  if (!email || !password) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const user = await db.user.findUnique({
    where: { email },
    select: {
      id:true,
      email: true,
      password: true,
    },
  });
  console.log(user)
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
});

app.get("/protected", async (req, res) => {
  return res.status(200).json({ message: "Session Set" });
});

app.use(ErrorHandler);

const PORT = process.env.PORT || 3000;
const environment = process.env.NODE_ENV === "production" ? "live" : "locally";

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT} (${environment})`);
});
