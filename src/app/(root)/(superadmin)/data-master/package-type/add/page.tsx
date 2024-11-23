"use client";

import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import HelperError from "@/components/ui/HelperError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/Loading";
import { postSubmitTypePackage, } from "@/services/api";
import { typePackage, typePackageFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddPackageType = () => {
    const [loading, setLoading] = useState(false);

    // intergasi
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<typePackageFormData>({
        resolver: zodResolver(typePackage),
    });
    // intergasi

    // 
    const { handlePostSubmit } = postSubmitTypePackage();

    const onSubmit: SubmitHandler<typePackageFormData> = (data) => {
        handlePostSubmit(data, setLoading);
    };
    // 
    return (
        <div className="">
            <TitleBack href="/data-master/package-type" title="Tambah Tipe Paket" />
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                {/*  */}
                <div className="grid grid-cols-1 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Nama Tipe Paket</Label>
                        <Input
                            type="text"
                            placeholder="Nama Tipe Paket"
                            {...register('name')}
                            className={`${errors.name ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.name?.message}</HelperError>
                    </div>
                </div>
                {/* button */}
                <div className="flex justify-end mt-3">
                    <Button
                        type="submit"
                        className="px-12 w-[140px]">
                        {loading ? <Loading /> : "Tambah"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddPackageType;
