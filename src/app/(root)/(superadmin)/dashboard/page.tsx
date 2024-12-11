"use client";

import React, { useState } from "react";
import TitleAdmin from "@/components/Superadmin/Title";
import UserAll from "../../../../../public/assets/icons/UserAll";
import BankSoal from "../../../../../public/assets/icons/BankSoal";
import Package from "../../../../../public/assets/icons/Package";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Statistik from "@/components/Superadmin/Dashboard/Statistik";
import Monitoring from "@/components/Superadmin/Dashboard/Monitoring";
import { useGetDashboard } from "@/services/api";
import LoadingPage from "@/components/ui/LoadingPage";

const Dashboard = () => {
    // INTEGRASI
    const { data, isLoading } = useGetDashboard();
    if (isLoading) return <div><LoadingPage /></div>;

    return (
        <div className="">
            <TitleAdmin title="Dashboard" />
            <div className="wrap-all grid grid-cols-3 gap-7">
                <div className="card shadow flex  flex-col gap-4 p-6 rounded-3xl bg-[#E4D9E6]">
                    <div className="">
                        <UserAll />
                    </div>
                    <div className="text-[#151D48] text-4xl font-semibold">
                        {data?.data?.totalUser ?? "-"}
                    </div>
                    <div className="text-[#425166]">
                        Total Users
                    </div>
                </div>
                <div className="card shadow flex  flex-col gap-4 p-6 rounded-3xl bg-[#E4D9E6]">
                    <div className="">
                        <BankSoal />
                    </div>
                    <div className="text-[#151D48] text-4xl font-semibold">
                        {data?.data?.totalBankSoal ?? "-"}
                    </div>
                    <div className="text-[#425166]">
                        Total Bank Soal
                    </div>
                </div>
                <div className="card shadow flex  flex-col gap-4 p-6 rounded-3xl bg-[#E4D9E6]">
                    <div className="">
                        <Package />
                    </div>
                    <div className="text-[#151D48] text-4xl font-semibold">
                        {data?.data?.totalPackageTryout ?? "-"}
                    </div>
                    <div className="text-[#425166]">
                        Total Paket Tryout
                    </div>
                </div>
            </div>
            {/* detail */}
            {/* tabs */}
            <div className="tabs my-6">
                <Tabs defaultValue="statistik" className="w-full">
                    <TabsList className='flex md:gap-4 gap-2'>
                        <TabsTrigger value="statistik">Statistik Tryout</TabsTrigger>
                        <TabsTrigger value="monitoring">Monitoring dan Jadwal</TabsTrigger>
                    </TabsList>
                    <div className=" mt-6">
                        <TabsContent value="statistik">
                            <Statistik />
                        </TabsContent>
                    </div>
                    <div className=" mt-6">
                        <TabsContent value="monitoring">
                            <Monitoring />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
            {/* tabs */}
        </div>
    );
};

export default Dashboard;
