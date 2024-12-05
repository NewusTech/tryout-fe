import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from "chart.js";
import { useParams } from "next/navigation";
import { useGetUserDetailId } from "@/services/api";

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const PerformaChart = () => {
  // Ambil parameter slug dari URL
  const { slug } = useParams();
  const { data, isLoading } = useGetUserDetailId(slug as string);

  // Menyiapkan data chart
  const chartData = React.useMemo(() => {
    if (!data || !data.data?.performa) return { labels: [], datasets: [] };

    const labels = data.data.performa.map((item: any) => item.nama_tryout || "Unknown Tryout");
    const scores = data.data.performa.map((item: any) => (item.skor !== null ? parseFloat(item.skor) : 0));

    return {
      labels,
      datasets: [
        {
          label: "Nilai",
          data: scores,
          backgroundColor: "#4A055B",
          borderRadius: 4,
        },
      ],
    };
  }, [data]);

  // ID untuk masing-masing bar
  const tryOutIds = data?.data?.performa?.map((item: any) => item.id) || [];

  // Opsi chart
  const options = {
    responsive: true,
    indexAxis: "y" as const,
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const tryOutId = tryOutIds[index];
        if (tryOutId) {
          window.location.href = `/user/user/detail/statistik/${tryOutId}`;
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const nilai = tooltipItem.raw;
            return [`Nilai: ${nilai}`, "Klik untuk detail"];
          },
        },
        backgroundColor: "#5E239D",
        titleColor: "#FFF",
        bodyColor: "#FFF",
        bodyFont: {
          size: 14,
        },
        displayColors: false,
        padding: 8,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100, // Nilai maksimum sumbu X
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  // Tampilkan loader saat data belum siap
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto p-4 pt-[40px] rounded-lg bg-[#FCF4F1]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PerformaChart;
