"use client"; // This marks the component as a client component

import { useRouter } from "next/navigation"; // Correct import for App Router
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter(); // Correctly use `useRouter` from `next/navigation`
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login"); // Navigate to login page after successful sign-up
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSignUp}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
    </div>
  );
}
