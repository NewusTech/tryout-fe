import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const BarChart = () => {
  const data = {
    labels: ['TIU', 'TKP', 'TWK'], // Label pada sumbu X
    datasets: [
      {
        label: 'Nilai',
        data: [183, 90, 183], // Data nilai
        backgroundColor: '#4A055B', // Warna batang
        borderRadius: 4, // Sudut melengkung batang
      },
    ],
  };

  const kkmData = [150, 80, 160]; // Data KKM untuk tiap kategori

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const nilai = tooltipItem.raw; // Nilai dari dataset
            const kkm = kkmData[tooltipItem.dataIndex]; // KKM berdasarkan index data
            return [`Nilai: ${nilai}`, `KKM: ${kkm}`]; // Tooltip multiline
          },
        },
        backgroundColor: '#5E239D', // Warna latar belakang tooltip
        titleColor: '#FFF', // Warna teks judul tooltip
        bodyColor: '#FFF', // Warna teks isi tooltip
        bodyFont: {
          size: 14, // Ukuran font isi tooltip
        },
        displayColors: false, // Hilangkan kotak warna kecil di tooltip
        padding: 8, // Padding dalam tooltip
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 200, // Menyesuaikan nilai maksimum pada sumbu Y
        ticks: {
          stepSize: 45, // Jarak antar garis
        },
      },
    },
  };

  return (
    <div className="w-full h-full mx-auto p-4 pt-[40px] rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
