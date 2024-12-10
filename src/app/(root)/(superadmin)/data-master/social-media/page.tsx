"use client";

import TitleAdmin from "@/components/Superadmin/Title";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import { Input } from "@/components/ui/input";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import PlusIcon from "../../../../../../public/assets/icons/PlusIcon";
import { useGetMediaSocial } from "@/services/api";
import LinkCustom from "@/components/ui/LinkCustom";
import DataTable from "@/components/Superadmin/DataMaster/SocialMedia/DataTable";

const SocialMediaPage = () => {
    // Define table headers
    const tableHeaders = ["No", "Media Sosial", "Link Url", "Aksi"];

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
    const { data } = useGetMediaSocial(currentPage, search,);
    // INTEGRASI

    return (
        <div className="">
            <TitleAdmin title="Media Sosial" />
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
            <div>
            </div>
        </div>
    );
};

export default SocialMediaPage;
