"use client";

import TitleBack from "@/components/Superadmin/TitleBack";
import React, { useState } from "react";
import EditIcon from "../../../../../../../../public/assets/icons/EditIcon";
import DeleteIcon from "../../../../../../../../public/assets/icons/DeleteIcon";
import Link from "next/link";
import DeletePopupIcon from "@/components/Custom/DeleteIcon/Index";
import { useParams } from "next/navigation";
import { useGetScheduleId } from "@/services/api";

const dummyData = [
    { value: 1, label: "Tryout Tryout Tryout Tryout Tryout Tryout Tryout 1" },
    { value: 2, label: "Tryout 2" },
    { value: 3, label: "Tryout 3" },
    { value: 4, label: "Tryout 4" },
];

const DetailSchedule = () => {
    // Integrasi API
    const { id } = useParams();
    const { data } = useGetScheduleId(id as string);

    const dataUser = data?.data


    return (
        <div className="">
            <TitleBack href="/tryout/schedule" title="Detail Jadwal" />
            {/* form */}
            <div className="form shadow-lg flex flex-col gap-5 rounded-xl bg-[#FAFAFA] border border-gray-100 p-6">
                <div className="flex flex-col gap-2">
                    <div className="font-medium">
                        Nama Tryout
                    </div>
                    <div className="border-b pb-2 border-gray-900">
                        {dataUser?.title ?? "-"}
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        Tanggal
                    </div>
                    <div className="w-1/2">
                        <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                        {dataUser?.tanggal ?? "-"}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        Jam
                    </div>
                    <div className="w-1/2">
                        <div className="w-full px-5 text-primary border border-primary p-2.5 bg-[#FAFAFA] rounded-full">
                        {dataUser?.waktu ?? "-"}
                        </div>
                    </div>
                </div>
                {/* button */}
                <div className="flex gap-4 items-center justify-end mt-4">
                    <Link href="/tryout/schedule/edit" className="">
                        <EditIcon />
                    </Link>
                    <div className="">
                        <DeletePopupIcon onDelete={async () => { }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailSchedule;
