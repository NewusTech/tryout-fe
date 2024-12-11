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
import { useGetAboutCompany } from "@/services/api";


const formSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, "Kata sandi baru harus minimal 8 karakter"),
        confirmNewPassword: z
            .string()
            .min(1, "Konfirmasi kata sandi baru wajib diisi"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Kata sandi baru dan konfirmasi tidak cocok",
        path: ["confirmNewPassword"], // Path untuk field error
    });

type FormSchemaType = z.infer<typeof formSchema>;

const ResetPasswordPage = () => {
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
    const [token, setToken] = useState("");
    const router = useRouter();

    const onSubmit = async (data: FormSchemaType) => {
        setLoading(true);
        setLoginError(null); // Reset previous errors

        try {
            const response = await axiosInstance.post(`/user/reset/${token}`, {
                newPassword: data.newPassword,
                confirmNewPassword: data.confirmNewPassword,
            });
            Swal.fire({
                icon: "success",
                title: "Kata sandi berhasil diubah!",
                timer: 1500,
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
            router.push("/");
        } catch (error: any) {
            // alert
            // Extract error message from API response
            const errorMessage =
                error.response?.data?.data?.[0]?.message || error.response?.data?.message || "Gagal mengubah kata sandi";
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

    const { data, isLoading } = useGetAboutCompany();

    console.log("token = ", token)

    return (
        <div>
            <section className="flex flex-col min-h-screen bg-primary justify-center items-center">
                <div className="right px-4 md:mx-0 w-full h-full flex flex-col justify-center items-center">
                    <div className="card w-full bg-white md:rounded-[40px] rounded-[20px] shadow dark:border md:mt-0 sm:max-w-2xl mx-3 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 sm:p-8">
                            <div className="head my-3 mb-5 flex flex-col gap-3">
                                <div className="log flex justify-center md:mb-7">
                                    <Image
                                        src="/assets/images/logo-login2.png"
                                        alt="logo"
                                        width={400}
                                        height={400}
                                        unoptimized
                                        className="w-[300px] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="head my-3 mb-7 flex flex-col gap-1">
                                <div className="text-primary font-semibold md:text-2xl text-xl">
                                    Atur Ulang Kata Sandi
                                </div>
                            </div>
                            {/*  */}
                            <div className="mb-3">
                                <label
                                    htmlFor="token"
                                    className="block mb-2 text-xs md:text-base font-medium text-primary "
                                >
                                    Token
                                </label>
                                <Input
                                    id="token"
                                    type="text"
                                    placeholder="Masukkan Token"
                                    onChange={(e) => setToken(e.target.value)}
                                />
                            </div>
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {/*  */}
                                <div>
                                    <label
                                        htmlFor="newPassword"
                                        className="block mb-2 text-xs md:text-base font-medium text-primary "
                                    >
                                        Kata Sandi Baru
                                    </label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="Kata Sandi Baru"
                                        {...register("newPassword")}
                                    />
                                    {errors.newPassword && (
                                        <HelperError>{errors.newPassword.message}</HelperError>
                                    )}
                                </div>
                                {/*  */}
                                <div>
                                    <label
                                        htmlFor="confirmNewPassword"
                                        className="block mb-2 text-xs md:text-base font-medium text-primary "
                                    >
                                        Konfirmasi Kata Sandi Baru
                                    </label>
                                    <Input
                                        id="confirmNewPassword"
                                        type="password"
                                        placeholder="Kata Sandi Baru"
                                        {...register("confirmNewPassword")}
                                    />
                                    {errors.confirmNewPassword && (
                                        <p className="text-red-500 text-sm">
                                            {errors.confirmNewPassword.message}
                                        </p>
                                    )}
                                </div>
                                {loginError && (
                                    <div className="text-red-500 mt-2 text-center">{loginError}</div>
                                )}
                                <div className="flex justify-center">
                                    <div className="text-primary text-sm">Kembali ke halaman <Link className="font-semibold" href="/login">Login</Link></div>
                                </div>
                                <Button
                                    type="submit"
                                    className="text-white bg-primary py-3 px-4 rounded-full w-full my-1"
                                    disabled={loading}
                                >
                                    {loading ? <Loading /> : "Kirim"}
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

export default ResetPasswordPage;
