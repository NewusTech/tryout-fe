import React from 'react'

const TkpChart = () => {
    return (
        <div className="w-full h-full mx-auto bg-white border border-gray-100 p-4 rounded-lg shadow-md">
            {/* Judul */}
            <h2 className="text-center font-bold text-lg mb-4">TWK</h2>
            {/* Statistik */}
            <div className="text-sm flex flex-col gap-1 mb-4">
                <p>Skor Anda : <span className="font-bold">150</span></p>
                <p>Jumlah Soal : <span className="font-bold">50</span></p>
                <p className="text-primary">
                    5 Point : <span className="font-bold">30</span>
                </p>
                <p className="text-primary">
                    4 Point : <span className="font-bold">30</span>
                </p>
                <p className="text-primary">
                    3 Point : <span className="font-bold">30</span>
                </p>
                <p className="text-primary">
                    2 Point : <span className="font-bold">30</span>
                </p>
                <p className="text-primary">
                    1 Point : <span className="font-bold">30</span>
                </p>
            </div>
        </div>
    )
}

export default TkpChart