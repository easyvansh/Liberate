"use client"
import { useState } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Challenge() {
  const [user] = useAuthState(auth);
  const [progress, setProgress] = useState(0);

  const tasks = ['Day 1: Reflect', 'Day 2: Cultural Sharing', 'Day 3: Mindfulness'];

  const markTaskComplete = async (taskIndex) => {
    if (!user) return alert('Login required');
    try {
      await addDoc(collection(db, 'challenges'), {
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
    <div className="p-4">
      <h1 className="text-2xl mb-4">7-Day Mindfulness Challenge</h1>
      <p>Progress: {progress}/{tasks.length}</p>
      <div>
        {tasks.map((task, i) => (
          <button key={i} onClick={() => markTaskComplete(i)}>
            {task}
          </button>
        ))}
      </div>
    </div>
  );
}
