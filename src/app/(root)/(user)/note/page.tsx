"use client"
import PaginationTable from '@/components/Custom/PaginationTable';
import LoadingPage from '@/components/ui/LoadingPage';
import Navbar from '@/components/User/Home/Navbar';
import DataTable from '@/components/User/Note/DataTable';
import { useGetNoteUser } from '@/services/api';
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
    const { data, isLoading } = useGetNoteUser();
    // INTEGRASI

    // Show loading page while fetching data
    if (isLoading) {
        return (
            <div>
                <LoadingPage />
            </div>
        );
    }

    return (
        <div >
            <div className="text-srBlack overflow-x-hidden min-h-screen">
                <Navbar />
                <div className="wrap-alll container mx-auto pt-[120px]">
                    <div className="md:text-2xl text-xl font-semibold my-4 text-primary">
                        Catatan Mentor
                    </div>
                </div>
                <div className="wrap flex container mx-auto flex-col gap-4">
                    <div className="Table ">
                        <DataTable
                            headers={tableHeaders}
                            data={data?.data ?? []}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotePage;
