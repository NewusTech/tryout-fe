/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import SelectSearch from "@/components/Custom/SelectSearch3";
import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import PaginationTable from "@/components/Custom/PaginationTable";
import DataTable from "@/components/Superadmin/Tryout/LiveMonitoring/DataTable";
import { useGetMonitoring, useGetScheduleFilter } from "@/services/api";

type SelectOption = {
  value: string;
  label: string;
};

const LiveMonitoring = () => {
  const [selectedValue, setSelectedValue] = useState<SelectOption | undefined>(undefined);

  // Define table headers
  const tableHeaders = ["No", "Nama", "Passing Grade", "Waktu Tersisa", "Soal Dikerjakan"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Search state and handler
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to page 1
  };

  // Transform selectedValue to match API expectations
  const packageTryout = selectedValue?.value || "";

  // Fetch monitoring data
  const { data } = useGetMonitoring(currentPage, search, packageTryout);

  // Fetch tryout package filter data
  const { data: dataPaket } = useGetScheduleFilter();
  const transformedItems =
    dataPaket?.data.map((item) => ({
      value: item.id.toString(), // Ensure id is a string
      label: item.scheduleTitle, // Use title for label
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
      <TitleAdmin title="Live Monitoring" />
      <div className="head flex gap-3 w-1/2">
        <SelectSearch
          items={transformedItems}
          label="Jadwal"
          placeholder="Pilih Jadwal"
          value={selectedValue?.value || ""} // Provide a default empty string if undefined
          onChange={(value: string) => {
            const selectedOption = transformedItems.find((item) => item.value === value);
            setSelectedValue(selectedOption); // Set the selected option
          }}
        />
      </div>
      {/* Table */}
      <div className="Table mt-6">
        <DataTable
          headers={tableHeaders}
          data={data?.data || []} // Provide a default value to avoid undefined
          currentPage={currentPage}
          search={search}
        />
      </div>
      {/* Pagination */}
      <div className="pagi flex items-center justify-center md:justify-end mt-3 pb-5 lg:pb-0">
        <PaginationTable
          currentPage={currentPage}
          totalPages={data?.pagination?.totalPages || 1} // Ensure totalPages is defined
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default LiveMonitoring;
