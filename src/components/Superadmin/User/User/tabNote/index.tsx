"use client"
import { DatePicker } from '@/components/Custom/DatePicker';
import PaginationTable from '@/components/Custom/PaginationTable';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/User/Home/Navbar';
import DataTable from '@/components/User/Note/DataTable';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { showAlert } from '@/lib/swalAlert';
import { useGetNoteAdminId, useGetProfileNav } from '@/services/api';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { mutate } from 'swr';

const TabNote = () => {
  // Define table headers
  const tableHeaders = ["No", "Tanggal", "Catatan"];
  const { slug } = useParams();
  const { data } = useGetProfileNav(slug as string);
  const id = data?.data?.User?.id.toString();

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
  const { data: dataNote } = useGetNoteAdminId(id as string);
  // INTEGRASI

  // catatan
  const axiosPrivate = useAxiosPrivate();
  const [catatanText, setCatatanText] = useState<string>(""); // Menyimpan nilai catatan
  const [loadingNote, setLoadingNote] = useState(false);
  const [isPopupOpenCatatan, setIsPopupOpenCatatan] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  // Open pop-up
  const handleOpenPopupCatatan = () => setIsPopupOpenCatatan(true);
  // Close pop-up
  const handleClosePopupCatatan = () => {
    setIsPopupOpenCatatan(false);
  };
  const handleCatatan = async () => {
    if (!selectedDate) {
      showAlert("error", "Tanggal tidak valid!");
      return; // Menghentikan eksekusi jika selectedDate undefined
    }
  
    setLoadingNote(true);
  
    // Format tanggal dari Date object menjadi string 'YYYY-MM-DD'
    const formattedDate = selectedDate.toISOString().split("T")[0];
  
    const bodyFeedback = {
      note: catatanText,
      tanggal: formattedDate, // Menggunakan tanggal yang diformat
    };
  
    try {
      await axiosPrivate.post(`/user/evaluation/create/${id}`, bodyFeedback);
      showAlert("success", "Berhasil menambahkan catatan!");
      handleClosePopupCatatan();
      setCatatanText("");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.data?.[0]?.message ||
        error?.response?.data?.message ||
        "Gagal menambah catatan!";
      showAlert("error", errorMessage);
    } finally {
      setLoadingNote(false);
    }
    mutate(`/user/evaluation/get/${id}`);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={handleOpenPopupCatatan}
        >
          Buat Catatan
        </Button>
      </div>
      <div className="Table ">
        <DataTable
          headers={tableHeaders}
          data={dataNote?.data ?? []}
        />
      </div>
      {/* modal */}
      {/* modal catatan */}
      {isPopupOpenCatatan && (
        <div onClick={handleClosePopupCatatan} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden relative w-[600px] md:mx-0 mx-4"
          >
            {/* Header */}
            <div className="px-7 flex bg-white border-b justify-between p-4">
              <div className="text-primary font-medium flex items-center gap-2">
                Catatan Mentor
              </div>
              <button onClick={handleClosePopupCatatan} className="flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">x</button>
            </div>
            {/* Content */}
            <div className="flex px-7 gap-4 items-center border-b border-slate-300 pt-2">
              <div>
                <div className="text-primary font-semibold mb-2">
                  Berikan Catatan Untuk User!
                </div>
              </div>
            </div>
            {/* tanggal */}
            {/* Catatan Textarea */}
            <div className="px-7 mt-3 flex flex-col gap-3">
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholder="Pilih Tanggal"
                buttonClassName='w-full border border-gray-400'
              />
              <Textarea
                placeholder="Masukkan catatan"
                value={catatanText}
                onChange={(e) => setCatatanText(e.target.value)}
                className='text-primary'
              />
            </div>
            {/* Submit Button */}
            <div className="p-4 px-7 flex gap-3 justify-end">
              <Button
                className={`w-full rounded-full py-2 ${loadingNote ? "bg-gray-500" : "bg-primary hover:bg-primary-hover"
                  }`}
                onClick={handleCatatan}
                disabled={loadingNote || catatanText === ""}
              >
                {loadingNote ? <Loading /> : "Kirim"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TabNote