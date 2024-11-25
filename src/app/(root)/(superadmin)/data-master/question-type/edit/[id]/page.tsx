"use client";

import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import HelperError from "@/components/ui/HelperError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/Loading";
import { putSubmitTypeQuestion, useGetTypeQuestionId, } from "@/services/api";
import { typeQuestion, typeQuestionFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const EditQuestionType = () => {
    const [loading, setLoading] = useState(false);

    // intergasi
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<typeQuestionFormData>({
        resolver: zodResolver(typeQuestion),
    });
    // intergasi

    // GET ONE SLUG
    // Integrasi API
    const { id } = useParams();
    const { data: dataUser } = useGetTypeQuestionId(id as string);

    useEffect(() => {
        if (dataUser?.data) {
            const timer = setTimeout(() => {
                setValue("name", dataUser?.data?.name ?? '');
                // 
            }, 1000); // Set the delay in milliseconds (1000 ms = 1 second)

            return () => clearTimeout(timer); // Clean up the timeout on component unmount or data change
        }
    }, [dataUser, setValue]);

    // GET ONE SLUG

    // 
    const { handlePostSubmit } = putSubmitTypeQuestion(id as string);

    const onSubmit: SubmitHandler<typeQuestionFormData> = (data) => {
        handlePostSubmit(data, setLoading);
    };
    // 
    return (
        <div className="">
            <TitleBack href="/data-master/package-type" title="Edit Tipe Pertanyaan" />
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                {/*  */}
                <div className="grid grid-cols-1 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Nama Tipe Pertanyaan</Label>
                        <Input
                            type="text"
                            placeholder="Nama Tipe Pertanyaan"
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
                        {loading ? <Loading /> : "Simpan"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditQuestionType;
