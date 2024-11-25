/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import HelperError from '@/components/ui/HelperError';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { showAlert } from '@/lib/swalAlert';
import TitleBack from '@/components/Superadmin/TitleBack';
import { Label } from '@/components/ui/label';
import { bannerEdit, bannerEditFormData } from '@/validations';
import { useGetBannerId } from '@/services/api';


const EditBanner = () => {

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm<bannerEditFormData>({
        resolver: zodResolver(bannerEdit),
    });

    // GET ONE SLUG
    // Integrasi API
    const { id } = useParams();
    const { data: dataUser } = useGetBannerId(id as string);

    useEffect(() => {
        if (dataUser?.data) {
            const timer = setTimeout(() => {
                if (dataUser?.data?.image) {
                    setImagePreview(dataUser?.data?.image);
                }
            }, 1000); // Set the delay in milliseconds (1000 ms = 1 second)

            return () => clearTimeout(timer); // Clean up the timeout on component unmount or data change
        }
    }, [dataUser, setValue]);

    // GET ONE SLUG

    // Banner
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    // Banner

    // 
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    const onSubmit: SubmitHandler<bannerEditFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        const formData = new FormData();
        // Memeriksa jika image ada sebelum menambahkannya ke formData
        if (data.image) {
            formData.append('image', data.image);
        }

        try {
            await axiosPrivate.put(`/user/banner/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(data);
            // alert
            showAlert('success', 'Data berhasil diperbarui!');
            // alert
            navigate.push('/data-master/banner');
            // reset();
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal memperbarui data!';
            showAlert('error', errorMessage);
        } finally {
            setLoading(false); // Set loading to false once the process is complete
        }
        // mutate(`galeri/get?page=1`);
    };
    // 
    return (
        <div className='flex flex-col gap-4'>
            <TitleBack href="/data-master/banner" title="Edit Banner" />
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                <div className="mb-2 flex flex-col gap-2">
                    {/* Banner upload section */}
                    <div className="">
                        <div className="flex flex-col mb-2 w-full">
                            <Label className="text-primary mb-2">Banner</Label>
                            <div className="text-editor h-[260px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center p-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer text-center w-full h-full flex justify-center items-center"
                                >
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
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
                            {errors.image && (
                                <HelperError>{errors.image.message}</HelperError>
                            )}
                        </div>
                    </div>

                    {/*  */}
                </div>
                <div className="flex justify-end mt-3">
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

export default EditBanner