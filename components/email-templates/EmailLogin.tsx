export default function EmailLogin({
  name,
  link,
}: {
  name: string;
  link: string;
}) {
  return (
    <main>
      <h3>Welcome {name}</h3>
      <p>
        Please click the link below to login to the website, this link will
        expire in 5 minutes:
      </p>
      <a href={link}>{link}</a>
    </main>
  );
}
