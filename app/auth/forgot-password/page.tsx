import ForgotPasswordForm from "./form";

export default function AuthForgotPasswordPage() {
  return (
    <main className="flex items-center justify-center py-32">
      <div className="w-5/6 md:w-1/2 xl:w-1/3 mx-auto">
        <h3 className="text-xl font-bold">Forgot Password</h3>
        <p className="text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo,
          deserunt. A, iste perferendis. Quae, mollitia.
        </p>

        <ForgotPasswordForm />
      </div>
    </main>
  );
}
