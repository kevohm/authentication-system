import cors from "cors";
import express from "express";
import "express-async-errors";
import MySQLSessionStore from "express-mysql-session";
import session from "express-session";
import { ErrorHandler } from "./src/middleware/error.middleware.js";

import { dbOptions } from "./src/config/mysql.config.js";
import { prisma } from "./src/config/prisma.config.js";
import { authRouter } from "./src/routes/auth.route.js";
import { postRouter } from "./src/routes/post.route.js";
import { verifyData } from "./src/utils/auth.utils.js";

import { enhance } from "@zenstackhq/runtime";
import { userRouter } from "./src/routes/user.route.js";

const MySQLStore = MySQLSessionStore(session);

const app = express();
const sessionStore = new MySQLStore(dbOptions);
var sess = {
  key: "user_sid",
  secret: "session_cookie_secret",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hr
  },
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(express.json());

app.use(async (req, res, next) => {
  if (req.session.isAuthenticated) {
    const token = req.session.token;
    const { id } = await verifyData(token);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      req.session.destroy();
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
  }
  req.db = prisma
  req.prisma = enhance(prisma, { user: req.user });
  next();
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.use(ErrorHandler);

const PORT = process.env.PORT || 4000;
const environment = process.env.NODE_ENV === "production" ? "live" : "locally";

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT} (${environment})`);
});
