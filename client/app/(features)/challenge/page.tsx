"use client";

import { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const tasks = ["Day 1: Reflect", "Day 2: Cultural Sharing", "Day 3: Mindfulness"];

export default function ChallengePage() {
  const [progress, setProgress] = useState<number>(0);
  const [user] = useAuthState(auth);

  const markTaskComplete = async (taskIndex: number) => {
    if (!user) return alert("Please sign in first");
    try {
      await addDoc(collection(db, "challenges"), {
        userId: user.uid,
        taskIndex,
        timestamp: new Date(),
      });
      setProgress((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Gamified Growth Challenge</h1>
      <p>Progress: {progress}/{tasks.length}</p>
      <div className="mt-4 space-y-2">
        {tasks.map((task, i) => (
          <button
            key={i}
            className="block bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => markTaskComplete(i)}
          >
            {task}
          </button>
        ))}
      </div>
    </div>
  );
}
