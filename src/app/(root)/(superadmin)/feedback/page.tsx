"use client";

import SelectSearch from "@/components/Custom/SelectSearch";
import TitleAdmin from "@/components/Superadmin/Title";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/Superadmin/Feedback/DataTable";
import PrintIcon from "../../../../../public/assets/icons/PrintIcon";

const UserUser = () => {
    const [selectedValue, setSelectedValue] = useState<
        { id: string | number; label: string } | undefined
    >(undefined);
    // Dummy data
    const dummyDataa = [
        { value: 1, label: "Tryout 1" },
        { value: 2, label: "Tryout 2" },
        { value: 3, label: "Tryout 3" },
        { value: 4, label: "Tryout 4" },
    ];

    // Define table headers
    const tableHeaders = ["No", "Nama", "Nilai"];

    // Dummy data
    const dummyData = [
        {
            no: 1,
            nama: "John Doe",
            nilai: "Baik",
        },
        {
            no: 2,
            nama: "Jane Smith",
            nilai: "Sangat Baik",
        },
        {
            no: 3,
            nama: "Michael Brown",
            nilai: "Cukup",
        },
        {
            no: 4,
            nama: "Emily Davis",
            nilai: "Kurang",
        },
        {
            no: 5,
            nama: "Chris Wilson",
            nilai: "Sangat Baik",
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
            <TitleAdmin title="User" />
            <div className="head flex gap-3 justify-between">
                <div className="w-[50%]">
                    <SelectSearch
                        data={dummyDataa}
                        placeholder="Option"
                        valueId={selectedValue}
                        setValueId={setSelectedValue}
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

export default UserUser;
