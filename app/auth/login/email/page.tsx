import LoginForm from "./form";

export default function AuthLoginWithEmailPage() {
  return (
    <main className="flex items-center justify-center py-32">
      <div className="w-5/6 md:w-1/2 xl:w-1/3 mx-auto">
        <h3 className="text-xl font-bold">Login With Your Email Address</h3>
        <p className="text-gray-500">
          If you already have an account, you can use it to login using your
          email address without needing to use your password.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
