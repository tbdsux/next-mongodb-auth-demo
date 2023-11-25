export default function ForgotPassword({ link }: { link: string }) {
  return (
    <main>
      <h3>Reset Password</h3>
      <p>Hello! You have requested to reset the password to your account.</p>
      <p>Follow the link to be able to set a new password:</p>
      <a href={link}>{link}</a>

      <p>If you haven't requested to reset your password, ignore this email.</p>
    </main>
  );
}
