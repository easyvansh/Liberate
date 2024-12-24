"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";
import { signOut } from "firebase/auth";

export default function Home() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">Welcome to Liberate</h1>
        <p className="text-lg mb-6">
          Empower your mind, reflect deeply, and connect with others.
        </p>

        {!user ? (
          // Show signup/login links if not logged in
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Log In
            </Link>
          </div>
        ) : (
          // Show navigation links if logged in
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Welcome back, {user.email}!
            </h2>
            <div className="flex flex-col space-y-4">
              <Link
                href="/journal"
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              >
                Reflective Journaling
              </Link>
              <Link
                href="/mood-tracker"
                className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600"
              >
                Mood Tracker
              </Link>
              <Link
                href="/forum"
                className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
              >
                Cultural Storytelling Forum
              </Link>
              <Link
                href="/challenge"
                className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
              >
                Growth Challenges
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
