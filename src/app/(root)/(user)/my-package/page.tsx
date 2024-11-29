"use client";
import Navbar from "@/components/User/Home/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import SearchIcon from "../../../../../public/assets/icons/SearchIcon";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LinkCustom from "@/components/ui/LinkCustom";
import { useGetUserTryoutPackage } from "@/services/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import PaginationTable from "@/components/Custom/PaginationTable";

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

    // Fetch data
    const { data } = useGetUserTryoutPackage(currentPage, search);

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
                <div className="pb-10">
                    <div className="mt-7 flex flex-col gap-3 md:gap-4">
                        {data?.data && data.data.length > 0 ? (
                            data.data.map((user) => (
                                <div
                                    key={user?.id}
                                    className="card bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden md:p-7 flex md:flex-row flex-col gap-4"
                                >
                                    <div className="left flex-shrink-0">
                                        <div className="img">
                                            <Image
                                                src="/assets/images/book.png"
                                                alt="logo"
                                                width={1000}
                                                height={1000}
                                                unoptimized
                                                className="md:w-[300px] w-full object-contain md:rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="right flex flex-col md:px-0 px-4 justify-between w-full">
                                        <div className="head text-primary flex flex-col gap-1">
                                            <div className="md:text-xl text-base font-semibold">
                                                {user?.title ?? "-"}
                                            </div>
                                            <div className="flex flex-col gap-2 md:gap-3 mt-3">
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <div className="font-medium w-[90px]">Durasi</div>
                                                    <div className="">:</div>
                                                    <div className="md:text-base text-sm">
                                                        {user?.duration ?? "-"}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <div className="font-medium w-[90px]">Harga</div>
                                                    <div className="">:</div>
                                                    <div className="md:text-base text-sm">
                                                        {user?.price
                                                            ? `Rp. ${Number(user.price).toLocaleString(
                                                                "id-ID"
                                                            )}`
                                                            : "-"}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <div className="font-medium w-[90px]">Total Soal</div>
                                                    <div className="">:</div>
                                                    <div className="md:text-base text-sm">
                                                        {user?.total_question ?? "-"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="button flex gap-3 md:justify-end w-full mt-5 mb-5 md:mb-0">
                                            <Button
                                                onClick={() => handleStart(user.id.toString())}
                                                className="px-10 text-white md:w-[160px] w-full"
                                            >
                                                Kerjakan
                                            </Button>
                                            <LinkCustom
                                                href="/my-package/history"
                                                className="px-10 bg-white text-primary border border-primary md:w-[160px] w-full"
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
                    <div className="pagi flex items-center justify-center md:justify-end mt-3 pb-5 lg:pb-0">
                        <PaginationTable
                            currentPage={currentPage}
                            totalPages={data?.pagination?.totalPages as number}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPackage;
