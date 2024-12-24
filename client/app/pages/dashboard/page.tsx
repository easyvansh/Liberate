"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Welcome to Liberate</h1>
      <p className="mb-6 text-gray-700">Empower your mind and connect with others.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <Link href="/journal" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">
          Reflective Journaling
        </Link>
        <Link href="/mood-tracker" className="bg-green-500 text-white p-4 rounded hover:bg-green-600">
          Emotional Tracker
        </Link>
        <Link href="/forum" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600">
          Cultural Forum
        </Link>
        <Link href="/challenge" className="bg-orange-500 text-white p-4 rounded hover:bg-orange-600">
          Growth Challenges
        </Link>
      </div>
    </div>
  );
}
