"use client";

import { useState, useEffect } from "react";
import { db, auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from "firebase/firestore";
import MoodHistory from "./MoodHistory";

const moods = ["😢", "😐", "😊"];

export default function MoodTrackerPage() {
  const [user] = useAuthState(auth);
  const [moodLogs, setMoodLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const colRef = collection(db, "moods");
    const q = query(colRef, where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let data: any[] = [];
      snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setMoodLogs(data);
    });
    return () => unsubscribe();
  }, [user]);

  const saveMood = async (index: number) => {
    if (!user) return alert("Please login first");
    try {
      await addDoc(collection(db, "moods"), {
        userId: user.uid,
        moodIndex: index,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Mood Tracker</h1>
      <div className="flex space-x-2 my-4">
        {moods.map((emoji, i) => (
          <button
            key={i}
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => saveMood(i)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <MoodHistory logs={moodLogs} moods={moods} />
    </div>
  );
}
