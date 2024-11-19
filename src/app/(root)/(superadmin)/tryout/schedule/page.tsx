"use client";

import SelectSearch from "@/components/Custom/SelectSearch";
import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import PaginationTable from "@/components/Custom/PaginationTable";
import DataTable from "@/components/Superadmin/Tryout/Schedule/DataTable";
import { DatePicker } from "@/components/Custom/DatePicker";
import LinkCustom from "@/components/ui/LinkCustom";
import PlusIcon from "../../../../../../public/assets/icons/PlusIcon";

const dummyData = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
  { value: 4, label: "Option 4" },
];

const Schedule = () => {
  const [selectedValue, setSelectedValue] = useState<
    { id: string | number; label: string } | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  // Define table headers
  const tableHeaders = ["No", "Nama Tryout", "Tanggal", "Jam", "Aksi"];

  // Dummy data
  const dummyData = [
    {
      no: 1,
      namaTryout: "Tryout Soal TWK (Tes Wawasan Kebangsaan)",
      tanggal: "2024-11-25",
      jam: "08:00",
    },
    {
      no: 2,
      namaTryout: "Tryout Soal TIU (Tes Intelegensi Umum)",
      tanggal: "2024-11-26",
      jam: "10:00",
    },
    {
      no: 3,
      namaTryout: "Tryout Soal TKP (Tes Karakteristik Pribadi)",
      tanggal: "2024-11-27",
      jam: "13:00",
    },
    {
      no: 4,
      namaTryout: "Tryout Soal SKB (Seleksi Kompetensi Bidang)",
      tanggal: "2024-11-28",
      jam: "09:00",
    },
    {
      no: 5,
      namaTryout: "Simulasi CAT CPNS (Computer Assisted Test)",
      tanggal: "2024-11-29",
      jam: "15:00",
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
      <TitleAdmin title="Jadwal" />
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
          href="/"
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

export default Schedule;
