"use client";

import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import HelperError from "@/components/ui/HelperError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/Loading";
import { postSubmitAdmin, postSubmitTypePayment, } from "@/services/api";
import { adminTryout, adminTryoutFormData } from "@/validations";
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
    } = useForm<adminTryoutFormData>({
        resolver: zodResolver(adminTryout),
    });
    // intergasi

    // 
    const { handlePostSubmit } = postSubmitAdmin();

    const onSubmit: SubmitHandler<adminTryoutFormData> = (data) => {
        handlePostSubmit(data, setLoading);
    };
    // 
    return (
        <div className="">
            <TitleBack href="/user/admin" title="Tambah Admin" />
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                {/*  */}
                <div className="grid grid-cols-1 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Nama</Label>
                        <Input
                            type="text"
                            placeholder="Nama"
                            {...register('name')}
                            className={`${errors.name ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.name?.message}</HelperError>
                    </div>
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Email</Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                            className={`${errors.email ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.email?.message}</HelperError>
                    </div>
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Kata Sandi</Label>
                        <Input
                            type="password"
                            placeholder="Kata Sandi"
                            {...register('password')}
                            className={`${errors.password ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.password?.message}</HelperError>
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
