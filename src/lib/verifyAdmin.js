import jwt from "jsonwebtoken";

export function verifyAdmin(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return false;

  const token = authHeader.split(" ")[1];
  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}
