import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");
const emailDomain = process.env.RESEND_DOMAIN ?? "";

if (emailDomain === "") {
  throw new Error("Please setup the domain to use for resend");
}

export { emailDomain, resend };
