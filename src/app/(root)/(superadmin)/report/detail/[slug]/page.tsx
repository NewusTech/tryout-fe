"use client"

import TitleBack from '@/components/Superadmin/TitleBack'
import { useGetUserTryoutPaymentSlug } from '@/services/api';
import { useParams } from 'next/navigation';
import React from 'react'

const DetailReport = () => {
    // Integrasi API
    const { slug } = useParams();
    const { data } = useGetUserTryoutPaymentSlug(slug as string);

    return (
        <div>
            <TitleBack href="/report" title="Detail Laporan" />
            {/*  */}
            <div className="bg-[#FAFAFA] text-primary flex flex-col gap-5 rounded-lg p-5 border border-gray-100 shadow-md">
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Nama</div>
                    <div className="w-1/2">: {data?.data?.name ?? "-"}</div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Paket Yang Dibeli</div>
                    <div className="w-1/2">: {data?.data?.package_user ?? "-"}</div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Harga</div>
                    <div className="w-1/2">
                        :  {data?.data?.price
                            ? `Rp. ${Number(data?.data?.price).toLocaleString(
                                "id-ID"
                            )}`
                            : "-"}
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Metode Pembayaran</div>
                    <div className="w-1/2">: {data?.data?.metode_payment ?? "-"}</div>
                </div>
            </div>
        </div>
    )
}

export default DetailReport