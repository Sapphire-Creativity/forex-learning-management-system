import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function WeeklyActivityChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(15, 82, 186, 0.4)");
    gradient.addColorStop(1, "rgba(15, 82, 186, 0.0)");

    // Apply gradient to filled dataset
    chart.data.datasets.forEach((dataset) => {
      if (dataset.fill) dataset.backgroundColor = gradient;
    });
    chart.update();
  }, []);

  const data = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
    ],
    datasets: [
      {
        label: "Lessons Completed",
        data: [2, 4, 3, 5, 7, 6, 8, 9],
        borderColor: "#0066FF",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "#0066FF",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        borderWidth: 1.5,
      },
      {
        label: "Quizzes Taken",
        data: [1, 2, 1, 3, 2, 4, 3, 5],
        borderColor: "#0066FF",
        borderDash: [4, 1],
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "#0066FF",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151",
          font: { size: 10, weight: "400" },
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#f3f4f6",
        padding: 8,
        borderColor: "#0066FF",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280", font: { size: 9 } },
        grid: { color: "#e5e7eb" },
      },
      y: {
        ticks: { color: "#6b7280", font: { size: 9 } },
        grid: { color: "#f3f4f6" },
      },
    },
    animation: {
      duration: 1800,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="scrollbar-hide bg-white rounded-2xl h-[300px] flex flex-col scrollbar-hide">
      {/* Header */}
      <div className="p-3 border-b border-gray-100">
        <h6 className="text-sm md:text-xl ml-2 text-primary-dark">Activity </h6>
      </div>

      {/* Chart */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
        <div className="h-[280px] min-w-[500px]">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
