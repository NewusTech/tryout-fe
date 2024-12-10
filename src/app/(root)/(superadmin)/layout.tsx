"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DashboardIcon from "../../../../public/assets/icons/DashboardIcon";
import TryoutIcon from "../../../../public/assets/icons/TryoutIcon";
import PaymentIcon from "../../../../public/assets/icons/PaymentIcon";
import QuestionIcon from "../../../../public/assets/icons/QuestionIcon";
import UserAdminIcon from "../../../../public/assets/icons/UserAdminIcon";
import FeedBackIcon from "../../../../public/assets/icons/FeedBackIcon";
import ReportIcon from "../../../../public/assets/icons/ReportIcon";
import MasterDataIcon from "../../../../public/assets/icons/MasterDataIcon";
import LogoutIcon from "../../../../public/assets/icons/LogoutIcon";
import ComponentWithAccess from "@/components/Auth/componentWithAccess";
import Cookies from "js-cookie";
import Swal from "sweetalert2"; // Make sure to import SweetAlert2


interface LayoutPerusahaanProps {
    children: React.ReactNode;
    title?: string;
}

interface MenuProps {
    icons?: React.ReactNode;
    children: React.ReactNode;
    title?: string;
    link: string;
}

const Menu = (props: MenuProps) => {
    const pathname = usePathname();
    return (
        <Link
            href={props.link}
            className={`nav hover:pl-[15px] transition-all duration-150 flex items-center gap-4 text-left rounded-[8px] py-[13px]  px-[10px] ${pathname.startsWith(props.link) ? "text-primary bg-[#F5F5F5]" : "text-primary"}`} >
            <div className="icon">{props.icons}</div>
            <div className={`nama flex gap-2 items-center ${pathname.startsWith(props.link)
                ? "text-primary font-medium"
                : "text-primary"
                }`}>
                {props.children}
            </div>
        </Link>
    );
};

interface LayProps {
    link?: string;
}


const LayoutPerusahaan = (props: LayoutPerusahaanProps) => {

    const router = useRouter();
    // 

    const handleLogout = () => {
        // Menghapus semua item di localStorage
        localStorage.clear();
        // Menghapus semua cookie
        document.cookie.split(';').forEach(cookie => {
            const cookieName = cookie.split('=')[0].trim();
            Cookies.remove(cookieName);
        });

        // Tampilkan pop-up sukses tanpa tombol OK, otomatis menghilang setelah 2 detik
        Swal.fire({
            title: 'Logout Berhasil',
            text: 'Anda akan diarahkan ke halaman login.',
            icon: 'success',
            timer: 2000,  // Pop-up akan otomatis tertutup setelah 2 detik
            timerProgressBar: true,  // Menampilkan progress bar waktu
            showConfirmButton: false,  // Tidak menampilkan tombol OK
        }).then(() => {
            // Arahkan ke halaman login setelah pop-up ditutup otomatis
            router.push('/login-admin');
        });
        router.push('/login-admin');
    };

    const [navbar, setNavbar] = useState(false);

    const pathname = usePathname();
    const isProdukActive =
        pathname.startsWith("/admin/cms/kategori") ||
        pathname.startsWith("/admin/cms/unit");
    const [produk, setProduk] = useState(isProdukActive);

    const handleProduk = () => {
        setProduk(!produk);
    };

    const handleNavbar = () => {
        setNavbar(!navbar);
    };
    const handleDropdownOpen = (route: string) => {
        setIsDropdownOpen(isDropdownOpen === route ? null : route);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
    return (
        <div className="wrap w-full min-h-screen bg-[#FFFFFF] relative">
            {/* navbar */}
            <div className="navatas md:px-0 top-0 w-full md:w-full right-0 fixed md:bg-transparent bg-[#F6F6F6] py-4 pr-5 pl-5 md:-z-30 z-10">
                <div className="wra white -z-10 md:ml-[290px] bg-transparent m-auto justify-between md:justify-end md:py-[23px] flex items-center gap-4 text-left">
                    <div className="teks flex-shrink-0 text-primary">
                        <div className="head font-bold text-lg text-primary">
                            TRYOUT
                        </div>
                        {/* <div className="head text-sm">Super Admin</div> */}
                    </div>
                    <div
                        onClick={handleNavbar}
                        className="icon  flex cursor-pointer md:hidden bg-primary rounded p-2 w-[40px] justify-center items-center px-2 text-white "
                    >
                        {navbar ? "x" : "="}
                    </div>
                </div>
            </div>
            {/* sidebar */}
            <div className={`sidebar border-r-2 border-gray-100 shadow-lg bg-white overflow-auto z-50 pt-[10px] md:pt-0 md:z-20 md:block h-screen fixed top-0 ${navbar ? "left-[0%]" : "left-[-100%]"
                } box-border md:w-[310px] md:shadow-none shadow-lg w-[75%] px-[20px] bg-whie transition-all duration-300 md:left-0 `}>
                {/* menu */}
                <div className="wrap-nav mt-[20px] flex bg-red flex-col gap-2 mb-10">
                    <div className="">
                        <Image
                            src="/assets/images/Logo-login.png"
                            alt="logo"
                            width={1000}
                            height={1000}
                            unoptimized
                            className="w-full object-contain"
                        />
                    </div>
                    {/* <div className="text-primary text-4xl mb-5 font-semibold flex">
                        Admin
                    </div> */}
                    <div className="wrap flex flex-col gap-1 ">
                        <div className=" overflow-auto flex flex-col justify-between">
                            {/* accordion */}
                            <ComponentWithAccess toLogin>
                                <Accordion className="" type="single" collapsible>
                                    {/* dashboard */}
                                    <AccordionItem className="" value="item-1">
                                        <Link
                                            href="/dashboard"
                                            className={`nav font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] ${pathname.startsWith("/dashboard")
                                                ? "bg-primary text-white"
                                                : "bg-transparent text-primary"
                                                }`} >
                                            <div className="w-[35px]">
                                                <DashboardIcon />
                                            </div>
                                            Dashboard
                                        </Link>
                                    </AccordionItem>
                                    {/* dashboard */}
                                    {/* Tryout */}
                                    <AccordionItem className="" value="item-2">
                                        <AccordionTrigger
                                            className={`nav font-medium flex gap-2 mb-2 rounded-[8px] py-[12px] overflow-hidden px-[25px] ${pathname.startsWith(
                                                "/tryout"
                                            )
                                                ? "bg-primary text-white"
                                                : "bg-transparent text-primary"
                                                }`}>
                                            <div className="flex gap-3 items-center text-sm md:text-base">
                                                <div className="w-[35px]">
                                                    <TryoutIcon />
                                                </div>
                                                Tryout
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 flex flex-col gap-2 mb-2 rounded-md">
                                            <Menu link="/tryout/live-monitoring">
                                                <span className="text-sm md:text-base">
                                                    Live Monitoring
                                                </span>
                                            </Menu>
                                            <Menu link="/tryout/schedule">
                                                <span className="text-sm md:text-base">
                                                    Jadwal
                                                </span>
                                            </Menu>
                                            <Menu link="/tryout/history">
                                                <span className="text-sm md:text-base">
                                                    Riwayat
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                    {/* Tryout */}
                                    {/* pembayaran */}
                                    <AccordionItem className="" value="item-3">
                                        <Link
                                            href="/payment"
                                            className={`nav font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] ${pathname.startsWith("/payment")
                                                ? "bg-primary text-white"
                                                : "bg-transparent text-primary"
                                                }`} >
                                            <div className="w-[35px]">
                                                <PaymentIcon />
                                            </div>
                                            Pembayaran
                                        </Link>
                                    </AccordionItem>
                                    {/* pembayaran */}
                                    {/* Bank Soal */}
                                    <AccordionItem className="" value="item-4">
                                        <AccordionTrigger
                                            className={`nav font-medium flex gap-2 mb-2 rounded-[8px] py-[12px] overflow-hidden px-[25px] ${pathname.startsWith(
                                                "/question-bank"
                                            )
                                                ? "bg-primary text-white"
                                                : "bg-transparent text-primary"
                                                }`}>
                                            <div className="flex gap-3 items-center text-sm md:text-base">
                                                <div className="w-[35px]">
                                                    <QuestionIcon />
                                                </div>
                                                Bank Soal
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 flex flex-col gap-2 mb-2 rounded-md">
                                            <Menu link="/question-bank/question-answer">
                                                <span className="text-sm md:text-base">
                                                    Soal & Jawaban
                                                </span>
                                            </Menu>
                                            <Menu link="/question-bank/tryout-package">
                                                <span className="text-sm md:text-base">
                                                    Paket Tryout
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                    {/* Bank Soal */}
                                    {/* Pengguna */}
                                    <AccordionItem className="" value="item-5">
                                        <AccordionTrigger
                                            className={`nav font-medium flex gap-2 mb-2 rounded-[8px] py-[12px] overflow-hidden px-[25px] ${pathname.startsWith(
                                                "/user"
                                            )
                                                ? "bg-primary text-white"
                                                : "bg-transparent text-primary"
                                                }`}>
                                            <div className="flex gap-3 items-center text-sm md:text-base">
                                                <div className="w-[35px]">
                                                    <UserAdminIcon />
                                                </div>
                                                Pengguna
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 flex flex-col gap-2 mb-2 rounded-md">
                                            <Menu link="/user/user">
                                                <span className="text-sm md:text-base">
                                                    User
                                                </span>
                                            </Menu>
                                            <Menu link="/user/admin">
                                                <span className="text-sm md:text-base">
                                                    Admin
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                    {/* Pengguna */}
                                    {/* feedback */}
                                    <AccordionItem className="" value="item-3">
                                        <Link
                                            href="/feedback"
                                            className={`nav font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] ${pathname.startsWith("/feedback")
                                                ? "bg-primary text-white"
                                                : "bg-transparent text-primary"
                                                }`} >
                                            <div className="w-[35px]">
                                                <FeedBackIcon />
                                            </div>
                                            Feedback
                                        </Link>
                                    </AccordionItem>
                                    {/* feedback */}
                                    {/* Laporan */}
                                    <AccordionItem className="" value="item-7">
                                        <Link
                                            href="/report"
                                            className={`nav font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] ${pathname.startsWith("/report")
                                                ? "bg-primary text-white"
                                                : "bg-transparent text-primary"
                                                }`} >
                                            <div className="w-[35px]">
                                                <ReportIcon />
                                            </div>
                                            Laporan
                                        </Link>
                                    </AccordionItem>
                                    {/* Laporan */}
                                    {/* Data Master */}
                                    <AccordionItem className="" value="item-8">
                                        <AccordionTrigger
                                            className={`nav font-medium flex gap-2 mb-2 rounded-[8px] py-[12px] overflow-hidden px-[25px] ${pathname.startsWith(
                                                "/data-master"
                                            )
                                                ? "bg-primary text-white"
                                                : "bg-transparent text-primary"
                                                }`}>
                                            <div className="flex gap-3 items-center text-sm md:text-base">
                                                <div className="w-[35px]">
                                                    <MasterDataIcon />
                                                </div>
                                                Data Master
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 flex flex-col gap-2 mb-2 rounded-md">
                                            <Menu link="/data-master/package-type">
                                                <span className="text-sm md:text-base">
                                                    Tipe Paket
                                                </span>
                                            </Menu>
                                            <Menu link="/data-master/payment-type">
                                                <span className="text-sm md:text-base">
                                                    Tipe Pembayaran
                                                </span>
                                            </Menu>
                                            <Menu link="/data-master/question-type">
                                                <span className="text-sm md:text-base">
                                                    Tipe Pertanyaan
                                                </span>
                                            </Menu>
                                            <Menu link="/data-master/term-policies">
                                                <span className="text-sm md:text-base">
                                                    Ketentuan & Kebijakan
                                                </span>
                                            </Menu>
                                            <Menu link="/data-master/about-company">
                                                <span className="text-sm md:text-base">
                                                    Tentang Perusahaan
                                                </span>
                                            </Menu>
                                            <Menu link="/data-master/banner">
                                                <span className="text-sm md:text-base">
                                                    Banner Beranda
                                                </span>
                                            </Menu>
                                            <Menu link="/data-master/why-us">
                                                <span className="text-sm md:text-base">
                                                    Kenapa Kami
                                                </span>
                                            </Menu>
                                            <Menu link="/data-master/social-media">
                                                <span className="text-sm md:text-base">
                                                    Media Sosial
                                                </span>
                                            </Menu>
                                            <Menu link="/data-master/setting-sertifikat">
                                                <span className="text-sm md:text-base">
                                                    Pengaturan Sertifikat
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                    {/* Data Master */}
                                </Accordion>
                            </ComponentWithAccess>
                            {/* accordion */}
                            {/* profile */}
                            <div className="wrap mt-10 flex flex-col gap-3">
                                <div className="flex gap-3 px-5 items-center">
                                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                        <Image
                                            src="/assets/images/Profile-nav.png"
                                            alt="logo"
                                            width={1000}
                                            height={1000}
                                            unoptimized
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 text-primary">
                                        <div className="font-medium text-sm">Super Admin</div>
                                    </div>
                                </div>
                                {/*  */}
                                <div
                                    onClick={handleLogout}
                                    className={`nav cursor-pointer font-medium hover:pl-10 duration-200 transition-all flex pr-4 text-sm md:text-base items-center gap-[12px] mb-2 rounded-[8px] py-[12px] px-[24px] bg-transparent text-primary`} >
                                    <div className="w-[35px]">
                                        <LogoutIcon />
                                    </div>
                                    Log Out
                                </div>
                            </div>
                            {/* profile */}
                        </div>
                    </div>
                </div>
            </div>
            {/* KONTEN */}
            <div className="konten z-10 md:px-0 px-[10px] md:mr-[20px] md:ml-[350px] md:pt-[15px] pt-[70px] h-full pb-5">
                <div className="konten overflow-auto h-[90%] p-3 md:p-6 bg-white rounded-xl">
                    {/* konten */}
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default LayoutPerusahaan;
