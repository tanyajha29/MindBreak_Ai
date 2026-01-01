import jwt from "jsonwebtoken";

export const generateToken = (id: number) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
