import { DEFAULT_COOKIE_NAME } from "@/lib/cookies";
import dbConnect from "@/lib/dbConnect";
import { verifyToken } from "@/lib/jwt";
import User from "@/models/User";
import { _User } from "@/typings/user";
import { cookies } from "next/headers";
import { cache } from "react";

export interface GetUserService {
  user?: _User | null;
  message?: string;
}

const getUser = cache(async (): Promise<GetUserService> => {
  const authToken = cookies().get(DEFAULT_COOKIE_NAME)?.value;
  if (!authToken) {
    return { user: null };
  }

  let validateToken = verifyToken(authToken);
  if (!validateToken.success) {
    return { user: null, message: validateToken.message };
  }

  await dbConnect();

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
