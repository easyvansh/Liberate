"use client";

import { useState } from "react";
import { getAIReflection } from "../../lib/openai";

export default function Reflections() {
  const [text, setText] = useState("");
  const [reflection, setReflection] = useState("");

  const handleReflect = async () => {
    if (!text.trim()) return;
    const response = await getAIReflection(text);
    setReflection(response);
  };

  return (
    <div className="border p-2">
      <h2 className="text-lg font-bold mb-2">AI Reflections</h2>
      <textarea
        className="w-full border p-2 text-black"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a journal entry snippet here..."
      />
      <button className="bg-purple-500 text-white px-4 py-2 mt-2" onClick={handleReflect}>
        Reflect
      </button>
      {reflection && (
        <div className="mt-2 bg-gray-100 p-2 rounded">
          <p>{reflection}</p>
        </div>
      )}
    </div>
  );
}
