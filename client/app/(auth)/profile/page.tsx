"use client";

import { useState, useEffect } from "react";
import { db, auth } from "../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      const docRef = doc(db, "profiles", user.uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data() || {};
        setUsername(data.username || "");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const updateProfile = async () => {
    if (!user) return alert("Please login first");
    const docRef = doc(db, "profiles", user.uid);
    await updateDoc(docRef, { username });
    alert("Profile updated!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4">
        <label className="block">Username</label>
        <input
          className="border p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 mt-2" onClick={updateProfile}>
        Save
      </button>
    </div>
  );
}
