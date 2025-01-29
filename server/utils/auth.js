import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const hash = bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, hash);
  return hashPassword;
};
export const verifyPassword = async (password, hashedPassword) =>{
  console.log(password, hashPassword)
  return await bcrypt.compare(password, hashedPassword)
}

export const encryptData = async (data) =>
  await jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });

export const verifyData = async (token) =>
  await jwt.verify(token, process.env.JWT_SECRET);
