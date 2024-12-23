import { useGetPerformaUserId } from '@/services/api';
import { useParams } from 'next/navigation';
import React from 'react'

const TkpChart = () => {
    // Integrasi API
    const { id } = useParams();
    const { data: dataUser } = useGetPerformaUserId(id as string);
    return (
        <div className="w-full h-full mx-auto bg-white border border-gray-100 p-4 rounded-lg shadow-md">
            {/* Judul */}
            <h2 className="text-center font-bold text-lg mb-4">TKP</h2>
            {/* Statistik */}
            <div className="text-sm flex flex-col gap-1 mb-4">
            <p>Skor Anda: <span className="font-bold">{dataUser?.data?.typeQuestionSummary[2]?.totalScore ?? "-"}</span></p>
            <p>Jumlah Soal: <span className="font-bold">{dataUser?.data?.typeQuestionSummary[2]?.totalQuestions ?? "-"}</span></p>
                
            </div>
        </div>
    )
}

export default TkpChart