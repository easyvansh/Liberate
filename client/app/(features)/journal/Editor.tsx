"use client";

import { useState } from "react";
import { db, auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Editor() {
  const [entry, setEntry] = useState("");
  const [user] = useAuthState(auth);

  const saveEntry = async () => {
    if (!user) return alert("Login required.");
    if (!entry.trim()) return;

    await addDoc(collection(db, "journalEntries"), {
      text: entry,
      userId: user.uid,
      timestamp: serverTimestamp(),
    });
    setEntry("");
    alert("Entry saved!");
  };

  return (
    <div className="border p-2 mb-4">
      <textarea
        className="w-full p-2 border mb-2"
        rows={4}
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Reflect on your day..."
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={saveEntry}>
        Save
      </button>
    </div>
  );
}
