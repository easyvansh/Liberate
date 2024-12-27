"use client";

import { useEffect, useState } from "react";

interface JournalEntryProps {
  text: string;
  timestamp: any; // Date or Firestore Timestamp
}

export default function JournalEntry({ text, timestamp }: JournalEntryProps) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (timestamp && timestamp.toDate) {
      setFormattedDate(timestamp.toDate().toLocaleString());
    } else if (timestamp instanceof Date) {
      setFormattedDate(timestamp.toLocaleString());
    }
  }, [timestamp]);

  return (
    <div className="border p-2 rounded my-2">
      <p>{text}</p>
      <small className="text-gray-500">Saved on: {formattedDate}</small>
    </div>
  );
}
