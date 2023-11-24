import LoginForm from "./form";

export default function AuthLoginPage() {
  return (
    <main className="flex items-center justify-center py-32">
      <div className="w-1/3 mx-auto">
        <h3 className="text-xl font-bold">Login To Your Account</h3>
        <p className="text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo,
          deserunt. A, iste perferendis. Quae, mollitia.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
