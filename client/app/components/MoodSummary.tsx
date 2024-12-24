"use client";

import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MoodSummary() {
  const [user] = useAuthState(auth);
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      if (user) {
        const q = query(
          collection(db, "moods"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        setMoodHistory(querySnapshot.docs.map((doc) => doc.data()));
      }
    };
    fetchMoodHistory();
  }, [user]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Weekly Mood</h2>
      {moodHistory.length > 0 ? (
        <ul>
          {moodHistory.slice(0, 7).map((mood, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{new Date(mood.timestamp.toDate()).toLocaleDateString()}</span>
              <span>{mood.mood}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No mood logs yet. Start tracking today!</p>
      )}
    </div>
  );
}
