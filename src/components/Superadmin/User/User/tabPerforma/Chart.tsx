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

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const PerformaChart = () => {
  const data = {
    labels: ["Try Out 1", "Try Out 2", "Try Out 3", "Try Out 4", "Try Out 5", "Try Out 6"],
    datasets: [
      {
        label: "Nilai",
        data: [300, 200, 400, 450, 500, 400], // Data nilai
        backgroundColor: "#4A055B", // Warna batang
        borderRadius: 4, // Sudut melengkung batang
      },
    ],
  };

  // ID untuk masing-masing bar
  const tryOutIds = [1, 2, 3, 4, 5, 6];

  const options = {
    responsive: true,
    indexAxis: "y" as const, // Membuat grafik menjadi horizontal
    onClick: (event: any, elements: any) => {
      // Periksa apakah bar diklik
      if (elements.length > 0) {
        const index = elements[0].index; // Mendapatkan index bar yang diklik
        const tryOutId = tryOutIds[index]; // Mengambil ID yang sesuai
        window.location.href = `/tryout/detail/${tryOutId}`; // Navigasi ke URL
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const nilai = tooltipItem.raw; // Nilai dari dataset
            return [`Nilai: ${nilai}`, "Klik untuk detail"]; // Tooltip multiline
          },
        },
        backgroundColor: "#5E239D", // Warna latar belakang tooltip
        titleColor: "#FFF", // Warna teks judul tooltip
        bodyColor: "#FFF", // Warna teks isi tooltip
        bodyFont: {
          size: 14, // Ukuran font isi tooltip
        },
        displayColors: false, // Hilangkan kotak warna kecil di tooltip
        padding: 8, // Padding dalam tooltip
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 600, // Menyesuaikan nilai maksimum pada sumbu X
        ticks: {
          stepSize: 100, // Jarak antar garis
        },
      },
    },
    
  };

  return (
    <div className=" w-full mx-auto p-4 pt-[40px] rounded-lg bg-[#FCF4F1]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PerformaChart;
