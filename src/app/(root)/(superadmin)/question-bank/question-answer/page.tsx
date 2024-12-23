"use client";

import SelectSearch from "@/components/Custom/SelectSearch";
import TitleAdmin from "@/components/Superadmin/Title";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import PaginationTable from "@/components/Custom/PaginationTable";
import { DatePicker } from "@/components/Custom/DatePicker";
import SearchIcon from "../../../../../../public/assets/icons/SearchIcon";
import LinkCustom from "@/components/ui/LinkCustom";
import PlusIcon from "../../../../../../public/assets/icons/PlusIcon";
import DataTable, { ButtonExport } from "@/components/Superadmin/QuestionBank/QuestionAnswer/DataTable";
import { Button } from "@/components/ui/button";
import ExportIcon from "../../../../../../public/assets/icons/ExportIcon";
import ImportIcon from "../../../../../../public/assets/icons/ImportIcon";
import { useGetBankQuestion } from "@/services/api";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/ui/Loading";
import { showAlert } from "@/lib/swalAlert";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { importBank, importBankFormData } from "@/validations";

const QuestionBank = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

    // Define table headers
    const tableHeaders = ["No", "Nama Bank Soal", "Kategori Soal", "Jumlah", "Aksi"];

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
    const { data } = useGetBankQuestion(currentPage, search,);
    // INTEGRASI

    // IMPORT
    const [loading, setLoading] = useState(false);
    // feedback
    const [isPopupOpenImport, setIsPopupOpenImport] = useState(false);
    const [fileName, setFileName] = useState<string>('') // Menyimpan nama file yang dipilih

    // Open pop-up
    const handleOpenPopupImport = () => setIsPopupOpenImport(true);
    // Close pop-up
    const handleClosePopupImport = () => {
        setIsPopupOpenImport(false);
    };

    // 
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<importBankFormData>({
        resolver: zodResolver(importBank),
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name) // Menyimpan nama file yang dipilih
        }
        const file = event.target.files?.[0];
        if (file) {
            setValue('file', file);
        }
    }

    const axiosPrivate = useAxiosPrivate();
    const onSubmit: SubmitHandler<importBankFormData> = async (data) => {

        setLoading(true); // Set loading to true when the form is submitted
        const formData = new FormData();
        formData.append('file', data.file);

        try {
            await axiosPrivate.post("/user/import/bank/question", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // alert
            showAlert('success', 'Data berhasil diimport!');
            // alert
            // reset();
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal mengimport data!';
            showAlert('error', errorMessage);
        } finally {
            setLoading(false); // Set loading to false once the process is complete
        }
    };

    return (
        <div className="">
            <TitleAdmin title="Soal & Jawaban" />
            <div className="head flex gap-3">
                <Input
                    placeholder='Cari'
                    leftIcon={<SearchIcon />}
                    className='border-primary placeholder:text-primary'
                    value={search}
                    onChange={handleSearchChange}
                />
                <LinkCustom
                    href="/question-bank/question-answer/add"
                    className="flex gap-3 text-white items-center"
                >
                    <PlusIcon />
                    Tambah
                </LinkCustom>
                <Button
                    variant="outlinePrimary"
                    className="flex gap-3"
                >
                    <ExportIcon />
                    Export
                </Button>
                {/*  */}
                {/* <ButtonExport /> */}
                {/*  */}
                <Button
                    variant="outlinePrimary"
                    className="flex gap-3"
                    onClick={handleOpenPopupImport}
                >
                    <ImportIcon />
                    Import
                </Button>
            </div>
            <div className="mt-3 flex gap-3">
                <Button
                    variant="default"
                    className="py-2 w-[140px]"
                >
                    Semua
                </Button>
                <Button
                    variant="outlinePrimary"
                    className="py-2 w-[140px]"
                >
                    TWK
                </Button>
                <Button
                    variant="outlinePrimary"
                    className="py-2 w-[140px]"
                >
                    TIU
                </Button>
                <Button
                    variant="outlinePrimary"
                    className="py-2 w-[140px]"
                >
                    TKP
                </Button>
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
            {/* Import Modal */}
            {isPopupOpenImport && (
                <form onSubmit={handleSubmit(onSubmit)} onClick={handleClosePopupImport} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-lg overflow-hidden relative w-[600px] md:mx-0 mx-4"
                    >
                        {/* Header */}
                        <div className="px-7 flex bg-white border-b justify-between p-4">
                            <div className="text-primary font-medium flex items-center gap-2">
                                Import Soal
                            </div>
                            <button onClick={handleClosePopupImport} className="flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">x</button>
                        </div>
                        {/* Content */}
                        <div className="flex gap-4 items-center p-4">
                            <div>
                                <div className="text-primary">
                                    Import file dalam bentuk Excel!
                                </div>
                            </div>
                        </div>
                        {/* Import Textarea */}
                        <div className="text-editor m-4 mt-0 h-[200px] border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center p-2">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="image-upload"
                                onChange={handleFileChange} // Menangani perubahan file
                            />
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer text-center w-full h-full flex justify-center items-center"
                            >
                                {fileName ? <p>{fileName}</p> : <p>Click to select file</p>} {/* Menampilkan nama file jika ada */}
                            </label>
                        </div>
                        {/* Submit Button */}
                        <div className="p-4 px-7 flex gap-3 justify-end">
                            <Button
                                className={`w-full rounded-full py-2 ${loading ? "bg-gray-500" : "bg-primary hover:bg-primary-hover"
                                    }`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <Loading /> : "Kirim"}
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default QuestionBank;
