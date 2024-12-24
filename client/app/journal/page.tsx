"use client";
import { useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [user] = useAuthState(auth);

  const saveEntry = async () => {
    if (!user) {
      alert("You must be logged in to save a journal entry.");
      return;
    }
    try {
      await addDoc(collection(db, "journalEntries"), {
        text: entry,
        userId: user.uid,
        timestamp: new Date(),
      });
      setEntry("");
      alert("Journal entry saved!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Journal</h1>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="w-full border p-2"
        placeholder="Write your thoughts..."
      ></textarea>
      <button onClick={saveEntry} className="mt-4 bg-blue-500 text-white px-4 py-2">
        Save Entry
      </button>
    </div>
  );
}
