export async function authMiddleware(req, res, next) {
  if (!req.user) {
    req.session.destroy();
    return res.status(401).json({ message: "Unauthorized" });
  }
  return next();
}
