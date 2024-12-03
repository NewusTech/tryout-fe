"use client";
import Navbar from "@/components/User/Home/Navbar";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LinkCustom from "@/components/ui/LinkCustom";
import { useGetUserTryoutPackage } from "@/services/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import PaginationTable from "@/components/Custom/PaginationTable";
import PriceCeklist from "../../../../../public/assets/icons/PriceCeklist";
import PriceNonCek from "../../../../../public/assets/icons/PriceNonCek";
import LoadingPage from "@/components/ui/LoadingPage";

const MyPackage = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Search state
    const [search, setSearch] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to page 1
    };

    // Access token state
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        setAccessToken(Cookies.get("accessToken"));
    }, []);

    // Conditionally fetch data only when accessToken is available
    const { data, isLoading } = useGetUserTryoutPackage(currentPage, search);

    const router = useRouter();

    // Set package in cookies
    const setPackageStart = (packageId: string) => {
        Cookies.set("package", packageId);
    };

    const handleStart = (id: string) => {
        setPackageStart(id);
        router.push("/my-package/do-assignments");
    };

    return (
        <div className="text-srBlack overflow-x-hidden">
            <Navbar />
            <div className="container mx-auto min-h-screen">
                <div className="text-secondary font-semibold text-2xl pt-[120px]">
                    Paket Saya
                </div>
                <div className="mt-4 flex items-center gap-3">
                    <div className="md:w-[40%] w-full">
                        <Input
                            placeholder="Cari Paket"
                            className="border-primary"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <Button className="py-3.5 md:py-2.5">Try Out</Button>
                </div>

                {accessToken ? (
                    // Paket sudah login
                    <div className="pb-10">
                        <div className="mt-7 flex flex-col gap-3 md:gap-4">
                            {data?.data && data.data.length > 0 ? (
                                data.data.map((user) => (
                                    <div
                                        key={user?.id}
                                        className="card bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden md:p-7 flex md:flex-row flex-col gap-4"
                                    >
                                        <div className="left flex-shrink-0">
                                            <Image
                                                src="/assets/images/book.png"
                                                alt="logo"
                                                width={1000}
                                                height={1000}
                                                unoptimized
                                                className="md:w-[300px] w-full object-contain md:rounded-xl"
                                            />
                                        </div>
                                        <div className="right px-4 pb-4 md:px-0 md:pb-0 flex flex-col justify-between w-full">
                                            <div className="head text-primary flex flex-col gap-1">
                                                <div className="md:text-xl text-base font-semibold">
                                                    {user?.title ?? "-"}
                                                </div>
                                                <div className="flex flex-col gap-2 mt-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-medium w-[90px]">Durasi</div>
                                                        <div>:</div>
                                                        <div>{user?.duration ?? "-"}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-medium w-[90px]">Harga</div>
                                                        <div>:</div>
                                                        <div>
                                                            {user?.price
                                                                ? `Rp. ${Number(user.price).toLocaleString(
                                                                    "id-ID"
                                                                )}`
                                                                : "-"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="button flex gap-3 justify-end w-full mt-5">
                                                <Button
                                                    onClick={() => handleStart(user.id.toString())}
                                                    className="px-10 text-white text-sm w-full md:w-[160px]"
                                                >
                                                    Kerjakan
                                                </Button>
                                                <LinkCustom
                                                    href="/my-package/history"
                                                    className="px-10 w-full md:w-[160px] bg-white text-primary border border-primary"
                                                >
                                                    Riwayat
                                                </LinkCustom>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center mt-5">Tidak ada Data</div>
                            )}
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <PaginationTable
                                currentPage={currentPage}
                                totalPages={data?.pagination?.totalPages || 1}
                                onPageChange={onPageChange}
                            />
                        </div>
                    </div>
                ) : (
                    // Paket belum login
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-10">
                        <div className="bg-white border flex flex-col justify-between border-gray-100 rounded-2xl shadow-md p-5 px-6">
                            <div className="">
                                <div className="head py-6 text-primary text-4xl font-medium text-center border-b border-gray-100">
                                    Gratis
                                </div>
                                <div className="">
                                    <div className="py-7 border-b border-gray-100">
                                        <div className="flex gap-1 justify-center items-end">
                                            <div className="flex gap-1 justify-center">
                                                <div className="">Rp</div>
                                                <div className="text-3xl font-medium">0</div>
                                            </div>
                                            <div className=" text-black/60">/Tahun</div>
                                        </div>
                                        <div className="text-center text-sm text-black/70 mt-1">
                                            Coba Dulu, Gratis untuk Semua!
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 py-5">
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Akses ke 3 soal latihan</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Tidak ada analisis hasil</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Tidak ada pembahasan lengkap</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Iklan ditampilkan</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <LinkCustom
                                href="/register"
                                className="text-white pb-3"
                            >
                                Daftar Sekarang
                            </LinkCustom>
                        </div>
                        <div className="bg-white border flex flex-col justify-between border-gray-100 rounded-2xl shadow-md p-5 px-6">
                            <div className="">
                                <div className="head py-6 text-primary text-4xl font-medium text-center border-b border-gray-100">
                                    Premium
                                </div>
                                <div className="">
                                    <div className="py-7 border-b border-gray-100">
                                        <div className="flex gap-1 justify-center items-end">
                                            <div className="flex gap-1 justify-center">
                                                <div className="">Rp</div>
                                                <div className="text-3xl font-medium">500.000</div>
                                            </div>
                                            <div className=" text-black/60">/Tahun</div>
                                        </div>
                                        <div className="text-center text-sm text-black/70 mt-1">
                                            Tingkatkan Kemampuan dengan Fitur Lengkap!
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 py-5">
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Akses ke seluruh soal tryout (50+ soal)</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Analisis hasil lengkap</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Pembahasan soal secara detail</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Fitur ranking untuk membandingkan dengan peserta lain</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Tidak ada iklan</div>
                                        </div>
                                    </div>
                                    {/*  */}
                                </div>
                            </div>
                            <LinkCustom href="/register"
                                className="text-white pb-3"
                            >
                                Daftar Sekarang
                            </LinkCustom>
                        </div>
                        <div className="bg-white border flex flex-col justify-between border-gray-100 rounded-2xl shadow-md p-5 px-6">
                            <div className="">
                                <div className="head py-6 text-primary text-4xl font-medium text-center border-b border-gray-100">
                                    Platinum
                                </div>
                                <div className="">
                                    <div className="py-7 border-b border-gray-100">
                                        <div className="flex gap-1 justify-center items-end">
                                            <div className="flex gap-1 justify-center">
                                                <div className="">Rp</div>
                                                <div className="text-3xl font-medium">1.500.000</div>
                                            </div>
                                            <div className=" text-black/60">/Tahun</div>
                                        </div>
                                        <div className="text-center text-sm text-black/70 mt-1">
                                            Paket Terbaik untuk Hasil Maksimal!
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 px-5 py-5">
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Semua fitur Premium Plan</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Akses eksklusif ke kelas live bersama mentor</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Materi belajar tambahan (PDF, video)</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Konsultasi gratis dengan mentor</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Sertifikat kelulusan tryout</div>
                                        </div>
                                        <div className=" flex items-center gap-2">
                                            <div className="">
                                                <PriceCeklist />
                                            </div>
                                            <div className="text-sm">Grup diskusi eksklusif (via WhatsApp/Telegram)</div>
                                        </div>
                                    </div>
                                    {/*  */}
                                </div>
                            </div>
                            <LinkCustom href="/register"
                                className="text-white pb-3"
                            >
                                Daftar Sekarang
                            </LinkCustom>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPackage;
