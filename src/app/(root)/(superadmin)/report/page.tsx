"use client";

import SelectSearch from "@/components/Custom/SelectSearch";
import TitleAdmin from "@/components/Superadmin/Title";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import { Button } from "@/components/ui/button";
import PrintIcon from "../../../../../public/assets/icons/PrintIcon";
import DataTable from "@/components/Superadmin/Report/DataTable";
import { DatePicker } from "@/components/Custom/DatePicker";
import { useGetReportTryout } from "@/services/api";

const ReportPage = () => {
    const [selectedValue, setSelectedValue] = useState<
        { id: string | number; label: string } | undefined
    >(undefined);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
    // Dummy data
    const dummyDataa = [
        { value: 1, label: "Tryout 1" },
        { value: 2, label: "Tryout 2" },
        { value: 3, label: "Tryout 3" },
        { value: 4, label: "Tryout 4" },
    ];

    // Define table headers
    const tableHeaders = ["No", "Tanggal", "Nama", "Jenis Pembayaran", "Harga", "Aksi"];

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
    const { data } = useGetReportTryout(currentPage, search,);
    // INTEGRASI
    return (
        <div className="">
            <TitleAdmin title="Laporan" />
            <div className="head flex gap-3 justify-between">
                <div className="w-[50%]">
                    <SelectSearch
                        data={dummyDataa}
                        placeholder="Option"
                        valueId={selectedValue}
                        setValueId={setSelectedValue}
                    />
                </div>
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
                <Button
                    variant="outlinePrimary"
                    className="flex gap-3 items-center w-[160px]"
                >
                    <PrintIcon />
                    Print
                </Button>
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

export default ReportPage;
