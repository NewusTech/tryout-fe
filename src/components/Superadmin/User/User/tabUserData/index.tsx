"use client"

import { useGetUserDetailId } from '@/services/api';
import { useParams } from 'next/navigation';
import React from 'react'

const TabUserData = () => {
    // Integrasi API
    const { slug } = useParams();
    const { data } = useGetUserDetailId(slug as string);
    return (
        <div className='flex flex-col gap-10 w-[60%]'>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Nama</div>
                    <div className="">{data?.data?.name ?? "-"}</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-medium text-end">Jenis Kelamin</div>
                    <div className="text-end">{data?.data?.gender === 1 ? "Laki-laki" : "Perempuan"}</div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Email</div>
                    <div className="">{data?.data?.email ?? "-"}</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-medium text-end">Nomor Telepon</div>
                    <div className="text-end">{data?.data?.telepon ?? "-"}</div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Asal Sekolah</div>
                    <div className="">{data?.data?.asal_instansi ?? "-"}</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-medium text-end">Provinsi</div>
                    <div className="text-end">{data?.data?.provinsi_name ?? "-"}</div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Kabupaten / Kota</div>
                    <div className="">{data?.data?.kota_name ?? "-"}</div>
                </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="font-medium">Alamat</div>
                    <div className="text-justify">{data?.data?.alamat ?? "-"}</div>
                </div>
            </div>
            {/*  */}
        </div>
    )
}

export default TabUserData