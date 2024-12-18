"use client";

import React, { useState } from "react";
import TitleBack from "@/components/Superadmin/TitleBack";
import LinkCustom from "@/components/ui/LinkCustom";
import Image from "next/image";
import TabUserData from "@/components/Superadmin/User/User/tabUserData";
import TabProgram from "@/components/Superadmin/User/User/tabProgram";
import TabPerforma from "@/components/Superadmin/User/User/tabPerforma";
import { useParams } from "next/navigation";
import { useGetUserDetailId } from "@/services/api";
import LoadingPage from "@/components/ui/LoadingPage";

const DetailUser = () => {
    const [activeTab, setActiveTab] = useState<string>("data-diri");
    // Integrasi API
    const { slug } = useParams();
    const { data, isLoading } = useGetUserDetailId(slug as string);

    // Show loading page while fetching data
    if (isLoading) {
        return (
            <div>
                <LoadingPage />
            </div>
        );
    }

    return (
        <div className="">
            <TitleBack href="/user/user" title="Detail User" />
            {/* Profile Section */}
            <div className="flex gap-3 items-center">
                <div className="w-[130px] h-[130px] rounded-full overflow-hidden">
                    <Image
                        src={data?.data?.image_profile ?? "/assets/images/profile.png"}
                        alt="logo"
                        width={500}
                        height={500}
                        unoptimized
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-xl font-semibold text-primary">{data?.data?.name ?? "-"}</div>
                    <div className="text-primary/80 text-xl">{data?.data?.email ?? "-"}</div>
                </div>
            </div>

            {/* Tab Section */}
            <div className="mt-10">
                {/* Tab Buttons */}
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("data-diri")}
                        className={`p-3 border-b-2 text-lg font-medium px-6 ${activeTab === "data-diri"
                                ? "text-primary border-primary bg-[#FAFAFA]"
                                : "text-[#656565] border-[#CFD4DA] bg-white"
                            }`}
                    >
                        Data Diri
                    </button>
                    <button
                        onClick={() => setActiveTab("program")}
                        className={`p-3 border-b-2 text-lg font-medium px-6 ${activeTab === "program"
                                ? "text-primary border-primary bg-[#FAFAFA]"
                                : "text-[#656565] border-[#CFD4DA] bg-white"
                            }`}
                    >
                        Program
                    </button>
                    <button
                        onClick={() => setActiveTab("performa")}
                        className={`p-3 border-b-2 text-lg font-medium px-6 ${activeTab === "performa"
                                ? "text-primary border-primary bg-[#FAFAFA]"
                                : "text-[#656565] border-[#CFD4DA] bg-white"
                            }`}
                    >
                        Performa
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-10">
                    {activeTab === "data-diri" && (
                        <TabUserData />
                    )}
                    {activeTab === "program" && (
                        <TabProgram />
                    )}
                    {activeTab === "performa" && (
                        <TabPerforma />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailUser;
