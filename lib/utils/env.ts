const APP_URL =
  process.env.NODE_ENV === "development"
    ? `http://${process.env.VERCEL_URL}`
    : `https://${process.env.VERCEL_URL}`;

const SECRET_KEY = process.env.SECRET_KEY!;
if (!SECRET_KEY) {
  throw new Error("No SECRET_KEY in environment variables!");
}

export { APP_URL, SECRET_KEY };
