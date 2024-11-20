"use client";

import SelectSearch from "@/components/Custom/SelectSearch";
import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import { DatePicker } from "@/components/Custom/DatePicker";
import SearchIcon from "../../../../../public/assets/icons/SearchIcon";
import LinkCustom from "@/components/ui/LinkCustom";
import PlusIcon from "../../../../../public/assets/icons/PlusIcon";
import DataTable from "@/components/Superadmin/Payment/DataTable";

const History = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

    // Define table headers
    const tableHeaders = ["No", "Nama", "Nama Paket", "Metode Pembayaran", "Status", "Aksi"];

    // Dummy data
    const dummyDataa = [
        {
            no: 1,
            nama: "John Doe",
            namaPaket: "Paket A",
            metodePembayaran: "Transfer Bank",
            status: "Lunas",
        },
        {
            no: 2,
            nama: "Jane Smith",
            namaPaket: "Paket B",
            metodePembayaran: "Kartu Kredit",
            status: "Belum Lunas",
        },
        {
            no: 3,
            nama: "Alice Johnson",
            namaPaket: "Paket C",
            metodePembayaran: "Cash",
            status: "Lunas",
        },
        {
            no: 4,
            nama: "Bob Brown",
            namaPaket: "Paket D",
            metodePembayaran: "QR Code",
            status: "Belum Lunas",
        },
        {
            no: 5,
            nama: "Charlie Davis",
            namaPaket: "Paket E",
            metodePembayaran: "E-Wallet",
            status: "Lunas",
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
            <TitleAdmin title="Pembayaran Offline" />
            <div className="head flex gap-3 items-center">
                <Input
                    placeholder='Cari'
                    leftIcon={<SearchIcon />}
                    className='border-primary placeholder:text-primary'
                    value={search}
                    onChange={handleSearchChange}
                />
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
            <div className="mt-3 w-fit">
                <LinkCustom
                    href="/payment/add"
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
