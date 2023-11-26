import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center py-40 relative">
      <div className="absolute top-5 right-5">
        <a
          href="https://github.com/tbdsux/next-mongodb-auth-demo"
          target="_blank"
          rel="no-noopener noreferrer"
          title="View project on Github"
        >
          <Image
            src="https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/github.svg"
            alt="View on Github"
            width={25}
            height={25}
          />
        </a>
      </div>

      <div className="text-center w-5/6 mx-auto">
        <h2 className="text-3xl font-black leading-loose">
          Next.js with MongoDB User Authentication Demo
        </h2>
        <p className="my-2 text-lg">
          This is a sample project to implement a user authentiaction with
          MongoDB from scratch with Next.js&apos; App Router
        </p>
        <p className="text-sm italic">Project is not perfect...</p>

        <div className="mt-12">
          <Link
            href="/dashboard"
            className="mx-2 py-4 px-8 font-bold rounded-lg bg-gray-600 hover:bg-gray-700 text-white duration-300"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/auth/login"
            className="mx-2 py-4 px-8 font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
