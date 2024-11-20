"use client";

import { DatePicker } from "@/components/Custom/DatePicker";
import SelectSearch from "@/components/Custom/SelectSearch";
import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const dummyData = [
    { value: 1, label: "Tryout Tryout Tryout Tryout Tryout Tryout Tryout 1" },
    { value: 2, label: "Tryout 2" },
    { value: 3, label: "Tryout 3" },
    { value: 4, label: "Tryout 4" },
];

const AddSchedule = () => {
    const [selectedValue, setSelectedValue] = useState<
        { id: string | number; label: string } | undefined
    >(undefined);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();


    return (
        <div className="">
            <TitleBack href="/tryout/schedule" title="Tambah Jadwal" />
            {/* form */}
            <div className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                <div className="flex flex-col gap-2">
                    <div className="font-medium">
                        Nama Tryout
                    </div>
                    <input
                        type="text"
                        placeholder="Nama Tryout"
                        className="bg-[#FAFAFA] pb-1 border-b border-gray-900 focus-visible:outline-none focus-visible:ring-none" />
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        Pilih Paket Tryout
                    </div>
                    <div className="w-1/2">
                        <SelectSearch
                            data={dummyData}
                            placeholder="Tryout"
                            valueId={selectedValue}
                            setValueId={setSelectedValue}
                        />
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        Pilih Tanggal
                    </div>
                    <div className="w-1/2">
                        <DatePicker
                            buttonClassName="w-full"
                            value={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            placeholder="Tanggal Awal"
                        />
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        Pilih Jam
                    </div>
                    <div className="w-1/2">
                        <Input
                            type='time'
                            placeholder='Cari Paket'
                            className='border-primary placeholder:text-primary'
                        />
                    </div>
                </div>
            </div>
            {/* button */}
            <div className="flex justify-end mt-5">
                <Button
                className="px-10"
                >
                    Tambah
                </Button>
            </div>
        </div>
    );
};

export default AddSchedule;
