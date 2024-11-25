/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import Burger from "../../../../../public/assets/icons/burger";
import Close from "../../../../../public/assets/icons/close";
import { usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import ArrowDown from "../../../../../public/assets/icons/ArrowDown";
import { useGetAboutCompany } from "@/services/api";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [burger, setBurger] = useState(false);
    const pathname = usePathname();

    const handleBurger = () => {
        setBurger(!burger);
    };

    const handleScroll = () => {
        const isScrolled = window.scrollY > 0;
        setScrolled(isScrolled);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

     // INTEGRASI
  const { data } = useGetAboutCompany();
  // INTEGRASI

    return (
        <div className="">
            <div
                className={`fixed  hidden md:block w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-primary/50' : 'bg-primary'
                    }`}
            >
                <div className="wrap py-2 m-auto container flex justify-between items-center">
                    <div className="logo h-[63px]">
                        <img className="h-full object-cover" src={data?.data?.main_logo ?? "-"} alt="" />
                        {/* <img className="h-full object-cover" src={`${scrolled ? 'Images/alin2.png' : 'Images/alin.png '
                            }`} alt="" /> */}
                    </div>
                    <div className="wrap flex gap-7  items-center">
                        <div className={`nav flex gap-7 text-[18px] text-white ${scrolled ? 'text-white' : ''}`}>
                            <Link
                                href="/"
                                className={`${pathname === "/"
                                    ? "font-bold text-secondary"
                                    : "text-white hover:text-secondary"} 
            ${scrolled ? 'text-secondary' : ''}`}
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/program"
                                className={`${pathname === "/program"
                                    ? "font-bold text-secondary"
                                    : "text-white hover:text-secondary"} 
            ${scrolled ? 'text-secondary' : ''}`}
                            >
                                Program
                            </Link>
                            <Link
                                href="/my-package"
                                className={`${pathname.startsWith("/my-package")
                                    ? "font-bold text-secondary"
                                    : "text-white hover:text-secondary"} 
        ${scrolled ? 'text-secondary' : ''}`}
                            >
                                Paket Saya
                            </Link>
                        </div>
                        {/*  */}
                        <div className="wrap ml-4 flex gap-3 items-center">
                            <Link href="/login" className="loginn bg-secondary p-2 px-12 hover:bg-secondary-hover  rounded-full text-white">
                                Login
                            </Link>
                            <Link href="/register" className="loginn bg-white p-2 px-12 hover:bg-secondary-hover  rounded-full text-primary">
                                Daftar
                            </Link>
                        </div>
                        {/* profile */}
                        <div className="wrap ml-4 flex gap-3 items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex items-center gap-3 text-white">
                                        <div className="h-[35px] w-[35px] border border-white rounded-full overflow-hidden">
                                            <Image
                                                src="/assets/images/Profile-nav.png"
                                                alt="logo"
                                                width={1000}
                                                height={1000}
                                                unoptimized
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="">Qurrota Aini</div>
                                        <div className="">
                                            <ArrowDown />
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white mt-2">
                                    <DropdownMenuItem>
                                        <Link
                                            className={`${pathname === "/profile"
                                                ? "font-bold text-primary"
                                                : "text-black"}`}
                                            href="/profile">
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            className={`${pathname === "/profile/forgot-password"
                                                ? "font-bold text-primary"
                                                : "text-black"}`}
                                            href="/profile/forgot-password">
                                            Ganti Kata Sandi
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link
                                            href="/">
                                            Keluar
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>
                </div>
            </div>
            {/* responsive */}
            <div
                className={`fixed w-full z-50 transition-all duration-300 ease-in-out bg-primary-hover md:hidden`}
            >
                <div className="wrap py-2 px-2 m-auto container flex justify-between items-center">
                    <div className="nav flex items-end flex-col gap-1 text-[17px]  w-full text-white">
                        <div className="wrap-head flex  w-full items-center justify-between">
                            <div className="res bg-primary2 rounded-md w-[50px] h-[50px] flex justify-center items-center text-[40px] font-bold cursor-pointer" onClick={handleBurger}>
                                {burger ? <Close /> : <Burger />}
                            </div>
                            <div className="wrap ml-4 flex gap-3 items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="md:h-[35px] md:w-[35px] h-[28px] w-[28px] border border-white rounded-full overflow-hidden">
                                                <Image
                                                    src="/assets/images/Profile-nav.png"
                                                    alt="logo"
                                                    width={1000}
                                                    height={1000}
                                                    unoptimized
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="text-sm">Irsyad Abi</div>
                                            <div className="">
                                                <ArrowDown />
                                            </div>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white mt-2">
                                        <DropdownMenuItem>
                                            <Link
                                                className={`${pathname === "/profile"
                                                    ? "font-bold text-primary"
                                                    : "text-black"}`}
                                                href="/profile">
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                className={`${pathname === "/profile/forgot-password"
                                                    ? "font-bold text-primary"
                                                    : "text-black"}`}
                                                href="/profile/forgot-password">
                                                Ganti Kata Sandi
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                href="/">
                                                Keluar
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        </div>
                        {/*  */}
                        <div className={`wrap pt-2 text-sm fixed mt-[50px] flex ${burger ? "left-0" : "left-[-100%]"}  bg-primary-hover w-full items-center flex-col gap-5 transition-all duration-500`}>
                            <div className={`flex-col text-sm text-center nav flex gap-5 text-[18px] text-white ${scrolled ? 'text-white' : ''}`}>
                                <Link
                                    href="/"
                                    className={`${pathname === "/"
                                        ? "font-bold text-secondary"
                                        : "text-white hover:text-secondary"} 
            ${scrolled ? 'text-secondary' : ''}`}
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href="/program"
                                    className={`${pathname === "/program"
                                        ? "font-bold text-secondary"
                                        : "text-white hover:text-secondary"} 
            ${scrolled ? 'text-secondary' : ''}`}
                                >
                                    Program
                                </Link>
                                <Link
                                    href="/my-package"
                                    className={`${pathname.startsWith("/my-package")
                                        ? "font-bold text-secondary"
                                        : "text-white hover:text-secondary"} 
        ${scrolled ? 'text-secondary' : ''}`}
                                >
                                    Paket Saya
                                </Link>
                            </div>
                            {/*  */}
                            <div className="wrap ml-4 flex flex-col pb-4 gap-3 items-center">
                                <Link href="/login" className="loginn bg-secondary p-2 px-12 hover:bg-secondary-hover  rounded-full text-white">
                                    Login
                                </Link>
                                <Link href="/register" className="loginn bg-white p-2 px-12 hover:bg-secondary-hover  rounded-full text-primary">
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Navbar