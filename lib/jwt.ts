import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./utils/env";

export interface BaseJWTUser {
  id: string;
  email: string;
}

function generateToken(data: BaseJWTUser) {
  return jwt.sign({ data }, SECRET_KEY, { expiresIn: "2 days" });
}

function verifyToken(
  token: string
): { success: true; data: BaseJWTUser } | { success: false; message: string } {
  try {
    let decodedToken = jwt.verify(token, SECRET_KEY, {});
    return { success: true, data: (decodedToken as any).data as BaseJWTUser };
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return { success: false, message: "Invalid JWT Token!" };
    }

    if (err instanceof jwt.TokenExpiredError) {
      return { success: false, message: "JWT Token has expired!" };
    }

    return { success: false, message: "Failed to verify token!" };
  }
}

export { generateToken, verifyToken };
