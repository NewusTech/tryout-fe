import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { useParams } from 'next/navigation';
import { useGetHistoryUserId } from '@/services/api';

// Registrasi komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const TiuChart = () => {
    // Integrasi API
    const { id } = useParams();
    const { data: dataUser } = useGetHistoryUserId(id as string);
    // Data untuk grafik
    const data = {
        labels: ['Benar', 'Salah'],
        datasets: [
            {
                data: [40, 10], // Nilai benar dan salah
                backgroundColor: ['#4A055B', '#B8860E'], // Warna masing-masing segmen
                borderWidth: 0, // Hilangkan garis tepi
            },
        ],
    };

    const options = {
        cutout: '65%', // Ukuran lubang tengah grafik
        plugins: {
            legend: {
                display: false, // Sembunyikan legenda
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) =>
                        `${tooltipItem.label}: ${tooltipItem.raw}`, // Menampilkan label dan nilai
                },
                backgroundColor: '#5E239D',
                bodyColor: '#FFF',
                displayColors: false, // Hilangkan ikon warna kecil
            },
        },
    };

    return (
        <div className="w-full mx-auto bg-white border border-gray-100 p-4 rounded-lg shadow-md">
            {/* Judul */}
            <h2 className="text-center font-bold text-lg mb-4">TIU</h2>
            {/* Statistik */}
            <div className="wrap flex justify-between items-center">
                <div className="text-sm mb-4">
                <p>Skor Anda: <span className="font-bold">{dataUser?.data?.typeQuestionSummary[1].totalScore ??  "-"}</span></p>
                <p>Jumlah Soal: <span className="font-bold">{dataUser?.data?.typeQuestionSummary[1].totalQuestions ??  "-"}</span></p>
                    <p className="text-red-500">
                        Soal Tidak Terjawab: <span className="font-bold">50</span>
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-3 items-center">
                        <div className="h-[20px] w-[20px] bg-primary"></div>
                        <div className="">Benar</div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="h-[20px] w-[20px] bg-secondary"></div>
                        <div className="">Salah</div>
                    </div>
                </div>
            </div>
            {/* Grafik Donut */}
            <div className="h-[200px] flex justify-center">
                <Doughnut data={data} options={options} />
            </div>

        </div>
    );
};

export default TiuChart;
