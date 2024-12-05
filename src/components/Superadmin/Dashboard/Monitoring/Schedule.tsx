"use client";

import SelectSearch from "@/components/Custom/SelectSearch";
import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import DataTable from "@/components/Superadmin/Tryout/Schedule/DataTable";
import { DatePicker } from "@/components/Custom/DatePicker";
import LinkCustom from "@/components/ui/LinkCustom";
import { useGetSchedule } from "@/services/api";
import SearchIcon from "../../../../../public/assets/icons/SearchIcon";
import PlusIcon from "../../../../../public/assets/icons/PlusIcon";

const Schedule = () => {
    const [selectedValue, setSelectedValue] = useState<
        { id: string | number; label: string } | undefined
    >(undefined);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

    // Define table headers
    const tableHeaders = ["No", "Nama Tryout", "Tanggal", "Jam", "Aksi"];

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
    const { data } = useGetSchedule(currentPage, search,);
    // INTEGRASI

    return (
        <div className='w-full rounded-3xl shadow p-6'>
            <TitleAdmin title="Jadwal Tryout" />
            <div className="head flex gap-3">
                <Input
                    placeholder='Cari Paket'
                    leftIcon={<SearchIcon />}
                    className='border-primary'
                    value={search}
                    onChange={handleSearchChange}
                />
                <div className="wrap flex gap-2 items-center">
                    <DatePicker
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholder="Tanggal Awal"
                    />
                    <div className="">to</div>
                    <DatePicker
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholder="Tanggal Akhir"
                    />
                </div>
                <LinkCustom
                    href="/tryout/schedule/add"
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
    );
};

export default Schedule;
