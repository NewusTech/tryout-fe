"use client";

import TitleBack from '@/components/Superadmin/TitleBack'
import { useGetUserFeedbackId } from '@/services/api';
import { useParams } from 'next/navigation';
import React from 'react'
import { format } from "date-fns";

const DetailReport = () => {
    // Integrasi API
    const { id } = useParams();
    const { data } = useGetUserFeedbackId(id as string);

    return (
        <div>
            <TitleBack href="/feedback" title="Detail Feedback" />
            {/*  */}
            <div className="bg-[#FAFAFA] text-primary flex flex-col gap-5 rounded-lg p-5 border border-gray-100 shadow-md">
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Nama</div>
                    <div className="w-1/2">: Qurotta</div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Nama Paket</div>
                    <div className="w-1/2">: {data?.data?.package_name ?? "-"}</div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Tipe Paket</div>
                    <div className="w-1/2">: {data?.data?.type_package_name ?? "-"}</div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Tanggal dan waktu</div>
                    <div className="w-1/2">
                        : {data?.data?.date
                            ? format(new Date(data.data.date), "dd-MM-yyyy, HH:mm ")
                            : "-"}
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Feedback</div>
                    <div className="w-1/2 text-justify">: {data?.data?.feedback ?? "-"}</div>
                </div>
            </div>
        </div>
    )
}

export default DetailReport