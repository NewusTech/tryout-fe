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
import DataTable from "@/components/Superadmin/QuestionBank/QuestionAnswer/DataTable";
import { Button } from "@/components/ui/button";
import ExportIcon from "../../../../../../public/assets/icons/ExportIcon";
import ImportIcon from "../../../../../../public/assets/icons/ImportIcon";

const QuestionBank = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

    // Define table headers
    const tableHeaders = ["No", "Nama Bank Soal", "Kategori Soal", "Jumlah", "Aksi"];

    // Dummy data
    const dummyData = [
        {
            no: 1,
            namaSoal: "Tryout 1",
            kategori: "TIU",
            jumlah: "45",
        },
        {
            no: 2,
            namaSoal: "Tryout 2",
            kategori: "TKA",
            jumlah: "50",
        },
        {
            no: 3,
            namaSoal: "Tryout 3",
            kategori: "TKP",
            jumlah: "40",
        },
        {
            no: 4,
            namaSoal: "Tryout 4",
            kategori: "TIU",
            jumlah: "55",
        },
        {
            no: 5,
            namaSoal: "Tryout 5",
            kategori: "TKA",
            jumlah: "60",
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
            <TitleAdmin title="Soal & Jawaban" />
            <div className="head flex gap-3">
                <Input
                    placeholder='Cari'
                    leftIcon={<SearchIcon />}
                    className='border-primary placeholder:text-primary'
                    value={search}
                    onChange={handleSearchChange}
                />
                <LinkCustom
                    href="/question-bank/question-answer/add"
                    className="flex gap-3 text-white items-center"
                >
                    <PlusIcon />
                    Tambah
                </LinkCustom>
                <Button
                variant="outlinePrimary"
                className="flex gap-3"
                >
                    <ExportIcon />
                    Export
                </Button>
                <Button
                variant="outlinePrimary"
                className="flex gap-3"
                >
                    <ImportIcon />
                    Import
                </Button>
            </div>
            <div className="mt-3 flex gap-3">
                <Button
                variant="default"
                className="py-2 w-[140px]"
                >
                    Semua
                </Button>
                <Button
                variant="outlinePrimary"
                className="py-2 w-[140px]"
                >
                    TWK
                </Button>
                <Button
                variant="outlinePrimary"
                className="py-2 w-[140px]"
                >
                    TIU
                </Button>
                <Button
                variant="outlinePrimary"
                className="py-2 w-[140px]"
                >
                    TKP
                </Button>
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

export default QuestionBank;
