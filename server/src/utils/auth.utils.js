import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
export const verifyPassword = async (password, hashedPassword) =>{
  return await bcrypt.compare(password, hashedPassword)
}

export const encryptData = async (data) =>
  await jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });

export const verifyData = async (token) =>
  await jwt.verify(token, process.env.JWT_SECRET);
