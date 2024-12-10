/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import HelperError from '@/components/ui/HelperError';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import { sertifikatEdit, sertifikatEditFormData } from '@/validations';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { showAlert } from '@/lib/swalAlert';
import TitleBack from '@/components/Superadmin/TitleBack';
import { Label } from '@/components/ui/label';
import { useGetAboutCompany, useGetSettingSertifkat } from '@/services/api';
import { Textarea } from '@/components/ui/textarea';
import { mutate } from 'swr';


const EditSertifkat = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        control,
        formState: { errors },
    } = useForm<sertifikatEditFormData>({
        resolver: zodResolver(sertifikatEdit),
    });

    // GET ONE SLUG
    // Integrasi API
    const { data: dataUser } = useGetSettingSertifkat();

    useEffect(() => {
        if (dataUser?.data) {
            const timer = setTimeout(() => {
                setValue("title", dataUser?.data?.title ?? '');
                setValue("name", dataUser?.data?.name ?? '');

                if (dataUser?.data?.sign) {
                    setImagePreviewMain(dataUser?.data?.sign);
        }}, 1000); // Delay in milliseconds (1000 ms = 1 second)

            return () => clearTimeout(timer); // Clean up timeout on component unmount or when dataUser changes
        }
    }, [dataUser, setValue]);
    // GET ONE SLUG

    // main logo
    const [imagePreviewMain, setImagePreviewMain] = useState<string | null>(null);
    const handleImageChangeMain = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('sign', file);
            setImagePreviewMain(URL.createObjectURL(file));
        }
    };
    // main logo
    // 
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const axiosPrivate = useAxiosPrivate();

    const onSubmit: SubmitHandler<sertifikatEditFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('name', data.name);

        // Memeriksa jika image ada sebelum menambahkannya ke formData
        if (data.sign) {
            formData.append('sign', data.sign);
        }

        try {
            await axiosPrivate.put(`/user/edit/setting/sertifikat`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(data);
            // alert
            showAlert('success', 'Data berhasil diperbarui!');
            // alert
            navigate.push('/data-master/setting-sertifikat');
            // reset();
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal memperbarui data!';
            showAlert('error', errorMessage);
        } finally {
            setLoading(false); // Set loading to false once the process is complete
        }
        mutate(`/user/detail/setting/sertifikat`);
    };
    // 
    return (
        <div className='flex flex-col gap-4'>
            <TitleBack href="/data-master/setting-sertifkat" title="Edit Sertifikat" />
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                <div className="mb-2 flex flex-col gap-2">
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full">
                            <Label className="text-primary mb-2">Title Tanda Tangan</Label>
                            <Input
                                type="text"
                                placeholder="Title Tangan Tangan"
                                {...register('title')}
                                className={`${errors.title ? 'border-red-500' : ''}`}
                            />
                            {errors.title && (
                                <HelperError>{errors.title.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full">
                            <Label className="text-primary mb-2">Nama Tanda Tangan</Label>
                            <Input
                                type="text"
                                placeholder="Nama Tanda Tangan"
                                {...register('name')}
                                className={`${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && (
                                <HelperError>{errors.name.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/* foto ttd */}
                    <div className="">
                        <div className="flex flex-col mb-2 w-full">
                            <Label className="text-primary mb-2">Logo Utama</Label>
                            <div className="text-editor h-[260px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center p-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChangeMain}
                                    className="hidden"
                                    id="main-logo"
                                />
                                <label
                                    htmlFor="main-logo"
                                    className="cursor-pointer text-center w-full h-full flex justify-center items-center"
                                >
                                    {imagePreviewMain ? (
                                        <Image
                                            src={imagePreviewMain}
                                            alt="Preview"
                                            width={300} // provide a fallback width
                                            height={200} // provide a fallback height
                                            className="rounded"
                                        />
                                    ) : (
                                        <p>Click to select file</p>
                                    )}
                                </label>
                            </div>
                            {errors.sign && (
                                <HelperError>{errors.sign.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                </div>
                <div className="mb-10 flex justify-end gap-3">
                    <Button
                        type="submit"
                        className="px-12 w-[140px]">
                        {loading ? <Loading /> : "Simpan"}
                    </Button>
                </div>
            </form>
            {/* form */}
        </div>
    )
}

export default EditSertifkat