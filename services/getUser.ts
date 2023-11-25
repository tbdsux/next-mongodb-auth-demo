import { DEFAULT_COOKIE_NAME } from "@/lib/cookies";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";
import { cookies } from "next/headers";
import { cache } from "react";

const getUser = cache(async () => {
  const authToken = cookies().get(DEFAULT_COOKIE_NAME)?.value;
  if (!authToken) {
    return { user: null };
  }

  let validateToken = verifyToken(authToken);
  if (!validateToken.success) {
    return { user: null, message: validateToken.message };
  }

  const user = await User.findById(validateToken.data.id).exec();
  return {
    user: {
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      verified: Boolean(user.verified),
    },
  };
});

export { getUser };
