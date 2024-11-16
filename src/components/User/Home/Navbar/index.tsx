/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import Burger from "../../../../../public/assets/icons/burger";
import Close from "../../../../../public/assets/icons/close";
import { usePathname } from "next/navigation";

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

    return (
        <div className="">
            <div
                className={`fixed  hidden md:block w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-primary/10' : 'bg-primary'
                    }`}
            >
                <div className="wrap py-2 m-auto container flex justify-between items-center">
                    <div className="logo h-[63px]">
                        <img className="h-full object-cover" src={`../../assets/images/logo-nav.png`} alt="" />
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

                        <div className="wrap ml-4 flex gap-3 items-center">
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
            {/* responsive */}
            <div
                className={`fixed w-full z-50 transition-all duration-300 ease-in-out bg-primary block md:hidden`}
            >
                <div className="wrap py-2 px-2 m-auto container flex justify-between items-center">
                    <div className="nav flex items-end flex-col gap-1 text-[17px]  w-full text-white">
                        <div className="wrap-head flex  w-full items-center justify-between">
                            <div className="logo">
                                <img className="h-[40px]" src="/assets/images/logo-nav.png" alt="" />
                            </div>
                            <div className="res bg-primary2 rounded-md w-[50px] h-[50px] flex justify-center items-center text-[40px] font-bold cursor-pointer" onClick={handleBurger}>
                                {burger ? <Close /> : <Burger />}
                            </div>
                        </div>

                        <div className={`wrap ${burger ? "flex opacity-100" : "hidden opacity-0 "}  bg-primary w-full items-center flex-col gap-5 transition-all duration-500`}>
                            <a href="#beranda" className="font-bold">
                                Beranda
                            </a>
                            <a className="hover:font-bold transition-all duration-300" href="#layanan">Program</a>
                            <Link href="/login" className="loginn bg-secondary p-2 px-6 hover:bg-[#c78f3b]  rounded-full text-white">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Navbar