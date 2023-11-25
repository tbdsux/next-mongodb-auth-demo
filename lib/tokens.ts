// NOTE: this is used by the Tokens model
// TODO: MERGE THIS TO THE ./jwt.ts file

import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./utils/env";

function generateJWTToken(authToken: string) {
  return jwt.sign({ token: authToken }, SECRET_KEY, { expiresIn: "30m" });
}

function verifyJWTToken(token: string) {
  try {
    let decodedToken = jwt.verify(token, SECRET_KEY, {});
    return { success: true, data: (decodedToken as any).token as string };
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

function toBase64(jwtToken: string) {
  return Buffer.from(jwtToken).toString("base64");
}

function fromBase64(base64Str: string) {
  return Buffer.from(base64Str, "base64").toString("utf-8");
}

export { fromBase64, generateJWTToken, toBase64, verifyJWTToken };
