"use client";

import React, { useState } from "react";
import SelectSearch from "@/components/Custom/SelectSearch";
import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LinkCustom from "@/components/ui/LinkCustom";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const dummyData = [
    { value: 1, label: "Tryout Tryout Tryout Tryout Tryout Tryout Tryout 1" },
    { value: 2, label: "Tryout 2" },
    { value: 3, label: "Tryout 3" },
    { value: 4, label: "Tryout 4" },
];

const AddTryoutPackage = () => {
    const [selectedValue, setSelectedValue] = useState<
        { id: string | number; label: string } | undefined
    >(undefined);


    return (
        <div className="">
            <TitleBack href="/question-bank/tryout-package" title="Tambah Paket Tryout" />
            {/* form */}
            <div className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                {/*  */}
                <div className="flex flex-col gap-2">
                    <div className="font-medium">
                        Nama Paket Tryout
                    </div>
                    <input
                        type="text"
                        placeholder="Nama Paket Tryout"
                        className="bg-[#FAFAFA] pb-1 border-b border-gray-900 focus-visible:outline-none focus-visible:ring-none" />
                </div>
                {/*  */}
                <div className="flex flex-col gap-2 mb-10">
                    <div className="font-medium">
                        Deskripsi
                    </div>
                    <ReactQuill
                        className="h-[250px]"
                    />
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        Tipe Paket
                    </div>
                    <div className="w-1/2">
                        <SelectSearch
                            data={dummyData}
                            placeholder="Tipe Paket"
                            valueId={selectedValue}
                            setValueId={setSelectedValue}
                        />
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        TKP
                    </div>
                    <div className="w-1/2">
                        <SelectSearch
                            data={dummyData}
                            placeholder="TKP"
                            valueId={selectedValue}
                            setValueId={setSelectedValue}
                        />
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        TIU
                    </div>
                    <div className="w-1/2">
                        <SelectSearch
                            data={dummyData}
                            placeholder="TIU"
                            valueId={selectedValue}
                            setValueId={setSelectedValue}
                        />
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        TWK
                    </div>
                    <div className="w-1/2">
                        <SelectSearch
                            data={dummyData}
                            placeholder="TWK"
                            valueId={selectedValue}
                            setValueId={setSelectedValue}
                        />
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        Waktu Pengerjaan
                    </div>
                    <div className="w-1/2">
                        <Input
                            type='text'
                            placeholder='1 Jam 30 Menit'
                            className='border-primary placeholder:text-primary/40'
                        />
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        Jumlah Soal
                    </div>
                    <div className="w-1/2">
                        <Input
                            type='text'
                            placeholder='Jumlah Soal'
                            className='border-primary placeholder:text-primary/40'
                        />
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        Masukkan Harga
                    </div>
                    <div className="w-1/2">
                        <Input
                            type='number'
                            placeholder='Masukkan Harga'
                            className='border-primary placeholder:text-primary/40'
                        />
                    </div>
                </div>
                {/* button */}
                <div className="flex gap-3 justify-end mt-5">
                    <LinkCustom
                        href="/question-bank/tryout-package"
                        className="w-[150px] text-primary border border-gray-200 shadow bg-white"
                    >
                        Batal
                    </LinkCustom>
                    <Button
                        className="px-10 w-[150px] shadow"
                    >
                        Tambah
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddTryoutPackage;
