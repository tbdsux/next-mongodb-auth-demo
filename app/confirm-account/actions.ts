import { fromBase64, verifyJWTToken } from "@/lib/tokens";
import Tokens from "@/models/Tokens";
import User from "@/models/User";

async function confirmAccountWithToken(token: string) {
  const decodedToken = fromBase64(token);

  const verifiedToken = verifyJWTToken(decodedToken);
  if (!verifiedToken.success) {
    return { success: false, message: "Token has expired or is invalid." };
  }

  const authToken = verifiedToken.data!;

  // Check token from db
  const _tok = await Tokens.findOne({
    token: authToken,
    purpose: "confirm-account",
  }).exec();
  if (!_tok) {
    return { success: false, message: "Token has expired or is invalid." };
  }

  const tokUserId = _tok.userId;

  // Update the user
  await User.updateOne({ _id: tokUserId }, { verified: true });

  // // delete all other tokens with userid and same purpose
  const docs = await Tokens.deleteMany({
    purpose: "confirm-account",
    userId: tokUserId,
  });
  console.log(docs);

  return { success: true };
}

export { confirmAccountWithToken };
