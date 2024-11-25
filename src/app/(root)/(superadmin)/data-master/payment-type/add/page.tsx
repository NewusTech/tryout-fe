"use client";

import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import HelperError from "@/components/ui/HelperError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/Loading";
import { postSubmitTypePayment, } from "@/services/api";
import { typePayment, typePaymentFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddPaymentType = () => {
    const [loading, setLoading] = useState(false);

    // intergasi
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<typePaymentFormData>({
        resolver: zodResolver(typePayment),
    });
    // intergasi

    // 
    const { handlePostSubmit } = postSubmitTypePayment();

    const onSubmit: SubmitHandler<typePaymentFormData> = (data) => {
        handlePostSubmit(data, setLoading);
    };
    // 
    return (
        <div className="">
            <TitleBack href="/data-master/payment-type" title="Tambah Tipe Pembayaran" />
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                {/*  */}
                <div className="grid grid-cols-1 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Nama Tipe Pembayaran</Label>
                        <Input
                            type="text"
                            placeholder="Nama Tipe Pembayaran"
                            {...register('title')}
                            className={`${errors.title ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.title?.message}</HelperError>
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

export default AddPaymentType;
