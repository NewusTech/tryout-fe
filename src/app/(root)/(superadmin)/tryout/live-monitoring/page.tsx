"use client";

import SelectSearch from "@/components/Custom/SelectSearch";
import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import PaginationTable from "@/components/Custom/PaginationTable";
import DataTable from "@/components/Superadmin/Tryout/LiveMonitoring/DataTable";

const dummyData = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
  { value: 4, label: "Option 4" },
];

const LiveMonitoring = () => {
  const [selectedValue, setSelectedValue] = useState<
    { id: string | number; label: string } | undefined
  >(undefined);

  // Define table headers
  const tableHeaders = ["No", "Nama", "Passing Grade", "Waktu Tersisa", "Soal Dikerjakan"];

  // Dummy data
  const dummyDataa = [
      {
          no: 1,
          nama: "Anggun",
          passingGrade: "1",
          waktuTersisa: "01:30:59",
          soal: "Lulus",
      },
      {
          no: 1,
          nama: "Satria",
          passingGrade: "1",
          waktuTersisa: "01:30:59",
          soal: "Lulus",
      },
      {
          no: 1,
          nama: "Bryan",
          passingGrade: "1",
          waktuTersisa: "01:30:59",
          soal: "Lulus",
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
      <TitleAdmin title="Live Monitoring" />
      <div className="head flex gap-3">
        <SelectSearch
          data={dummyData}
          placeholder="Option"
          valueId={selectedValue}
          setValueId={setSelectedValue}
        />
        <Input
          placeholder='Cari Paket'
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
          data={dummyDataa}
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

export default LiveMonitoring;
