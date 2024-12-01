"use client";

import TitleBack from "@/components/Superadmin/TitleBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import BankIcon from "../../../../../../public/assets/icons/BankIcon";
import CashIcon from "../../../../../../public/assets/icons/CashIcon";
import { showAlert } from "@/lib/swalAlert";
import { useRouter } from "next/navigation";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { payment, paymentFormData } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import HelperError from "@/components/ui/HelperError";
import { useGetTypePackageFilter, useGetTypePaymentFilter } from "@/services/api";
import SelectSearch from "@/components/Custom/SelectSearch2";
import Loading from "@/components/ui/Loading";
import Image from "next/image";
import Cookies from "js-cookie"; // Import js-cookie

const AddPayment = () => {
    // State to track selected payment method (either 'bank' or 'cash')
    const [paymentMethod, setPaymentMethod] = useState<number>();

    const handlePaymentMethodChange = (id: number) => {
        setPaymentMethod(id);
    };


    // Integrasi API
    const { data } = useGetTypePaymentFilter();
    const { data: dataPackage } = useGetTypePackageFilter();
    const transformedItems = dataPackage?.data.map((item) => ({
        id: item.id,
        value: item.name,
    })) || [];
    // 
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<paymentFormData>({
        resolver: zodResolver(payment),
    });
    // Banner
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('receipt', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    // Banner

    // detail
    const setNoPayment = (noPayment: string) => {
        Cookies.set("noPayment", noPayment,);
    };
    const setMethodePayment = (methodePayment: string) => {
        Cookies.set("methodePayment", methodePayment,);
    };
    const setDatePayment = (datePayment: string) => {
        Cookies.set("datePayment", datePayment,);
    };
    const setTimePayment = (timePayment: string) => {
        Cookies.set("timePayment", timePayment,);
    };
    const setPricePayment = (pricePayment: string) => {
        Cookies.set("pricePayment", pricePayment,);
    };
    const setStatusPayment = (statusPayment: string) => {
        Cookies.set("statusPayment", statusPayment,);
    };
    const setIdPayment = (idPayment: string) => {
        Cookies.set("idPayment", idPayment,);
    };
    // detail
    // 
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const axiosPrivate = useAxiosPrivate();

    const onSubmit: SubmitHandler<paymentFormData> = async (data) => {
        if (!paymentMethod) {
            showAlert("error", "Pilih metode pembayaran");
            return;
        }
        setLoading(true); // Set loading to true when the form is submitted
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('telepon', data.telepon);
        formData.append('password', data.password);
        formData.append('typepackage_id', data.typepackage_id.toString());
        formData.append('price', data.price);
        formData.append('receipt', data.receipt);
        formData.append('typepayment_id', (paymentMethod ?? 0).toString());

        try {
            const response = await axiosPrivate.post(`/registerbyadmin`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            // alert
            showAlert('success', 'Data berhasil ditambah!');
            // alert
            setNoPayment(response?.data?.data?.payment?.no_payment);
            setMethodePayment(response?.data?.data?.payment?.type_payment_title);
            setDatePayment(response?.data?.data?.payment?.time_payment?.date);
            setTimePayment(response?.data?.data?.payment?.time_payment?.time);
            setPricePayment(response?.data?.data?.payment?.price);
            setStatusPayment(response?.data?.data?.payment?.status);
            setIdPayment(response?.data?.data?.payment?.id);
            // 
            navigate.push('/payment/invoice');

            // reset();
          } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal menambah data!';
            showAlert('error', errorMessage);
          } finally {
            setLoading(false); // Set loading to false once the process is complete
          }
        // mutate(`galeri/get?page=1`);
    };

    return (
        <div className="">
            <TitleBack href="/payment" title="Tambah Pembayaran" />
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Nama</Label>
                        <Input
                            placeholder="Nama"
                            type="text"
                            {...register('name')}
                            className={`${errors.name ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.name?.message}</HelperError>
                    </div>
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Nomor Telepon</Label>
                        <Input
                            placeholder="Nomor Telepon"
                            type="number"
                            {...register('telepon')}
                            className={`${errors.telepon ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.telepon?.message}</HelperError>
                    </div>
                </div>
                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Email</Label>
                        <Input
                            placeholder="Email"
                            type="email"
                            {...register('email')}
                            className={`${errors.email ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.email?.message}</HelperError>
                    </div>
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Kata Sandi</Label>
                        <Input
                            placeholder="Kata Sandi"
                            type="text"
                            {...register('password')}
                            className={`${errors.password ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.password?.message}</HelperError>
                    </div>
                </div>
                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Paket Tryout</Label>
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
                    <div className="flex flex-col md:gap-3 gap-2">
                        <Label className="text-primary">Harga</Label>
                        <Input
                            placeholder="Harga"
                            type="number"
                            {...register('price')}
                            className={`${errors.price ? 'border-red-500' : ''}`}
                        />
                        <HelperError>{errors?.price?.message}</HelperError>
                    </div>
                </div>
                {/* metode */}
                <div className="bg-[#FAFAFA] flex flex-col gap-3 rounded-md border border-gray-200 p-5">
                    <div className="font-medium text-2xl">Metode Pembayaran</div>
                    <div className="flex flex-col gap-3">
                        {data?.data?.map((method) => (
                            <div
                                key={method.id}
                                className={`flex gap-3 p-3 items-center rounded cursor-pointer ${paymentMethod === method.id ? "bg-primary/5" : "bg-white"
                                    }`}
                                onClick={() => handlePaymentMethodChange(method.id)}
                            >
                                <div>
                                    <CashIcon />
                                </div>
                                <div>{method.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* metode */}
                {/* Banner upload section */}
                <div className="">
                    <div className="flex flex-col mb-2 w-full">
                        <Label className="text-primary mb-2">Bukti Pembayaran</Label>
                        <div className="text-editor h-[260px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center p-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="banner-upload"
                            />
                            <label
                                htmlFor="banner-upload"
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
                        {errors.receipt && (
                            <HelperError>{errors.receipt.message}</HelperError>
                        )}
                    </div>
                </div>
                {/* button */}
                <div className="flex justify-end mt-5">
                    <Button
                        className="px-12 md:w-[180px]"
                    >
                        {loading ? (
                            <Loading />
                        ) : (
                            "Bayar"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddPayment;
