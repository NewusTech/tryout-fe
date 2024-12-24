/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import SelectSearch from "@/components/Custom/SelectSearch3";
import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import PaginationTable from "@/components/Custom/PaginationTable";
import { DatePicker } from "@/components/Custom/DatePicker";
import DataTable from "@/components/Superadmin/Tryout/History/DataTable";
import { useGetTryoutPackageFilter, useGetUserHistoryAll } from "@/services/api";

type SelectOption = {
  value: string;
  label: string;
};

const History = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedValue, setSelectedValue] = useState<SelectOption | undefined>(undefined);

  // Define table headers
  const tableHeaders = ["No", "Nama Tryout", "Nama", "Skor", "Status", "Aksi"];

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
  // Transform selectedValue to match API expectations
  const packageTryout = selectedValue?.value || "";
  // INTEGRASI
  const { data } = useGetUserHistoryAll(currentPage, search, packageTryout);
  // INTEGRASI

  // Fetch tryout package filter data
  const { data: dataPaket } = useGetTryoutPackageFilter();
  const transformedItems =
    dataPaket?.data.map((item) => ({
      value: item.id.toString(), // Ensure id is a string
      label: item.title, // Use title for label
    })) || [];

  // Set default selected value from the first item
  useEffect(() => {
    if (transformedItems.length > 0 && !selectedValue) {
      setSelectedValue(transformedItems[0]);
    }
  }, [transformedItems]);

  console.log("selected= ", packageTryout)

  return (
    <div className="">
      <TitleAdmin title="Riwayat" />
      <div className="flex flex-col gap-3">
        <div className="head flex gap-3">
          <SelectSearch
            items={transformedItems}
            label="Tryout"
            placeholder="Pilih Tryout"
            value={selectedValue?.value || ""} // Provide a default empty string if undefined
            onChange={(value: string) => {
              const selectedOption = transformedItems.find((item) => item.value === value);
              setSelectedValue(selectedOption); // Set the selected option
            }}
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

export default History;
