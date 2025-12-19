import jwt from "jsonwebtoken";

export function signToken() {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
}
