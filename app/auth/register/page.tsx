import RegisterForm from "./form";

export default function AuthRegisterPage() {
  return (
    <main className="flex items-center justify-center py-32">
      <div className="w-1/3 mx-auto">
        <h3 className="text-xl font-bold">Create a New Account</h3>
        <p className="text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo,
          deserunt. A, iste perferendis. Quae, mollitia.
        </p>

        <RegisterForm />
      </div>
    </main>
  );
}
