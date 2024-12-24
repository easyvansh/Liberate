"use client";

import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MoodTracker() {
  const [user] = useAuthState(auth);
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);

  const moods = [
    { emoji: "😢", label: "Sad" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😊", label: "Happy" },
    { emoji: "😁", label: "Excited" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😡", label: "Angry" },
  ];

  const saveMood = async () => {
    if (!user) {
      alert("You must be logged in to log a mood.");
      return;
    }
    if (mood === null) {
      alert("Please select a mood.");
      return;
    }

    try {
      await addDoc(collection(db, "moods"), {
        mood,
        note,
        userId: user.uid,
        timestamp: new Date(),
      });
      alert("Mood saved!");
      setMood(null);
      setNote("");
      fetchMoodHistory(); // Refresh mood history
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  };

  const fetchMoodHistory = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, "moods"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const moods = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMoodHistory(moods);
    } catch (error) {
      console.error("Error fetching mood history:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMoodHistory();
    }
  }, [user]);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">Mood Tracker</h1>

      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">How are you feeling today?</h2>
        <div className="grid grid-cols-3 gap-4">
          {moods.map((m, index) => (
            <button
              key={index}
              className={`px-4 py-2 border rounded ${
                mood === m.label ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setMood(m.label)}
            >
              <span className="text-2xl">{m.emoji}</span>
              <p className="text-sm mt-1">{m.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">Add a Note (Optional):</h2>
        <textarea
          className="w-full p-2 border rounded"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write about your day..."
        ></textarea>
      </div>

      <button
        onClick={saveMood}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Save Mood
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Mood History</h2>
        {moodHistory.length > 0 ? (
          <ul className="space-y-4">
            {moodHistory.map((entry) => (
              <li
                key={entry.id}
                className="p-4 bg-gray-100 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium">{entry.mood}</p>
                  <p className="text-sm text-gray-600">{entry.note || "No note added"}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(entry.timestamp.toDate()).toLocaleString()}
                  </p>
                </div>
                <span className="text-2xl">{moods.find((m) => m.label === entry.mood)?.emoji}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No mood entries yet.</p>
        )}
      </div>
    </div>
  );
}
