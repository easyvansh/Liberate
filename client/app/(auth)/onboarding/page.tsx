"use client";

import { useState } from "react";
import { db, auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [interests, setInterests] = useState<string[]>([]);

  const allInterests = ["Mindfulness", "Cultural Identity", "Healing", "Resilience"];

  const handleSelect = async () => {
    if (!user) return alert("Please sign in first");
    try {
      await setDoc(doc(db, "profiles", user.uid), {
        interests,
      });
      router.push("/pages/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleInterest = (i: string) => {
    if (interests.includes(i)) {
      setInterests(interests.filter((x) => x !== i));
    } else {
      setInterests([...interests, i]);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Onboarding</h1>
      <p>Select your interests to personalize prompts and challenges:</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {allInterests.map((i) => (
          <button
            key={i}
            className={`px-4 py-2 border ${
              interests.includes(i) ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => toggleInterest(i)}
          >
            {i}
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2"
        onClick={handleSelect}
      >
        Save
      </button>
    </div>
  );
}
