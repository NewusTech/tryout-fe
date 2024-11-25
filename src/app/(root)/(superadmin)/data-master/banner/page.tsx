"use client";

import TitleAdmin from "@/components/Superadmin/Title";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import PlusIcon from "../../../../../../public/assets/icons/PlusIcon";
import { useGetBanner, useGetTypePayment } from "@/services/api";
import LinkCustom from "@/components/ui/LinkCustom";
import DataTable from "@/components/Superadmin/DataMaster/Banner/DataTable";

const BannerPage = () => {
    // Define table headers
    const tableHeaders = ["No", "Banner", "Aksi"];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    };

    // INTEGRASI
    const { data } = useGetBanner(currentPage);
    // INTEGRASI

    return (
        <div className="">
            <TitleAdmin title="Banner Beranda" />
            <div className="head flex gap-3 justify-end">
                <LinkCustom
                    href="/data-master/banner/add"
                    className="flex gap-3 text-white items-center flex-shrink-0 w-[160px] justify-center"
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

export default BannerPage;
