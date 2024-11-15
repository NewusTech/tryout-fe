"use client";
import Navbar from '@/components/User/Home/Navbar';
import Link from 'next/link';
import ArrowBread from '../../../../../../../public/assets/icons/ArrowBread';
import { useState } from 'react';
import PaginationTable from '@/components/Custom/PaginationTable';
import DataTable from '@/components/User/MyPackage/History/Ranking/DataTable';

const Ranking = () => {
  // Define table headers
  const tableHeaders = ["Rank", "Nama", "TWK", "TIU", "TKP", "Total", "Durasi Pengerjaan", "Keterangan"];

  // Dummy data
  const dummyData = [
    {
      rank: 1,
      nama: "Andi",
      twk: "89",
      tiu: "80",
      tkp: "66",
      total: "166",
      durasiPengerjaan: "2 Jam",
      keterangan: "Lulus"
    },
    {
      rank: 2,
      nama: "Budi",
      twk: "78",
      tiu: "85",
      tkp: "70",
      total: "166",
      durasiPengerjaan: "2 Jam 15 Menit",
      keterangan: "Lulus"
    },
    {
      rank: 3,
      nama: "Citra",
      twk: "90",
      tiu: "75",
      tkp: "65",
      total: "166",
      durasiPengerjaan: "1 Jam 50 Menit",
      keterangan: "Lulus"
    },
    {
      rank: 4,
      nama: "Dewi",
      twk: "82",
      tiu: "72",
      tkp: "60",
      total: "166",
      durasiPengerjaan: "2 Jam 5 Menit",
      keterangan: "Lulus"
    },
    {
      rank: 5,
      nama: "Eko",
      twk: "85",
      tiu: "78",
      tkp: "68",
      total: "166",
      durasiPengerjaan: "2 Jam 10 Menit",
      keterangan: "Lulus"
    }
  ];


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Search
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to page 1
  };

  return (
    <div>
      <div className="text-srBlack overflow-x-hidden min-h-screen">
        <Navbar />
        <div className="wrap-alll container mx-auto">
          <div className="pt-[120px]">
            {/* Breadcrumb */}
            <div className="bread flex text-primary gap-3 items-center">
              <Link href="/my-package">Paket Saya</Link>
              <ArrowBread />
              <Link href="/my-package/history">History</Link>
              <ArrowBread />
              <div className="font-medium">Ranking</div>
            </div>
            {/* Breadcrumb */}
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
            <div className="pagi flex items-center justify-end mt-3 pb-5 lg:pb-0">
              <PaginationTable
                currentPage={currentPage}
                totalPages={10}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
