"use client";

import { useEffect } from "react";
import { Chart } from "chart.js/auto";

interface MoodChartProps {
  data: number[];
  labels: string[];
}

export default function MoodChart({ data, labels }: MoodChartProps) {
  useEffect(() => {
    const ctx = document.getElementById("moodChart") as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Mood",
              data,
              borderColor: "#3b82f6",
              fill: false,
              tension: 0.1,
            },
          ],
        },
      });
    }
  }, [data, labels]);

  return (
    <div className="max-w-md mx-auto">
      <canvas id="moodChart" />
    </div>
  );
}
