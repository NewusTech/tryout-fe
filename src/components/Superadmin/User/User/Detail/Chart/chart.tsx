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
import { useParams } from 'next/navigation';
import { useGetPerformaUserId } from '@/services/api';

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const BarChart = () => {
  // Integrasi API
  const { id } = useParams();
  const { data : dataUser } = useGetPerformaUserId(id as string);

  const data = {
    labels: ['TWK', 'TIU', 'TKP'], // Label pada sumbu X
    datasets: [
      {
        label: 'Nilai',
        data: [dataUser?.data?.typeQuestionSummary[0]?.totalScore, dataUser?.data?.typeQuestionSummary[1]?.totalScore, dataUser?.data?.typeQuestionSummary[2]?.totalScore], // Data nilai
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
    <div className="w-[270px] md:w-full h-full mx-auto p-4 pt-[40px] rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
