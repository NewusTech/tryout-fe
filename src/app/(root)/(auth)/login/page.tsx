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
import Cookies from "js-cookie"; // Import js-cookie
import { useGetAboutCompany, useGetTnc } from "@/services/api";


const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email wajib diisi" }),
    // .email({ message: "Alamat email tidak valid" }),
    password: z
        .string()
        .min(6, { message: "Password wajib diisi minimal harus 6 karakter" }),
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

    const setAccessToken = (token: string) => {
        // Store token in cookies (with 7 days expiry, you can adjust as needed)
        Cookies.set("accessToken", token,);
    };

    const setUsername = (username: string) => {
        // Store username in cookies (with 7 days expiry, you can adjust as needed)
        Cookies.set("username", username,);
    };
    const setProfile = (profile: string) => {
        Cookies.set("profile", profile,);
    };
    const setSlug = (slug: string) => {
        Cookies.set("slug", slug,);
    };

    const onSubmit = async (data: FormSchemaType) => {
        setLoading(true);
        setLoginError(null); // Reset previous errors

        try {
            const response = await axiosInstance.post("/login", {
                email: data.email,
                password: data.password,
            });

            if (response.status === 200) {
                // alert
                Swal.fire({
                    icon: "success",
                    title: "Berhasil Login!",
                    text: "Selamat Datang ✅",
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
                // alert
                setAccessToken(response?.data?.data?.token);
                setUsername(response?.data?.data?.username);
                setSlug(response?.data?.data?.slug);
                setProfile(response?.data?.data?.profile);
                // reset();
                router.push("/");
            }
        } catch (error: any) {
            // alert
            // Extract error message from API response
            const errorMessage =
                error.response?.data?.data?.[0]?.message || "Login gagal. Silakan coba lagi!";
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
    // INTEGRASI
    const { data : dataSnk } = useGetTnc();

    return (
        <div>
            <section className="flex flex-col min-h-screen bg-primary justify-center items-center">
                <div className="right px-4 md:mx-0 w-full h-full flex flex-col justify-center items-center">
                    <div className="card w-full bg-white rounded-[20px] md:rounded-[40px] shadow dark:border md:mt-0 sm:max-w-2xl mx-3 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 sm:p-8">
                            <div className="head my-3 mb-5 flex flex-col gap-3">
                                <div className="log flex justify-center md:mb-7">
                                    <Image
                                        src={data?.data?.sub_logo ?? "/assets/images/logo-login.png"}
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
                                    Login
                                </div>
                            </div>
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 md:text-base text-xs font-medium text-primary "
                                    >
                                        Email
                                    </label>
                                    <Input
                                        type="text"
                                        id="email"
                                        {...register("email")}
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:primary focus:border-primary block w-full"
                                        placeholder="name@email.com"
                                        leftIcon={<UserIcon />}
                                    />
                                    {errors.email && (
                                        <HelperError>{errors.email.message}</HelperError>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 md:text-base text-xs font-medium text-primary"
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
                                <div className="wrap flex md:flex-row flex-col justify-end">
                                    <p className="text-start mb-1 text-sm md:text-base ">
                                        <Link
                                            href="/forgot-password"
                                            className="text-primary text-xs md:text-sm font-medium hover:underline"
                                        >
                                            Lupa Kata Sandi?
                                        </Link>
                                    </p>
                                </div>
                                <Button
                                    type="submit"
                                    className="text-white bg-primary py-3 px-4 rounded-full w-full my-1"
                                    disabled={loading}
                                >
                                    {loading ? <Loading /> : "Masuk"}
                                </Button>
                                <Link href="/register"
                                    className="bg-white border md:text-base text-xs border-primary rounded-full py-3 px-4 text-primary font-medium hover:bg-slate-100 w-full text-center duration-200 hover:text-primary transition ease-in-out delay-150 hover:-translate-y-1"
                                >
                                    Daftar
                                </Link>
                                <p className="text-center md:hidden mb-1 mt-0 text-xs md:text-base md:mb-5">
                                    Belum punya akun? {" "}
                                    <Link
                                        href="/register"
                                        className="font-medium text-primary hover:underline"
                                    >
                                        Daftar Perusahaan
                                    </Link>
                                </p>
                            </form>
                            <div className="mt-6 md:text-base text-xs text-primary text-center">
                                Dengan mendaftar, Kamu telah menyetujui <span onClick={() => handleOpenPopup()} className="text-primary cursor-pointer hover:underline font-medium">Syarat & Ketentuan</span> kami dan Kamu telah membaca <span onClick={() => handleOpenPopupKebijakan()} className="text-primary cursor-pointer hover:underline font-medium">Kebijakan Privasi</span> kami.
                            </div>
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
                                    dangerouslySetInnerHTML={{ __html: dataSnk?.data?.privacy_policy ?? "Tidak ada Kebijakan Privasi" }}
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
                                <div
                                    className="prose text-xs md:text-sm max-w-none text-justify"
                                    dangerouslySetInnerHTML={{ __html: dataSnk?.data?.term_condition ?? "Tidak ada kebijakan" }}
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
