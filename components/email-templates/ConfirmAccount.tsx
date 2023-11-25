export default function ConfirmAccount({ link }: { link: string }) {
  return (
    <main>
      <h3>Confirm Account</h3>
      <p>Please confirm your account by following the following link:</p>
      <a href={link}>{link}</a>
    </main>
  );
}
