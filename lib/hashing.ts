import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export { comparePassword, hashPassword };
