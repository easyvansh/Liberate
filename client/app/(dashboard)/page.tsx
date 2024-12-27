"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Link from "next/link";

export default function DashboardPage() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
      {user ? (
        <p className="my-2">Logged in as {user.email}</p>
      ) : (
        <p>Please log in to see your dashboard.</p>
      )}
      <div className="mt-4 space-x-4">
        <Link href="/journal">Go to Journal</Link>
        <Link href="/mood-tracker">Track Mood</Link>
        <Link href="/forum">Visit Forum</Link>
        <Link href="/challenge">View Challenges</Link>
      </div>
    </div>
  );
}
