import TitleBack from '@/components/Superadmin/TitleBack'
import React from 'react'

const DetailReport = () => {
    return (
        <div>
            <TitleBack href="/report" title="Detail Laporan" />
            {/*  */}
            <div className="bg-[#FAFAFA] text-primary flex flex-col gap-5 rounded-lg p-5 border border-gray-100 shadow-md">
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Nama</div>
                    <div className="w-1/2">: Qurotta</div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Paket Yang Dibeli</div>
                    <div className="w-1/2">: Premium</div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Harga</div>
                    <div className="w-1/2">: Rp. 400.000</div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1/2 font-medium">Metode Pembayaran</div>
                    <div className="w-1/2">: Transfer Bank</div>
                </div>
            </div>
        </div>
    )
}

export default DetailReport