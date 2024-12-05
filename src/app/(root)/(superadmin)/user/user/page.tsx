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
import DataTable from "@/components/Superadmin/User/User/DataTable";
import { useGetUserAll } from "@/services/api";

const UserUser = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
    const [selectedValue, setSelectedValue] = useState<
        { id: string | number; label: string } | undefined
    >(undefined);
    // Dummy data
    const dummyDataa = [
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
        { value: 3, label: "Option 3" },
        { value: 4, label: "Option 4" },
    ];

    // Define table headers
    const tableHeaders = ["No", "Nama", "Email", "Aksi"];

    // Dummy data
    const dummyData = [
        {
            no: 1,
            nama: "John Doe",
            email: "johndoe@example.com",
        },
        {
            no: 2,
            nama: "Jane Smith",
            email: "janesmith@example.com",
        },
        {
            no: 3,
            nama: "Robert Johnson",
            email: "robertjohnson@example.com",
        },
        {
            no: 4,
            nama: "Emily Davis",
            email: "emilydavis@example.com",
        },
        {
            no: 5,
            nama: "Michael Brown",
            email: "michaelbrown@example.com",
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

    // INTEGRASI
    const { data } = useGetUserAll(currentPage, search,);
    // INTEGRASI

    return (
        <div className="">
            <TitleAdmin title="User" />
            <div className="head flex gap-3">
                <Button>
                    Semua
                </Button>
                <SelectSearch
                    data={dummyDataa}
                    placeholder="Option"
                    valueId={selectedValue}
                    setValueId={setSelectedValue}
                />
                <Input
                    placeholder='Cari'
                    leftIcon={<SearchIcon />}
                    className='border-primary placeholder:text-primary'
                    value={search}
                    onChange={handleSearchChange}
                />
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

export default UserUser;
