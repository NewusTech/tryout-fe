"use client";

import SelectSearch from "@/components/Custom/SelectSearch";
import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import PaginationTable from "@/components/Custom/PaginationTable";
import { DatePicker } from "@/components/Custom/DatePicker";
import DataTable from "@/components/Superadmin/Tryout/History/DataTable";

const dummyData = [
  { value: 1, label: "Tryout 1" },
  { value: 2, label: "Tryout 2" },
  { value: 3, label: "Tryout 3" },
  { value: 4, label: "Tryout 4" },
];

const History = () => {
  const [selectedValue, setSelectedValue] = useState<
    { id: string | number; label: string } | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  // Define table headers
  const tableHeaders = ["No", "Ranking", "Nama", "Skor", "Aksi"];

  // Dummy data
  const dummyDataa = [
    {
      no: 1,
      nama: "John Doe",
      ranking: "1",
      skor: "95",
    },
    {
      no: 2,
      nama: "Jane Smith",
      ranking: "2",
      skor: "90",
    },
    {
      no: 3,
      nama: "Alice Johnson",
      ranking: "3",
      skor: "88",
    },
    {
      no: 4,
      nama: "Bob Brown",
      ranking: "4",
      skor: "85",
    },
    {
      no: 5,
      nama: "Charlie Davis",
      ranking: "5",
      skor: "82",
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
      <TitleAdmin title="Riwayat" />
      <div className="flex flex-col gap-3">
        <div className="head flex gap-3">
          <SelectSearch
            data={dummyData}
            placeholder="Tryout"
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

export default History;
