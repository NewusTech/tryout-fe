"use client";
import Navbar from '@/components/User/Home/Navbar';
import Link from 'next/link';
import ArrowBread from '../../../../../../public/assets/icons/ArrowBread';
import { useState } from 'react';
import PaginationTable from '@/components/Custom/PaginationTable';
import DataTable from '@/components/User/MyPackage/History/DataTable';

const History = () => {
    // Define table headers
    const tableHeaders = ["No", "Passing Grade", "Rank", "Skor", "Status", "Durasi Pengerjaan", "Aksi"];

    // Dummy data
    const dummyData = [
        {
            no: 1,
            grade: "A",
            rank: "1",
            skor: "80",
            status: "Lulus",
            durasiPengerjaan : "2 Jam"
        },
        {
            no: 2,
            grade: "A",
            rank: "3",
            skor: "84",
            status: "Lulus",
            durasiPengerjaan : "2 Jam"
        },
        {
            no: 3,
            grade: "B",
            rank: "4",
            skor: "90",
            status: "Tidak Lulus",
            durasiPengerjaan : "2 Jam"
        },
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Search
    const [search, setSearch] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to page 1
    };

    return (
        <div>
            <div className="text-srBlack overflow-x-hidden min-h-screen">
                <Navbar />
                <div className="wrap-alll container mx-auto">
                    <div className="pt-[120px]">
                        {/* Breadcrumb */}
                        <div className="bread flex text-primary gap-3 items-center">
                            <Link href="/my-package">Paket Saya</Link>
                            <div>
                                <ArrowBread />
                            </div>
                            <div className="font-medium">Riwayat</div>
                        </div>
                        {/* Breadcrumb */}
                        {/* Table */}
                        <div className="Table mt-6">
                            <DataTable
                                headers={tableHeaders}
                                data={dummyData}
                                currentPage={currentPage}
                                search={search}
                            />
                        </div>
                        {/* Pagination */}
                        <div className="pagi flex items-center justify-end mt-3 pb-5 lg:pb-0">
                            <PaginationTable
                                currentPage={currentPage}
                                totalPages={10}
                                onPageChange={onPageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
