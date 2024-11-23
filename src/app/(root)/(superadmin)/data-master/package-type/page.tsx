"use client";

import TitleAdmin from "@/components/Superadmin/Title";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import DataTable from "@/components/Superadmin/DataMaster/PackageType/DataTable";
import { Input } from "@/components/ui/input";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import PlusIcon from "../../../../../../public/assets/icons/PlusIcon";
import { useGetTypePackage } from "@/services/api";
import LinkCustom from "@/components/ui/LinkCustom";

const PackageTypePage = () => {
  // Define table headers
  const tableHeaders = ["No", "Nama Paket", "Aksi"];

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
  const { data } = useGetTypePackage(currentPage, search,);
  // INTEGRASI

  return (
    <div className="">
      <TitleAdmin title="Tipe Paket" />
      <div className="head flex gap-3 justify-between">
        <div className="w-[50%]">
          <Input
            placeholder='Cari Tipe Paket'
            leftIcon={<SearchIcon />}
            className='border-primary placeholder:text-primary/40'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <LinkCustom
          href="/data-master/package-type/add"
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

export default PackageTypePage;
