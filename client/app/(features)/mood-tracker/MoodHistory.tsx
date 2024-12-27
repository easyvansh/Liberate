"use client";

import MoodChart from "../../components/Moodchart"

interface MoodLog {
  moodIndex: number;
  timestamp: any;
}

export default function MoodHistory({
  logs,
  moods,
}: {
  logs: MoodLog[];
  moods: string[];
}) {
  // Sort logs by timestamp (ascending or descending)
  const sorted = [...logs].sort(
    (a, b) => a.timestamp?.seconds - b.timestamp?.seconds
  );

  const data = sorted.map((log) => log.moodIndex);
  const labels = sorted.map((log) =>
    log.timestamp?.toDate()?.toLocaleDateString() ?? "N/A"
  );

  return (
    <div>
      <h2 className="text-xl mb-2">Mood History</h2>
      {logs.length === 0 ? (
        <p>No mood logs yet.</p>
      ) : (
        <MoodChart data={data} labels={labels} />
      )}
    </div>
  );
}
