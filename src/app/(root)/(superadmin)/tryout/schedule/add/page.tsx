"use client";

import { DatePicker } from "@/components/Custom/DatePicker";
import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HelperError from "@/components/ui/HelperError";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { showAlert } from "@/lib/swalAlert";
import Loading from "@/components/ui/Loading";
import { scheduleTryout, scheduleTryoutFormData } from "@/validations";
import { postSubmitSchedule, useGetTryoutPackageFilter } from "@/services/api";
import SelectSearch from "@/components/Custom/SelectSearch3";
import { format } from "date-fns";
import DataTable from "@/components/Superadmin/Payment/DataTable";

const dummyData = [
    { value: 1, label: "Tryout 1" },
    { value: 2, label: "Tryout 2" },
    { value: 3, label: "Tryout 3" },
    { value: 4, label: "Tryout 4" },
];

const AddSchedule = () => {
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter();

    // Form integration
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<scheduleTryoutFormData>({
        resolver: zodResolver(scheduleTryout),
    });

    // Form submission handler
    const { handlePostSubmit } = postSubmitSchedule();

    const onSubmit: SubmitHandler<scheduleTryoutFormData> = (data) => {
        handlePostSubmit(data, setLoading);
    };
    // INTEGRASI
    // provinsi
    const { data: dataPaket } = useGetTryoutPackageFilter();
    const transformedItems = dataPaket?.data.map((item) => ({
        value: item.id.toString(), // Ensure id is a string if needed
        label: item.title, // Map 'name' to 'nama'
    })) || [];

    return (
        <div>
            <TitleBack href="/tryout/schedule" title="Tambah Jadwal" />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6"
            >
                {/* Nama Tryout */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Nama Tryout</label>
                    <input
                        type="text"
                        placeholder="Nama Tryout"
                        className="bg-[#FAFAFA] pb-1 border-b border-gray-900 focus-visible:outline-none focus-visible:ring-none"
                        {...register("title")}
                    />
                    <HelperError>{errors.title?.message}</HelperError>
                </div>

                {/* Pilih Paket Tryout */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Pilih Paket Tryout</label>
                    <Controller
                        name="packagetryout_id"
                        control={control}
                        render={({ field }) => (
                            <SelectSearch
                                className="border-primary"
                                items={transformedItems}
                                label="Paket Tryout"
                                placeholder="Cari Paket Tryout"
                                value={field.value?.toString() || ""}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <HelperError>{errors.packagetryout_id?.message}</HelperError>
                </div>

                {/* Pilih Tanggal */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Pilih Tanggal</label>
                    <Controller
                        name="tanggal"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                value={field.value ? new Date(field.value) : undefined} // Ensure the value is Date
                                onChange={(date) =>
                                    setValue(
                                        "tanggal",
                                        date ? format(date, "yyyy-MM-dd") : "" // Store string in the correct format
                                    )
                                }
                                placeholder="Tanggal Tryout"
                                buttonClassName="w-full"
                            />
                        )}
                    />
                    <HelperError>{errors.tanggal?.message}</HelperError>
                </div>

                {/* Pilih Jam */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Pilih Jam</label>
                    <Input
                        type="time"
                        className='border-primary placeholder:text-primary'
                        {...register("waktu")}
                    />
                    <HelperError>{errors.tanggal?.message}</HelperError>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-5">
                    <Button type="submit" className="px-10 w-[150px]" disabled={loading}>
                        {loading ? <Loading /> : "Tambah"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddSchedule;
