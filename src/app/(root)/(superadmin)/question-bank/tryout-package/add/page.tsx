"use client";

import React, { useState } from "react";
import SelectSearch from "@/components/Custom/SelectSearch2";
import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LinkCustom from "@/components/ui/LinkCustom";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useGetBankQuestionType, useGetTypePackageFilter } from "@/services/api";
import { packageTryout, packageTryoutFormData } from "@/validations";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HelperError from "@/components/ui/HelperError";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { showAlert } from "@/lib/swalAlert";
import Loading from "@/components/ui/Loading";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddTryoutPackage = () => {
    // State untuk pilihan dropdown terpisah per kategori
    const [selectedTwk, setSelectedTwk] = useState<string>("");
    const [selectedTiu, setSelectedTiu] = useState<string>("");
    const [selectedTkp, setSelectedTkp] = useState<string>("");

    // Integrasi API
    const { data } = useGetTypePackageFilter();
    const transformedItems = data?.data.map((item) => ({
        id: item.id,
        value: item.name,
    })) || [];

    const { data: dataTWK } = useGetBankQuestionType(1);
    const TwkItems = dataTWK?.data.map((item) => ({
        id: item.id,
        value: item.title,
    })) || [];

    const { data: dataTIU } = useGetBankQuestionType(2);
    const TiuItems = dataTIU?.data.map((item) => ({
        id: item.id,
        value: item.title,
    })) || [];

    const { data: dataTKP } = useGetBankQuestionType(3);
    const TkpItems = dataTKP?.data.map((item) => ({
        id: item.id,
        value: item.title,
    })) || [];

    // Integrasi form dengan react-hook-form
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<packageTryoutFormData>({
        resolver: zodResolver(packageTryout),
    });

    // Fungsi untuk submit form
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useRouter();
    const onSubmit = async (data: any) => {
        const banksoals = [
            selectedTiu && { id: selectedTiu },
            selectedTwk && { id: selectedTwk },
            selectedTkp && { id: selectedTkp },
        ].filter(Boolean);

        const body = {
            ...data,
            banksoals,
        };

        try {
            setLoading(true);
            await axiosPrivate.post("/user/package/tryout/create", body);
            showAlert("success", "Data berhasil dibuat!");
            navigate.push("/question-bank/tryout-package");
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.data?.[0]?.message ||
                error?.response?.data?.message ||
                "Gagal membuat data!";
            showAlert("error", errorMessage);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="">
            <TitleBack href="/question-bank/tryout-package" title="Tambah Paket Tryout" />
            {/* Form */}
            <div className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                {/* Nama Paket Tryout */}
                <div className="flex flex-col gap-2">
                    <div className="font-medium">Nama Paket Tryout</div>
                    <input
                        {...register("title")}
                        type="text"
                        placeholder="Nama Paket Tryout"
                        className="bg-[#FAFAFA] pb-1 border-b border-gray-900 focus-visible:outline-none focus-visible:ring-none"
                    />
                    <HelperError>{errors?.title?.message}</HelperError>
                </div>
                {/* Deskripsi */}
                <div className="flex flex-col gap-2 mb-10">
                    <div className="font-medium">Deskripsi</div>
                    <ReactQuill
                        onChange={(value) => setValue('description', value)}
                        className="h-[250px]"
                    />
                    <div className="mt-11">
                        <HelperError>{errors?.description?.message}</HelperError>
                    </div>
                </div>
                {/* Tipe Paket */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">Tipe Paket</div>
                    <div className="w-1/2">
                        <Controller
                            name="typepackage_id"
                            control={control}
                            render={({ field }) => (
                                <SelectSearch
                                    items={transformedItems}
                                    label="Tipe Paket"
                                    placeholder="Pilih Tipe Paket"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <HelperError>{errors?.typepackage_id?.message}</HelperError>
                    </div>
                </div>
                {/* TWK */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">TWK</div>
                    <div className="w-1/2">
                        <SelectSearch
                            items={TwkItems}
                            label="TWK"
                            placeholder="Pilih TWK"
                            value={selectedTwk}
                            onChange={setSelectedTwk}
                        />
                    </div>
                </div>
                {/* TIU */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">TIU</div>
                    <div className="w-1/2">
                        <SelectSearch
                            items={TiuItems}
                            label="TIU"
                            placeholder="Pilih TIU"
                            value={selectedTiu}
                            onChange={setSelectedTiu}
                        />
                    </div>
                </div>
                {/* TKP */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">TKP</div>
                    <div className="w-1/2">
                        <SelectSearch
                            items={TkpItems}
                            label="TKP"
                            placeholder="Pilih TKP"
                            value={selectedTkp}
                            onChange={setSelectedTkp}
                        />
                    </div>
                </div>
                {/* Waktu Pengerjaan */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">Waktu Pengerjaan</div>
                    <div className="w-1/2">
                        <Input
                            {...register("duration")}
                            type='text'
                            placeholder='1 Jam 30 Menit'
                            className='border-primary placeholder:text-primary/40'
                        />
                        <HelperError>{errors?.duration?.message}</HelperError>
                    </div>
                </div>
                {/* Jumlah Soal */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">Jumlah Soal</div>
                    <div className="w-1/2">
                        <Input
                            {...register("total_question")}
                            type='number'
                            placeholder='Jumlah Soal'
                            className='border-primary placeholder:text-primary/40'
                        />
                        <HelperError>{errors?.total_question?.message}</HelperError>
                    </div>
                </div>
                {/* Harga */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">Masukkan Harga</div>
                    <div className="w-1/2">
                        <Input
                            {...register("price")}
                            type='number'
                            placeholder='Masukkan Harga'
                            className='border-primary placeholder:text-primary/40'
                        />
                        <HelperError>{errors?.price?.message}</HelperError>
                    </div>
                </div>
                {/* Button */}
                <div className="flex gap-3 justify-end mt-5">
                    <LinkCustom
                        href="/question-bank/tryout-package"
                        className="w-[150px] text-primary border border-gray-200 shadow bg-white"
                    >
                        Batal
                    </LinkCustom>
                    <Button
                        className="px-12 w-[140px]"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {loading ? <Loading /> : "Tambah"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddTryoutPackage;
