"use client";
import Navbar from '@/components/User/Home/Navbar';
import Link from 'next/link';
import ArrowBread from '../../../../../../public/assets/icons/ArrowBread';
import { useState } from 'react';
import PaginationTable from '@/components/Custom/PaginationTable';
import DataTable from '@/components/User/MyPackage/History/DataTable';
import { useGetUserHistory } from '@/services/api';
import Cookies from "js-cookie";

const History = () => {
    // Define table headers
    const tableHeaders = ["No", "Nama Tryout",  "Skor", "Status", "Durasi Pengerjaan", "Aksi"];

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

    const id = Cookies.get("history") || Cookies.get("package");
    // INTEGRASI
    const { data } = useGetUserHistory(currentPage, search, id as string);
    // INTEGRASI

    return (
        <div>
            <div className="text-srBlack overflow-x-hidden min-h-screen">
                <Navbar />
                <div className="wrap-alll container mx-auto">
                    <div className="pt-[120px]">
                        {/* Breadcrumb */}
                        <div className="bread md:text-base text-sm flex text-primary gap-3 items-center">
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
                                data={data?.data}
                                currentPage={currentPage}
                                search={search}
                            />
                        </div>
                        {/* Pagination */}
                        <div className="pagi flex items-center justify-center md:justify-end mt-3 pb-5 lg:pb-0">
                            <PaginationTable
                                currentPage={currentPage}
                                totalPages={data?.pagination?.totalPages as number}
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
