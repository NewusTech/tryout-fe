"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Loading from "@/components/ui/Loading";
import HelperError from "@/components/ui/HelperError";
import UserIcon from "../../../../../public/assets/icons/UserIcon";
import { axiosInstance } from "@/utils/axios";
import Swal from "sweetalert2"; // Make sure to import SweetAlert2


const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email wajib diisi" }),
    // .email({ message: "Alamat email tidak valid" }),
    password: z
        .string()
        .min(6, { message: "Password wajib diisi minimal harus 6 karakter" }),
    name: z
        .string()
        .min(6, { message: "Nama wajib diisi" }),
    telepon: z
        .string()
        .min(6, { message: "Telepon wajib diisi" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const LoginPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenPopup = () => {
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };
    //
    // 
    const [isOpenKebijakan, setIsOpenKebijakan] = useState(false);
    const handleOpenPopupKebijakan = () => {
        setIsOpenKebijakan(true);
    };

    const handleClosePopupKebijakan = () => {
        setIsOpenKebijakan(false);
    };
    //  
    //  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const [loginError, setLoginError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: FormSchemaType) => {
        setLoading(true);
        setLoginError(null); // Reset previous errors

        try {
            const response = await axiosInstance.post("/register", {
                name: data.name,
                telepon: data.telepon,
                email: data.email,
                password: data.password,
            });
            Swal.fire({
                icon: "success",
                title: "Berhasil Membuat Akun!",
                text: "Selamat Datang ✅",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
                customClass: {
                    title: "text-2xl font-semibold text-green-600",
                    icon: "text-green-500 animate-bounce",
                    timerProgressBar:
                        "bg-gradient-to-r from-indigo-400 to-blue-400", // Gradasi warna yang lembut
                },
                backdrop: `rgba(0, 0, 0, 0.4)`,
            });
            // reset();
            router.push("/login");
        } catch (error: any) {
            // alert
            // Extract error message from API response
            const errorMessage =
                error.response?.data?.data?.[0]?.message || error.response?.data?.message || "Registrasi gagal. Silakan coba lagi!";
            Swal.fire({
                icon: "error",
                title: "Terjadi kesalahan!",
                text: errorMessage,
                showConfirmButton: true,
                showClass: { popup: "animate__animated animate__fadeInDown" },
                hideClass: { popup: "animate__animated animate__fadeOutUp" },
                customClass: {
                    popup: "rounded-xl",
                    title: "text-2xl font-semibold text-red-600",
                    icon: "text-red-500 animate-bounce",
                    confirmButton: "bg-primary" // Warna biru untuk tombol konfirmasi
                },
                backdrop: "rgba(0, 0, 0, 0.4)",
            });
            console.error("Failed to create user:", error);
            // alert
            setLoginError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <section className="flex flex-col min-h-screen bg-primary justify-center items-center">
                <div className="right px-4 md:mx-0 w-full h-full flex flex-col justify-center items-center">
                    <div className="card w-full bg-white md:rounded-[40px] rounded-[20px] shadow dark:border md:mt-0 sm:max-w-2xl mx-3 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 sm:p-8">
                            <div className="head my-3 mb-7 flex flex-col gap-1">
                                <div className="text-primary font-semibold md:text-2xl text-xl">Daftar Akun</div>
                                <div className="text-primary text-sm">Sudah Punya Akun? Silahkan <Link className="font-semibold" href="/login">Masuk</Link></div>
                            </div>
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {/*  */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-xs md:text-base font-medium text-primary "
                                    >
                                        Nama
                                    </label>
                                    <Input
                                        type="text"
                                        id="name"
                                        {...register("name")}
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:primary focus:border-primary block w-full"
                                        placeholder="Masukkan nama"
                                    />
                                    {errors.name && (
                                        <HelperError>{errors.name.message}</HelperError>
                                    )}
                                </div>
                                {/*  */}
                                <div>
                                    <label
                                        htmlFor="telepon"
                                        className="block mb-2 text-xs md:text-base font-medium text-primary "
                                    >
                                        Nomor Telepon
                                    </label>
                                    <Input
                                        type="number"
                                        id="telepon"
                                        {...register("telepon")}
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:primary focus:border-primary block w-full"
                                        placeholder="Masukkan nomor telepon"
                                    />
                                    {errors.telepon && (
                                        <HelperError>{errors.telepon.message}</HelperError>
                                    )}
                                </div>
                                {/*  */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-xs md:text-base font-medium text-primary "
                                    >
                                        Email
                                    </label>
                                    <Input
                                        type="text"
                                        id="email"
                                        {...register("email")}
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:primary focus:border-primary block w-full"
                                        placeholder="name@email.com"
                                    />
                                    {errors.email && (
                                        <HelperError>{errors.email.message}</HelperError>
                                    )}
                                </div>
                                {/*  */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-xs md:text-base font-medium text-primary"
                                    >
                                        Kata Sandi
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="password"
                                            id="password"
                                            {...register("password")}
                                            placeholder="••••••••"
                                            className="border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:primary focus:border-primary block w-full p-3"
                                        />
                                        {errors.password && (
                                            <HelperError>{errors.password.message}</HelperError>
                                        )}
                                    </div>
                                </div>
                                {loginError && (
                                    <div className="text-red-500 mt-2 text-center">{loginError}</div>
                                )}
                                <Button
                                    type="submit"
                                    className="text-white bg-primary py-3 px-4 rounded-full w-full my-1"
                                    disabled={loading}
                                >
                                    {loading ? <Loading /> : "Daftar"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* snk */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <div
                        className="bg-white p-4 rounded-lg relative max-w-[500px] mx-3 md:mx-0 w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent click on inner box from closing the popup
                    >
                        <div>
                            <div className="md:h-[600px] h-[400px] overflow-auto no-scrollbar">
                                <div
                                    className="prose text-xs md:text-sm max-w-none text-justify"
                                    dangerouslySetInnerHTML={{ __html: "Tidak Ada Deskripsi" }}
                                />
                            </div>
                            {/*  */}
                            <div className="flex justify-center mt-5">
                                <Button
                                    onClick={handleClosePopup}
                                    className="py-2 bg-primary text-white text-sm rounded-full w-[170px]"
                                >
                                    Setujui
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* snk */}
            {/* kebijakan privasi */}
            {isOpenKebijakan && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <div
                        className="bg-white p-4 rounded-lg relative max-w-[500px] mx-3 md:mx-0 w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent click on inner box from closing the popup
                    >
                        <div>
                            <div className="md:h-[600px] h-[400px] overflow-auto no-scrollbar">
                                <div className="font-semibold mb-3">
                                    data kebijakan
                                </div>
                                <div
                                    className="prose text-xs md:text-sm max-w-none text-justify"
                                    dangerouslySetInnerHTML={{ __html: "Tidak Ada Deskripsi" }}
                                />
                            </div>
                            {/*  */}
                            <div className="flex justify-center mt-5">
                                <Button
                                    onClick={handleClosePopupKebijakan}
                                    className="py-2 bg-primary text-white text-sm rounded-full w-[170px]"
                                >
                                    Setujui
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* kebijakan privasi */}
        </div>
    );
};

export default LoginPage;
