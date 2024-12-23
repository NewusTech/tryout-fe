"use client"
import PaginationTable from '@/components/Custom/PaginationTable';
import Navbar from '@/components/User/Home/Navbar';
import DataTable from '@/components/User/Note/DataTable';
import { useState } from 'react';

const NotePage = () => {
    // Define table headers
    const tableHeaders = ["No", "Tanggal", "Catatan"];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    };

    // serach
    const [search, setSearch] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to page 1
    };
    // serach

    // INTEGRASI
    // const { data } = useGetTypePayment(currentPage, search,);
    // INTEGRASI

    const dummyData = [
        {
            id: 1,
            tanggal: "Senin, 12-12-2024",
            catatan: "Sudah sangat baik, diperbaiki pada materi TWK dan TIU"
        },
        {
            id: 2,
            tanggal: "Selasa, 13-12-2024",
            catatan: "Perlu latihan tambahan pada materi TKP dan TIU"
        },
        {
            id: 3,
            tanggal: "Rabu, 14-12-2024",
            catatan: "Hasil sudah memuaskan, fokus pada simulasi ujian"
        },
        {
            id: 4,
            tanggal: "Kamis, 15-12-2024",
            catatan: "Evaluasi penguasaan materi TWK perlu ditingkatkan"
        },
        {
            id: 5,
            tanggal: "Jumat, 16-12-2024",
            catatan: "Pemahaman TIU meningkat, lanjutkan pembahasan soal sulit"
        },
        {
            id: 6,
            tanggal: "Sabtu, 17-12-2024",
            catatan: "Sudah baik, tinjau kembali soal TKP untuk hasil maksimal"
        }
    ];


    return (
        <div >
            <div className="text-srBlack overflow-x-hidden min-h-screen">
                <Navbar />
                <div className="wrap-alll container mx-auto pt-[120px]">
                    <div className="md:text-2xl text-xl font-semibold my-4 text-primary">
                        Catatan
                    </div>
                </div>
                <div className="wrap flex container mx-auto flex-col gap-4">
                    <div className="Table ">
                        <DataTable
                            headers={tableHeaders}
                            data={dummyData}
                            currentPage={currentPage}
                            search={search}
                        />
                    </div>
                    {/* Pagination */}
                    <div className="pagi flex items-center justify-center md:justify-end mt-3 pb-5 lg:pb-0">
                        <PaginationTable
                            currentPage={currentPage}
                            totalPages={5}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotePage;
