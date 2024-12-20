"use client";

import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import LinkCustom from "@/components/ui/LinkCustom";
import PlusIcon from "../../../../../../public/assets/icons/PlusIcon";
import { useGetUserAllAdmin } from "@/services/api";
import DataTable from "@/components/Superadmin/User/Admin/DataTable";

const UserAdmin = () => {
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
    const { data } = useGetUserAllAdmin(currentPage, search,);
    // INTEGRASI

    return (
        <div className="">
            <TitleAdmin title="Admin" />
            <div className="head flex gap-3">
                <Input
                    placeholder='Cari'
                    leftIcon={<SearchIcon />}
                    className='border-primary placeholder:text-primary/40 w-1/2'
                    value={search}
                    onChange={handleSearchChange}
                />
                <LinkCustom
                    href="/user/admin/add"
                    className="flex gap-3 text-white items-center flex-shrink-0"
                >
                    <PlusIcon />
                    Tambah Admin
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

export default UserAdmin;
