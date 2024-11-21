"use client";

import SelectSearch from "@/components/Custom/SelectSearch";
import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import { DatePicker } from "@/components/Custom/DatePicker";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import LinkCustom from "@/components/ui/LinkCustom";
import PlusIcon from "../../../../../../public/assets/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import ExportIcon from "../../../../../../public/assets/icons/ExportIcon";
import ImportIcon from "../../../../../../public/assets/icons/ImportIcon";
import DataTable from "@/components/Superadmin/QuestionBank/TryoutPackage/DataTable";

const TryoutPackage = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

    // Define table headers
    const tableHeaders = ["No", "Paket Tryout", "Harga", "Aksi"];

    // Dummy data
    const dummyData = [
        {
            no: 1,
            paketTryout: "Tryout 1",
            harga: "45000",
        },
        {
            no: 2,
            paketTryout: "Tryout 2",
            harga: "50000",
        },
        {
            no: 3,
            paketTryout: "Tryout 3",
            harga: "40000",
        },
        {
            no: 4,
            paketTryout: "Tryout 4",
            harga: "55000",
        },
        {
            no: 5,
            paketTryout: "Tryout 5",
            harga: "60000",
        },
    ];
    
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

    return (
        <div className="">
            <TitleAdmin title="Paket Tryout" />
            <div className="head flex gap-3">
                <Input
                    placeholder='Cari'
                    leftIcon={<SearchIcon />}
                    className='border-primary placeholder:text-primary w-[50%]'
                    value={search}
                    onChange={handleSearchChange}
                />
                <LinkCustom
                    href="/question-bank/tryout-package/add"
                    className="flex gap-3 text-white items-center"
                >
                    <PlusIcon />
                    Tambah
                </LinkCustom>
            </div>
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
            <div className="pagi flex items-center justify-center md:justify-end mt-3 pb-5 lg:pb-0">
                <PaginationTable
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default TryoutPackage;
