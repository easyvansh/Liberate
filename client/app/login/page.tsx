"use client";

import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation"; // Correct import for App Router

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // Track logged-in user
  const router = useRouter();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  if (user) {
    // If user is logged in, show personalized content
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
          <p>You are now logged in!</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If user is not logged in, show login form
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="p-6 bg-white shadow-md rounded"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
