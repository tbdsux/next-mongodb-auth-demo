import jwt from "jsonwebtoken";

export interface BaseJWTUser {
  id: string;
  email: string;
}

const SECRET_KEY = process.env.SECRET_KEY!;
if (!SECRET_KEY) {
  throw new Error("No SECRET_KEY in environment variables!");
}

function generateToken(data: BaseJWTUser) {
  return jwt.sign({ data }, SECRET_KEY, { expiresIn: "2 days" });
}

function verifyToken(token: string) {
  try {
    let decodedToken = jwt.verify(token, SECRET_KEY);
    return { success: true, data: decodedToken };
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
