import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/logo.JPG"
          alt="Liberate logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold">Welcome to Liberate</h1>
        <p className="text-center text-lg sm:text-left">
          Your journey to mental clarity, resilience, and self-discovery begins
          here.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/signup"
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-500 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-solid border-gray-300 transition-colors flex items-center justify-center hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Login
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://easyvansh.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          easyvansh
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/vercel.svg"
            alt="Vercel logo"
            width={16}
            height={16}
          />
          Made by Vansh
        </a>
      </footer>
    </div>
  );
}
