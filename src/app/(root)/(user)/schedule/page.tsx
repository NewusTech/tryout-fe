"use client";
import Navbar from "@/components/User/Home/Navbar";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LinkCustom from "@/components/ui/LinkCustom";
import { useGetScheduleUser, useGetUserTryoutPackage } from "@/services/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import PaginationTable from "@/components/Custom/PaginationTable";
import PriceCeklist from "../../../../../public/assets/icons/PriceCeklist";
import PriceNonCek from "../../../../../public/assets/icons/PriceNonCek";
import LoadingPage from "@/components/ui/LoadingPage";

const Schedule = () => {
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
    const { data, isLoading } = useGetScheduleUser(currentPage, search);

    const router = useRouter();

    // Set package in cookies
    const setPackageStart = (packageId: string) => {
        Cookies.set("package", packageId);
    };

    const setPackageHistory = (historyId: string) => {
        Cookies.set("history", historyId);
    };

    const handleStart = (id: string) => {
        setPackageStart(id);
        Cookies.remove("history");
        router.push("/my-package/do-assignments");
    };
    const handleHistory = (id: string) => {
        setPackageHistory(id);
        Cookies.remove("package");
        router.push("/my-package/history");
    };

    if (isLoading) {
        return <div >
            <LoadingPage />
        </div>;
    }

    return (
        <div className="text-srBlack overflow-x-hidden">
            <Navbar />
            <div className="container mx-auto min-h-screen">
                <div className="text-secondary font-semibold text-2xl pt-[120px]">
                    Event Tryout
                </div>
                <div className="">
                    Asah pemahamanmu dengan mengerjakan latihan soal dan mengikuti try out seru!
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
                                                {user?.scheduleTitle ?? "-"}
                                            </div>
                                            <div className="flex flex-col gap-2 mt-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="font-medium w-[90px]">Tanggal</div>
                                                    <div>:</div>
                                                    <div>{user?.tanggal ?? "-"}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="font-medium w-[90px]">Waktu</div>
                                                    <div>:</div>
                                                    <div>{user?.waktu ?? "-"}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="font-medium w-[90px]">Status</div>
                                                    <div>:</div>
                                                    <div>{user?.status ?? "-"}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="button flex gap-3 justify-end w-full mt-5">
                                            <Button
                                                onClick={() => handleStart(user.packagetryout_id.toString())}
                                                className="px-10 text-white text-sm w-full md:w-[160px]"
                                            >
                                                Kerjakan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center mt-5">Tidak Ada Event Tryout</div>
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
            </div>
        </div>
    );
};

export default Schedule;
